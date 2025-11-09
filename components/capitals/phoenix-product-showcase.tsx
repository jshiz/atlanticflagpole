"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import { Check, Shield, Truck, Award, Star } from "lucide-react"
import type { ShopifyProduct, ProductVariant } from "@/lib/shopify/types"
import type { StateCapitalData } from "@/lib/capitals/data"
import { toNodes } from "@/lib/connection"
import { AddToCartButton } from "@/components/cart/add-to-cart"
import { VariantSelector } from "@/components/products/variant-selector"

interface PhoenixProductShowcaseProps {
  product: ShopifyProduct
  stateData: StateCapitalData
}

export function PhoenixProductShowcase({ product, stateData }: PhoenixProductShowcaseProps) {
  const variants = toNodes(product.variants)
  const images = toNodes(product.images)
  const options = product.options || []

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(variants[0])

  const defaultVariant = selectedVariant ||
    variants[0] || {
      id: product.id,
      title: "Default",
      price: product.priceRange.minVariantPrice,
      compareAtPrice: null,
      availableForSale: product.availableForSale,
    }

  const price = Number.parseFloat(defaultVariant?.price.amount || product.priceRange.minVariantPrice.amount)
  const compareAtPrice = defaultVariant?.compareAtPrice?.amount
    ? Number.parseFloat(defaultVariant.compareAtPrice.amount)
    : null

  const bundleContents = [
    { name: "Phoenix Telescoping Flagpole", description: "20ft or 25ft premium aluminum", isFree: false },
    { name: "Premium American Flag", description: "3x5 or 4x6 embroidered stars", isFree: true },
    { name: "Solar LED Light", description: "Automatic illumination", isFree: true },
    { name: "Gold Ball Topper", description: "Classic finishing touch", isFree: true },
  ]

  const features = [
    {
      icon: Star,
      title: "Installs in ~30 Minutes",
      description: "Minimal tools. No special equipment needed.",
    },
    {
      icon: Shield,
      title: "Military Grade Aerospace Aluminum",
      description: "Unmatched strength, no rattles, no rust.",
    },
    {
      icon: Truck,
      title: "Wind-Tested to 100 MPH",
      description: "Stands tall through serious storms.",
    },
    {
      icon: Award,
      title: "Lifetime Structural Warranty",
      description: "One flagpole. For life.",
    },
  ]

  return (
    <section id="phoenix-product" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-2">
              Phoenix Flagpole Premier Kit
            </h2>
            <p className="text-base text-[#0B1C2C]/70">
              Made in America, built to last a lifetime in {stateData.capital}.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 shadow-lg">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
                  {images.length > 0 && images[selectedImageIndex] ? (
                    <Image
                      src={images[selectedImageIndex].url || "/placeholder.svg"}
                      alt={images[selectedImageIndex].altText || product.title}
                      fill
                      className="object-cover"
                      priority={selectedImageIndex === 0}
                      loading={selectedImageIndex === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </Suspense>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((image, index) => (
                    <button
                      key={image.url}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded overflow-hidden border transition-all ${
                        selectedImageIndex === index
                          ? "border-[#C8A55C] scale-105"
                          : "border-gray-200 hover:border-[#C8A55C]/50"
                      }`}
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-2">{product.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8A55C] text-[#C8A55C]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#0B1C2C]/70">(2,902 reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
                  {compareAtPrice && compareAtPrice > price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        Save ${(compareAtPrice - price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {variants.length > 1 && options.length > 0 && (
                <div className="bg-[#F5F3EF] rounded-lg p-4 border border-[#C8A55C]/20">
                  <h4 className="font-bold text-[#0B1C2C] mb-3 text-sm">Choose Your Options:</h4>
                  <VariantSelector options={options} variants={variants} onVariantChange={setSelectedVariant} />
                </div>
              )}

              <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                <h4 className="font-bold text-[#0B1C2C] mb-3 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Perfect for {stateData.capital}:
                </h4>
                <ul className="space-y-2">
                  {stateData.climate.phoenixBenefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#0B1C2C]/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <AddToCartButton
                product={product}
                size="lg"
                className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-white text-lg py-6 shadow-lg"
              />

              <div className="flex items-center justify-center gap-4 text-xs text-[#0B1C2C]/70">
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Made in USA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F3EF] rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 text-center">Everything Included in Your Kit</h3>

            <div className="grid md:grid-cols-2 gap-3">
              {bundleContents.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded bg-white border border-gray-200">
                  <Check className="w-5 h-5 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#0B1C2C] text-sm">{item.name}</p>
                    <p className="text-xs text-[#0B1C2C]/60">{item.description}</p>
                    {item.isFree && (
                      <span className="inline-block mt-1 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        FREE
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#C8A55C]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1C2C] mb-3">{feature.title}</h4>
                  <p className="text-[#0B1C2C]/70 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
