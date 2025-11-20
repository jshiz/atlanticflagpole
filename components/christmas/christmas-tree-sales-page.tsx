"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getFeaturedHolidayProducts } from "@/app/actions/get-featured-holiday-products"
import type { ShopifyProduct } from "@/lib/shopify"

export function ChristmasTreeSalesPage() {
  const [productKits, setProductKits] = useState<
    Array<{
      shopifyProduct: ShopifyProduct
      price: number
      compareAt: number
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getFeaturedHolidayProducts()
        const kits = products.map((product) => {
          const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
          const compareAt = product.compareAtPriceRange?.minVariantPrice?.amount
            ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
            : price * 1.3

          return {
            shopifyProduct: product,
            price,
            compareAt,
          }
        })

        setProductKits(kits)
        setLoading(false)
      } catch (error) {
        console.error("[v0] ❌ Error fetching Christmas tree products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
    setVideoLoaded(true)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl animate-pulse">🎄</span>
          <p className="text-xl text-[#0B1C2C] mt-4">Loading Christmas Tree Kits...</p>
        </div>
      </div>
    )
  }

  if (productKits.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <span className="text-6xl">🎄</span>
          <h2 className="text-2xl font-bold text-[#0B1C2C] mb-4 mt-4">Products Not Available</h2>
          <p className="text-[#0B1C2C]/70 mb-6">
            We're having trouble loading the Christmas tree products. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Video Background Hero */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {videoLoaded && (
            <iframe
              src="https://www.youtube.com/embed/rCwVnBy1DAY?enablejsapi=1&mute=1&loop=1&playlist=rCwVnBy1DAY&controls=0&rel=0&showinfo=0&autoplay=1"
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; encrypted-media"
              title="Christmas Tree Background"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2C]/80 via-[#0B1C2C]/60 to-[#0B1C2C]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-2 mb-6 shadow-2xl font-bold">
            🎄 Limited Time Holiday Offer
          </Badge>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-balance leading-tight">
            Welcome to a Brighter,
            <br />
            <span className="text-[#C8A55C]">Merrier Christmas!</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Transform your flagpole into a stunning Christmas display with our{" "}
            <span className="font-bold text-[#C8A55C]">Patriot Glo</span> LED Christmas Tree kits. Easy setup,
            energy-efficient, and built to last.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-6 shadow-2xl"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              🎁 Shop Christmas Tree Kits
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-xl px-8 py-6"
              onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More →
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-[#0B1C2C] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-[#C8A55C]">🛡️</span>
              <span className="font-semibold">42-Month Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-[#C8A55C]">⚡</span>
              <span className="font-semibold">Energy Efficient LEDs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-[#C8A55C]">⏱️</span>
              <span className="font-semibold">Minutes to Setup</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl text-[#C8A55C]">🏆</span>
              <span className="font-semibold">Made in USA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section with Photo */}
      <section id="benefits" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/image.png"
                alt="Beautiful Christmas tree display on flagpole in snowy yard"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-6">
                Why Choose a Flagpole Christmas Tree?
              </h2>
              <p className="text-xl text-[#0B1C2C]/80 mb-8 leading-relaxed">
                Create unforgettable holiday memories with our heartwarming Christmas delightful LED Flagpole Christmas
                Trees! Transform your outdoor space into a winter wonderland that will be the talk of the neighborhood.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: "⏱️",
                    title: "Easy to Set Up",
                    description: "Giving you and your family more quality time together during the holidays",
                  },
                  {
                    icon: "⚡",
                    title: "Energy-Efficient",
                    description: "Save money on your electricity bill while creating a stunning display",
                  },
                  {
                    icon: "⭐",
                    title: "Stylish Design",
                    description: "Great attention to detail and durability for years of enjoyment",
                  },
                  {
                    icon: "🎄",
                    title: "Year-Round Value",
                    description: "Take advantage of your flagpole in the winter season",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#0B1C2C] mb-1">{benefit.title}</h3>
                      <p className="text-[#0B1C2C]/70">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-[#F5F3EF] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
              Choose Your Perfect Christmas Tree Kit
            </h2>
            <p className="text-xl text-[#0B1C2C]/70 max-w-3xl mx-auto">
              Select from our premium Patriot Glo LED kits. Each kit includes everything you need for a spectacular
              holiday display.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {productKits.map((kit) => {
              const kitDiscount = Math.round(((kit.compareAt - kit.price) / kit.compareAt) * 100)
              const kitSavings = kit.compareAt - kit.price
              const product = kit.shopifyProduct
              const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url
              const shortDescription = product.description
                ? product.description.replace(/<[^>]*>/g, "").substring(0, 120) + "..."
                : "Premium quality Christmas tree lights for your flagpole."

              return (
                <Card
                  key={product.id}
                  className="relative overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <Link href={`/products/${product.handle}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {imageUrl ? (
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={product.featuredImage?.altText || product.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-6xl">🎄</span>
                        </div>
                      )}
                      {kitDiscount > 0 && (
                        <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg text-base px-4 py-2">
                          SAVE {kitDiscount}%
                        </Badge>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/products/${product.handle}`}>
                      <h3 className="text-xl font-bold text-[#0B1C2C] mb-3 hover:text-[#C8A55C] transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-[#0B1C2C]">${kit.price.toFixed(2)}</span>
                      {kitDiscount > 0 && (
                        <span className="text-lg text-gray-500 line-through">${kit.compareAt.toFixed(2)}</span>
                      )}
                    </div>

                    {kitSavings > 0 && (
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center font-bold mb-4">
                        Save ${kitSavings.toFixed(2)}
                      </div>
                    )}

                    <p className="text-sm text-[#0B1C2C]/70 mb-6 line-clamp-3">{shortDescription}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                        <span className="text-green-600">✓</span>
                        <span>No tools required</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                        <span className="text-green-600">✓</span>
                        <span>Weather-resistant design</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                        <span className="text-green-600">✓</span>
                        <span>42-month warranty included</span>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6">
                      🛒 Add to Cart - ${kit.price.toFixed(2)}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid with Photos */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
              The Ultimate Holiday Statement
            </h2>
            <p className="text-xl text-[#0B1C2C]/70 max-w-3xl mx-auto">
              For a truly spectacular display that captures the magic of the season
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src="/images/image.png"
                  alt="Close-up of LED Christmas tree lights detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">Energy-Efficient LED Lights</h3>
                <p className="text-[#0B1C2C]/70">
                  Light up your holiday season without lighting up your electricity bill. Our energy-efficient LEDs
                  sparkle brilliantly while being kind on your wallet and the environment.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src="/images/image.png"
                  alt="Flagpole Christmas tree installation detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
                  ⏱️
                </div>
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">Insta-Tree: Easy Setup</h3>
                <p className="text-[#0B1C2C]/70">
                  No tools required! Say goodbye to holiday hassles. Set up your stunning holiday centerpiece in just
                  minutes. More time for hot cocoa and family moments.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src="/images/image.png"
                  alt="Beautiful Christmas tree display in winter landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">42-Month Warranty</h3>
                <p className="text-[#0B1C2C]/70">
                  We're not just offering a Christmas tree; we're promising peace of mind. Your investment is protected,
                  ensuring seasons of joy and wonder year after year.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Gallery */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F5F3EF] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
              See What Customers Are Saying
            </h2>
            <p className="text-xl text-[#0B1C2C]/70 max-w-3xl mx-auto">
              Join thousands of happy customers who have transformed their holidays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/image.png"
                  alt="Multicolor LED Christmas tree display in customer yard"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-[#0B1C2C] italic mb-3">
                  "The multicolor option is absolutely stunning! Our neighbors stop by every night to admire it. Setup
                  was incredibly easy - took us less than 15 minutes!"
                </p>
                <p className="text-sm text-[#0B1C2C]/70">- Sarah M., Colorado</p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/image.png"
                  alt="Warm white LED Christmas tree with dog in snow"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-[#0B1C2C] italic mb-3">
                  "Best investment we've made for holiday decorations. The warm white lights create such a cozy
                  atmosphere. Even our dog loves it!"
                </p>
                <p className="text-sm text-[#0B1C2C]/70">- Mike T., Montana</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Make This Your Brightest Christmas Yet</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on creating unforgettable holiday memories. Order your Patriot Glo LED Christmas Tree Kit
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-xl px-8 py-6 font-bold"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              ❤️ Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 text-xl px-8 py-6 font-bold bg-transparent"
              asChild
            >
              <Link href="/pages/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
