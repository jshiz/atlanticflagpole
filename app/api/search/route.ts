import { type NextRequest, NextResponse } from "next/server"
import { PRODUCT_SEARCH } from "@/lib/shopify/queries"

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "v0-template.myshopify.com"
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const json = await res.json()
  if (!res.ok || json.errors) {
    throw new Error(JSON.stringify(json.errors ?? res.statusText))
  }
  return json.data
}

// Build a Shopify search query (supports title, vendor, type, tag, sku)
function buildSearchQuery(q: string) {
  const safe = q.replace(/["']/g, "") // basic sanitize
  // Search across: title, sku, vendor, product_type, tag
  return [`title:*${safe}*`, `sku:${safe}`, `vendor:${safe}`, `product_type:${safe}`, `tag:${safe}`].join(" OR ")
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim()
  if (!q) return NextResponse.json({ items: [] })

  try {
    const data = await shopifyFetch<{ products: any }>(PRODUCT_SEARCH, { q: buildSearchQuery(q) })
    const items = data.products.nodes.map((p: any) => ({
      id: p.id,
      handle: p.handle,
      title: p.title,
      vendor: p.vendor,
      productType: p.productType,
      image: p.featuredImage?.url ?? null,
      price: p.priceRange?.minVariantPrice,
      variants: p.variants?.nodes?.map((v: any) => ({
        id: v.id,
        title: v.title,
        sku: v.sku,
        price: v.price,
      })),
    }))
    return NextResponse.json({ items })
  } catch (error) {
    console.error("[v0] Search error:", error)
    return NextResponse.json({ items: [], error: "Search failed" }, { status: 500 })
  }
}
