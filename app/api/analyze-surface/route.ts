import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Remove the data:image/jpeg;base64, part
    const base64Image = image.split(",")[1];

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
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to analyze surface. Please check if your OpenAI API Key is valid.",
      },
      { status: 500 },
    );
  }
}
