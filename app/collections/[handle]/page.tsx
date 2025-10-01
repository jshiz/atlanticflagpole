import { notFound } from "next/navigation"
import { ProductCard } from "@/components/products/product-card"
import { CollectionFiltersWrapper } from "@/components/collections/collection-filters-wrapper"
import { AdvancedFiltersWrapper } from "@/components/collections/advanced-filters-wrapper"
import { COLLECTION_WITH_FILTERS } from "@/lib/shopify/queries"
import { toNodes } from "@/lib/connection"

export const dynamic = "force-dynamic"

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
  query getProductsByTag($query: String!, $first: Int!, $sortKey: ProductSortKeys!) {
    products(first: $first, query: $query, sortKey: $sortKey) {
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

interface CollectionPageProps {
  params: {
    handle: string
  }
  searchParams: {
    sort?: string
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
  const filters = buildFilters(searchParams)

  let collection = null
  let products: any[] = []
  let isFallback = false

  try {
    const data = await shopifyFetch<{ collection: any }>(COLLECTION_WITH_FILTERS, {
      handle: params.handle,
      filters,
      sortKey: sortKey as any,
    })
    collection = data.collection

    if (collection) {
      products = toNodes(collection.products)
    }
  } catch (error) {
    console.error("[v0] Error fetching collection:", error)
  }

  if (!collection || products.length === 0) {
    console.log(`[v0] Collection "${params.handle}" not found, falling back to tag search`)
    isFallback = true

    try {
      const data = await shopifyFetch<{ products: any }>(PRODUCTS_BY_TAG_QUERY, {
        query: `tag:${params.handle}`,
        first: 250,
        sortKey: sortKey as any,
      })

      products = toNodes(data.products)

      // Create a synthetic collection object
      if (products.length > 0) {
        collection = {
          title: params.handle
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          description: `Products tagged with "${params.handle}"`,
          descriptionHtml: `<p>Products tagged with "${params.handle}"</p>`,
          products: { nodes: products },
        }
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
                Tag Search
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
