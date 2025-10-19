import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingCart, ArrowRight, Package, TrendingUp } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { getJudgemeStats } from "@/lib/judgeme"
import { toNodes } from "@/lib/connection"

export async function FeaturedProductsShowcase() {
  const allProducts = await getProducts({ first: 20, sortKey: "PRICE" })
  const bundleProducts = allProducts
    .filter((p) => p.title.toLowerCase().includes("kit") || p.title.toLowerCase().includes("bundle"))
    .slice(0, 4)

  const judgemeStats = await getJudgemeStats()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F5F3EF]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            <Package className="w-4 h-4" />
            PREMIUM BUNDLES & KITS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-4">America's Most Trusted Flagpole Kits</h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Complete packages with everything you need. Handcrafted with aircraft-grade aluminum. Built to last a
            lifetime.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bundleProducts.map((product) => {
            const variant = toNodes(product.variants)[0]
            const price = variant ? Number.parseFloat(variant.price.amount) : 0
            const compareAtPrice = variant?.compareAtPrice ? Number.parseFloat(variant.compareAtPrice.amount) : null
            const hasDiscount = compareAtPrice && compareAtPrice > price
            const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0
            const savings = hasDiscount && compareAtPrice ? compareAtPrice - price : 0
            const image = toNodes(product.images)[0]

            return (
              <Link key={product.id} href={`/products/${product.handle}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#C8A55C]">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#F5F3EF]">
                    {image && (
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    {hasDiscount && (
                      <>
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
                          SAVE {discountPercentage}%
                        </div>
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
                          ${savings.toFixed(0)} OFF
                        </div>
                      </>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#0B1C2C]/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-semibold">✓ Complete Kit - Everything Included</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(judgemeStats.averageRating)
                                ? "fill-[#C8A55C] text-[#C8A55C]"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#666666]">
                        {judgemeStats.averageRating.toFixed(1)} ({judgemeStats.totalReviews})
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#0B1C2C] mb-3 line-clamp-2 min-h-[56px] text-balance">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
                      {hasDiscount && compareAtPrice && (
                        <span className="text-sm text-[#999999] line-through">${compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Value Props */}
                    <div className="space-y-1.5 mb-4 text-xs text-[#0B1C2C]/70">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                        <span>Free Shipping & Installation Guide</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        <span>Lifetime Warranty Included</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A55C]"></div>
                        <span>Made in USA - Premium Quality</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-sm py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                      <ShoppingCart className="w-4 h-4" />
                      View Complete Kit
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0B1C2C] hover:bg-[#1A2F44] text-white font-bold text-lg py-4 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
          >
            <TrendingUp className="w-5 h-5" />
            View All Premium Kits
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
