import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductFiltersWrapper } from "@/components/products/product-filters-wrapper"
import { PRODUCTS_SEARCH_QUERY } from "@/lib/shopify/queries"
import { buildProductQuery, getSortParams } from "@/lib/shopify/product-search"

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
    next: { revalidate: 600, tags: ["products"] },
  })

  const json = await res.json()
  if (!res.ok || json.errors) {
    console.error("[v0] Shopify API error:", json.errors)
    throw new Error(JSON.stringify(json.errors ?? res.statusText))
  }
  return json.data
}

interface ProductsPageProps {
  searchParams: {
    q?: string
    sort?: string
    type?: string
    vendor?: string
    tag?: string
    available?: string
    min?: string
    max?: string
    sku?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Build the Shopify query string from URL params
  const queryString = buildProductQuery(searchParams)
  const { sortKey, reverse } = getSortParams(searchParams.sort)

  console.log("[v0] Products page query:", queryString)
  console.log("[v0] Sort params:", { sortKey, reverse })

  let products: any[] = []
  let productTypes: string[] = []
  let vendors: string[] = []
  let tags: string[] = []

  try {
    const data = await shopifyFetch<{ products: any }>(PRODUCTS_SEARCH_QUERY, {
      q: queryString,
      sortKey,
      reverse,
      first: 48,
    })

    products = data.products.nodes

    // Extract unique values for filters
    productTypes = [...new Set(products.map((p) => p.productType).filter(Boolean))]
    vendors = [...new Set(products.map((p) => p.vendor).filter(Boolean))]
    tags = [...new Set(products.flatMap((p) => p.tags || []))]
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
  }

  // Determine page title based on filters
  const getPageTitle = () => {
    if (searchParams.q) return `Search Results for "${searchParams.q}"`
    if (searchParams.type) return searchParams.type
    if (searchParams.vendor) return searchParams.vendor
    if (searchParams.tag) return searchParams.tag
    return "All Products"
  }

  const hasActiveFilters =
    searchParams.q ||
    searchParams.type ||
    searchParams.vendor ||
    searchParams.tag ||
    searchParams.available ||
    searchParams.min ||
    searchParams.max

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">{getPageTitle()}</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            {products.length} {products.length === 1 ? "product" : "products"}
            {hasActiveFilters && " found"}
          </p>
        </div>

        <ProductFilters currentSort={searchParams.sort || "relevance"} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <ProductFiltersWrapper
              availableFilters={{
                productTypes,
                vendors,
                tags,
              }}
            />
          </aside>

          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-[#0B1C2C]/10">
                <p className="text-lg text-[#0B1C2C]/70 mb-4">No products found matching your criteria.</p>
                <p className="text-sm text-[#0B1C2C]/60">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
