import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductFiltersWrapper } from "@/components/products/product-filters-wrapper"
import { getAllProducts } from "@/lib/shopify"

export const dynamic = "force-dynamic"
export const revalidate = 600

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
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  console.log("[v0] Products page - fetching all products")

  let allProducts: any[] = []

  try {
    allProducts = await getAllProducts()
    console.log("[v0] Successfully fetched", allProducts.length, "products")
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
  }

  let products = allProducts

  // Filter by search query
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase()
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.productType?.toLowerCase().includes(query) ||
        p.vendor?.toLowerCase().includes(query) ||
        p.tags?.some((tag: string) => tag.toLowerCase().includes(query)),
    )
  }

  // Filter by product type
  if (searchParams.type) {
    products = products.filter((p) => p.productType === searchParams.type)
  }

  // Filter by vendor
  if (searchParams.vendor) {
    products = products.filter((p) => p.vendor === searchParams.vendor)
  }

  // Filter by tag
  if (searchParams.tag) {
    products = products.filter((p) => p.tags?.includes(searchParams.tag))
  }

  // Filter by availability
  if (searchParams.available === "true") {
    products = products.filter((p) => p.availableForSale)
  }

  // Filter by price range
  if (searchParams.min || searchParams.max) {
    const min = searchParams.min ? Number.parseFloat(searchParams.min) : 0
    const max = searchParams.max ? Number.parseFloat(searchParams.max) : Number.POSITIVE_INFINITY

    products = products.filter((p) => {
      const price = Number.parseFloat(p.priceRange.minVariantPrice.amount)
      return price >= min && price <= max
    })
  }

  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price-asc":
        products.sort(
          (a, b) =>
            Number.parseFloat(a.priceRange.minVariantPrice.amount) -
            Number.parseFloat(b.priceRange.minVariantPrice.amount),
        )
        break
      case "price-desc":
        products.sort(
          (a, b) =>
            Number.parseFloat(b.priceRange.minVariantPrice.amount) -
            Number.parseFloat(a.priceRange.minVariantPrice.amount),
        )
        break
      case "title-asc":
        products.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        products.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
  }

  // Extract unique values for filters from ALL products
  const productTypes = [...new Set(allProducts.map((p) => p.productType).filter(Boolean))]
  const vendors = [...new Set(allProducts.map((p) => p.vendor).filter(Boolean))]
  const tags = [...new Set(allProducts.flatMap((p) => p.tags || []))]

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
