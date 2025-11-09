"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ShoppingCart, Check } from "lucide-react"
import { useState } from "react"
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
  variants?: {
    edges: {
      node: {
        id: string
        availableForSale: boolean
      }
    }[]
  }
}

interface MegaMenuWithProductsProps {
  title: string
  menuItems: MenuItem[]
  featuredProducts?: Product[]
  columns?: number
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

export function MegaMenuWithProducts({ title, menuItems, featuredProducts, columns = 3 }: MegaMenuWithProductsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasProducts = featuredProducts && featuredProducts.length > 0
  const gridCols = hasProducts ? "grid-cols-4" : `grid-cols-${columns}`

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
        {title}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 ${hasProducts ? "w-[900px]" : "w-[700px]"} bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50`}
        >
          <div className={`grid ${gridCols} gap-6`}>
            {menuItems.map((section) => (
              <div key={section.id}>
                <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items?.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {hasProducts && (
              <div>
                <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Featured Products</h3>
                <div className="space-y-3">
                  {featuredProducts.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      className="flex flex-col gap-2 group hover:bg-[#F5F3EF] p-2 rounded-md transition-colors"
                    >
                      <div className="flex gap-2">
                        {product.featuredImage && (
                          <Image
                            src={product.featuredImage.url || "/placeholder.svg"}
                            alt={product.featuredImage.altText || product.title}
                            width={60}
                            height={60}
                            className="w-14 h-14 object-cover rounded border border-gray-200 flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1">
                            {product.title}
                          </p>
                          <p className="text-xs font-bold text-[#C8A55C]">
                            ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="h-10">
                        <QuickAddButton product={product} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
