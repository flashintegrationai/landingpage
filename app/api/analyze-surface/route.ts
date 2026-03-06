import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("🔴 OPENAI_API_KEY is missing in environment variables");
      return NextResponse.json(
        {
          error:
            "OpenAI API Key is missing. Please add OPENAI_API_KEY to your .env file.",
        },
        { status: 500 },
      );
    }

    const openai = new OpenAI({ apiKey });

    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    // Robust base64 extraction & validation
    const validBase64Images: string[] = [];
    for (const img of images) {
      let base64Image = img;
      if (img.includes(",")) {
        base64Image = img.split(",")[1];
      }
      if (base64Image && base64Image.length >= 10) {
        validBase64Images.push(base64Image);
      }
    }

    if (validBase64Images.length === 0) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 },
      );
    }

    console.log(
      "🚀 Starting OpenAI analysis for", validBase64Images.length, "images"
    );

    const userMessages: any[] = [
        {
            type: "text",
            text: "Analyze these surfaces for an estimate. Give one unified result containing the aggregated square footage, and a single overall price range.",
        }
    ];

    validBase64Images.forEach((base64) => {
        userMessages.push({
            type: "image_url",
            image_url: {
                url: `data:image/jpeg;base64,${base64}`,
            },
        });
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in pressure washing and surface restoration. Analyze the provided images of surfaces (driveway, house wall, roof, deck, etc.) and provide an estimate for cleaning.
          Return ONLY a JSON object with the following fields:
          - detectedMaterial: A short string (e.g., "Concrete Paver", "Vinyl Siding", "Asphalt") representing all images. You can combine (e.g., "Concrete and Asphalt" if multiple).
          - contaminationLevel: "Low", "Medium", or "High" representing the overall level of the images combined.
          - estimatedSqFt: An approximate number (e.g., 850) that is the total square footage of ALL images combined.
          - confidenceScore: A percentage (e.g., 98.4) indicating your confidence in the material detection for all images combined.
          - priceRange: A string (e.g., "$350 - $450") summarizing the total combined cost of cleaning all surfaces across all images.
          
          Base the price on South Florida standards:
          - House Washing: $0.15 - $0.25 per sq ft.
          - Driveway: $0.20 - $0.35 per sq ft.
          - Roof: $0.30 - $0.50 per sq ft.
          - Minimum charge: $150.
          Adjust for contamination: Medium (+20%), High (+50%).`,
        },
        {
          role: "user",
          content: userMessages,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    console.error("AI Analysis Error Details:", {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack,
      cause: error.cause,
    });

    let errorMessage = "Failed to analyze surface. Please try again.";

    if (error.code === "EAI_FAIL" || error.message?.includes("getaddrinfo")) {
      errorMessage =
        "Network/DNS Error: Unable to reach OpenAI servers. Please check your internet connection.";
    } else if (error.status === 401) {
      errorMessage =
        "Invalid OpenAI API Key. Please verify your environment variables.";
    } else if (error.status === 429) {
      errorMessage = "OpenAI rate limit reached. Please try again later.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 },
    );
  }
}
