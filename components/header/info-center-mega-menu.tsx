"use client"

import Link from "next/link"
import { BookOpen, Wrench, Shield, Wind, Ruler, Flag, ShoppingCart, Heart } from "lucide-react"

interface InfoCenterMegaMenuProps {
  onLinkClick?: () => void
}

const infoCategories = [
  {
    title: "365-Day Home Trial",
    subtitle: "Try Phoenix risk-free for a full year",
    href: "/info-center/phoenix-365-day-home-trial",
    icon: Heart,
    color: "bg-[#E63946]",
  },
  {
    title: "Buying Guide",
    subtitle: "Expert advice on choosing your flagpole",
    href: "/info-center/flagpole-buying-guide",
    icon: ShoppingCart,
    color: "bg-[#1F6FFF]",
  },
  {
    title: "Installation Guide",
    subtitle: "Step-by-step installation instructions",
    href: "/info-center/installation-guide",
    icon: Wrench,
    color: "bg-[#C8A55C]",
  },
  {
    title: "Flag Care",
    subtitle: "Maintenance tips and best practices",
    href: "/info-center/flag-care-and-maintenance",
    icon: Flag,
    color: "bg-[#0A2740]",
  },
  {
    title: "Flag Etiquette",
    subtitle: "Proper display rules and etiquette",
    href: "/info-center/flag-etiquette",
    icon: BookOpen,
    color: "bg-[#8B1E2B]",
  },
  {
    title: "Warranty Info",
    subtitle: "Lifetime warranty coverage details",
    href: "/info-center/warranty-information",
    icon: Shield,
    color: "bg-[#1F6FFF]",
  },
  {
    title: "Wind Resistance",
    subtitle: "Understanding wind ratings",
    href: "/info-center/wind-resistance-guide",
    icon: Wind,
    color: "bg-[#0A2740]",
  },
  {
    title: "Sizing Guide",
    subtitle: "Choose the perfect height and size",
    href: "/info-center/sizing-guide",
    icon: Ruler,
    color: "bg-[#C8A55C]",
  },
]

export function InfoCenterMegaMenu({ onLinkClick }: InfoCenterMegaMenuProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-bold text-[#0B1C2C] mb-2">Info Center</h3>
        <p className="text-gray-600 text-sm">Expert guides and resources for your flagpole journey</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {infoCategories.map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.href}
              href={category.href}
              onClick={onLinkClick}
              className="group bg-white hover:bg-[#F5F3EF] rounded-lg p-3 transition-colors duration-200 border border-gray-100 hover:border-[#C8A55C] hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`${category.color} w-11 h-11 rounded-lg flex items-center justify-center mb-2.5 transition-colors`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h4 className="text-sm font-bold text-[#0B1C2C] mb-1 group-hover:text-[#C8A55C] transition-colors">
                  {category.title}
                </h4>
                <p className="text-xs text-gray-500 leading-snug">{category.subtitle}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="flex justify-center mt-5">
        <Link
          href="/info-center"
          onClick={onLinkClick}
          className="bg-[#C8A55C] hover:bg-[#B8954C] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-md hover:shadow-lg"
        >
          View All Guides
        </Link>
      </div>
    </div>
  )
}
