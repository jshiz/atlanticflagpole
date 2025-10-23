"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

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
    <>
      <section className="relative w-full min-h-[500px] md:min-h-[550px] lg:min-h-[650px] overflow-hidden">
        <Image
          src="/images/design-mode/AtlanticFlagPoleHero.jpg"
          alt="Beautiful home with American flag on premium flagpole"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[75%_center]"
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11, 28, 44, 0.88) 0%, rgba(11, 28, 44, 0.70) 35%, rgba(11, 28, 44, 0.40) 65%, rgba(11, 28, 44, 0.15) 100%)",
          }}
        />

        <div className="relative z-10 flex items-center min-h-[500px] md:min-h-[550px] lg:min-h-[650px] px-4 md:px-12 lg:px-16 py-8 md:py-10">
          <div className="max-w-[480px] w-full">
            <div className="inline-block bg-white text-[#0B1C2C] px-3 py-1.5 mb-3 font-bold text-[10px] md:text-xs tracking-widest uppercase shadow-md">
              FALL INTO SAVINGS
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 leading-tight">
              Our Biggest
              <br />
              Offer Ever!
            </h1>

            <p className="text-xl md:text-3xl lg:text-4xl text-white font-light leading-tight mb-3 md:mb-4">
              Up To 60% Off Flagpoles{" "}
              <span className="text-base md:text-xl lg:text-2xl">
                +$599 Of Accessories Included!<span className="text-red-400">*</span>
              </span>
            </p>

            <div className="flex flex-col items-start gap-2 max-w-[360px]">
              <div className="bg-white rounded-md p-2.5 w-full shadow-lg">
                <p className="text-[#0B1C2C] text-xs md:text-sm font-semibold mb-1.5 text-center">
                  Order Today For Fastest Shipping
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.days}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">DAYS</div>
                  </div>
                  <div className="text-base text-[#0B1C2C]">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.hours}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">HRS</div>
                  </div>
                  <div className="text-base text-[#0B1C2C]">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">MIN</div>
                  </div>
                  <div className="text-base text-[#0B1C2C]">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.seconds}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">SEC</div>
                  </div>
                </div>
              </div>

              <div className="relative w-full">
                <Link
                  href="/products"
                  className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] text-center font-bold text-sm py-3 px-6 rounded-md transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300"
                >
                  Shop Flagpoles
                </Link>

                <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-lg border-2 border-[#C8A55C] rotate-12 hover:rotate-6 transition-transform duration-300">
                  <img
                    src="/images/design-mode/award.png"
                    alt="Award"
                    className="w-4 h-4 md:w-5 md:h-5 object-contain"
                  />
                  <div className="flex flex-col leading-none">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-[9px] md:text-[10px] ${i < Math.floor(rating) ? "text-[#C8A55C]" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-[#0B1C2C] text-[8px] md:text-[9px] font-bold whitespace-nowrap">
                      {rating.toFixed(1)} ({reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wide">
                  IN STOCK • SHIPS IN 1-2 BUSINESS DAYS
                </p>
              </div>
            </div>

            <p className="text-white/60 text-[10px] md:text-xs mt-2">*See Terms</p>
          </div>
        </div>

        <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-center z-20">
          <div className="inline-block bg-[#0B1C2C]/85 backdrop-blur-sm px-5 py-1.5 rounded-full mb-3 border-2 border-[#C8A55C]/40">
            <p className="text-white text-base font-bold tracking-wide">America's #1 Hybrid Luxury Flagpole</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="https://judge.me/reviews/stores/atlanticflagpole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white rounded-full overflow-hidden shadow-lg border-[3px] border-[#C8A55C] hover:border-[#D8B56C] hover:scale-110 transition-all duration-300 flex items-center justify-center p-1.5 relative"
            >
              <Image
                src="/images/ten-percent-badge.svg"
                alt="10% Pledge"
                fill
                className="object-contain p-1.5"
                sizes="64px"
              />
            </Link>
            <Link
              href="https://www.bbb.org/us/ny/albany/profile/flag-poles/atlantic-flag-and-pole-0041-235985313/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-[3px] border-[#C8A55C] hover:border-[#D8B56C] hover:scale-110 transition-all duration-300 relative"
            >
              <Image src="/images/bbb-logo.webp" alt="BBB Accredited" fill className="object-cover" sizes="64px" />
            </Link>
            <Link
              href="https://judge.me/reviews/stores/atlanticflagpole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white rounded-full overflow-hidden shadow-lg border-[3px] border-[#C8A55C] hover:border-[#D8B56C] hover:scale-110 transition-all duration-300 flex items-center justify-center p-1.5 relative"
            >
              <Image
                src="/images/one-percent-planet.svg"
                alt="1% for Planet"
                fill
                className="object-contain p-1.5"
                sizes="64px"
              />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6 z-20">
          <p className="text-white text-sm md:text-base font-serif drop-shadow-lg">Prices Starting From $299</p>
        </div>
      </section>

      <div className="bg-[#0B1C2C] py-3 overflow-hidden border-y-2 border-[#C8A55C]/30">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-12">
              <div className="flex items-center gap-2">
                <span className="text-[#C8A55C] text-lg">★</span>
                <span className="text-[#C8A55C] font-semibold text-sm tracking-wide">Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C8A55C] text-lg">★</span>
                <span className="text-[#C8A55C] font-semibold text-sm tracking-wide">Free Shipping & Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C8A55C] text-lg">★</span>
                <span className="text-[#C8A55C] font-semibold text-sm tracking-wide">
                  Join 1 Million Happy Americans™
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C8A55C] text-lg">★</span>
                <span className="text-[#C8A55C] font-semibold text-sm tracking-wide">365-Day Home Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C8A55C] text-lg">★</span>
                <span className="text-[#C8A55C] font-semibold text-sm tracking-wide">Premium Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C8A55C] text-lg">★</span>
                <span className="text-[#C8A55C] font-semibold text-sm tracking-wide">Made in USA</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  )
}
