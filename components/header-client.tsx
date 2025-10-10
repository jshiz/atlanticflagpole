"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, MenuIcon, X, ChevronDown, Facebook, Instagram, Youtube, Sparkles } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import type { Menu } from "@/lib/menus"
import { NFLMenuClient } from "@/components/header/nfl-menu-client"
import { isNFLMenuItem } from "@/lib/nfl-teams"
import type { ShopifyProduct } from "@/lib/shopify/types"

interface HeaderClientProps {
  menuData: Menu | null
  megaMenuData?: Record<string, any>
  nflFlagProducts: ShopifyProduct[]
}

export function HeaderClient({ menuData, megaMenuData = {}, nflFlagProducts }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    return null
  }

  const menuItems = menuData.items

  const getCollectionHandle = (url: string) => {
    const queryMatch = url.match(/[?&]collection=([^&]+)/)
    if (queryMatch) return queryMatch[1]
    const pathMatch = url.match(/^\/([^/?]+)/)
    return pathMatch ? pathMatch[1] : null
  }

  const isResourceMenu = (item: any) => {
    const title = item.title.toLowerCase()
    return title.includes("resource") || title.includes("about") || title.includes("company")
  }

  // Custom social media icons
  const PinterestIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
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
      <header className="sticky top-0 z-50 bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Bar with Logo and Actions */}
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#C8A55C]/20 blur-xl rounded-full group-hover:bg-[#C8A55C]/30 transition-all duration-300" />
                <Image
                  src="/images/favicon.png"
                  alt="Atlantic Flagpoles"
                  width={48}
                  height={48}
                  className="w-12 h-12 relative z-10 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden md:block">
                <span className="text-2xl font-serif font-bold text-[#0B1C2C] tracking-tight block leading-none">
                  ATLANTIC
                </span>
                <span className="text-sm font-serif font-medium text-[#C8A55C] tracking-widest block leading-none mt-0.5">
                  FLAGPOLES
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <SearchBarWrapper className="w-full" />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3 mr-2">
                <Link
                  href="https://www.facebook.com/AtlanticFlagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link
                  href="http://instagram.com/atlanticflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://x.com/AtlanticFlagP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.youtube.com/user/telescopingflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.pinterest.com/atlanticflagandpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="Pinterest"
                >
                  <PinterestIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.tumblr.com/best-flag-pole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                  aria-label="Tumblr"
                >
                  <TumblrIcon className="w-4 h-4" />
                </Link>
              </div>

              <Link
                href="/flagpole-finder"
                className="hidden lg:flex items-center gap-2 relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] hover:from-[#a88947] hover:to-[#C8A55C] px-5 py-2.5 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#C8A55C]/40 hover:-translate-y-0.5 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] opacity-75 blur-xl animate-pulse" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Flagpole Finder
                </span>
              </Link>

              <button
                onClick={() => setQuizModalOpen(true)}
                className="hidden lg:flex items-center gap-2 bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-5 py-2.5 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <span className="text-sm">Flagpole Quiz</span>
              </button>

              <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors group">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[#C8A55C] to-[#a88947] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Navigation Bar - Desktop */}
          <div className="hidden lg:block border-t border-gray-100">
            <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <nav className="flex items-center justify-center gap-8 py-4">
                {menuItems.map((item) => {
                  const hasSubmenu = item.items && item.items.length > 0

                  if (!hasSubmenu) {
                    return (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-300 font-semibold text-sm tracking-wide group"
                      >
                        {item.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C8A55C] to-[#a88947] group-hover:w-full transition-all duration-300" />
                      </Link>
                    )
                  }

                  return (
                    <div key={item.id} className="relative" onMouseEnter={() => setActiveDropdown(item.id)}>
                      <button className="flex items-center gap-1.5 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-300 font-semibold text-sm tracking-wide group py-2">
                        {item.title}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.id ? "rotate-180" : ""
                          }`}
                        />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C8A55C] to-[#a88947] group-hover:w-full transition-all duration-300" />
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
                              Featured Products
                            </h4>
                            {itemData?.products?.nodes && itemData.products.nodes.length > 0 ? (
                              <div className="grid grid-cols-4 gap-6">
                                {itemData.products.nodes.slice(0, 4).map((product: any) => (
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
              <div className="mb-4">
                <SearchBarWrapper />
              </div>
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => {
                  const isNFL = isNFLMenuItem(item.title)

                  return (
                    <div key={item.id}>
                      <Link
                        href={item.url}
                        className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {isNFL && item.items && item.items.length > 0 && (
                        <div className="mt-3">
                          <NFLMenuClient
                            nflFlagProducts={nflFlagProducts}
                            onLinkClick={() => setMobileMenuOpen(false)}
                          />
                        </div>
                      )}
                      {!isNFL && item.items && item.items.length > 0 && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.items.map((subItem) => {
                            return (
                              <Link
                                key={subItem.id}
                                href={subItem.url}
                                className="flex items-center gap-2 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
                <Link
                  href="/flagpole-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] opacity-75 blur-xl animate-pulse" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Flagpole Finder
                  </span>
                </Link>
                <button
                  onClick={() => {
                    setQuizModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="text-left bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Flagpole Quiz
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
