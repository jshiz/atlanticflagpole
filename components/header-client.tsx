"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ShoppingCart, MenuIcon, User } from "lucide-react"
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
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("[v0] 🔍 HeaderClient submenuProductsData:", Object.keys(submenuProductsData))
    Object.entries(submenuProductsData).forEach(([key, products]) => {
      console.log(`[v0] 📦 Products for "${key}":`, Array.isArray(products) ? products.length : 0)
    })
  }, [submenuProductsData])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (stickyContainerRef.current && !stickyContainerRef.current.contains(target)) {
        console.log("[v0] 🖱️ Clicked outside megamenu, closing")
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      // Small delay to prevent immediate closing when opening
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
      }, 100)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    console.warn("[v0] ⚠️ No menu data available")
    return null
  }

  const menuItems = menuData.items

  const handleDropdownToggle = (itemTitle: string) => {
    console.log("[v0] 🖱️ Toggling dropdown:", itemTitle, "Current:", activeDropdown)
    setActiveDropdown((prev) => (prev === itemTitle ? null : itemTitle))
  }

  const handleLinkClick = () => {
    console.log("[v0] 🔗 Link clicked, closing megamenu")
    setActiveDropdown(null)
  }

  return (
    <>
      <div ref={stickyContainerRef} className="sticky top-0 z-[10000] bg-white shadow-sm">
        <PhoenixHomeTrialBar />
        <header ref={headerRef} className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            {/* Main Header Row */}
            <div className="flex items-center justify-between h-16 gap-4 lg:gap-6">
              {/* Left - Hamburger + Logo */}
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <button
                  type="button"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-1"
                  onClick={() => {
                    console.log("[v0] 🍔 Opening drawer")
                    setDrawerOpen(true)
                  }}
                  aria-label="Open menu"
                >
                  <MenuIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>

                <Link href="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
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
                    onClick={handleLinkClick}
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
            <div className="hidden lg:block border-t border-gray-100">
              <div className="flex items-center justify-center gap-1 py-2.5">
                {menuItems.slice(0, 6).map((item) => {
                  const hasSubmenu = item.items && item.items.length > 0
                  const isActive = activeDropdown === item.title

                  return (
                    <div key={item.title} className="relative">
                      {hasSubmenu ? (
                        <button
                          type="button"
                          onClick={() => handleDropdownToggle(item.title)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors rounded-md hover:bg-gray-50"
                        >
                          {item.title}
                          <span
                            className={`w-1.5 h-1.5 rounded-full bg-current transition-all duration-300 ${isActive ? "scale-150 opacity-100" : "scale-100 opacity-40"}`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.url}
                          onClick={handleLinkClick}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors rounded-md hover:bg-gray-50"
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </header>
      </div>

      {activeDropdown && stickyContainerRef.current && (
        <div
          className="fixed left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-[9999] animate-megamenu-slide-down"
          style={{
            top: `${stickyContainerRef.current.offsetHeight}px`,
          }}
        >
          <div className="container mx-auto px-4 py-4 overflow-hidden max-h-[70vh]">
            {(() => {
              const activeItem = menuItems.find((item) => item.title === activeDropdown)
              const isInfoOrAffiliate =
                activeDropdown.toLowerCase().includes("info") ||
                activeDropdown.toLowerCase().includes("help") ||
                activeDropdown.toLowerCase().includes("affiliate") ||
                activeDropdown.toLowerCase().includes("partner")

              console.log("[v0] 📋 Rendering megamenu for:", activeDropdown)
              console.log("[v0] 📦 Available products:", submenuProductsData?.[activeDropdown]?.length || 0)

              if (isInfoOrAffiliate) {
                return (
                  <InfoAffiliateMenu
                    title={activeDropdown}
                    menuItems={activeItem?.items || []}
                    onLinkClick={handleLinkClick}
                  />
                )
              }

              return (
                <MegaMenuWithCart
                  title={activeDropdown}
                  menuItems={activeItem?.items || []}
                  featuredProducts={submenuProductsData?.[activeDropdown] || []}
                  submenuProductsData={submenuProductsData}
                  onLinkClick={handleLinkClick}
                />
              )
            })()}
          </div>
        </div>
      )}

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
