import { notFound } from "next/navigation"
import { getCollectionProducts } from "@/lib/shopify"
import { ProductCard } from "@/components/products/product-card"
import { CollectionFilters } from "@/components/collections/collection-filters"

interface CollectionPageProps {
  params: {
    handle: string
  }
  searchParams: {
    sort?: string
  }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const sortKey = searchParams.sort || "BEST_SELLING"

  const products = await getCollectionProducts({
    collection: params.handle,
    sortKey: sortKey as any,
  })

  if (!products || products.length === 0) {
    notFound()
  }

  // Get collection title from the first product's category or use handle
  const collectionTitle = params.handle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">{collectionTitle}</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        <CollectionFilters currentSort={sortKey} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
