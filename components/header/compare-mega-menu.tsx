"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CompareMegaMenuProps {
  onLinkClick?: () => void
}

const competitorBrands = [
  { name: "Annin Flagmakers", handle: "annin-flagmakers" },
  { name: "Valley Forge", handle: "valley-forge" },
  { name: "Eder Flag", handle: "eder-flag" },
  { name: "Flagpole Farm", handle: "flagpole-farm" },
  { name: "Liberty Flagpoles", handle: "liberty-flagpoles" },
  { name: "Titan Telescoping", handle: "titan-telescoping" },
  { name: "Ezpole", handle: "ezpole" },
  { name: "Flag Brands", handle: "flag-brands" },
  { name: "Compare All", handle: "compare-all" },
]

export function CompareMegaMenu({ onLinkClick }: CompareMegaMenuProps) {
  const [selectedCompetitor, setSelectedCompetitor] = useState(competitorBrands[0])

  return (
    <div className="w-full max-w-[900px] mx-auto px-8 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - Competitor List */}
        <div className="col-span-4 border-r border-gray-200 pr-6">
          <h4 className="text-base font-bold text-[#0B1C2C] mb-4 pb-2 border-b-2 border-[#C8A55C]">
            Atlantic Flagpole vs.
          </h4>
          <ul className="space-y-1">
            {competitorBrands.map((brand) => (
              <li key={brand.handle}>
                <button
                  onClick={() => setSelectedCompetitor(brand)}
                  className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-[#F5F3EF] transition-all group"
                  onMouseEnter={() => setSelectedCompetitor(brand)}
                >
                  <span className="text-sm text-[#0B1C2C] group-hover:text-[#C8A55C] font-medium">{brand.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content - Comparison Preview */}
        <div className="col-span-8">
          <div className="text-center space-y-6">
            <h3 className="text-lg font-bold text-gray-600 mb-6">How Atlantic Flagpole compares to other brands</h3>

            {/* Brand Logos */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#0B1C2C] rounded-full flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-xl">AF</span>
                </div>
                <p className="text-sm font-semibold text-[#0B1C2C]">Atlantic Flagpole</p>
              </div>

              <span className="text-2xl text-gray-400 font-bold">vs</span>

              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-gray-600 font-bold text-sm text-center px-2">{selectedCompetitor.name}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">{selectedCompetitor.name}</p>
              </div>
            </div>

            {/* Comparison Highlights */}
            <div className="bg-[#F5F3EF] rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Lifetime Warranty</span>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-600 text-white">✓ Yes</Badge>
                  <Badge variant="outline" className="text-gray-400">
                    No
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Made in USA</span>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-600 text-white">✓ Yes</Badge>
                  <Badge variant="outline" className="text-gray-400">
                    No
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">365-Day Trial</span>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-600 text-white">✓ Yes</Badge>
                  <Badge variant="outline" className="text-gray-400">
                    30 Days
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Free Shipping</span>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-600 text-white">✓ Yes</Badge>
                  <Badge variant="outline" className="text-gray-400">
                    Varies
                  </Badge>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white w-full">
              <Link href={`/compare/${selectedCompetitor.handle}`} onClick={onLinkClick}>
                See Full Comparison
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
