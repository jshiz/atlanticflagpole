"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, MenuIcon, X, User } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredSubmenuId, setHoveredSubmenuId] = useState<string | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    return null
  }

  const menuItems = menuData.items

  const extractCollectionHandle = (url: string): string | null => {
    const match = url.match(/\/collections\/([^/?]+)/)
    return match ? match[1] : null
  }

  const isResourceMenu = (item: any) => {
    const title = item.title.toLowerCase()
    return title.includes("resource") || title.includes("about") || title.includes("company")
  }

  // Custom social media icons
  const PinterestIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
    </svg>
  )

  const TumblrIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
    </svg>
  )

  const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Menu Button */}
            <button
              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

            {/* Left-Center: Search Bar */}
            <div className="flex-1 max-w-md">
              <SearchBarWrapper className="w-full" />
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2">
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

            {/* Right-Center: Judge.me Badge and Medals */}
            {(judgemeBadge || judgemeMedals) && (
              <div className="hidden lg:flex items-center gap-2 absolute left-1/2 translate-x-32">
                {judgemeBadge}
                {judgemeMedals}
              </div>
            )}

            {/* Right: Cart and Account */}
            <div className="flex items-center gap-4 ml-auto">
              <Link
                href="/cart"
                className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group p-2"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors p-2"
                aria-label="Account"
              >
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Dropdown */}
          {!mobileMenuOpen && (
            <div className="hidden lg:block border-t border-gray-100">
              <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
                <nav className="flex items-center justify-center gap-8 py-3">
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
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C8A55C] group-hover:w-full transition-all duration-300" />
                        </Link>
                      )
                    }

                    return (
                      <div key={item.id} className="relative" onMouseEnter={() => setActiveDropdown(item.id)}>
                        <button className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-300 font-semibold text-sm tracking-wide group py-2 relative">
                          {isChristmas && (
                            <span className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                              {[...Array(8)].map((_, i) => (
                                <span
                                  key={i}
                                  className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-snow-title"
                                  style={{
                                    left: `${10 + i * 12}%`,
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: "3s",
                                  }}
                                />
                              ))}
                            </span>
                          )}
                          <span className={isChristmas ? "text-green-700" : ""}>{item.title}</span>
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C8A55C] group-hover:w-full transition-all duration-300" />
                        </button>
                      </div>
                    )
                  })}
                </nav>

                {/* Mega Menu Dropdown */}
                {activeDropdown && (
                  <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl shadow-black/10">
                    <div className="container mx-auto px-4 py-8">
                      {menuItems.map((item) => {
                        if (activeDropdown !== item.id) return null

                        const itemData = megaMenuData[item.id]
                        const isResource = isResourceMenu(item)
                        const isNFL = isNFLMenuItem(item.title)
                        const isChristmas = isChristmasTreeMenuItem(item.title)

                        if (isChristmas) {
                          return (
                            <div key={item.id}>
                              <h3 className="text-2xl font-serif font-bold text-green-800 mb-6 pb-3 border-b-2 border-green-600 text-center flex items-center justify-center gap-3">
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
                              <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6 pb-3 border-b-2 border-[#C8A55C] text-center">
                                {item.title}
                              </h3>
                              <NFLMenuClient
                                nflFlagProducts={nflFlagProducts}
                                onLinkClick={() => setActiveDropdown(null)}
                              />
                            </div>
                          )
                        }

                        if (isResource || !itemData) {
                          return (
                            <div key={item.id} className="max-w-4xl mx-auto">
                              <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6 pb-3 border-b-2 border-[#C8A55C]">
                                {item.title}
                              </h3>
                              <div className="grid grid-cols-3 gap-6">
                                {item.items?.map((subItem) => {
                                  return (
                                    <Link
                                      key={subItem.id}
                                      href={subItem.url}
                                      className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-lg transition-all duration-300"
                                      onClick={() => {
                                        setActiveDropdown(null)
                                      }}
                                    >
                                      <h4 className="text-lg font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                                        {subItem.title}
                                      </h4>
                                      <p className="text-sm text-gray-600">
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

                        const displayProducts =
                          hoveredSubmenuId && submenuProductsData[hoveredSubmenuId]
                            ? submenuProductsData[hoveredSubmenuId]
                            : itemData?.products?.nodes || []

                        return (
                          <div key={item.id} className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
                            {/* Left Sidebar - Categories */}
                            <div className="col-span-3 border-r border-gray-100 pr-8">
                              <div className="sticky top-4">
                                <h3 className="text-lg font-serif font-bold text-[#0B1C2C] mb-4 pb-3 border-b-2 border-[#C8A55C]">
                                  {item.title}
                                </h3>
                                <ul className="space-y-3">
                                  {item.items?.map((subItem) => (
                                    <li key={subItem.id}>
                                      <Link
                                        href={subItem.url}
                                        onMouseEnter={() => setHoveredSubmenuId(subItem.id)}
                                        onMouseLeave={() => setHoveredSubmenuId(null)}
                                        className="group flex items-center gap-2 text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-300 text-sm py-1"
                                      >
                                        <span className="w-1 h-1 rounded-full bg-[#C8A55C] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                          {subItem.title}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  href={item.url}
                                  className="inline-flex items-center gap-2 mt-6 text-[#C8A55C] hover:text-[#a88947] font-bold text-sm group transition-colors"
                                >
                                  View All {item.title}
                                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                              </div>
                            </div>

                            {/* Right Side - Featured Products */}
                            <div className="col-span-9">
                              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                                {hoveredSubmenuId
                                  ? `${item.items?.find((si) => si.id === hoveredSubmenuId)?.title || "Featured"} Products`
                                  : "Featured Products"}
                              </h4>
                              {displayProducts && displayProducts.length > 0 ? (
                                <div className="grid grid-cols-4 gap-6">
                                  {displayProducts.slice(0, 4).map((product: any) => (
                                    <Link key={product.id} href={`/products/${product.handle}`} className="group">
                                      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all duration-300">
                                        {product.featuredImage ? (
                                          <Image
                                            src={product.featuredImage.url || "/placeholder.svg"}
                                            alt={product.featuredImage.altText || product.title}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <span className="text-4xl">🏴</span>
                                          </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                      </div>
                                      <h5 className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1.5">
                                        {product.title}
                                      </h5>
                                      <p className="text-sm font-bold text-[#C8A55C]">
                                        ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid grid-cols-4 gap-6">
                                  {item.items?.slice(0, 4).map((subItem) => (
                                    <Link key={subItem.id} href={subItem.url} className="group">
                                      <div className="aspect-square bg-gradient-to-br from-[#0B1C2C] to-[#112b44] rounded-xl overflow-hidden mb-3 flex items-center justify-center shadow-sm group-hover:shadow-xl transition-all duration-300">
                                        <span className="text-5xl">🏴</span>
                                      </div>
                                      <h5 className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors">
                                        {subItem.title}
                                      </h5>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="py-6 border-t border-gray-200 animate-in slide-in-from-top duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <nav className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
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

                      {/* Submenu items */}
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
              </nav>

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
          )}
        </div>
      </header>

      <style jsx global>{`
        @keyframes snow-title {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(30px);
            opacity: 0;
          }
        }
        .animate-snow-title {
          animation: snow-title linear infinite;
        }
      `}</style>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
