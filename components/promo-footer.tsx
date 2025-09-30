"use client"

import { useState, useEffect } from "react"

const promoMessages = [
  { text: "66% OFF + Free Shipping", discount: "66% OFF" },
  { text: "Save $599 on Accessories Bundle", discount: "SAVE $599" },
  { text: "Limited Time: 60% Off All Flagpoles", discount: "60% OFF" },
  { text: "30-Day Price Match Guarantee", discount: "PRICE MATCH" },
]

export function PromoFooter() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showAtBottom, setShowAtBottom] = useState(false)
  const [showAtTop, setShowAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("main > section:first-child")
      const secondSection = document.querySelector("main > section:nth-child(2)")

      if (window.scrollY > 10) {
        setShowAtTop(false)
      } else {
        setShowAtTop(true)
      }

      if (heroSection && secondSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        const secondBottom = secondSection.getBoundingClientRect().bottom

        if (heroBottom < 0 && secondBottom < 0) {
          setShowAtBottom(true)
        } else {
          setShowAtBottom(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length)
        setIsTransitioning(false)
      }, 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Top promo bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-[#C8A55C] text-[#0B1C2C] overflow-hidden transition-all duration-300 ease-out ${
          showAtTop ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-1.5">
          <div className="relative h-5 flex items-center justify-center">
            <div
              className={`transition-all duration-600 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-xs font-bold tracking-wide text-center">{promoMessages[currentPromoIndex].text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom promo bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-[#C8A55C] text-[#0B1C2C] overflow-hidden transition-all duration-500 ease-out ${
          showAtBottom ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-1.5">
          <div className="relative h-5 flex items-center justify-center">
            <div
              className={`transition-all duration-600 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-xs font-bold tracking-wide text-center">{promoMessages[currentPromoIndex].text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
