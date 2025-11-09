"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { TrendingUp, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

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
  compareAtPriceRange?: {
    minVariantPrice?: {
      amount: string
    }
  }
  variants?: {
    edges: Array<{
      node: {
        id: string
        availableForSale: boolean
      }
    }>
  }
}

interface EnhancedMegaMenuProps {
  title: string
  menuItems: MenuItem[]
  featuredProducts?: Product[]
  onLinkClick?: () => void
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
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

export function EnhancedMegaMenu({ title, menuItems, featuredProducts = [], onLinkClick }: EnhancedMegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  useEffect(() => {
    const activeProducts = featuredProducts.filter((p) => {
      const hasVariant = p.variants?.edges?.[0]?.node
      const isAvailable = hasVariant?.availableForSale
      return hasVariant && isAvailable
    })

    const shuffled = shuffleArray(activeProducts)
    setDisplayProducts(shuffled)
    console.log(`[v0] 🔄 Shuffled ${shuffled.length} active products for enhanced menu "${title}"`)
  }, [featuredProducts, title])

  return (
    <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto max-h-[70vh] overflow-y-auto">
      {/* Left Sidebar - Categories */}
      <div className="col-span-2 border-r border-gray-100 pr-4">
        <div className="sticky top-2">
          <h3 className="text-sm font-serif font-bold text-[#0B1C2C] mb-3 pb-2 border-b border-[#C8A55C]">{title}</h3>
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-300 text-xs py-1 px-2 rounded hover:bg-[#F5F3EF]"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <span className="text-[10px] text-gray-400 group-hover:text-[#C8A55C]">{item.items.length}</span>
                  )}
                </Link>
                {hoveredCategory === item.id && item.items && item.items.length > 0 && (
                  <ul className="ml-3 mt-0.5 space-y-0.5 animate-in slide-in-from-left duration-200">
                    {item.items.slice(0, 8).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="text-[10px] text-gray-600 hover:text-[#C8A55C] transition-colors block py-0.5"
                        >
                          → {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={`/collections/${title.toLowerCase()}`}
            onClick={onLinkClick}
            className="inline-flex items-center gap-1 mt-3 text-[#C8A55C] hover:text-[#a88947] font-bold text-[10px] group transition-colors"
          >
            View All {title}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Condensed Products Grid */}
      <div className="col-span-10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-[#C8A55C]" />
            Featured Products
          </h4>
        </div>

        {displayProducts && displayProducts.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {displayProducts.slice(0, 12).map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} onClick={onLinkClick} className="group block">
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-md overflow-hidden mb-1.5 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url || "/placeholder.svg"}
                      alt={product.featuredImage.altText || product.title}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <span className="text-xl">🏴</span>
                    </div>
                  )}
                </div>
                <h5 className="text-[10px] font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1 leading-tight min-h-[2.5rem]">
                  {product.title}
                </h5>
                <p className="text-xs font-bold text-[#C8A55C] mb-2">
                  ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
                <div className="h-10">
                  <QuickAddButton product={product} />
                </div>
                {/* </CHANGE> */}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p className="text-xs">No products available</p>
          </div>
        )}
      </div>
    </div>
  )
}
