"use client"

import { useState } from "react"
import { Check, X, Shield, Star, Award, Wind, Wrench, Zap } from "lucide-react"

const comparisons = [
  {
    category: "Wind Resistance",
    icon: Wind,
    atlantic: {
      title: "Certified 100 MPH",
      description: "Engineered for hurricane-force winds. Stands firm when others fail.",
      specs: ["6061-T6 Aerospace Aluminum", "Tested & Certified", "Zero Failures Recorded"],
    },
    competitor: {
      title: "60 MPH or Less",
      description: "Standard aluminum that bends, rattles, and collapses in storms.",
      specs: ["Standard Aluminum", "No Testing", "Frequent Failures"],
    },
  },
  {
    category: "Warranty Coverage",
    icon: Shield,
    atlantic: {
      title: "Lifetime Forever Warranty",
      description: "We stand behind our flagpoles for life. No questions. No time limits.",
      specs: ["Lifetime Coverage", "Original Buyer", "Zero Hassle Claims"],
    },
    competitor: {
      title: "1-Year Limited",
      description: "Minimal coverage that expires fast. You're on your own after 12 months.",
      specs: ["1-Year Max", "Many Exclusions", "Complex Process"],
    },
  },
  {
    category: "Corrosion Resistance",
    icon: Award,
    atlantic: {
      title: "Never Rusts or Corrodes",
      description: "Marine-grade aerospace aluminum stays pristine for decades.",
      specs: ["Aerospace-Grade 6061-T6", "Salt-Resistant", "Lifetime Beauty"],
    },
    competitor: {
      title: "Rusts Within 2-3 Years",
      description: "Standard aluminum oxidizes and degrades quickly in elements.",
      specs: ["Standard Aluminum", "Poor Coating", "Visible Deterioration"],
    },
  },
  {
    category: "Installation",
    icon: Wrench,
    atlantic: {
      title: "30-Minute Setup",
      description: "Revolutionary design installs easily with basic tools. Anyone can do it.",
      specs: ["30 Minutes Average", "Basic Tools Only", "Clear Instructions"],
    },
    competitor: {
      title: "2+ Hours & Pro Help",
      description: "Complex installation often requires contractors and specialized equipment.",
      specs: ["2+ Hours", "Professional Help", "Additional Costs"],
    },
  },
]

export function InteractiveComparison() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = comparisons[activeIndex]
  const Icon = active.icon

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-white px-6 py-2.5 rounded-full font-bold text-sm mb-6 shadow-lg">
          <Zap className="w-4 h-4" />
          THE ATLANTIC ADVANTAGE
        </div>
        <h3 className="text-4xl md:text-6xl font-bold text-[#0B1C2C] mb-4 leading-tight">
          See How We Compare
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A55C] to-[#B8954C]">
            Side-by-Side
          </span>
        </h3>
        <p className="text-xl text-[#666666] max-w-2xl mx-auto">
          Real differences that matter. Choose quality that lasts generations.
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
        {comparisons.map((item, index) => {
          const CategoryIcon = item.icon
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 ${
                activeIndex === index
                  ? "bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] border-[#C8A55C] shadow-2xl scale-105"
                  : "bg-white border-gray-200 hover:border-[#C8A55C]/50 hover:shadow-lg hover:scale-102"
              }`}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] shadow-lg"
                      : "bg-gray-100 group-hover:bg-[#C8A55C]/10"
                  }`}
                >
                  <CategoryIcon
                    className={`w-7 h-7 ${activeIndex === index ? "text-white" : "text-[#0B1C2C] group-hover:text-[#C8A55C]"}`}
                  />
                </div>
                <span
                  className={`font-bold text-sm md:text-base ${activeIndex === index ? "text-white" : "text-[#0B1C2C]"}`}
                >
                  {item.category}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Comparison Display */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Atlantic Flagpole - Winner Side */}
          <div className="relative bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] p-8 md:p-12">
            {/* Winner Badge */}
            <div className="absolute top-6 right-6">
              <div className="bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                WINNER
              </div>
            </div>

            {/* Icon & Brand */}
            <div className="flex items-center gap-4 mb-8 h-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] flex items-center justify-center shadow-2xl">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">Atlantic Flagpole</h4>
                <p className="text-[#C8A55C] font-semibold text-sm">Veteran-Owned Excellence</p>
              </div>
            </div>

            {/* Result */}
            <div className="mb-6 min-h-[200px]">
              <h5 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight h-[80px] flex items-center">
                {active.atlantic.title}
              </h5>
              <p className="text-white/90 text-lg leading-relaxed mb-6">{active.atlantic.description}</p>
            </div>

            {/* Specs */}
            <div className="space-y-3 min-h-[120px]">
              {active.atlantic.specs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                  <span className="text-white/90 font-medium">{spec}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#bestseller"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Shop Atlantic Flagpoles
                <Star className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Competitor - Comparison Side */}
          <div className="bg-gray-50 p-8 md:p-12 relative">
            {/* Icon & Brand */}
            <div className="flex items-center gap-4 mb-8 h-20">
              <div className="w-20 h-20 rounded-2xl bg-gray-300 flex items-center justify-center">
                <Icon className="w-10 h-10 text-gray-500" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-gray-700 mb-1">Other Brands</h4>
                <p className="text-gray-500 font-semibold text-sm">Typical Competitors</p>
              </div>
            </div>

            {/* Result */}
            <div className="mb-6 min-h-[200px]">
              <h5 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4 leading-tight h-[80px] flex items-center">
                {active.competitor.title}
              </h5>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{active.competitor.description}</p>
            </div>

            {/* Specs */}
            <div className="space-y-3 min-h-[120px]">
              {active.competitor.specs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-red-600 stroke-[3]" />
                  </div>
                  <span className="text-gray-600 font-medium line-through opacity-75">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            stat: "35,000+",
            label: "Satisfied American Patriots",
            icon: Award,
          },
          {
            stat: "4.9★",
            label: "Average Rating (2,847 Reviews)",
            icon: Star,
          },
          {
            stat: "<5%",
            label: "Return Rate (Industry: 25%)",
            icon: Shield,
          },
        ].map((item, idx) => {
          const StatIcon = item.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] mb-4">
                <StatIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0B1C2C] mb-2">{item.stat}</div>
              <div className="text-sm text-gray-600 font-medium">{item.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
