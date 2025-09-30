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
    <section className="relative w-full bg-[#0B1C2C]">
      <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
        {/* Left Content Column */}
        <div className="relative z-10 flex items-center px-6 md:px-12 lg:px-16 py-8 lg:py-12">
          <div className="max-w-[520px]">
            {/* Eyebrow Badge */}
            <div className="inline-block bg-white text-[#0B1C2C] px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
              FALL INTO SAVINGS
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              Our Biggest Offer Ever!
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-tight mb-6">
              Up To 60% Off Flagpoles{" "}
              <span className="text-xl md:text-2xl">
                +$599 Of Accessories Included!<span className="text-red-500">*</span>
              </span>
            </p>

            {/* Timer Box */}
            <div className="bg-white rounded-sm p-4 mb-4 inline-block">
              <p className="text-[#0B1C2C] text-sm font-semibold mb-2">Order Today For Fastest Shipping</p>
              <div className="flex items-center gap-2">
                <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                  <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.days}</div>
                  <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">DAYS</div>
                </div>
                <div className="text-xl text-white font-light">.</div>
                <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                  <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.hours}</div>
                  <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">HRS</div>
                </div>
                <div className="text-xl text-white font-light">.</div>
                <div className="bg-[#0B1C2C] px-3 py-2 rounded-sm min-w-[60px] text-center">
                  <div className="text-2xl font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                  <div className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1">MIN</div>
                </div>
                <div className="text-xl text-white font-light">.</div>
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
              <p className="text-xs font-bold text-white uppercase tracking-wide">
                IN STOCK SHIPS IN 1-2 BUSINESS DAYS
              </p>
            </div>

            {/* Terms */}
            <p className="text-white/60 text-xs">*See Terms</p>
          </div>
        </div>

        {/* Right Image Column - Adjusted to show flag on right side */}
        <div className="relative bg-gray-900 min-h-[400px] lg:min-h-full overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtlanticFlagPoleHero-GGcq1dhWXSAN3gOTUl0l1TJBWaNu2a.jpg"
            alt="Beautiful home with American flag on premium flagpole"
            className="w-full h-full object-cover object-[75%_center]"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0B1C2C] via-[#0B1C2C]/40 to-transparent pointer-events-none"
            style={{ width: "25%" }}
          ></div>

          {/* Award Badges Overlay */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white text-sm font-semibold mb-3 drop-shadow-lg">America's #1 Hybrid Luxury Flagpole</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-[#0B1C2C]">AD</div>
                  <div className="text-[7px] text-[#0B1C2C]">DESIGN</div>
                  <div className="text-[7px] text-[#0B1C2C]">AWARD</div>
                </div>
              </div>
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-[#0B1C2C]">Forbes</div>
                  <div className="text-[7px] text-[#0B1C2C]">Best of</div>
                  <div className="text-[7px] text-[#0B1C2C]">2025</div>
                </div>
              </div>
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-red-600">CNET</div>
                  <div className="text-[7px] text-[#0B1C2C]">Best of</div>
                  <div className="text-[7px] text-[#0B1C2C]">2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Anchor at Bottom */}
          <div className="absolute bottom-6 left-6">
            <p className="text-white text-lg font-serif drop-shadow-lg">Prices Starting From $299</p>
          </div>
        </div>
      </div>
    </section>
  )
}
