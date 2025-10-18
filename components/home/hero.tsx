"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface HeroProps {
  judgemeStats?: {
    averageRating: number
    totalReviews: number
  }
}

export function Hero({ judgemeStats }: HeroProps = {}) {
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

  const rating = judgemeStats?.averageRating ?? 4.8
  const reviewCount = judgemeStats?.totalReviews ?? 1250

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[900px] overflow-hidden">
      {/* Full Background Image */}
      <img
        src="/images/design-mode/AtlanticFlagPoleHero.jpg"
        alt="Beautiful home with American flag on premium flagpole"
        className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11, 28, 44, 0.85) 0%, rgba(11, 28, 44, 0.65) 40%, rgba(11, 28, 44, 0.35) 70%, rgba(11, 28, 44, 0.15) 100%)",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center min-h-[600px] md:min-h-[700px] lg:min-h-[900px] px-4 md:px-12 lg:px-16 py-6 md:py-8 lg:py-12">
        <div className="max-w-[520px] w-full">
          {/* Eyebrow Badge */}
          <div className="inline-block bg-white text-[#0B1C2C] px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 font-bold text-[10px] md:text-xs tracking-widest uppercase">
            FALL INTO SAVINGS
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3 md:mb-4 leading-tight">
            Our Biggest
            <br />
            Offer Ever!
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-tight mb-4 md:mb-6">
            Up To 60% Off Flagpoles{" "}
            <span className="text-lg md:text-2xl lg:text-3xl">
              +$599 Of Accessories Included!<span className="text-red-500">*</span>
            </span>
          </p>

          <div className="flex flex-col items-start gap-2.5 md:gap-3 max-w-[380px]">
            <div className="bg-white rounded-sm p-2.5 md:p-3 w-full">
              <p className="text-[#0B1C2C] text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-center">
                Order Today For Fastest Shipping
              </p>
              <div className="flex items-center justify-center gap-1.5 md:gap-2">
                <div className="bg-[#0B1C2C] px-2 py-1 md:px-2.5 md:py-1.5 rounded-sm min-w-[48px] md:min-w-[55px] text-center">
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">{timeLeft.days}</div>
                  <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold mt-0.5">
                    DAYS
                  </div>
                </div>
                <div className="text-base md:text-lg text-[#0B1C2C] font-light">.</div>
                <div className="bg-[#0B1C2C] px-2 py-1 md:px-2.5 md:py-1.5 rounded-sm min-w-[48px] md:min-w-[55px] text-center">
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">{timeLeft.hours}</div>
                  <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold mt-0.5">
                    HRS
                  </div>
                </div>
                <div className="text-base md:text-lg text-[#0B1C2C] font-light">.</div>
                <div className="bg-[#0B1C2C] px-2 py-1 md:px-2.5 md:py-1.5 rounded-sm min-w-[48px] md:min-w-[55px] text-center">
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                  <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold mt-0.5">
                    MIN
                  </div>
                </div>
                <div className="text-base md:text-lg text-[#0B1C2C] font-light">.</div>
                <div className="bg-[#0B1C2C] px-2 py-1 md:px-2.5 md:py-1.5 rounded-sm min-w-[48px] md:min-w-[55px] text-center">
                  <div className="text-lg md:text-xl font-bold text-white tabular-nums">{timeLeft.seconds}</div>
                  <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold mt-0.5">
                    SEC
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <Link
                href="/products"
                className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] text-center font-bold text-sm py-2.5 px-6 rounded-sm transition-colors"
              >
                Shop Flagpoles
              </Link>

              <div className="absolute -top-2.5 -right-2.5 md:-top-3 md:-right-3 flex items-center gap-1 md:gap-1.5 bg-white px-2 py-1 md:px-2.5 md:py-1.5 rounded-full shadow-lg border-2 border-[#C8A55C] rotate-12">
                <img src="/images/design-mode/award.png" alt="Award" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                <div className="flex flex-col leading-none">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-[10px] md:text-xs ${i < Math.floor(rating) ? "text-[#C8A55C]" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[#0B1C2C] text-[9px] md:text-[10px] font-bold whitespace-nowrap">
                    {rating.toFixed(1)} ({reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wide">
                IN STOCK SHIPS IN 1-2 BUSINESS DAYS
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-white/60 text-[10px] md:text-xs mt-2 md:mt-3">*See Terms</p>
        </div>
      </div>

      {/* Hidden badges on mobile, shown on tablet+ */}
      <div className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 text-center z-20">
        <div className="inline-block bg-[#0B1C2C]/80 backdrop-blur-sm px-6 py-2 rounded-full mb-4 border-2 border-[#C8A55C]/30">
          <p
            className="text-white text-lg font-bold tracking-wide"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            America's #1 Hybrid Luxury Flagpole
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://judge.me/reviews/stores/atlanticflagpole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 bg-white rounded-full overflow-hidden shadow-lg border-[3px] border-[#C8A55C] hover:border-[#D8B56C] transition-colors flex items-center justify-center p-2"
          >
            <img src="/images/ten-percent-badge.svg" alt="10% Pledge Badge" className="w-full h-full object-contain" />
          </Link>
          <Link
            href="https://www.bbb.org/us/ny/albany/profile/flag-poles/atlantic-flag-and-pole-0041-235985313/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-[3px] border-[#C8A55C] hover:border-[#D8B56C] transition-colors"
          >
            <img src="/images/bbb-logo.webp" alt="BBB Accredited Business" className="w-full h-full object-cover" />
          </Link>
          <Link
            href="https://judge.me/reviews/stores/atlanticflagpole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 bg-white rounded-full overflow-hidden shadow-lg border-[3px] border-[#C8A55C] hover:border-[#D8B56C] transition-colors flex items-center justify-center p-2"
          >
            <img
              src="/images/one-percent-planet.svg"
              alt="1% for the Planet Member"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Price Anchor at Bottom */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
        <p className="text-white text-base md:text-lg font-serif drop-shadow-lg">Prices Starting From $299</p>
      </div>
    </section>
  )
}
