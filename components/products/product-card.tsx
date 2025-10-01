import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ShopifyProduct } from "@/lib/shopify"

interface ProductCardProps {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
    ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null

  const hasDiscount = compareAtPrice && compareAtPrice > price
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0

  const featuredImage = product.images.edges[0]?.node

  return (
    <Link href={`/products/${product.handle}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative aspect-square overflow-hidden bg-white">
          {featuredImage ? (
            <Image
              src={featuredImage.url || "/placeholder.svg"}
              alt={featuredImage.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {hasDiscount && (
            <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700">{discountPercentage}% OFF</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-[#0B1C2C] mb-2 line-clamp-2 group-hover:text-[#C8A55C] transition-colors">
            {product.title}
          </h3>
          {product.description && <p className="text-sm text-[#0B1C2C]/70 line-clamp-2 mb-3">{product.description}</p>}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center gap-2">
          <span className="text-xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
          {hasDiscount && compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
