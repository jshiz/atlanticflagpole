import { AdvancedFilters } from "@/components/collections/advanced-filters"

interface ProductFiltersWrapperProps {
  availableFilters: {
    productTypes?: string[]
    vendors?: string[]
    tags?: string[]
    collections?: any[]
  }
  currentCollection?: string
}

export function ProductFiltersWrapper({ availableFilters, currentCollection }: ProductFiltersWrapperProps) {
  return <AdvancedFilters availableFilters={availableFilters} currentCollection={currentCollection} />
}
