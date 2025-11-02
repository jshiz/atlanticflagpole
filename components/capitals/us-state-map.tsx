"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { stateCapitals } from "@/lib/capitals/data"

// Simplified US state paths for SVG map
const statePaths: Record<string, string> = {
  AL: "M775,400 L780,420 L770,430 L760,425 L765,405 Z",
  AK: "M100,500 L200,500 L200,550 L100,550 Z",
  AZ: "M200,350 L280,350 L280,450 L200,450 Z",
  AR: "M650,350 L720,350 L720,400 L650,400 Z",
  CA: "M100,200 L180,200 L180,400 L100,400 Z",
  CO: "M350,250 L450,250 L450,320 L350,320 Z",
  CT: "M900,200 L920,200 L920,220 L900,220 Z",
  DE: "M880,260 L890,260 L890,280 L880,280 Z",
  FL: "M820,450 L840,450 L840,520 L820,520 Z",
  GA: "M800,380 L820,380 L820,430 L800,430 Z",
  HI: "M150,550 L200,550 L200,580 L150,580 Z",
  ID: "M250,100 L320,100 L320,200 L250,200 Z",
  IL: "M700,250 L730,250 L730,330 L700,330 Z",
  IN: "M730,250 L760,250 L760,320 L730,320 Z",
  IA: "M650,220 L720,220 L720,270 L650,270 Z",
  KS: "M550,280 L650,280 L650,330 L550,330 Z",
  KY: "M750,300 L820,300 L820,340 L750,340 Z",
  LA: "M680,420 L730,420 L730,470 L680,470 Z",
  ME: "M920,100 L950,100 L950,180 L920,180 Z",
  MD: "M860,270 L890,270 L890,290 L860,290 Z",
  MA: "M910,190 L940,190 L940,210 L910,210 Z",
  MI: "M730,180 L780,180 L780,260 L730,260 Z",
  MN: "M620,120 L690,120 L690,200 L620,200 Z",
  MS: "M720,380 L750,380 L750,440 L720,440 Z",
  MO: "M650,280 L720,280 L720,350 L650,350 Z",
  MT: "M350,80 L500,80 L500,160 L350,160 Z",
  NE: "M500,230 L620,230 L620,280 L500,280 Z",
  NV: "M180,200 L250,200 L250,350 L180,350 Z",
  NH: "M910,150 L930,150 L930,190 L910,190 Z",
  NJ: "M890,240 L910,240 L910,280 L890,280 Z",
  NM: "M350,350 L450,350 L450,470 L350,470 Z",
  NY: "M850,180 L920,180 L920,250 L850,250 Z",
  NC: "M820,320 L900,320 L900,360 L820,360 Z",
  ND: "M500,100 L620,100 L620,160 L500,160 Z",
  OH: "M770,240 L820,240 L820,300 L770,300 Z",
  OK: "M550,330 L680,330 L680,390 L550,390 Z",
  OR: "M150,120 L250,120 L250,200 L150,200 Z",
  PA: "M830,230 L900,230 L900,280 L830,280 Z",
  RI: "M920,210 L935,210 L935,225 L920,225 Z",
  SC: "M820,360 L850,360 L850,400 L820,400 Z",
  SD: "M500,160 L620,160 L620,230 L500,230 Z",
  TN: "M720,320 L820,320 L820,360 L720,360 Z",
  TX: "M450,350 L600,350 L600,500 L450,500 Z",
  UT: "M280,250 L350,250 L350,370 L280,370 Z",
  VT: "M900,150 L920,150 L920,200 L900,200 Z",
  VA: "M820,280 L890,280 L890,320 L820,320 Z",
  WA: "M180,60 L280,60 L280,130 L180,130 Z",
  WV: "M800,270 L840,270 L840,310 L800,310 Z",
  WI: "M690,160 L740,160 L740,240 L690,240 Z",
  WY: "M350,160 L500,160 L500,250 L350,250 Z",
}

export function USStateMap() {
  const router = useRouter()
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handleStateClick = (stateCode: string) => {
    router.push(`/capitals/${stateCode.toLowerCase()}`)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>, stateCode: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setHoveredState(stateCode)
  }

  return (
    <div className="relative">
      <svg viewBox="0 0 1000 600" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
        {Object.entries(statePaths).map(([stateCode, path]) => {
          const state = stateCapitals[stateCode as keyof typeof stateCapitals]
          if (!state) return null

          return (
            <path
              key={stateCode}
              d={path}
              className="cursor-pointer stroke-border transition-all duration-200 hover:stroke-primary"
              fill={hoveredState === stateCode ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted))"}
              strokeWidth="2"
              onClick={() => handleStateClick(stateCode)}
              onMouseMove={(e) => handleMouseMove(e, stateCode)}
              onMouseLeave={() => setHoveredState(null)}
            />
          )
        })}
      </svg>

      {/* Tooltip */}
      {hoveredState && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border bg-popover px-3 py-2 text-sm shadow-lg"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 60}px`,
          }}
        >
          <div className="font-semibold">{stateCapitals[hoveredState as keyof typeof stateCapitals]?.name}</div>
          <div className="text-xs text-muted-foreground">
            {stateCapitals[hoveredState as keyof typeof stateCapitals]?.capital}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Click on any state to view state-specific flagpoles and accessories</p>
      </div>
    </div>
  )
}
