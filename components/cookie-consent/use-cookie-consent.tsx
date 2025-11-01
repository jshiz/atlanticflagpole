"use client"

import { useState, useEffect } from "react"

export interface CookieConsent {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = "cookie_consent"
const CONSENT_TIMESTAMP_KEY = "cookie_consent_timestamp"

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  })
  const [hasResponded, setHasResponded] = useState(false)

  useEffect(() => {
    // Load consent from localStorage
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setConsent(parsed)
        setHasResponded(true)
      } catch (e) {
        console.error("Failed to parse cookie consent:", e)
      }
    }
  }, [])

  const updateConsent = (newConsent: CookieConsent) => {
    const consentWithEssential = {
      ...newConsent,
      essential: true, // Essential cookies always enabled
    }

    setConsent(consentWithEssential)
    setHasResponded(true)

    // Save to localStorage
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithEssential))
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString())

    // Trigger analytics initialization if consent given
    if (consentWithEssential.analytics) {
      initializeAnalytics()
    }

    // Trigger marketing scripts if consent given
    if (consentWithEssential.marketing) {
      initializeMarketing()
    }
  }

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY)
    localStorage.removeItem(CONSENT_TIMESTAMP_KEY)
    setConsent({
      essential: true,
      analytics: false,
      marketing: false,
    })
    setHasResponded(false)
  }

  return {
    consent,
    updateConsent,
    resetConsent,
    hasResponded,
  }
}

// Initialize analytics when consent is given
function initializeAnalytics() {
  // Add Google Analytics or other analytics scripts here
  console.log("[v0] Analytics initialized with user consent")

  // Example: Load Google Analytics
  // if (typeof window !== 'undefined' && !window.gtag) {
  //   const script = document.createElement('script')
  //   script.src = `https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`
  //   script.async = true
  //   document.head.appendChild(script)
  // }
}

// Initialize marketing scripts when consent is given
function initializeMarketing() {
  // Add marketing/retargeting scripts here
  console.log("[v0] Marketing scripts initialized with user consent")

  // Example: Load Facebook Pixel, etc.
}
