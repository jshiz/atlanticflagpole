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
    price: "$979.71",
    badge: "BEST SELLER",
    variant: "20' Flagpole",
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle?variant=20",
  },
  {
    size: "25'",
    height: 25,
    title: "Maximum Impact",
    bestFor: "Farms, estates, commercial properties, and open spaces",
    description:
      "Make a bold statement with maximum visibility from the street and beyond. Perfect for larger properties, corner lots, farms, and businesses. This height ensures your flag can be seen from a distance and creates an impressive patriotic display.",
    price: "$1,079.71",
    variant: "25' Flagpole",
    href: "/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle?variant=25",
  },
]

export function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]) // Default to 20' (most popular)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B1C2C] mb-4 text-balance">
            Choose the Perfect Height for Your Property
          </h2>
          <p className="text-base md:text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed">
            All heights are <strong>installed height above ground</strong> — with an extra 1.5' for foundation depth.
          </p>
        </div>

        {/* Visual Representation */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl p-8 md:p-12 shadow-lg border-2 border-[#C8A55C]/20">
            <div className="relative h-[300px] md:h-[400px] flex items-end justify-center">
              {/* Ground line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-800 to-transparent" />

              {/* House silhouette - fixed size */}
              <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
                <svg
                  width="120"
                  height="100"
                  viewBox="0 0 120 100"
                  className="drop-shadow-xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* House body */}
                  <rect x="10" y="40" width="100" height="60" fill="#8B7355" />
                  {/* Roof */}
                  <path d="M 5 40 L 60 10 L 115 40 Z" fill="#6B5345" />
                  {/* Door */}
                  <rect x="45" y="65" width="30" height="35" fill="#5A4535" />
                  {/* Windows */}
                  <rect x="20" y="50" width="20" height="20" fill="#FFE4B5" />
                  <rect x="80" y="50" width="20" height="20" fill="#FFE4B5" />
                  {/* Window panes */}
                  <line x1="30" y1="50" x2="30" y2="70" stroke="#8B7355" strokeWidth="2" />
                  <line x1="20" y1="60" x2="40" y2="60" stroke="#8B7355" strokeWidth="2" />
                  <line x1="90" y1="50" x2="90" y2="70" stroke="#8B7355" strokeWidth="2" />
                  <line x1="80" y1="60" x2="100" y2="60" stroke="#8B7355" strokeWidth="2" />
                </svg>
              </div>

              {/* Flagpole - scales based on selected size */}
              <div
                className="absolute bottom-0 right-1/4 transform translate-x-1/2 transition-all duration-500 ease-out"
                style={{
                  height: `${(selectedSize.height / 25) * 100}%`,
                }}
              >
                {/* Pole */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-t from-[#8B8B8B] to-[#C0C0C0] rounded-t-full shadow-lg" />

                {/* Flag */}
                <div className="absolute top-2 left-1/2 w-16 h-10 bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-lg animate-[wave_3s_ease-in-out_infinite]">
                  {/* Stars section */}
                  <div className="absolute top-0 left-0 w-6 h-5 bg-blue-800" />
                </div>

                {/* Topper */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C8A55C] rounded-full shadow-md" />
              </div>

              {/* Height indicator */}
              <div className="absolute bottom-4 right-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border-2 border-[#C8A55C]">
                <div className="text-3xl font-bold text-[#0B1C2C]">{selectedSize.size}</div>
                <div className="text-xs text-[#666666] font-semibold">Installed Height</div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm md:text-base text-[#666666] font-medium">
                <span className="text-[#C8A55C] font-bold">{selectedSize.title}</span> — {selectedSize.description}
              </p>
            </div>
          </div>
        </div>

        {/* Size Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sizes.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setSelectedSize(item)}
                onClick={() => setSelectedSize(item)}
                className={`group relative bg-white rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  selectedSize.size === item.size
                    ? "border-[#C8A55C] shadow-xl scale-105"
                    : "border-[#E5E3DF] hover:border-[#C8A55C] hover:shadow-lg"
                }`}
              >
                {item.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C8A55C] to-[#D4AF37] text-[#0B1C2C] px-4 py-1 text-xs font-bold tracking-wider uppercase rounded-full shadow-md">
                    {item.badge}
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="text-5xl md:text-6xl font-bold text-[#0B1C2C] mb-2">{item.size}</div>
                  <div className="text-base font-bold text-[#C8A55C] mb-2">{item.title}</div>
                  <div className="text-sm text-[#666666] font-medium min-h-[60px] flex items-center justify-center leading-relaxed">
                    {item.bestFor}
                  </div>
                </div>

                <div className="text-center mb-4 pb-4 border-b border-[#E5E3DF]">
                  <div className="text-xs text-[#999999] uppercase tracking-wide mb-1">Starting at</div>
                  <div className="text-3xl font-bold text-[#0B1C2C]">{item.price}</div>
                </div>

                <Link
                  href={item.href}
                  className="flex items-center justify-center gap-2 text-[#C8A55C] hover:text-[#a88947] font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/product/phoenix-telescoping-flagpole-premier-kit-starter-bundle"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44] hover:from-[#1A2F44] hover:to-[#0B1C2C] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Choose Your Size
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-sm text-[#666666] mt-4">
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
