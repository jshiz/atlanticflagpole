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
    detectLocationClient()
      .then((geo) => {
        if (geo) {
          setLocation(geo)
        } else {
          const fallback = detectLocationFallback()
          if (fallback) {
            setLocation(fallback as GeoLocation)
          }
        }
      })
      .catch(() => {
        // Try fallback on error
        const fallback = detectLocationFallback()
        if (fallback) {
          setLocation(fallback as GeoLocation)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return <GeoContext.Provider value={{ location, loading, variant }}>{children}</GeoContext.Provider>
}
