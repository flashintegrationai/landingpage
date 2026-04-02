import { NextRequest, NextResponse } from "next/server"

const GOOGLE_AUTOCOMPLETE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json"

export async function GET(request: NextRequest) {
    try {
        const input = request.nextUrl.searchParams.get("input")?.trim() ?? ""

        if (input.length < 3) {
            return NextResponse.json({ suggestions: [] })
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: "GOOGLE_MAPS_API_KEY is missing." },
                { status: 500 },
            )
        }

        const url = new URL(GOOGLE_AUTOCOMPLETE_URL)
        url.searchParams.set("input", input)
        url.searchParams.set("types", "address")
        url.searchParams.set("components", "country:us")
        url.searchParams.set("key", apiKey)

        const response = await fetch(url.toString(), {
            method: "GET",
            cache: "no-store",
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch address suggestions." },
                { status: 502 },
            )
        }

        const data = await response.json()
        const predictions = Array.isArray(data?.predictions) ? data.predictions : []

        const suggestions = predictions.slice(0, 7).map((prediction: any) => ({
            placeId: prediction.place_id,
            description: prediction.description,
            mainText: prediction.structured_formatting?.main_text ?? prediction.description,
            secondaryText: prediction.structured_formatting?.secondary_text ?? "",
        }))

        return NextResponse.json({ suggestions })
    } catch (error) {
        console.error("Places autocomplete error:", error)
        return NextResponse.json(
            { error: "Unexpected server error in autocomplete." },
            { status: 500 },
        )
    }
}
