export const createGHLContact = async (data: {
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  tags?: string[];
  source?: string;
  customFields?: { [key: string]: any };
  message?: string; // Additional details or notes
}) => {
  try {
    const response = await fetch("/api/ghl/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Log the detailed error from the server (which comes from GHL)
      console.group("🔴 GHL API Error");
      console.error("Status:", response.status);
      console.error("Message:", errorData.error);
      console.error("GHL Details:", errorData.details);
      console.groupEnd();

      throw new Error(
        errorData.details?.message ||
          errorData.error ||
          "Failed to create contact in GHL",
      );
    }

    const result = await response.json();
    console.log("🟢 GHL Created Contact:", result);
    return result;
  } catch (error) {
    console.error("GHL Integration Exception:", error);
    return null;
  }
};
