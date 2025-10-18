"use client"

import { useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import type { ShopifyCollection } from "@/lib/shopify"

interface CollectionsSidebarProps {
  collections: ShopifyCollection[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function CollectionsSidebar({
  collections,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: CollectionsSidebarProps) {
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()

    collections.forEach((collection) => {
      const category = categorizeCollection(collection)
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
    })

    return Array.from(categoryMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [collections])

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1C2C]/40" />
        <Input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B1C2C]/40 hover:text-[#0B1C2C]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-[#0B1C2C] mb-3">Categories</h3>
        <div className="space-y-1">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className="w-full justify-start text-sm"
            onClick={() => onCategoryChange(null)}
          >
            All Collections
            <span className="ml-auto text-xs opacity-60">{collections.length}</span>
          </Button>
          {categories.map(([category, count]) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => onCategoryChange(category)}
            >
              {category}
              <span className="ml-auto text-xs opacity-60">{count}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* All Collections List */}
      <div>
        <h3 className="text-sm font-semibold text-[#0B1C2C] mb-3">All Collections</h3>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {collections
            .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((collection) => (
              <a
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="block px-3 py-2 text-sm text-[#0B1C2C]/70 hover:text-[#C8A55C] hover:bg-[#C8A55C]/5 rounded transition-colors"
              >
                {collection.title}
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to categorize collections
function categorizeCollection(collection: ShopifyCollection): string {
  const title = collection.title.toLowerCase()
  const handle = collection.handle.toLowerCase()

  // Flagpoles
  if (
    handle.includes("flagpole") ||
    handle.includes("pole") ||
    title.includes("flagpole") ||
    title.includes("telescoping") ||
    title.includes("aluminum")
  ) {
    return "Flagpoles"
  }

  // Flags
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

  // Christmas/Seasonal
  if (
    handle.includes("christmas") ||
    handle.includes("holiday") ||
    handle.includes("seasonal") ||
    title.includes("christmas") ||
    title.includes("tree")
  ) {
    return "Seasonal"
  }

  // Accessories
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

  // Special Collections
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
