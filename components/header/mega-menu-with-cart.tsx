"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Star, ShoppingCart, Check } from "lucide-react"
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
  variants: {
    edges: Array<{
      node: {
        id: string
        availableForSale: boolean
      }
    }>
  }
  availableForSale?: boolean
}

interface MegaMenuWithCartProps {
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

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
  }

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < Math.floor(rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  )
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

  if (!defaultVariant) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs bg-transparent h-9">
        Unavailable
      </Button>
    )
  }

  if (!isAvailable) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs bg-transparent h-9">
        Out of Stock
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      onClick={handleQuickAdd}
      disabled={loading || added}
      className={cn(
        "w-full text-xs transition-all duration-300 h-9",
        added ? "bg-green-600 hover:bg-green-700" : "bg-[#C8A55C] hover:bg-[#a88947] text-white",
      )}
    >
      {added ? (
        <>
          <Check className="w-3 h-3 mr-1" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-3 h-3 mr-1" />
          Quick Add
        </>
      )}
    </Button>
  )
}

export function MegaMenuWithCart({ title, menuItems, featuredProducts = [], onLinkClick }: MegaMenuWithCartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  useEffect(() => {
    console.log(`[v0] 🔍 MegaMenuWithCart received ${featuredProducts.length} products for "${title}"`)

    const activeProducts = featuredProducts.filter((p) => {
      // Check if product has availableForSale field at product level
      if ("availableForSale" in p && (p as any).availableForSale === true) {
        return true
      }

      // Fallback: check variant availability
      const hasVariant = p.variants?.edges?.[0]?.node
      const isAvailable = hasVariant?.availableForSale
      return hasVariant && isAvailable
    })

    console.log(`[v0] ✅ Filtered to ${activeProducts.length} available products for "${title}"`)

    const shuffled = shuffleArray(activeProducts)
    setDisplayProducts(shuffled)
  }, [featuredProducts, title])

  const getProductRating = (productId: string): number => {
    const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return 4.0 + (hash % 10) / 10
  }

  return (
    <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Left Sidebar - Categories */}
      <div className="col-span-3 border-r border-gray-100 pr-4">
        <div className="sticky top-2">
          <h3 className="text-base font-serif font-bold text-[#0B1C2C] mb-3 pb-2 border-b-2 border-[#C8A55C]">
            {title}
          </h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm py-2 px-3 rounded-lg hover:bg-[#F5F3EF]"
                >
                  <span className="group-hover:translate-x-1 transition-transform font-medium">{item.title}</span>
                  {item.items && item.items.length > 0 && <span className="text-xs text-gray-400">→</span>}
                </Link>

                {hoveredCategory === item.id && item.items && item.items.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1 animate-in fade-in slide-in-from-left-2 duration-200">
                    {item.items.slice(0, 8).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="text-xs text-gray-600 hover:text-[#C8A55C] transition-colors block py-1.5 px-3 rounded-lg hover:bg-[#F5F3EF]"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={`/collections/${title.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onLinkClick}
            className="inline-flex items-center gap-1 mt-4 text-[#C8A55C] hover:text-[#a88947] font-semibold text-sm group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Products Grid */}
      <div className="col-span-9">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Products</h4>
          <span className="text-xs text-gray-500">{displayProducts.length} products</span>
        </div>

        {displayProducts && displayProducts.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayProducts.slice(0, 18).map((product, index) => {
              const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
              const rating = getProductRating(product.id)

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={onLinkClick}
                  className="group block animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 shadow-sm group-hover:shadow-lg transition-all">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url || "/placeholder.svg"}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-2xl">🏴</span>
                      </div>
                    )}
                  </div>

                  <h5 className="text-xs font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1.5 leading-tight min-h-[2.5rem]">
                    {product.title}
                  </h5>

                  <div className="mb-1.5">
                    <StarRating rating={rating} size="sm" />
                  </div>

                  <p className="text-sm font-bold text-[#C8A55C] mb-2">${price.toFixed(2)}</p>

                  <div className="h-9">
                    <QuickAddButton product={product} />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg">
            <p className="text-sm">No products available in this collection</p>
            <p className="text-xs mt-1">Check back soon for new arrivals</p>
          </div>
        )}
      </div>
    </div>
  )
}
