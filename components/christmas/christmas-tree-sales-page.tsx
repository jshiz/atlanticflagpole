"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Zap, Shield, TreePine, Truck, Award, ChevronRight, Gift, Heart } from "lucide-react"
import { getProduct } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/shopify"

const productHandles = [
  "patriot-glo-4000-led-flagpole-christmas-tree-30-43",
  "phoenix-flagpole-christmas-tree-light-kit-for-20-25-poles",
  "american-flag-lights-420led-outdoor-waterproof-red-white-and-blue-led-american-flag-net-light-of-the-united-states-for-memorial-day-independence-day-national-day-veterans-day-decorplug-in",
]

const addOns = [
  {
    id: "timer",
    name: "Smart Timer Controller",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Automatically turn your lights on/off at scheduled times",
  },
  {
    id: "extension",
    name: "25ft Extension Cable",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Extra length for flexible installation options",
  },
  {
    id: "topper",
    name: "LED Star Topper",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Illuminated star topper to crown your display",
  },
]

export function ChristmasTreeSalesPage() {
  const [productKits, setProductKits] = useState<
    Array<{
      shopifyProduct: ShopifyProduct
      price: number
      compareAt: number
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [selectedKit, setSelectedKit] = useState<(typeof productKits)[0] | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      console.log("[v0] 🎄 Fetching specific Christmas tree products from Shopify...")

      try {
        const products = await Promise.all(
          productHandles.map(async (handle) => {
            try {
              return await getProduct(handle)
            } catch (error) {
              console.error(`[v0] Error fetching product ${handle}:`, error)
              return null
            }
          }),
        )

        const validProducts = products.filter((p): p is ShopifyProduct => p !== null)

        console.log(`[v0] ✅ Successfully fetched ${validProducts.length} out of ${productHandles.length} products`)

        const kits = validProducts.map((product) => {
          const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
          const compareAt = product.compareAtPriceRange?.minVariantPrice?.amount
            ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
            : price * 1.2

          console.log(`[v0] ✅ Product: ${product.title}`)
          console.log(`[v0] 💰 Price: $${price}`)
          console.log(`[v0] 🖼️ Image: ${product.featuredImage?.url || "No image"}`)

          return {
            shopifyProduct: product,
            price,
            compareAt,
          }
        })

        setProductKits(kits)
        setSelectedKit(kits[0])
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
          <TreePine className="w-16 h-16 text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl text-[#0B1C2C]">Loading Christmas Tree Kits...</p>
        </div>
      </div>
    )
  }

  if (!selectedKit || productKits.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <TreePine className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0B1C2C] mb-4">Products Not Available</h2>
          <p className="text-[#0B1C2C]/70 mb-6">
            We're having trouble loading the Christmas tree products. Please check the console for details or contact
            support.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const discountPercentage = Math.round(((selectedKit.compareAt - selectedKit.price) / selectedKit.compareAt) * 100)
  const savings = selectedKit.compareAt - selectedKit.price

  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const addOn = addOns.find((a) => a.id === id)
    return sum + (addOn?.price || 0)
  }, 0)

  const totalPrice = selectedKit.price + addOnTotal

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  const getProductImage = (kit: typeof selectedKit) => {
    if (kit.shopifyProduct.featuredImage?.url) {
      console.log(`[v0] 🖼️ Using Shopify image for ${kit.shopifyProduct.title}: ${kit.shopifyProduct.featuredImage.url}`)
      return kit.shopifyProduct.featuredImage.url
    }
    console.log(`[v0] ⚠️ No Shopify image found for ${kit.shopifyProduct.title}, using placeholder`)
    return `/placeholder.svg?height=800&width=800&query=${encodeURIComponent(kit.shopifyProduct.title)}`
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
            🎄 Limited Time Holiday Offer - Save Up To {discountPercentage}%
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
              <Gift className="w-6 h-6 mr-2" />
              Shop Christmas Tree Kits
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-xl px-8 py-6"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-[#0B1C2C] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-[#C8A55C]" />
              <span className="font-semibold">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-8 h-8 text-[#C8A55C]" />
              <span className="font-semibold">Weather Resistant</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="w-8 h-8 text-[#C8A55C]" />
              <span className="font-semibold">Energy Efficient</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-[#C8A55C]" />
              <span className="font-semibold">Made in USA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F5F3EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
              Choose Your Perfect Christmas Tree Kit
            </h2>
            <p className="text-xl text-[#0B1C2C]/70 max-w-3xl mx-auto">
              Select from our premium Patriot Glo LED kits designed for 20ft or 25ft flagpoles. Each kit includes
              everything you need for a spectacular holiday display.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {productKits.map((kit) => {
              const kitDiscount = Math.round(((kit.compareAt - kit.price) / kit.compareAt) * 100)
              const kitSavings = kit.compareAt - kit.price
              const product = kit.shopifyProduct

              return (
                <Card
                  key={product.id}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedKit.shopifyProduct.id === product.id
                      ? "ring-4 ring-[#C8A55C] shadow-2xl scale-105"
                      : "hover:shadow-xl hover:scale-102"
                  }`}
                  onClick={() => setSelectedKit(kit)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                      src={product.featuredImage?.url || "/placeholder.svg"}
                      alt={product.featuredImage?.altText || product.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg">
                      SAVE {kitDiscount}%
                    </Badge>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#0B1C2C] mb-2 line-clamp-2">{product.title}</h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-[#0B1C2C]">${kit.price.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">${kit.compareAt.toFixed(2)}</span>
                    </div>

                    <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-center font-bold mb-4">
                      Save ${kitSavings.toFixed(2)}
                    </div>

                    {product.description && (
                      <div
                        className="text-sm text-[#0B1C2C]/80 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    )}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Add-Ons Section */}
          <Card className="p-8 bg-white shadow-xl">
            <h3 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-6 flex items-center gap-3">
              <Gift className="w-8 h-8 text-[#C8A55C]" />
              Enhance Your Display with Add-Ons
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {addOns.map((addOn) => (
                <Card
                  key={addOn.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedAddOns.includes(addOn.id) ? "ring-2 ring-green-600 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => toggleAddOn(addOn.id)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image src={addOn.image || "/placeholder.svg"} alt={addOn.name} fill className="object-cover" />
                    {selectedAddOns.includes(addOn.id) && (
                      <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                        <div className="bg-green-600 text-white rounded-full p-3">
                          <Check className="w-8 h-8" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#0B1C2C] mb-2">{addOn.name}</h4>
                    <p className="text-sm text-[#0B1C2C]/70 mb-3">{addOn.description}</p>
                    <p className="text-xl font-bold text-[#0B1C2C]">+${addOn.price.toFixed(2)}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-[#F5F3EF] rounded-lg p-6">
              <h4 className="text-2xl font-bold text-[#0B1C2C] mb-4">Your Order Summary</h4>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#0B1C2C] line-clamp-1">{selectedKit.shopifyProduct.title}</span>
                  <span className="font-bold text-[#0B1C2C]">${selectedKit.price.toFixed(2)}</span>
                </div>
                {selectedAddOns.map((id) => {
                  const addOn = addOns.find((a) => a.id === id)
                  return addOn ? (
                    <div key={id} className="flex justify-between items-center text-sm">
                      <span className="text-[#0B1C2C]/70">{addOn.name}</span>
                      <span className="text-[#0B1C2C]/70">${addOn.price.toFixed(2)}</span>
                    </div>
                  ) : null
                })}
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-[#0B1C2C]">Total</span>
                  <span className="text-[#0B1C2C]">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="bg-red-600 text-white px-4 py-3 rounded-lg text-center">
                  <p className="text-sm font-semibold">You're Saving</p>
                  <p className="text-2xl font-bold">${savings.toFixed(2)}</p>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xl py-6 font-bold shadow-lg">
                <Heart className="w-6 h-6 mr-2" />
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>

              <p className="text-center text-sm text-[#0B1C2C]/70 mt-4">
                ✓ Free Shipping • ✓ Easy Returns • ✓ Secure Checkout
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
