import type { GeoLocation } from "@/lib/geo/detectLocation"

export interface GeoClickEvent {
  event: "geo_product_click"
  productId: string
  handle: string
  region?: string
  region_code?: string
  variant?: "grid" | "carousel"
  timestamp?: number
}

export interface GeoPurchaseEvent {
  event: "geo_purchase"
  orderId: string
  productIds: string[]
  total: number
  region?: string
  region_code?: string
  timestamp?: number
}

export async function trackGeoClick(data: {
  productId: string
  handle: string
  location?: GeoLocation | null
  variant?: "grid" | "carousel"
}) {
  try {
    const event: GeoClickEvent = {
      event: "geo_product_click",
      productId: data.productId,
      handle: data.handle,
      region: data.location?.region,
      region_code: data.location?.region_code,
      variant: data.variant,
      timestamp: Date.now(),
    }

    await fetch("/api/analytics/geo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })

    console.log("[v0] Tracked geo click:", event)
  } catch (error) {
    console.error("[v0] Failed to track geo click:", error)
  }
}

export async function trackGeoPurchase(data: {
  orderId: string
  productIds: string[]
  total: number
  location?: GeoLocation | null
}) {
  try {
    const event: GeoPurchaseEvent = {
      event: "geo_purchase",
      orderId: data.orderId,
      productIds: data.productIds,
      total: data.total,
      region: data.location?.region,
      region_code: data.location?.region_code,
      timestamp: Date.now(),
    }

    await fetch("/api/analytics/geo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })

    console.log("[v0] Tracked geo purchase:", event)
  } catch (error) {
    console.error("[v0] Failed to track geo purchase:", error)
  }
}
