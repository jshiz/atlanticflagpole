import { getProducts, getCollections } from "@/lib/shopify"

export default async function sitemap() {
  const base = "https://atlanticflagpole.vercel.app"

  const [products, collections] = await Promise.all([getProducts({ first: 250 }), getCollections(250)])

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
