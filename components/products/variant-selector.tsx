"use client"

import type { ShopifyProduct, ProductVariant } from "@/lib/shopify/types"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export function useSelectedVariant(product: ShopifyProduct): ProductVariant | undefined {
  const searchParams = useSearchParams()

  return useMemo(() => {
    const { variants, options } = product

    if (variants.length === 0) return undefined
    if (variants.length === 1) return variants[0]

    // Build selected options from URL params
    const selectedOptions: Record<string, string> = {}
    options.forEach((option) => {
      const paramValue = searchParams.get(option.name.toLowerCase())
      if (paramValue) {
        selectedOptions[option.name] = paramValue
      }
    })

    // Find matching variant
    const matchingVariant = variants.find((variant) => {
      return variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value)
    })

    return matchingVariant
  }, [product, searchParams])
}
