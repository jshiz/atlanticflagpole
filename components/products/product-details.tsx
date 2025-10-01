"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import type { ShopifyProduct } from "@/lib/shopify"
import { Check, Shield, Truck, Award } from "lucide-react"

interface ProductDetailsProps {
  product: ShopifyProduct
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const images = product.images.edges.map((edge) => edge.node)
  const [selectedImage, setSelectedImage] = useState(images[0])

  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node)

  const price = selectedVariant ? Number.parseFloat(selectedVariant.price.amount) : 0
  const compareAtPrice = selectedVariant?.compareAtPrice
    ? Number.parseFloat(selectedVariant.compareAtPrice.amount)
    : null

  const hasDiscount = compareAtPrice && compareAtPrice > price
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            {selectedImage ? (
              <Image
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.altText || product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            {hasDiscount && (
              <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-lg px-4 py-2">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage?.url === image.url ? "border-[#C8A55C]" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.altText || `${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-4">{product.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
              {hasDiscount && compareAtPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
                  <Badge variant="destructive" className="text-sm">
                    Save ${(compareAtPrice - price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>
          </div>

          {product.description && (
            <div className="prose prose-sm max-w-none">
              <p className="text-[#0B1C2C]/80 leading-relaxed">{product.description}</p>
            </div>
          )}

          <Separator />

          {/* Variant Selection */}
          {product.variants.edges.length > 1 && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#0B1C2C]">Select Option:</label>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.edges.map(({ node: variant }) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant)}
                    className={selectedVariant?.id === variant.id ? "bg-[#C8A55C] hover:bg-[#a88947]" : ""}
                  >
                    {variant.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          {selectedVariant && (
            <AddToCartButton variantId={selectedVariant.id} availableForSale={selectedVariant.availableForSale} />
          )}

          {/* Features */}
          <Card className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#C8A55C] mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">Lifetime Guarantee</h3>
                  <p className="text-xs text-[#0B1C2C]/70">Built to last forever</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#C8A55C] mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">Free Shipping</h3>
                  <p className="text-xs text-[#0B1C2C]/70">On all orders</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#C8A55C] mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">Made in USA</h3>
                  <p className="text-xs text-[#0B1C2C]/70">Handcrafted quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#C8A55C] mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">30-Day Returns</h3>
                  <p className="text-xs text-[#0B1C2C]/70">Risk-free purchase</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
