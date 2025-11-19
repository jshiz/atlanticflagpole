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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const itemCount = (() => {
    console.log("[v0] Cart structure:", { 
      hasCart: !!cart, 
      hasLines: !!cart?.lines,
      linesType: cart?.lines ? typeof cart.lines : 'undefined',
      hasEdges: !!cart?.lines?.edges,
      edgesIsArray: Array.isArray(cart?.lines?.edges)
    })
    
    if (!cart) return 0
    
    // Handle both direct array and edges structure
    if (Array.isArray(cart.lines)) {
      return cart.lines.reduce((total, line) => total + (line.quantity || 0), 0)
    }
    
    if (cart.lines?.edges && Array.isArray(cart.lines.edges)) {
      return cart.lines.edges.reduce((total, edge) => {
        const quantity = edge?.node?.quantity || 0
        console.log("[v0] Edge quantity:", quantity)
        return total + quantity
      }, 0)
    }
    
    return 0
  })()
  
  console.log("[v0] Final cart item count:", itemCount)

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
    },
    {
      id: "cart" as const,
      icon: ShoppingCart,
      label: "Cart",
      badge: itemCount,
      color: "text-[#C8A55C]"
    }
  ]

  const drawerSide = isMobile ? "bottom" : "right"

  return (
    <>
      <CartDrawer isOpen={activePanel === "cart"} onClose={() => setActivePanel(null)} side={drawerSide} />
      <SearchDrawer isOpen={activePanel === "search"} onClose={() => setActivePanel(null)} side={drawerSide} />
      <PreferencesDrawer isOpen={activePanel === "preferences"} onClose={() => setActivePanel(null)} side={drawerSide} />
      <FlaggyDrawer isOpen={activePanel === "flaggy"} onClose={() => setActivePanel(null)} side={drawerSide} />
      <QuizDrawer isOpen={activePanel === "quiz"} onClose={() => setActivePanel(null)} side={drawerSide} />
      <FinderDrawer isOpen={activePanel === "finder"} onClose={() => setActivePanel(null)} side={drawerSide} />

      <div className={cn(
        // Base (Mobile) - Docked Bottom Bar
        "fixed bottom-0 left-0 right-0 z-[100]",
        "flex flex-row items-center justify-around", 
        "w-full",
        "bg-[#0B1C2C] border-t border-[#C8A55C]",
        "py-2 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
        
        // Desktop (md+) - Right Vertical Panel
        "md:bottom-auto md:left-auto md:translate-x-0",
        "md:right-0 md:top-1/2 md:-translate-y-1/2",
        "md:flex-col md:gap-1.5 md:w-auto md:max-w-none",
        "md:bg-[#0B1C2C]/95 md:backdrop-blur-md",
        "md:rounded-l-2xl md:rounded-r-none md:rounded-bl-2xl md:rounded-tl-2xl",
        "md:border-2 md:border-r-0 md:border-[#C8A55C]",
        "md:py-3 md:px-1.5 md:shadow-2xl md:shadow-black/20"
      )}>
        {navButtons.map((button) => {
          const Icon = button.icon
          const isActive = activePanel === button.id
          
          return (
            <button
              key={button.id}
              onClick={() => handlePanelToggle(button.id)}
              className={cn(
                // Mobile: Slimmer buttons
                "relative w-10 h-10 flex items-center justify-center transition-all duration-300 group",
                // Desktop: Standard size
                "md:w-11 md:h-11 md:rounded-xl",
                isActive 
                  ? "text-[#C8A55C] md:bg-gradient-to-br md:from-[#C8A55C] md:to-[#B69446] md:text-white md:shadow-lg md:shadow-[#C8A55C]/30 md:scale-105" 
                  : "text-gray-400 hover:text-white md:hover:bg-white/10 md:hover:scale-105"
              )}
              aria-label={button.label}
            >
              <Icon className={cn(
                "w-5 h-5 md:w-5 md:h-5 transition-all stroke-[2]",
                isActive ? "scale-110" : button.color,
                // Mobile active state: just color change, no background
                isActive && "md:text-white",
                !isActive && "group-hover:scale-110 group-hover:text-white"
              )} />
              
              {button.badge !== undefined && button.badge > 0 && (
                <span className="absolute top-0 right-0 md:-top-2 md:-right-2 bg-gradient-to-br from-[#C8A55C] via-[#D4AF37] to-[#B69446] text-[#0B1C2C] text-[9px] md:text-[10px] font-extrabold w-3.5 h-3.5 md:w-5 md:h-5 rounded-full flex items-center justify-center border border-[#0B1C2C] md:border-2 shadow-lg shadow-[#C8A55C]/50 z-10 animate-in zoom-in duration-300">
                  {button.badge > 99 ? '99+' : button.badge}
                </span>
              )}
              
              {/* Tooltips hidden on mobile, shown on desktop */}
              <span className={cn(
                "hidden md:block absolute right-full mr-3 bg-[#0B1C2C] text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 transition-all duration-200 pointer-events-none whitespace-nowrap border border-[#C8A55C]/30 shadow-xl translate-x-2",
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
