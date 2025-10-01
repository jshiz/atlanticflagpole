"use client"

import { Suspense } from "react"
import { AdvancedFilters } from "./advanced-filters"

interface AdvancedFiltersWrapperProps {
  availableFilters?: {
    productTypes?: string[]
    vendors?: string[]
    tags?: string[]
  }
}

export function AdvancedFiltersWrapper({ availableFilters }: AdvancedFiltersWrapperProps) {
  return (
    <Suspense fallback={<div className="h-10 animate-pulse bg-muted rounded" />}>
      <AdvancedFilters availableFilters={availableFilters} />
    </Suspense>
  )
}
