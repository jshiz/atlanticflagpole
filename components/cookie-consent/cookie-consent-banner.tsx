"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Settings } from "lucide-react"
import Link from "next/link"
import { useCookieConsent } from "./use-cookie-consent"

export function CookieConsentBanner() {
  const { consent, updateConsent, hasResponded } = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show banner after a short delay if user hasn't responded
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
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 md:p-4 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-4xl mx-auto bg-white border-2 border-[#0B1C2C]/10 shadow-2xl">
        <div className="p-3 md:p-6">
          <div className="flex items-start justify-between gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-[#0B1C2C] mb-1 md:mb-2">We Value Your Privacy</h3>
              <p className="text-xs md:text-sm text-[#0B1C2C]/70 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                Essential cookies are required for the site to function properly (shopping cart, security). You can
                choose to accept all cookies or customize your preferences.
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-[#0B1C2C]/50 hover:text-[#0B1C2C] transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-[#C8A55C] hover:bg-[#a88947] text-white text-xs md:text-sm py-2 md:py-3"
            >
              Accept All Cookies
            </Button>
            <Button
              onClick={handleRejectNonEssential}
              variant="outline"
              className="flex-1 border-[#0B1C2C] text-[#0B1C2C] hover:bg-[#0B1C2C]/5 bg-transparent text-xs md:text-sm py-2 md:py-3"
            >
              Reject Non-Essential
            </Button>
            <Link href="/cookie-settings" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-[#0B1C2C]/30 text-[#0B1C2C] hover:bg-[#0B1C2C]/5 bg-transparent text-xs md:text-sm py-2 md:py-3"
              >
                <Settings className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Customize
              </Button>
            </Link>
          </div>

          <p className="text-[10px] md:text-xs text-[#0B1C2C]/60 mt-3 md:mt-4 text-center">
            Learn more in our{" "}
            <Link href="/cookie-policy" className="underline hover:text-[#C8A55C]">
              Cookie Policy
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
