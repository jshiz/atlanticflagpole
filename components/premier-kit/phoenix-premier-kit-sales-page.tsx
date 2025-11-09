"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Check,
  Shield,
  Award,
  Clock,
  Users,
  TrendingUp,
  X,
  ChevronRight,
  Flag,
  Zap,
  Heart,
  Package,
  Wrench,
  Star,
  MapPin,
  AlertTriangle,
} from "lucide-react"
import { getProduct } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/shopify"

const sizeOptions = [
  {
    height: "15'",
    basePrice: 779.71,
    midnightBronze: 20,
    colonialGold: 100,
  },
  {
    height: "20'",
    basePrice: 979.71,
    midnightBronze: 20,
    colonialGold: 100,
    popular: true,
  },
  {
    height: "25'",
    basePrice: 1079.71,
    midnightBronze: 20,
    colonialGold: 100,
  },
]

const finishOptions = [
  { name: "Centinal Silver", description: "Standard", price: 0 },
  { name: "Midnight Bronze", description: "Black Bronze, Premium", price: 20 },
  { name: "Colonial Gold", description: "Limited Edition", price: 100 },
]

const testimonials = [
  {
    quote: "Built like military equipment. My Army buddies are jealous.",
    author: "Michael S.",
    location: "GA",
    rating: 5,
  },
  {
    quote: "Everyone in our RV club wants one now.",
    author: "Brian L.",
    location: "FL",
    rating: 5,
  },
  {
    quote: "The pride my dad would've felt seeing this fly... unmatched.",
    author: "Rachel L.",
    location: "KS",
    rating: 5,
  },
  {
    quote: "I had it up before my neighbor finished mowing the lawn.",
    author: "Steve B.",
    location: "Iowa",
    rating: 5,
  },
]

const mountingOptions = [
  { name: "RV Hitch Mount", icon: "🚐" },
  { name: "Dock Mount", icon: "⚓" },
  { name: "Sidewall / Deck Mount", icon: "🏠" },
  { name: "Mobile Wheel Mount", icon: "🔄" },
]

export function PhoenixPremierKitSalesPage() {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]) // 20' default
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0])
  const [product, setProduct] = useState<ShopifyProduct | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const phoenixProduct = await getProduct("phoenix-telescoping-flagpole-premier-kit-starter-bundle")
        setProduct(phoenixProduct)
      } catch (error) {
        console.error("[v0] Error fetching Phoenix Premier Kit:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])

  const totalPrice = selectedSize.basePrice + selectedFinish.price

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Flag className="w-16 h-16 text-[#0B1C2C] animate-pulse mx-auto mb-4" />
          <p className="text-xl text-[#0B1C2C]">Loading Phoenix Premier Kit...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: Hero - Above the Fold */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <Image src="/american-flag-flying-on-tall-flagpole-in-front-of-.jpg" alt="American Flag Flying" fill className="object-cover" priority />
        </div>

        {/* Embossed Flag Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/subtle-american-flag-texture-pattern.jpg')] opacity-5" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold border border-white/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/madeinusabadge-y7lnHFiqBn1o0YpH7y5tKHymKkmgPA.jpg"
                  alt="Made in USA"
                  width={24}
                  height={24}
                  className="inline mr-2"
                />
                Made in USA
              </Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold border border-white/20">
                <Award className="w-4 h-4 inline mr-2" />
                Family of Veterans Owned
              </Badge>
              <Badge className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold border border-white/20">
                <Shield className="w-4 h-4 inline mr-2" />
                Forever Warranty (Original Owner Only)
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              You Don't Just Raise a Flag —<br />
              <span className="text-[#C8A55C]">You Raise a Legacy.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-3xl text-white/90 mb-10 font-serif leading-relaxed">
              The Last Flagpole You'll Ever Need.
              <br />
              Built to Fly. Built to Last. Built to Matter.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-xl px-10 py-7 shadow-2xl"
                onClick={() => document.getElementById("sizes")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Flag className="w-6 h-6 mr-2" />
                Order My Kit Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 font-bold text-xl px-10 py-7"
                onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C8A55C] text-[#C8A55C]" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5.0</span>
              </div>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <Users className="w-5 h-5 inline mr-2" />
                <span className="font-semibold">33,758+ Americans Trust Phoenix</span>
              </div>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <TrendingUp className="w-5 h-5 inline mr-2" />
                <span className="font-semibold">Less than 1% Return Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Emotional Intro / Story */}
      <section id="story" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl text-[#0B1C2C] font-serif leading-relaxed mb-6">
                Every flag tells a story. For some, it's the memory of service. For others, a connection to faith,
                family, or freedom.
              </p>
              <p className="text-xl md:text-2xl text-[#0B1C2C]/80 leading-relaxed mb-6">
                That flag deserves better than a rattling, rusting, rope-snagging pole.
              </p>
              <p className="text-xl md:text-2xl text-[#0B1C2C] font-bold leading-relaxed">
                If your flag means everything — the pole beneath it should too.
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] text-white shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
                That's why we built the <span className="text-[#C8A55C]">Phoenix Premier Kit</span>:
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                  <p className="text-lg">Forged from 6005 T6 Aerospace Grade American Aluminum</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                  <p className="text-lg">Wind-rated to 100+ MPH</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                  <p className="text-lg">Internal Forti-Armor™ Secur-Lok™ system</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                  <p className="text-lg">Backed by our Forever Warranty (original owner only)</p>
                </div>
              </div>

              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-2xl font-bold text-[#C8A55C]">
                  Trusted by 33,758+ Americans. Less than 1% return rate.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Problem With Cheap Poles */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">
                Cheap Poles = Constant Replacements
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Problem Side */}
              <Card className="p-8 bg-red-50 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                  <h3 className="text-2xl font-bold text-red-900">The Cheap Pole Problem</h3>
                </div>
                <div className="space-y-4">
                  {[
                    "Clanging pulleys and ropes",
                    "Tangled flags",
                    "Rust, bend, and snap",
                    "Foreign manufacturing",
                    "Constant replacements",
                  ].map((problem, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-[#0B1C2C]">{problem}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-lg font-bold text-red-900 italic border-l-4 border-red-600 pl-4">
                  "They weren't built for pride — they were built for price."
                </p>
              </Card>

              {/* Phoenix Solution Side */}
              <Card className="p-8 bg-gradient-to-br from-[#C8A55C]/10 to-green-50 border-2 border-[#C8A55C]">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-10 h-10 text-[#C8A55C]" />
                  <h3 className="text-2xl font-bold text-[#0B1C2C]">The Phoenix Difference</h3>
                </div>
                <div className="space-y-4">
                  {[
                    "Silent operation - no ropes or pulleys",
                    "Never tangled with DUO-Harness™",
                    "100% rust-free aerospace aluminum",
                    "Proudly Made in USA",
                    "Buy once, fly forever",
                  ].map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-[#0B1C2C] font-semibold">{solution}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-lg font-bold text-[#0B1C2C] italic border-l-4 border-[#C8A55C] pl-4">
                  "Built for strength. Engineered for security. Designed to honor."
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: The Phoenix Difference - Full Features */}
      <section className="py-20 bg-[#0B1C2C] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for Strength. Engineered for Security. Designed to Honor.
              </h2>
              <p className="text-xl text-white/80">Everything you need. Nothing you don't.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Package, text: "Pre-assembled 6005 T6 Aerospace Grade Aluminum Pole" },
                { icon: Flag, text: "3x5' Embroidered Flag" },
                { icon: Shield, text: "Forti-Armor™ Secur-Lok™ sleeves (internal, high-strength polymer joints)" },
                { icon: Award, text: "Anti-theft locking system" },
                { icon: Zap, text: "No ropes, no pulleys, no noise" },
                { icon: Check, text: "DUO-Harness™ and Freedom Rings™" },
                { icon: Wrench, text: "Ground sleeve + stop bolt" },
                { icon: TrendingUp, text: "Wind-tested to 100+ MPH" },
                { icon: Clock, text: "365-Day Trial + Forever Warranty" },
              ].map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                >
                  <feature.icon className="w-10 h-10 text-[#C8A55C] mb-4" />
                  <p className="text-white leading-relaxed">{feature.text}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center p-6 bg-[#C8A55C]/20 backdrop-blur-sm rounded-lg border border-[#C8A55C]">
              <p className="text-2xl font-bold text-[#C8A55C]">Less than 1% return rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Sizes & Finishes Table */}
      <section id="sizes" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">Choose Your Perfect Size & Finish</h2>
              <p className="text-xl text-[#0B1C2C]/70">Select from three heights and three premium finishes</p>
            </div>

            {/* Size Selection */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {sizeOptions.map((size) => (
                <Card
                  key={size.height}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedSize.height === size.height
                      ? "ring-4 ring-[#C8A55C] shadow-xl scale-105 bg-gradient-to-br from-[#C8A55C]/10 to-white"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.popular && <Badge className="mb-4 bg-[#C8A55C] text-[#0B1C2C]">MOST POPULAR</Badge>}
                  <h3 className="text-3xl font-bold text-[#0B1C2C] mb-2">{size.height}</h3>
                  <p className="text-4xl font-bold text-[#C8A55C] mb-4">${size.basePrice.toFixed(2)}</p>
                  <div className="space-y-2 text-sm text-[#0B1C2C]/70">
                    <p>+ ${size.midnightBronze} Midnight Bronze</p>
                    <p>+ ${size.colonialGold} Colonial Gold</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Finish Selection */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-6">Select Your Finish</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {finishOptions.map((finish) => (
                  <button
                    key={finish.name}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      selectedFinish.name === finish.name
                        ? "border-[#C8A55C] bg-[#C8A55C]/10 shadow-lg"
                        : "border-gray-200 hover:border-[#C8A55C]/50"
                    }`}
                    onClick={() => setSelectedFinish(finish)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#0B1C2C]">{finish.name}</h4>
                      {selectedFinish.name === finish.name && <Check className="w-6 h-6 text-[#C8A55C]" />}
                    </div>
                    <p className="text-sm text-[#0B1C2C]/70 mb-2">{finish.description}</p>
                    <p className="text-xl font-bold text-[#C8A55C]">
                      {finish.price === 0 ? "Standard" : `+$${finish.price}`}
                    </p>
                  </button>
                ))}
              </div>

              {/* Total Price Display */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44] text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Your Configuration</p>
                    <p className="text-2xl font-bold">
                      {selectedSize.height} {selectedFinish.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/70 mb-1">Total Price</p>
                    <p className="text-4xl font-bold text-[#C8A55C]">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-xl py-6">
                  <Flag className="w-6 h-6 mr-2" />
                  Order Now – Ships Fast
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 6: Easy Installation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">
              Installs in 30 Minutes. No Crew Needed.
            </h2>
            <p className="text-xl text-[#0B1C2C]/70 mb-12">
              You don't need to be a contractor. Our step-by-step process makes installation simple.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Package, text: "Pre-assembled out of box" },
                { icon: Check, text: "Step-by-step color instructions" },
                { icon: Users, text: "Installation videos included" },
                { icon: Heart, text: "U.S.-based support" },
              ].map((step, idx) => (
                <Card key={idx} className="p-6">
                  <step.icon className="w-12 h-12 text-[#C8A55C] mx-auto mb-4" />
                  <p className="font-semibold text-[#0B1C2C]">{step.text}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <p className="text-2xl text-[#0B1C2C] italic font-serif">
                "I had it up before my neighbor finished mowing the lawn."
              </p>
              <p className="text-[#0B1C2C]/70 mt-4">– Steve B., Iowa</p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 7: Mounting Options */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">Your Flag, Wherever You Go.</h2>
              <p className="text-xl text-[#C8A55C] font-bold">Freedom Goes Wherever You Go</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {mountingOptions.map((option, idx) => (
                <Card key={idx} className="p-6 text-center hover:shadow-xl transition-all">
                  <div className="text-5xl mb-4">{option.icon}</div>
                  <h3 className="font-bold text-[#0B1C2C]">{option.name}</h3>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Social Proof / UGC */}
      <section className="py-20 bg-[#0B1C2C] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">See It In Action: #ILoveMyPhoenix</h2>
              <p className="text-xl text-white/80">Real customers, real stories, real pride.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C8A55C] text-[#C8A55C]" />
                    ))}
                  </div>
                  <p className="text-white italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#C8A55C]" />
                    <span className="font-semibold">{testimonial.author}</span>
                    <span className="text-white/60">{testimonial.location}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg mb-4">
                Tag us using <span className="text-[#C8A55C] font-bold">#ILoveMyPhoenix</span> to be featured
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: The Guarantee */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">The SealTeam6 Defense™ Guarantee</h2>
              <p className="text-xl text-[#0B1C2C]/70">We stand behind every flagpole we make</p>
            </div>

            <Card className="p-10 bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] text-white shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Clock, text: "365-Day Home Trial" },
                  { icon: Shield, text: "Forever Warranty (Original Owner)" },
                  { icon: Award, text: "Theft Replacement (w/ police report)" },
                  { icon: Check, text: "Rust-Free Promise" },
                  { icon: Zap, text: "Lightning Protection" },
                  { icon: TrendingUp, text: "Wind Protection (100+ MPH)" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                    <item.icon className="w-10 h-10 text-[#C8A55C] flex-shrink-0" />
                    <p className="text-lg font-semibold">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="text-center p-6 bg-[#C8A55C]/20 backdrop-blur-sm rounded-lg border border-[#C8A55C]">
                <p className="text-2xl font-bold">Built in America • Backed for Life • No Shortcuts</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 10: Why It's Rare */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">Built in Batches. Backed for Life.</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3 justify-center">
                <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                <p className="text-xl text-[#0B1C2C]">Limited production runs</p>
              </div>
              <div className="flex items-start gap-3 justify-center">
                <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                <p className="text-xl text-[#0B1C2C]">Not mass-produced</p>
              </div>
              <div className="flex items-start gap-3 justify-center">
                <Check className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                <p className="text-xl text-[#0B1C2C]">Not sold in box stores</p>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-[#C8A55C]/10 to-orange-50 border-2 border-[#C8A55C]">
              <p className="text-2xl font-bold text-[#0B1C2C] italic">
                If you're reading this, a new batch is available. But not for long.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 11: Cause-Based Commerce */}
      <section className="py-20 bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Purchase Makes a Difference</h2>
            <p className="text-xl text-white/80 mb-12">
              When you choose Phoenix, you're supporting American families and vital causes
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Heart, text: "10 Meals donated to hungry families per pole sold" },
                { icon: Shield, text: "Supports K9s for Warriors (Veterans)" },
                { icon: Award, text: "Supports Operation Underground Railroad (Anti-Trafficking)" },
                { icon: Flag, text: "Supports American family-owned business" },
              ].map((cause, idx) => (
                <Card key={idx} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                  <cause.icon className="w-12 h-12 text-[#C8A55C] mx-auto mb-4" />
                  <p className="text-lg">{cause.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-[#0B1C2C] mb-6">
              Your Flag Deserves More Than a Cheap Pole.
            </h2>
            <p className="text-2xl md:text-3xl text-[#0B1C2C]/80 font-serif mb-10">
              This is your once-in-a-lifetime flagpole.
            </p>

            <Button
              size="lg"
              className="bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-2xl px-12 py-8 shadow-2xl"
              onClick={() => document.getElementById("sizes")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Flag className="w-8 h-8 mr-3" />
              Order Now – Ships Fast
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-[#0B1C2C]/70">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Free Shipping on Select Kits</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>365-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Ships in 1-2 Business Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-12 bg-[#0B1C2C] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/collections/telescoping-flagpoles" className="hover:text-[#C8A55C] transition-colors">
                Shop Kits
              </Link>
              <Link href="/flagpole-finder" className="hover:text-[#C8A55C] transition-colors">
                Compare
              </Link>
              <Link href="/collections/accessories" className="hover:text-[#C8A55C] transition-colors">
                Accessories
              </Link>
              <Link href="/help-center" className="hover:text-[#C8A55C] transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-[#C8A55C] transition-colors">
                Contact
              </Link>
            </div>

            <div className="text-center text-sm text-white/60">
              <p>© {new Date().getFullYear()} Atlantic Flagpole. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
