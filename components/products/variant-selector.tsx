"use client"

import type { ShopifyProduct, ProductVariant, ProductOption } from "@/lib/shopify/types"
import { useState, useMemo } from "react"
import { toNodes } from "@/lib/connection"
import { Check } from "lucide-react"

interface VariantSelectorProps {
  options: ProductOption[]
  variants: ProductVariant[]
  onVariantChange?: (variant: ProductVariant | undefined) => void
}

export function VariantSelector({ options, variants, onVariantChange }: VariantSelectorProps) {
  const initialSelections: Record<string, string> = {}
  options.forEach((option) => {
    if (option.values.length > 0) {
      initialSelections[option.name] = option.values[0]
    }
  })

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialSelections)

  const selectedVariant = useMemo(() => {
    const matchingVariant = variants.find((variant) => {
      return variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value)
    })
    return matchingVariant
  }, [variants, selectedOptions])

  useMemo(() => {
    if (onVariantChange) {
      onVariantChange(selectedVariant)
    }
  }, [selectedVariant, onVariantChange])

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {options.map((option) => {
        const currentValue = selectedOptions[option.name] || option.values[0]
        const isColorOption =
          option.name.toLowerCase().includes("color") || option.name.toLowerCase().includes("finish")

        return (
          <div key={option.id}>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-[#0B1C2C] uppercase tracking-wide">{option.name}</label>
              <span className="text-sm text-[#C8A55C] font-semibold">{currentValue}</span>
            </div>
            {isColorOption ? (
              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                  const isSelected = currentValue === value
                  const colorMap: Record<string, string> = {
                    silver: "#C0C0C0",
                    bronze: "#CD7F32",
                    black: "#000000",
                    white: "#FFFFFF",
                    gold: "#FFD700",
                    red: "#DC143C",
                    blue: "#1E90FF",
                  }
                  const colorHex = colorMap[value.toLowerCase()] || "#C8A55C"

                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:shadow-lg ${
                        isSelected
                          ? "border-[#C8A55C] bg-[#C8A55C]/10 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#C8A55C]/50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-4 ${isSelected ? "border-[#C8A55C]" : "border-gray-300"} shadow-md transition-all group-hover:scale-110`}
                        style={{ backgroundColor: colorHex }}
                      />
                      <span className={`text-xs font-semibold ${isSelected ? "text-[#C8A55C]" : "text-gray-700"}`}>
                        {value}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8A55C] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {option.values.map((value) => {
                  const isSelected = currentValue === value
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`relative p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                        isSelected
                          ? "border-[#C8A55C] bg-[#C8A55C]/10 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#C8A55C]/50"
                      }`}
                    >
                      <span className={`block text-sm font-bold ${isSelected ? "text-[#C8A55C]" : "text-[#0B1C2C]"}`}>
                        {value}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#C8A55C] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function useSelectedVariant(product: ShopifyProduct): ProductVariant | undefined {
  const variants = toNodes(product.variants)
  return variants[0]
}
