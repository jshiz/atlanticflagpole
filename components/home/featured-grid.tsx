import type React from "react"
import { Shield, Gem, Award } from "lucide-react"

type Feature = {
  icon: React.ReactNode
  title: string
  body: string
}

type FeaturedGridProps = {
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon: <Shield className="w-12 h-12 text-[#C8A55C]" />,
    title: "Durability",
    body: "Aircraft-grade aluminum for all-season strength",
  },
  {
    icon: <Gem className="w-12 h-12 text-[#C8A55C]" />,
    title: "Premium Materials",
    body: "Satin anodized finish for lasting brilliance",
  },
  {
    icon: <Award className="w-12 h-12 text-[#C8A55C]" />,
    title: "Lifetime Guarantee",
    body: "Backed for life",
  },
]

export function FeaturedGrid({ features = defaultFeatures }: FeaturedGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#C8A55C]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-3">{feature.title}</h3>
              <p className="text-[#333333] leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
