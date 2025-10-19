import { NextResponse } from "next/server"
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

interface RegionStats {
  region: string
  region_code: string
  clicks: number
  conversions: number
  revenue: number
  ctr: number
}

interface VariantStats {
  variant: string
  clicks: number
  conversions: number
  ctr: number
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const analyticsData = cookieStore.get("geo_analytics")

    if (!analyticsData?.value) {
      return NextResponse.json({
        topRegions: [],
        bestVariant: null,
        totalClicks: 0,
        totalConversions: 0,
      })
    }

    const events: GeoEvent[] = JSON.parse(analyticsData.value)

    // Aggregate by region
    const regionMap = new Map<string, RegionStats>()
    const variantMap = new Map<string, VariantStats>()

    events.forEach((event) => {
      if (event.event === "geo_product_click" && event.region_code) {
        const key = event.region_code
        const existing = regionMap.get(key) || {
          region: event.region || event.region_code,
          region_code: event.region_code,
          clicks: 0,
          conversions: 0,
          revenue: 0,
          ctr: 0,
        }
        existing.clicks++
        regionMap.set(key, existing)

        // Track variant
        if (event.variant) {
          const variantKey = event.variant
          const variantExisting = variantMap.get(variantKey) || {
            variant: variantKey,
            clicks: 0,
            conversions: 0,
            ctr: 0,
          }
          variantExisting.clicks++
          variantMap.set(variantKey, variantExisting)
        }
      }

      if (event.event === "geo_purchase" && event.region_code) {
        const key = event.region_code
        const existing = regionMap.get(key)
        if (existing) {
          existing.conversions++
          existing.revenue += event.total || 0
        }
      }
    })

    // Calculate CTR
    regionMap.forEach((stats) => {
      stats.ctr = stats.clicks > 0 ? stats.conversions / stats.clicks : 0
    })

    variantMap.forEach((stats) => {
      stats.ctr = stats.clicks > 0 ? stats.conversions / stats.clicks : 0
    })

    // Sort by clicks
    const topRegions = Array.from(regionMap.values())
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10)

    // Find best variant
    const variants = Array.from(variantMap.values())
    const bestVariant =
      variants.length > 0 ? variants.reduce((best, current) => (current.ctr > best.ctr ? current : best)) : null

    const totalClicks = events.filter((e) => e.event === "geo_product_click").length
    const totalConversions = events.filter((e) => e.event === "geo_purchase").length

    return NextResponse.json({
      topRegions,
      bestVariant,
      totalClicks,
      totalConversions,
      variants: Array.from(variantMap.values()),
    })
  } catch (error) {
    console.error("[v0] Geo report error:", error)
    return NextResponse.json({
      topRegions: [],
      bestVariant: null,
      totalClicks: 0,
      totalConversions: 0,
    })
  }
}
