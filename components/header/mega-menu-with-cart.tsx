"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Star, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"
import { ProductPreviewCard } from "./product-preview-card"

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
      <Button size="sm" variant="outline" disabled className="w-full text-xs bg-transparent">
        Unavailable
      </Button>
    )
  }

  if (!isAvailable) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs bg-transparent">
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
        "w-full text-xs transition-all duration-300",
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
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null)

  const getProductRating = (productId: string): number => {
    const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return 4.0 + (hash % 10) / 10
  }

  const previewableProducts = featuredProducts.filter(
    (p) => p.handle.includes("telescoping") || p.handle.includes("flagpole") || p.handle.includes("kit"),
  )

  return (
    <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
      {/* Left Sidebar - Categories */}
      <div className="col-span-2 border-r border-gray-100 pr-6">
        <div className="sticky top-4">
          <h3 className="text-base font-serif font-bold text-[#0B1C2C] mb-4 pb-2 border-b-2 border-[#C8A55C]">
            {title}
          </h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => {
                    setHoveredCategory(item.id)
                    const matchingProduct = previewableProducts.find((p) =>
                      item.title.toLowerCase().includes(p.title.toLowerCase().split(" ")[0]),
                    )
                    if (matchingProduct) {
                      setHoveredProduct(matchingProduct)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCategory(null)
                    setHoveredProduct(null)
                  }}
                  className="group flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm py-1.5 px-2 rounded hover:bg-[#F5F3EF]"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                  {item.items && item.items.length > 0 && <span className="text-xs text-gray-400">→</span>}
                </Link>

                {hoveredProduct && hoveredCategory === item.id && (
                  <div
                    onMouseEnter={() => setHoveredProduct(hoveredProduct)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <ProductPreviewCard product={hoveredProduct} onClose={() => setHoveredProduct(null)} />
                  </div>
                )}

                {hoveredCategory === item.id && item.items && item.items.length > 0 && !hoveredProduct && (
                  <ul className="ml-4 mt-1 space-y-1 animate-in slide-in-from-left duration-200">
                    {item.items.slice(0, 10).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="text-xs text-gray-600 hover:text-[#C8A55C] transition-colors block py-1 px-2 rounded hover:bg-[#F5F3EF]"
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
            className="inline-flex items-center gap-1 mt-4 text-[#C8A55C] hover:text-[#a88947] font-semibold text-xs group"
          >
            View All
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Products Grid with Quick Add */}
      <div className="col-span-10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Products</h4>
          <span className="text-xs text-gray-500">{featuredProducts.length} products</span>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-6 gap-4">
            {featuredProducts.slice(0, 12).map((product) => {
              const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
              const rating = getProductRating(product.id)

              return (
                <div key={product.id} className="group pb-3">
                  <Link href={`/products/${product.handle}`} onClick={onLinkClick} className="block">
                    <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                      {product.featuredImage ? (
                        <Image
                          src={product.featuredImage.url || "/placeholder.svg"}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <span className="text-3xl">🏴</span>
                        </div>
                      )}
                    </div>

                    <h5 className="text-xs font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-3 mb-1.5 min-h-[3rem] leading-relaxed">
                      {product.title}
                    </h5>

                    <div className="mb-2">
                      <StarRating rating={rating} size="sm" />
                    </div>

                    <p className="text-sm font-bold text-[#C8A55C] mb-3">${price.toFixed(2)}</p>
                  </Link>

                  <QuickAddButton product={product} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">No products available</p>
          </div>
        )}
      </div>
    </div>
  )
}
