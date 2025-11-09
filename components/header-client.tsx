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
import { NFLMenuClient } from "@/components/header/nfl-menu-client"
import { ChristmasTreeMegaMenu } from "@/components/header/christmas-tree-mega-menu"
import { isNFLMenuItem, isChristmasTreeMenuItem } from "@/lib/nfl-teams"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { MegaMenuWithCart } from "@/components/header/mega-menu-with-cart"
import { MobileMenuAmazon } from "@/components/header/mobile-menu-amazon"
import { useGeo } from "@/lib/geo/context"
import { getStateCodeFromRegion } from "@/lib/geo/state-mapping"
import { AffiliateMegaMenu } from "@/components/header/affiliate-mega-menu"
import { InfoCenterMegaMenu } from "@/components/header/info-center-mega-menu"

interface HeaderClientProps {
  menuData: Menu | null
  megaMenuData?: Record<string, any>
  submenuProductsData?: Record<string, any[]>
  nflFlagProducts: ShopifyProduct[]
  christmasTreeProducts: ShopifyProduct[]
  judgemeBadge?: React.ReactNode
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0
  const menuRef = useRef<HTMLDivElement>(null)
  const { location } = useGeo()
  const stateCode = location ? getStateCodeFromRegion(location.region) : null
  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    handleScroll() // Check initial state
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  console.log("[v0] 📦 HeaderClient received megaMenuData keys:", Object.keys(megaMenuData || {}))
  console.log(
    "[v0] 📦 HeaderClient menu items with products:",
    menuData?.items?.map((item: any) => ({
      id: item.id,
      title: item.title,
      hasProducts: !!megaMenuData?.[item.id]?.products?.nodes?.length,
      productCount: megaMenuData?.[item.id]?.products?.nodes?.length || 0,
    })),
  )

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    return null
  }

  const menuItems = menuData.items

  const isResourceMenu = (item: any) => {
    const title = item.title.toLowerCase()
    return title.includes("resource") || title.includes("about") || title.includes("company") || title.includes("info")
  }

  return (
    <>
      <MobileMenuAmazon
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        location={location}
        stateCode={stateCode}
        shopifyAccountUrl={shopifyAccountUrl}
        onQuizOpen={() => setQuizModalOpen(true)}
      />

      <header
        className={`sticky top-0 z-[100] bg-white border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-3 lg:px-4">
          <div className="md:hidden">
            <div className="flex items-center justify-between h-14 py-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center w-9 h-9 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5 text-[#0B1C2C]" strokeWidth={2.5} />
              </button>

              <Link href="/" className="flex items-center gap-2 flex-1 justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-YQNeE3MdsChyJvmpaxCgbayiwZA6Ts.png"
                  alt="Atlantic Flagpoles"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="font-bold text-[#0B1C2C] tracking-wider text-xs"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.05em" }}
                  >
                    ATLANTIC
                  </span>
                  <span
                    className="font-semibold text-[#C8A55C] tracking-widest text-[9px]"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.1em" }}
                  >
                    FLAGPOLE
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  className="flex items-center justify-center w-9 h-9 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <svg
                    className="w-5 h-5 text-[#0B1C2C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
                <a
                  href={shopifyAccountUrl}
                  className="flex items-center justify-center w-9 h-9 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5 text-[#0B1C2C]" strokeWidth={2.5} />
                </a>
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-9 h-9 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5 text-[#0B1C2C]" strokeWidth={2.5} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#C41E3A] text-white text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Search - Better flow */}
            {mobileSearchOpen && (
              <div className="pb-3 border-t border-gray-100">
                <div className="pt-3">
                  <SearchBarWrapper className="w-full" />
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <div className="flex items-center justify-between gap-4 h-16 py-3">
              <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-YQNeE3MdsChyJvmpaxCgbayiwZA6Ts.png"
                  alt="Atlantic Flagpole Logo"
                  width={44}
                  height={44}
                  className="w-11 h-11 group-hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <span
                    className="font-bold text-[#0B1C2C] tracking-tight block leading-none text-xl"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.02em" }}
                  >
                    ATLANTIC
                  </span>
                  <span
                    className="font-semibold text-[#C8A55C] tracking-widest block leading-none text-[10px]"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.15em" }}
                  >
                    FLAGPOLE
                  </span>
                </div>
              </Link>

              <div className="flex-1 max-w-xl mx-auto">
                <SearchBarWrapper className="w-full" />
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={shopifyAccountUrl}
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </a>

                <Link
                  href="/cart"
                  className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C41E3A] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100" ref={menuRef}>
              <div className="relative">
                <nav className="flex items-center justify-center gap-6 py-2.5">
                  {menuItems.map((item) => {
                    const hasSubmenu = item.items && item.items.length > 0
                    const isChristmas = isChristmasTreeMenuItem(item.title)
                    const isAffiliate = item.title.toLowerCase().includes("affiliate")

                    if (!hasSubmenu && !isAffiliate) {
                      return (
                        <Link
                          key={item.id}
                          href={item.url}
                          className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-300 font-semibold text-sm tracking-wide group"
                        >
                          {item.title}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#C8A55C] group-hover:w-full transition-all duration-300" />
                        </Link>
                      )
                    }

                    return (
                      <div key={item.id} className="relative">
                        <button
                          onMouseEnter={() => setActiveDropdown(item.id)}
                          className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-300 font-semibold text-sm tracking-wide group py-1 relative"
                        >
                          <span className={isChristmas ? "text-green-700" : ""}>{item.title}</span>
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#C8A55C] group-hover:w-full transition-all duration-300" />
                        </button>
                      </div>
                    )
                  })}
                </nav>

                {activeDropdown && (
                  <div
                    className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl z-[90]"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="container mx-auto px-4 py-4">
                      {menuItems.map((item) => {
                        if (activeDropdown !== item.id) return null

                        const itemData = megaMenuData[item.id]
                        const isResource = isResourceMenu(item)
                        const isNFL = isNFLMenuItem(item.title)
                        const isChristmas = isChristmasTreeMenuItem(item.title)
                        const isInfoCenter = item.title.toLowerCase().includes("info")
                        const isAffiliate = item.title.toLowerCase().includes("affiliate")

                        if (isChristmas) {
                          return (
                            <div key={item.id}>
                              <ChristmasTreeMegaMenu
                                products={christmasTreeProducts}
                                submenuProductsData={submenuProductsData}
                                onLinkClick={() => setActiveDropdown(null)}
                              />
                            </div>
                          )
                        }

                        if (isNFL) {
                          return (
                            <div key={item.id}>
                              <NFLMenuClient
                                nflFlagProducts={nflFlagProducts}
                                onLinkClick={() => setActiveDropdown(null)}
                              />
                            </div>
                          )
                        }

                        if (isInfoCenter) {
                          return (
                            <div key={item.id}>
                              <InfoCenterMegaMenu onLinkClick={() => setActiveDropdown(null)} />
                            </div>
                          )
                        }

                        if (isAffiliate) {
                          return (
                            <div key={item.id}>
                              <AffiliateMegaMenu onLinkClick={() => setActiveDropdown(null)} />
                            </div>
                          )
                        }

                        const displayProducts = itemData?.products?.nodes || []

                        return (
                          <div key={item.id}>
                            <MegaMenuWithCart
                              title={item.title}
                              menuItems={item.items || []}
                              featuredProducts={displayProducts}
                              onLinkClick={() => setActiveDropdown(null)}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
