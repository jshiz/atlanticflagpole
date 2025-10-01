"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface AdvancedFiltersProps {
  availableFilters?: {
    productTypes?: string[]
    vendors?: string[]
    tags?: string[]
  }
}

export function AdvancedFilters({ availableFilters }: AdvancedFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentFilters = {
    available: searchParams.get("available"),
    type: searchParams.get("type"),
    vendor: searchParams.get("vendor"),
    tag: searchParams.get("tag"),
    min: searchParams.get("min"),
    max: searchParams.get("max"),
  }

  const hasActiveFilters = Object.values(currentFilters).some((v) => v !== null)

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    const sort = params.get("sort")
    const newParams = new URLSearchParams()
    if (sort) newParams.set("sort", sort)
    router.push(`?${newParams.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg border border-[#0B1C2C]/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-lg text-[#0B1C2C]">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-[#C41E3A] hover:text-[#C41E3A]/80"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Availability Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-[#0B1C2C]">Availability</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={currentFilters.available === "true"}
            onCheckedChange={(checked) => updateFilter("available", checked ? "true" : null)}
          />
          <label htmlFor="available" className="text-sm text-[#0B1C2C] cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-[#0B1C2C]">Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={currentFilters.min || ""}
            onChange={(e) => updateFilter("min", e.target.value || null)}
            className="w-full"
          />
          <span className="text-[#0B1C2C]/60">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={currentFilters.max || ""}
            onChange={(e) => updateFilter("max", e.target.value || null)}
            className="w-full"
          />
        </div>
      </div>

      {/* Product Type Filter */}
      {availableFilters?.productTypes && availableFilters.productTypes.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-[#0B1C2C]">Product Type</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableFilters.productTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={currentFilters.type === type}
                  onCheckedChange={(checked) => updateFilter("type", checked ? type : null)}
                />
                <label htmlFor={`type-${type}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vendor Filter */}
      {availableFilters?.vendors && availableFilters.vendors.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-[#0B1C2C]">Brand</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableFilters.vendors.map((vendor) => (
              <div key={vendor} className="flex items-center space-x-2">
                <Checkbox
                  id={`vendor-${vendor}`}
                  checked={currentFilters.vendor === vendor}
                  onCheckedChange={(checked) => updateFilter("vendor", checked ? vendor : null)}
                />
                <label htmlFor={`vendor-${vendor}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {vendor}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-[#0B1C2C]/10">
          <Label className="text-sm font-semibold text-[#0B1C2C] mb-2 block">Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {currentFilters.available === "true" && (
              <Button variant="outline" size="sm" onClick={() => updateFilter("available", null)} className="text-xs">
                In Stock
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {currentFilters.type && (
              <Button variant="outline" size="sm" onClick={() => updateFilter("type", null)} className="text-xs">
                {currentFilters.type}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {currentFilters.vendor && (
              <Button variant="outline" size="sm" onClick={() => updateFilter("vendor", null)} className="text-xs">
                {currentFilters.vendor}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {(currentFilters.min || currentFilters.max) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  updateFilter("min", null)
                  updateFilter("max", null)
                }}
                className="text-xs"
              >
                ${currentFilters.min || "0"} - ${currentFilters.max || "∞"}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
