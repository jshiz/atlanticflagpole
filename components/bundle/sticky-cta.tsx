"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { addBundleToCart } from "@/lib/shopify/cart-bundle-add"
import type { BundleMetadata } from "@/lib/shopify/query-helpers"

interface StickyCtaProps {
  productTitle: string
  price: string
  currencyCode: string
  variantId: string
  bundleData: BundleMetadata
}

export function StickyCta({ productTitle, price, currencyCode, variantId, bundleData }: StickyCtaProps) {
  const { refreshCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddBundle = async () => {
    setIsAdding(true)
    try {
      await addBundleToCart(variantId, bundleData)
      await refreshCart()
      console.log("[v0] Bundle added to cart successfully")
    } catch (error) {
      console.error("[v0] Error adding bundle to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{productTitle}</p>
            <p className="text-lg font-bold text-primary">
              {currencyCode} ${Number.parseFloat(price).toFixed(2)}
            </p>
          </div>
          <Button onClick={handleAddBundle} disabled={isAdding} size="lg" className="flex-shrink-0">
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAdding ? "Adding..." : "Add Full Premier Kit to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
