"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ShoppingCart, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  handle: string
  title: string
  featuredImage?: {
    url: string
    altText?: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    edges: Array<{
      node: {
        id: string
        availableForSale: boolean
      }
    }>
  }
}

interface HolidaySeasonalMegaMenuProps {
  products: Product[]
  onLinkClick?: () => void
}

function QuickAddButton({ product }: { product: Product }) {
  const { addToCart, loading } = useCart()
  const [added, setAdded] = useState(false)

  const defaultVariant = product.variants?.edges?.[0]?.node
  const isAvailable = defaultVariant?.availableForSale

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!defaultVariant || !isAvailable) return

    try {
      await addToCart(defaultVariant.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    }
  }

  if (!defaultVariant || !isAvailable) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs h-10 px-4 bg-transparent">
        Unavailable
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      onClick={handleQuickAdd}
      disabled={loading || added}
      className={cn(
        "w-full text-xs transition-all duration-300 h-10 px-4 font-semibold",
        added ? "bg-green-600 hover:bg-green-700" : "bg-[#C8A55C] hover:bg-[#a88947] text-white",
      )}
    >
      {added ? (
        <>
          <Check className="w-4 h-4 mr-1.5" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-1.5" />
          Quick Add
        </>
      )}
    </Button>
  )
}

export function HolidaySeasonalMegaMenu({ products, onLinkClick }: HolidaySeasonalMegaMenuProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  const menuLinks = [
    { title: "Shop All Holiday & Seasonal", href: "/collections/holiday-seasonal", icon: "🎉" },
    { title: "Christmas Tree Kits", href: "/collections/flagpole-christmas-trees", icon: "🎄" },
    { title: "Halloween Flags", href: "/collections/halloween", icon: "🎃" },
    { title: "Patriotic Holidays", href: "/collections/patriotic-holidays", icon: "🇺🇸" },
    { title: "Seasonal Decorations", href: "/collections/seasonal", icon: "🍂" },
  ]

  useEffect(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5)
    setDisplayProducts(shuffled.slice(0, 6))
  }, [products])

  return (
    <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Left Sidebar */}
      <div className="col-span-3 border-r border-gray-100 pr-6">
        <div className="sticky top-2">
          <h3 className="text-base font-serif font-bold text-[#0B1C2C] mb-3 pb-2 border-b-2 border-[#C8A55C] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A55C]" />
            Holiday & Seasonal
          </h3>
          <ul className="space-y-1">
            {menuLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={onLinkClick}
                  className="group flex items-center gap-2 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm py-2 px-3 rounded-lg hover:bg-[#F5F3EF]"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="group-hover:translate-x-1 transition-transform font-medium">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/collections/holiday-seasonal"
            onClick={onLinkClick}
            className="inline-flex items-center gap-1 mt-4 text-[#C8A55C] hover:text-[#a88947] font-semibold text-sm group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Products */}
      <div className="col-span-9">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Featured Holiday Products</h4>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {displayProducts.map((product) => {
              const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={onLinkClick}
                  className="group block"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url || "/placeholder.svg"}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-purple-300">
                        <span className="text-4xl">🎁</span>
                      </div>
                    )}
                  </div>

                  <h5 className="text-xs font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-2 leading-snug min-h-[3rem] flex items-start">
                    {product.title}
                  </h5>

                  <p className="text-sm font-bold text-[#C8A55C] mb-2.5">${price.toFixed(2)}</p>

                  <div className="h-10">
                    <QuickAddButton product={product} />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg">
            <p className="text-sm">No holiday products available</p>
            <p className="text-xs mt-1">Check back soon for seasonal offerings</p>
          </div>
        )}
      </div>
    </div>
  )
}
