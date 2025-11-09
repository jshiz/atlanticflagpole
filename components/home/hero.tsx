"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Shield, Wind, Award, CheckCircle } from "lucide-react"

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

  return (
    <>
      <section className="relative w-full min-h-[550px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] overflow-hidden bg-[#0B1C2C]">
        {/* Background Image - centered on mobile, right-aligned on desktop */}
        <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Image
            src="/images/design-mode/newhero.avif"
            alt="Beautiful home with American flag on premium flagpole"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[65%_center] md:object-center lg:object-right"
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(11, 28, 44, 0.2) 0%, rgba(11, 28, 44, 0.3) 50%, rgba(11, 28, 44, 0.35) 100%), linear-gradient(90deg, rgba(11, 28, 44, 0.85) 0%, rgba(11, 28, 44, 0.4) 15%, rgba(11, 28, 44, 0.1) 30%, rgba(11, 28, 44, 0) 45%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-12 min-h-[550px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] flex flex-col justify-center">
          <div className="absolute top-2 md:top-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-24px)] max-w-[500px] md:w-auto flex justify-center">
            <div className="inline-block bg-[#0B1C2C]/95 backdrop-blur-sm border-2 border-[#C8A55C] rounded-lg md:rounded-xl px-3 py-1.5 md:px-4 md:py-2 shadow-2xl">
              <p className="text-white font-extrabold text-[10px] sm:text-xs md:text-lg lg:text-xl text-center leading-tight">
                Your Flag Deserves Better Than a Cheap Pole.
              </p>
            </div>
          </div>

          <div className="absolute top-[42px] sm:top-[48px] md:top-24 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-12 flex flex-col items-center gap-1.5 md:gap-4">
            <h3 className="text-white text-[9px] sm:text-[10px] md:text-sm font-extrabold tracking-wide text-center leading-tight px-2">
              America's #1 Flagpole Company
            </h3>
            <div className="flex items-center gap-2 md:gap-3">
              {[
                { src: "/images/ten-percent-badge.svg", alt: "10% Pledge" },
                { src: "/images/bbb-logo.webp", alt: "BBB Accredited" },
                { src: "/images/one-percent-planet.svg", alt: "1% for Planet" },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/madeinusabadge-y7lnHFiqBn1o0YpH7y5tKHymKkmgPA.jpg",
                  alt: "Made in USA",
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
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${index === 1 ? "" : "bg-white"} rounded-full overflow-hidden shadow-lg border-2 border-[#C8A55C] hover:border-[#D8B56C] hover:scale-110 transition-all duration-300 flex items-center justify-center relative flex-shrink-0`}
                >
                  <Image
                    src={badge.src || "/placeholder.svg"}
                    alt={badge.alt}
                    fill
                    className={`object-${index === 1 ? "cover" : "contain"} ${index === 1 ? "" : "p-1"}`}
                    sizes="64px"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Hidden lg:block section */}
          <div className="absolute bottom-16 md:bottom-20 lg:bottom-28 right-3 md:right-8 lg:right-12 hidden lg:block">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border-3 border-[#C8A55C] p-6 max-w-[280px]">
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Phoenix-flagpole-gold-AuN5dkO3XA16aLxg8Pl9D924ScFRDU.png"
                  alt="Phoenix Flagpole Gold Logo"
                  width={220}
                  height={80}
                  className="object-contain"
                />
                <div className="text-center space-y-2 mt-2">
                  <p className="text-[#0B1C2C] font-bold text-base leading-tight">
                    Revolutionary Telescoping Flagpoles
                  </p>
                  <p className="text-[#0B1C2C]/70 font-medium text-xs leading-relaxed">
                    Engineered with premium-grade aluminum and patented technology for effortless flag raising. Built to
                    withstand extreme weather and honor your patriotism for generations.
                  </p>
                  <div className="flex items-center justify-center gap-1 pt-2">
                    <Shield className="w-4 h-4 text-[#C8A55C]" />
                    <span className="text-[#C8A55C] font-bold text-xs uppercase tracking-wide">Lifetime Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl lg:max-w-2xl mt-[100px] sm:mt-[110px] md:mt-0 mx-auto md:mx-0 text-center md:text-left">
            {/* Sale Badge */}
            <div
              className={`inline-block bg-white text-[#0B1C2C] px-4 py-1.5 mb-2 md:mb-4 font-extrabold text-[11px] sm:text-xs md:text-sm tracking-widest uppercase shadow-lg transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              FALL INTO SAVINGS
            </div>

            <h1
              className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-2 md:mb-6 leading-tight transition-all duration-700 delay-100 drop-shadow-2xl font-bold ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Our Best Offer!
            </h1>

            <div
              className={`mb-3 md:mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-2">
                Up To <span className="font-extrabold">40% Off</span>
              </p>
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-2">
                Flagpoles <span className="text-base sm:text-lg md:text-3xl lg:text-4xl font-bold">+ $255 Of</span>
              </p>
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
                Accessories Included!<span className="text-white text-lg sm:text-xl md:text-2xl font-bold">*</span>
              </p>
            </div>

            <div
              className={`max-w-md mx-auto md:mx-0 mb-3 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-xl">
                <p className="text-[#0B1C2C] text-[11px] sm:text-xs md:text-base font-bold mb-2 md:mb-3 text-center">
                  Order Today For Fastest Shipping
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-[#0B1C2C] px-2 py-1.5 md:px-3 md:py-2 rounded min-w-[42px] sm:min-w-[48px] md:min-w-[50px] text-center">
                    <div className="text-lg sm:text-xl md:text-xl font-bold text-white tabular-nums">
                      {timeLeft.days}
                    </div>
                    <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold">
                      DAYS
                    </div>
                  </div>
                  <div className="text-base sm:text-lg md:text-lg text-[#0B1C2C] font-bold">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 md:px-3 md:py-2 rounded min-w-[42px] sm:min-w-[48px] md:min-w-[50px] text-center">
                    <div className="text-lg sm:text-xl md:text-xl font-bold text-white tabular-nums">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold">
                      HRS
                    </div>
                  </div>
                  <div className="text-base sm:text-lg md:text-lg text-[#0B1C2C] font-bold">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 md:px-3 md:py-2 rounded min-w-[42px] sm:min-w-[48px] md:min-w-[50px] text-center">
                    <div className="text-lg sm:text-xl md:text-xl font-bold text-white tabular-nums">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold">
                      MIN
                    </div>
                  </div>
                  <div className="text-base sm:text-lg md:text-lg text-[#0B1C2C] font-bold">:</div>
                  <div className="bg-[#0B1C2C] px-2 py-1.5 md:px-3 md:py-2 rounded min-w-[42px] sm:min-w-[48px] md:min-w-[50px] text-center">
                    <div className="text-lg sm:text-xl md:text-xl font-bold text-white tabular-nums">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-[7px] md:text-[8px] text-white/80 uppercase tracking-widest font-bold">
                      SEC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`max-w-md mx-auto md:mx-0 mb-3 md:mb-8 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <Link
                href="/products"
                className="block w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] text-center font-extrabold text-lg md:text-lg py-4 md:py-4 px-8 md:px-8 rounded-md transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02] duration-300"
              >
                Shop Flagpoles
              </Link>
            </div>

            <div
              className={`flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-4 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] sm:text-xs md:text-sm font-extrabold text-white uppercase tracking-wide">
                IN STOCK | SHIPS IN 1-2 BUSINESS DAYS
              </p>
            </div>

            {/* Terms */}
            <p
              className={`text-white/80 text-[10px] sm:text-xs md:text-sm mb-2 md:mb-8 transition-all duration-700 delay-600 font-semibold ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              *See Terms
            </p>
          </div>

          <div className="absolute bottom-2 md:bottom-10 left-1/2 -translate-x-1/2 md:left-8 lg:left-12 md:translate-x-0">
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-serif drop-shadow-lg font-extrabold text-center md:text-left">
              Prices Starting From $779
            </p>
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <div className="bg-[#0B1C2C] py-2.5 md:py-3 overflow-hidden border-b-2 border-[#C8A55C]/30">
        <div className="flex animate-scroll-fast whitespace-nowrap">
          {/* Duplicate the content 3 times for seamless infinite scroll */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-6 md:gap-12 px-4 md:px-6 flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <Award className="w-4 h-4 md:w-6 md:h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-xs md:text-base tracking-wide">
                  365-Day Home Trial
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Shield className="w-4 h-4 md:w-6 md:h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-xs md:text-base tracking-wide">
                  Forever Warranty
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Wind className="w-4 h-4 md:w-6 md:h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-xs md:text-base tracking-wide">Made in USA</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-[#C8A55C] flex-shrink-0" />
                <span className="text-[#C8A55C] font-semibold text-xs md:text-base tracking-wide">
                  Join 2.5 Million Happy American Homeowners
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing code here */}
      <div className="bg-white py-6 md:py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#0B1C2C] mb-4 md:mb-6">
            America's #1 Flagpole Company
          </h3>

          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="w-full max-w-2xl">
              <Image
                src="/images/as-seen-on-media.png"
                alt="As seen on The First, ABC, NBC, CBS, Fox News, Newsmax"
                width={700}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="text-center text-[#0B1C2C]/70 max-w-3xl text-sm md:text-base lg:text-lg leading-relaxed px-2">
              Featured on America's leading news networks including{" "}
              <span className="font-semibold text-[#0B1C2C]">Fox News</span>,{" "}
              <span className="font-semibold text-[#0B1C2C]">Newsmax</span>,{" "}
              <span className="font-semibold text-[#0B1C2C]">ABC</span>,{" "}
              <span className="font-semibold text-[#0B1C2C]">NBC</span>, and{" "}
              <span className="font-semibold text-[#0B1C2C]">CBS</span>. Trusted by thousands of American patriots for
              premium quality flagpoles that honor Old Glory.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
