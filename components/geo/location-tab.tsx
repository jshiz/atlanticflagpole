"use client"

import { useState, useEffect } from "react"
import { MapPin, X, Map } from "lucide-react"
import { useGeo } from "@/lib/geo/context"
import Link from "next/link"
import { getStateCodeFromRegion } from "@/lib/geo/state-mapping"

export function LocationTab() {
  const { location, loading } = useGeo()
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showInitialBanner, setShowInitialBanner] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem("location-banner-dismissed")

    if (!isDismissed && !loading && location?.region) {
      setShowInitialBanner(true)
    } else if (isDismissed) {
      setHasInteracted(true)
    }
  }, [loading, location])

  const handleInitialDismiss = (action: "ok" | "dismiss") => {
    setShowInitialBanner(false)
    setHasInteracted(true)
    localStorage.setItem("location-banner-dismissed", "true")

    if (action === "ok") {
      // User acknowledged, collapse to tab
      setIsExpanded(false)
    }
  }

  const stateCode = location?.region ? getStateCodeFromRegion(location.region) : null

  // Initial popup banner
  if (showInitialBanner && location?.region) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[200] animate-slide-up">
        <div className="bg-gradient-to-r from-[#002868] to-[#003d82] text-white rounded-lg shadow-2xl p-4 border border-[#C8A55C]/20">
          <button
            onClick={() => handleInitialDismiss("dismiss")}
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
                We're showing you products popular in your area, including {location.region} state flags and local
                sports team flags.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleInitialDismiss("ok")}
                  className="text-xs px-3 py-1.5 bg-[#C8A55C] hover:bg-[#B8954C] text-[#002868] font-medium rounded transition-colors"
                >
                  Got it!
                </button>
                <button
                  onClick={() => handleInitialDismiss("dismiss")}
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

  // Don't show tab if no location or not yet interacted
  if (!hasInteracted || !location?.region) {
    return null
  }

  return (
    <>
      {/* Collapsed Tab - positioned below chat button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed right-0 bottom-56 z-[100] bg-gradient-to-l from-[#002868] to-[#003d82] text-white px-3 py-6 rounded-l-lg shadow-lg hover:px-4 transition-all group"
          aria-label="Open location menu"
        >
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-5 h-5 text-[#C8A55C]" />
            <span className="text-xs font-medium writing-mode-vertical transform rotate-180">{location.region}</span>
          </div>
        </button>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[200] w-80 bg-white rounded-lg shadow-2xl border-2 border-[#C8A55C]/30 animate-slide-in-right">
          <div className="bg-gradient-to-r from-[#002868] to-[#003d82] text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C8A55C]" />
                <h3 className="font-semibold">Your Location</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/80">Shopping from {location.region}</p>
          </div>

          <div className="p-4 space-y-3">
            {stateCode && (
              <Link
                href={`/capitals/${stateCode.toLowerCase()}`}
                onClick={() => setIsExpanded(false)}
                className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Shop {location.region} Products
              </Link>
            )}

            <Link
              href="/capitals"
              onClick={() => setIsExpanded(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              <Map className="w-4 h-4" />
              Browse All States
            </Link>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-full text-[#0B1C2C]/60 hover:text-[#0B1C2C] text-sm font-medium py-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
