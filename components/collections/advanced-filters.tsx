"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { formatTag, organizeTagsIntoCategories } from "@/lib/utils/format-tags"
import { useState } from "react"

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

  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    price: true,
    productType: true,
    brand: true,
    material: true,
    height: false,
    installation: false,
    useCase: false,
    feature: false,
    tags: false,
  })

  const currentFilters = {
    available: searchParams.get("available"),
    type: searchParams.get("type"),
    vendor: searchParams.get("vendor"),
    tag: searchParams.get("tag"),
    min: searchParams.get("min"),
    max: searchParams.get("max"),
  }

  const hasActiveFilters = Object.values(currentFilters).some((v) => v !== null)

  const categorizedTags = availableFilters?.tags ? organizeTagsIntoCategories(availableFilters.tags) : null

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
    const q = params.get("q")
    const newParams = new URLSearchParams()
    if (sort) newParams.set("sort", sort)
    if (q) newParams.set("q", q)
    router.push(`?${newParams.toString()}`)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string
    sectionKey: keyof typeof expandedSections
    children: React.ReactNode
  }) => {
    const isExpanded = expandedSections[sectionKey]
    return (
      <div className="space-y-3 border-b border-[#0B1C2C]/10 pb-4 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left"
        >
          <Label className="text-sm font-semibold text-[#0B1C2C] cursor-pointer">{title}</Label>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-[#0B1C2C]/60" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#0B1C2C]/60" />
          )}
        </button>
        {isExpanded && <div className="space-y-2">{children}</div>}
      </div>
    )
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
      <FilterSection title="Availability" sectionKey="availability">
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
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" sectionKey="price">
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
      </FilterSection>

      {/* Product Type Filter */}
      {availableFilters?.productTypes && availableFilters.productTypes.length > 0 && (
        <FilterSection title="Product Type" sectionKey="productType">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableFilters.productTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={currentFilters.type === type}
                  onCheckedChange={(checked) => updateFilter("type", checked ? type : null)}
                />
                <label htmlFor={`type-${type}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {formatTag(type)}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Vendor Filter */}
      {availableFilters?.vendors && availableFilters.vendors.length > 0 && (
        <FilterSection title="Brand" sectionKey="brand">
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
        </FilterSection>
      )}

      {categorizedTags && categorizedTags.material.length > 0 && (
        <FilterSection title="Material" sectionKey="material">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categorizedTags.material.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${tag}`}
                  checked={currentFilters.tag === tag}
                  onCheckedChange={(checked) => updateFilter("tag", checked ? tag : null)}
                />
                <label htmlFor={`material-${tag}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      )}

      {categorizedTags && categorizedTags.height.length > 0 && (
        <FilterSection title="Height" sectionKey="height">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categorizedTags.height.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`height-${tag}`}
                  checked={currentFilters.tag === tag}
                  onCheckedChange={(checked) => updateFilter("tag", checked ? tag : null)}
                />
                <label htmlFor={`height-${tag}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      )}

      {categorizedTags && categorizedTags.installation.length > 0 && (
        <FilterSection title="Installation Type" sectionKey="installation">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categorizedTags.installation.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`installation-${tag}`}
                  checked={currentFilters.tag === tag}
                  onCheckedChange={(checked) => updateFilter("tag", checked ? tag : null)}
                />
                <label htmlFor={`installation-${tag}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      )}

      {categorizedTags && categorizedTags["use-case"].length > 0 && (
        <FilterSection title="Use Case" sectionKey="useCase">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categorizedTags["use-case"].map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`usecase-${tag}`}
                  checked={currentFilters.tag === tag}
                  onCheckedChange={(checked) => updateFilter("tag", checked ? tag : null)}
                />
                <label htmlFor={`usecase-${tag}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      )}

      {categorizedTags && categorizedTags.feature.length > 0 && (
        <FilterSection title="Features" sectionKey="feature">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categorizedTags.feature.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${tag}`}
                  checked={currentFilters.tag === tag}
                  onCheckedChange={(checked) => updateFilter("tag", checked ? tag : null)}
                />
                <label htmlFor={`feature-${tag}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      )}

      {categorizedTags && categorizedTags.other.length > 0 && (
        <FilterSection title="Other Tags" sectionKey="tags">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categorizedTags.other.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={currentFilters.tag === tag}
                  onCheckedChange={(checked) => updateFilter("tag", checked ? tag : null)}
                />
                <label htmlFor={`tag-${tag}`} className="text-sm text-[#0B1C2C] cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
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
                {formatTag(currentFilters.type)}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {currentFilters.vendor && (
              <Button variant="outline" size="sm" onClick={() => updateFilter("vendor", null)} className="text-xs">
                {currentFilters.vendor}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {currentFilters.tag && (
              <Button variant="outline" size="sm" onClick={() => updateFilter("tag", null)} className="text-xs">
                {formatTag(currentFilters.tag)}
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
