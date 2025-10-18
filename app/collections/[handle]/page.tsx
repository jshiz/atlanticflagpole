import { notFound } from "next/navigation"
import { ProductCard } from "@/components/products/product-card"
import { CollectionFiltersWrapper } from "@/components/collections/collection-filters-wrapper"
import { AdvancedFiltersWrapper } from "@/components/collections/advanced-filters-wrapper"
import { COLLECTION_WITH_FILTERS } from "@/lib/shopify/queries"
import { toNodes } from "@/lib/connection"
import { navigationConfig, singleNavItems } from "@/lib/navigation-config"

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
    next: { revalidate: 600, tags: [`collection:${variables?.handle}`, "products"] },
  })

  const json = await res.json()
  if (!res.ok || json.errors) {
    throw new Error(JSON.stringify(json.errors ?? res.statusText))
  }
  return json.data
}

const PRODUCTS_BY_TAG_QUERY = `
  query getProductsByTag($query: String!, $first: Int!, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      nodes {
        id
        handle
        title
        productType
        vendor
        tags
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
      }
    }
  }
`

function buildFilters(searchParams: Record<string, string | string[] | undefined>) {
  const filters: any[] = []
  if (searchParams.type) filters.push({ productType: String(searchParams.type) })
  if (searchParams.vendor) filters.push({ vendor: String(searchParams.vendor) })
  if (searchParams.tag) filters.push({ tag: String(searchParams.tag) })
  if (searchParams.available === "true") filters.push({ available: true })

  const min = searchParams.min ? Number.parseFloat(String(searchParams.min)) : undefined
  const max = searchParams.max ? Number.parseFloat(String(searchParams.max)) : undefined
  if (!Number.isNaN(min) || !Number.isNaN(max)) {
    filters.push({ price: { min, max } })
  }

  return filters
}

// Helper function to get tags for a collection handle
function getTagsForCollection(handle: string): string[] {
  // Search in main navigation
  for (const menu of navigationConfig) {
    for (const category of menu.categories) {
      for (const item of category.items) {
        if (item.collection === handle && item.tags) {
          return item.tags
        }
      }
    }
  }

  // Search in single nav items
  for (const item of singleNavItems) {
    if (item.collection === handle && item.tags) {
      return item.tags
    }
  }

  // Fallback to handle itself
  return [handle.replace(/-/g, " ")]
}

function calculateRelevancyScore(product: any, collectionHandle: string, tags: string[]): number {
  let score = 0
  const title = product.title.toLowerCase()
  const productTags = (product.tags || []).map((t: string) => t.toLowerCase())
  const handle = collectionHandle.toLowerCase().replace(/-/g, " ")

  // Exact title match
  if (title.includes(handle)) score += 100

  // Tag matches
  for (const tag of tags) {
    if (productTags.includes(tag.toLowerCase())) score += 50
  }

  // Product type relevancy
  if (product.productType && handle.includes(product.productType.toLowerCase())) {
    score += 30
  }

  // Price factor (higher priced items get slight boost for quality signal)
  const price = Number.parseFloat(product.priceRange?.minVariantPrice?.amount || "0")
  score += Math.min(price / 10, 20) // Cap at 20 points

  // Availability boost
  if (product.availableForSale) score += 10

  return score
}

interface CollectionPageProps {
  params: {
    handle: string
  }
  searchParams: {
    sort?: string
    reverse?: string
    type?: string
    vendor?: string
    tag?: string
    available?: string
    min?: string
    max?: string
  }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const sortKey = searchParams.sort || "BEST_SELLING"
  const reverse = searchParams.reverse === "true"
  const filters = buildFilters(searchParams)

  let collection = null
  let products: any[] = []
  let isFallback = false

  try {
    const data = await shopifyFetch<{ collection: any }>(COLLECTION_WITH_FILTERS, {
      handle: params.handle,
      filters,
      sortKey: sortKey as any,
      reverse, // Pass reverse parameter
    })
    collection = data.collection

    if (collection) {
      products = toNodes(collection.products)
      console.log(
        `[v0] ✅ Found ${products.length} products in collection "${params.handle}" (sort: ${sortKey}, reverse: ${reverse})`,
      )
    }
  } catch (error) {
    console.error("[v0] Error fetching collection:", error)
  }

  if (!collection || products.length === 0) {
    console.log(`[v0] Collection "${params.handle}" not found, falling back to tag search`)
    isFallback = true

    const tagsToTry = getTagsForCollection(params.handle)
    console.log(`[v0] Trying tags for "${params.handle}":`, tagsToTry)

    try {
      const fallbackSortKey = sortKey === "BEST_SELLING" ? "BEST_SELLING" : sortKey

      // Try each tag until we find products
      for (const tag of tagsToTry) {
        const data = await shopifyFetch<{ products: any }>(PRODUCTS_BY_TAG_QUERY, {
          query: `tag:${tag}`,
          first: 250,
          sortKey: fallbackSortKey as any,
          reverse,
        })

        const tagProducts = toNodes(data.products)

        if (tagProducts.length > 0) {
          products.push(...tagProducts)
          console.log(`[v0] ✅ Found ${tagProducts.length} products with tag "${tag}"`)
        }
      }

      // Remove duplicates based on product ID
      const uniqueProducts = Array.from(new Map(products.map((p) => [p.id, p])).values())

      const scoredProducts = uniqueProducts.map((p) => ({
        ...p,
        _relevancyScore: calculateRelevancyScore(p, params.handle, tagsToTry),
      }))

      if (sortKey === "BEST_SELLING" || sortKey === "RELEVANCE") {
        scoredProducts.sort((a, b) => b._relevancyScore - a._relevancyScore)
        console.log(`[v0] 🎯 Sorted ${scoredProducts.length} products by relevancy`)
      }

      products = scoredProducts

      // Create a synthetic collection object
      if (products.length > 0) {
        collection = {
          title: params.handle
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          description: `Showing ${products.length} products related to ${params.handle.replace(/-/g, " ")}`,
          descriptionHtml: `<p>Showing ${products.length} products related to ${params.handle.replace(/-/g, " ")}</p>`,
          products: { nodes: products },
        }
        console.log(`[v0] ✅ Created synthetic collection with ${products.length} products`)
      }
    } catch (error) {
      console.error("[v0] Error fetching products by tag:", error)
    }
  }

  if (!collection || products.length === 0) {
    notFound()
  }

  const productTypes = [...new Set(products.map((p: any) => p.productType).filter(Boolean))]
  const vendors = [...new Set(products.map((p: any) => p.vendor).filter(Boolean))]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        {collection.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={collection.image.url || "/placeholder.svg"}
              alt={collection.image.altText || collection.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
            {collection.title}
            {isFallback && (
              <span className="ml-3 text-sm font-normal text-[#C8A55C] bg-[#C8A55C]/10 px-3 py-1 rounded-full">
                Smart Search
              </span>
            )}
          </h1>
          {collection.description && (
            <div
              className="text-lg text-[#0B1C2C]/70 mb-4"
              dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
            />
          )}
          <p className="text-lg text-[#0B1C2C]/70">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        <CollectionFiltersWrapper currentSort={sortKey} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <AdvancedFiltersWrapper
              availableFilters={{
                productTypes,
                vendors,
              }}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
