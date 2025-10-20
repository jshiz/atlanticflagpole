"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { StarRating } from "@/components/ui/star-rating"
import { ExpressCheckoutButtons } from "@/components/cart/express-checkout-buttons"

interface ProductDetailPanelProps {
  product: ShopifyProduct | null
  isOpen: boolean
  onClose: () => void
  position?: { top: number; left: number }
}

export function ProductDetailPanel({ product, isOpen, onClose, position }: ProductDetailPanelProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1)
      setAddedToCart(false)

      // Initialize with first available variant
      const firstAvailableVariant = product.variants?.nodes?.find((v) => v.availableForSale)
      if (firstAvailableVariant) {
        setSelectedVariant(firstAvailableVariant.id)
        const options: Record<string, string> = {}
        firstAvailableVariant.selectedOptions?.forEach((opt) => {
          options[opt.name] = opt.value
        })
        setSelectedOptions(options)
      }
    }
  }, [product])

  // Find matching variant based on selected options
  useEffect(() => {
    if (!product?.variants?.nodes) return

    const matchingVariant = product.variants.nodes.find((variant) => {
      return variant.selectedOptions?.every((opt) => selectedOptions[opt.name] === opt.value)
    })

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.id)
    }
  }, [selectedOptions, product])

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return

    setIsAddingToCart(true)
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchandiseId: selectedVariant,
          quantity,
        }),
      })

      if (response.ok) {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
        // Trigger cart refresh event
        window.dispatchEvent(new CustomEvent("cart-updated"))
      }
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    if (!selectedVariant) return

    setIsBuyingNow(true)
    try {
      // First add to cart
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchandiseId: selectedVariant,
          quantity,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Redirect to Shopify checkout
        if (data.cart?.checkoutUrl) {
          window.location.href = data.cart.checkoutUrl
        }
      }
    } catch (error) {
      console.error("[v0] Error with buy now:", error)
    } finally {
      setIsBuyingNow(false)
    }
  }

  if (!isOpen || !product) return null

  const currentVariant = product.variants?.nodes?.find((v) => v.id === selectedVariant)
  const price = currentVariant?.price || product.priceRange?.minVariantPrice
  const compareAtPrice = currentVariant?.compareAtPrice || product.compareAtPriceRange?.minVariantPrice
  const hasDiscount = compareAtPrice && Number.parseFloat(compareAtPrice.amount) > Number.parseFloat(price.amount)
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number.parseFloat(compareAtPrice.amount) - Number.parseFloat(price.amount)) /
          Number.parseFloat(compareAtPrice.amount)) *
          100,
      )
    : 0

  return (
    <>
      <div
        className="fixed z-[110] bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-out animate-in slide-in-from-right"
        style={{
          top: "140px", // Below header
          right: "20px", // From right edge
          width: "480px",
          maxWidth: "calc(100vw - 40px)",
          maxHeight: "calc(100vh - 160px)", // Ensure panel doesn't get cut off
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm transition-colors"
        >
          <X className="w-4 h-4 text-gray-700" />
        </button>

        <div className="overflow-y-auto max-h-[calc(100vh-160px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="relative aspect-[4/3] bg-gray-100">
            {product.images?.nodes?.[0] && (
              <Image
                src={product.images.nodes[0].url || "/placeholder.svg"}
                alt={product.images.nodes[0].altText || product.title}
                fill
                className="object-cover"
                sizes="480px"
              />
            )}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                Save {discountPercent}%
              </div>
            )}
          </div>

          <div className="p-5 space-y-4">
            {/* Title and Price */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{product.title}</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#C8A55C]">${Number.parseFloat(price.amount).toFixed(2)}</span>
                {hasDiscount && (
                  <span className="text-base text-gray-500 line-through">
                    ${Number.parseFloat(compareAtPrice.amount).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Rating placeholder - integrate with Judge.me if available */}
              <div className="mt-2 flex items-center gap-2">
                <StarRating rating={4.5} size="sm" />
                <span className="text-xs text-gray-600">(127 reviews)</span>
              </div>
            </div>

            {/* Product Options */}
            {product.options?.map((option) => {
              if (option.values.length <= 1) return null

              return (
                <div key={option.id}>
                  <label className="block text-xs font-semibold text-gray-900 mb-1.5 uppercase tracking-wide">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedOptions[option.name] === value
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={cn(
                            "px-3 py-1.5 rounded-md border-2 text-sm font-medium transition-all",
                            isSelected
                              ? "border-[#C8A55C] bg-[#C8A55C]/10 text-[#C8A55C]"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400",
                          )}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5 uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-md border-2 border-gray-300 hover:border-gray-400 transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-base font-semibold w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-md border-2 border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-xs font-semibold text-gray-900 mb-1.5 uppercase tracking-wide">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{product.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-3 border-t">
              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale || isAddingToCart}
                className="w-full h-11 text-sm font-semibold bg-[#C8A55C] hover:bg-[#a88947]"
                size="lg"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                  </>
                )}
              </Button>

              {/* Buy Now Button with Slide Animation */}
              {currentVariant?.availableForSale && (
                <ExpressCheckoutButtons variantId={currentVariant.id} quantity={quantity} onCheckoutStart={onClose} />
              )}

              {!currentVariant?.availableForSale && (
                <p className="text-xs text-red-600 text-center">This variant is currently out of stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
