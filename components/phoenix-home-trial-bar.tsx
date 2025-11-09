"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Info } from "lucide-react"

export function PhoenixHomeTrialBar() {
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showTooltip) {
        setShowTooltip(false)
      }
    }

    if (showTooltip) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [showTooltip])

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      setTimeout(() => {
        tooltipRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }, 100)
    }
  }, [showTooltip])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowTooltip(!showTooltip)
  }

  return (
    <div className="relative bg-[#0A2740] text-white border-b border-white/10">
      <div className="container mx-auto py-1.5 md:py-2 px-4">
        <div className="flex items-center justify-center gap-2 md:gap-3 text-xs md:text-base">
          <span className="md:hidden">Phoenix 365-Day Trial</span>

          {/* Desktop: Full text */}
          <span className="hidden md:inline">Home of the Legendary Phoenix 365-Day Home Trial.</span>

          <span className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-[#1F6FFF] text-white text-[10px] md:text-xs font-semibold whitespace-nowrap">
            365-Day Trial
          </span>

          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Link
              ref={triggerRef}
              href="/info-center/phoenix-365-day-home-trial"
              className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#E63946] hover:bg-[#D62839] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A2740]"
              aria-describedby="trial-tooltip"
              aria-label="Learn more about Phoenix 365-Day Home Trial"
              aria-expanded={showTooltip}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              onClick={handleClick}
            >
              <Info className="w-3 h-3 md:w-4 md:h-4" />
            </Link>

            <div
              ref={tooltipRef}
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 md:w-80 z-[150] transition-all duration-300 ease-out ${
                showTooltip
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <Link
                href="/info-center/phoenix-365-day-home-trial"
                className="block"
                onClick={() => setShowTooltip(false)}
              >
                <div
                  id="trial-tooltip"
                  role="tooltip"
                  className="relative bg-white text-[#0A2740] rounded-2xl shadow-2xl p-4 md:p-5 text-xs md:text-sm leading-relaxed hover:shadow-3xl transition-shadow"
                >
                  {/* Upward-pointing arrow/caret */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full">
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-white" />
                  </div>

                  <p className="mb-2 md:mb-3 font-semibold text-[#0A2740]">
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
