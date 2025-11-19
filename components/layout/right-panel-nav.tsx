"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Search, ClipboardList, Compass, Globe, MessageCircle } from 'lucide-react'
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

// Import all drawer components
import { CartDrawer } from "@/components/cart/cart-drawer"
import { SearchDrawer } from "@/components/search/search-drawer"
import { PreferencesDrawer } from "@/components/preferences/preferences-drawer"
import { FlaggyDrawer } from "@/components/flaggy-chat/flaggy-drawer"
import { QuizDrawer } from "@/components/quiz/quiz-drawer"
import { FinderDrawer } from "@/components/finder/finder-drawer"

type ActivePanel = "cart" | "search" | "preferences" | "flaggy" | "quiz" | "finder" | null

export function RightPanelNav() {
  const { cart } = useCart()
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = (() => {
    if (!cart?.lines?.edges || !Array.isArray(cart.lines.edges)) {
      return 0
    }

    return cart.lines.edges.reduce((total, edge) => {
      return total + (edge?.node?.quantity || 0)
    }, 0)
  })()

  const handlePanelToggle = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  if (!mounted) return null

  const navButtons = [
    {
      id: "flaggy" as const,
      icon: MessageCircle,
      label: "Flaggy",
      color: "text-gray-300"
    },
    {
      id: "cart" as const,
      icon: ShoppingCart,
      label: "Cart",
      badge: itemCount,
      color: "text-[#C8A55C]"
    },
    {
      id: "search" as const,
      icon: Search,
      label: "Search",
      color: "text-gray-300"
    },
    {
      id: "finder" as const,
      icon: Compass,
      label: "Finder",
      color: "text-gray-300"
    },
    {
      id: "quiz" as const,
      icon: ClipboardList,
      label: "Quiz",
      color: "text-gray-300"
    },
    {
      id: "preferences" as const,
      icon: Globe,
      label: "Settings",
      color: "text-gray-300"
    }
  ]

  return (
    <>
      <CartDrawer isOpen={activePanel === "cart"} onClose={() => setActivePanel(null)} />
      <SearchDrawer isOpen={activePanel === "search"} onClose={() => setActivePanel(null)} />
      <PreferencesDrawer isOpen={activePanel === "preferences"} onClose={() => setActivePanel(null)} />
      <FlaggyDrawer isOpen={activePanel === "flaggy"} onClose={() => setActivePanel(null)} />
      <QuizDrawer isOpen={activePanel === "quiz"} onClose={() => setActivePanel(null)} />
      <FinderDrawer isOpen={activePanel === "finder"} onClose={() => setActivePanel(null)} />

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-1.5 bg-[#0B1C2C]/95 backdrop-blur-md border-2 border-r-0 border-[#C8A55C] rounded-l-2xl py-3 px-1.5 shadow-2xl shadow-black/20">
        {navButtons.map((button) => {
          const Icon = button.icon
          const isActive = activePanel === button.id
          
          return (
            <button
              key={button.id}
              onClick={() => handlePanelToggle(button.id)}
              className={cn(
                "relative w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 group",
                isActive 
                  ? "bg-gradient-to-br from-[#C8A55C] to-[#B69446] shadow-lg shadow-[#C8A55C]/30 scale-105" 
                  : "hover:bg-white/10 hover:scale-105"
              )}
              aria-label={button.label}
            >
              <Icon className={cn(
                "w-4 h-4 md:w-5 md:h-5 transition-all stroke-[2.5]",
                isActive ? "text-white scale-110" : button.color,
                !isActive && "group-hover:scale-110 group-hover:text-white"
              )} />
              
              {button.badge !== undefined && button.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[#C8A55C] via-[#D4AF37] to-[#B69446] text-[#0B1C2C] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B1C2C] shadow-lg shadow-[#C8A55C]/50 z-10 animate-in zoom-in duration-300">
                  {button.badge > 99 ? '99+' : button.badge}
                </span>
              )}
              
              <span className={cn(
                "absolute right-full mr-3 bg-[#0B1C2C] text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 transition-all duration-200 pointer-events-none whitespace-nowrap border border-[#C8A55C]/30 shadow-xl translate-x-2",
                "group-hover:opacity-100 group-hover:translate-x-0"
              )}>
                {button.label}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}
