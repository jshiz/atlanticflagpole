"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, MenuIcon, X, User, Search, ChevronDown } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBar } from "@/components/search/search-bar"
import type { Menu } from "@/lib/menus"
import { NFLMenuClient } from "@/components/header/nfl-menu-client"
import { ChristmasTreeMegaMenu } from "@/components/header/christmas-tree-mega-menu"
import { isNFLMenuItem, isChristmasTreeMenuItem } from "@/lib/nfl-teams"
import type { ShopifyProduct } from "@/lib/shopify/types"

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
  judgemeMedals,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    return null
  }

  const menuItems = menuData.items

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <Image
                src="/images/favicon.png"
                alt="Atlantic Flagpoles"
                width={40}
                height={40}
                className="w-10 h-10 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="hidden sm:block">
                <span className="text-lg font-serif font-bold text-[#0B1C2C] tracking-tight block leading-none">
                  ATLANTIC
                </span>
                <span className="text-xs font-serif font-medium text-[#C8A55C] tracking-widest block leading-none">
                  FLAGPOLES
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {menuItems.slice(0, 6).map((item) => {
                const isNFL = isNFLMenuItem(item.title)
                const isChristmas = isChristmasTreeMenuItem(item.title)
                const hasSubmenu = item.items && item.items.length > 0

                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors rounded-lg hover:bg-gray-50 whitespace-nowrap"
                    >
                      {isChristmas && "🎄 "}
                      {item.title}
                      {hasSubmenu && <ChevronDown className="w-3 h-3" />}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasSubmenu && activeDropdown === item.id && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] py-2 z-50">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.url}
                            className="block px-4 py-2 text-sm text-[#0B1C2C] hover:text-[#C8A55C] hover:bg-gray-50 transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-2 hover:bg-gray-50 rounded-lg"
                aria-label="Toggle search"
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {/* Judge.me Badges (Desktop Only) */}
              <div className="hidden xl:flex items-center gap-2">
                {judgemeBadge}
                {judgemeMedals}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group p-2 hover:bg-gray-50 rounded-lg"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-2 hover:bg-gray-50 rounded-lg"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-2 hover:bg-gray-50 rounded-lg group"
                aria-label="Toggle menu"
              >
                <span className="absolute inset-0 rounded-lg bg-[#C8A55C]/20 blur-md animate-pulse opacity-60 group-hover:opacity-100 transition-opacity" />
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 relative z-10" />
                ) : (
                  <MenuIcon className="w-5 h-5 relative z-10" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-out ${
            searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-3xl mx-auto">
              <SearchBar
                autoFocus={searchOpen}
                onBlur={() => {}}
                placeholder="Search flagpoles, flags, accessories..."
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-out max-h-[calc(100vh-4rem)] overflow-y-auto ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {menuItems.map((item) => {
                const isNFL = isNFLMenuItem(item.title)
                const isChristmas = isChristmasTreeMenuItem(item.title)

                return (
                  <div key={item.id} className="space-y-3">
                    <Link
                      href={item.url}
                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-bold text-base block border-b border-gray-200 pb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {isChristmas ? `🎄 ${item.title}` : item.title}
                    </Link>

                    {!isNFL && !isChristmas && item.items && item.items.length > 0 && (
                      <div className="space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.url}
                            className="flex items-start gap-2 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm leading-tight"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="text-[#C8A55C] mt-1">•</span>
                            <span>{subItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {menuItems.some((item) => isNFLMenuItem(item.title)) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-4">NFL Flags</h3>
                <NFLMenuClient nflFlagProducts={nflFlagProducts} onLinkClick={() => setMobileMenuOpen(false)} />
              </div>
            )}

            {menuItems.some((item) => isChristmasTreeMenuItem(item.title)) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-green-700 mb-4">🎄 Christmas Trees</h3>
                <ChristmasTreeMegaMenu
                  products={christmasTreeProducts}
                  submenuProductsData={submenuProductsData}
                  onLinkClick={() => setMobileMenuOpen(false)}
                />
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
              <Link
                href="/flagpole-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-[#C8A55C] hover:bg-[#a88947] px-4 py-3 rounded-lg text-white font-semibold text-center transition-colors"
              >
                Flagpole Finder
              </Link>
              <button
                onClick={() => {
                  setQuizModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-4 py-3 rounded-lg text-white font-semibold transition-colors"
              >
                Flagpole Quiz
              </button>
            </div>
          </div>
        </div>
      </header>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
