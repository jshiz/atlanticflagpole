"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Search, HelpCircle, Compass, Globe, MessageCircle } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { FlaggyChatWidget } from "@/components/flaggy-chat/flaggy-chat-widget"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { SearchDrawer } from "@/components/search/search-drawer"
import { PreferencesDrawer } from "@/components/preferences/preferences-drawer"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import { cn } from "@/lib/utils"

export function FloatingCapsuleNav() {
  const { cart } = useCart()
  const [isFlaggyOpen, setIsFlaggyOpen] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = cart?.totalQuantity || 0

  if (!mounted) return null

  return (
    <>
      <FlaggyChatWidget embedded={true} isOpen={isFlaggyOpen} onClose={() => setIsFlaggyOpen(false)} />
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <PreferencesDrawer isOpen={isPreferencesOpen} onClose={() => setIsPreferencesOpen(false)} />
      <FlagpoleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[95vw]">
        <div className="bg-[#0B1C2C]/95 backdrop-blur-md border-2 border-[#C8A55C] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.4)] px-2 py-2 flex items-center gap-1 md:gap-2">
          
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all group relative"
            aria-label="Search"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 bg-[#0B1C2C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#C8A55C]/30">
              Search
            </span>
          </button>

          {/* Finder */}
          <Link
            href="/flagpole-finder"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all group relative"
            aria-label="Flagpole Finder"
          >
            <Compass className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 bg-[#0B1C2C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#C8A55C]/30">
              Finder
            </span>
          </Link>

          {/* Quiz */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#C8A55C] hover:bg-white/10 transition-all group relative"
            aria-label="Take Quiz"
          >
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform stroke-[2.5]" />
            <span className="absolute -top-10 bg-[#0B1C2C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#C8A55C]/30">
              Quiz
            </span>
          </button>

          {/* Cart (Center & Prominent) */}
          <div className="mx-1 md:mx-2 relative">
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="w-14 h-14 md:w-16 md:h-16 bg-[#C8A55C] hover:bg-[#B69446] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#C8A55C]/30 transition-all transform hover:scale-105 active:scale-95 border-4 border-[#0B1C2C] -mt-6 md:-mt-8"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 fill-white" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#E63946] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B1C2C]">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Flaggy */}
          <button
            onClick={() => setIsFlaggyOpen(!isFlaggyOpen)}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all group relative",
              isFlaggyOpen ? "bg-[#C8A55C]/20" : "hover:bg-white/10"
            )}
            aria-label="Ask Flaggy"
          >
            <div className="relative w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:scale-110">
              <Image 
                src="/images/design-mode/Flaggy.png" 
                alt="Flaggy" 
                fill 
                className="object-contain drop-shadow-md"
              />
            </div>
            <span className="absolute -top-10 bg-[#0B1C2C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#C8A55C]/30">
              Ask Flaggy
            </span>
          </button>

          {/* Preferences (Geo/Cookies) */}
          <button
            onClick={() => setIsPreferencesOpen(true)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all group relative"
            aria-label="Preferences"
          >
            <Globe className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-10 bg-[#0B1C2C] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#C8A55C]/30">
              Region
            </span>
          </button>

        </div>
      </div>
    </>
  )
}
