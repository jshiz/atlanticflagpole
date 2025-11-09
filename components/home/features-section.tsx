"use client"
import { ChevronRight, Sparkles, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProduct, getProductImage } from "@/lib/shopify"
import { InteractiveComparison } from "./interactive-comparison"

const features = [
  {
    title: "Aerospace-Grade Aluminum",
    subtitle: "The same material used in fighter jets",
    description:
      "Our 6061-T6 aerospace aluminum is 3x stronger than standard poles. Wind-tested to 100 MPH, it stands firm through the toughest storms while never rusting or corroding.",
    stats: [
      { value: "100", unit: "MPH", label: "Wind Tested" },
      { value: "3x", unit: "", label: "Stronger" },
      { value: "∞", unit: "", label: "Lifetime" },
    ],
    image: "/images/products/flagpole-aluminum-quality.jpg",
  },
  {
    title: "30-Minute Installation",
    subtitle: "Anyone can do it—no special tools required",
    description:
      "While competitors require 2+ hours and professional help, our innovative design installs in just 30 minutes with basic tools. The Securi-LOK internal locking system means no rattles, ever.",
    stats: [
      { value: "30", unit: "min", label: "Install Time" },
      { value: "0", unit: "", label: "Tools Needed" },
      { value: "100%", unit: "", label: "Rattle-Free" },
    ],
    image: "/images/products/flagpole-installation-easy.jpg",
  },
]

export async function FeaturesSection() {
  const productHandles = [
    "phoenix-patriot-flagpole-kit-complete-bundle-with-solar-light-eagle",
    "patriot-glo-led-flagpole-christmas-tree-kit-20-25",
  ]

  const productPromises = productHandles.map((handle) => getProduct(handle))
  const productResults = await Promise.all(productPromises)
  const products = productResults.filter((p) => p !== null)

  const productSpotlights = products.map((product, index) => ({
    title: product.title,
    subtitle: product.description?.substring(0, 60) || "Complete flagpole bundle kit",
    price: `$${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
    image: getProductImage(product) || "/placeholder.svg?height=400&width=400",
    url: `/products/${product.handle}`,
    rating: 4.9,
    reviews: index === 0 ? 847 : 523,
    badge: index === 0 ? "Best Seller" : "Holiday Special",
  }))

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white via-[#F8F6F3] to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8A55C] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C8A55C] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A55C] via-[#D4B76A] to-[#C8A55C] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm mb-4 md:mb-6 shadow-xl">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            THE ATLANTIC DIFFERENCE
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#0B1C2C] mb-4 md:mb-6 leading-tight text-center px-2">
            Not All Flagpoles Are
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A55C] via-[#D4B76A] to-[#B8954C]">
              Created Equal
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#666666] leading-relaxed text-center px-2">
            Choose aerospace-grade quality from a veteran-owned family business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C] via-[#0B1C2C]/60 to-transparent" />
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 text-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-[#C8A55C] font-semibold text-sm md:text-base">{feature.subtitle}</p>
                </div>
              </div>

              <div className="p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-4 md:mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center justify-center gap-4 md:gap-8">
                  {feature.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#B8954C] flex items-center justify-center mb-2 shadow-lg">
                        <div className="text-center">
                          <div className="text-lg md:text-xl font-bold text-white leading-none">{stat.value}</div>
                          {stat.unit && <div className="text-xs text-white/90 leading-none mt-0.5">{stat.unit}</div>}
                        </div>
                      </div>
                      <div className="text-[10px] md:text-xs font-semibold text-[#0B1C2C] text-center">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1C2C] mb-2 md:mb-3 text-center px-2">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A55C] to-[#B8954C]">
                Bundle Kits
              </span>
            </h3>
            <p className="text-base md:text-lg text-[#666666] text-center px-2">
              Complete packages for hassle-free installation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {productSpotlights.map((product, index) => (
              <Link
                key={index}
                href={product.url}
                className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10 bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                    {product.badge}
                  </div>

                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-contain p-3 md:p-4 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#C8A55C] text-[#C8A55C]" />
                      ))}
                    </div>
                    <span className="text-[10px] md:text-xs text-[#666666]">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-[#0B1C2C] mb-2 line-clamp-2">{product.title}</h4>
                  <p className="text-xs md:text-sm text-[#666666] mb-3 md:mb-4 line-clamp-2">{product.subtitle}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-bold text-[#C8A55C]">{product.price}</span>
                    <button className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#C8A55C] to-[#D4B76A] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-xs md:text-sm">
                      <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <InteractiveComparison />

        <div className="text-center mt-8 md:mt-12">
          <a
            href="#bestseller"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#C8A55C] via-[#D4B76A] to-[#C8A55C] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Shop All Flagpoles
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
