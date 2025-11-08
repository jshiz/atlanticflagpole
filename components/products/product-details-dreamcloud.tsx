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
              {isPremierBundle && (
                <Badge className="mb-4 bg-gradient-to-r from-[#C8A55C] to-[#a88947] text-white hover:from-[#a88947] hover:to-[#C8A55C] px-4 py-2 text-base font-bold shadow-lg">
                  <Package className="w-5 h-5 mr-2" />
                  Premier Kit - Everything Included
                </Badge>
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

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gradient-to-br from-accent/50 to-accent rounded-2xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-md">
                    <Shield className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Lifetime Warranty</p>
                    <p className="text-xs text-muted-foreground">Forever guarantee</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-md">
                    <Truck className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">All orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Made in USA</p>
                    <p className="text-xs text-muted-foreground">Premium quality</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-md">
                    <Clock className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">365-Day Trial</p>
                    <p className="text-xs text-muted-foreground">Risk-free</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Variant Selector */}
            {variants.length > 1 && (
              <div className="space-y-4 p-6 bg-muted rounded-2xl">
                <label className="text-lg font-bold text-foreground">Choose Your Size:</label>
                <div className="grid grid-cols-1 gap-3">
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

      {/* Features Section - Alternating Layout */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Why Choose Atlantic Flagpole
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium quality, unmatched durability, and American craftsmanship
            </p>
          </div>

          {/* Feature 1 - Image Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/placeholder.svg?height=600&width=800" alt="Premium Quality" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Installs in 30 Minutes</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                No special tools or expertise required. Our innovative design makes installation quick and easy for
                anyone. Just follow our simple step-by-step guide and you'll have your flagpole standing tall in no
                time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Minimal tools needed - just basic household items</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Clear instructions with photos and videos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Free installation support if you need help</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 - Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6 lg:order-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center">
                <Medal className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Military-Grade Aerospace Aluminum
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Forged from the same aluminum used in aircraft and military applications. This isn't your typical
                hardware store flagpole - it's engineered to withstand decades of harsh weather without rattling,
                rusting, or failing.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Unmatched strength and durability</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">No rattles, no rust, no maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Powder-coated finish that lasts forever</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl lg:order-2">
              <Image src="/placeholder.svg?height=600&width=800" alt="Military Grade" fill className="object-cover" />
            </div>
          </div>

          {/* Feature 3 - Image Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/placeholder.svg?height=600&width=800" alt="Wind Tested" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Wind-Tested to 100 MPH</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Engineered and tested to withstand hurricane-force winds. While other flagpoles bend, break, or blow
                away, Atlantic Flagpoles stand tall through the worst storms Mother Nature can throw at them.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Tested in real-world storm conditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Flexible design absorbs wind stress</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2e7d32] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Secure foundation system prevents tipping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] py-16 md:py-24 text-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Built to Last a Lifetime</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Every detail engineered for everyday patriots who demand the best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Easy Install</h3>
              <p className="text-white/80 leading-relaxed">
                30-minute setup with minimal tools. No special equipment needed.
              </p>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-6">
                <Medal className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Military Grade</h3>
              <p className="text-white/80 leading-relaxed">Aerospace aluminum forged to military specifications.</p>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Storm Proof</h3>
              <p className="text-white/80 leading-relaxed">
                Wind-tested to 100 MPH. Stands tall through serious storms.
              </p>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Lifetime Warranty</h3>
              <p className="text-white/80 leading-relaxed">
                One flagpole. For life. We stand behind our products forever.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent/50 to-accent">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Unbeatable Guarantee</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're so confident you'll love your flagpole, we back it with the industry's best guarantees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Lifetime Structural Warranty</h3>
              <p className="text-muted-foreground leading-relaxed">
                If your flagpole ever fails due to manufacturing defects, we'll replace it free of charge. No time
                limit. No questions asked.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">365-Day Home Trial</h3>
              <p className="text-muted-foreground leading-relaxed">
                Try your flagpole at home for a full year. If you're not completely satisfied for any reason, return it
                for a full refund.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Free Shipping & Returns</h3>
              <p className="text-muted-foreground leading-relaxed">
                We cover all shipping costs - both ways. If you need to return your flagpole, we'll even pay for the
                return shipping.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about your flagpole</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-card-foreground pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`w-6 h-6 text-[#C8A55C] flex-shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaq === index && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-24 bg-muted">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white">
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
