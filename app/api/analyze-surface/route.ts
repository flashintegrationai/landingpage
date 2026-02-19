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

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Robust base64 extraction
    let base64Image = image;
    if (image.includes(",")) {
      base64Image = image.split(",")[1];
    }

    if (!base64Image || base64Image.length < 10) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 },
      );
    }

    console.log(
      "🚀 Starting OpenAI analysis, base64 length:",
      base64Image.length,
    );

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in pressure washing and surface restoration. Analyze the provided image of a surface (driveway, house wall, roof, deck, etc.) and provide an estimate for cleaning.
          Return ONLY a JSON object with the following fields:
          - detectedMaterial: A short string (e.g., "Concrete Paver", "Vinyl Siding", "Asphalt").
          - contaminationLevel: "Low", "Medium", or "High".
          - estimatedSqFt: An approximate number (e.g., 850).
          - confidenceScore: A percentage (e.g., 98.4).
          - priceRange: A string (e.g., "$350 - $450").
          
          Base the price on South Florida standards:
          - House Washing: $0.15 - $0.25 per sq ft.
          - Driveway: $0.20 - $0.35 per sq ft.
          - Roof: $0.30 - $0.50 per sq ft.
          - Minimum charge: $150.
          Adjust for contamination: Medium (+20%), High (+50%).`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this surface for an estimate.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
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
