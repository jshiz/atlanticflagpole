import { notFound } from "next/navigation"
import { ProductCard } from "@/components/products/product-card"
import { CollectionFilters } from "@/components/collections/collection-filters"
import { AdvancedFilters } from "@/components/collections/advanced-filters"
import { COLLECTION_WITH_FILTERS } from "@/lib/shopify/queries"

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

  const data = await shopifyFetch<{ collection: any }>(COLLECTION_WITH_FILTERS, {
    handle: params.handle,
    filters,
    sortKey: sortKey as any,
  })

  const collection = data.collection

  if (!collection || !collection.products.nodes.length) {
    notFound()
  }

  const allProducts = collection.products.nodes
  const productTypes = [...new Set(allProducts.map((p: any) => p.productType).filter(Boolean))]
  const vendors = [...new Set(allProducts.map((p: any) => p.vendor).filter(Boolean))]

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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">{collection.title}</h1>
          {collection.description && (
            <div
              className="text-lg text-[#0B1C2C]/70 mb-4"
              dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
            />
          )}
          <p className="text-lg text-[#0B1C2C]/70">
            {collection.products.nodes.length} {collection.products.nodes.length === 1 ? "product" : "products"}
          </p>
        </div>

        <CollectionFilters currentSort={sortKey} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <AdvancedFilters
              availableFilters={{
                productTypes,
                vendors,
              }}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {collection.products.nodes.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
