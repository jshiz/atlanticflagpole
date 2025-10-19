"use client"

import { useState } from "react"
import Link from "next/link"
import { Info } from "lucide-react"

export function PhoenixHomeTrialBar() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative bg-[#0A2740] text-white border-b border-white/10">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-center gap-3 text-sm md:text-base">
          {/* Mobile: Shortened text */}
          <span className="md:hidden">Phoenix 365-Day Home Trial</span>

          {/* Desktop: Full text */}
          <span className="hidden md:inline">Home of the Legendary Phoenix 365-Day Home Trial.</span>

          {/* Pill badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1F6FFF] text-white text-xs font-semibold whitespace-nowrap">
            365-Day Home Trial
          </span>

          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Link
              href="/info-center/phoenix-365-day-home-trial"
              className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E63946] hover:bg-[#D62839] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A2740]"
              aria-describedby="trial-tooltip"
              aria-label="Learn more about Phoenix 365-Day Home Trial"
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              <Info className="w-4 h-4" />
            </Link>

            {/* Animated speech bubble tooltip that pops DOWN and stays on hover */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 transition-all duration-300 ease-out ${
                showTooltip
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ zIndex: 9999 }}
            >
              <Link href="/info-center/phoenix-365-day-home-trial" className="block">
                <div
                  id="trial-tooltip"
                  role="tooltip"
                  className="relative bg-white text-[#0A2740] rounded-2xl shadow-2xl p-5 text-sm leading-relaxed hover:shadow-3xl transition-shadow"
                >
                  {/* Upward-pointing arrow/caret */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full">
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-white" />
                  </div>

                  <p className="mb-3 font-semibold text-[#0A2740]">
                    Try the Phoenix Flagpole at home for a full 365 days. If you're not thrilled, return it.
                  </p>
                  <p className="text-xs text-[#0A2740]/70 leading-relaxed">
                    Made in the USA. Free shipping on select bundles.{" "}
                    <span className="text-[#1F6FFF] font-semibold hover:underline">Learn more →</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
