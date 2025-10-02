"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"
import type { ShopifyProduct } from "@/lib/shopify"
import { toNodes } from "@/lib/connection"

interface FrequentlyBoughtTogetherProps {
  mainProduct: ShopifyProduct
  bundleProducts?: ShopifyProduct[]
}

export function FrequentlyBoughtTogether({ mainProduct, bundleProducts = [] }: FrequentlyBoughtTogetherProps) {
  const mainVariant = toNodes(mainProduct.variants)[0]
  const mainPrice = mainVariant ? Number.parseFloat(mainVariant.price.amount) : 0

  // Mock bundle products if none provided
  const defaultBundles = bundleProducts.length > 0 ? bundleProducts : []

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set([mainProduct.id]))

  const toggleItem = (productId: string) => {
    const newSelected = new Set(selectedItems)
    if (productId === mainProduct.id) return // Can't deselect main product

    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedItems(newSelected)
  }

  const calculateTotal = () => {
    let total = 0
    if (selectedItems.has(mainProduct.id)) {
      total += mainPrice
    }
    defaultBundles.forEach((product) => {
      if (selectedItems.has(product.id)) {
        const variant = toNodes(product.variants)[0]
        if (variant) {
          total += Number.parseFloat(variant.price.amount)
        }
      }
    })
    return total
  }

  if (defaultBundles.length === 0) return null

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Frequently Bought Together</h2>

      <div className="space-y-4">
        {/* Main Product */}
        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
          <Checkbox
            checked={true}
            disabled
            className="data-[state=checked]:bg-[#C8A55C] data-[state=checked]:border-[#C8A55C]"
          />
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={toNodes(mainProduct.images)[0]?.url || "/placeholder.svg"}
              alt={mainProduct.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-[#0B1C2C] truncate">{mainProduct.title}</p>
            <p className="text-sm font-bold text-[#C8A55C]">${mainPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Bundle Products */}
        {defaultBundles.slice(0, 2).map((product, index) => {
          const variant = toNodes(product.variants)[0]
          const price = variant ? Number.parseFloat(variant.price.amount) : 0
          const image = toNodes(product.images)[0]

          return (
            <div key={product.id}>
              <div className="flex items-center justify-center py-2">
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <Checkbox
                  checked={selectedItems.has(product.id)}
                  onCheckedChange={() => toggleItem(product.id)}
                  className="data-[state=checked]:bg-[#C8A55C] data-[state=checked]:border-[#C8A55C]"
                />
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={image?.url || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#0B1C2C] truncate">{product.title}</p>
                  <p className="text-sm font-bold text-[#C8A55C]">${price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-[#0B1C2C]">Total price:</span>
          <span className="text-2xl font-bold text-[#C8A55C]">${calculateTotal().toFixed(2)}</span>
        </div>
        <Button className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-semibold py-6 text-lg" size="lg">
          Add Bundle to Cart
        </Button>
      </div>
    </Card>
  )
}
