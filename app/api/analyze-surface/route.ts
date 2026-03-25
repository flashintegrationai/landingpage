import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

type ContaminationLevel = "Low" | "Medium" | "High";

interface AnalysisResponse {
  detectedMaterial: string;
  contaminationLevel: ContaminationLevel;
  estimatedSqFt: number;
  confidenceScore: number;
  priceRange: string;
  pricingDebug?: {
    normalizedAddress: string;
    propertyType: "Business" | "Residential";
    zoneTier: ZoneTier;
    serviceCategory: ServiceCategory;
    locationMultiplier: number;
    imageCount: number;
    source: "google_maps" | "fallback";
  };
}

type ZoneTier = "premium" | "higher" | "standard";

interface AddressIntelligence {
  normalizedAddress: string;
  isBusiness: boolean;
  zoneTier: ZoneTier;
  mapsConfidence: number;
  placeTypes: string[];
}

const BUSINESS_PLACE_TYPES = [
  "establishment",
  "store",
  "restaurant",
  "shopping_mall",
  "car_repair",
  "school",
  "hospital",
  "lodging",
  "finance",
  "real_estate_agency",
  "point_of_interest",
  "department_store",
  "supermarket",
  "bank",
  "gas_station",
  "pharmacy",
  "doctor",
  "movie_theater",
  "gym",
];

const COMMERCIAL_KEYWORDS = [
  "plaza",
  "mall",
  "shopping",
  "center",
  "centre",
  "retail",
  "suite",
  "ste",
  "unit",
  "office",
  "store",
  "market",
  "business",
  "commercial",
];

type ServiceCategory = "house" | "driveway" | "roof" | "deck" | "commercial" | "general";

const FLORIDA_MARKET = {
  residentialJob: { min: 200, max: 600 },
  largeResidentialJob: { min: 600, max: 1200 },
  minimumCharge: 150,
  premiumFloor: 100,
  perSqFt: {
    house: { min: 0.08, max: 0.2 },
    driveway: { min: 0.15, max: 0.35 },
    roof: { min: 0.3, max: 0.5 },
    deck: { min: 0.12, max: 0.35 },
    commercial: { min: 0.1, max: 0.4 },
    general: { min: 0.15, max: 0.3 },
    premium: { min: 0.4, max: 0.8 },
  },
};

const LOCATION_SEGMENTS = {
  premium: [
    "palm beach",
    "boca raton",
    "miami beach",
    "fisher island",
    "key biscayne",
    "coral gables",
    "pinecrest",
    "parkland",
    "weston",
    "naples",
    "jupiter island",
    "country club",
    "estate",
    "mansion",
    "gated",
  ],
  higher: [
    "fort lauderdale",
    "delray",
    "sarasota",
    "st pete",
    "st. pete",
    "clearwater",
    "winter park",
    "doral",
    "aventura",
  ],
  lower: ["mobile home", "trailer park"],
};

function normalizeContamination(value: unknown): ContaminationLevel {
  const v = String(value || "").toLowerCase();
  if (v.includes("high")) return "High";
  if (v.includes("medium")) return "Medium";
  return "Low";
}

function toPositiveNumber(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function inferServiceCategory(materialText: string): ServiceCategory {
  const m = materialText.toLowerCase();
  if (m.includes("roof") || m.includes("shingle") || m.includes("tile")) return "roof";
  if (
    m.includes("driveway") ||
    m.includes("concrete") ||
    m.includes("asphalt") ||
    m.includes("paver")
  ) {
    return "driveway";
  }
  if (m.includes("deck") || m.includes("patio") || m.includes("fence") || m.includes("wood")) {
    return "deck";
  }
  if (m.includes("storefront") || m.includes("warehouse") || m.includes("commercial")) {
    return "commercial";
  }
  if (m.includes("house") || m.includes("siding") || m.includes("stucco") || m.includes("wall")) {
    return "house";
  }
  return "general";
}

function getLocationMultiplier(address: string): number {
  const location = address.toLowerCase();

  if (LOCATION_SEGMENTS.premium.some((k) => location.includes(k))) return 1.3;
  if (LOCATION_SEGMENTS.higher.some((k) => location.includes(k))) return 1.15;
  if (LOCATION_SEGMENTS.lower.some((k) => location.includes(k))) return 0.95;
  return 1;
}

function inferZoneTier(addressText: string): ZoneTier {
  const location = addressText.toLowerCase();
  if (LOCATION_SEGMENTS.premium.some((k) => location.includes(k))) return "premium";
  if (LOCATION_SEGMENTS.higher.some((k) => location.includes(k))) return "higher";
  return "standard";
}

function includesBusinessType(types: string[]): boolean {
  return types.some((t) => BUSINESS_PLACE_TYPES.includes(t));
}

function includesCommercialKeyword(text: string): boolean {
  const normalized = text.toLowerCase();
  return COMMERCIAL_KEYWORDS.some((k) => normalized.includes(k));
}

async function findNearbyCommercialPlace(lat: number, lng: number, mapsKey: string) {
  try {
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=80&keyword=${encodeURIComponent(
      "shopping center plaza mall retail business",
    )}&key=${mapsKey}`;

    const nearbyResp = await fetch(nearbyUrl, { method: "GET" });
    if (!nearbyResp.ok) return null;

    const nearbyData = await nearbyResp.json();
    const results: any[] = Array.isArray(nearbyData?.results) ? nearbyData.results : [];
    if (results.length === 0) return null;

    const candidate = results.find((r) => {
      const types: string[] = Array.isArray(r?.types) ? r.types : [];
      const name = String(r?.name || "");
      const openForBusiness = r?.business_status !== "CLOSED_PERMANENTLY";
      return openForBusiness && (includesBusinessType(types) || includesCommercialKeyword(name));
    });

    if (!candidate) return null;

    return {
      isBusiness: true,
      placeTypes: Array.isArray(candidate.types) ? candidate.types : [],
      confidence: 0.78,
    };
  } catch {
    return null;
  }
}

async function getAddressIntelligence(address: string): Promise<AddressIntelligence> {
  const fallback: AddressIntelligence = {
    normalizedAddress: address,
    isBusiness: false,
    zoneTier: inferZoneTier(address),
    mapsConfidence: 0,
    placeTypes: [],
  };

  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!mapsKey || !address) return fallback;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      address,
    )}&inputtype=textquery&fields=formatted_address,types,name,geometry,place_id&key=${mapsKey}`;

    const resp = await fetch(url, { method: "GET" });
    if (!resp.ok) return fallback;

    const data = await resp.json();
    const candidate = data?.candidates?.[0];
    if (!candidate) return fallback;

    const placeTypes: string[] = Array.isArray(candidate.types) ? candidate.types : [];
    const normalizedAddress = String(candidate.formatted_address || address);
    const candidateName = String(candidate.name || "");

    let isBusiness = includesBusinessType(placeTypes);
    let mapsConfidence = isBusiness ? 0.9 : 0.65;
    const mergedTypes = new Set<string>(placeTypes);

    if (!isBusiness) {
      const textSignal = `${candidateName} ${normalizedAddress} ${address}`;
      if (includesCommercialKeyword(textSignal)) {
        isBusiness = true;
        mapsConfidence = 0.75;
      }
    }

    if (!isBusiness) {
      const lat = Number(candidate?.geometry?.location?.lat);
      const lng = Number(candidate?.geometry?.location?.lng);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        const nearbyCommercial = await findNearbyCommercialPlace(lat, lng, mapsKey);
        if (nearbyCommercial?.isBusiness) {
          isBusiness = true;
          mapsConfidence = Math.max(mapsConfidence, nearbyCommercial.confidence);
          nearbyCommercial.placeTypes.forEach((t: string) => mergedTypes.add(t));
        }
      }
    }

    return {
      normalizedAddress,
      isBusiness,
      zoneTier: inferZoneTier(normalizedAddress),
      mapsConfidence,
      placeTypes: Array.from(mergedTypes),
    };
  } catch {
    return fallback;
  }
}

function roundToNearestFive(amount: number): number {
  return Math.round(amount / 5) * 5;
}

function formatRange(min: number, max: number): string {
  const safeMin = Math.max(FLORIDA_MARKET.premiumFloor, roundToNearestFive(min));
  const safeMax = Math.max(safeMin + 25, roundToNearestFive(max));
  return `$${safeMin} - $${safeMax}`;
}

function buildDynamicPriceRange(args: {
  estimatedSqFt: number;
  contaminationLevel: ContaminationLevel;
  detectedMaterial: string;
  address: string;
  imageCount: number;
  addressIntel: AddressIntelligence;
}): { priceRange: string; serviceCategory: ServiceCategory; locationMultiplier: number } {
  const { estimatedSqFt, contaminationLevel, detectedMaterial, address, imageCount, addressIntel } = args;
  let serviceCategory = inferServiceCategory(detectedMaterial);
  if (addressIntel.isBusiness && serviceCategory === "general") {
    serviceCategory = "commercial";
  }
  const baseRate = FLORIDA_MARKET.perSqFt[serviceCategory];

  let minRate = baseRate.min;
  let maxRate = baseRate.max;

  if (contaminationLevel === "High") {
    minRate *= 1.3;
    maxRate *= 1.5;
  } else if (contaminationLevel === "Medium") {
    minRate *= 1.15;
    maxRate *= 1.25;
  }

  if (estimatedSqFt > 2200 || imageCount >= 3) {
    minRate *= 1.08;
    maxRate *= 1.12;
  }

  if (contaminationLevel === "High" && (serviceCategory === "roof" || serviceCategory === "commercial")) {
    minRate = Math.max(minRate, FLORIDA_MARKET.perSqFt.premium.min);
    maxRate = Math.max(maxRate, FLORIDA_MARKET.perSqFt.premium.max * 0.9);
  }

  let locationMultiplier = getLocationMultiplier(address);
  if (addressIntel.zoneTier === "premium") locationMultiplier = Math.max(locationMultiplier, 1.3);
  if (addressIntel.zoneTier === "higher") locationMultiplier = Math.max(locationMultiplier, 1.15);
  if (addressIntel.isBusiness) locationMultiplier *= 1.08;

  let minTotal = estimatedSqFt * minRate * locationMultiplier;
  let maxTotal = estimatedSqFt * maxRate * locationMultiplier;

  const packageJob = imageCount >= 2 || estimatedSqFt >= 1400;
  if (packageJob) {
    minTotal = Math.max(minTotal, 350 * locationMultiplier);
  } else {
    minTotal = Math.max(minTotal, FLORIDA_MARKET.minimumCharge * locationMultiplier);
  }

  if (estimatedSqFt >= 2500) {
    maxTotal = Math.max(maxTotal, FLORIDA_MARKET.largeResidentialJob.max * locationMultiplier);
  } else {
    maxTotal = Math.max(maxTotal, FLORIDA_MARKET.residentialJob.max * 0.75 * locationMultiplier);
  }

  return {
    priceRange: formatRange(minTotal, maxTotal),
    serviceCategory,
    locationMultiplier,
  };
}

function safeParseAnalysisJson(rawContent: string): Partial<AnalysisResponse> | null {
  const content = rawContent.trim();
  if (!content) return null;

  try {
    return JSON.parse(content) as Partial<AnalysisResponse>;
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    try {
      return JSON.parse(jsonMatch[0]) as Partial<AnalysisResponse>;
    } catch {
      return null;
    }
  }
}

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

    const { images, address } = await req.json();
    const cleanAddress = typeof address === "string" ? address.trim() : "";
    const addressIntel = await getAddressIntelligence(cleanAddress);

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
        text: `Analyze these surfaces for one unified estimate. Property address: ${cleanAddress || "Not provided"}.
Address intelligence from Google Maps:
- normalizedAddress: ${addressIntel.normalizedAddress || "unknown"}
- propertyType: ${addressIntel.isBusiness ? "business/commercial" : "residential"}
- zoneTier: ${addressIntel.zoneTier}
- placeTypes: ${addressIntel.placeTypes.join(", ") || "none"}
Use this context plus image evidence to provide the most realistic estimate.`,
      },
    ];

    validBase64Images.forEach((base64) => {
      userMessages.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${base64}`,
        },
      });
    });

    const messages = [
      {
        role: "system" as const,
        content: `You are an expert in pressure washing and surface restoration for Florida (2025-2026 market). Analyze provided images and create one realistic estimate.
          Return ONLY a JSON object with the following fields:
          - detectedMaterial: A short string (e.g., "Concrete Paver", "Vinyl Siding", "Asphalt") representing all images. You can combine (e.g., "Concrete and Asphalt" if multiple).
          - contaminationLevel: "Low", "Medium", or "High" representing the overall level of the images combined.
          - estimatedSqFt: An approximate number (e.g., 850) that is the total square footage of ALL images combined.
          - confidenceScore: A percentage (e.g., 98.4) indicating your confidence in the material detection for all images combined.
          - priceRange: A string (e.g., "$350 - $450") summarizing the total combined cost of cleaning all surfaces across all images.

          Pricing context (Florida market):
          - Typical residential tickets: $200-$600.
          - Large/full-property jobs: $600-$1,200+.
          - Base per-sqft common ranges:
            - House/basic: $0.08-$0.20
            - Driveway/concrete: $0.15-$0.35
            - Commercial: $0.10-$0.40
            - Premium/difficult: up to $0.40-$0.80
          - Common minimum charge: $100-$200.
          - House + driveway + patio packages often land around $350-$800.

          Required pricing behavior:
          - Do NOT return fixed pricing.
          - Use contamination, material type, size, and accessibility difficulty.
          - Use address context to account for area pricing differences (high-end neighborhoods can be more expensive).
            - If address intelligence indicates business/commercial, bias pricing accordingly.
            - If zone tier is premium, price should trend toward upper market range.
          - Keep result realistic for Florida market and image evidence.`,
      },
      {
        role: "user" as const,
        content: userMessages,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      response_format: { type: "json_object" },
    });

    let content = response.choices?.[0]?.message?.content ?? "";

    // Some multimodal responses may return empty content with strict JSON mode; retry once without forcing response_format.
    if (!content) {
      console.warn("OpenAI returned empty content in JSON mode. Retrying with text response mode.");
      const retryResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        temperature: 0.2,
      });
      content = retryResponse.choices?.[0]?.message?.content ?? "";
    }

    const parsed = safeParseAnalysisJson(content) || {};
    const normalized: AnalysisResponse = {
      detectedMaterial: String(parsed.detectedMaterial || "Unknown Surface"),
      contaminationLevel: normalizeContamination(parsed.contaminationLevel),
      estimatedSqFt: toPositiveNumber(parsed.estimatedSqFt, 850),
      confidenceScore: toPositiveNumber(parsed.confidenceScore, 85),
      priceRange: String(parsed.priceRange || ""),
    };

    const pricing = buildDynamicPriceRange({
      estimatedSqFt: normalized.estimatedSqFt,
      contaminationLevel: normalized.contaminationLevel,
      detectedMaterial: normalized.detectedMaterial,
      address: cleanAddress,
      imageCount: validBase64Images.length,
      addressIntel,
    });

    normalized.priceRange = pricing.priceRange;
    normalized.pricingDebug = {
      normalizedAddress: addressIntel.normalizedAddress || cleanAddress,
      propertyType: addressIntel.isBusiness ? "Business" : "Residential",
      zoneTier: addressIntel.zoneTier,
      serviceCategory: pricing.serviceCategory,
      locationMultiplier: Number(pricing.locationMultiplier.toFixed(2)),
      imageCount: validBase64Images.length,
      source: addressIntel.mapsConfidence > 0 ? "google_maps" : "fallback",
    };

    return NextResponse.json(normalized);
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
