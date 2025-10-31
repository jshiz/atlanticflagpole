import type { Metadata } from "next"
import { searchProducts } from "@/lib/shopify/catalog"
import { ChristmasTreeSalesPageClient } from "@/components/christmas-tree-sales-page-client"

export const metadata: Metadata = {
  title: "LED Christmas Trees for Flagpoles - Transform Your Holiday Display | Atlantic Flagpole",
  description:
    "Transform your flagpole into a stunning Christmas tree with our LED light kits. Easy setup, energy-efficient, weather-resistant. Multiple sizes and colors available. 42-month warranty.",
}

export default async function LEDChristmasTreesPage() {
  const allProductsResult = await searchProducts({ first: 250 })
  const allProducts = allProductsResult?.nodes || []

  const christmasProducts = allProducts.filter((product) => {
    const productTags = product.tags || []
    // Use the same tags as the header's christmas subcategory
    const searchTags = ["christmas", "christmas tree", "led tree"]
    return searchTags.some((searchTag) =>
      productTags.some((tag: string) => tag.toLowerCase().includes(searchTag.toLowerCase())),
    )
  })

  console.log("[v0] Christmas tree products found:", christmasProducts.length)
  console.log(
    "[v0] Product handles:",
    christmasProducts.map((p) => p.handle),
  )

  return <ChristmasTreeSalesPageClient products={christmasProducts} />
}
