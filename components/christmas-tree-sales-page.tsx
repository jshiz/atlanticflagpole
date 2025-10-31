"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  Zap,
  Shield,
  Snowflake,
  Package,
  Wrench,
  Star,
  Sparkles,
  Truck,
  Award,
  ChevronRight,
} from "lucide-react"

const products = [
  {
    id: "patriot-glo-20-25",
    name: "Patriot Glo 20-25'",
    handle: "patriot-glo-led-flagpole-christmas-tree-kit-20-25",
    description: "Perfect for standard residential flagpoles",
    price: 299.99,
    compareAt: 399.99,
    image: "/placeholder.svg?height=600&width=600",
    features: ["4000 LEDs", "20-25' poles", "Energy efficient", "42-month warranty"],
    popular: true,
  },
  {
    id: "patriot-glo-30-43",
    name: "Patriot Glo 30-43'",
    handle: "patriot-glo-4000-led-flagpole-christmas-tree-30-43",
    description: "For larger commercial and residential poles",
    price: 449.99,
    compareAt: 599.99,
    image: "/placeholder.svg?height=600&width=600",
    features: ["6000 LEDs", "30-43' poles", "Commercial grade", "42-month warranty"],
    popular: false,
  },
  {
    id: "phoenix",
    name: "Phoenix Light Kit",
    handle: "phoenix-flagpole-christmas-tree-light-kit-for-20-25-poles",
    description: "Premium option with advanced features",
    price: 349.99,
    compareAt: 449.99,
    image: "/placeholder.svg?height=600&width=600",
    features: ["5000 LEDs", "20-25' poles", "Premium quality", "42-month warranty"],
    popular: false,
  },
]

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

export function ChristmasTreeSalesPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Preload video
    const timer = setTimeout(() => setVideoLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const discountPercentage = Math.round(
    ((selectedProduct.compareAt - selectedProduct.price) / selectedProduct.compareAt) * 100,
  )

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
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  selectedProduct.id === product.id
                    ? "ring-4 ring-green-600 scale-105"
                    : "hover:scale-102 opacity-90 hover:opacity-100"
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                {product.popular && (
                  <Badge className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white">
                    Most Popular
                  </Badge>
                )}

                <div className="relative aspect-square overflow-hidden">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold">${product.price}</span>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground line-through">${product.compareAt}</span>
                      <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs w-fit font-bold">
                        Save ${(product.compareAt - product.price).toFixed(2)}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
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
            ))}
          </div>

          {/* Selected Product CTA */}
          <Card className="p-8 bg-gradient-to-r from-red-600 to-green-600 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Selected: {selectedProduct.name} - ${selectedProduct.price}
            </h3>
            <p className="text-xl mb-6 opacity-90">Save {discountPercentage}% today! Limited time holiday offer.</p>
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
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">🎉 Where Magic Meets Convenience! 🎅</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your Christmas with ease! Spend less time fussing and more time creating precious memories with
              loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
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
              <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-2 mb-6">
                💡 Light Up Your Festivities
              </Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Unique Glow for a Unique You! 🌈</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stand out this holiday season with our patented, unique design. Why settle for ordinary when you can
                have extraordinary? Choose from multiple height options, light variants, and colors to tailor your
                Christmas display to your unique style.
              </p>

              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-lg leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white text-xl px-12 py-6 font-bold"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              >
                Choose Your Tree
                <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </div>

            <div className="relative">
              <Card className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Christmas tree on flagpole"
                  fill
                  className="object-cover"
                />
              </Card>
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-8 rounded-lg shadow-2xl">
                <div className="text-5xl font-bold mb-2">{discountPercentage}%</div>
                <div className="text-xl font-semibold">OFF Today!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Resistant Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-repeat" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Snowflake className="w-20 h-20 mx-auto mb-6 animate-spin" style={{ animationDuration: "10s" }} />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">🌨️ Let It Snow, Let It Glow! ❄️</h2>
            <p className="text-2xl mb-8 leading-relaxed">
              No matter the weather outside, our weather-resistant design ensures your Christmas spirit shines bright.
              Rain, snow, or shine, your holiday cheer will not be dampened!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold mb-2">IP65</div>
                <div className="text-lg">Waterproof Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold mb-2">-40°F</div>
                <div className="text-lg">Cold Resistant</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-lg">Outdoor Safe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-20 h-20 mx-auto mb-6 text-green-600" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">📦 Store with Ease, Enjoy with Pleasure!</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Once the holiday season winds down, our compact storage feature makes packing away as joyful as setting
              up. Save space and keep your tree safe, ready for its grand return next year.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8">
                <Wrench className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold mb-4">✨ Effortless Setup</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No tools required for assembly! Our tree is a gift of convenience, perfect for everyone, especially
                  the DIY-challenged!
                </p>
              </Card>
              <Card className="p-8">
                <Package className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold mb-4">Compact Storage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Includes storage bag that takes up minimal space. Easy to organize and protect your investment for
                  years to come.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-repeat animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              💖 Your Perfect Christmas is Just a Click Away! ✨
            </h2>
            <p className="text-2xl mb-8 leading-relaxed">
              Let's make this Christmas unforgettable. Add a touch of magic, ease, and joy to your home with our LED
              Flagpole Christmas Tree. It's more than just a decoration; it's a beacon of holiday spirit, bringing
              warmth and happiness to your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-2xl px-16 py-10 font-bold shadow-2xl"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              >
                🎁 Order Now and Light Up Your Holiday Season!
              </Button>
            </div>

            <p className="text-xl opacity-90">Free Shipping • 42-Month Warranty • 30-Day Returns • Made in USA</p>

            <Separator className="my-8 bg-white/30" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <Truck className="w-10 h-10 mb-2" />
                <span className="font-semibold">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-10 h-10 mb-2" />
                <span className="font-semibold">42-Month Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-10 h-10 mb-2" />
                <span className="font-semibold">Made in USA</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-10 h-10 mb-2" />
                <span className="font-semibold">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
