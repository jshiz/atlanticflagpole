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
    const activeProducts = featuredProducts.filter((p) => {
      const hasVariant = p.variants?.edges?.[0]?.node
      const isAvailable = hasVariant?.availableForSale
      return hasVariant && isAvailable
    })

    const shuffled = shuffleArray(activeProducts)
    setDisplayProducts(shuffled)
    console.log(`[v0] 🔄 Shuffled ${shuffled.length} active products for "${title}" menu`)
  }, [featuredProducts, title])

  const getProductRating = (productId: string): number => {
    const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return 4.0 + (hash % 10) / 10
  }

  return (
    <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto">
      {/* Left Sidebar - Categories */}
      <div className="col-span-2 border-r border-gray-100 pr-3">
        <div className="sticky top-2">
          <h3 className="text-sm font-serif font-bold text-[#0B1C2C] mb-2 pb-1.5 border-b border-[#C8A55C]">{title}</h3>
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-xs py-1 px-2 rounded hover:bg-[#F5F3EF]"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                  {item.items && item.items.length > 0 && <span className="text-[10px] text-gray-400">→</span>}
                </Link>

                {hoveredCategory === item.id && item.items && item.items.length > 0 && (
                  <ul className="ml-3 mt-0.5 space-y-0.5 animate-in slide-in-from-left duration-200">
                    {item.items.slice(0, 8).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="text-[10px] text-gray-600 hover:text-[#C8A55C] transition-colors block py-0.5 px-2 rounded hover:bg-[#F5F3EF]"
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
            className="inline-flex items-center gap-1 mt-2 text-[#C8A55C] hover:text-[#a88947] font-semibold text-[10px] group"
          >
            View All
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Condensed Products Grid */}
      <div className="col-span-10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Featured Products</h4>
          <span className="text-[10px] text-gray-500">{displayProducts.length} products</span>
        </div>

        {displayProducts && displayProducts.length > 0 ? (
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {displayProducts.slice(0, 16).map((product) => {
              const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
              const rating = getProductRating(product.id)

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={onLinkClick}
                  className="group block"
                >
                  <div className="relative aspect-square bg-gray-50 rounded overflow-hidden mb-1 shadow-sm group-hover:shadow-md transition-shadow">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url || "/placeholder.svg"}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, 12vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-xl">🏴</span>
                      </div>
                    )}
                  </div>

                  <h5 className="text-[9px] font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-0.5 leading-tight">
                    {product.title}
                  </h5>

                  <div className="mb-0.5">
                    <StarRating rating={rating} size="sm" />
                  </div>

                  <p className="text-[10px] font-bold text-[#C8A55C] mb-1">${price.toFixed(2)}</p>

                  <div className="h-6">
                    <QuickAddButton product={product} />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <p className="text-xs">No products available</p>
          </div>
        )}
      </div>
    </div>
  )
}
