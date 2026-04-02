import { NextRequest, NextResponse } from "next/server"

const GOOGLE_PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"

export async function GET(request: NextRequest) {
    try {
        const placeId = request.nextUrl.searchParams.get("placeId")?.trim() ?? ""

        if (!placeId) {
            return NextResponse.json(
                { error: "placeId is required." },
                { status: 400 },
            )
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: "GOOGLE_MAPS_API_KEY is missing." },
                { status: 500 },
            )
        }

        const url = new URL(GOOGLE_PLACE_DETAILS_URL)
        url.searchParams.set("place_id", placeId)
        url.searchParams.set("fields", "place_id,formatted_address,geometry/location")
        url.searchParams.set("key", apiKey)

        const response = await fetch(url.toString(), {
            method: "GET",
            cache: "no-store",
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch place details." },
                { status: 502 },
            )
        }

        const data = await response.json()
        const result = data?.result

        if (!result?.formatted_address || !result?.geometry?.location) {
            return NextResponse.json(
                { error: "Place details are incomplete." },
                { status: 404 },
            )
        }

        return NextResponse.json({
            placeId: result.place_id,
            address: result.formatted_address,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
        })
    } catch (error) {
        console.error("Place details error:", error)
        return NextResponse.json(
            { error: "Unexpected server error in place details." },
            { status: 500 },
        )
    }
}
