"use client"

import { useState, useMemo } from "react"
import { CollectionCardCompact } from "./collection-card-compact"
import { CollectionsSidebar } from "./collections-sidebar"
import type { ShopifyCollection } from "@/lib/shopify"

interface CollectionsClientProps {
  collections: ShopifyCollection[]
}

export function CollectionsClient({ collections }: CollectionsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter collections based on category and search
  const filteredCollections = useMemo(() => {
    return collections.filter((collection) => {
      const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === null || categorizeCollection(collection) === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [collections, selectedCategory, searchQuery])

  // Group collections by category
  const groupedCollections = useMemo(() => {
    const groups = new Map<string, ShopifyCollection[]>()

    filteredCollections.forEach((collection) => {
      const category = categorizeCollection(collection)
      if (!groups.has(category)) {
        groups.set(category, [])
      }
      groups.get(category)!.push(collection)
    })

    // Sort categories
    const sortedGroups = Array.from(groups.entries()).sort((a, b) => {
      const order = ["Featured", "Flagpoles", "Flags", "Seasonal", "Accessories", "Other"]
      return order.indexOf(a[0]) - order.indexOf(b[0])
    })

    return sortedGroups
  }, [filteredCollections])

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 sticky top-24 h-fit">
        <CollectionsSidebar
          collections={collections}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {filteredCollections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">No collections found matching your criteria.</p>
          </div>
        ) : selectedCategory ? (
          // Show filtered collections in a grid
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">
              {selectedCategory} ({filteredCollections.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredCollections.map((collection) => (
                <CollectionCardCompact key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        ) : (
          // Show all collections grouped by category
          <div className="space-y-12">
            {groupedCollections.map(([category, categoryCollections]) => (
              <section key={category}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">{category}</h2>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm text-[#C8A55C] hover:underline"
                  >
                    View all {categoryCollections.length}
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {categoryCollections.slice(0, 10).map((collection) => (
                    <CollectionCardCompact key={collection.id} collection={collection} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to categorize collections (same as sidebar)
function categorizeCollection(collection: ShopifyCollection): string {
  const title = collection.title.toLowerCase()
  const handle = collection.handle.toLowerCase()

  if (
    handle.includes("flagpole") ||
    handle.includes("pole") ||
    title.includes("flagpole") ||
    title.includes("telescoping") ||
    title.includes("aluminum")
  ) {
    return "Flagpoles"
  }

  if (
    handle.includes("flag") ||
    handle.includes("nfl") ||
    handle.includes("state") ||
    handle.includes("american") ||
    handle.includes("military") ||
    title.includes("flag")
  ) {
    return "Flags"
  }

  if (
    handle.includes("christmas") ||
    handle.includes("holiday") ||
    handle.includes("seasonal") ||
    title.includes("christmas") ||
    title.includes("tree")
  ) {
    return "Seasonal"
  }

  if (
    handle.includes("accessory") ||
    handle.includes("accessories") ||
    handle.includes("hardware") ||
    handle.includes("light") ||
    handle.includes("mount") ||
    title.includes("accessories") ||
    title.includes("hardware")
  ) {
    return "Accessories"
  }

  if (
    handle.includes("best") ||
    handle.includes("new") ||
    handle.includes("featured") ||
    handle.includes("sale") ||
    title.includes("best seller") ||
    title.includes("new arrival")
  ) {
    return "Featured"
  }

  return "Other"
}
