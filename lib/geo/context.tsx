"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { detectLocationClient, detectLocationFallback, type GeoLocation } from "./detectLocation"

interface GeoContextType {
  location: GeoLocation | null
  loading: boolean
  variant: "grid" | "carousel"
}

const GeoContext = createContext<GeoContextType>({
  location: null,
  loading: true,
  variant: "grid",
})

export function useGeo() {
  return useContext(GeoContext)
}

export function GeoProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<GeoLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [variant] = useState<"grid" | "carousel">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("geo_variant")
      if (stored) return stored as "grid" | "carousel"
    }
    // A/B test: randomly assign variant
    const newVariant = Math.random() > 0.5 ? "grid" : "carousel"
    if (typeof window !== "undefined") {
      localStorage.setItem("geo_variant", newVariant)
    }
    return newVariant
  })

  useEffect(() => {
    console.log("[v0] GeoProvider - starting location detection")

    detectLocationClient()
      .then((geo) => {
        console.log("[v0] GeoProvider - detectLocationClient returned:", geo)
        if (geo && geo.region) {
          console.log("[v0] GeoProvider - location detected:", geo)
          setLocation(geo)
        } else {
          console.log("[v0] GeoProvider - no valid location, trying fallback")
          const fallback = detectLocationFallback()
          console.log("[v0] GeoProvider - fallback returned:", fallback)
          if (fallback && fallback.region) {
            console.log("[v0] GeoProvider - fallback location:", fallback)
            setLocation(fallback as GeoLocation)
          } else {
            console.log("[v0] GeoProvider - no valid fallback location")
          }
        }
      })
      .catch((error) => {
        console.error("[v0] GeoProvider - detection error:", error)
        // Try fallback on error
        const fallback = detectLocationFallback()
        if (fallback && fallback.region) {
          console.log("[v0] GeoProvider - fallback location after error:", fallback)
          setLocation(fallback as GeoLocation)
        }
      })
      .finally(() => {
        console.log("[v0] GeoProvider - detection complete, location:", location)
        setLoading(false)
      })
  }, [])

  return <GeoContext.Provider value={{ location, loading, variant }}>{children}</GeoContext.Provider>
}
