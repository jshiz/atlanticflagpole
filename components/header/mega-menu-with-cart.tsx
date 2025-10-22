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
  submenuProductsData?: Record<string, any[]>
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
        "w-full text-sm font-medium transition-all duration-300 h-9",
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

export function MegaMenuWithCart({
  title,
  menuItems,
  featuredProducts = [],
  submenuProductsData = {},
  onLinkClick,
}: MegaMenuWithCartProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null)

  useEffect(() => {
    const activeProducts = featuredProducts.filter((p) => {
      const hasVariants = p.variants?.edges && p.variants.edges.length > 0
      if (!hasVariants) return false

      const firstVariant = p.variants.edges[0]?.node
      // Only exclude if explicitly marked as unavailable
      if (firstVariant && firstVariant.availableForSale === false) return false

      return true
    })

    // Sort by price descending (high-priced items first)
    const sortedByPrice = [...activeProducts].sort((a, b) => {
      const priceA = Number.parseFloat(a.priceRange.minVariantPrice.amount)
      const priceB = Number.parseFloat(b.priceRange.minVariantPrice.amount)
      return priceB - priceA
    })

    const highPriced = sortedByPrice.slice(0, 4)
    const remaining = sortedByPrice.slice(4)
    const shuffledRemaining = shuffleArray(remaining)
    const mixed = [...highPriced, ...shuffledRemaining].slice(0, 8)

    setDisplayProducts(mixed)
  }, [featuredProducts, title])

  useEffect(() => {
    if (hoveredItem && submenuProductsData[hoveredItem]) {
      const products = submenuProductsData[hoveredItem]
      if (products && products.length > 0) {
        // Get the highest-priced available product for this submenu
        const availableProducts = products.filter((p) => p.variants?.edges?.[0]?.node?.availableForSale)
        if (availableProducts.length > 0) {
          const sortedByPrice = [...availableProducts].sort((a, b) => {
            const priceA = Number.parseFloat(a.priceRange.minVariantPrice.amount)
            const priceB = Number.parseFloat(b.priceRange.minVariantPrice.amount)
            return priceB - priceA
          })
          setHoveredProduct(sortedByPrice[0])
        }
      }
    } else {
      setHoveredProduct(null)
    }
  }, [hoveredItem, submenuProductsData])

  const getProductRating = (productId: string): number => {
    const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return 4.0 + (hash % 10) / 10
  }

  return (
    <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
      {/* Left Sidebar - Categories */}
      <div className="col-span-3 border-r border-gray-100 pr-6">
        <div className="sticky top-2">
          <h3 className="text-base font-serif font-bold text-[#0B1C2C] mb-3 pb-2 border-b border-[#C8A55C]">{title}</h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group flex items-center justify-between transition-all text-sm py-2 px-3 rounded-md",
                    hoveredItem === item.title
                      ? "bg-[#C8A55C] text-white"
                      : "text-[#0B1C2C] hover:text-[#C8A55C] hover:bg-[#F5F3EF]",
                  )}
                >
                  <span className="group-hover:translate-x-1 transition-transform font-medium">{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <span className={cn("text-xs", hoveredItem === item.title ? "text-white" : "text-gray-400")}>
                      →
                    </span>
                  )}
                </Link>

                {hoveredItem === item.title && item.items && item.items.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1 animate-in slide-in-from-left duration-200">
                    {item.items.slice(0, 8).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="text-xs text-gray-600 hover:text-[#C8A55C] transition-colors block py-1 px-3 rounded hover:bg-[#F5F3EF]"
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
            View All {title}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      <div className="col-span-9">
        {hoveredProduct ? (
          // Single Product View (when hovering over a submenu item with products)
          <div className="animate-product-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Product</h4>
            </div>
            <div className="grid grid-cols-2 gap-8 bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border border-gray-200">
              {/* Product Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                {hoveredProduct.featuredImage ? (
                  <Image
                    src={hoveredProduct.featuredImage.url || "/placeholder.svg"}
                    alt={hoveredProduct.featuredImage.altText || hoveredProduct.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <span className="text-6xl">🏴</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">{hoveredProduct.title}</h3>

                <div className="mb-4">
                  <StarRating rating={getProductRating(hoveredProduct.id)} size="md" />
                </div>

                <p className="text-3xl font-bold text-[#C8A55C] mb-6">
                  ${Number.parseFloat(hoveredProduct.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>

                <div className="space-y-3">
                  <QuickAddButton product={hoveredProduct} />
                  <Link
                    href={`/products/${hoveredProduct.handle}`}
                    onClick={onLinkClick}
                    className="block w-full text-center px-6 py-3 border-2 border-[#C8A55C] text-[#C8A55C] hover:bg-[#C8A55C] hover:text-white transition-colors rounded-md font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Products</h4>
              <span className="text-xs text-gray-500">{displayProducts.length} products</span>
            </div>

            {displayProducts && displayProducts.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 grid-rows-2">
                {displayProducts.slice(0, 8).map((product, index) => {
                  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
                  const rating = getProductRating(product.id)

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={onLinkClick}
                      className="group block animate-product-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                        {product.featuredImage ? (
                          <Image
                            src={product.featuredImage.url || "/placeholder.svg"}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="text-4xl">🏴</span>
                          </div>
                        )}
                      </div>

                      <h5 className="text-xs font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1.5 leading-tight min-h-[2.25rem]">
                        {product.title}
                      </h5>

                      <div className="mb-1.5">
                        <StarRating rating={rating} size="sm" />
                      </div>

                      <p className="text-sm font-bold text-[#C8A55C] mb-2">${price.toFixed(2)}</p>

                      <div className="h-8">
                        <QuickAddButton product={product} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">No products available</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
