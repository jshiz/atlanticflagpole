import { getProducts } from "@/lib/shopify"
import { searchProducts } from "@/lib/shopify/catalog"
import type { ShopifyProduct } from "@/lib/shopify/types"

export interface PersonalizationData {
  location?: {
    state: string
    stateCode: string
  }
  purchaseHistory?: Array<{
    productId: string
    tags: string[]
    collections: string[]
  }>
  browsing?: {
    recentlyViewed: string[]
    categories: string[]
  }
}

export async function getPersonalizedRecommendations(data: PersonalizationData, limit = 12): Promise<ShopifyProduct[]> {
  const recommendations: ShopifyProduct[] = []

  // 1. State-specific products (if location available)
  if (data.location?.stateCode) {
    try {
      const stateProducts = await searchProducts({
        tag: `state-${data.location.stateCode.toLowerCase()}`,
        first: 4,
      })
      if (stateProducts?.nodes) {
        recommendations.push(...stateProducts.nodes)
      }
    } catch (error) {
      console.error("[v0] Error fetching state products:", error)
    }
  }

  // 2. Based on purchase history
  if (data.purchaseHistory && data.purchaseHistory.length > 0) {
    const tags = data.purchaseHistory.flatMap((p) => p.tags).slice(0, 3)
    for (const tag of tags) {
      try {
        const tagProducts = await searchProducts({ tag, first: 2 })
        if (tagProducts?.nodes) {
          recommendations.push(...tagProducts.nodes)
        }
      } catch (error) {
        console.error(`[v0] Error fetching products for tag ${tag}:`, error)
      }
    }
  }

  // 3. Trending/bestsellers as fallback
  try {
    const bestsellers = await getProducts({
      first: limit,
      sortKey: "BEST_SELLING",
    })
    if (bestsellers) {
      recommendations.push(...bestsellers)
    }
  } catch (error) {
    console.error("[v0] Error fetching bestsellers:", error)
  }

  // Remove duplicates and limit
  const uniqueProducts = Array.from(new Map(recommendations.map((p) => [p.id, p])).values())

  return uniqueProducts.slice(0, limit)
}
