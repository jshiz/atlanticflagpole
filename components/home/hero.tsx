"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type HeroProps = {
  bgImageSrc: string
  eyebrow?: string
  headline: string
  subhead?: string
  priceAnchor?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  badges?: { src: string; alt: string }[]
  showTimer?: boolean
}

export function Hero({
  bgImageSrc,
  eyebrow,
  headline,
  subhead,
  priceAnchor,
  primaryCta,
  secondaryCta,
  badges,
  showTimer = false,
}: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 7,
    minutes: 26,
    seconds: 25,
  })

  useEffect(() => {
    if (!showTimer) return

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
  }, [showTimer])

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImageSrc || "/placeholder.svg"}
          alt="Hero background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay - left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C2C] via-[#0B1C2C]/95 via-30% to-transparent to-70%" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="max-w-[560px]">
          {/* Eyebrow */}
          {eyebrow && (
            <div className="inline-block bg-[#C8A55C] text-[#0B1C2C] px-4 py-2 mb-6 font-bold text-sm tracking-wide uppercase">
              {eyebrow}
            </div>
          )}

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight text-balance">
            {headline}
          </h1>

          {/* Subhead */}
          {subhead && <p className="text-lg md:text-xl text-[#F5F3EF] mb-6 leading-relaxed">{subhead}</p>}

          {/* Timer */}
          {showTimer && (
            <div className="mb-6 bg-[#0B1C2C]/60 backdrop-blur-sm border border-[#C8A55C]/30 rounded-md p-4 inline-block">
              <p className="text-[#F5F3EF] text-sm mb-2 font-medium">Order Today For Fastest Shipping</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
                  <div className="text-xs text-[#C8A55C] uppercase tracking-wide">Days</div>
                </div>
                <div className="text-2xl text-white self-center">:</div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
                  <div className="text-xs text-[#C8A55C] uppercase tracking-wide">Hours</div>
                </div>
                <div className="text-2xl text-white self-center">:</div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
                  <div className="text-xs text-[#C8A55C] uppercase tracking-wide">Min</div>
                </div>
                <div className="text-2xl text-white self-center">:</div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
                  <div className="text-xs text-[#C8A55C] uppercase tracking-wide">Sec</div>
                </div>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link href={primaryCta.href} className="btn-gold">
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-outline-gold">
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {/* Price Anchor */}
          {priceAnchor && <p className="text-[#F5F3EF] text-lg mb-6">{priceAnchor}</p>}

          {/* Trust Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-4 items-center">
              {badges.map((badge, index) => (
                <img
                  key={index}
                  src={badge.src || "/placeholder.svg"}
                  alt={badge.alt}
                  className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
