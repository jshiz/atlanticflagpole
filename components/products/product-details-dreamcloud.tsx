"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { ExpressCheckoutButtons } from "@/components/cart/express-checkout-buttons"
import type { ShopifyProduct } from "@/lib/shopify"
import type { BundleData } from "@/lib/shopify/bundles"
import { toNodes } from "@/lib/connection"
import { Check, Shield, Truck, Award, Package, Wrench, Wind, Medal, ChevronDown, Star, Clock, Tag } from "lucide-react"
import { JudgeMeBadge, JudgeMeReviewWidget } from "./judgeme-widgets"
import { useSearchParams } from "next/navigation"
import { CompanyStorySection } from "./company-story-section"
import { SmartUpsellCTA } from "./smart-upsell-cta"
import { SpotlightProducts } from "./spotlight-products"
import { getBundleConfig } from "@/lib/bundles/bundle-config"

interface ProductDetailsDreamCloudProps {
  product: ShopifyProduct
  relatedProducts?: ShopifyProduct[]
  bundleProducts?: ShopifyProduct[]
  bundleData?: BundleData
  reviewsData?: any
}

export function ProductDetailsDreamCloud({
  product,
  relatedProducts = [],
  bundleProducts = [],
  bundleData,
  reviewsData,
}: ProductDetailsDreamCloudProps) {
  const searchParams = useSearchParams()
  const variantParam = searchParams.get("variant")
  const discountParam = searchParams.get("discount")

  const images = toNodes(product.images)
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [isSticky, setIsSticky] = useState(false)

  const variants = toNodes(product.variants)

  const getInitialVariant = () => {
    if (variantParam) {
      const matchingVariant = variants.find((v) => v.title.includes(`${variantParam}'`))
      if (matchingVariant) return matchingVariant
    }
    return variants[0]
  }

  const [selectedVariant, setSelectedVariant] = useState(getInitialVariant())

  useEffect(() => {
    if (variantParam) {
      const matchingVariant = variants.find((v) => v.title.includes(`${variantParam}'`))
      if (matchingVariant) {
        setSelectedVariant(matchingVariant)
      }
    }
  }, [variantParam, variants])

  const price = selectedVariant ? Number.parseFloat(selectedVariant.price.amount) : 0
  const compareAtPrice = selectedVariant?.compareAtPrice
    ? Number.parseFloat(selectedVariant.compareAtPrice.amount)
    : null

  const hasDiscount = compareAtPrice && compareAtPrice > price
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0

  const isPremierBundle = bundleData?.includesPremier || false

  const premierKitConfig = getBundleConfig(product.handle)
  const hasPremierKit = premierKitConfig && premierKitConfig.components.length > 0
  const premierKitValue = hasPremierKit
    ? premierKitConfig.components.reduce((sum, c) => sum + (c.retailPrice || 0) * c.quantity, 0)
    : 0

  const displayTitle = product.title.length > 60 ? product.title.substring(0, 57) + "..." : product.title

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const faqs = [
    {
      question: "How long does installation take?",
      answer:
        "Most customers complete installation in 30-45 minutes with basic tools. Our step-by-step guide makes it easy for anyone to install.",
    },
    {
      question: "What's included in the kit?",
      answer: isPremierBundle
        ? `The Premier Kit includes everything you need: ${bundleData?.components.map((c) => c.title).join(", ")}. No additional purchases required.`
        : "This kit includes the flagpole, mounting hardware, and installation instructions. Additional accessories can be added separately.",
    },
    {
      question: "What is your warranty policy?",
      answer:
        "We offer a lifetime structural warranty on all flagpoles. If anything goes wrong due to manufacturing defects, we'll replace it free of charge.",
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free shipping on all orders within the continental United States.",
    },
    {
      question: "Can I return it if I'm not satisfied?",
      answer: "We offer a 365-day home trial. If you're not completely satisfied, return it for a full refund.",
    },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [showDiscountBadge, setShowDiscountBadge] = useState(!!discountParam)

  return (
    <div className="bg-background">
      {/* Hero Section with Product Image and Sticky Selector */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {showDiscountBadge && discountParam && (
          <div className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg animate-in slide-in-from-top duration-500">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Discount Code Applied!</p>
                  <p className="text-sm text-white/90">
                    Code: <span className="font-mono font-bold">{discountParam}</span> will be applied at checkout
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDiscountBadge(false)}
                className="text-white hover:bg-white/20"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-xl">
              {selectedImage ? (
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-gradient-to-br from-destructive to-destructive/90 text-destructive-foreground font-bold text-xl px-8 py-3 rounded-full shadow-2xl">
                    {discountPercentage}% OFF
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-3 transition-all ${
                      selectedImage?.url === image.url
                        ? "border-[#C8A55C] ring-2 ring-[#C8A55C] ring-offset-2"
                        : "border-border hover:border-muted-foreground"
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

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              {hasPremierKit && (
                <div className="mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white rounded-2xl p-5 shadow-2xl border-2 border-green-400 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Package className="w-9 h-9 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold mb-1">🎉 Premier Kit Included FREE!</p>
                      <p className="text-base opacity-95">
                        {premierKitConfig.components.length} premium items • ${premierKitValue.toFixed(2)} value
                      </p>
                    </div>
                    <div className="text-3xl font-bold">FREE</div>
                  </div>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance leading-tight">
                <span className="md:hidden">{displayTitle}</span>
                <span className="hidden md:block">{product.title}</span>
              </h1>

              <div className="mb-6">
                <JudgeMeBadge productHandle={product.handle} />
              </div>

              <div className="flex items-baseline gap-4 flex-wrap mb-6">
                <span className="text-5xl font-bold text-foreground">${price.toFixed(2)}</span>
                {hasDiscount && compareAtPrice && (
                  <>
                    <span className="text-3xl text-muted-foreground line-through font-semibold">
                      ${compareAtPrice.toFixed(2)}
                    </span>
                    <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg px-4 py-2 font-bold shadow-lg">
                      Save ${(compareAtPrice - price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-accent/50 to-accent rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#C8A55C]" />
                  <span className="text-sm font-semibold">Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#C8A55C]" />
                  <span className="text-sm font-semibold">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C8A55C]" />
                  <span className="text-sm font-semibold">Made in USA</span>
                </div>
              </div>
            </div>

            {variants.length > 1 && (
              <div className="space-y-4 p-5 bg-muted rounded-2xl border border-border">
                <label className="text-lg font-bold text-foreground">Choose Your Size:</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {variants.map((variant) => {
                    const variantPrice = Number.parseFloat(variant.price.amount)
                    const variantCompareAt = variant.compareAtPrice
                      ? Number.parseFloat(variant.compareAtPrice.amount)
                      : null
                    const variantDiscount =
                      variantCompareAt && variantCompareAt > variantPrice
                        ? Math.round(((variantCompareAt - variantPrice) / variantCompareAt) * 100)
                        : 0

                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                          selectedVariant?.id === variant.id
                            ? "border-[#C8A55C] bg-background shadow-lg ring-2 ring-[#C8A55C] ring-offset-2"
                            : "border-border bg-background hover:border-muted-foreground hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-foreground text-lg">{variant.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-2xl font-bold text-foreground">${variantPrice.toFixed(2)}</span>
                              {variantDiscount > 0 && variantCompareAt && (
                                <>
                                  <span className="text-lg text-muted-foreground line-through">
                                    ${variantCompareAt.toFixed(2)}
                                  </span>
                                  <Badge className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5">
                                    {variantDiscount}% OFF
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          {selectedVariant?.id === variant.id && (
                            <div className="w-8 h-8 rounded-full bg-[#C8A55C] flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            {selectedVariant && (
              <div className="space-y-4">
                <AddToCartButton
                  variantId={selectedVariant.id}
                  availableForSale={selectedVariant.availableForSale}
                  className="w-full py-7 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-[#C8A55C] to-[#a88947] hover:from-[#a88947] hover:to-[#C8A55C]"
                />

                {selectedVariant.availableForSale && (
                  <ExpressCheckoutButtons variantId={selectedVariant.id} quantity={1} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {hasPremierKit && premierKitConfig && (
        <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-16 md:py-24 border-y-4 border-green-400">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-3 rounded-full mb-6 shadow-xl">
                <Package className="w-6 h-6" />
                <span className="text-lg font-bold">Complete Premier Kit</span>
                <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">FREE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Everything You Need, Included Free
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                ${premierKitValue.toFixed(2)} value of premium components - all in one complete package
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {premierKitConfig.components.map((component, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white hover:shadow-2xl transition-all border-2 border-green-300 hover:border-green-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-card-foreground text-lg mb-2">{component.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        {component.quantity > 1 && (
                          <Badge className="bg-green-600 text-white text-sm">Qty: {component.quantity}</Badge>
                        )}
                        {component.retailPrice && (
                          <span className="text-sm font-bold text-green-700">
                            ${(component.retailPrice * component.quantity).toFixed(2)} value
                          </span>
                        )}
                      </div>
                      {component.notes && (
                        <p className="text-sm text-muted-foreground leading-relaxed">{component.notes}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-white border-2 border-green-400 rounded-2xl px-8 py-5 shadow-xl">
                <Package className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="text-2xl font-bold text-green-900">Complete Kit Value</p>
                  <p className="text-sm text-gray-600">Everything ships together - no extra charges</p>
                </div>
                <div className="text-3xl font-bold text-green-600">${premierKitValue.toFixed(2)}</div>
                <div className="text-4xl font-bold text-green-600">FREE</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Company Story Section */}
      <CompanyStorySection />

      {/* Smart Upsell Section */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
        <SmartUpsellCTA
          currentProduct={{
            handle: product.handle,
            title: product.title,
            productType: product.productType,
          }}
        />
      </section>

      {/* Spotlight Products Section */}
      <SpotlightProducts />

      {/* Sticky Product Selector */}
      {isSticky && selectedVariant && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-border shadow-2xl py-4 px-4 md:px-8 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {selectedImage && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hidden md:block">
                  <Image
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-bold text-foreground text-lg line-clamp-1">{product.title}</p>
                <p className="text-2xl font-bold text-foreground">${price.toFixed(2)}</p>
              </div>
            </div>
            <AddToCartButton
              variantId={selectedVariant.id}
              availableForSale={selectedVariant.availableForSale}
              className="px-8 py-4 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-[#C8A55C] to-[#a88947] hover:from-[#a88947] hover:to-[#C8A55C]"
            />
          </div>
        </div>
      )}

      {/* What's Inside Section */}
      {isPremierBundle && bundleData && (
        <section className="bg-gradient-to-br from-muted to-accent py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#C8A55C] text-white px-6 py-2 text-lg font-bold">Complete Kit</Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                What's Inside Your Premier Kit
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need for a professional installation, all in one package
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundleData.components.map((component, index) => (
                <Card key={index} className="p-6 bg-card hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-card-foreground text-lg mb-2">{component.title}</h3>
                      {component.quantity > 1 && (
                        <Badge className="mb-2 bg-accent text-accent-foreground text-sm">
                          Quantity: {component.quantity}
                        </Badge>
                      )}
                      {component.notes && <p className="text-sm text-muted-foreground">{component.notes}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Why Atlantic Flagpole Stands Above the Rest
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium American craftsmanship meets unmatched durability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-2xl transition-shadow bg-card">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/products/flagpole-installation-easy.jpg"
                  alt="Easy 30-Minute Installation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Installs in 30 Minutes</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No special tools or expertise required. Follow our simple guide and you're done.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Minimal tools needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Clear photo instructions</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-2xl transition-shadow bg-card">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/products/flagpole-aluminum-quality.jpg"
                  alt="Military-Grade Aerospace Aluminum"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-4">
                <Medal className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Military-Grade Aluminum</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Forged from aerospace aluminum used in aircraft. Built to last decades.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">No rattles, no rust</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Powder-coated finish</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-2xl transition-shadow bg-card">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/products/flagpole-wind-test.jpg"
                  alt="Wind-Tested to 100 MPH"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-4">
                <Wind className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Wind-Tested to 100 MPH</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Engineered to withstand hurricane-force winds. Stands tall through storms.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Real-world tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Secure foundation</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-br from-accent/30 to-accent/10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Risk-Free Guarantee</h2>
            <p className="text-lg text-muted-foreground">We back every product with the industry's best protection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center bg-card hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">Lifetime Warranty</h3>
              <p className="text-sm text-muted-foreground">Free replacement if manufacturing defects occur</p>
            </Card>

            <Card className="p-6 text-center bg-card hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">365-Day Trial</h3>
              <p className="text-sm text-muted-foreground">Full year to decide - full refund if unsatisfied</p>
            </Card>

            <Card className="p-6 text-center bg-card hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">Both ways - we cover all shipping costs</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Common Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.slice(0, 3).map((faq, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-card-foreground pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`w-6 h-6 text-[#C8A55C] flex-shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaq === index && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-20 bg-muted">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-[#C8A55C] text-[#C8A55C]" />
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Loved by Thousands of Patriots
            </h2>
            <p className="text-xl text-muted-foreground">See what our customers have to say</p>
          </div>

          <JudgeMeReviewWidget productHandle={product.handle} productId={product.id} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Display Your Pride?</h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust Atlantic Flagpole for their flag display needs
          </p>
          {selectedVariant && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AddToCartButton
                variantId={selectedVariant.id}
                availableForSale={selectedVariant.availableForSale}
                className="px-12 py-6 text-xl font-bold rounded-xl shadow-2xl bg-gradient-to-r from-[#C8A55C] to-[#a88947] hover:from-[#a88947] hover:to-[#C8A55C] w-full sm:w-auto"
              />
              <Button
                variant="outline"
                size="sm"
                className="px-12 py-6 text-xl font-bold rounded-xl border-2 border-white text-white hover:bg-white hover:text-[#0B1C2C] w-full sm:w-auto bg-transparent"
                onClick={() => {
                  const reviewsSection = document.getElementById("reviews")
                  reviewsSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Read Reviews
              </Button>
            </div>
          )}
          <p className="text-sm text-white/60 mt-6">Free shipping • 365-day trial • Lifetime warranty</p>
        </div>
      </section>
    </div>
  )
}
