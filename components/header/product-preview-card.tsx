"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  handle: string
  title: string
  description?: string
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
        title: string
        availableForSale: boolean
        price: {
          amount: string
          currencyCode: string
        }
      }
    }>
  }
}

interface ProductPreviewCardProps {
  product: Product
  onClose: () => void
}

export function ProductPreviewCard({ product, onClose }: ProductPreviewCardProps) {
  const { addToCart, loading } = useCart()
  const [added, setAdded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node)

  const price = Number.parseFloat(selectedVariant?.price?.amount || product.priceRange.minVariantPrice.amount)
  const rating = 4.5 // Mock rating

  const handleAddToCart = async () => {
    if (!selectedVariant?.availableForSale) return

    try {
      await addToCart(selectedVariant.id, 1)
      setAdded(true)
      setTimeout(() => {
        setAdded(false)
        onClose()
      }, 1500)
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    }
  }

  return (
    <div className="absolute left-0 top-full mt-2 w-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="grid grid-cols-2 gap-4 p-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url || "/placeholder.svg"}
                alt={product.featuredImage.altText || product.title}
                fill
                sizes="250px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <span className="text-6xl">🏴</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h3 className="text-lg font-serif font-bold text-[#0B1C2C] mb-2 line-clamp-2">{product.title}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200",
                  )}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({rating})</span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-[#C8A55C] mb-4">${price.toFixed(2)}</p>

            {/* Description */}
            {product.description && <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>}

            {/* Variant Selector */}
            {product.variants.edges.length > 1 && (
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Select Option:</label>
                <select
                  value={selectedVariant?.id}
                  onChange={(e) => {
                    const variant = product.variants.edges.find((v) => v.node.id === e.target.value)?.node
                    if (variant) setSelectedVariant(variant)
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C]"
                >
                  {product.variants.edges.map((variant) => (
                    <option key={variant.node.id} value={variant.node.id} disabled={!variant.node.availableForSale}>
                      {variant.node.title} - ${Number.parseFloat(variant.node.price.amount).toFixed(2)}
                      {!variant.node.availableForSale && " (Out of Stock)"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto space-y-2">
              <Button
                onClick={handleAddToCart}
                disabled={loading || added || !selectedVariant?.availableForSale}
                className={cn(
                  "w-full transition-all duration-300",
                  added ? "bg-green-600 hover:bg-green-700" : "bg-[#C8A55C] hover:bg-[#a88947] text-white",
                )}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="block w-full text-center py-2 text-sm text-[#0B1C2C] hover:text-[#C8A55C] font-semibold transition-colors"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
