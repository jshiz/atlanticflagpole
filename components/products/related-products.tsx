import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ShopifyProduct } from "@/lib/shopify"
import { toNodes } from "@/lib/connection"

interface RelatedProductsProps {
  products: ShopifyProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <div className="py-12">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0B1C2C] mb-2">Recommended for you</h2>
      <p className="text-[#0B1C2C]/60 mb-8">Related Products</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.slice(0, 4).map((product) => {
          const variant = toNodes(product.variants)[0]
          const price = variant ? Number.parseFloat(variant.price.amount) : 0
          const compareAtPrice = variant?.compareAtPrice ? Number.parseFloat(variant.compareAtPrice.amount) : null
          const hasDiscount = compareAtPrice && compareAtPrice > price
          const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0
          const image = toNodes(product.images)[0]

          return (
            <Link key={product.id} href={`/products/${product.handle}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
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
                    <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-[#0B1C2C] mb-2 line-clamp-2 text-balance">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#C8A55C]">${price.toFixed(2)}</span>
                    {hasDiscount && compareAtPrice && (
                      <span className="text-sm text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
