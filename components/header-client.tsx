"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ShoppingCart, MenuIcon, User, Sparkles } from "lucide-react"
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
import { AccountMenu } from "@/components/header/account-menu"
import { MobileMenuAmazon } from "@/components/header/mobile-menu-amazon"
import { useGeo } from "@/lib/geo/context"
import { getStateCodeFromRegion } from "@/lib/geo/state-mapping"

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
  const [isSticky, setIsSticky] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0
  const menuRef = useRef<HTMLDivElement>(null)
  const { location } = useGeo()
  const stateCode = location ? getStateCodeFromRegion(location.region) : null
  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
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
          isSticky ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="md:hidden">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                isSticky ? "h-12 py-2" : "h-16 py-3"
              }`}
            >
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5 text-[#0B1C2C]" strokeWidth={2.5} />
              </button>

              <Link href="/" className="flex items-center gap-2 flex-1 justify-center">
                <Image
                  src="/images/favicon.png"
                  alt="Atlantic Flagpoles"
                  width={isSticky ? 28 : 36}
                  height={isSticky ? 28 : 36}
                  className={`transition-all duration-300 ${isSticky ? "w-7 h-7" : "w-9 h-9"}`}
                />
                <span
                  className={`font-extrabold text-[#0B1C2C] tracking-wider transition-all duration-300 ${
                    isSticky ? "text-xs" : "text-sm"
                  }`}
                >
                  ATLANTIC FLAGPOLE
                </span>
              </Link>

              <div className="flex items-center gap-1">
                <Link
                  href="/flagpole-finder"
                  className="flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="AI Search"
                >
                  <Sparkles className="w-5 h-5 text-[#C8A55C]" strokeWidth={2.5} />
                </Link>
                <a
                  href={shopifyAccountUrl}
                  className="flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5 text-[#0B1C2C]" strokeWidth={2.5} />
                </a>
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5 text-[#0B1C2C]" strokeWidth={2.5} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div
              className={`flex items-center justify-between gap-4 transition-all duration-300 ${
                isSticky ? "h-16" : "h-20"
              }`}
            >
              <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                <Image
                  src="/images/favicon.png"
                  alt="Atlantic Flagpole Logo"
                  width={isSticky ? 48 : 56}
                  height={isSticky ? 48 : 56}
                  className={`group-hover:scale-105 transition-all duration-300 ${
                    isSticky ? "w-12 h-12" : "w-14 h-14"
                  }`}
                />
                <div className={isSticky ? "hidden lg:block" : "block"}>
                  <span
                    className={`font-serif font-bold text-[#0B1C2C] tracking-tight block leading-none transition-all duration-300 ${
                      isSticky ? "text-xl" : "text-2xl"
                    }`}
                  >
                    ATLANTIC
                  </span>
                  <span
                    className={`font-serif font-medium text-[#C8A55C] tracking-widest block leading-none transition-all duration-300 ${
                      isSticky ? "text-[10px]" : "text-xs"
                    }`}
                  >
                    FLAGPOLE
                  </span>
                </div>
              </Link>

              <div className="flex-1 max-w-2xl mx-auto">
                <SearchBarWrapper className="w-full" />
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {judgemeBadge && !isSticky && <div className="hidden lg:block scale-75">{judgemeBadge}</div>}

                <AccountMenu />

                <Link
                  href="/cart"
                  className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100" ref={menuRef}>
              <div className="relative">
                <nav
                  className={`flex items-center justify-center gap-4 transition-all duration-300 ${
                    isSticky ? "py-1.5" : "py-2"
                  }`}
                >
                  {menuItems.map((item) => {
                    const hasSubmenu = item.items && item.items.length > 0
                    const isChristmas = isChristmasTreeMenuItem(item.title)

                    if (!hasSubmenu) {
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
                          onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
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
                  <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl shadow-black/10 z-[90] animate-in slide-in-from-top-2 duration-300">
                    <div className="container mx-auto px-4 py-4">
                      {menuItems.map((item) => {
                        if (activeDropdown !== item.id) return null

                        const itemData = megaMenuData[item.id]
                        const isResource = isResourceMenu(item)
                        const isNFL = isNFLMenuItem(item.title)
                        const isChristmas = isChristmasTreeMenuItem(item.title)

                        if (isChristmas) {
                          return (
                            <div key={item.id}>
                              <h3 className="text-2xl font-serif font-bold text-green-800 mb-4 pb-2 border-b-2 border-green-600 text-center flex items-center justify-center gap-3">
                                <span className="text-3xl">🎄</span>
                                {item.title}
                                <span className="text-3xl">🎄</span>
                              </h3>
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
                              <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4 pb-2 border-b-2 border-[#C8A55C] text-center">
                                {item.title}
                              </h3>
                              <NFLMenuClient
                                nflFlagProducts={nflFlagProducts}
                                onLinkClick={() => setActiveDropdown(null)}
                              />
                            </div>
                          )
                        }

                        if (isResource) {
                          return (
                            <div key={item.id} className="max-w-4xl mx-auto">
                              <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4 pb-2 border-b-2 border-[#C8A55C]">
                                {item.title}
                              </h3>
                              <div className="grid grid-cols-3 gap-6">
                                {item.title.toLowerCase().includes("info") && (
                                  <>
                                    <button
                                      onClick={() => {
                                        setQuizModalOpen(true)
                                        setActiveDropdown(null)
                                      }}
                                      className="group p-6 bg-gradient-to-br from-[#C8A55C]/10 to-white rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left"
                                    >
                                      <h4 className="text-lg font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                                        Flagpole Finder Quiz
                                      </h4>
                                      <p className="text-sm text-gray-600 flex-1">
                                        Take our interactive quiz to find the perfect flagpole for your needs
                                      </p>
                                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#C8A55C] group-hover:gap-2 transition-all">
                                        Start Quiz
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                          →
                                        </span>
                                      </span>
                                    </button>
                                    <Link
                                      href="/flagpole-finder"
                                      className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <h4 className="text-lg font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                                        Flagpole Finder Tool
                                      </h4>
                                      <p className="text-sm text-gray-600 flex-1">
                                        Browse and compare flagpoles by height, type, and features
                                      </p>
                                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#C8A55C] group-hover:gap-2 transition-all">
                                        Explore Options
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                          →
                                        </span>
                                      </span>
                                    </Link>
                                  </>
                                )}
                                {item.items?.map((subItem) => {
                                  return (
                                    <Link
                                      key={subItem.id}
                                      href={subItem.url}
                                      className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                                      onClick={() => {
                                        setActiveDropdown(null)
                                      }}
                                    >
                                      <h4 className="text-lg font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                                        {subItem.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 flex-1">
                                        {subItem.title === "Blog" && "Read our latest articles and updates"}
                                        {subItem.title === "Installation Guides" &&
                                          "Step-by-step installation instructions"}
                                        {subItem.title === "FAQ" && "Frequently asked questions and answers"}
                                      </p>
                                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#C8A55C] group-hover:gap-2 transition-all">
                                        Learn More
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                          →
                                        </span>
                                      </span>
                                    </Link>
                                  )
                                })}
                              </div>
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
