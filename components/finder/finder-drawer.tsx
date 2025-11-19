"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Compass, X, ArrowRight, Ruler, Home, Building2 } from 'lucide-react'
import Link from "next/link"

interface FinderDrawerProps {
  isOpen: boolean
  onClose: () => void
  side?: "right" | "bottom"
}

export function FinderDrawer({ isOpen, onClose, side = "right" }: FinderDrawerProps) {
  const [height, setHeight] = useState<string>("")
  const [location, setLocation] = useState<"residential" | "commercial" | null>(null)

  const recommendations = [
    { height: "15-20ft", name: "Residential Compact", url: "/products/phoenix-15" },
    { height: "20-25ft", name: "Residential Standard", url: "/products/phoenix-20" },
    { height: "25-30ft", name: "Residential Premium", url: "/products/phoenix-25" },
    { height: "30-35ft", name: "Commercial Standard", url: "/products/phoenix-30" }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={side} 
        className={cn(
          "p-0 flex flex-col z-[90] bg-white shadow-2xl transition-all duration-500 ease-in-out",
          side === "right" 
            ? "w-[90vw] max-w-md h-full border-l-4 border-[#C8A55C] rounded-l-3xl" 
            : "w-full h-[85vh] mb-[56px] border-t-4 border-[#C8A55C] rounded-t-3xl rounded-b-none"
        )}
      >
        <SheetHeader className={cn(
          "p-4 bg-[#0B1C2C] text-white shrink-0 border-b-2 border-[#C8A55C]/30",
          side === "right" ? "rounded-tl-3xl" : "rounded-t-3xl"
        )}>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white flex items-center gap-2 text-lg font-bold">
              <Compass className="w-5 h-5 text-[#C8A55C]" />
              Flagpole Finder
            </SheetTitle>
            <button 
              onClick={onClose} 
              className="text-white hover:text-[#C8A55C] transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-300 mt-1">Find your perfect flagpole in seconds</p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="max-w-md mx-auto space-y-4">
            
            {/* Location Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0B1C2C] uppercase tracking-wider">Location Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLocation("residential")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                    location === "residential"
                      ? "border-[#C8A55C] bg-[#C8A55C]/10 shadow-lg"
                      : "border-gray-200 hover:border-[#C8A55C]/50"
                  )}
                >
                  <Home className={cn(
                    "w-6 h-6",
                    location === "residential" ? "text-[#C8A55C]" : "text-gray-400"
                  )} />
                  <span className="text-xs font-medium">Residential</span>
                </button>
                <button
                  onClick={() => setLocation("commercial")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                    location === "commercial"
                      ? "border-[#C8A55C] bg-[#C8A55C]/10 shadow-lg"
                      : "border-gray-200 hover:border-[#C8A55C]/50"
                  )}
                >
                  <Building2 className={cn(
                    "w-6 h-6",
                    location === "commercial" ? "text-[#C8A55C]" : "text-gray-400"
                  )} />
                  <span className="text-xs font-medium">Commercial</span>
                </button>
              </div>
            </div>

            {/* Height Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0B1C2C] uppercase tracking-wider flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#C8A55C]" />
                Desired Height
              </label>
              <div className="grid grid-cols-2 gap-2">
                {recommendations.map((rec) => (
                  <button
                    key={rec.height}
                    onClick={() => setHeight(rec.height)}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all",
                      height === rec.height
                        ? "border-[#C8A55C] bg-[#C8A55C]/10 shadow-lg"
                        : "border-gray-200 hover:border-[#C8A55C]/50"
                    )}
                  >
                    <div className="text-sm font-bold text-[#0B1C2C]">{rec.height}</div>
                    <div className="text-xs text-gray-500">{rec.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            {height && location && (
              <div className="bg-gradient-to-br from-[#C8A55C]/10 to-[#C8A55C]/5 border-2 border-[#C8A55C] rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4">
                <h4 className="text-sm font-bold text-[#0B1C2C] mb-2">Recommended for You</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Based on your {location} location and {height} height preference
                </p>
                <Link href={`/collections/telescoping-flagpoles`} onClick={onClose}>
                  <Button className="w-full bg-[#C8A55C] hover:bg-[#B69446] text-white font-bold py-3 rounded-xl shadow-lg">
                    View Recommendations <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Quick Links */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Or Browse by Category</p>
              <div className="space-y-2">
                <Link href="/collections/telescoping-flagpoles" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start text-sm border-gray-300 hover:border-[#C8A55C] hover:bg-[#C8A55C]/5">
                    All Telescoping Flagpoles
                  </Button>
                </Link>
                <Link href="/products/phoenix-flagpole-20ft" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start text-sm border-gray-300 hover:border-[#C8A55C] hover:bg-[#C8A55C]/5">
                    Phoenix 20ft (Most Popular)
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
