import { getCollections } from "@/lib/shopify"
import { CollectionCard } from "@/components/collections/collection-card"

export const dynamic = "force-dynamic"

export default async function CollectionsPage() {
  let collections = []

  try {
    collections = await getCollections()
  } catch (error) {
    console.error("Error fetching collections:", error)
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Shop by Collection</h1>
          <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
            Explore our curated collections of premium flagpoles designed for every need.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">No collections available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
