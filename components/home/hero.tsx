"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 6,
    minutes: 31,
    seconds: 15,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full min-h-[700px] lg:min-h-[900px] overflow-hidden">
      {/* Full Background Image */}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtlanticFlagPoleHero-GGcq1dhWXSAN3gOTUl0l1TJBWaNu2a.jpg"
        alt="Beautiful home with American flag on premium flagpole"
        className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
      />

      {/* Blue Gradient Overlay - Left Side Only with Slant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(11, 28, 44, 0.95) 0%, rgba(11, 28, 44, 0.85) 20%, rgba(11, 28, 44, 0.6) 35%, rgba(11, 28, 44, 0.3) 45%, transparent 55%)",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center min-h-[700px] lg:min-h-[900px] px-6 md:px-12 lg:px-16 py-8 lg:py-12">
        <div className="max-w-[520px] w-full">
          {/* Eyebrow Badge */}
          <div className="inline-block bg-white text-[#0B1C2C] px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            FALL INTO SAVINGS
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Our Biggest
            <br />
            Offer Ever!
          </h1>

          {/* Subheadline */}
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight mb-6">
            Up To 60% Off Flagpoles{" "}
            <span className="text-xl md:text-2xl lg:text-3xl">
              +$599 Of Accessories Included!<span className="text-red-500">*</span>
            </span>
          </p>

          {/* Timer Box */}
          <div className="bg-white rounded-sm p-4 mb-4 w-full">
            <p className="text-[#0B1C2C] text-sm font-semibold mb-2">Order Today For Fastest Shipping</p>
            <div className="flex items-center justify-center gap-2">
              <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.days}</div>
                <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">DAYS</div>
              </div>
              <div className="text-xl text-[#0B1C2C] font-light">.</div>
              <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.hours}</div>
                <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">HRS</div>
              </div>
              <div className="text-xl text-[#0B1C2C] font-light">.</div>
              <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">MIN</div>
              </div>
              <div className="text-xl text-[#0B1C2C] font-light">.</div>
              <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.seconds}</div>
                <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">SEC</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/products"
            className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] text-center font-bold text-base py-3 px-8 rounded-sm transition-colors mb-3"
          >
            Shop Flagpoles
          </Link>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-xs font-bold text-white uppercase tracking-wide">IN STOCK SHIPS IN 1-2 BUSINESS DAYS</p>
          </div>

          {/* Terms */}
          <p className="text-white/60 text-xs">*See Terms</p>
        </div>
      </div>

      {/* Award Badges Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-white text-base font-semibold mb-4 drop-shadow-lg">America's #1 Hybrid Luxury Flagpole</p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#C8A55C]">
            <div className="text-center">
              <div className="text-sm font-bold text-[#0B1C2C]">AD</div>
              <div className="text-[8px] text-[#0B1C2C] leading-tight">DESIGN</div>
              <div className="text-[8px] text-[#0B1C2C] leading-tight">AWARD</div>
            </div>
          </div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#C8A55C]">
            <div className="text-center">
              <div className="text-sm font-bold text-[#0B1C2C]">Forbes</div>
              <div className="text-[8px] text-[#0B1C2C] leading-tight">Best of</div>
              <div className="text-[8px] text-[#0B1C2C] leading-tight">2025</div>
            </div>
          </div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#C8A55C]">
            <div className="text-center">
              <div className="text-sm font-bold text-red-600">CNET</div>
              <div className="text-[8px] text-[#0B1C2C] leading-tight">Best of</div>
              <div className="text-[8px] text-[#0B1C2C] leading-tight">2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Anchor at Bottom */}
      <div className="absolute bottom-6 left-6 z-20">
        <p className="text-white text-lg font-serif drop-shadow-lg">Prices Starting From $299</p>
      </div>
    </section>
  )
}
