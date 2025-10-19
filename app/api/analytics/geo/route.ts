import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

interface GeoEvent {
  event: string
  productId?: string
  handle?: string
  orderId?: string
  productIds?: string[]
  total?: number
  region?: string
  region_code?: string
  variant?: string
  timestamp: number
}

const COOKIE_NAME = "geo_analytics"
const MAX_EVENTS = 100

export async function POST(request: NextRequest) {
  try {
    const event: GeoEvent = await request.json()

    // Add timestamp if not present
    if (!event.timestamp) {
      event.timestamp = Date.now()
    }

    // Get existing events from cookie
    const cookieStore = await cookies()
    const existingData = cookieStore.get(COOKIE_NAME)
    let events: GeoEvent[] = []

    if (existingData?.value) {
      try {
        events = JSON.parse(existingData.value)
      } catch {
        events = []
      }
    }

    // Add new event
    events.push(event)

    // Keep only last MAX_EVENTS
    if (events.length > MAX_EVENTS) {
      events = events.slice(-MAX_EVENTS)
    }

    // Store back in cookie (max 4KB)
    const cookieValue = JSON.stringify(events)
    if (cookieValue.length < 4000) {
      cookieStore.set(COOKIE_NAME, cookieValue, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        sameSite: "lax",
      })
    }

    console.log("[v0] Geo analytics event stored:", event.event, event.region_code)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Geo analytics error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const existingData = cookieStore.get(COOKIE_NAME)

    if (!existingData?.value) {
      return NextResponse.json({ events: [] })
    }

    const events: GeoEvent[] = JSON.parse(existingData.value)
    return NextResponse.json({ events })
  } catch (error) {
    console.error("[v0] Geo analytics GET error:", error)
    return NextResponse.json({ events: [] })
  }
}
