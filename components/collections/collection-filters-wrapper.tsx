"use client"

import { Suspense } from "react"
import { CollectionFilters } from "./collection-filters"

interface CollectionFiltersWrapperProps {
  currentSort: string
}

export function CollectionFiltersWrapper({ currentSort }: CollectionFiltersWrapperProps) {
  return (
    <Suspense fallback={<div className="h-10 animate-pulse bg-muted rounded" />}>
      <CollectionFilters currentSort={currentSort} />
    </Suspense>
  )
}
