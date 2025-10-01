import { AdvancedFilters } from "@/components/collections/advanced-filters"

interface ProductFiltersWrapperProps {
  availableFilters: {
    productTypes?: string[]
    vendors?: string[]
    tags?: string[]
  }
}

export function ProductFiltersWrapper({ availableFilters }: ProductFiltersWrapperProps) {
  return <AdvancedFilters availableFilters={availableFilters} />
}
