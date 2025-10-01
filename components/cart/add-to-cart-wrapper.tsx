"use client"

import { Suspense } from "react"
import { AddToCart } from "./add-to-cart"
import type { ProductVariant } from "@/lib/shopify/types"

interface AddToCartWrapperProps {
  variants: ProductVariant[]
  availableForSale: boolean
}

export function AddToCartWrapper({ variants, availableForSale }: AddToCartWrapperProps) {
  return (
    <Suspense fallback={<div className="h-12 animate-pulse bg-muted rounded" />}>
      <AddToCart variants={variants} availableForSale={availableForSale} />
    </Suspense>
  )
}
