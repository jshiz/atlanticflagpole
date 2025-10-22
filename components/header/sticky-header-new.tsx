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
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const itemCount = cart?.lines?.edges?.reduce((total, edge) => total + edge.node.quantity, 0) || 0

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

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
          "bg-gradient-to-r from-[#E63946] via-[#d32f3c] to-[#E63946] text-white text-center py-2 px-4 transition-all duration-300 overflow-hidden",
          mounted && isScrolled ? "h-0 opacity-0" : "h-auto opacity-100",
        )}
      >
        <p className="text-sm font-semibold whitespace-nowrap">
          🎉 Fall Into Savings: Up To 60% Off Flagpoles + $599 Of Accessories Included! 🎉
        </p>
      </div>

      <div className="sticky top-0 bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white shadow-2xl border-b-4 border-[#C8A55C]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="https://cdn.shopify.com/s/files/1/2133/9559/files/atlantic-flagpole-telescoping-flagpole-logo-2017-sm.png?v=1681855466"
                alt="Atlantic Flagpole"
                width={180}
                height={50}
                className="h-10 w-auto"
                style={{
                  filter: `
                    drop-shadow(1px 0 0 white)
                    drop-shadow(-1px 0 0 white)
                    drop-shadow(0 1px 0 white)
                    drop-shadow(0 -1px 0 white)
                    drop-shadow(1px 1px 0 white)
                    drop-shadow(-1px -1px 0 white)
                    drop-shadow(1px -1px 0 white)
                    drop-shadow(-1px 1px 0 white)
                  `,
                }}
                priority
              />
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const hasSubmenu = item.items && item.items.length > 0
                const isActive = activeDropdown === item.id

                return (
                  <div key={item.id} className="relative">
                    {hasSubmenu ? (
                      <button
                        onClick={() => {
                          console.log("[v0] 🖱️ Clicked menu:", item.title)
                          setActiveDropdown(isActive ? null : item.id)
                        }}
                        className={cn(
                          "px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1 shadow-md",
                          isActive
                            ? "bg-[#FFD700] text-[#0B1C2C] scale-105"
                            : "hover:bg-white/20 text-white hover:scale-105",
                        )}
                      >
                        {item.title}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isActive && "rotate-180")} />
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="px-4 py-2 text-sm font-bold rounded-lg hover:bg-white/20 transition-all text-white hover:scale-105 shadow-md"
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
              {judgemeBadge && (
                <div className="hidden md:block [&_*]:!text-white [&_.jdgm-star]:!text-[#FFD700]">{judgemeBadge}</div>
              )}

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all hover:scale-110 shadow-md"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[#FFD700]" />
              </button>

              {/* Cart Button */}
              <Link href="/cart">
                <Button className="bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold px-4 py-2 rounded-lg shadow-lg relative hover:scale-105 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                      <span className="text-xs font-bold text-[#0B1C2C]">{itemCount}</span>
                    </div>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-all hover:scale-110 shadow-md"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#FFD700]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#FFD700]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {activeDropdown && (
          <div className="absolute left-0 right-0 bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] border-t-2 border-[#FFD700] shadow-2xl z-50 animate-megamenu-slide-down">
            {/* Darker semi-transparent overlay for better contrast */}
            <div className="absolute inset-0 bg-[#0B1C2C]/80 pointer-events-none" />

            {/* Subtle gold star pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, #FFD700 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
              {menuItems
                .filter((item) => item.id === activeDropdown)
                .map((item) => {
                  const products = submenuProductsData[item.title] || []
                  const displayProducts = products.slice(0, 8)

                  console.log("[v0] 📋 Rendering megamenu for:", item.title, "with", displayProducts.length, "products")

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
                              className="p-4 bg-white/20 hover:bg-[#FFD700]/30 rounded-lg transition-all border-2 border-[#FFD700]/50 hover:border-[#FFD700] backdrop-blur-sm hover:scale-105 shadow-lg"
                            >
                              <p className="text-sm font-bold text-white drop-shadow-md">{subItem.title}</p>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Featured Products */}
                      {displayProducts.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-[#FFD700] mb-4 drop-shadow-lg flex items-center gap-2">
                            <span className="text-2xl">⭐</span>
                            Featured Products
                          </h3>
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
                                  className="group bg-white/20 hover:bg-white/30 rounded-lg p-4 transition-all border-2 border-[#FFD700]/50 hover:border-[#FFD700] backdrop-blur-sm hover:scale-105 shadow-lg"
                                >
                                  {image?.url && (
                                    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3 shadow-md">
                                      <Image
                                        src={image.url || "/placeholder.svg"}
                                        alt={product.title}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                                      />
                                    </div>
                                  )}
                                  <p className="text-xs font-bold text-white line-clamp-2 mb-2 drop-shadow-md">
                                    {product.title}
                                  </p>
                                  <p className="text-sm font-bold text-[#FFD700] drop-shadow-md">
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
