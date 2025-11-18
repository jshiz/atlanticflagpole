"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, X, Settings } from 'lucide-react'
import Link from "next/link"
import { useCookieConsent } from "./use-cookie-consent"

export function CookieConsentBanner() {
  const { consent, updateConsent, hasResponded } = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!hasResponded) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [hasResponded])

  if (!isVisible || hasResponded) {
    return null
  }

  const handleAcceptAll = () => {
    updateConsent({
      essential: true,
      analytics: true,
      marketing: true,
    })
    setIsVisible(false)
  }

  const handleRejectNonEssential = () => {
    updateConsent({
      essential: true,
      analytics: false,
      marketing: false,
    })
    setIsVisible(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-[150] max-w-sm animate-in slide-in-from-left duration-500">
      {!isExpanded ? (
        // Compact Bar
        <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] text-white rounded-full shadow-2xl px-4 py-3 flex items-center gap-3 border-2 border-[#C8A55C]/30">
          <Cookie className="w-5 h-5 text-[#C8A55C] flex-shrink-0" />
          <p className="text-xs flex-1">We use cookies</p>
          <button
            onClick={handleAcceptAll}
            className="text-xs px-3 py-1.5 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-semibold rounded-full transition-colors whitespace-nowrap"
          >
            Accept
          </button>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Expand options"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Expanded Options
        <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1a2f42] text-white rounded-2xl shadow-2xl p-4 border-2 border-[#C8A55C]/30">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
            aria-label="Collapse"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="pr-6 mb-4">
            <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-[#C8A55C]" />
              Cookie Preferences
            </h3>
            <p className="text-xs text-white/80">
              We use cookies to enhance your experience and analyze site traffic.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAcceptAll}
              className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] text-xs py-2"
            >
              Accept All
            </Button>
            <Button
              onClick={handleRejectNonEssential}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent text-xs py-2"
            >
              Reject Non-Essential
            </Button>
            <Link href="/cookie-settings" className="w-full">
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent text-xs py-2"
              >
                Customize Settings
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
