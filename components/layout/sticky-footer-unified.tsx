"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Search, HelpCircle, Compass, MessageCircle, Sparkles, Cookie, X, ChevronUp, ChevronDown, ArrowRight, Flag, Map, Shield } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { FlaggyChatWidget } from "@/components/flaggy-chat/flaggy-chat-widget"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function StickyFooterUnified() {
  const { cart } = useCart()
  const [isFlaggyOpen, setIsFlaggyOpen] = useState(false)
  const [isCartExpanded, setIsCartExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = cart?.totalQuantity || 0
  const subtotal = cart?.cost?.subtotalAmount?.amount || "0"

  const menuItems = [
    {
      icon: Search,
      label: "Search",
      href: "/search",
      color: "text-blue-400",
    },
    {
      icon: HelpCircle,
      label: "Quiz",
      href: "/quiz",
      color: "text-[#C8A55C]",
    },
    {
      icon: Compass,
      label: "Finder",
      href: "/flagpole-finder",
      color: "text-white",
    },
    {
      icon: Sparkles,
      label: "Offers",
      href: "/deals",
      color: "text-purple-400",
    },
    {
      icon: Flag,
      label: "US Flags",
      href: "/collections/us-flags",
      color: "text-red-400",
    },
    {
      icon: Map,
      label: "States",
      href: "/collections/state-flags",
      color: "text-green-400",
    },
    {
      icon: Shield,
      label: "Military",
      href: "/collections/military-flags",
      color: "text-yellow-400",
    },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Flaggy Chat Window (Embedded Mode) */}
      <FlaggyChatWidget 
        embedded={true} 
        isOpen={isFlaggyOpen} 
        onClose={() => setIsFlaggyOpen(false)} 
      />

      {/* Sticky Footer Container */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0B1C2C] border-t-4 border-[#C8A55C] shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-safe">
        <div className="max-w-7xl mx-auto px-2 md:px-4 h-14 md:h-16 flex items-center justify-between gap-2 md:gap-4">
          
          {/* Left: Action Menu (Scrollable on mobile) */}
          <div className="flex-1 flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar mask-linear-fade">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center justify-center min-w-[50px] md:min-w-[60px] h-full py-1 hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <Icon className={cn("w-4 h-4 md:w-5 md:h-5 mb-0.5 transition-transform group-hover:scale-110", item.color)} />
                  <span className="text-[9px] md:text-[10px] text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Center/Right: Cart Action */}
          <div className="flex items-center">
            {itemCount > 0 ? (
              <Link href="/cart" className="relative group">
                <div className="flex items-center gap-1.5 bg-[#E63946] hover:bg-[#d32f3c] text-white px-2.5 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95">
                  <div className="relative">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="absolute -top-1.5 -right-1.5 bg-white text-[#E63946] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#E63946]">
                      {itemCount}
                    </span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[9px] md:text-[10px] font-medium opacity-90">Checkout</span>
                    <span className="text-xs md:text-sm font-bold">${Number(subtotal).toFixed(2)}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 ml-0.5 opacity-80" />
                </div>
              </Link>
            ) : (
              <Link 
                href="/cart"
                className="flex flex-col items-center justify-center min-w-[50px] md:min-w-[60px] h-full py-1 hover:bg-white/5 rounded-lg transition-colors group"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mb-0.5 text-white transition-transform group-hover:scale-110" />
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-300 font-medium">Cart</span>
              </Link>
            )}
          </div>

          {/* Far Right: Flaggy Trigger */}
          <div className="border-l border-white/10 pl-1.5 md:pl-3 ml-0.5 md:ml-1">
            <button
              onClick={() => setIsFlaggyOpen(!isFlaggyOpen)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[50px] md:min-w-[60px] h-full py-1 rounded-lg transition-all duration-300 group relative",
                isFlaggyOpen ? "bg-[#C8A55C]/20" : "hover:bg-white/5"
              )}
            >
              <div className="relative w-7 h-7 md:w-9 md:h-9 transition-transform group-hover:scale-110">
                <Image 
                  src="/images/design-mode/Flaggy.png" 
                  alt="Flaggy" 
                  fill 
                  className="object-contain drop-shadow-md"
                />
                {/* Status Dot */}
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-[#0B1C2C] rounded-full animate-pulse"></span>
              </div>
              <span className={cn(
                "text-[9px] md:text-[10px] font-medium mt-0.5 transition-colors",
                isFlaggyOpen ? "text-[#C8A55C]" : "text-gray-300"
              )}>
                {isFlaggyOpen ? "Close" : "Ask Flaggy"}
              </span>
            </button>
          </div>

        </div>
      </div>
      
      {/* Spacer to prevent content from being hidden behind footer */}
      <div className="h-16 md:h-20" />
    </>
  )
}
