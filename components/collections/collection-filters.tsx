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
    params.set("sort", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between border-b border-[#0B1C2C]/10 pb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#0B1C2C]">Sort by:</span>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BEST_SELLING">Best Selling</SelectItem>
            <SelectItem value="TITLE">Alphabetical</SelectItem>
            <SelectItem value="PRICE">Price: Low to High</SelectItem>
            <SelectItem value="CREATED">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
