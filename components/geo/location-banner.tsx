"use client"

import { useState, useEffect } from "react"
import { MapPin, X } from "lucide-react"
import { useGeo } from "@/lib/geo/context"

export function LocationBanner() {
  const { location, loading } = useGeo()
  const [dismissed, setDismissed] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    console.log("[v0] LocationBanner - loading:", loading, "location:", location)

    const isDismissed = localStorage.getItem("location-banner-dismissed")
    if (isDismissed) {
      console.log("[v0] LocationBanner - previously dismissed")
      setDismissed(true)
      return
    }

    // Show banner after location is detected
    if (!loading && location) {
      console.log("[v0] LocationBanner - showing banner for:", location.region)
      setShowBanner(true)
    } else if (!loading && !location) {
      console.log("[v0] LocationBanner - no location detected")
    }
  }, [loading, location])

  const handleDismiss = () => {
    console.log("[v0] LocationBanner - dismissed")
    setDismissed(true)
    setShowBanner(false)
    localStorage.setItem("location-banner-dismissed", "true")
  }

  if (dismissed || !showBanner || !location) {
    return null
  }

  return (
    <div className="hidden md:block fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[150] animate-slide-up">
      <div className="bg-gradient-to-r from-[#002868] to-[#003d82] text-white rounded-lg shadow-2xl p-4 border border-[#C8A55C]/20">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C8A55C]/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#C8A55C]" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Shopping from {location.region}?</h3>
            <p className="text-xs text-white/80 mb-3">
              We're showing you products popular in your area, including {location.region} state flags and local sports
              team flags.
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="text-xs px-3 py-1.5 bg-[#C8A55C] hover:bg-[#B8954C] text-[#002868] font-medium rounded transition-colors"
              >
                Got it!
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
