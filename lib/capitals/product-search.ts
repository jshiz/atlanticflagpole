import { getAllProducts } from "@/lib/shopify"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { getTagsForState } from "@/lib/geo/mapping"

export interface StateProduct {
  product: ShopifyProduct
  relevanceScore: number
  matchType: "state" | "team" | "regional"
}

/**
 * Search for products related to a specific state by title and tags
 * Since tags aren't set up, we search by title keywords
 */
export async function searchStateProducts(stateCode: string, stateName: string): Promise<StateProduct[]> {
  const allProducts = await getAllProducts()
  const stateTags = getTagsForState(stateCode)

  const stateProducts: StateProduct[] = []

  for (const product of allProducts) {
    let relevanceScore = 0
    let matchType: "state" | "team" | "regional" = "regional"

    const title = product.title.toLowerCase()
    const description = (product.description || "").toLowerCase()
    const tags = (product.tags || []).map((t) => t.toLowerCase())

    // Check for state name in title (highest priority)
    if (title.includes(stateName.toLowerCase())) {
      relevanceScore += 100
      matchType = "state"
    }

    // Check for state name in description
    if (description.includes(stateName.toLowerCase())) {
      relevanceScore += 50
    }

    // Check for state tags (teams, etc.)
    for (const stateTag of stateTags) {
      const tagLower = stateTag.toLowerCase()

      if (title.includes(tagLower)) {
        relevanceScore += 80
        matchType = "team"
      }

      if (tags.includes(tagLower)) {
        relevanceScore += 60
        matchType = "team"
      }

      if (description.includes(tagLower)) {
        relevanceScore += 30
      }
    }

    // Check for "flag" keyword (state flags)
    if (title.includes("flag") && relevanceScore > 0) {
      relevanceScore += 40
    }

    // Boost available products
    if (product.availableForSale) {
      relevanceScore += 10
    }

    // Only include products with some relevance
    if (relevanceScore > 0) {
      stateProducts.push({
        product,
        relevanceScore,
        matchType,
      })
    }
  }

  // Sort by relevance score (highest first)
  stateProducts.sort((a, b) => b.relevanceScore - a.relevanceScore)

  return stateProducts
}

/**
 * Get recommended add-ons for a state (flags, light toppers, accessories)
 */
export async function getStateAddOns(stateCode: string, stateName: string): Promise<ShopifyProduct[]> {
  const stateProducts = await searchStateProducts(stateCode, stateName)

  // Filter for add-on products (flags, lights, accessories)
  const addOns = stateProducts
    .filter((sp) => {
      const title = sp.product.title.toLowerCase()
      return (
        title.includes("flag") ||
        title.includes("light") ||
        title.includes("topper") ||
        title.includes("accessory") ||
        title.includes("kit")
      )
    })
    .slice(0, 8) // Limit to 8 add-ons
    .map((sp) => sp.product)

  return addOns
}
