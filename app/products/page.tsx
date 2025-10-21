import { ProductFilters } from "@/components/products/product-filters"
import { ProductFiltersWrapper } from "@/components/products/product-filters-wrapper"
import { InfiniteProductGrid } from "@/components/products/infinite-product-grid"
import { searchProducts } from "@/lib/shopify/catalog"

export const revalidate = 600

interface ProductsPageProps {
  searchParams: {
    q?: string
    sort?: string
    type?: string
    vendor?: string
    tag?: string
    collection?: string
    available?: string
    min?: string
    max?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  console.log("[v0] Products page - searching with params:", searchParams)

  let initialProducts: any[] = []
  let hasError = false
  let productTypes: string[] = []
  let vendors: string[] = []
  let tags: string[] = []

  try {
    const result = await searchProducts({
      ...searchParams,
      first: 24,
    })

    initialProducts = result.nodes

    // Get filter options from initial products
    productTypes = [...new Set(initialProducts.map((p) => p.productType).filter(Boolean))]
    vendors = [...new Set(initialProducts.map((p) => p.vendor).filter(Boolean))]
    tags = [...new Set(initialProducts.flatMap((p) => p.tags || []))]

    console.log("[v0] Successfully fetched", initialProducts.length, "initial products")
  } catch (error) {
    console.error("[v0] Error searching products:", error)
    hasError = true
  }

  const getPageTitle = () => {
    if (searchParams.q) return `Search Results for "${searchParams.q}"`
    if (searchParams.collection)
      return searchParams.collection.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
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
    searchParams.collection ||
    searchParams.available ||
    searchParams.min ||
    searchParams.max

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">{getPageTitle()}</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            {initialProducts.length}+ {initialProducts.length === 1 ? "product" : "products"}
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
            {hasError ? (
              <div className="text-center py-12 bg-white rounded-lg border border-red-500/20">
                <p className="text-lg text-red-600 mb-4">Unable to load products</p>
                <p className="text-sm text-[#0B1C2C]/60">Please check your Shopify connection and try again.</p>
              </div>
            ) : initialProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-[#0B1C2C]/10">
                <p className="text-lg text-[#0B1C2C]/70 mb-4">No products found matching your criteria.</p>
                <p className="text-sm text-[#0B1C2C]/60">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <InfiniteProductGrid initialProducts={initialProducts} searchParams={searchParams} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
