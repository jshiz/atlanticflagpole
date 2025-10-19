export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { detectLocationServer } from "@/lib/geo/detectLocation"

export async function GET(request: NextRequest) {
  try {
    const location = await detectLocationServer(request.headers)

    if (!location) {
      return NextResponse.json(
        {},
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        },
      )
    }

    return NextResponse.json(location, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[v0] Geo detection API error:", error)
    return NextResponse.json({}, { status: 200 })
  }
}
