"use server"

import { getProduct } from "@/lib/shopify"

const FEATURED_PRODUCT_HANDLES = [
  "patriot-glo-4000-led-flagpole-christmas-tree-30-43",
  "phoenix-flagpole-christmas-tree-light-kit-for-20-25-poles",
]

export async function getFeaturedHolidayProducts() {
  console.log("[v0] 🎄 Fetching featured holiday products...")

  try {
    const products = await Promise.all(
      FEATURED_PRODUCT_HANDLES.map(async (handle) => {
        try {
          const product = await getProduct(handle)

          console.log(`[v0] ✅ Fetched product: ${product.title}`)
          console.log(`[v0] 📸 Product images:`, {
            featuredImage: product.featuredImage,
            firstImageEdge: product.images?.edges?.[0]?.node,
          })

          return product
        } catch (error) {
          console.error(`[v0] ❌ Error fetching product ${handle}:`, error)
          return null
        }
      }),
    )

    const validProducts = products.filter((p) => p !== null)

    console.log(`[v0] ✅ Successfully fetched ${validProducts.length} holiday products`)

    return validProducts
  } catch (error) {
    console.error("[v0] ❌ Error in getFeaturedHolidayProducts:", error)
    return []
  }
}
