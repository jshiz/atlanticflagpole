"use client"

import type { ShopifyProduct, ProductVariant, ProductOption } from "@/lib/shopify/types"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { toNodes } from "@/lib/connection"

export function useSelectedVariant(product: ShopifyProduct): ProductVariant | undefined {
  const searchParams = useSearchParams()

  return useMemo(() => {
    const variants = toNodes(product.variants)
    const { options } = product

    if (variants.length === 0) return undefined
    if (variants.length === 1) return variants[0]

    const selectedOptions: Record<string, string> = {}
    options.forEach((option) => {
      const paramValue = searchParams.get(option.name.toLowerCase())
      if (paramValue) {
        selectedOptions[option.name] = paramValue
      }
    })

    const matchingVariant = variants.find((variant) => {
      return variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value)
    })

    return matchingVariant
  }, [product, searchParams])
}

interface VariantSelectorProps {
  options: ProductOption[]
  variants: ProductVariant[]
}

export function VariantSelector({ options, variants }: VariantSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleOptionChange = (optionName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(optionName.toLowerCase(), value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const currentValue = searchParams.get(option.name.toLowerCase()) || option.values[0]

        return (
          <div key={option.id}>
            <label className="block text-sm font-semibold text-[#0B1C2C] mb-2">{option.name}:</label>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <Button
                  key={value}
                  variant={currentValue === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleOptionChange(option.name, value)}
                  className={
                    currentValue === value
                      ? "bg-[#C8A55C] hover:bg-[#B8954C] text-white"
                      : "border-gray-300 hover:border-[#C8A55C]"
                  }
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
