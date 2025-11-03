"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
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
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
  },
  {
    size: "25'",
    height: 25,
    title: "Maximum Impact",
    bestFor: "Farms, estates, commercial properties, and open spaces",
    description:
      "Make a bold statement with maximum visibility from the street and beyond. Perfect for larger properties, corner lots, farms, and businesses. This height ensures your flag can be seen from a distance and creates an impressive patriotic display.",
    details:
      "For those who want maximum visibility and impact. The 25' flagpole towers over most residential properties and can be seen from blocks away. Ideal for corner lots, farms, estates, and commercial properties where you want to make a bold patriotic statement.",
    price: "$1,079.71",
    variant: "25' Flagpole",
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
  },
]

export function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]) // Default to 20' (most popular)

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

        {/* Compact Visual Representation */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-gradient-to-b from-sky-50 to-green-50 rounded-xl p-4 md:p-6 shadow-lg border border-[#C8A55C]/20">
            <div className="relative h-[200px] md:h-[280px] flex items-end justify-center">
              {/* Ground line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-700/50 to-transparent" />

              <div className="absolute bottom-0 left-[15%] md:left-[20%] transform -translate-x-1/2">
                <svg
                  width="220"
                  height="160"
                  viewBox="0 0 220 160"
                  className="drop-shadow-2xl w-[160px] h-[120px] md:w-[220px] md:h-[160px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Garage - left side */}
                  <rect x="10" y="80" width="50" height="80" fill="#D8D4CC" stroke="#8B8B8B" strokeWidth="1.5" />
                  {/* Garage roof */}
                  <path d="M 5 80 L 35 60 L 65 80 Z" fill="#5A5A5A" stroke="#333" strokeWidth="1.5" />
                  {/* Garage door */}
                  <rect x="17" y="100" width="36" height="60" fill="#9B9B9B" stroke="#666" strokeWidth="1.5" />
                  <line x1="17" y1="115" x2="53" y2="115" stroke="#666" strokeWidth="1" />
                  <line x1="17" y1="130" x2="53" y2="130" stroke="#666" strokeWidth="1" />
                  <line x1="17" y1="145" x2="53" y2="145" stroke="#666" strokeWidth="1" />

                  {/* Main house body - taller for two stories */}
                  <rect x="60" y="40" width="150" height="120" fill="#E8E4DC" stroke="#8B8B8B" strokeWidth="1.5" />

                  {/* Main roof */}
                  <path d="M 55 40 L 135 5 L 215 40 Z" fill="#4A4A4A" stroke="#333" strokeWidth="1.5" />

                  {/* SECOND FLOOR WINDOWS - clearly separated from first floor */}
                  {/* Left window - second floor */}
                  <rect x="75" y="55" width="24" height="28" fill="#87CEEB" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="87" y1="55" x2="87" y2="83" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="75" y1="69" x2="99" y2="69" stroke="#2A2A2A" strokeWidth="1.5" />
                  {/* Shutters */}
                  <rect x="70" y="55" width="4" height="28" fill="#1a1a1a" />
                  <rect x="100" y="55" width="4" height="28" fill="#1a1a1a" />

                  {/* Center window - second floor */}
                  <rect x="123" y="55" width="24" height="28" fill="#87CEEB" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="135" y1="55" x2="135" y2="83" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="123" y1="69" x2="147" y2="69" stroke="#2A2A2A" strokeWidth="1.5" />
                  {/* Shutters */}
                  <rect x="118" y="55" width="4" height="28" fill="#1a1a1a" />
                  <rect x="148" y="55" width="4" height="28" fill="#1a1a1a" />

                  {/* Right window - second floor */}
                  <rect x="171" y="55" width="24" height="28" fill="#87CEEB" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="183" y1="55" x2="183" y2="83" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="171" y1="69" x2="195" y2="69" stroke="#2A2A2A" strokeWidth="1.5" />
                  {/* Shutters */}
                  <rect x="166" y="55" width="4" height="28" fill="#1a1a1a" />
                  <rect x="196" y="55" width="4" height="28" fill="#1a1a1a" />

                  {/* FIRST FLOOR WINDOWS - clearly below second floor */}
                  {/* Left window - first floor */}
                  <rect x="75" y="105" width="24" height="32" fill="#87CEEB" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="87" y1="105" x2="87" y2="137" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="75" y1="121" x2="99" y2="121" stroke="#2A2A2A" strokeWidth="1.5" />
                  {/* Shutters */}
                  <rect x="70" y="105" width="4" height="32" fill="#1a1a1a" />
                  <rect x="100" y="105" width="4" height="32" fill="#1a1a1a" />

                  {/* Right window - first floor */}
                  <rect x="171" y="105" width="24" height="32" fill="#87CEEB" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="183" y1="105" x2="183" y2="137" stroke="#2A2A2A" strokeWidth="1.5" />
                  <line x1="171" y1="121" x2="195" y2="121" stroke="#2A2A2A" strokeWidth="1.5" />
                  {/* Shutters */}
                  <rect x="166" y="105" width="4" height="32" fill="#1a1a1a" />
                  <rect x="196" y="105" width="4" height="32" fill="#1a1a1a" />

                  {/* Front door - centered */}
                  <rect x="125" y="110" width="20" height="50" fill="#5A4535" stroke="#3A2515" strokeWidth="1.5" />
                  <circle cx="140" cy="135" r="2" fill="#C8A55C" />
                </svg>
              </div>

              {/* Flagpole - scales based on selected size with smooth animation */}
              <div
                className="absolute bottom-0 right-[20%] md:right-[25%] transform translate-x-1/2 transition-all duration-700 ease-out"
                style={{
                  height: `${(selectedSize.height / 25) * 85}%`,
                }}
              >
                {/* Pole with gradient */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 md:w-2 h-full bg-gradient-to-t from-[#7A7A7A] via-[#B0B0B0] to-[#D0D0D0] rounded-t-full shadow-lg" />

                <div className="absolute top-2 left-1/2 w-14 h-9 md:w-20 md:h-13 shadow-xl animate-[wave_3s_ease-in-out_infinite] origin-left overflow-hidden rounded-sm">
                  <svg width="100%" height="100%" viewBox="0 0 190 100" xmlns="http://www.w3.org/2000/svg">
                    {/* 13 stripes (7 red, 6 white) */}
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

                    {/* 9 white stars in 3x3 grid - larger and more visible */}
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
                <div className="absolute -top-1.5 md:-top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-[#FFD700] to-[#C8A55C] rounded-full shadow-md border border-[#a88947]" />
              </div>

              {/* Height indicator - more compact */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-lg border border-[#C8A55C]">
                <div className="text-xl md:text-2xl font-bold text-[#0B1C2C]">{selectedSize.size}</div>
                <div className="text-[10px] md:text-xs text-[#666666] font-semibold">Height</div>
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
                  className="flex items-center justify-center gap-2 text-[#C8A55C] hover:text-[#a88947] font-semibold text-xs md:text-sm group-hover:gap-3 transition-all"
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
      `}</style>
    </section>
  )
}
