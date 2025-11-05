import Link from "next/link"
import { Star, ShoppingCart, CheckCircle, Award, Shield } from "lucide-react"
import { getProduct } from "@/lib/shopify"
import Image from "next/image"

export async function BestsellerSpotlight() {
  // Fetch the actual Phoenix flagpole product from Shopify
  const product = await getProduct("20-phoenix-telescoping-flagpole-kit")

  // Use real product data or fallback to defaults
  const productImage =
    product?.images?.[0]?.url ||
    "https://cdn.shopify.com/s/files/1/2133/9559/files/20-foot-phoenix-telescoping-flagpole-kit-midnight-bronze-finish.jpg?v=1687894210"
  const productPrice = product?.priceRange?.minVariantPrice?.amount
    ? `$${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
    : "$999.71"
  const productHandle = product?.handle || "20-phoenix-telescoping-flagpole-kit"
  const productTitle = product?.title || "20' Midnight Bronze Phoenix Flagpole Kit"
  const productDescription =
    product?.description ||
    "Our most popular flagpole kit combines premium quality with unbeatable value. Trusted by over 33,000 American homes, this complete kit includes everything you need for a professional installation. Built to last with our lifetime warranty and backed by a full year trial period."

  console.log("[v0] BestsellerSpotlight - Product fetched:", {
    title: productTitle,
    hasImage: !!product?.images?.[0]?.url,
    imageUrl: productImage,
  })

  return (
    <section id="bestseller" className="py-16 md:py-24 bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-[#C8A55C] text-[#0B1C2C] px-6 py-3 font-bold text-sm tracking-wider uppercase rounded-lg shadow-xl z-10">
                BEST SELLER
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-[#C8A55C]/30 bg-white">
                <Image
                  src={productImage || "/placeholder.svg"}
                  alt={productTitle}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-[#0B1C2C] px-6 py-4 rounded-lg shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C8A55C] text-[#C8A55C]" />
                  ))}
                </div>
                <p className="text-sm font-bold">5.0 (2,847 reviews)</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 mb-4 rounded-full">
                <Award className="w-4 h-4 text-[#C8A55C]" />
                <span className="text-sm font-semibold">Veteran Approved</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">America's #1 Flagpole Kit</h2>

              <p className="text-xl text-white/80 mb-6">{productDescription}</p>

              <div className="space-y-3 mb-8">
                {[
                  "20' Height • Wind Rated 100 MPH",
                  "Includes Premium 4×6' Flag",
                  "Pre-Assembled • No Ropes",
                  "365-Day Trial + Lifetime Warranty",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                    <span className="text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm text-white/60 uppercase tracking-wide">From</span>
                  <span className="text-5xl font-bold text-white">{productPrice}</span>
                </div>
                <p className="text-sm text-white/70">Midnight Bronze finish</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/products/${productHandle}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-lg py-4 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order Now
                </Link>
                <Link
                  href={`/products/${productHandle}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg py-4 px-8 rounded-md transition-colors border-2 border-white/30"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#C8A55C]" />
                  <span>33,784+ Homes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
