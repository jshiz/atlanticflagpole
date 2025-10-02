"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { UserPreferences } from "./flagpole-finder"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { getProducts } from "@/lib/shopify"
import { CheckCircle2, Loader2, RotateCcw, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type ResultsStepProps = {
  preferences: UserPreferences
  onReset: () => void
}

export function ResultsStep({ preferences, onReset }: ResultsStepProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true)
        setError(null)

        // Fetch all products
        const allProducts = await getProducts({ first: 50 })

        // Filter products based on preferences
        const filtered = filterProductsByPreferences(allProducts, preferences)

        setProducts(filtered.slice(0, 6)) // Show top 6 recommendations
      } catch (err) {
        console.error("[v0] Error fetching recommendations:", err)
        setError("Unable to load recommendations. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [preferences])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-afp-gold" />
          <p className="text-lg text-afp-charcoal">Finding your perfect flagpole...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-2 border-red-200 bg-red-50 p-8 text-center">
        <p className="mb-4 text-lg text-red-800">{error}</p>
        <Button onClick={onReset} variant="outline">
          Try Again
        </Button>
      </Card>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold text-afp-navy md:text-4xl">Your Perfect Matches</h2>
        </div>
        <p className="text-lg text-afp-charcoal">Based on your preferences, we recommend these flagpoles:</p>
      </div>

      {/* Preferences Summary */}
      <Card className="mb-8 border-2 border-afp-navy/10 bg-white p-6">
        <h3 className="mb-4 text-xl font-semibold text-afp-navy">Your Preferences</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-afp-navy text-white">
            {getPreferenceLabel("usage", preferences.usage)}
          </Badge>
          <Badge variant="secondary" className="bg-afp-navy text-white">
            {getPreferenceLabel("flagSize", preferences.flagSize)}
          </Badge>
          <Badge variant="secondary" className="bg-afp-navy text-white">
            {getPreferenceLabel("height", preferences.height)}
          </Badge>
          <Badge variant="secondary" className="bg-afp-navy text-white">
            {getPreferenceLabel("budget", preferences.budget)}
          </Badge>
          <Badge variant="secondary" className="bg-afp-navy text-white">
            {getPreferenceLabel("installation", preferences.installation)}
          </Badge>
        </div>
        <Button onClick={onReset} variant="ghost" size="sm" className="mt-4 text-afp-gold hover:text-afp-gold-700">
          <RotateCcw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </Card>

      {/* Product Recommendations */}
      {products.length === 0 ? (
        <Card className="border-2 border-afp-navy/10 bg-white p-8 text-center">
          <p className="mb-4 text-lg text-afp-charcoal">
            We couldn't find exact matches for your preferences, but we have many other options available.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="btn-gold">
              <Link href="/products">Browse All Products</Link>
            </Button>
            <Button onClick={onReset} variant="outline" className="border-afp-navy text-afp-navy bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Different Preferences
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-afp-gold bg-afp-navy p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">Need Help Deciding?</h3>
            <p className="mb-6 text-afp-ivory">Our flagpole experts are here to help you make the perfect choice.</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild className="btn-gold">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-afp-gold bg-transparent text-afp-gold hover:bg-afp-gold hover:text-afp-navy"
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images?.nodes?.[0]
  const price = product.priceRange?.minVariantPrice
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice

  const hasDiscount = compareAtPrice && Number.parseFloat(compareAtPrice.amount) > Number.parseFloat(price.amount)

  return (
    <Card className="group overflow-hidden border-2 border-afp-navy/10 transition-all hover:border-afp-gold hover:shadow-lg">
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {hasDiscount && <Badge className="absolute right-2 top-2 bg-red-600 text-white">Sale</Badge>}
        </div>
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-afp-navy group-hover:text-afp-gold">
            {product.title}
          </h3>
          {product.description && (
            <p className="mb-3 line-clamp-2 text-sm text-afp-charcoal/70">{product.description}</p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-afp-navy">${Number.parseFloat(price.amount).toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${Number.parseFloat(compareAtPrice.amount).toFixed(2)}
              </span>
            )}
          </div>
          <Button className="mt-4 w-full btn-gold group-hover:bg-afp-gold-700">
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Link>
    </Card>
  )
}

// Helper function to filter products based on user preferences
function filterProductsByPreferences(products: ShopifyProduct[], preferences: UserPreferences): ShopifyProduct[] {
  return products.filter((product) => {
    const title = product.title.toLowerCase()
    const description = product.description?.toLowerCase() || ""
    const tags = product.tags?.map((t) => t.toLowerCase()) || []
    const productType = product.productType?.toLowerCase() || ""
    const price = Number.parseFloat(product.priceRange?.minVariantPrice?.amount || "0")

    // Filter by usage type
    if (
      preferences.usage === "residential" &&
      !matchesUsage(title, description, tags, ["residential", "home", "yard"])
    ) {
      return false
    }
    if (preferences.usage === "commercial" && !matchesUsage(title, description, tags, ["commercial", "business"])) {
      return false
    }
    if (
      preferences.usage === "government" &&
      !matchesUsage(title, description, tags, ["government", "municipal", "institutional"])
    ) {
      return false
    }

    // Filter by height
    if (preferences.height === "short" && !matchesHeight(title, description, [15, 16, 17, 18, 19, 20])) {
      return false
    }
    if (
      preferences.height === "medium" &&
      !matchesHeight(title, description, [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
    ) {
      return false
    }
    if (preferences.height === "tall" && !matchesHeight(title, description, [30, 35, 40, 45, 50])) {
      return false
    }
    if (preferences.height === "very-tall" && !matchesHeight(title, description, [50, 55, 60, 65, 70, 75, 80])) {
      return false
    }

    // Filter by budget
    if (preferences.budget === "economy" && price > 500) {
      return false
    }
    if (preferences.budget === "standard" && (price < 500 || price > 1500)) {
      return false
    }
    if (preferences.budget === "premium" && (price < 1500 || price > 3000)) {
      return false
    }
    if (preferences.budget === "luxury" && price < 3000) {
      return false
    }

    return true
  })
}

function matchesUsage(title: string, description: string, tags: string[], keywords: string[]): boolean {
  const searchText = `${title} ${description} ${tags.join(" ")}`
  return keywords.some((keyword) => searchText.includes(keyword))
}

function matchesHeight(title: string, description: string, heights: number[]): boolean {
  const searchText = `${title} ${description}`
  return heights.some((height) => {
    return searchText.includes(`${height}`) || searchText.includes(`${height}'`) || searchText.includes(`${height} ft`)
  })
}

function getPreferenceLabel(key: string, value: string): string {
  const labels: Record<string, Record<string, string>> = {
    usage: {
      residential: "Residential",
      commercial: "Commercial",
      government: "Government",
      memorial: "Memorial",
    },
    flagSize: {
      small: "Small Flag (2-3')",
      medium: "Medium Flag (4-5')",
      large: "Large Flag (6'+)",
      unsure: "Flag Size TBD",
    },
    height: {
      short: "15-20 feet",
      medium: "20-30 feet",
      tall: "30-50 feet",
      "very-tall": "50+ feet",
    },
    budget: {
      economy: "Under $500",
      standard: "$500-$1,500",
      premium: "$1,500-$3,000",
      luxury: "$3,000+",
    },
    installation: {
      diy: "DIY Install",
      professional: "Pro Install",
      "ground-sleeve": "Ground Sleeve",
      "wall-mount": "Wall Mount",
    },
  }

  return labels[key]?.[value] || value
}
