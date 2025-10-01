import { getProducts, getCollections } from "@/lib/shopify"

export default async function sitemap() {
  const base = "https://atlanticflagpole.vercel.app"

  let products: Awaited<ReturnType<typeof getProducts>> = []
  let collections: Awaited<ReturnType<typeof getCollections>> = []

  try {
    const results = await Promise.all([getProducts({ first: 250 }), getCollections(250)])
    products = results[0]
    collections = results[1]
  } catch (error) {
    console.error("[v0] Sitemap generation: Failed to fetch Shopify data", error)
    // Continue with empty arrays - sitemap will only include static routes
  }

  const routes = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/collections`, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
  ]

  const prodRoutes = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: new Date(),
  }))

  const colRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.handle}`,
    lastModified: new Date(),
  }))

  return [...routes, ...colRoutes, ...prodRoutes]
}
