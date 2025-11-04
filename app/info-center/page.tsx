import Link from "next/link"
import type { Metadata } from "next"
import { BookOpen, Wrench, Shield, Wind, Ruler, Flag, ShoppingCart, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Info Center | Atlantic Flagpole",
  description:
    "Comprehensive guides and resources for flagpole selection, installation, maintenance, and flag etiquette. Expert advice from Atlantic Flagpole.",
}

const infoCategories = [
  {
    title: "365-Day Home Trial",
    description: "Try the Phoenix Flagpole risk-free for a full year",
    href: "/info-center/phoenix-365-day-home-trial",
    icon: Heart,
    color: "bg-[#E63946]",
  },
  {
    title: "Flagpole Buying Guide",
    description: "Expert advice on choosing the perfect flagpole for your needs",
    href: "/info-center/flagpole-buying-guide",
    icon: ShoppingCart,
    color: "bg-[#1F6FFF]",
  },
  {
    title: "Installation Guide",
    description: "Step-by-step instructions for professional flagpole installation",
    href: "/info-center/installation-guide",
    icon: Wrench,
    color: "bg-[#C8A55C]",
  },
  {
    title: "Flag Care & Maintenance",
    description: "Keep your flag and flagpole looking great for years",
    href: "/info-center/flag-care-and-maintenance",
    icon: Flag,
    color: "bg-[#0A2740]",
  },
  {
    title: "Flag Etiquette Guide",
    description: "Proper flag display rules and American flag etiquette",
    href: "/info-center/flag-etiquette",
    icon: BookOpen,
    color: "bg-[#8B1E2B]",
  },
  {
    title: "Warranty Information",
    description: "Understand your lifetime warranty coverage and benefits",
    href: "/info-center/warranty-information",
    icon: Shield,
    color: "bg-[#1F6FFF]",
  },
  {
    title: "Wind Resistance Guide",
    description: "Understanding wind ratings and choosing the right flagpole",
    href: "/info-center/wind-resistance-guide",
    icon: Wind,
    color: "bg-[#0A2740]",
  },
  {
    title: "Sizing Guide",
    description: "How to choose the perfect flagpole height and flag size",
    href: "/info-center/sizing-guide",
    icon: Ruler,
    color: "bg-[#C8A55C]",
  },
]

export default function InfoCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Atlantic Flagpole Info Center
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Everything you need to know about flagpoles, flags, installation, and maintenance. Expert guides and
              resources to help you make the best decision and get the most from your flagpole.
            </p>
          </div>
        </div>
      </div>

      {/* Info Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#C8A55C]/30"
                >
                  <div className="p-6">
                    <div
                      className={`${category.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                    <div className="mt-4 text-[#1F6FFF] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Guide
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#C8A55C] to-[#B8954C] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-8 text-white/90">
              Our flagpole experts are here to help you find the perfect solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#0B1C2C] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                href="tel:518-400-0765"
                className="bg-[#E63946] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D62839] transition-colors shadow-lg"
              >
                Call 518-400-0765
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
