import { getProducts } from "@/lib/shopify"
import { ProductCard } from "@/components/products/product-card"
import { SearchFilters } from "@/components/search/search-filters"

interface SearchPageProps {
  searchParams: {
    q?: string
    sort?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const sortKey = searchParams.sort || "RELEVANCE"

  const products = query
    ? await getProducts({
        query,
        sortKey: sortKey as any,
      })
    : []

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
            {query ? `Search Results for "${query}"` : "Search Products"}
          </h1>
          {query && (
            <p className="text-lg text-[#0B1C2C]/70">
              {products.length} {products.length === 1 ? "result" : "results"} found
            </p>
          )}
        </div>

        {query && <SearchFilters currentSort={sortKey} query={query} />}

        {!query ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">Enter a search term to find products</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">No products found for "{query}"</p>
            <p className="text-sm text-[#0B1C2C]/60 mt-2">Try different keywords or browse our collections</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
