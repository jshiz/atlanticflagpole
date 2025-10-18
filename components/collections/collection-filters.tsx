"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CollectionFiltersProps {
  currentSort: string
}

export function CollectionFilters({ currentSort }: CollectionFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const [sortKey, reverse] = value.split(":")
    params.set("sort", sortKey)
    if (reverse === "desc") {
      params.set("reverse", "true")
    } else {
      params.delete("reverse")
    }
    router.push(`?${params.toString()}`)
  }

  const reverse = searchParams.get("reverse") === "true"
  const currentValue = reverse ? `${currentSort}:desc` : currentSort

  return (
    <div className="flex items-center justify-between border-b border-[#0B1C2C]/10 pb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#0B1C2C]">Sort by:</span>
        <Select value={currentValue} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BEST_SELLING">Best Selling</SelectItem>
            <SelectItem value="PRICE">Price: Low to High</SelectItem>
            <SelectItem value="PRICE:desc">Price: High to Low</SelectItem>
            <SelectItem value="TITLE">Alphabetical: A-Z</SelectItem>
            <SelectItem value="TITLE:desc">Alphabetical: Z-A</SelectItem>
            <SelectItem value="CREATED:desc">Newest First</SelectItem>
            <SelectItem value="CREATED">Oldest First</SelectItem>
            <SelectItem value="RELEVANCE">Most Relevant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
