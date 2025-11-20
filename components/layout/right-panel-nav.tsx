"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Search, ClipboardList, Compass, Globe, MessageCircle } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

// Import content components
import { CartContent } from "@/components/cart/cart-drawer"
import { SearchContent } from "@/components/search/search-drawer"
import { PreferencesContent } from "@/components/preferences/preferences-drawer"
import { FlaggyContent } from "@/components/flaggy-chat/flaggy-drawer"
import { QuizContent } from "@/components/quiz/quiz-drawer"
import { FinderContent } from "@/components/finder/finder-drawer"

type ActivePanel = "cart" | "search" | "preferences" | "flaggy" | "quiz" | "finder" | null

export function RightPanelNav() {
  const { cart } = useCart()
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = (() => {
    if (!cart) return 0

    if (Array.isArray(cart.lines)) {
      return cart.lines.reduce((total, line) => total + (line.quantity || 0), 0)
    }

    if (cart.lines?.edges && Array.isArray(cart.lines.edges)) {
      return cart.lines.edges.reduce((total, edge) => {
        const quantity = edge?.node?.quantity || 0
        return total + quantity
      }, 0)
    }

    return 0
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
      color: "text-gray-300",
    },
    {
      id: "search" as const,
      icon: Search,
      label: "Search",
      color: "text-gray-300",
    },
    {
      id: "finder" as const,
      icon: Compass,
      label: "Finder",
      color: "text-gray-300",
    },
    {
      id: "quiz" as const,
      icon: ClipboardList,
      label: "Quiz",
      color: "text-gray-300",
    },
    {
      id: "preferences" as const,
      icon: Globe,
      label: "Settings",
      color: "text-gray-300",
    },
    {
      id: "cart" as const,
      icon: ShoppingCart,
      label: "Cart",
      badge: itemCount,
      color: "text-[#C8A55C]",
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 z-[100] transition-all duration-500 ease-in-out shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
        "flex flex-col bg-[#0B1C2C]",
        activePanel ? "h-[80vh] max-h-[700px]" : "h-[52px]",
        // Mobile: full width
        "left-0 right-0",
        // Desktop: centered, limited width
        "md:left-1/2 md:-translate-x-1/2 md:w-[500px] md:rounded-t-2xl md:border-x-2 md:border-t-2 md:border-[#C8A55C]",
      )}
    >
      {/* The Bar (Header) */}
      <div className="h-[52px] shrink-0 flex items-center justify-around px-2 py-2 border-t-2 border-[#C8A55C] bg-[#0B1C2C] md:border-t-0 md:rounded-t-2xl">
        {navButtons.map((button) => {
          const Icon = button.icon
          const isActive = activePanel === button.id

          return (
            <button
              key={button.id}
              onClick={() => handlePanelToggle(button.id)}
              className={cn(
                "relative w-9 h-9 flex items-center justify-center transition-all duration-300 group rounded-lg",
                isActive
                  ? "text-[#C8A55C] bg-[#C8A55C]/20 scale-105"
                  : "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105",
              )}
              aria-label={button.label}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-all stroke-[2.5]",
                  isActive ? "scale-110 text-[#C8A55C]" : button.color,
                  !isActive && "group-hover:scale-110 group-hover:text-white",
                )}
              />

              {button.badge !== undefined && button.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-br from-[#C8A55C] via-[#D4AF37] to-[#B69446] text-[#0B1C2C] text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#0B1C2C] z-10 animate-in zoom-in duration-300">
                  {button.badge > 99 ? "99+" : button.badge}
                </span>
              )}

              <span
                className={cn(
                  "hidden md:block absolute bottom-full mb-2 bg-[#0B1C2C] text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 transition-all duration-200 pointer-events-none whitespace-nowrap border border-[#C8A55C]/30 shadow-xl translate-y-2",
                  "group-hover:opacity-100 group-hover:translate-y-0",
                )}
              >
                {button.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* The Content Area */}
      <div
        className={cn(
          "flex-1 overflow-hidden bg-white relative",
          activePanel ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        {activePanel === "cart" && <CartContent onClose={() => setActivePanel(null)} />}
        {activePanel === "search" && <SearchContent onClose={() => setActivePanel(null)} />}
        {activePanel === "preferences" && <PreferencesContent onClose={() => setActivePanel(null)} />}
        {activePanel === "flaggy" && <FlaggyContent onClose={() => setActivePanel(null)} />}
        {activePanel === "quiz" && <QuizContent onClose={() => setActivePanel(null)} />}
        {activePanel === "finder" && <FinderContent onClose={() => setActivePanel(null)} />}
      </div>
    </div>
  )
}
