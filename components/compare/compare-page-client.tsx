"use client"

import { useState } from "react"
import { Check, X, Shield, Award, Zap, Heart, Clock, Phone, Users, Flag, Lock, Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const allCompetitors = [
  { name: "Phoenix (Atlantic)", key: "phoenix", handle: "phoenix", highlight: true },
  { name: "STAND Flagpoles", key: "stand", handle: "stand" },
  { name: "Service First", key: "serviceFirst", handle: "service-first" },
  { name: "Amazon Poles", key: "amazon", handle: "amazon" },
  { name: "Old Glory", key: "oldGlory", handle: "old-glory" },
  { name: "Annin Flagmakers", key: "annin", handle: "annin-flagmakers" },
  { name: "Valley Forge", key: "valleyForge", handle: "valley-forge" },
  { name: "Eder Flag", key: "eder", handle: "eder-flag" },
]

const comparisons = [
  {
    feature: "Forever Warranty",
    description: "(original buyer only)",
    icon: Shield,
    phoenix: "✓ Lifetime",
    stand: "1-Year",
    serviceFirst: "1-Year",
    amazon: "None",
    oldGlory: "Limited",
    annin: "1-Year",
    valleyForge: "Limited",
    eder: "None",
    highlight: true,
  },
  {
    feature: "100+ MPH Wind Rating",
    icon: Zap,
    phoenix: "Certified",
    stand: "Unknown",
    serviceFirst: "~60 MPH",
    amazon: "Not Listed",
    oldGlory: "~60 MPH",
    annin: "Unknown",
    valleyForge: "~50 MPH",
    eder: "Not Listed",
  },
  {
    feature: "American Forged Military Grade Aerospace Aluminum",
    icon: Award,
    phoenix: "Exclusive",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    annin: "✗",
    valleyForge: "✗",
    eder: "✗",
    highlight: true,
  },
  {
    feature: "Forti-Armor™ Internal Secur-Lok™",
    description: "(anti-collapse system)",
    icon: Lock,
    phoenix: "Patent-Pending",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    annin: "✗",
    valleyForge: "✗",
    eder: "✗",
  },
  {
    feature: "Fully Internal Locking Mechanism",
    description: "(No ropes, no visible locks)",
    icon: Lock,
    phoenix: "Hidden & Secure",
    stand: "External",
    serviceFirst: "External",
    amazon: "External",
    oldGlory: "Exposed",
    annin: "External",
    valleyForge: "External",
    eder: "Exposed",
  },
  {
    feature: "Freedom Rings™ (360° Tangle-Free Fly)",
    icon: Flag,
    phoenix: "Included",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    annin: "✗",
    valleyForge: "✗",
    eder: "✗",
    highlight: true,
  },
  {
    feature: "DUO-Harness™ Dual Flag System",
    icon: Flag,
    phoenix: "Fly 2 Flags",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    annin: "✗",
    valleyForge: "✗",
    eder: "✗",
  },
  {
    feature: "Installation Time",
    icon: Clock,
    phoenix: "30 Minutes",
    stand: "~1 Hour",
    serviceFirst: "~1 Hour",
    amazon: "Varies",
    oldGlory: "Varies",
    annin: "~45 Min",
    valleyForge: "~1 Hour",
    eder: "Varies",
  },
  {
    feature: "USA-Based Support",
    icon: Phone,
    phoenix: "BBB A+ Rated",
    stand: "Offshore",
    serviceFirst: "Mixed",
    amazon: "None",
    oldGlory: "Mixed",
    annin: "USA",
    valleyForge: "USA",
    eder: "Mixed",
    highlight: true,
  },
  {
    feature: "Family of Veterans Owned",
    icon: Users,
    phoenix: "✓",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    annin: "✗",
    valleyForge: "✗",
    eder: "✗",
  },
  {
    feature: "Starting Price",
    icon: Package,
    phoenix: "$999",
    stand: "$299+",
    serviceFirst: "$249+",
    amazon: "$199+",
    oldGlory: "$279+",
    annin: "$349+",
    valleyForge: "$399+",
    eder: "$229+",
  },
]

const categories = [
  { key: "all", label: "All Features", icon: Award },
  { key: "warranty", label: "Warranty & Support", icon: Shield },
  { key: "materials", label: "Materials & Build", icon: Award },
  { key: "features", label: "Features", icon: Flag },
  { key: "installation", label: "Installation", icon: Clock },
]

export function ComparePageClient() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["phoenix", "stand", "serviceFirst"])
  const [activeCategory, setActiveCategory] = useState("all")

  const toggleCompetitor = (key: string) => {
    if (key === "phoenix") return // Phoenix always selected

    if (selectedCompetitors.includes(key)) {
      if (selectedCompetitors.length > 2) {
        setSelectedCompetitors(selectedCompetitors.filter((c) => c !== key))
      }
    } else {
      if (selectedCompetitors.length < 5) {
        setSelectedCompetitors([...selectedCompetitors, key])
      }
    }
  }

  const filteredComparisons = comparisons.filter((comp) => {
    if (activeCategory === "all") return true
    if (activeCategory === "warranty") return comp.feature.includes("Warranty") || comp.feature.includes("Support")
    if (activeCategory === "materials")
      return comp.feature.includes("Aluminum") || comp.feature.includes("Wind") || comp.feature.includes("Armor")
    if (activeCategory === "features")
      return comp.feature.includes("Freedom") || comp.feature.includes("DUO") || comp.feature.includes("Lock")
    if (activeCategory === "installation") return comp.feature.includes("Installation")
    return true
  })

  const visibleCompetitors = allCompetitors.filter((c) => selectedCompetitors.includes(c.key))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#C8A55C] text-white px-6 py-2.5 rounded-full font-bold text-sm mb-6 shadow-xl">
              <Award className="w-4 h-4" />
              COMPREHENSIVE COMPARISON
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Compare Atlantic Flagpole
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A55C] to-[#D4B76A]">
                Side-by-Side
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              See exactly how Atlantic Flagpole stacks up against every major competitor. Quality, warranty, and
              American craftsmanship that stands above the rest.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Competitor Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0B1C2C] mb-2">Select Brands to Compare</h2>
            <p className="text-gray-600">Choose up to 5 brands (Phoenix is always included)</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {allCompetitors.map((comp) => {
              const isSelected = selectedCompetitors.includes(comp.key)
              const isPhoenix = comp.key === "phoenix"
              return (
                <button
                  key={comp.key}
                  onClick={() => toggleCompetitor(comp.key)}
                  disabled={isPhoenix}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? isPhoenix
                        ? "bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] border-[#C8A55C] text-white shadow-lg"
                        : "bg-[#0B1C2C] border-[#0B1C2C] text-white shadow-lg"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#C8A55C]/50 hover:shadow-md"
                  } ${isPhoenix ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="text-center">
                    {isPhoenix && (
                      <div className="mb-2">
                        <Award className="w-5 h-5 mx-auto fill-current" />
                      </div>
                    )}
                    <span className="text-xs font-bold">{comp.name}</span>
                    {isSelected && !isPhoenix && (
                      <div className="mt-2">
                        <Check className="w-4 h-4 mx-auto" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-[#0B1C2C] text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#C8A55C] hover:shadow-md"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mb-12">
          {/* Table Header */}
          <div
            className="grid gap-2 p-6 bg-gradient-to-r from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C]"
            style={{ gridTemplateColumns: `300px repeat(${visibleCompetitors.length}, 1fr)` }}
          >
            <div className="text-sm font-bold text-white/90 flex items-center">Feature / Brand</div>
            {visibleCompetitors.map((comp) => (
              <div key={comp.key} className="text-center">
                {comp.highlight ? (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-[#0B1C2C] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    <Award className="w-4 h-4 fill-current" />
                    {comp.name}
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-white/70">{comp.name}</div>
                )}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredComparisons.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={`grid gap-2 p-4 transition-all duration-300 hover:bg-[#C8A55C]/5 group ${
                    item.highlight ? "bg-gradient-to-r from-[#C8A55C]/10 to-transparent" : "bg-white"
                  }`}
                  style={{ gridTemplateColumns: `300px repeat(${visibleCompetitors.length}, 1fr)` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#C8A55C]" />
                    </div>
                    <div>
                      <span
                        className={`text-sm block ${item.highlight ? "font-bold text-[#0B1C2C]" : "font-medium text-gray-700"}`}
                      >
                        {item.feature}
                      </span>
                      {item.description && <span className="text-xs text-gray-500 italic">{item.description}</span>}
                    </div>
                  </div>

                  {visibleCompetitors.map((comp) => {
                    const value = item[comp.key as keyof typeof item] as string
                    const isPhoenix = comp.key === "phoenix"

                    return (
                      <div key={comp.key} className="flex justify-center items-center">
                        {value === "✓" || value?.startsWith("✓") ? (
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                              isPhoenix ? "bg-gradient-to-br from-green-400 to-green-600 shadow-lg" : "bg-gray-200"
                            } group-hover:scale-110 transition-transform`}
                          >
                            <Check className={`w-6 h-6 ${isPhoenix ? "text-white" : "text-gray-500"} stroke-[3]`} />
                          </div>
                        ) : value === "✗" ? (
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:scale-110 transition-transform">
                            <X className="w-6 h-6 text-red-400" />
                          </div>
                        ) : (
                          <span
                            className={`text-xs text-center px-2 ${isPhoenix ? "font-bold text-green-700 bg-green-50 py-1 rounded-full" : "text-gray-600"}`}
                          >
                            {value}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-6 mb-12">
          {/* Phoenix Featured Card */}
          <div className="bg-gradient-to-br from-[#C8A55C] to-[#D4B76A] rounded-3xl overflow-hidden shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#0B1C2C] flex items-center gap-2">
                <Award className="w-6 h-6 fill-current" />
                Phoenix (Atlantic)
              </h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#0B1C2C]">$999</div>
                <div className="text-xs text-[#0B1C2C]/70">Starting</div>
              </div>
            </div>
            <div className="space-y-3">
              {filteredComparisons
                .filter((item) => item.phoenix === "✓" || item.phoenix?.startsWith("✓") || item.highlight)
                .map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-center gap-3 bg-white/90 p-3 rounded-xl">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#C8A55C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#0B1C2C]">{item.feature}</div>
                        {item.description && <div className="text-xs text-gray-600">{item.description}</div>}
                      </div>
                      <div className="flex-shrink-0">
                        {item.phoenix === "✓" || item.phoenix?.startsWith("✓") ? (
                          <Check className="w-6 h-6 text-green-600 stroke-[3]" />
                        ) : (
                          <span className="text-xs font-bold text-green-700">{item.phoenix}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Competitor Cards */}
          <div className="space-y-4">
            {visibleCompetitors
              .filter((c) => c.key !== "phoenix")
              .map((comp) => (
                <div key={comp.key} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-700">{comp.name}</h4>
                    <Link href={`/compare/${comp.handle}`}>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {filteredComparisons.slice(0, 6).map((item, idx) => {
                      const value = item[comp.key as keyof typeof item] as string
                      return (
                        <div key={idx} className="flex items-center gap-1">
                          {value === "✓" || value?.startsWith("✓") ? (
                            <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          ) : value === "✗" ? (
                            <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                          ) : (
                            <span className="text-gray-500 flex-shrink-0">•</span>
                          )}
                          <span className="text-gray-600 truncate">{item.feature.split(" ")[0]}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {[
            { value: "35,000+", label: "Happy American Patriots", icon: Heart },
            { value: "4.9★", label: "Average Rating (2,847 Reviews)", icon: Award },
            { value: "<5%", label: "Return Rate", icon: Shield },
          ].map((stat, idx) => {
            const StatIcon = stat.icon
            return (
              <div
                key={idx}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Choose the Best?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 35,000+ Americans who chose quality that lasts a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] hover:from-[#D4B76A] hover:to-[#C8A55C] text-white text-lg px-8 py-6 shadow-xl"
            >
              <Link href="/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle">
                Shop Phoenix Flagpoles
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-[#0B1C2C] text-lg px-8 py-6">
              <Link href="/flagpole-finder">Take the Quiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
