"use client"

import { useState } from "react"
import { ChevronRight, Shield, CheckCircle2, XCircle } from "lucide-react"

const interactiveComparison = [
  {
    question: "What happens in heavy wind?",
    atlantic: "Certified to 100 MPH. Stands firm.",
    competitor: "Bends, rattles, or collapses at 60 MPH",
  },
  {
    question: "How long will it last?",
    atlantic: "Lifetime warranty. Forever.",
    competitor: "1-year warranty, then you're on your own",
  },
  {
    question: "Will it rust or corrode?",
    atlantic: "Aerospace aluminum. Never rusts.",
    competitor: "Standard aluminum rusts within 2-3 years",
  },
  {
    question: "Installation difficulty?",
    atlantic: "30 minutes with basic tools",
    competitor: "2+ hours, often requires professional help",
  },
]

export function InteractiveComparison() {
  const [activeComparison, setActiveComparison] = useState(0)

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">
          See How We Compare{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A55C] to-[#B8954C]">
            Side-by-Side
          </span>
        </h3>
        <p className="text-xl text-[#666666]">Click each question to see the real difference</p>
      </div>

      {/* Comparison Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {interactiveComparison.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveComparison(index)}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
              activeComparison === index
                ? "bg-gradient-to-r from-[#C8A55C]/10 to-[#D4B76A]/10 border-[#C8A55C] shadow-xl scale-105"
                : "bg-white border-gray-200 hover:border-[#C8A55C]/50 hover:shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B1C2C] text-lg">{item.question}</span>
              <ChevronRight
                className={`w-6 h-6 text-[#C8A55C] transition-transform ${
                  activeComparison === index ? "rotate-90" : ""
                }`}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Comparison Result */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#C8A55C]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Atlantic Flagpole Side */}
          <div className="p-10 bg-gradient-to-br from-[#C8A55C]/5 to-transparent">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A55C] to-[#B8954C] flex items-center justify-center shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B1C2C] text-xl">Atlantic Flagpole</h4>
                <p className="text-sm text-[#C8A55C] font-semibold">Veteran-Owned Quality</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
              <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
              <p className="text-[#0B1C2C] font-bold text-lg leading-relaxed">
                {interactiveComparison[activeComparison].atlantic}
              </p>
            </div>
          </div>

          {/* Competitor Side */}
          <div className="p-10 bg-gray-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-300 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-700 text-xl">Other Brands</h4>
                <p className="text-sm text-gray-500 font-semibold">Typical Competitors</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border-2 border-red-100">
              <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <p className="text-gray-700 text-lg leading-relaxed">
                {interactiveComparison[activeComparison].competitor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
