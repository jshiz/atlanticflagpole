"use client"

import { useState, useEffect } from "react"

const promoMessages = [
  { text: "FREE SHIPPING + 66% OFF", discount: "66% OFF" },
  { text: "SAVE $599 ON ACCESSORY BUNDLES", discount: "SAVE $599" },
  { text: "LIMITED TIME: 60% OFF ALL FLAGPOLES", discount: "60% OFF" },
]

export function PromoFooter() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showAtBottom, setShowAtBottom] = useState(false)
  const [showAtTop, setShowAtTop] = useState(true)
  const [showTicketPopup, setShowTicketPopup] = useState(false)
  const [isAnimatingToCenter, setIsAnimatingToCenter] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("main > section:first-child")
      const secondSection = document.querySelector("main > section:nth-child(2)")

      if (window.scrollY > 10) {
        setShowAtTop(false)
      } else {
        setShowAtTop(true)
      }

      if (secondSection) {
        const secondSectionTop = secondSection.getBoundingClientRect().top

        if (secondSectionTop <= window.innerHeight) {
          setShowAtBottom(true)
        } else {
          setShowAtBottom(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

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

  const handleTicketClick = () => {
    setIsAnimatingToCenter(true)
    setTimeout(() => {
      setShowTicketPopup(true)
    }, 500)
  }

  const handleClosePopup = () => {
    setShowTicketPopup(false)
    setTimeout(() => {
      setIsAnimatingToCenter(false)
    }, 300)
  }

  return (
    <>
      {/* Top promo bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-[#C8A55C] text-[#0B1C2C] overflow-hidden transition-all duration-300 ease-out ${
          showAtTop ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="relative h-6 flex items-center justify-center">
            <div
              className={`transition-all duration-600 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-[11px] md:text-xs font-bold tracking-widest text-center leading-none">
                {promoMessages[currentPromoIndex].text}
              </p>
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
        <div className="container mx-auto px-4">
          <div className="relative h-6 flex items-center justify-center">
            <div
              className={`transition-all duration-600 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-[11px] md:text-xs font-bold tracking-widest text-center leading-none">
                {promoMessages[currentPromoIndex].text}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleTicketClick}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-[70] transition-all duration-500 ease-out hover:scale-105 ${
          isAnimatingToCenter
            ? "!left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 scale-110"
            : "-translate-x-[55%] animate-wiggle"
        }`}
        style={{
          animation: isAnimatingToCenter ? "none" : undefined,
        }}
      >
        <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ticket shape */}
          <path
            d="M10 10 L160 10 C165 10 170 15 170 20 L170 40 C165 40 160 45 160 50 C160 55 165 60 170 60 L170 80 C170 85 165 90 160 90 L10 90 C5 90 0 85 0 80 L0 60 C5 60 10 55 10 50 C10 45 5 40 0 40 L0 20 C0 15 5 10 10 10 Z"
            fill="#C8A55C"
          />
          {/* Perforated line */}
          <line
            x1="140"
            y1="15"
            x2="140"
            y2="35"
            stroke="#0B1C2C"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.3"
          />
          <line
            x1="140"
            y1="65"
            x2="140"
            y2="85"
            stroke="#0B1C2C"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.3"
          />
          {/* Text */}
          <text x="75" y="35" fill="#0B1C2C" fontSize="16" fontWeight="bold" textAnchor="middle">
            SPECIAL
          </text>
          <text x="75" y="55" fill="#0B1C2C" fontSize="20" fontWeight="bold" textAnchor="middle">
            {promoMessages[currentPromoIndex].discount}
          </text>
          <text x="75" y="72" fill="#0B1C2C" fontSize="10" textAnchor="middle" opacity="0.8">
            Click for details
          </text>
        </svg>
      </button>

      {showTicketPopup && (
        <div
          className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClosePopup}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-8 relative animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
            <div className="text-center">
              <div className="inline-block bg-[#C8A55C] text-[#0B1C2C] px-6 py-3 rounded-lg mb-4">
                <p className="text-3xl font-bold">{promoMessages[currentPromoIndex].discount}</p>
              </div>
              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-4">{promoMessages[currentPromoIndex].text}</h3>
              <p className="text-gray-600 mb-6">
                Limited time offer! Get incredible savings on premium flagpoles and accessories.
              </p>
              <button
                onClick={handleClosePopup}
                className="w-full bg-[#0B1C2C] text-white py-3 rounded-lg font-semibold hover:bg-[#0B1C2C]/90 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
