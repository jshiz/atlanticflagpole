"use client"

import { useEffect, useState } from "react"
import { useGeo } from "@/lib/geo/context"
import { buildGeoQuery } from "@/lib/geo/mapping"
import { trackGeoClick } from "@/lib/analytics/geoEvents"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import type { GeoProduct } from "@/lib/shopify/queries/geoProducts"

interface LocalizedRecommendationsProps {
  fallbackProducts: GeoProduct[]
}

export function LocalizedRecommendations({ fallbackProducts }: LocalizedRecommendationsProps) {
  const { location, loading, variant } = useGeo()
  const [products, setProducts] = useState<GeoProduct[]>(fallbackProducts)
  const [title, setTitle] = useState("You Might Also Like")

  useEffect(() => {
    if (!location?.region_code) {
      setProducts(fallbackProducts)
      return
    }

    const query = buildGeoQuery(location.region_code)
    if (!query) {
      setProducts(fallbackProducts)
      return
    }

    // Fetch geo-personalized products
    fetch(`/api/geo/products?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products)
          setTitle(`Popular in ${location.region}`)
          console.log("[v0] Loaded geo products for:", location.region_code)
        } else {
          setProducts(fallbackProducts)
        }
      })
      .catch(() => {
        setProducts(fallbackProducts)
      })
  }, [location, fallbackProducts])

  if (loading || products.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-2">{title}</h2>
        <p className="text-[#0B1C2C]/60 mb-6">Discover products from different categories</p>

        {variant === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} location={location} variant={variant} />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-64 snap-start">
                <ProductCard product={product} location={location} variant={variant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  location,
  variant,
}: {
  product: GeoProduct
  location: any
  variant: "grid" | "carousel"
}) {
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
    ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onClick={() => {
        trackGeoClick({
          productId: product.id,
          handle: product.handle,
          location,
          variant,
        })
      }}
    >
      <div className="bg-[#F5F3EF] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {product.featuredImage && (
          <div className="relative aspect-square">
            <Image
              src={product.featuredImage.url || "/placeholder.svg"}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4">
          <h3 className="font-semibold text-[#1B365D] mb-2 line-clamp-2 group-hover:text-[#C8A55C] transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-[#1B365D]">${price.toFixed(2)}</span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="text-sm text-gray-500 line-through">${compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          <Button size="sm" className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-white">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
    </Link>
  )
}
