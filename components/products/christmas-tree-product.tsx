"use client"

import { useState } from "react"
import Image from "next/image"
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
  TreePine,
  Calendar,
  Truck,
  Award,
} from "lucide-react"

const heightOptions = [
  { id: "6ft", label: "6 ft", price: 199.99, compareAt: 249.99 },
  { id: "7ft", label: "7 ft", price: 249.99, compareAt: 299.99 },
  { id: "8ft", label: "8 ft", price: 299.99, compareAt: 349.99 },
  { id: "10ft", label: "10 ft", price: 399.99, compareAt: 449.99 },
]

const lightOptions = [
  { id: "warm-white", label: "Warm White", color: "#FFE4B5" },
  { id: "cool-white", label: "Cool White", color: "#F0F8FF" },
  { id: "multicolor", label: "Multicolor", color: "linear-gradient(90deg, #FF0000, #00FF00, #0000FF, #FFFF00)" },
  { id: "red-white-blue", label: "Red, White & Blue", color: "linear-gradient(90deg, #FF0000, #FFFFFF, #0000FF)" },
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

export function ChristmasTreeProduct() {
  const [selectedHeight, setSelectedHeight] = useState(heightOptions[1])
  const [selectedLight, setSelectedLight] = useState(lightOptions[0])
  const [quantity, setQuantity] = useState(1)

  const discountPercentage = Math.round(
    ((selectedHeight.compareAt - selectedHeight.price) / selectedHeight.compareAt) * 100,
  )

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      {/* Hero Badge */}
      <div className="text-center mb-8">
        <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-2 mb-4">
          🎄 Limited Time Holiday Offer - {discountPercentage}% OFF
        </Badge>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 text-balance">
          Patriot Glo Flagpole Christmas Tree
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Transform your flagpole into a magical Christmas display with our premium LED light kit
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <Card className="relative aspect-square overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
            <Image
              src="/placeholder.svg?height=800&width=800"
              alt="Patriot Glo Flagpole Christmas Tree"
              fill
              className="object-cover"
              priority
            />
            <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-xl px-6 py-3">
              {discountPercentage}% OFF
            </Badge>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card className="relative aspect-square overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="LED lights detail"
                fill
                className="object-cover"
              />
            </Card>
            <Card className="relative aspect-square overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
              <Image src="/placeholder.svg?height=400&width=400" alt="Easy setup" fill className="object-cover" />
            </Card>
            <Card className="relative aspect-square overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Weather resistant"
                fill
                className="object-cover"
              />
            </Card>
          </div>
        </div>

        {/* Product Configuration */}
        <div className="space-y-8">
          <Card className="p-8 bg-white/95 backdrop-blur-sm">
            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-bold text-[#0B1C2C]">${selectedHeight.price.toFixed(2)}</span>
              <div className="flex flex-col">
                <span className="text-xl text-gray-500 line-through">${selectedHeight.compareAt.toFixed(2)}</span>
                <Badge variant="destructive" className="text-sm w-fit">
                  Save ${(selectedHeight.compareAt - selectedHeight.price).toFixed(2)}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Height Selection */}
            <div className="space-y-4 mb-6">
              <label className="text-lg font-semibold text-[#0B1C2C] flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-600" />
                Select Height:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {heightOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedHeight.id === option.id ? "default" : "outline"}
                    onClick={() => setSelectedHeight(option)}
                    className={`py-6 text-base font-semibold ${
                      selectedHeight.id === option.id
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border-2 hover:border-green-600"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span>{option.label}</span>
                      <span className="text-sm opacity-80">${option.price}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Light Color Selection */}
            <div className="space-y-4 mb-6">
              <label className="text-lg font-semibold text-[#0B1C2C] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Select Light Color:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {lightOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedLight.id === option.id ? "default" : "outline"}
                    onClick={() => setSelectedLight(option)}
                    className={`py-6 text-base font-semibold ${
                      selectedLight.id === option.id
                        ? "bg-[#C8A55C] hover:bg-[#a88947] text-white"
                        : "border-2 hover:border-[#C8A55C]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{
                          background: option.color.includes("gradient") ? option.color : option.color,
                        }}
                      />
                      <span>{option.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4 mb-6">
              <label className="text-lg font-semibold text-[#0B1C2C]">Quantity:</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12 border-2"
                >
                  -
                </Button>
                <span className="text-2xl font-bold text-[#0B1C2C] w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 border-2"
                >
                  +
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Add to Cart */}
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-8 text-xl font-bold shadow-lg">
              🎄 Add to Cart - ${(selectedHeight.price * quantity).toFixed(2)}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold">42-Month Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Made in USA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0B1C2C]">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="font-semibold">30-Day Returns</span>
              </div>
            </div>
          </Card>

          {/* Quick Benefits */}
          <Card className="p-6 bg-green-600 text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Why Choose Our Christmas Tree?
            </h3>
            <ul className="space-y-3">
              {benefits.slice(0, 4).map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <Card className="p-12 bg-white/95 backdrop-blur-sm mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-4">
            🎉 Welcome to a Brighter, Merrier Christmas! 🌟
          </h2>
          <p className="text-xl text-[#0B1C2C]/80 max-w-3xl mx-auto leading-relaxed">
            Transform your Christmas with ease! No more tangled lights or complicated setups. Our LED Flagpole Christmas
            Tree is your ticket to a stress-free, delightful holiday season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1C2C]">{feature.title}</h3>
              <p className="text-[#0B1C2C]/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Complete Benefits List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <Card className="p-8 bg-white/95 backdrop-blur-sm">
          <h3 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-6">What's Included</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-[#0B1C2C] leading-relaxed">
                Complete LED light kit with all necessary components
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-[#0B1C2C] leading-relaxed">Weather-resistant power adapter and cables</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-[#0B1C2C] leading-relaxed">Easy-to-follow installation instructions</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-[#0B1C2C] leading-relaxed">Compact storage bag for off-season</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-[#0B1C2C] leading-relaxed">42-month warranty certificate</span>
            </li>
          </ul>
        </Card>

        <Card className="p-8 bg-white/95 backdrop-blur-sm">
          <h3 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-6">All Benefits</h3>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Star className="w-6 h-6 text-[#C8A55C] mt-0.5 flex-shrink-0" />
                <span className="text-[#0B1C2C] leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Specifications */}
      <Card className="p-12 bg-white/95 backdrop-blur-sm mb-16">
        <h2 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-8 text-center">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Available Heights:</span>
              <span className="text-[#0B1C2C]/80">6ft, 7ft, 8ft, 10ft</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Light Type:</span>
              <span className="text-[#0B1C2C]/80">Energy-Efficient LED</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Power Source:</span>
              <span className="text-[#0B1C2C]/80">110V AC Adapter</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Weather Rating:</span>
              <span className="text-[#0B1C2C]/80">IP65 Waterproof</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Warranty:</span>
              <span className="text-[#0B1C2C]/80">42 Months</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Installation:</span>
              <span className="text-[#0B1C2C]/80">No Tools Required</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Made In:</span>
              <span className="text-[#0B1C2C]/80">USA</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="font-semibold text-[#0B1C2C]">Shipping:</span>
              <span className="text-[#0B1C2C]/80">Free</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Final CTA */}
      <Card className="p-12 bg-gradient-to-r from-red-600 to-green-600 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          ✨ Your Perfect Christmas is Just a Click Away! ✨
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Let's make this Christmas unforgettable. Add a touch of magic, ease, and joy to your home with our LED
          Flagpole Christmas Tree. It's more than just a decoration; it's a beacon of holiday spirit, bringing warmth
          and happiness to your home.
        </p>
        <Button
          size="lg"
          className="bg-white text-red-600 hover:bg-gray-100 text-xl px-12 py-8 font-bold shadow-xl"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🎁 Order Now and Light Up Your Holiday Season!
        </Button>
        <p className="mt-6 text-lg opacity-90">Free Shipping • 42-Month Warranty • 30-Day Returns</p>
      </Card>
    </div>
  )
}
