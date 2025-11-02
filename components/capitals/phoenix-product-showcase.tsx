"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import type { ShopifyProduct } from "@/lib/shopify/types"
import type { StateCapitalData } from "@/lib/capitals/data"
import { toNodes } from "@/lib/connection"
import { AddToCartButton } from "@/components/cart/add-to-cart"

interface PhoenixProductShowcaseProps {
  product: ShopifyProduct
  stateData: StateCapitalData
}

export function PhoenixProductShowcase({ product, stateData }: PhoenixProductShowcaseProps) {
  const [selectedVariant, setSelectedVariant] = useState(toNodes(product.variants)[0])
  const images = toNodes(product.images)
  const variants = toNodes(product.variants)

  const price = Number.parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount)
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount
    ? Number.parseFloat(selectedVariant.compareAtPrice.amount)
    : null

  return (
    <section id="phoenix-product" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-12 text-center">
            Order Your Phoenix Flagpole
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {images[0] && (
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={images[0].url || "/placeholder.svg"}
                    alt={images[0].altText || product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-4">{product.title}</h3>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className="text-xl text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="prose prose-sm mb-6">
                <p className="text-[#0B1C2C]/70">{product.description}</p>
              </div>

              {/* Variant Selector */}
              {variants.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#0B1C2C] mb-2">Select Size & Color:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          selectedVariant?.id === variant.id
                            ? "border-[#C8A55C] bg-[#C8A55C]/10"
                            : "border-gray-200 hover:border-[#C8A55C]/50"
                        }`}
                      >
                        <span className="text-sm font-medium text-[#0B1C2C]">{variant.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="bg-[#F5F3EF] rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-[#0B1C2C] mb-4">Perfect for {stateData.capital}:</h4>
                <ul className="space-y-2">
                  {stateData.climate.phoenixBenefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0B1C2C]/70">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <AddToCartButton
                product={product}
                selectedVariant={selectedVariant}
                size="lg"
                className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-white text-lg py-6"
              />

              <p className="text-center text-sm text-[#0B1C2C]/60 mt-4">
                Free shipping on orders over $99 • 365-Day Home Trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
