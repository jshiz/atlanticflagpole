"use client"

import { useState } from "react"
import { ShoppingCart, Cookie, Search, HelpCircle, Compass, MessageCircle, Sparkles, X } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"

export function FloatingActionMenu() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { cart } = useCart()
  const itemCount = cart?.totalQuantity || 0

  const menuItems = [
    {
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
      color: "bg-[#E63946]",
      badge: itemCount > 0 ? itemCount : null,
    },
    {
      icon: Search,
      label: "Search",
      href: "/search",
      color: "bg-[#1F6FFF]",
    },
    {
      icon: HelpCircle,
      label: "Quiz",
      href: "/quiz",
      color: "bg-[#C8A55C]",
    },
    {
      icon: Compass,
      label: "Finder",
      href: "/flagpole-finder",
      color: "bg-[#0B1C2C]",
    },
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/contact",
      color: "bg-[#16A34A]",
    },
    {
      icon: Sparkles,
      label: "Offers",
      href: "/deals",
      color: "bg-[#9333EA]",
    },
    {
      icon: Cookie,
      label: "Cookies",
      href: "/cookie-settings",
      color: "bg-[#6B7280]",
    },
  ]

  return (
    <>
      {/* Main Toggle Button - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed left-4 bottom-24 md:bottom-32 z-[200] w-14 h-14 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#B8954C] text-white shadow-2xl hover:shadow-[0_0_30px_rgba(200,165,92,0.6)] transition-all duration-300 flex items-center justify-center group border-2 border-white/20"
        aria-label="Open action menu"
      >
        {isExpanded ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-white rounded transition-transform group-hover:translate-x-0.5" />
            <div className="w-5 h-0.5 bg-white rounded" />
            <div className="w-5 h-0.5 bg-white rounded transition-transform group-hover:translate-x-0.5" />
          </div>
        )}
        
        {/* Cart Badge */}
        {itemCount > 0 && !isExpanded && (
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#E63946] text-white text-xs font-bold flex items-center justify-center border-2 border-white animate-bounce">
            {itemCount}
          </div>
        )}
      </button>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="fixed left-4 bottom-44 md:bottom-52 z-[199] flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsExpanded(false)}
                className={`${item.color} h-12 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group relative overflow-hidden w-12 hover:w-32`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center z-10">
                  <Icon className="w-5 h-5" />
                </div>
                
                <span className="ml-12 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-xs font-bold pr-4 translate-x-4 group-hover:translate-x-0">
                  {item.label}
                </span>

                {item.badge && (
                  <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-white text-[#E63946] text-[10px] font-bold flex items-center justify-center border border-[#E63946] z-20">
                    {item.badge}
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
