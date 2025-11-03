"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, X, Sparkles } from "lucide-react"
import Image from "next/image"

const sizes = [
  {
    size: "15'",
    height: 15,
    title: "Compact & Elegant",
    bestFor: "Perfect for suburban homes, RV's, camps, and smaller yards",
    description:
      "Ideal for properties with limited space or HOA restrictions. This height provides excellent flag visibility while maintaining a proportional aesthetic for single-story homes and townhouses. Popular with RV enthusiasts and vacation properties.",
    details:
      "Great for smaller lots, condos, and properties where a subtle yet patriotic display is desired. The 15' height is tall enough to be seen from the street while remaining proportional to most single-story homes.",
    price: "$779.71",
    variant: "15' Flagpole",
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle?variant=15",
  },
  {
    size: "20'",
    height: 20,
    title: "The Gold Standard",
    bestFor: "Most popular – ideal for standard residential homes",
    description:
      "The perfect balance of visibility and proportion for most properties. Recommended by professionals for standard two-story homes and typical suburban lots. This is our #1 seller for good reason – it's the sweet spot that works for 80% of homeowners.",
    details:
      "The 20' flagpole is the industry standard for residential properties. It's tall enough to be prominently visible from the street and neighboring properties, yet proportional to most two-story homes. This is the size most professionals recommend.",
    price: "$979.71",
    badge: "BEST SELLER",
    variant: "20' Flagpole",
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle?variant=20",
  },
  {
    size: "25'",
    height: 23,
    title: "Maximum Impact",
    bestFor: "Farms, estates, commercial properties, and open spaces",
    description:
      "Make a bold statement with maximum visibility from the street and beyond. Perfect for larger properties, corner lots, farms, and businesses. This height ensures your flag can be seen from a distance and creates an impressive patriotic display.",
    details:
      "For those who want maximum visibility and impact. The 25' flagpole towers over most residential properties and can be seen from blocks away. Ideal for corner lots, farms, estates, and commercial properties where you want to make a bold patriotic statement.",
    price: "$1,079.71",
    variant: "25' Flagpole",
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle?variant=25",
  },
]

function PaperboyGame({ onWin }: { onWin: () => void }) {
  const [paperboyX, setPaperboyX] = useState(0)
  const [newspaper, setNewspaper] = useState<{ x: number; y: number; active: boolean; falling: boolean } | null>(null)
  const [gameMessage, setGameMessage] = useState("Click the button to throw!")
  const animationRef = useRef<number>()
  const newspaperRef = useRef<number>()

  // Paperboy cycling animation
  useEffect(() => {
    const animate = () => {
      setPaperboyX((prev) => {
        if (prev > 100) return -10
        return prev + 0.06
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Newspaper physics
  useEffect(() => {
    if (!newspaper?.active && !newspaper?.falling) return

    const throwNewspaper = () => {
      setNewspaper((prev) => {
        if (!prev) return null

        // If falling, just drop straight down
        if (prev.falling) {
          const newY = prev.y + 1.5
          // Stop at ground level
          if (newY >= 95) {
            return { ...prev, y: 95, active: false, falling: false }
          }
          return { ...prev, y: newY }
        }

        // Normal throw physics - much slower
        const newX = prev.x + 0.4 // Slowed from 1.5 to 0.4
        const newY = prev.y - 1 + (newX - prev.x) * 0.2 // Adjusted arc

        // Check collision with door (center of house)
        const doorX = 50
        const doorY = 70
        const mailboxX = 20
        const mailboxY = 75

        const hitDoor = Math.abs(newX - doorX) < 8 && Math.abs(newY - doorY) < 10
        const hitMailbox = Math.abs(newX - mailboxX) < 5 && Math.abs(newY - mailboxY) < 8

        if (hitDoor || hitMailbox) {
          setGameMessage("🎉 Perfect throw! You won $20 off!")
          setTimeout(() => onWin(), 500)
          // Start falling to ground
          return { x: newX, y: newY, active: false, falling: true }
        }

        // Newspaper went off screen
        if (newX > 100 || newY > 100) {
          setGameMessage("Try again! Click the button to throw!")
          return { ...prev, active: false, falling: false }
        }

        return { x: newX, y: newY, active: true, falling: false }
      })
      newspaperRef.current = requestAnimationFrame(throwNewspaper)
    }

    newspaperRef.current = requestAnimationFrame(throwNewspaper)
    return () => {
      if (newspaperRef.current) cancelAnimationFrame(newspaperRef.current)
    }
  }, [newspaper?.active, newspaper?.falling, onWin])

  const handleThrow = () => {
    if (newspaper?.active) return
    setNewspaper({ x: paperboyX, y: 75, active: true, falling: false })
    setGameMessage("Nice throw! Aim for the door or mailbox!")
  }

  return (
    <div className="absolute inset-0">
      {/* Paperboy */}
      <div
        className="absolute bottom-28 pointer-events-none transition-transform z-[100]"
        style={{ left: `${paperboyX}%` }}
      >
        <div className="relative w-20 h-20 md:w-28 md:h-28">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bike-O8VNpgNtibHyuq4fLX2lu4TqguFcWS.gif"
            alt="Paperboy on bicycle"
            width={112}
            height={112}
            className="w-full h-full drop-shadow-lg"
            unoptimized
          />
        </div>
      </div>

      {/* Newspaper */}
      {(newspaper?.active || newspaper?.falling) && (
        <div
          className="absolute w-4 h-6 md:w-6 md:h-8 bg-white border-2 border-gray-400 shadow-lg transform rotate-45 transition-transform pointer-events-none"
          style={{ left: `${newspaper.x}%`, top: `${newspaper.y}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />
          <div className="absolute inset-1 border border-gray-400 opacity-50" />
        </div>
      )}

      {/* Game message */}
      <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90 backdrop-blur-sm z-50 px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-md pointer-events-none">
        <p className="text-[10px] md:text-xs font-semibold text-[#0B1C2C]">{gameMessage}</p>
      </div>

      <button
        onClick={handleThrow}
        disabled={newspaper?.active}
        className="absolute top-2 right-2 md:top-3 md:right-3 bg-gradient-to-r from-[#C8A55C] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C8A55C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-3 py-2 md:px-4 md:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all z-50 flex items-center gap-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 md:w-5 md:h-5"
        >
          <rect x="3" y="4" width="18" height="16" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
          <rect x="5" y="6" width="14" height="2" fill="white" opacity="0.9" />
          <rect x="5" y="9" width="10" height="1.5" fill="white" opacity="0.7" />
          <rect x="5" y="11.5" width="12" height="1.5" fill="white" opacity="0.7" />
          <rect x="5" y="14" width="8" height="1.5" fill="white" opacity="0.7" />
          <rect x="5" y="16.5" width="11" height="1.5" fill="white" opacity="0.7" />
        </svg>
        <span className="text-xs md:text-sm">Throw</span>
      </button>
    </div>
  )
}

function Fireworks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 rounded-full animate-firework"
          style={{
            left: `${50 + Math.random() * 20 - 10}%`,
            top: `${50 + Math.random() * 20 - 10}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  )
}

function CouponModal({ onClose }: { onClose: () => void }) {
  const couponCode = "PAPERBOY20"

  const handleApplyToCart = () => {
    // Store coupon in localStorage
    localStorage.setItem("pendingCoupon", couponCode)
    alert("Coupon saved! It will be applied at checkout.")
    onClose()
  }

  const handleSaveForLater = () => {
    localStorage.setItem("savedCoupon", couponCode)
    alert("Coupon saved for later!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="mb-4">
            <Sparkles className="w-16 h-16 text-[#C8A55C] mx-auto animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-2">Congratulations!</h2>
          <p className="text-gray-600 mb-6">You won a special discount!</p>

          <div className="bg-gradient-to-r from-[#C8A55C] to-[#D4AF37] rounded-xl p-6 mb-6">
            <p className="text-white text-sm font-semibold mb-2">YOUR COUPON CODE</p>
            <p className="text-white text-3xl md:text-4xl font-bold tracking-wider mb-2">{couponCode}</p>
            <p className="text-white text-xl md:text-2xl font-bold">$20 OFF</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleApplyToCart}
              className="w-full bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44] hover:from-[#1A2F44] hover:to-[#0B1C2C] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Apply to Cart
            </button>
            <button
              onClick={handleSaveForLater}
              className="w-full bg-white border-2 border-[#C8A55C] text-[#0B1C2C] font-bold py-3 px-6 rounded-lg hover:bg-[#C8A55C]/10 transition-all"
            >
              Save for Later
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Valid on your next purchase. Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </div>
  )
}

export function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState(sizes[1])
  const [showGame, setShowGame] = useState(true)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)

  const handleGameWin = () => {
    setShowFireworks(true)
    setTimeout(() => {
      setShowFireworks(false)
      setShowCouponModal(true)
      setShowGame(false)
    }, 2000)
  }

  const handleCloseCoupon = () => {
    setShowCouponModal(false)
    setShowGame(true)
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1C2C] mb-3 text-balance">
            Choose the Perfect Height for Your Property
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Hover or tap to see how each size looks next to your home
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-green-100 rounded-xl shadow-lg border border-[#C8A55C]/20 relative overflow-hidden">
            {showGame && <PaperboyGame onWin={handleGameWin} />}
            {showFireworks && <Fireworks />}

            <div className="relative h-[280px] md:h-[350px] flex items-end justify-center p-4 md:p-6">
              <div className="absolute bottom-0 -left-4 -right-4 md:-left-6 md:-right-6 w-auto h-16 bg-gradient-to-b from-gray-400 to-gray-500 opacity-50">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                {/* Road markings */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-400/40" />
              </div>

              <div className="absolute bottom-16 -left-4 -right-4 md:-left-6 md:-right-6 w-auto h-24 bg-gradient-to-b from-green-600 to-green-700 opacity-70">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.03)_3px,rgba(0,0,0,0.03)_6px)]" />
              </div>

              {/* Ground line */}
              <div className="absolute bottom-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-800/50 to-transparent" />

              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 -translate-x-12">
                <svg
                  width="320"
                  height="260"
                  viewBox="0 0 320 260"
                  className="drop-shadow-2xl w-[220px] h-[180px] md:w-[320px] md:h-[260px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Garage - square shape */}
                  <rect x="10" y="160" width="70" height="70" fill="#E8E4DC" stroke="#8B8B8B" strokeWidth="2" />
                  <path d="M 80 160 L 95 152 L 95 222 L 80 230 Z" fill="#D0CCC4" stroke="#8B8B8B" strokeWidth="1.5" />
                  <path d="M 5 160 L 45 130 L 85 160 Z" fill="#5A5A5A" stroke="#333" strokeWidth="2" />
                  <path d="M 85 160 L 100 152 L 60 122 L 45 130 Z" fill="#4A4A4A" stroke="#333" strokeWidth="1.5" />
                  <rect x="20" y="178" width="50" height="52" fill="#9B9B9B" stroke="#666" strokeWidth="2" />
                  <line x1="20" y1="195" x2="70" y2="195" stroke="#666" strokeWidth="1.5" />
                  <line x1="20" y1="212" x2="70" y2="212" stroke="#666" strokeWidth="1.5" />

                  <rect x="80" y="60" width="200" height="170" fill="#E8E4DC" stroke="#8B8B8B" strokeWidth="2" />
                  <path d="M 280 60 L 300 50 L 300 220 L 280 230 Z" fill="#D0CCC4" stroke="#8B8B8B" strokeWidth="1.5" />

                  {/* Main roof with 3D depth */}
                  <path d="M 75 60 L 180 5 L 285 60 Z" fill="#5A5A5A" stroke="#333" strokeWidth="2" />
                  <path d="M 285 60 L 305 50 L 200 -5 L 180 5 Z" fill="#4A4A4A" stroke="#333" strokeWidth="1.5" />

                  {/* Windows - second floor */}
                  <rect x="100" y="80" width="35" height="40" fill="#B8D8E8" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="100" y="80" width="35" height="40" fill="url(#windowGradient)" />
                  <line x1="117.5" y1="80" x2="117.5" y2="120" stroke="#2A2A2A" strokeWidth="2" />
                  <line x1="100" y1="100" x2="135" y2="100" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="92" y="80" width="6" height="40" fill="#1a1a1a" />
                  <rect x="136" y="80" width="6" height="40" fill="#1a1a1a" />

                  <rect x="162.5" y="80" width="35" height="40" fill="#B8D8E8" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="162.5" y="80" width="35" height="40" fill="url(#windowGradient)" />
                  <line x1="180" y1="80" x2="180" y2="120" stroke="#2A2A2A" strokeWidth="2" />
                  <line x1="162.5" y1="100" x2="197.5" y2="100" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="154.5" y="80" width="6" height="40" fill="#1a1a1a" />
                  <rect x="198.5" y="80" width="6" height="40" fill="#1a1a1a" />

                  <rect x="225" y="80" width="35" height="40" fill="#B8D8E8" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="225" y="80" width="35" height="40" fill="url(#windowGradient)" />
                  <line x1="242.5" y1="80" x2="242.5" y2="120" stroke="#2A2A2A" strokeWidth="2" />
                  <line x1="225" y1="100" x2="260" y2="100" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="217" y="80" width="6" height="40" fill="#1a1a1a" />
                  <rect x="261" y="80" width="6" height="40" fill="#1a1a1a" />

                  {/* Windows - first floor */}
                  <rect x="100" y="155" width="35" height="48" fill="#B8D8E8" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="100" y="155" width="35" height="48" fill="url(#windowGradient)" />
                  <line x1="117.5" y1="155" x2="117.5" y2="203" stroke="#2A2A2A" strokeWidth="2" />
                  <line x1="100" y1="179" x2="135" y2="179" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="92" y="155" width="6" height="48" fill="#1a1a1a" />
                  <rect x="136" y="155" width="6" height="48" fill="#1a1a1a" />

                  <rect x="225" y="155" width="35" height="48" fill="#B8D8E8" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="225" y="155" width="35" height="48" fill="url(#windowGradient)" />
                  <line x1="242.5" y1="155" x2="242.5" y2="203" stroke="#2A2A2A" strokeWidth="2" />
                  <line x1="225" y1="179" x2="260" y2="179" stroke="#2A2A2A" strokeWidth="2" />
                  <rect x="217" y="155" width="6" height="48" fill="#1a1a1a" />
                  <rect x="261" y="155" width="6" height="48" fill="#1a1a1a" />

                  {/* Front door - centered */}
                  <rect x="165" y="165" width="30" height="65" fill="#5A4535" stroke="#3A2515" strokeWidth="2" />
                  <rect x="169" y="172" width="22" height="28" fill="#4A3525" stroke="#3A2515" strokeWidth="1" />
                  <rect x="169" y="202" width="22" height="25" fill="#4A3525" stroke="#3A2515" strokeWidth="1" />
                  <circle cx="185" cy="200" r="2.5" fill="#C8A55C" />

                  <ellipse cx="90" cy="230" rx="15" ry="12" fill="#2d5016" opacity="0.8" />
                  <ellipse cx="90" cy="225" rx="12" ry="10" fill="#3d6b1f" />
                  <ellipse cx="270" cy="230" rx="15" ry="12" fill="#2d5016" opacity="0.8" />
                  <ellipse cx="270" cy="225" rx="12" ry="10" fill="#3d6b1f" />
                  <ellipse cx="150" cy="232" rx="12" ry="10" fill="#2d5016" opacity="0.8" />
                  <ellipse cx="150" cy="228" rx="10" ry="8" fill="#3d6b1f" />
                  <ellipse cx="210" cy="232" rx="12" ry="10" fill="#2d5016" opacity="0.8" />
                  <ellipse cx="210" cy="228" rx="10" ry="8" fill="#3d6b1f" />
                </svg>
              </div>

              <div className="absolute bottom-16 left-[15%] md:left-[20%]">
                <svg width="40" height="80" viewBox="0 0 40 80" className="w-[30px] h-[60px] md:w-[40px] md:h-[80px]">
                  {/* Post */}
                  <rect x="17" y="30" width="6" height="50" fill="#6B4423" />
                  <rect x="20" y="30" width="3" height="50" fill="#8B5A3C" />
                  {/* Mailbox */}
                  <rect x="8" y="20" width="24" height="16" rx="2" fill="#2A2A2A" stroke="#1A1A1A" strokeWidth="1" />
                  <rect x="10" y="22" width="20" height="12" rx="1" fill="#3A3A3A" />
                  <rect x="28" y="24" width="4" height="8" fill="#C8A55C" />
                </svg>
              </div>

              <div
                className="absolute bottom-16 left-1/2 transform translate-x-16 md:translate-x-24 transition-all duration-700 ease-out"
                style={{
                  height: `${(selectedSize.height / 25) * 85}%`,
                }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 md:w-3 h-full rounded-t-full shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6A6A6A] via-[#C0C0C0] to-[#7A7A7A]" />
                  <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-black/20 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-transparent via-white/40 to-transparent" />
                  <div className="absolute inset-y-0 left-[35%] w-[30%] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>

                {/* Flag */}
                <div className="absolute top-2 left-1/2 w-16 h-11 md:w-22 md:h-15 shadow-xl animate-[wave_3s_ease-in-out_infinite] origin-left overflow-hidden rounded-sm">
                  <svg width="100%" height="100%" viewBox="0 0 190 100" xmlns="http://www.w3.org/2000/svg">
                    {/* 13 stripes */}
                    <rect x="0" y="0" width="190" height="7.69" fill="#B22234" />
                    <rect x="0" y="7.69" width="190" height="7.69" fill="white" />
                    <rect x="0" y="15.38" width="190" height="7.69" fill="#B22234" />
                    <rect x="0" y="23.08" width="190" height="7.69" fill="white" />
                    <rect x="0" y="30.77" width="190" height="7.69" fill="#B22234" />
                    <rect x="0" y="38.46" width="190" height="7.69" fill="white" />
                    <rect x="0" y="46.15" width="190" height="7.69" fill="#B22234" />
                    <rect x="0" y="53.85" width="190" height="7.69" fill="white" />
                    <rect x="0" y="61.54" width="190" height="7.69" fill="#B22234" />
                    <rect x="0" y="69.23" width="190" height="7.69" fill="white" />
                    <rect x="0" y="76.92" width="190" height="7.69" fill="#B22234" />
                    <rect x="0" y="84.62" width="190" height="7.69" fill="white" />
                    <rect x="0" y="92.31" width="190" height="7.69" fill="#B22234" />
                    {/* Blue canton */}
                    <rect x="0" y="0" width="76" height="53.85" fill="#3C3B6E" />
                    {/* Stars */}
                    <circle cx="12.67" cy="8.97" r="3" fill="white" />
                    <circle cx="38" cy="8.97" r="3" fill="white" />
                    <circle cx="63.33" cy="8.97" r="3" fill="white" />
                    <circle cx="12.67" cy="26.92" r="3" fill="white" />
                    <circle cx="38" cy="26.92" r="3" fill="white" />
                    <circle cx="63.33" cy="26.92" r="3" fill="white" />
                    <circle cx="12.67" cy="44.88" r="3" fill="white" />
                    <circle cx="38" cy="44.88" r="3" fill="white" />
                    <circle cx="63.33" cy="44.88" r="3" fill="white" />
                  </svg>
                </div>

                {/* Gold ball topper */}
                <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-[#FFD700] via-[#FFC700] to-[#C8A55C] rounded-full shadow-lg border-2 border-[#a88947]" />
              </div>

              {/* Size selector buttons */}
              <div className="absolute bottom-24 right-2 md:bottom-28 md:right-4 flex flex-col gap-1.5 md:gap-2 z-10">
                {sizes.map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setSelectedSize(item)}
                    onMouseEnter={() => setSelectedSize(item)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-sm md:text-base transition-all duration-300 shadow-lg ${
                      selectedSize.size === item.size
                        ? "bg-gradient-to-r from-[#C8A55C] to-[#D4AF37] text-[#0B1C2C] border-2 border-[#a88947]"
                        : "bg-white/95 backdrop-blur-sm text-[#666666] border border-[#C8A55C] hover:bg-[#C8A55C]/30 hover:text-[#0B1C2C]"
                    }`}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description below visualization */}
            <div className="text-center mt-3 md:mt-4 px-2">
              <p className="text-xs md:text-sm text-[#666666] font-medium leading-relaxed">
                <span className="text-[#C8A55C] font-bold">{selectedSize.title}</span> — {selectedSize.details}
              </p>
            </div>
          </div>
        </div>

        {/* Size Cards - more compact */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {sizes.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setSelectedSize(item)}
                onClick={() => setSelectedSize(item)}
                className={`group relative bg-white rounded-xl p-4 md:p-6 border-2 transition-all duration-300 cursor-pointer ${
                  selectedSize.size === item.size
                    ? "border-[#C8A55C] shadow-xl scale-[1.02] md:scale-105"
                    : "border-[#E5E3DF] hover:border-[#C8A55C] hover:shadow-lg"
                }`}
              >
                {item.badge && (
                  <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C8A55C] to-[#D4AF37] text-[#0B1C2C] px-3 md:px-4 py-0.5 md:py-1 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full shadow-md">
                    {item.badge}
                  </div>
                )}

                <div className="text-center mb-3 md:mb-4">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1C2C] mb-1 md:mb-2">
                    {item.size}
                  </div>
                  <div className="text-sm md:text-base font-bold text-[#C8A55C] mb-1 md:mb-2">{item.title}</div>
                  <div className="text-xs md:text-sm text-[#666666] font-medium min-h-[45px] md:min-h-[60px] flex items-center justify-center leading-relaxed px-1">
                    {item.bestFor}
                  </div>
                </div>

                <div className="text-center mb-3 md:mb-4 pb-3 md:pb-4 border-b border-[#E5E3DF]">
                  <div className="text-[10px] md:text-xs text-[#999999] uppercase tracking-wide mb-0.5 md:mb-1">
                    Starting at
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[#0B1C2C]">{item.price}</div>
                </div>

                <Link
                  href={item.href}
                  className="flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44] hover:from-[#1A2F44] hover:to-[#0B1C2C] text-white font-semibold text-xs md:text-sm group-hover:gap-3 transition-all"
                >
                  View Details
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-10">
            <Link
              href="/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle"
              className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44] hover:from-[#1A2F44] hover:to-[#0B1C2C] text-white font-bold text-base md:text-lg py-3 md:py-4 px-8 md:px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Choose Your Size
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <p className="text-xs md:text-sm text-[#666666] mt-3 md:mt-4">
              All kits include everything you need for professional installation
            </p>
          </div>
        </div>
      </div>

      {showCouponModal && <CouponModal onClose={handleCloseCoupon} />}

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateX(0) rotateY(0deg);
          }
          50% {
            transform: translateX(-2px) rotateY(-5deg);
          }
        }
        @keyframes firework {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 50px), var(--ty, -100px)) scale(0);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-firework {
          --tx: ${Math.random() * 200 - 100}px;
          --ty: ${Math.random() * 200 - 100}px;
          animation: firework 1.5s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
