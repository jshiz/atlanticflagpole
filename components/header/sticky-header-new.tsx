"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, ShoppingCart, ChevronDown } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { InfoAffiliateMenu } from "@/components/header/info-affiliate-menu"

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
  const [premiumProducts, setPremiumProducts] = useState<any[]>([])
  const headerRef = useRef<HTMLDivElement>(null)

  const itemCount = cart?.lines?.edges?.reduce((total, edge) => total + (edge?.node?.quantity || 0), 0) || 0

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setIsSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isSearchOpen || premiumProducts.length > 0) return

    try {
      if (!submenuProductsData || typeof submenuProductsData !== "object") return

      const allProducts = Object.values(submenuProductsData).flat().filter(Boolean)
      if (allProducts.length === 0) return

      const highPriceProducts = allProducts
        .filter((p) => {
          try {
            const variant = p?.variants?.edges?.[0]?.node || p?.variants?.nodes?.[0]
            const price = Number.parseFloat(variant?.price?.amount || "0")
            return price > 100
          } catch {
            return false
          }
        })
        .sort((a, b) => {
          const priceA = Number.parseFloat(a?.variants?.edges?.[0]?.node?.price?.amount || "0")
          const priceB = Number.parseFloat(b?.variants?.edges?.[0]?.node?.price?.amount || "0")
          return priceB - priceA
        })
        .slice(0, 6)

      setPremiumProducts(highPriceProducts)
    } catch (error) {}
  }, [isSearchOpen, submenuProductsData])

  const menuItems = menuData?.items || []

  if (menuItems.length === 0) {
    return (
      <div className="sticky top-0 z-[100] bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white shadow-lg border-b-4 border-[#C8A55C]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-[100]" ref={headerRef}>
      <div
        className={cn(
          "bg-gradient-to-r from-[#C8A55C] via-[#b8954c] to-[#C8A55C] text-white text-center transition-all duration-500 ease-in-out",
          isScrolled ? "h-0 py-0 opacity-0 -translate-y-full overflow-hidden" : "py-2 px-2 opacity-100 translate-y-0",
        )}
      >
        <p className="text-xs sm:text-sm font-semibold">
          🎉 Fall Into Savings: Up To 60% Off Flagpoles + $599 Of Accessories Included! 🎉
        </p>
      </div>

      <div
        className={cn(
          "sticky top-0 bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white border-b-4 border-[#C8A55C] transition-all duration-500 ease-in-out",
          isScrolled ? "shadow-2xl backdrop-blur-sm" : "shadow-lg",
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-14">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <Image
                src="https://cdn.shopify.com/s/files/1/2133/9559/files/atlantic-flagpole-telescoping-flagpole-logo-2017-sm.png?v=1681855466"
                alt="Atlantic Flagpole"
                width={160}
                height={40}
                className="h-8 w-auto"
                priority
                style={{
                  filter:
                    "drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 1px 0 white) drop-shadow(0 -1px 0 white)",
                }}
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              {menuItems.map((item) => {
                const hasSubmenu = item.items && item.items.length > 0
                const isActive = activeDropdown === item.id

                return (
                  <div key={item.id}>
                    {hasSubmenu ? (
                      <button
                        onClick={() => {
                          setActiveDropdown(isActive ? null : item.id)
                          setIsSearchOpen(false)
                        }}
                        className={cn(
                          "px-2 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-0.5 whitespace-nowrap",
                          isActive ? "bg-[#C8A55C] text-white" : "text-white hover:text-[#FFD700]",
                        )}
                      >
                        {item.title}
                        <ChevronDown className={cn("w-3 h-3 transition-transform", isActive && "rotate-180")} />
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="px-2 py-1 text-xs font-bold rounded-lg transition-all text-white hover:text-[#FFD700] whitespace-nowrap"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0">
              {judgemeBadge && <div className="hidden xl:block">{judgemeBadge}</div>}

              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setActiveDropdown(null)
                }}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  isSearchOpen ? "bg-[#C8A55C] text-white" : "hover:bg-white/20 text-white",
                )}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/cart">
                <Button className="bg-[#C8A55C] hover:bg-[#b8954c] text-white font-bold px-3 py-2 rounded-lg relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-white">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/20 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "border-t border-white/20 transition-all duration-700 ease-in-out overflow-hidden origin-top",
            isScrolled
              ? "h-0 py-0 opacity-0 scale-y-0 -translate-y-4"
              : "h-auto py-3 opacity-100 scale-y-100 translate-y-0",
          )}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8A55C]" />
              <input
                type="text"
                placeholder="Search for flagpoles, flags, accessories..."
                onClick={() => {
                  setIsSearchOpen(true)
                  setActiveDropdown(null)
                }}
                className="w-full pl-12 pr-4 py-2.5 bg-white/10 border-2 border-[#C8A55C]/50 focus:border-[#C8A55C] rounded-full text-white placeholder-white/60 focus:outline-none transition-all focus:bg-white/20"
              />
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-[#0B1C2C]">
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 rounded-lg"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-2xl border-x-2 border-b-2 border-[#C8A55C] z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Search Input */}
            <div className="max-w-2xl mx-auto relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8A55C]" />
              <input
                type="text"
                placeholder="Search for flagpoles, flags, accessories..."
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-[#C8A55C]/30 focus:border-[#C8A55C] rounded-full text-black placeholder-gray-400 focus:outline-none transition-all"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A55C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Premium Products */}
            {premiumProducts.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-[#C8A55C] mb-3 text-center">⭐ Premium Best Sellers ⭐</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
                  {premiumProducts.map((product) => {
                    const image = product?.images?.edges?.[0]?.node || product?.featuredImage
                    const variant = product?.variants?.edges?.[0]?.node || product?.variants?.nodes?.[0]
                    const price = variant?.price?.amount || "0"

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.handle}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-3 border border-[#C8A55C]/50 hover:border-[#C8A55C]"
                      >
                        {image?.url && (
                          <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={product.title || "Product"}
                              width={150}
                              height={150}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <p className="text-xs font-bold text-black line-clamp-2 mb-1 text-center">{product.title}</p>
                        <p className="text-sm font-bold text-[#C8A55C] text-center">
                          ${Number.parseFloat(price).toFixed(2)}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Megamenu Dropdown */}
      {activeDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#C8A55C] shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            {menuItems
              .filter((item) => item.id === activeDropdown)
              .map((item) => {
                const isInfoOrAffiliate =
                  item.title.toLowerCase().includes("info") || item.title.toLowerCase().includes("affiliate")

                if (isInfoOrAffiliate && item.items) {
                  return (
                    <InfoAffiliateMenu
                      key={item.id}
                      title={item.title}
                      menuItems={item.items.map((subItem) => ({
                        id: subItem.title,
                        title: subItem.title,
                        url: subItem.url,
                      }))}
                      onLinkClick={() => setActiveDropdown(null)}
                    />
                  )
                }

                const products = submenuProductsData?.[item.title] || []
                const displayProducts = products.slice(0, 6)

                return (
                  <div key={item.id}>
                    {item.items && item.items.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-[#C8A55C] mb-3">Browse {item.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-4xl mx-auto">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.url}
                              onClick={() => setActiveDropdown(null)}
                              className="p-2 bg-gray-50 hover:bg-[#C8A55C]/20 rounded-lg border border-[#C8A55C]/50"
                            >
                              <p className="text-xs font-bold text-black text-center">{subItem.title}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {displayProducts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-[#C8A55C] mb-4">⭐ Featured Products ⭐</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
                          {displayProducts.map((product) => {
                            const image = product?.images?.edges?.[0]?.node || product?.featuredImage
                            const variant = product?.variants?.edges?.[0]?.node || product?.variants?.nodes?.[0]
                            const price = variant?.price?.amount || "0"

                            return (
                              <Link
                                key={product.id}
                                href={`/products/${product.handle}`}
                                onClick={() => setActiveDropdown(null)}
                                className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-3 border border-[#C8A55C]/50"
                              >
                                {image?.url && (
                                  <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                                    <Image
                                      src={image.url || "/placeholder.svg"}
                                      alt={product.title || "Product"}
                                      width={150}
                                      height={150}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-bold text-black line-clamp-2 mb-1 text-center">
                                  {product.title}
                                </p>
                                <p className="text-sm font-bold text-[#C8A55C] text-center">
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
    </div>
  )
}
