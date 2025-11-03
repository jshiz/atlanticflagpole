import Link from "next/link"
import { ArrowRight } from "lucide-react"

const sizes = [
  {
    size: "15'",
    bestFor: "Suburban homes or smaller yards",
    price: "$779.71",
    href: "/products/15-phoenix-telescoping-flagpole-kit",
  },
  {
    size: "20'",
    bestFor: "Most popular – ideal for standard homes",
    price: "$979.71",
    badge: "BEST SELLER",
    href: "/products/20-phoenix-telescoping-flagpole-kit",
  },
  {
    size: "25'",
    bestFor: "Farms, open spaces, maximum visibility",
    price: "$1,079.71",
    href: "/products/25-phoenix-telescoping-flagpole-kit",
  },
]

export function SizeSelector() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3">
            Choose the Perfect Height for Your Property
          </h2>
          <p className="text-base md:text-lg text-[#666666] max-w-3xl mx-auto">
            All heights are <strong>installed height above ground</strong> — with an extra 1.5' for foundation depth.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sizes.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group relative bg-gradient-to-br from-[#F5F3EF] to-white rounded-xl p-6 border-2 border-[#E5E3DF] hover:border-[#C8A55C] transition-all duration-300 hover:shadow-xl"
              >
                {item.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C8A55C] text-[#0B1C2C] px-4 py-1 text-xs font-bold tracking-wider uppercase rounded-full shadow-md">
                    {item.badge}
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="text-5xl md:text-6xl font-bold text-[#0B1C2C] mb-2">{item.size}</div>
                  <div className="text-sm text-[#666666] font-medium min-h-[40px] flex items-center justify-center">
                    {item.bestFor}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-xs text-[#999999] uppercase tracking-wide mb-1">Starting at</div>
                  <div className="text-3xl font-bold text-[#0B1C2C]">{item.price}</div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#C8A55C] font-semibold text-sm group-hover:gap-3 transition-all">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0B1C2C] hover:bg-[#1A2F44] text-white font-bold text-base py-3 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
            >
              Choose Your Size
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
