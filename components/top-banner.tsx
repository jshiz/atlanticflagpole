"use client"

import Link from "next/link"
import { PhoenixHomeTrialBar } from "./phoenix-home-trial-bar"

export function TopBanner() {
  return (
    <div className="relative bg-[#0B1C2C] text-white border-b border-[#C8A55C]/30">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-center md:justify-between h-8 md:h-9">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
            <PhoenixHomeTrialBar />
            <span className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-[#0052CC] text-white text-[10px] md:text-xs font-bold tracking-wide shadow-md">
              365-Day Trial
            </span>
          </div>

          <Link
            href="/info-center"
            className="hidden md:flex items-center gap-2 text-white hover:text-[#C8A55C] transition-colors text-xs font-medium group"
          >
            <span>Learn About Our Flagpoles</span>
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
