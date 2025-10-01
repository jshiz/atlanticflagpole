"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Package, Flag, Lightbulb, Wrench } from "lucide-react"
import Image from "next/image"

interface BundleItem {
  id: string
  name: string
  price: number
  image: string
  category: "flagpole" | "flag" | "lighting" | "accessories"
}

const bundleItems: BundleItem[] = [
  {
    id: "flagpole-20ft",
    name: "20ft Telescoping Flagpole",
    price: 299,
    image: "/telescoping-flagpole.jpg",
    category: "flagpole",
  },
  {
    id: "flagpole-25ft",
    name: "25ft Telescoping Flagpole",
    price: 399,
    image: "/tall-telescoping-flagpole.jpg",
    category: "flagpole",
  },
  {
    id: "flagpole-30ft",
    name: "30ft Telescoping Flagpole",
    price: 499,
    image: "/extra-tall-telescoping-flagpole.jpg",
    category: "flagpole",
  },
  {
    id: "american-flag-3x5",
    name: "American Flag 3x5ft",
    price: 49,
    image: "/american-flag.png",
    category: "flag",
  },
  {
    id: "american-flag-4x6",
    name: "American Flag 4x6ft",
    price: 69,
    image: "/large-american-flag.jpg",
    category: "flag",
  },
  {
    id: "solar-light",
    name: "Solar Flagpole Light",
    price: 79,
    image: "/solar-light.jpg",
    category: "lighting",
  },
  {
    id: "led-light",
    name: "LED Flagpole Light",
    price: 99,
    image: "/led-light-abstract.png",
    category: "lighting",
  },
  {
    id: "eagle-topper",
    name: "Gold Eagle Topper",
    price: 39,
    image: "/eagle-finial.jpg",
    category: "accessories",
  },
  {
    id: "ball-topper",
    name: "Gold Ball Topper",
    price: 29,
    image: "/ball-finial.jpg",
    category: "accessories",
  },
]

export function BundleBuilder() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const selectedProducts = bundleItems.filter((item) => selectedItems.includes(item.id))
  const subtotal = selectedProducts.reduce((sum, item) => sum + item.price, 0)
  const discount = subtotal > 0 ? Math.round(subtotal * 0.15) : 0
  const total = subtotal - discount

  const hasFlagpole = selectedProducts.some((item) => item.category === "flagpole")
  const hasFlag = selectedProducts.some((item) => item.category === "flag")

  const categories = [
    { id: "flagpole", name: "Flagpole", icon: Package, items: bundleItems.filter((i) => i.category === "flagpole") },
    { id: "flag", name: "Flags", icon: Flag, items: bundleItems.filter((i) => i.category === "flag") },
    { id: "lighting", name: "Lighting", icon: Lightbulb, items: bundleItems.filter((i) => i.category === "lighting") },
    {
      id: "accessories",
      name: "Accessories",
      icon: Wrench,
      items: bundleItems.filter((i) => i.category === "accessories"),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Build Your Perfect Bundle</h1>
        <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
          Customize your flagpole package and save 15% on your complete setup
        </p>
        <Badge className="mt-4 bg-red-600 hover:bg-red-700 text-lg px-4 py-2">Save 15% on Bundles</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-8">
          {categories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-4">
                  <CategoryIcon className="w-6 h-6 text-[#C8A55C]" />
                  <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">{category.name}</h2>
                  {category.id === "flagpole" && !hasFlagpole && (
                    <Badge variant="destructive" className="ml-2">
                      Required
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => {
                    const isSelected = selectedItems.includes(item.id)
                    return (
                      <Card
                        key={item.id}
                        className={`cursor-pointer transition-all ${
                          isSelected ? "ring-2 ring-[#C8A55C] shadow-lg" : "hover:shadow-md"
                        }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        <CardContent className="p-4">
                          <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#C8A55C] rounded-full p-1">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold text-[#0B1C2C] mb-2">{item.name}</h3>
                          <p className="text-xl font-bold text-[#C8A55C]">${item.price}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Your Bundle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedProducts.length === 0 ? (
                <p className="text-[#0B1C2C]/70 text-center py-8">Select items to build your bundle</p>
              ) : (
                <>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedProducts.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-[#0B1C2C]">{item.name}</span>
                        <span className="font-semibold">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-[#0B1C2C]/70">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Bundle Discount (15%)</span>
                      <span>-${discount}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold text-[#0B1C2C]">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>

                  {!hasFlagpole && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800 font-medium">Please select a flagpole to continue</p>
                    </div>
                  )}

                  {hasFlagpole && !hasFlag && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 font-medium">
                        Don't forget to add a flag to complete your setup!
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-semibold py-6"
                    disabled={!hasFlagpole}
                  >
                    Add Bundle to Cart
                  </Button>

                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2 text-sm text-[#0B1C2C]/70">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0B1C2C]/70">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Lifetime Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0B1C2C]/70">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>30-Day Returns</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
