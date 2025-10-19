"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Clock, TrendingUp, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
}

interface EnhancedMegaMenuProps {
  title: string
  menuItems: MenuItem[]
  featuredProducts?: Product[]
  onLinkClick?: () => void
}

function CountdownTimer({ hours = 12 }: { hours?: number }) {
  const [timeLeft, setTimeLeft] = useState({ hours: hours, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
      <Clock className="w-3 h-3" />
      <span>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  )
}

export function EnhancedMegaMenu({ title, menuItems, featuredProducts = [], onLinkClick }: EnhancedMegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const getDiscountPercent = (product: Product): number => {
    const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
    const compareAt = product.compareAtPriceRange?.minVariantPrice?.amount
      ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : null
    if (compareAt && compareAt > price) {
      return Math.round(((compareAt - price) / compareAt) * 100)
    }
    return 0
  }

  return (
    <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
      {/* Left Sidebar - Categories with hover effects */}
      <div className="col-span-3 border-r border-gray-100 pr-8">
        <div className="sticky top-4">
          <h3 className="text-lg font-serif font-bold text-[#0B1C2C] mb-4 pb-3 border-b-2 border-[#C8A55C]">{title}</h3>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-300 text-sm py-2 px-3 rounded-lg hover:bg-[#F5F3EF]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C8A55C] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
                  </div>
                  {item.items && item.items.length > 0 && (
                    <span className="text-xs text-gray-400 group-hover:text-[#C8A55C]">{item.items.length}</span>
                  )}
                </Link>
                {hoveredCategory === item.id && item.items && item.items.length > 0 && (
                  <ul className="ml-6 mt-2 space-y-2 animate-in slide-in-from-left duration-200">
                    {item.items.slice(0, 8).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="text-xs text-gray-600 hover:text-[#C8A55C] transition-colors block py-1"
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
            className="inline-flex items-center gap-2 mt-6 text-[#C8A55C] hover:text-[#a88947] font-bold text-sm group transition-colors"
          >
            View All {title}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Featured Products with 6-column grid */}
      <div className="col-span-9">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C8A55C]" />
            Featured Products
          </h4>
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-red-600">Limited Time Offer</span>
            <CountdownTimer hours={12} />
          </div>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-6 gap-4">
            {featuredProducts.slice(0, 12).map((product) => {
              const discountPercent = getDiscountPercent(product)
              const hasDiscount = discountPercent > 0

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={onLinkClick}
                  className="group relative"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden mb-2 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url || "/placeholder.svg"}
                        alt={product.featuredImage.altText || product.title}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-2xl">🏴</span>
                      </div>
                    )}
                    {hasDiscount && (
                      <div className="absolute top-2 right-2 space-y-1">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-0.5">
                          {discountPercent}% OFF
                        </Badge>
                        <div className="bg-white/95 backdrop-blur-sm rounded px-2 py-1">
                          <CountdownTimer hours={12} />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h5 className="text-xs font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1">
                    {product.title}
                  </h5>
                  <p className="text-xs font-bold text-[#C8A55C]">
                    ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                  </p>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  )
}
