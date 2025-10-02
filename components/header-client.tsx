"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, MenuIcon, X, ChevronDown } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import type { Menu } from "@/lib/menus"

interface HeaderClientProps {
  menuData: Menu | null
  megaMenuData?: Record<string, any>
}

export function HeaderClient({ menuData, megaMenuData = {} }: HeaderClientProps) {
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
              <button
                onClick={() => setQuizModalOpen(true)}
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#C8A55C] to-[#a88947] hover:from-[#d4b56f] hover:to-[#C8A55C] px-6 py-2.5 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A55C]/30 hover:-translate-y-0.5"
              >
                <span className="text-sm">Find Your Flagpole</span>
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

                      const collectionHandle = getCollectionHandle(item.url)
                      const collectionData = collectionHandle ? megaMenuData[collectionHandle] : null

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
                            {collectionData?.products?.nodes && collectionData.products.nodes.length > 0 ? (
                              <div className="grid grid-cols-4 gap-6">
                                {collectionData.products.nodes.slice(0, 8).map((product: any) => (
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
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.items && item.items.length > 0 && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.url}
                            className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setQuizModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="text-left bg-gradient-to-r from-[#C8A55C] to-[#a88947] px-4 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Find Your Flagpole
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
