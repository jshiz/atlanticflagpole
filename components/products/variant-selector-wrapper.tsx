"use client"

import { Suspense } from "react"
import { VariantSelector } from "./variant-selector"
import type { ProductOption, ProductVariant } from "@/lib/shopify/types"

interface VariantSelectorWrapperProps {
  options: ProductOption[]
  variants: ProductVariant[]
}

export function VariantSelectorWrapper({ options, variants }: VariantSelectorWrapperProps) {
  return (
    <Suspense fallback={<div className="h-10 animate-pulse bg-muted rounded" />}>
      <VariantSelector options={options} variants={variants} />
    </Suspense>
  )
}
