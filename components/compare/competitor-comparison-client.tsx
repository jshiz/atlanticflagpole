"use client"

import { Check, X, Shield, Award, Zap, Heart, Clock, Phone, Users, Flag, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CompetitorComparisonClientProps {
  competitorHandle: string
  competitorName: string
}

const competitorData: Record<
  string,
  {
    warranty: string
    windRating: string
    material: string
    antiCollapse: string
    locking: string
    freedomRings: string
    dualFlag: string
    installation: string
    support: string
    veteranOwned: string
    price: string
  }
> = {
  stand: {
    warranty: "1-Year",
    windRating: "Unknown",
    material: "✗",
    antiCollapse: "✗",
    locking: "External",
    freedomRings: "✗",
    dualFlag: "✗",
    installation: "~1 Hour",
    support: "Offshore",
    veteranOwned: "✗",
    price: "$299+",
  },
  "service-first": {
    warranty: "1-Year",
    windRating: "~60 MPH",
    material: "✗",
    antiCollapse: "✗",
    locking: "External",
    freedomRings: "✗",
    dualFlag: "✗",
    installation: "~1 Hour",
    support: "Mixed",
    veteranOwned: "✗",
    price: "$249+",
  },
  amazon: {
    warranty: "None",
    windRating: "Not Listed",
    material: "✗",
    antiCollapse: "✗",
    locking: "External",
    freedomRings: "✗",
    dualFlag: "✗",
    installation: "Varies",
    support: "None",
    veteranOwned: "✗",
    price: "$199+",
  },
  "old-glory": {
    warranty: "Limited",
    windRating: "~60 MPH",
    material: "✗",
    antiCollapse: "✗",
    locking: "Exposed",
    freedomRings: "✗",
    dualFlag: "✗",
    installation: "Varies",
    support: "Mixed",
    veteranOwned: "✗",
    price: "$279+",
  },
  // Add more competitors as needed
}

const phoenixData = {
  warranty: "✓ Lifetime",
  windRating: "Certified 100+ MPH",
  material: "Exclusive",
  antiCollapse: "Patent-Pending",
  locking: "Hidden & Secure",
  freedomRings: "Included",
  dualFlag: "Fly 2 Flags",
  installation: "30 Minutes",
  support: "BBB A+ Rated",
  veteranOwned: "✓",
  price: "$999",
}

const comparisonFeatures = [
  {
    feature: "Forever Warranty",
    description: "Original buyer, lifetime coverage",
    icon: Shield,
    phoenixKey: "warranty",
    competitorKey: "warranty",
  },
  {
    feature: "Wind Rating",
    description: "Certified wind resistance",
    icon: Zap,
    phoenixKey: "windRating",
    competitorKey: "windRating",
  },
  {
    feature: "Aerospace Aluminum",
    description: "Military-grade 6061-T6",
    icon: Award,
    phoenixKey: "material",
    competitorKey: "material",
  },
  {
    feature: "Anti-Collapse System",
    description: "Forti-Armor™ Internal Secur-Lok™",
    icon: Lock,
    phoenixKey: "antiCollapse",
    competitorKey: "antiCollapse",
  },
  {
    feature: "Locking Mechanism",
    description: "No ropes, no visible locks",
    icon: Lock,
    phoenixKey: "locking",
    competitorKey: "locking",
  },
  {
    feature: "Freedom Rings™",
    description: "360° tangle-free rotation",
    icon: Flag,
    phoenixKey: "freedomRings",
    competitorKey: "freedomRings",
  },
  {
    feature: "Dual Flag System",
    description: "DUO-Harness™ capability",
    icon: Flag,
    phoenixKey: "dualFlag",
    competitorKey: "dualFlag",
  },
  {
    feature: "Installation Time",
    description: "Average setup duration",
    icon: Clock,
    phoenixKey: "installation",
    competitorKey: "installation",
  },
  {
    feature: "Customer Support",
    description: "USA-based assistance",
    icon: Phone,
    phoenixKey: "support",
    competitorKey: "support",
  },
  {
    feature: "Veteran Owned",
    description: "Family of veterans",
    icon: Users,
    phoenixKey: "veteranOwned",
    competitorKey: "veteranOwned",
  },
]

export function CompetitorComparisonClient({ competitorHandle, competitorName }: CompetitorComparisonClientProps) {
  const competitor = competitorData[competitorHandle] || competitorData["stand"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-bg-flag-waving-CmROiPRPkUZi7VQbabYZWxP2H6gAgv.jpg"
            alt="American flag background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/compare" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to All Comparisons
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Atlantic Flagpole
              <br />
              <span className="text-[#C8A55C]">vs</span>
              <br />
              {competitorName}
            </h1>
            <p className="text-xl text-white/90">Side-by-side detailed comparison of features, warranty, and quality</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Split View Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-white rounded-3xl overflow-hidden shadow-2xl mb-12">
          {/* Atlantic Side - Winner */}
          <div className="bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] p-8 md:p-12 relative">
            <div className="absolute top-6 right-6">
              <div className="bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2">
                <Award className="w-4 h-4 fill-current" />
                WINNER
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-8 mt-8">Atlantic Flagpole</h2>

            <div className="space-y-6">
              {comparisonFeatures.map((item, idx) => {
                const Icon = item.icon
                const value = phoenixData[item.phoenixKey as keyof typeof phoenixData]
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">{item.feature}</h3>
                        <p className="text-white/70 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="ml-13">
                      {value === "✓" || value?.startsWith("✓") ? (
                        <div className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                          <Check className="w-4 h-4" />
                          Yes
                        </div>
                      ) : (
                        <div className="text-white font-semibold text-lg">{value}</div>
                      )}
                    </div>
                  </div>
                )
              })}

              <div className="bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] rounded-xl p-6 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/90 text-sm mb-1">Starting Price</div>
                    <div className="text-4xl font-bold text-white">{phoenixData.price}</div>
                    <div className="text-white/80 text-xs mt-1">Lifetime value & warranty</div>
                  </div>
                  <Button asChild size="lg" className="bg-white text-[#0B1C2C] hover:bg-white/90">
                    <Link href="/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Side */}
          <div className="bg-gray-50 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-8">{competitorName}</h2>

            <div className="space-y-6">
              {comparisonFeatures.map((item, idx) => {
                const Icon = item.icon
                const value = competitor[item.competitorKey as keyof typeof competitor]
                return (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-700 text-lg">{item.feature}</h3>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="ml-13">
                      {value === "✓" || value?.startsWith("✓") ? (
                        <div className="inline-flex items-center gap-2 bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-bold text-sm">
                          <Check className="w-4 h-4" />
                          Yes
                        </div>
                      ) : value === "✗" ? (
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold text-sm">
                          <X className="w-4 h-4" />
                          No
                        </div>
                      ) : (
                        <div className="text-gray-600 font-semibold text-lg">{value}</div>
                      )}
                    </div>
                  </div>
                )
              })}

              <div className="bg-gray-100 rounded-xl p-6 mt-8 border border-gray-200">
                <div className="text-gray-600 text-sm mb-1">Starting Price</div>
                <div className="text-4xl font-bold text-gray-700">{competitor.price}</div>
                <div className="text-gray-500 text-xs mt-1">Limited warranty & features</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {[
            { value: "35,000+", label: "Satisfied Customers Choose Atlantic", icon: Heart },
            { value: "4.9★", label: "Average Rating", icon: Award },
            { value: "<5%", label: "Return Rate", icon: Shield },
          ].map((stat, idx) => {
            const StatIcon = stat.icon
            return (
              <div
                key={idx}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] mb-4">
                  <StatIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold text-[#0B1C2C] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">The Choice is Clear</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Atlantic Flagpole offers superior quality, lifetime warranty, and American craftsmanship
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] hover:from-[#D4B76A] hover:to-[#C8A55C] text-white text-lg px-8 py-6 shadow-xl"
          >
            <Link href="/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle">
              Shop Atlantic Flagpoles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
