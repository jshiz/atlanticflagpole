"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { ProductAccordion } from "./product-accordion"
import { JudgeMeBadge, JudgeMeReviewWidget } from "./judgeme-widgets"
import { FrequentlyBoughtTogether } from "./frequently-bought-together"
import { RelatedProducts } from "./related-products"
import { StickyCta } from "@/components/bundle/sticky-cta"
import { ExpressCheckoutButtons } from "@/components/cart/express-checkout-buttons"
import type { ShopifyProduct } from "@/lib/shopify"
import type { BundleData } from "@/lib/shopify/bundles"
import { toNodes } from "@/lib/connection"
import { Check, Shield, Truck, Award, Package } from "lucide-react"

interface ProductDetailsProps {
  product: ShopifyProduct
  relatedProducts?: ShopifyProduct[]
  bundleProducts?: ShopifyProduct[]
  bundleData?: BundleData
}

export function ProductDetails({
  product,
  relatedProducts = [],
  bundleProducts = [],
  bundleData,
}: ProductDetailsProps) {
  const images = toNodes(product.images)
  const [selectedImage, setSelectedImage] = useState(images[0])

  const variants = toNodes(product.variants)
  const [selectedVariant, setSelectedVariant] = useState(variants[0])

  useEffect(() => {
    console.log("[v0] Product changed, resetting selected image to first image")
    setSelectedImage(images[0])
  }, [product.id, images])

  useEffect(() => {
    console.log("[v0] Product changed, resetting selected variant to first variant")
    setSelectedVariant(variants[0])
  }, [product.id, variants])

  const price = selectedVariant ? Number.parseFloat(selectedVariant.price.amount) : 0
  const compareAtPrice = selectedVariant?.compareAtPrice
    ? Number.parseFloat(selectedVariant.compareAtPrice.amount)
    : null

  const hasDiscount = compareAtPrice && compareAtPrice > price
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0

  const isPremierBundle = bundleData?.includesPremier || false

  const accordionItems = [
    {
      title: "Description",
      content: <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description || "" }} />,
      defaultOpen: true,
    },
  ]

  if (isPremierBundle && bundleData) {
    accordionItems.push({
      title: "Premier Kit Includes",
      content: (
        <div className="space-y-3">
          <p className="font-semibold text-[#C8A55C] mb-4">Complete Kit Components:</p>
          <ul className="space-y-2">
            {bundleData.components.map((component, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">{component.title}</span>
                  {component.quantity > 1 && <span className="text-gray-600"> (x{component.quantity})</span>}
                  {component.notes && <p className="text-sm text-gray-600 mt-1">{component.notes}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ),
      defaultOpen: false,
    })
  }

  accordionItems.push({
    title: "Why This Is The Best Deal",
    content: (
      <div className="space-y-4">
        <p className="font-semibold text-[#C8A55C]">Unmatched Quality & Value</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Made in USA with premium materials and craftsmanship</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Lifetime warranty - we stand behind our products forever</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>365-day home trial - risk-free purchase guarantee</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Rated #1 by thousands of satisfied customers</span>
          </li>
          {hasDiscount && (
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="font-semibold text-red-600">
                Save ${(compareAtPrice! - price).toFixed(2)} with this special offer
              </span>
            </li>
          )}
        </ul>
      </div>
    ),
  })

  accordionItems.push({
    title: "Specifications",
    content: (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-sm">Product Type</p>
            <p className="text-sm text-gray-600">{product.productType || "Flagpole Kit"}</p>
          </div>
          {bundleData?.flagSize && (
            <div>
              <p className="font-semibold text-sm">Flag Size</p>
              <p className="text-sm text-gray-600">{bundleData.flagSize}</p>
            </div>
          )}
          {bundleData?.groundSleeveSize && (
            <div>
              <p className="font-semibold text-sm">Ground Sleeve</p>
              <p className="text-sm text-gray-600">{bundleData.groundSleeveSize}</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-sm">Availability</p>
            <p className="text-sm text-gray-600">{selectedVariant?.availableForSale ? "In Stock" : "Out of Stock"}</p>
          </div>
        </div>
      </div>
    ),
  })

  accordionItems.push({
    title: "Shipping & Warranty",
    content: (
      <div className="space-y-4">
        <div>
          <p className="font-semibold mb-2">Free Shipping</p>
          <p className="text-sm text-gray-600">
            All orders ship free within the continental United States. Most orders ship within 1-2 business days.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Lifetime Warranty</p>
          <p className="text-sm text-gray-600">
            Every Atlantic Flagpole product is backed by our lifetime warranty. If anything goes wrong, we'll make it
            right - no questions asked.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">365-Day Home Trial</p>
          <p className="text-sm text-gray-600">
            Try your flagpole at home for a full year. If you're not completely satisfied, return it for a full refund.
          </p>
        </div>
      </div>
    ),
  })

  return (
    <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
      {/* Product Gallery & Info Grid */}
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
              <div className="absolute top-0 left-0 z-10">
                <div className="relative">
                  {/* Main ribbon */}
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white font-bold text-base px-6 py-2.5 shadow-lg">
                    <span className="relative z-10">{discountPercentage}% OFF</span>
                  </div>
                  {/* Folded corner effect - left side */}
                  <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[8px] border-t-red-900" />
                  {/* Folded corner effect - right side */}
                  <div className="absolute -bottom-2 right-0 w-0 h-0 border-r-[20px] border-r-transparent border-t-[8px] border-t-red-900" />
                </div>
              </div>
            )}
            {isPremierBundle && (
              <Badge className="absolute top-4 right-4 bg-[#C8A55C] hover:bg-[#a88947] text-white text-sm px-3 py-1.5 flex items-center gap-1.5">
                <Package className="w-4 h-4" />
                Includes Premier Kit
              </Badge>
            )}
          </div>

          {/* Thumbnail Grid */}
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
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-4 text-balance leading-tight">
              {product.title}
            </h1>

            {isPremierBundle && (
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 text-sm font-semibold">
                <Package className="w-4 h-4 mr-1.5" />
                Includes Premier Kit
              </Badge>
            )}

            <div className="mb-4">
              <JudgeMeBadge productHandle={product.handle} />
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
              {hasDiscount && compareAtPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through font-semibold">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-red-600 hover:bg-red-700 text-white text-base px-3 py-1.5 font-bold shadow-md">
                    Save ${(compareAtPrice - price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>
          </div>

          {variants.length > 1 && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#0B1C2C]">Select Option:</label>
              <div className="flex flex-wrap gap-3">
                {variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant)}
                    className={`max-w-[150px] h-auto py-3 px-4 text-sm leading-tight ${
                      selectedVariant?.id === variant.id ? "bg-[#C8A55C] hover:bg-[#a88947]" : ""
                    }`}
                  >
                    <span className="line-clamp-2 text-balance">{variant.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {selectedVariant && (
            <div className="space-y-3">
              <AddToCartButton
                variantId={selectedVariant.id}
                availableForSale={selectedVariant.availableForSale}
                className="w-full py-6 text-lg"
              />

              {selectedVariant.availableForSale && (
                <ExpressCheckoutButtons variantId={selectedVariant.id} quantity={1} />
              )}
            </div>
          )}

          {/* Trust Features */}
          <Card className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#C8A55C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">Lifetime Guarantee</h3>
                  <p className="text-xs text-[#0B1C2C]/70">Built to last forever</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#C8A55C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">Free Shipping</h3>
                  <p className="text-xs text-[#0B1C2C]/70">On all orders</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#C8A55C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">Made in USA</h3>
                  <p className="text-xs text-[#0B1C2C]/70">Handcrafted quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#C8A55C] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#0B1C2C] text-sm">365-Day Trial</h3>
                  <p className="text-xs text-[#0B1C2C]/70">Risk-free purchase</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <section className="mb-8">
        <ProductAccordion items={accordionItems} />
      </section>

      <section id="reviews" className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-6">Customer Reviews</h2>
        <JudgeMeReviewWidget productHandle={product.handle} productId={product.id} />
      </section>

      {/* Frequently Bought Together */}
      {bundleProducts.length > 0 && (
        <section className="mb-8">
          <FrequentlyBoughtTogether mainProduct={product} bundleProducts={bundleProducts} />
        </section>
      )}

      {/* Recommended for you */}
      {relatedProducts.length > 0 && (
        <section className="mb-8">
          <RelatedProducts products={relatedProducts} />
        </section>
      )}

      {isPremierBundle && selectedVariant && bundleData && (
        <StickyCta
          productTitle={product.title}
          price={price.toString()}
          currencyCode={selectedVariant.price.currencyCode}
          variantId={selectedVariant.id}
          bundleData={bundleData}
        />
      )}
    </main>
  )
}
