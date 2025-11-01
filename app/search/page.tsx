import { searchProducts } from "@/lib/shopify/catalog"
import { InfiniteProductGrid } from "@/components/products/infinite-product-grid"
import { SearchFilters } from "@/components/search/search-filters"

export const revalidate = 600

interface SearchPageProps {
  searchParams: {
    q?: string
    sort?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const sortKey = searchParams.sort || "RELEVANCE"

  let initialProducts: any[] = []

  if (query) {
    try {
      const result = await searchProducts({
        q: query,
        sort: sortKey,
        first: 24,
      })
      initialProducts = result.nodes
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">
            {query ? `Search Results for "${query}"` : "Search Products"}
          </h1>
          {query && (
            <p className="text-lg text-[#0B1C2C]/70">
              {initialProducts.length}+ {initialProducts.length === 1 ? "result" : "results"} found
            </p>
          )}
        </div>

        {query && <SearchFilters currentSort={sortKey} query={query} />}

        {!query ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">Enter a search term to find products</p>
          </div>
        ) : initialProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">No products found for "{query}"</p>
            <p className="text-sm text-[#0B1C2C]/60 mt-2">Try different keywords or browse our collections</p>
          </div>
        ) : (
          <div className="mt-8">
            <InfiniteProductGrid initialProducts={initialProducts} searchParams={{ q: query, sort: sortKey }} />
          </div>
        )}
      </div>
    </main>
  )
}
