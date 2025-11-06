"use client"

import { Check, X, Shield, Flag, Award, Clock, Heart, Zap, Lock, Package, Phone, Users } from "lucide-react"

const competitors = [
  { name: "Phoenix Flagpole", key: "phoenix", highlight: true },
  { name: "STAND", key: "stand" },
  { name: "Service First", key: "serviceFirst" },
  { name: "Amazon Poles", key: "amazon" },
  { name: "Old Glory", key: "oldGlory" },
]

const comparisons = [
  {
    feature: "Forever Warranty",
    description: "(original buyer only)",
    icon: Shield,
    phoenix: "✓",
    stand: "1-Year",
    serviceFirst: "1-Year",
    amazon: "None",
    oldGlory: "Limited",
    highlight: true,
  },
  {
    feature: "100+ MPH Wind Rating",
    description: "",
    icon: Zap,
    phoenix: "Certified",
    stand: "Unknown",
    serviceFirst: "~60 MPH",
    amazon: "Not Listed",
    oldGlory: "~60 MPH",
    highlight: false,
  },
  {
    feature: "American Forged Military Grade Aerospace Aluminum",
    description: "",
    icon: Award,
    phoenix: "Exclusive",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
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
    highlight: false,
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
    highlight: false,
  },
  {
    feature: "Freedom Rings™ (360° Tangle-Free Fly)",
    description: "",
    icon: Flag,
    phoenix: "Included",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    highlight: true,
  },
  {
    feature: "DUO-Harness™ Dual Flag System",
    description: "",
    icon: Flag,
    phoenix: "Fly 2 Flags",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    highlight: false,
  },
  {
    feature: "Colonial Gold Edition",
    description: "",
    icon: Award,
    phoenix: "Limited Run",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    highlight: false,
  },
  {
    feature: "Installation Time",
    description: "",
    icon: Clock,
    phoenix: "30 Minutes",
    stand: "~1 Hour",
    serviceFirst: "~1 Hour",
    amazon: "Varies",
    oldGlory: "Varies",
    highlight: false,
  },
  {
    feature: "USA-Based Support",
    description: "",
    icon: Phone,
    phoenix: "BBB A+ Rated",
    stand: "Offshore",
    serviceFirst: "Mixed",
    amazon: "None",
    oldGlory: "Mixed",
    highlight: true,
  },
  {
    feature: "Family of Veterans Owned",
    description: "",
    icon: Users,
    phoenix: "✓",
    stand: "✗",
    serviceFirst: "✗",
    amazon: "✗",
    oldGlory: "✗",
    highlight: false,
  },
]

export function PhoenixVsCompetition() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-[#0B1C2C] to-[#1A2F44] text-white px-6 py-2 mb-4 font-bold text-sm tracking-widest uppercase rounded-full shadow-lg">
            THE COMPARISON
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0B1C2C] mb-4 leading-tight">
            Why Homeowners Choose the Phoenix Flagpole
            <br />
            <span className="text-[#C8A55C]">Over the Rest</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See the clear difference. Quality, durability, and American craftsmanship that stands above all competitors.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-2 p-6 bg-gradient-to-r from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C]">
              <div className="text-sm font-bold text-white/90 flex items-center">Feature / Brand</div>
              {competitors.map((comp) => (
                <div key={comp.key} className="text-center">
                  {comp.highlight ? (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-[#0B1C2C] px-4 py-2 rounded-full font-bold text-sm shadow-lg transform hover:scale-105 transition-transform">
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
              {comparisons.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-6 gap-2 p-4 transition-all duration-300 hover:bg-[#C8A55C]/5 group ${
                      item.highlight ? "bg-gradient-to-r from-[#C8A55C]/10 to-transparent" : "bg-white"
                    }`}
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

                    {/* Phoenix Column */}
                    <div className="flex justify-center items-center">
                      {item.phoenix === "✓" ? (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg group-hover:scale-110 transition-transform">
                          <Check className="w-6 h-6 text-white stroke-[3]" />
                        </div>
                      ) : item.phoenix === "✗" ? (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg group-hover:scale-110 transition-transform">
                          <X className="w-6 h-6 text-white stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                          {item.phoenix}
                        </span>
                      )}
                    </div>

                    {/* Competitor Columns */}
                    {["stand", "serviceFirst", "amazon", "oldGlory"].map((key) => {
                      const value = item[key as keyof typeof item] as string
                      return (
                        <div key={key} className="flex justify-center items-center">
                          {value === "✓" ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                              <Check className="w-5 h-5 text-gray-500" />
                            </div>
                          ) : value === "✗" ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                              <X className="w-5 h-5 text-red-400" />
                            </div>
                          ) : (
                            <span className="text-xs text-gray-600 text-center px-2">{value}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-6 gap-2 p-6 bg-gradient-to-r from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C]">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-[#C8A55C] mr-2" />
                <span className="text-sm font-bold text-white">Starting Price</span>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C8A55C] mb-1">$999</div>
                <div className="text-xs text-white/70">Lifetime Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white/60">$299+</div>
                <div className="text-xs text-white/40">Limited warranty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white/60">$249+</div>
                <div className="text-xs text-white/40">Mixed support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white/60">$199+</div>
                <div className="text-xs text-white/40">No warranty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white/60">$279+</div>
                <div className="text-xs text-white/40">Limited features</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16">
            {[
              { value: "35,000+", label: "Happy American Patriots", icon: Heart },
              { value: "4.9★", label: "Average Rating (2,847 Reviews)", icon: Award },
              { value: "<5%", label: "Return Rate", icon: Shield },
            ].map((stat, idx) => {
              const StatIcon = stat.icon
              return (
                <div
                  key={idx}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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
        </div>
      </div>
    </section>
  )
}
