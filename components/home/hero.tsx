"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Shield, Wind, Lock, Award, CheckCircle, Gem } from "lucide-react"

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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

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

  const rating = judgemeStats?.averageRating ?? 4.9
  const reviewCount = judgemeStats?.totalReviews ?? 2500

  console.log("[v0] Hero rendering with Judge.me stats:", { rating, reviewCount, judgemeStats })

  return (
    <>
      <section className="relative w-full min-h-[500px] md:min-h-[550px] lg:min-h-[650px] overflow-hidden">
        <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newhero-OkNES0uBM9oLSoBk3L4YNHu0gLfHAA.avif"
            alt="Beautiful home with American flag on premium flagpole"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11, 28, 44, 0.88) 0%, rgba(11, 28, 44, 0.70) 35%, rgba(11, 28, 44, 0.40) 65%, rgba(11, 28, 44, 0.15) 100%)",
          }}
        />

        <div className="relative z-10 flex items-center justify-between min-h-[500px] md:min-h-[550px] lg:min-h-[650px] px-4 md:px-12 lg:px-16 py-8 md:py-10">
          <div
            className={`max-w-[480px] w-full transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div
              className={`inline-block bg-white text-[#0B1C2C] px-3 py-1.5 mb-3 font-bold text-[10px] md:text-xs tracking-widest uppercase shadow-md transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              FALL INTO SAVINGS
            </div>

            <h1
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 leading-tight transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              Our Biggest
              <br />
              Offer Ever!
            </h1>

            <p
              className={`text-xl md:text-3xl lg:text-4xl text-white font-light leading-tight mb-3 md:mb-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              Up To <span className="text-white font-bold">40%</span> Off Flagpoles
              <br />
              <span className="text-base md:text-xl lg:text-2xl">
                +<span className="text-white font-bold">$255</span> Of Accessories Included!
                <span className="text-white">*</span>
              </span>
            </p>

            <div
              className={`flex flex-col items-start gap-2 max-w-[360px] transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="bg-white rounded-md p-2.5 w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-[#0B1C2C] text-xs md:text-sm font-semibold mb-1.5 text-center">
                  Order Today For Fastest Shipping
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center hover:scale-105 transition-transform duration-200">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.days}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">DAYS</div>
                  </div>
                  <div className="text-base text-[#0B1C2C]">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center hover:scale-105 transition-transform duration-200">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.hours}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">HRS</div>
                  </div>
                  <div className="text-base text-[#0B1C2C]">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center hover:scale-105 transition-transform duration-200">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">MIN</div>
                  </div>
                  <div className="text-base text-[#0B1C2C]">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 rounded min-w-[44px] text-center hover:scale-105 transition-transform duration-200">
                    <div className="text-lg font-bold text-white tabular-nums">{timeLeft.seconds}</div>
                    <div className="text-[7px] text-white/80 uppercase tracking-widest font-bold">SEC</div>
                  </div>
                </div>
              </div>

              <div className="relative w-full">
                <Link
                  href="/products"
                  className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] text-center font-bold text-sm py-3 px-6 rounded-md transition-all shadow-lg hover:shadow-2xl hover:scale-[1.03] duration-300"
                >
                  Shop Flagpoles
                </Link>

                <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-lg border-2 border-[#C8A55C] rotate-12 hover:rotate-6 hover:scale-110 transition-all duration-300">
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

          <div
            className={`hidden lg:block max-w-[280px] transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-xl border border-[#C8A55C]/30">
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-10 h-10 text-[#C8A55C]" />
              </div>
              <h3 className="text-[#0B1C2C] text-lg font-bold text-center mb-2 leading-tight">
                The Last Flagpole You'll Ever Need.
              </h3>
              <p className="text-[#0B1C2C]/70 text-center text-sm leading-snug mb-4">
                365-Day Guarantee • Forever Warranty
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center text-center">
                  <Wind className="w-6 h-6 text-[#C8A55C] mb-1" />
                  <span className="text-xs font-semibold text-[#0B1C2C]">100 MPH</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Lock className="w-6 h-6 text-[#C8A55C] mb-1" />
                  <span className="text-xs font-semibold text-[#0B1C2C]">Anti-Theft</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-center z-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-block bg-[#0B1C2C]/70 backdrop-blur-sm border border-[#C8A55C]/50 rounded-lg px-6 py-2.5 mb-3 shadow-lg">
            <h2 className="text-white text-base lg:text-lg xl:text-xl font-semibold drop-shadow-lg whitespace-nowrap">
              Built to Defy the Storm. Designed to Honor the Flag.
            </h2>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            {[
              { src: "/images/ten-percent-badge.svg", alt: "10% Pledge", delay: "delay-[600ms]" },
              { src: "/images/bbb-logo.webp", alt: "BBB Accredited", delay: "delay-[700ms]" },
              { src: "/images/one-percent-planet.svg", alt: "1% for Planet", delay: "delay-[750ms]" },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/madeinusabadge-lV1WdGQGgGLFMrb7p8HQc5WnBMQ6ES.jpg",
                alt: "Made in USA",
                delay: "delay-[800ms]",
              },
            ].map((badge, index) => (
              <Link
                key={index}
                href={
                  index === 1
                    ? "https://www.bbb.org/us/ny/albany/profile/flag-poles/atlantic-flag-and-pole-0041-235985313/"
                    : "https://judge.me/reviews/stores/atlanticflagpole.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 lg:w-16 lg:h-16 ${index === 1 ? "" : "bg-white"} rounded-full overflow-hidden shadow-md border-2 border-[#C8A55C] hover:border-[#D8B56C] hover:scale-110 transition-all duration-300 flex items-center justify-center relative ${badge.delay} ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              >
                <Image
                  src={badge.src || "/placeholder.svg"}
                  alt={badge.alt}
                  fill
                  className={`object-${index === 1 ? "cover" : "contain"} ${index === 3 ? "scale-75" : index === 1 ? "" : "p-1.5"}`}
                  sizes="64px"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6 z-20">
          <p className="text-white text-sm md:text-base font-serif drop-shadow-lg">Prices Starting From $299</p>
        </div>
      </section>

      {/* First Marquee - Scrolling Left */}
      <div className="bg-[#0B1C2C] py-3 overflow-hidden border-b-2 border-[#C8A55C]/30">
        <div className="flex animate-marquee-seamless whitespace-nowrap">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-12 px-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">2,500+ 5★ Reviews</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">Forever Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">100 MPH Wind Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">Anti-Theft Promise</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">Made in USA</span>
              </div>
              <div className="flex items-center gap-3">
                <Gem className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">Premium Materials</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* As Seen On and Trusted By Section */}
      <div className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="flex items-center justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/as%20seen%20on-bB2aXokVrwbgjRpByiCMWod6CNDNks.png"
                alt="As seen on The First, Fox News, Newsmax, ABC, NBC, CBS"
                width={800}
                height={160}
                className="h-32 md:h-40 w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-gray-50 rounded-lg p-12 border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg font-semibold text-center">
                  Trusted By Section
                  <br />
                  U.S. Air Force, U.S. Army
                  <br />
                  Jesse Kelly, Bill O'Reilly, Skip Bedell
                  <br />
                  <span className="text-base">(Awaiting images)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Marquee - Scrolling Right */}
      <div className="bg-[#0B1C2C] py-3 overflow-hidden border-b-2 border-[#C8A55C]/30">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-12 px-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">BBB A+ Rating</span>
              </div>
              <div className="flex items-center gap-3">
                <Gem className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">
                  LEGENDARY Phoenix 365-Day Money Back Guarantee
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">
                  Join 1 Million Happy Americans
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">365-Day Home Trial</span>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">Free Shipping & Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-base tracking-wide">Lifetime Warranty</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
