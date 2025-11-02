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
      setIsExpanded(false)
    }
  }

  const stateCode = location?.region ? getStateCodeFromRegion(location.region) : null

  // Initial popup banner
  if (showInitialBanner && location?.region) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[200] animate-slide-up">
        <div className="bg-gradient-to-r from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white rounded-lg shadow-2xl p-4 border-2 border-[#C8A55C]/30">
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
                  className="text-xs px-3 py-1.5 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-semibold rounded transition-colors"
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
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-[260px] right-0 z-[110] bg-[#0B1C2C] hover:bg-[#1a2d3f] text-white px-2 py-6 rounded-l-lg shadow-lg transition-all duration-300 hover:px-3 group"
          aria-label="Open location menu"
        >
          <div className="flex flex-col items-center">
            <MapPin className="w-5 h-5 text-[#C8A55C]" />
          </div>
        </button>
      )}

      {isExpanded && (
        <div className="fixed bottom-24 right-0 z-[120] w-[90vw] max-w-sm bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] rounded-l-lg shadow-2xl border-2 border-[#C8A55C]/30 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] text-white p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex-1">
              <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C8A55C]" />
                Your Location
              </h3>
              <p className="text-xs text-white/80 mt-1">Shopping from {location.region}</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="ml-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 space-y-3 bg-gradient-to-b from-transparent to-black/20">
            <p className="text-sm text-white/80 mb-4">
              Discover products popular in your area, including state flags and local sports team merchandise.
            </p>

            {stateCode && (
              <Link
                href={`/capitals/${stateCode.toLowerCase()}`}
                onClick={() => setIsExpanded(false)}
                className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] px-4 py-3 rounded-lg font-bold text-center transition-all shadow-lg hover:shadow-xl"
              >
                Shop {location.region} Products
              </Link>
            )}

            <Link
              href="/capitals"
              onClick={() => setIsExpanded(false)}
              className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-semibold transition-all border border-white/20"
            >
              <Map className="w-4 h-4" />
              Browse All States
            </Link>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-full text-white/60 hover:text-white text-sm font-medium py-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
