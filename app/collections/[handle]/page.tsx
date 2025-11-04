import { notFound } from "next/navigation"
import { CollectionFiltersWrapper } from "@/components/collections/collection-filters-wrapper"
import { AdvancedFiltersWrapper } from "@/components/collections/advanced-filters-wrapper"
import { COLLECTION_WITH_FILTERS } from "@/lib/shopify/queries"
import { toNodes } from "@/lib/connection"
import { navigationConfig, singleNavItems } from "@/lib/navigation-config"
import { generateCollectionMetadata } from "@/lib/seo/metadata"
import { generateCollectionSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { InfiniteProductGrid } from "@/components/products/infinite-product-grid"
import type { Metadata } from "next"

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "v0-template.myshopify.com"
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"

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

function buildFilters(searchParams: Record<string, string | string[] | undefined>) {
  const filters: any[] = []
  if (searchParams.type) filters.push({ productType: String(searchParams.type) })
  if (searchParams.vendor) filters.push({ vendor: String(searchParams.vendor) })
  if (searchParams.tag) filters.push({ tag: String(searchParams.tag) })
  filters.push({ available: true })

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

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  try {
    const data = await shopifyFetch<{ collection: any }>(COLLECTION_WITH_FILTERS, {
      handle: params.handle,
      filters: [{ available: true }],
      sortKey: "BEST_SELLING",
      reverse: false,
    })

    if (data.collection) {
      return generateCollectionMetadata(data.collection)
    }
  } catch (error) {
    console.error("[v0] Error generating collection metadata:", error)
  }

  // Fallback metadata
  const title = params.handle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${title} | Atlantic Flagpole`,
    description: `Shop our collection of ${title.toLowerCase()} at Atlantic Flagpole`,
  }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const sortKey = searchParams.sort || "BEST_SELLING"
  const reverse = searchParams.reverse === "true"
  const filters = buildFilters(searchParams)

  let collection = null
  let products: any[] = []

  try {
    const data = await shopifyFetch<{ collection: any }>(COLLECTION_WITH_FILTERS, {
      handle: params.handle,
      filters,
      sortKey: sortKey as any,
      reverse,
    })
    collection = data.collection

    if (collection) {
      products = toNodes(collection.products)
      products = products.filter((p) => p.availableForSale)
      console.log(
        `[v0] ✅ Found ${products.length} active products in collection "${params.handle}" (sort: ${sortKey}, reverse: ${reverse})`,
      )
    }
  } catch (error) {
    console.error("[v0] Error fetching collection:", error)
  }

  if (!collection || products.length === 0) {
    console.log(`[v0] Collection "${params.handle}" not found or has no active products`)
    notFound()
  }

  const productTypes = [...new Set(products.map((p: any) => p.productType).filter(Boolean))]
  const vendors = [...new Set(products.map((p: any) => p.vendor).filter(Boolean))]

  const collectionSchema = generateCollectionSchema(collection)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Collections", url: `${SITE_URL}/collections` },
    { name: collection.title, url: `${SITE_URL}/collections/${params.handle}` },
  ])

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <StructuredData data={collectionSchema} />
      <StructuredData data={breadcrumbSchema} />

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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">{collection.title}</h1>
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
            <InfiniteProductGrid
              initialProducts={products.slice(0, 24)}
              searchParams={{ ...searchParams, collection: params.handle }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
