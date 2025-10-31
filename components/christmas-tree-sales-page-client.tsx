"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Zap, Shield, Snowflake, Package, Wrench, Sparkles, Truck, Award, ChevronRight } from "lucide-react"
import type { ShopifyProduct } from "@/lib/shopify/types"

const features = [
  {
    icon: Zap,
    title: "Energy-Efficient LED Lights",
    description: "Save on electricity while creating a dazzling display. Eco-friendly and cost-effective.",
  },
  {
    icon: Sparkles,
    title: "Patented Unique Design",
    description: "Stand out with our exclusive design. Multiple height options and light variants available.",
  },
  {
    icon: Shield,
    title: "42-Month Warranty",
    description: "High-quality, durable construction backed by our comprehensive warranty coverage.",
  },
  {
    icon: Snowflake,
    title: "Weather-Resistant",
    description: "Rain, snow, or shine - your holiday cheer will not be dampened. Built for all conditions.",
  },
  {
    icon: Package,
    title: "Compact Storage",
    description: "Easy to pack away after the season. Save space and keep your tree safe for next year.",
  },
  {
    icon: Wrench,
    title: "No Tools Required",
    description: "Effortless setup and disassembly. Perfect for everyone, especially the DIY-challenged!",
  },
]

const benefits = [
  "Transform your flagpole into a stunning Christmas display",
  "Easy setup - spend less time fussing, more time with family",
  "Energy-efficient LEDs reduce electricity costs",
  "Weather-resistant for reliable outdoor performance",
  "Compact storage for convenient off-season storage",
  "Made in USA with premium materials",
  "Free shipping on all orders",
  "30-day money-back guarantee",
]

interface ChristmasTreeSalesPageClientProps {
  products: ShopifyProduct[]
}

export function ChristmasTreeSalesPageClient({ products }: ChristmasTreeSalesPageClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const benefitsImage = products[0]?.featuredImage?.url || "/placeholder.svg?height=800&width=800"
  const storageImage =
    products[1]?.featuredImage?.url || products[0]?.featuredImage?.url || "/placeholder.svg?height=800&width=800"

  useEffect(() => {
    console.log("[v0] ChristmasTreeSalesPage - products received:", products.length)
    console.log(
      "[v0] ChristmasTreeSalesPage - product handles:",
      products.map((p) => p.handle),
    )
  }, [products])

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0])
      console.log("[v0] ChristmasTreeSalesPage - selected product:", products[0].title)
    }
  }, [products, selectedProduct])

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Christmas Tree Products...</h2>
          <p className="text-muted-foreground">Please wait while we fetch our holiday lighting kits.</p>
        </div>
      </div>
    )
  }

  if (!selectedProduct) {
    return <div>Loading...</div>
  }

  const getPrice = (product: ShopifyProduct) => {
    return Number.parseFloat(product.priceRange.minVariantPrice.amount)
  }

  const getCompareAtPrice = (product: ShopifyProduct) => {
    const compareAt = product.compareAtPriceRange?.minVariantPrice?.amount
    return compareAt ? Number.parseFloat(compareAt) : null
  }

  const selectedPrice = getPrice(selectedProduct)
  const selectedCompareAt = getCompareAtPrice(selectedProduct)
  const discountPercentage =
    selectedCompareAt && selectedCompareAt > selectedPrice
      ? Math.round(((selectedCompareAt - selectedPrice) / selectedCompareAt) * 100)
      : 0

  return (
    <div className="relative">
      {/* Hero Section with Video Background */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {videoLoaded ? (
            <iframe
              src="https://www.youtube.com/embed/rCwVnBy1DAY?enablejsapi=1&mute=1&loop=1&playlist=rCwVnBy1DAY&controls=0&rel=0&showinfo=0&autoplay=1"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ transform: "scale(1.5)" }}
              allow="autoplay; encrypted-media"
              title="Christmas Tree Background"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-green-900 to-red-900 animate-pulse" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            🎄 Welcome to a Brighter, Merrier Christmas! 🌟
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Transform Your Flagpole Into a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-red-400">
              Magical Christmas Tree
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            No more tangled lights or complicated setups! Easy installation, energy-efficient LEDs, and a 42-month
            warranty. Your ticket to a stress-free, delightful holiday season.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-8 font-bold shadow-2xl"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              🎁 Shop Now
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 text-xl px-12 py-8 font-bold"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <div className="flex items-center gap-2 text-white">
              <Truck className="w-6 h-6" />
              <span className="font-semibold">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-6 h-6" />
              <span className="font-semibold">42-Month Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="w-6 h-6" />
              <span className="font-semibold">Made in USA</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* Product Selection Section */}
      <section id="products" className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-2 mb-4">
              Choose Your Perfect Tree
            </Badge>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
              Pick the Right Size for Your Flagpole
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              All our kits feature energy-efficient LEDs, weather-resistant construction, and our industry-leading
              42-month warranty
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => {
              const price = getPrice(product)
              const compareAt = getCompareAtPrice(product)
              const hasDiscount = compareAt && compareAt > price
              const savings = hasDiscount ? compareAt - price : 0
              const discountPercent = hasDiscount ? Math.round((savings / compareAt) * 100) : 0
              const isPopular = product.handle.includes("patriot-glo-led-flagpole-christmas-tree-kit-20-25")

              return (
                <Card
                  key={product.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                    selectedProduct.id === product.id
                      ? "ring-4 ring-green-600 scale-105"
                      : "hover:scale-102 opacity-90 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {isPopular && (
                    <Badge className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white">
                      Most Popular
                    </Badge>
                  )}

                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.featuredImage?.url || "/placeholder.svg?height=600&width=600"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                      {hasDiscount && compareAt && (
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground line-through">${compareAt.toFixed(2)}</span>
                          <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs w-fit font-bold">
                            Save ${savings.toFixed(2)}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <Separator className="my-4" />

                    <ul className="space-y-2 mb-6">
                      {product.tags.slice(0, 4).map((tag, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="capitalize">{tag.replace(/-/g, " ")}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={`/products/${product.handle}`}>
                      <Button
                        className={`w-full ${
                          selectedProduct.id === product.id
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        View Details
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Selected Product CTA */}
          <Card className="p-8 bg-gradient-to-r from-red-600 to-green-600 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Selected: {selectedProduct.title} - ${selectedPrice.toFixed(2)}
            </h3>
            <p className="text-xl mb-6 opacity-90">
              {discountPercentage > 0 && `Save ${discountPercentage}% today! `}Limited time holiday offer.
            </p>
            <Link href={`/products/${selectedProduct.handle}`}>
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-xl px-12 py-6 font-bold">
                🎄 Get This Tree Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-2 mb-4">
              Why Choose Our LED Christmas Trees?
            </Badge>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
              Features That Make the Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-2 mb-4">
                The Atlantic Flagpole Advantage
              </Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
                More Than Just a Christmas Tree
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                When you choose Atlantic Flagpole, you're choosing quality, reliability, and peace of mind. Here's what
                sets us apart:
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-8 bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-6">
                Shop Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={benefitsImage || "/placeholder.svg"}
                alt="Christmas Tree on Flagpole"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Weather Resistant Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1200&width=1200')] bg-repeat" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Snowflake className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
              Built to Withstand Mother Nature
            </h2>
            <p className="text-2xl mb-8 opacity-90 leading-relaxed">
              Rain, snow, sleet, or shine - your Christmas tree will keep shining bright. Our weather-resistant design
              ensures your holiday display looks perfect all season long.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">-40°F</div>
                <div className="text-xl opacity-80">Cold Resistant</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">IP65</div>
                <div className="text-xl opacity-80">Waterproof Rating</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-xl opacity-80">Outdoor Safe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image src={storageImage || "/placeholder.svg"} alt="Compact Storage" fill className="object-cover" />
            </div>

            <div className="order-1 lg:order-2">
              <Package className="w-16 h-16 text-green-600 mb-6" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
                Easy Storage, Year After Year
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                No more tangled messes or bulky storage containers. Our LED Christmas tree kits pack away neatly into
                compact storage, making it easy to keep your decorations safe and organized for next season.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg">Compact design saves valuable storage space</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg">Durable materials protect lights during off-season</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg">Quick setup next year - no untangling required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1200&width=1200')] bg-repeat" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
              Ready to Transform Your Holiday Display?
            </h2>
            <p className="text-2xl mb-8 opacity-90 leading-relaxed">
              Join thousands of happy customers who have made their holidays brighter with Atlantic Flagpole's LED
              Christmas trees. Order now and get free shipping plus our 42-month warranty!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href={`/products/${selectedProduct.handle}`}>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-xl px-12 py-8 font-bold">
                  🎄 Shop Now - Free Shipping
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6" />
                <span className="font-semibold">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                <span className="font-semibold">42-Month Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                <span className="font-semibold">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
