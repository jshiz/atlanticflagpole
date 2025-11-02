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
    const cached = localStorage.getItem("geo_location")
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      const age = Date.now() - timestamp
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

      if (age < SEVEN_DAYS && data && data.region) {
        console.log("[v0] Using cached location:", data)
        return data
      } else {
        console.log("[v0] Cached location invalid or expired, clearing cache")
        localStorage.removeItem("geo_location")
      }
    }

    console.log("[v0] Fetching location from API...")
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch("/api/geo/detect", {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.log("[v0] API response not OK:", response.status)
      return null
    }

    const location = await response.json()
    console.log("[v0] API returned location:", location)

    if (!location || !location.region) {
      console.log("[v0] Location missing required fields, not caching")
      return null
    }

    // Cache in localStorage for 7 days
    localStorage.setItem(
      "geo_location",
      JSON.stringify({
        data: location,
        timestamp: Date.now(),
      }),
    )

    console.log("[v0] Location cached successfully")
    return location
  } catch (error) {
    console.log("[v0] detectLocationClient error:", error)
    // Silently fail - geo features are optional
    return null
  }
}

export function detectLocationFallback(): Partial<GeoLocation> | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Extract region from timezone (e.g., "America/New_York" -> "New York")
    const parts = timezone.split("/")
    const region = parts[1]?.replace(/_/g, " ") || ""
    const country = parts[0] || ""

    if (!region) {
      return null
    }

    return {
      region: region,
      region_code: region,
      country: country,
      country_code: country,
      city: "",
      postal: "",
      latitude: 0,
      longitude: 0,
    }
  } catch {
    return null
  }
}
