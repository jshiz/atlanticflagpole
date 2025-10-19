"use client"

import { Check, X, Star } from "lucide-react"

const comparisons = [
  { feature: "Lifetime Warranty", phoenix: true, competitor: false, highlight: true },
  { feature: "Made in USA", phoenix: true, competitor: false, highlight: true },
  { feature: "Aircraft-Grade Aluminum", phoenix: true, competitor: false, highlight: false },
  { feature: "Satin Anodized Finish", phoenix: true, competitor: false, highlight: false },
  { feature: "Free Shipping", phoenix: true, competitor: true, highlight: false },
  { feature: "365-Day Trial", phoenix: true, competitor: false, highlight: true },
  { feature: "Solar Light Included", phoenix: true, competitor: false, highlight: false },
  { feature: "Anti-Theft Device", phoenix: true, competitor: false, highlight: false },
  { feature: "Ground Sleeve Included", phoenix: true, competitor: false, highlight: false },
  { feature: "Premium Flag Included", phoenix: true, competitor: false, highlight: false },
  { feature: "24/7 Customer Support", phoenix: true, competitor: false, highlight: false },
  { feature: "Easy Installation", phoenix: true, competitor: true, highlight: false },
]

export function PhoenixVsCompetition() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#0B1C2C] text-white px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            THE COMPARISON
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">Phoenix vs. The Competition</h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            See why thousands choose Phoenix over cheaper alternatives. Quality you can see and feel.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Comparison Table */}
          <div className="bg-[#F5F3EF] rounded-2xl overflow-hidden shadow-xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44]">
              <div className="text-sm font-bold text-white/80">Feature</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-[#C8A55C] text-[#0B1C2C] px-4 py-2 rounded-full font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  Phoenix
                </div>
              </div>
              <div className="text-sm font-bold text-white/60 text-center">Others</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 p-4 ${
                    item.highlight ? "bg-[#C8A55C]/10" : "bg-white"
                  } hover:bg-[#C8A55C]/5 transition-colors`}
                >
                  <div className="flex items-center">
                    <span className={`text-sm ${item.highlight ? "font-bold text-[#0B1C2C]" : "text-[#333333]"}`}>
                      {item.feature}
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    {item.phoenix ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <Check className="w-5 h-5 text-green-600 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                        <X className="w-5 h-5 text-red-600 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    {item.competitor ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                        <Check className="w-5 h-5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                        <X className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44]">
              <div className="text-sm font-bold text-white/80">Starting Price</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C8A55C]">$299</div>
                <div className="text-xs text-white/60">with lifetime value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white/60">$199+</div>
                <div className="text-xs text-white/40">hidden costs</div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 mt-12 text-center">
            <div>
              <div className="text-4xl font-bold text-[#C8A55C] mb-2">35K+</div>
              <div className="text-sm text-[#666666]">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C8A55C] mb-2">4.8★</div>
              <div className="text-sm text-[#666666]">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#C8A55C] mb-2">{"<"}10%</div>
              <div className="text-sm text-[#666666]">Return Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
