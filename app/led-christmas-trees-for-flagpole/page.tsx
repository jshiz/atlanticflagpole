import type { Metadata } from "next"
import { getProducts } from "@/lib/shopify"
import { ChristmasTreeSalesPageClient } from "@/components/christmas-tree-sales-page-client"

export const metadata: Metadata = {
  title: "LED Christmas Trees for Flagpoles - Transform Your Holiday Display | Atlantic Flagpole",
  description:
    "Transform your flagpole into a stunning Christmas tree with our LED light kits. Easy setup, energy-efficient, weather-resistant. Multiple sizes and colors available. 42-month warranty.",
}

export default async function LEDChristmasTreesPage() {
  const christmasProducts = await getProducts({
    query: "tag:christmas tree OR tag:led tree OR tag:holiday lighting",
    first: 10,
  })

  // Filter to get the main Christmas tree products
  const mainProducts = christmasProducts.filter(
    (p) => p.handle.includes("patriot-glo") || (p.handle.includes("phoenix") && p.handle.includes("christmas")),
  )

  return <ChristmasTreeSalesPageClient products={mainProducts.length > 0 ? mainProducts : christmasProducts} />
}
