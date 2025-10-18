import { getAllCollections } from "@/lib/shopify"
import { CollectionsClient } from "@/components/collections/collections-client"

export const dynamic = "force-dynamic"

export default async function CollectionsPage() {
  let collections = []

  try {
    collections = await getAllCollections()
    console.log(`[v0] ✅ Loaded ${collections.length} collections for collections page`)
  } catch (error) {
    console.error("[v0] Error fetching collections:", error)
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Shop by Collection</h1>
          <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
            Explore our curated collections of premium flagpoles and flags designed for every need.
          </p>
        </div>

        <CollectionsClient collections={collections} />
      </div>
    </main>
  )
}
