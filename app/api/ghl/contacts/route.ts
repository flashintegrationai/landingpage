import { NextResponse } from "next/server";

// Helper to fetch custom field definitions to get the real IDs
async function getCustomFieldDefinitions(locationId: string, token: string) {
  try {
    const response = await fetch(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.customFields || [];
  } catch (e) {
    console.error("Error fetching GHL definitions:", e);
    return [];
  }
}

// Helper to update contact via PUT (User's suggested approach)
async function updateGHLContact(
  contactId: string,
  token: string,
  customFields: { id: string; value: any }[],
) {
  if (customFields.length === 0) return;

  console.log("========== GHL IMAGE DEBUG ==========");
  console.log("Contact ID:", contactId);
  customFields.forEach((field) => {
    console.log("Custom Field ID:", field.id);
    console.log("Value being sent:", field.value);
    console.log("Value type:", typeof field.value);
  });
  console.log("=====================================");

  try {
    const response = await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ customFields }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("🔴 GHL PUT Update Error:", JSON.stringify(data, null, 2));
    } else {
      console.log("🟢 GHL Contact Updated Successfully");
    }
  } catch (e) {
    console.error("GHL PUT Exception:", e);
  }
}

export async function POST(req: Request) {
  try {
    const { name, phone, email, companyName, tags, source, customFields } =
      await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 },
      );
    }

    const token = process.env.GHL_ACCESS_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!token || !locationId) {
      return NextResponse.json(
        { error: "Server configuration error: Token or Location ID missing" },
        { status: 500 },
      );
    }

    // 1. Fetch Definition to map Keys to true GHL IDs
    const definitions = await getCustomFieldDefinitions(locationId, token);

    if (definitions.length === 0) {
      console.error(
        "❌ No custom fields found in GHL! Check your Location ID and Token permissions.",
      );
    }

    // Normalized maps for flexible matching
    const normalize = (s: string) =>
      (s || "").toLowerCase().replace(/_/g, " ").replace("contact.", "").trim();

    const defMap = new Map();
    definitions.forEach((d: any) => {
      if (d.key) defMap.set(normalize(d.key), d);
      if (d.name) defMap.set(normalize(d.name), d);
      if (d.fieldKey) defMap.set(normalize(d.fieldKey), d);
    });

    const processedFields: any[] = [];
    const deferredFields: { id: string; value: any }[] = [];

    if (customFields) {
      for (const [rawKey, value] of Object.entries(customFields)) {
        const normalizedKey = normalize(rawKey);
        const def = defMap.get(normalizedKey);

        if (def) {
          console.log(
            `✅ Matched field: "${def.name}" (ID: ${def.id}) for key: "${rawKey}"`,
          );

          if (def.dataType === "FILE_UPLOAD") {
            // Check if we have actual URLs
            const urls = Array.isArray(value)
              ? value.filter((v) => typeof v === "string" && v.length > 5)
              : [value];

            if (urls.length > 0) {
              // GHL V2 PUT often expects a single string for File Upload fields
              // We'll send the first one as requested by the user's logic
              deferredFields.push({
                id: def.id,
                value: urls[0],
              });
            }
          } else {
            processedFields.push({
              id: def.id,
              field_value: value,
            });
          }
        } else {
          console.warn(
            `⚠️ Custom field NOT found: "${rawKey}". (Normalized: "${normalizedKey}")`,
          );

          // Fallback
          processedFields.push({
            key: rawKey,
            field_value: value,
          });
        }
      }
    }

    // Split name
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Format phone
    let formattedPhone = phone.replace(/[^\d+]/g, "");
    if (!formattedPhone.startsWith("+")) {
      if (formattedPhone.length === 10) formattedPhone = `+1${formattedPhone}`;
      else if (formattedPhone.length === 11 && formattedPhone.startsWith("1"))
        formattedPhone = `+${formattedPhone}`;
    }

    // Create Contact payload
    const payload: any = {
      firstName,
      lastName,
      name,
      email: email || "",
      phone: formattedPhone,
      locationId: locationId,
      companyName: companyName || undefined,
      tags: tags,
      source: source,
      customFields: processedFields,
    };

    console.log("🚀 Creating GHL Contact...");

    // Step 2: Create Contact
    const createRes = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const createData = await createRes.json();
    if (!createRes.ok) {
      console.error(
        "🔴 Create Contact Failed:",
        JSON.stringify(createData, null, 2),
      );
      return NextResponse.json(
        {
          error: createData.message || "Failed to create contact",
          details: createData,
        },
        { status: createRes.status },
      );
    }

    const contactId = createData.contact?.id;
    console.log("🟢 Contact Created ID:", contactId);

    // Step 3: Update with FILE_UPLOAD fields via PUT
    if (contactId && deferredFields.length > 0) {
      await updateGHLContact(contactId, token, deferredFields);
    }

    return NextResponse.json({
      success: true,
      contactId,
      updatesSent: deferredFields.length,
    });
  } catch (error: any) {
    console.error("GHL API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
