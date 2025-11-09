"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ShoppingCart, Check, Wrench } from "lucide-react"
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

interface PartsAccessoriesMegaMenuProps {
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

export function PartsAccessoriesMegaMenu({ products, onLinkClick }: PartsAccessoriesMegaMenuProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  const categories = [
    {
      title: "Lighting",
      items: [
        { label: "Solar Flagpole Lights", href: "/collections/flagpole-lighting" },
        { label: "800 Series Premium", href: "/collections/800-series-solar-light" },
      ],
    },
    {
      title: "Hardware & Mounts",
      items: [
        { label: "Flagpole Mounts", href: "/collections/flagpole-mounts" },
        { label: "Ground Sleeves", href: "/collections/ground-sleeves" },
        { label: "Anti-Theft Devices", href: "/collections/anti-theft" },
      ],
    },
    {
      title: "Toppers & Finials",
      items: [
        { label: "Eagle Toppers", href: "/collections/eagle-toppers" },
        { label: "Ball Toppers", href: "/collections/ball-toppers" },
        { label: "All Toppers", href: "/collections/flagpole-toppers" },
      ],
    },
    {
      title: "Flag Attachments",
      items: [
        { label: "Flag Harnesses", href: "/collections/flag-harnesses" },
        { label: "Flash Collars", href: "/collections/flash-collars" },
      ],
    },
  ]

  useEffect(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5)
    setDisplayProducts(shuffled.slice(0, 6))
  }, [products])

  return (
    <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Left Sidebar - Categories */}
      <div className="col-span-3 border-r border-gray-100 pr-6">
        <div className="sticky top-2">
          <h3 className="text-base font-serif font-bold text-[#0B1C2C] mb-3 pb-2 border-b-2 border-[#C8A55C] flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#C8A55C]" />
            Parts & Accessories
          </h3>
          {categories.map((category, idx) => (
            <div key={idx} className="mb-4">
              <h4 className="text-xs font-bold text-[#C8A55C] uppercase tracking-wider mb-2">{category.title}</h4>
              <ul className="space-y-1">
                {category.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={onLinkClick}
                      className="text-xs text-[#0B1C2C] hover:text-[#C8A55C] transition-colors block py-1 px-2 rounded hover:bg-[#F5F3EF]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/collections/phoenix-parts-and-accessories"
            onClick={onLinkClick}
            className="inline-flex items-center gap-1 mt-2 text-[#C8A55C] hover:text-[#a88947] font-semibold text-sm group"
          >
            View All Parts
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Products */}
      <div className="col-span-9">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
          Featured Parts & Accessories
        </h4>

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
                  <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url || "/placeholder.svg"}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-4xl">🔧</span>
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
            <p className="text-sm">No parts available</p>
            <p className="text-xs mt-1">Check back soon for more accessories</p>
          </div>
        )}
      </div>
    </div>
  )
}
