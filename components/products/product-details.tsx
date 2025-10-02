"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { ProductWatching } from "./product-watching"
import { ShippingEstimate } from "./shipping-estimate"
import { ProductReviewsSummary } from "./product-reviews-summary"
import { TrustBadges } from "./trust-badges"
import { FrequentlyBoughtTogether } from "./frequently-bought-together"
import { RelatedProducts } from "./related-products"
import { CustomerReviews } from "./customer-reviews"
import type { ShopifyProduct } from "@/lib/shopify"
import { toNodes } from "@/lib/connection"
import { Check, Shield, Truck, Award } from "lucide-react"
import type { ReviewsData } from "@/lib/shopify/reviews"

interface ProductDetailsProps {
  product: ShopifyProduct
  relatedProducts?: ShopifyProduct[]
  bundleProducts?: ShopifyProduct[]
  reviewsData: ReviewsData
}

export function ProductDetails({
  product,
  relatedProducts = [],
  bundleProducts = [],
  reviewsData,
}: ProductDetailsProps) {
  const images = toNodes(product.images)
  const [selectedImage, setSelectedImage] = useState(images[0])

  const variants = toNodes(product.variants)
  const [selectedVariant, setSelectedVariant] = useState(variants[0])

  const price = selectedVariant ? Number.parseFloat(selectedVariant.price.amount) : 0
  const compareAtPrice = selectedVariant?.compareAtPrice
    ? Number.parseFloat(selectedVariant.compareAtPrice.amount)
    : null

  const hasDiscount = compareAtPrice && compareAtPrice > price
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0

  const scrollToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
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
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-4 text-balance">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <ProductReviewsSummary onViewReviews={scrollToReviews} />
            </div>

            <ProductWatching />
            {/* </CHANGE> */}

            <div className="flex items-center gap-3 mt-4">
              <span className="text-4xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
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

          <ShippingEstimate />
          {/* </CHANGE> */}

          {/* Variant Selection */}
          {variants.length > 1 && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#0B1C2C]">Select Option:</label>
              <div className="grid grid-cols-2 gap-3">
                {variants.map((variant) => (
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
            <div className="space-y-3">
              <AddToCartButton variantId={selectedVariant.id} availableForSale={selectedVariant.availableForSale} />

              <Button
                variant="outline"
                className="w-full py-6 text-base font-semibold border-2 hover:bg-[#5A31F4] hover:text-white hover:border-[#5A31F4] bg-transparent"
                size="lg"
              >
                <svg className="w-16 h-5 mr-2" viewBox="0 0 80 20" fill="currentColor">
                  <path d="M13.937 5.194c-.897 0-1.72.448-2.318 1.194V5.418h-2.692v13.164h2.767v-4.478c.598.672 1.421 1.12 2.243 1.12 2.094 0 3.814-1.791 3.814-4.925 0-3.134-1.72-5.105-3.814-5.105zm-.598 7.687c-1.047 0-1.87-.896-1.87-2.537 0-1.642.823-2.538 1.87-2.538 1.047 0 1.87.896 1.87 2.538 0 1.641-.823 2.537-1.87 2.537z" />
                  <path d="M23.117 5.194c-2.617 0-4.561 1.94-4.561 4.925 0 2.985 1.944 4.925 4.561 4.925 2.617 0 4.561-1.94 4.561-4.925 0-2.985-1.944-4.925-4.561-4.925zm0 7.687c-1.047 0-1.87-.896-1.87-2.537 0-1.642.823-2.538 1.87-2.538 1.047 0 1.87.896 1.87 2.538 0 1.641-.823 2.537-1.87 2.537z" />
                  <path d="M35.154 5.194c-.897 0-1.72.448-2.318 1.194V5.418h-2.692v13.164h2.767v-4.478c.598.672 1.421 1.12 2.243 1.12 2.094 0 3.814-1.791 3.814-4.925 0-3.134-1.72-5.105-3.814-5.105zm-.598 7.687c-1.047 0-1.87-.896-1.87-2.537 0-1.642.823-2.538 1.87-2.538 1.047 0 1.87.896 1.87 2.538 0 1.641-.823 2.537-1.87 2.537z" />
                </svg>
                Pay
              </Button>
              {/* </CHANGE> */}
            </div>
          )}

          <TrustBadges />
          {/* </CHANGE> */}

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

      {bundleProducts.length > 0 && (
        <div className="mb-12">
          <FrequentlyBoughtTogether mainProduct={product} bundleProducts={bundleProducts} />
        </div>
      )}
      {/* </CHANGE> */}

      <CustomerReviews reviewsData={reviewsData} />

      {/* </CHANGE> */}

      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      {/* </CHANGE> */}
    </div>
  )
}
