"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Shield, Truck, Award, Package, Star, Sparkles, Wrench, Wind, Medal } from "lucide-react"
import type { ShopifyProduct } from "@/lib/shopify/types"
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

  // Ensure we have at least one variant
  const defaultVariant = variants[0] || {
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
    { name: "Phoenix Telescoping Flagpole", description: "20ft or 25ft premium aluminum construction", isFree: false },
    { name: "Premium American Flag", description: "3x5 or 4x6 embroidered stars", isFree: true },
    { name: "Solar-Powered LED Light", description: "Automatic dusk-to-dawn illumination", isFree: true },
    { name: "Gold Ball Topper", description: "Classic patriotic finishing touch", isFree: true },
    { name: "Ground Sleeve Installation Kit", description: "Professional-grade foundation system", isFree: true },
    { name: "Securi-Lok™ Locking System", description: "Anti-theft protection included", isFree: false },
    { name: "Lifetime Structural Warranty", description: "One flagpole. For life.", isFree: false },
  ]

  const features = [
    {
      icon: Wrench,
      title: "Installs in ~30 Minutes",
      description: "Minimal tools. No special equipment needed.",
    },
    {
      icon: Medal,
      title: "Military Grade Aerospace Aluminum",
      description: "Unmatched strength, no rattles, no rust.",
    },
    {
      icon: Wind,
      title: "Wind-Tested to 100 MPH",
      description: "Stands tall through serious storms.",
    },
    {
      icon: Shield,
      title: "Lifetime Structural Warranty",
      description: "One flagpole. For life.",
    },
  ]

  return (
    <section id="phoenix-product" className="py-20 bg-gradient-to-b from-white to-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#C8A55C]/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#C8A55C]" />
              <span className="text-sm font-semibold text-[#C8A55C]">Premier Kit - Complete Bundle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
              The Phoenix Flagpole Premier Kit
            </h2>
            <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
              Everything you need for a professional flagpole installation in {stateData.capital}. Made in America,
              built to last a lifetime.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-2xl">
                {images.length > 0 && images[selectedImageIndex] ? (
                  <Image
                    src={images[selectedImageIndex].url || "/placeholder.svg"}
                    alt={images[selectedImageIndex].altText || product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((image, index) => (
                    <button
                      key={image.url}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-[#C8A55C] shadow-lg scale-105"
                          : "border-gray-200 hover:border-[#C8A55C]/50"
                      }`}
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                  <Shield className="w-6 h-6 text-[#C8A55C] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#0B1C2C]">Lifetime Warranty</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                  <Truck className="w-6 h-6 text-[#C8A55C] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#0B1C2C]">Free Shipping</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                  <Award className="w-6 h-6 text-[#C8A55C] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#0B1C2C]">Made in USA</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-[#0B1C2C] mb-3">{product.title}</h3>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8A55C] text-[#C8A55C]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#0B1C2C]/70">(2,902 reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
                  {compareAtPrice && compareAtPrice > price && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Save ${(compareAtPrice - price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {variants.length > 1 && options.length > 0 && (
                <div className="bg-[#F5F3EF] rounded-xl p-6 border-2 border-[#C8A55C]/20">
                  <h4 className="font-bold text-[#0B1C2C] mb-4">Choose Your Options:</h4>
                  <VariantSelector options={options} variants={variants} />
                </div>
              )}

              {/* Location-Specific Benefits */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Perfect for {stateData.capital}, {stateData.state}:
                </h4>
                <ul className="space-y-3">
                  {stateData.climate.phoenixBenefits.slice(0, 4).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-[#0B1C2C]/80 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton
                product={product}
                size="lg"
                className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-white text-lg py-7 shadow-xl hover:shadow-2xl transition-all"
              />

              <div className="flex items-center justify-center gap-6 text-sm text-[#0B1C2C]/70">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>365-Day Trial</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100 mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <Package className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">Complete Bundle</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-3">
                Everything You Need, All in One Box
              </h3>
              <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
                The Premier Kit includes everything for a professional installation. No hidden costs, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {bundleContents.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F3EF] border border-gray-200 hover:border-[#C8A55C] transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#C8A55C] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0B1C2C] mb-1">{item.name}</p>
                    <p className="text-sm text-[#0B1C2C]/60">{item.description}</p>
                    {item.isFree && (
                      <span className="inline-block mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        FREE ($50+ Value)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#C8A55C]/10 to-[#C8A55C]/5 rounded-xl p-6 border-2 border-[#C8A55C]/30">
              <p className="text-center text-lg font-semibold text-[#0B1C2C]">
                <span className="text-[#C8A55C]">Total Value: $899+</span> • You Save Over $200 with This Bundle
              </p>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-3">
                Engineered With Purpose. Designed With Pride.
              </h3>
              <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
                The Phoenix Premier Kit isn't just a flagpole—it's a statement of quality and patriotism.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#C8A55C]" />
                    </div>
                    <h4 className="text-lg font-bold text-[#0B1C2C] mb-2">{feature.title}</h4>
                    <p className="text-sm text-[#0B1C2C]/70 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Trust Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all">
              <div className="w-16 h-16 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#C8A55C]" />
              </div>
              <h4 className="text-xl font-bold text-[#0B1C2C] mb-3">Lifetime Warranty</h4>
              <p className="text-[#0B1C2C]/70 leading-relaxed">
                We stand behind our products with a comprehensive lifetime warranty. If anything goes wrong, we'll make
                it right.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all">
              <div className="w-16 h-16 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#C8A55C]" />
              </div>
              <h4 className="text-xl font-bold text-[#0B1C2C] mb-3">Made in America</h4>
              <p className="text-[#0B1C2C]/70 leading-relaxed">
                Proudly manufactured in the USA with premium materials and craftsmanship. Supporting American jobs and
                quality.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all">
              <div className="w-16 h-16 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#C8A55C]" />
              </div>
              <h4 className="text-xl font-bold text-[#0B1C2C] mb-3">2,902+ 5-Star Reviews</h4>
              <p className="text-[#0B1C2C]/70 leading-relaxed">
                Join thousands of satisfied customers who trust Phoenix for their flagpole needs. Rated 4.9/5 stars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
