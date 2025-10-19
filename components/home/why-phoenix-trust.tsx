"use client"

import Link from "next/link"
import { Shield, Award, Users, Truck, Heart, CheckCircle } from "lucide-react"

const trustReasons = [
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Lifetime Warranty",
    description: "Every flagpole backed by our lifetime guarantee. If it breaks, we replace it. Period.",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Made in USA",
    description: "Proudly manufactured in America with aircraft-grade aluminum and premium craftsmanship.",
    color: "from-red-600 to-red-800",
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "35,000+ Happy Customers",
    description: "Join thousands of satisfied customers who trust Atlantic Flagpole for their homes.",
    color: "from-[#C8A55C] to-[#B8954C]",
  },
  {
    icon: <Truck className="w-12 h-12" />,
    title: "Free Fast Shipping",
    description: "Ships in 1-2 business days. Free shipping on all orders. No hidden fees.",
    color: "from-green-600 to-green-800",
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: "1% for the Planet",
    description: "We donate 1% of sales to environmental causes. Your purchase makes a difference.",
    color: "from-teal-600 to-teal-800",
  },
  {
    icon: <CheckCircle className="w-12 h-12" />,
    title: "365-Day Trial",
    description: "Not satisfied? Return it within a year for a full refund. No questions asked.",
    color: "from-purple-600 to-purple-800",
  },
]

export function WhyPhoenixTrust() {
  return (
    <section className="py-16 md:py-24 bg-[#0B1C2C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#C8A55C] text-[#0B1C2C] px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            THE PHOENIX DIFFERENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why 35,000+ Americans Trust Phoenix</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We're not just selling flagpoles. We're helping you display your pride with confidence.
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trustReasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#C8A55C]/50"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${reason.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-white/70 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#C8A55C] to-[#B8954C] rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-4">
            Not Sure Which Flagpole Is Right for You?
          </h3>
          <p className="text-lg text-[#0B1C2C]/80 mb-6 max-w-2xl mx-auto">
            Take our quick 60-second quiz and we'll recommend the perfect flagpole for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-[#0B1C2C] hover:bg-[#1A2F44] text-white font-bold text-lg py-4 px-8 rounded-md transition-colors"
            >
              Take the Quiz
            </Link>
            <Link
              href="/flagpole-finder"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0B1C2C] font-bold text-lg py-4 px-8 rounded-md transition-colors"
            >
              Use Flagpole Finder
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
