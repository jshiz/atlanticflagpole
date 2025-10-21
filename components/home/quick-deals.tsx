import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Clock, TrendingUp, Star, Package } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { getJudgemeStats } from "@/lib/judgeme"
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll"

export async function QuickDeals() {
  const products = await getProducts({ first: 8, sortKey: "BEST_SELLING" })
  const judgemeStats = await getJudgemeStats()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-[#C8A55C]" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C]">Quick Deals</h2>
              </div>
              <p className="text-lg text-[#0B1C2C]/70">Limited time offers on our most popular bundles</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-red-600">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Ends Soon</span>
            </div>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
            const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
              ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
              : null
            const hasDiscount = compareAtPrice && compareAtPrice > price
            const savingsPercent = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0
            const image = product.images.nodes[0]
            const isBundle =
              product.title.toLowerCase().includes("kit") || product.title.toLowerCase().includes("bundle")

            return (
              <FadeInOnScroll key={product.id} delay={index * 100}>
                <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-[#C8A55C]">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {image && (
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {hasDiscount && (
                      <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-lg px-3 py-1">
                        {savingsPercent}% OFF
                      </Badge>
                    )}
                    {isBundle && (
                      <Badge className="absolute top-4 left-4 bg-[#C8A55C] hover:bg-[#a88947] text-white text-xs px-2 py-1 flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        Complete Kit
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(judgemeStats.averageRating)
                              ? "fill-[#C8A55C] text-[#C8A55C]"
                              : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-[#0B1C2C]/60 ml-1">
                        ({judgemeStats.totalReviews.toLocaleString()})
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2 line-clamp-2 min-h-[56px]">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-[#C8A55C]">${price.toFixed(2)}</span>
                      {hasDiscount && compareAtPrice && (
                        <span className="text-lg text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>

                    {hasDiscount && compareAtPrice && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800 font-semibold">
                          Save ${(compareAtPrice - price).toFixed(2)} Today!
                        </p>
                      </div>
                    )}

                    <Button asChild className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-semibold">
                      <Link href={`/products/${product.handle}`}>View Deal</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            )
          })}
        </div>

        <FadeInOnScroll delay={800}>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold bg-transparent border-2 border-[#C8A55C] text-[#C8A55C] hover:bg-[#C8A55C] hover:text-white"
            >
              <Link href="/bundle-builder">
                <Package className="w-5 h-5 mr-2" />
                Build Your Own Bundle →
              </Link>
            </Button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
