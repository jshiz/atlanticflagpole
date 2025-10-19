import { getAllProducts, getAllCollections } from "@/lib/shopify"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Revalidate every hour

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"

export default async function sitemap() {
  let products: Awaited<ReturnType<typeof getAllProducts>> = []
  let collections: Awaited<ReturnType<typeof getAllCollections>> = []

  try {
    console.log("[v0] Generating sitemap...")
    const results = await Promise.all([getAllProducts(), getAllCollections()])
    products = results[0]
    collections = results[1]
    console.log(`[v0] Sitemap: ${products.length} products, ${collections.length} collections`)
  } catch (error) {
    console.error("[v0] Sitemap generation: Failed to fetch Shopify data", error)
  }

  // Static routes
  const routes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/collections`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/help-center`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ]

  // Collection routes
  const collectionRoutes = collections.map((c) => ({
    url: `${SITE_URL}/collections/${c.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Product routes
  const productRoutes = products
    .filter((p) => p.availableForSale) // Only include available products
    .map((p) => ({
      url: `${SITE_URL}/products/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

  return [...routes, ...collectionRoutes, ...productRoutes]
}
