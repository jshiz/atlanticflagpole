"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, ShoppingCart, ChevronDown } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: Array<{
    title: string
    url: string
  }>
}

interface HeaderProps {
  menuData: { items: MenuItem[] } | null
  submenuProductsData: Record<string, any[]>
  judgemeBadge?: React.ReactNode
}

export function StickyHeaderNew({ menuData, submenuProductsData, judgemeBadge }: HeaderProps) {
  const { cart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const itemCount = cart?.lines?.edges?.reduce((total, edge) => total + edge.node.quantity, 0) || 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const menuItems = menuData?.items || []

  return (
    <div ref={headerRef} className="relative z-50">
      <div
        className={cn(
          "bg-gradient-to-r from-[#E63946] via-[#d32f3c] to-[#E63946] text-white text-center py-2 px-4 transition-all duration-300",
          isScrolled ? "-translate-y-full opacity-0 h-0" : "translate-y-0 opacity-100",
        )}
      >
        <p className="text-sm font-semibold">
          🎉 Fall Into Savings: Up To 60% Off Flagpoles + $599 Of Accessories Included! 🎉
        </p>
      </div>

      <div className="sticky top-0 bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white shadow-2xl border-b-4 border-[#C8A55C]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="text-2xl font-bold text-[#C8A55C]">Atlantic Flagpole</div>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const hasSubmenu = item.items && item.items.length > 0
                const products = submenuProductsData[item.title] || []
                const isActive = activeDropdown === item.id

                return (
                  <div key={item.id} className="relative">
                    {hasSubmenu ? (
                      <button
                        onClick={() => setActiveDropdown(isActive ? null : item.id)}
                        className={cn(
                          "px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1",
                          isActive ? "bg-[#C8A55C] text-[#0B1C2C]" : "hover:bg-white/10 text-white",
                        )}
                      >
                        {item.title}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isActive && "rotate-180")} />
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white/10 transition-all text-white"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Judge.me Badge */}
              {judgemeBadge && <div className="hidden md:block">{judgemeBadge}</div>}

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-[#C8A55C]" />
              </button>

              {/* Cart Button */}
              <Link href="/cart">
                <Button className="bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold px-4 py-2 rounded-lg shadow-lg relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#C8A55C] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <span className="text-xs font-bold text-[#0B1C2C]">{itemCount}</span>
                    </div>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {activeDropdown && (
          <div className="absolute left-0 right-0 bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] border-t border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-6">
              {menuItems
                .filter((item) => item.id === activeDropdown)
                .map((item) => {
                  const products = submenuProductsData[item.title] || []
                  const displayProducts = products.slice(0, 8)

                  return (
                    <div key={item.id}>
                      {/* Submenu Links */}
                      {item.items && item.items.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.url}
                              onClick={() => setActiveDropdown(null)}
                              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                            >
                              <p className="text-sm font-semibold text-white">{subItem.title}</p>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Featured Products */}
                      {displayProducts.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold text-[#C8A55C] mb-3">Featured Products</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {displayProducts.map((product: any) => {
                              const image = product.images?.edges?.[0]?.node || product.featuredImage
                              const variant = product.variants?.edges?.[0]?.node || product.variants?.nodes?.[0]
                              const price = variant?.price?.amount || variant?.priceV2?.amount || "0"

                              return (
                                <Link
                                  key={product.id}
                                  href={`/products/${product.handle}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-all border border-white/10"
                                >
                                  {image?.url && (
                                    <div className="aspect-square bg-white/10 rounded-lg overflow-hidden mb-2">
                                      <Image
                                        src={image.url || "/placeholder.svg"}
                                        alt={product.title}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                      />
                                    </div>
                                  )}
                                  <p className="text-xs font-semibold text-white line-clamp-2 mb-1">{product.title}</p>
                                  <p className="text-sm font-bold text-[#C8A55C]">
                                    ${Number.parseFloat(price).toFixed(2)}
                                  </p>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0B1C2C]/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <Link
                    href={item.url}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {item.title}
                  </Link>
                  {item.items && item.items.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] border-t border-white/10 shadow-2xl">
            <div className="max-w-3xl mx-auto px-4 py-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 bg-white/10 border-2 border-[#C8A55C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E63946]"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
