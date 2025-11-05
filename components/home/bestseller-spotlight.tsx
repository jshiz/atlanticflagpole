import Link from "next/link"
import { Star, ShoppingCart, CheckCircle, Award, Shield, TrendingUp, Clock } from "lucide-react"
import { getProduct, getProductImage } from "@/lib/shopify"
import Image from "next/image"

export async function BestsellerSpotlight() {
  // Fetch the actual Phoenix flagpole product from Shopify
  let product = null
  try {
    product = await getProduct("phoenix-telescoping-flagpole-premier-kit-starter-bundle")

    console.log("[v0] BestsellerSpotlight - Full product data:", {
      title: product?.title,
      handle: product?.handle,
      hasProduct: !!product,
      imagesStructure: product?.images
        ? {
            hasNodes: !!product.images.nodes,
            nodesLength: product.images.nodes?.length,
            firstNodeUrl: product.images.nodes?.[0]?.url,
            hasDirectArray: Array.isArray(product.images),
            directArrayLength: Array.isArray(product.images) ? product.images.length : 0,
          }
        : null,
    })

    const imageUrl = getProductImage(product)
    console.log("[v0] BestsellerSpotlight - Product fetched:", {
      title: product?.title,
      hasImage: !!imageUrl,
      imageUrl,
    })
  } catch (error) {
    console.error("[v0] BestsellerSpotlight: Failed to fetch product", error)
  }

  const productImage = getProductImage(product)
  const hasValidImage = !!productImage

  const displayImage = productImage || "/placeholder.svg?height=600&width=600&text=Phoenix+Flagpole+Kit"

  const productPrice = product?.priceRange?.minVariantPrice?.amount
    ? `$${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
    : "$999.71"
  const productHandle = product?.handle || "phoenix-telescoping-flagpole-premier-kit-starter-bundle"
  const productTitle = product?.title || "Phoenix Telescoping Flagpole Premier Kit Starter Bundle"

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
                  src={displayImage || "/placeholder.svg"}
                  alt={productTitle}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={!hasValidImage}
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 mb-4 rounded-full">
                <Award className="w-4 h-4 text-[#C8A55C]" />
                <span className="text-sm font-semibold">Veteran Approved</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">America's #1 Flagpole Kit</h2>

              <p className="text-xl text-white/90 mb-6 font-semibold">
                Everything You Need. Nothing You Don't. Trusted by 33,000+ American Homes.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-[#C8A55C]" />
                    <span className="font-bold text-lg">LIFETIME</span>
                  </div>
                  <p className="text-sm text-white/70">Warranty</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-5 h-5 text-[#C8A55C]" />
                    <span className="font-bold text-lg">365-DAY</span>
                  </div>
                  <p className="text-sm text-white/70">Money Back</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-[#C8A55C]" />
                    <span className="font-bold text-lg">100 MPH</span>
                  </div>
                  <p className="text-sm text-white/70">Wind Rated</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-5 h-5 text-[#C8A55C]" />
                    <span className="font-bold text-lg">NO ROPES</span>
                  </div>
                  <p className="text-sm text-white/70">Easy Setup</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#C8A55C]/20 to-[#C8A55C]/10 backdrop-blur-sm rounded-xl p-6 mb-6 border-2 border-[#C8A55C]/40">
                {/* Rating at top of price card */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C8A55C] text-[#C8A55C]" />
                    ))}
                  </div>
                  <span className="text-white font-bold">5.0</span>
                  <span className="text-white/60 text-sm">(2,847 reviews)</span>
                </div>

                {/* Price section */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm text-white/60 uppercase tracking-wide">Starting at</span>
                  <span className="text-5xl font-bold text-white">{productPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SAVE $200</span>
                  <span className="text-white/70 text-sm line-through">$1,199.71</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {[
                  "Includes Premium 4×6' American Flag",
                  "Pre-Assembled - Install in 30 Minutes",
                  "20' Height Perfect for Residential Use",
                  "Made in USA with American Pride",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/products/${productHandle}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-lg py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Claim Your Discount
                </Link>
                <Link
                  href={`/products/${productHandle}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-lg py-4 px-8 rounded-lg transition-colors border-2 border-white/30"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C8A55C]" />
                  <span>33,784+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
