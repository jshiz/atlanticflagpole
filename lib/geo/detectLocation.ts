export interface GeoLocation {
  city: string
  region: string
  region_code: string
  country: string
  country_code: string
  postal: string
  latitude: number
  longitude: number
}

export async function detectLocationServer(headers: Headers): Promise<GeoLocation | null> {
  try {
    // Vercel provides geo information in headers
    const country = headers.get("x-vercel-ip-country") || ""
    const region = headers.get("x-vercel-ip-country-region") || ""
    const city = headers.get("x-vercel-ip-city") || ""

    if (!country || !region) {
      return null
    }

    return {
      city: city,
      region: region,
      region_code: region,
      country: country,
      country_code: country,
      postal: "",
      latitude: 0,
      longitude: 0,
    }
  } catch (error) {
    console.error("[v0] Server geo detection error:", error)
    return null
  }
}

export async function detectLocationClient(): Promise<GeoLocation | null> {
  try {
    // Check localStorage cache first (7 day expiration)
    const cached = localStorage.getItem("geo_location")
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      const age = Date.now() - timestamp
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

      if (age < SEVEN_DAYS) {
        console.log("[v0] Using cached geo location")
        return data
      }
    }

    // Try ipapi.co with timeout and error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn("[v0] Geo API rate limited or failed, using fallback")
      return null
    }

    const data = await response.json()

    const location: GeoLocation = {
      city: data.city || "",
      region: data.region || "",
      region_code: data.region_code || "",
      country: data.country_name || "",
      country_code: data.country_code || "",
      postal: data.postal || "",
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
    }

    // Cache in localStorage for 7 days
    localStorage.setItem(
      "geo_location",
      JSON.stringify({
        data: location,
        timestamp: Date.now(),
      }),
    )

    return location
  } catch (error) {
    // Silently fail - geo features are optional
    console.log("[v0] Geo detection unavailable, using default content")
    return null
  }
}

export function detectLocationFallback(): Partial<GeoLocation> | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // This is a very rough estimate, but better than nothing
    return {
      region_code: timezone.split("/")[1] || "",
      country: timezone.split("/")[0] || "",
    }
  } catch {
    return null
  }
}
