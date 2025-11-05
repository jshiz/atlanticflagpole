"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ShopifyProduct } from "@/lib/shopify"
import { MadeInUSABadge } from "./made-in-usa-badge"

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

  const images = product.images?.nodes || []
  const featuredImage = images[0] || product.featuredImage

  return (
    <Link href={`/products/${product.handle}`} className="cursor-pointer">
      <Card
        className={`group overflow-hidden hover:shadow-lg transition-all duration-300 h-full ${
          hasDiscount ? "sale-glow" : ""
        }`}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-50">
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
          <MadeInUSABadge product={product} />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-[#0B1C2C] mb-2 line-clamp-2 group-hover:text-[#C8A55C] transition-colors">
            {product.title}
          </h3>
          {product.description && <p className="text-sm text-[#0B1C2C]/70 line-clamp-2 mb-3">{product.description}</p>}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center gap-2 flex-wrap">
          <span className="text-xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</span>
          {hasDiscount && compareAtPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
              <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold">{discountPercentage}% OFF</Badge>
            </>
          )}
        </CardFooter>
      </Card>

      <style jsx>{`
        @keyframes subtle-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(220, 38, 38, 0.1), 0 0 10px rgba(220, 38, 38, 0.05);
          }
          50% {
            box-shadow: 0 0 10px rgba(220, 38, 38, 0.2), 0 0 20px rgba(220, 38, 38, 0.1);
          }
        }
        
        :global(.sale-glow) {
          animation: subtle-glow 3s ease-in-out infinite;
        }
      `}</style>
    </Link>
  )
}
