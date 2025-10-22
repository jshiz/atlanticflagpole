"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ShoppingCart, MenuIcon, User, ChevronDown } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import type { Menu } from "@/lib/menus"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { NavigationDrawer } from "@/components/header/navigation-drawer"
import { PhoenixHomeTrialBar } from "@/components/phoenix-home-trial-bar"
import { MegaMenuWithCart } from "@/components/header/mega-menu-with-cart"
import { InfoAffiliateMenu } from "@/components/header/info-affiliate-menu"

interface HeaderClientProps {
  menuData: Menu | null
  megaMenuData?: Record<string, any>
  submenuProductsData?: Record<string, any[]>
  nflFlagProducts: ShopifyProduct[]
  christmasTreeProducts: ShopifyProduct[]
  judgemeBadge?: React.ReactNode
  judgemeMedals?: React.ReactNode
}

export function HeaderClient({
  menuData,
  megaMenuData = {},
  submenuProductsData = {},
  nflFlagProducts,
  christmasTreeProducts,
  judgemeBadge,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredSubmenuId, setHoveredSubmenuId] = useState<string | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("[v0] 🔍 HeaderClient submenuProductsData:", Object.keys(submenuProductsData))
    Object.entries(submenuProductsData).forEach(([key, products]) => {
      console.log(`[v0] 📦 Products for "${key}":`, Array.isArray(products) ? products.length : 0)
    })
  }, [submenuProductsData])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    return null
  }

  const menuItems = menuData.items

  return (
    <>
      <div className="animate-slide-down-header">
        <PhoenixHomeTrialBar />
        <header ref={headerRef} className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            {/* Main Header Row */}
            <div className="flex items-center justify-between h-16 gap-4 lg:gap-6">
              {/* Left - Hamburger + Logo */}
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <button
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-1"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open menu"
                >
                  <MenuIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>

                <Link href="/" className="flex items-center gap-2 group">
                  <Image
                    src="/images/favicon.png"
                    alt="Atlantic Flagpole Logo"
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="hidden xl:block">
                    <span className="text-xl font-serif font-bold text-[#0B1C2C] tracking-tight block leading-none whitespace-nowrap">
                      ATLANTIC
                    </span>
                    <span className="text-sm font-serif font-medium text-[#C8A55C] tracking-widest block leading-none whitespace-nowrap">
                      FLAGPOLE
                    </span>
                  </div>
                </Link>
              </div>

              {/* Center - Reviews Badge + Search + Cart/Account */}
              <div className="flex items-center gap-2 lg:gap-4 flex-1 justify-center max-w-5xl mx-auto">
                {/* Reviews Badge - Left of Search (hidden on mobile) */}
                {judgemeBadge && (
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0 scale-90 xl:scale-100">
                    {judgemeBadge}
                  </div>
                )}

                {/* Search Bar - Center (responsive width) */}
                <div className="flex-1 max-w-md lg:max-w-xl xl:max-w-2xl">
                  <SearchBarWrapper className="w-full" />
                </div>

                {/* Cart + Account - Right of Search */}
                <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                  <Link
                    href="/cart"
                    className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group p-1"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-300" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>

                  <a
                    href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group p-1"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Menu Bar */}
            <div className="hidden lg:block border-t border-gray-100 relative">
              <div className="flex items-center justify-center gap-1 py-2">
                {menuItems.slice(0, 6).map((item) => {
                  const hasSubmenu = item.items && item.items.length > 0
                  const isActive = activeDropdown === item.title

                  return (
                    <div key={item.title} className="relative">
                      {hasSubmenu ? (
                        <button
                          onClick={() => {
                            setActiveDropdown(isActive ? null : item.title)
                          }}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors rounded-md hover:bg-gray-50"
                        >
                          {item.title}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isActive ? "rotate-180" : ""}`} />
                        </button>
                      ) : (
                        <Link
                          href={item.url}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors rounded-md hover:bg-gray-50"
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>

              {activeDropdown && (
                <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl z-[200] animate-in slide-in-from-top-4 duration-300">
                  <div className="container mx-auto px-4 py-6">
                    {(() => {
                      const activeItem = menuItems.find((item) => item.title === activeDropdown)
                      const isInfoOrAffiliate =
                        activeDropdown.toLowerCase().includes("info") ||
                        activeDropdown.toLowerCase().includes("help") ||
                        activeDropdown.toLowerCase().includes("affiliate") ||
                        activeDropdown.toLowerCase().includes("partner")

                      if (isInfoOrAffiliate) {
                        return (
                          <InfoAffiliateMenu
                            title={activeDropdown}
                            menuItems={activeItem?.items || []}
                            onLinkClick={() => setActiveDropdown(null)}
                          />
                        )
                      }

                      return (
                        <MegaMenuWithCart
                          title={activeDropdown}
                          menuItems={activeItem?.items || []}
                          featuredProducts={submenuProductsData?.[activeDropdown] || []}
                          submenuProductsData={submenuProductsData}
                          onLinkClick={() => setActiveDropdown(null)}
                        />
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <NavigationDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        menuData={menuData}
        nflFlagProducts={nflFlagProducts}
        christmasTreeProducts={christmasTreeProducts}
      />

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
