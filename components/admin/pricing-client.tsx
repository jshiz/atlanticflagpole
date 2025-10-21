"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, TrendingDown, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Product {
  id: string
  title: string
  handle: string
  variants: Array<{
    id: string
    title: string
    price: string
  }>
}

export default function PricingClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [updateType, setUpdateType] = useState<"increase" | "decrease">("increase")
  const [percentage, setPercentage] = useState("")
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/pricing/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const toggleProduct = (id: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedProducts(newSelected)
  }

  const toggleAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(products.map((p) => p.id)))
    }
  }

  const calculateNewPrice = (currentPrice: string, percent: number, type: "increase" | "decrease") => {
    const price = Number.parseFloat(currentPrice)
    const multiplier = type === "increase" ? 1 + percent / 100 : 1 - percent / 100
    return (price * multiplier).toFixed(2)
  }

  const applyPriceUpdate = async () => {
    if (selectedProducts.size === 0) {
      setSaveStatus({ type: "error", message: "No products selected" })
      return
    }

    const percent = Number.parseFloat(percentage)
    if (isNaN(percent) || percent <= 0 || percent > 100) {
      setSaveStatus({ type: "error", message: "Enter a valid percentage (1-100)" })
      return
    }

    setUpdating(true)
    setSaveStatus(null)

    try {
      const updates = products
        .filter((p) => selectedProducts.has(p.id))
        .flatMap((product) =>
          product.variants.map((variant) => ({
            variantId: variant.id,
            newPrice: calculateNewPrice(variant.price, percent, updateType),
          })),
        )

      const response = await fetch("/api/admin/pricing/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      })

      if (!response.ok) throw new Error("Failed to update prices")

      setSaveStatus({
        type: "success",
        message: `Successfully updated prices for ${selectedProducts.size} products`,
      })

      // Refresh products
      await fetchProducts()
      setSelectedProducts(new Set())
      setPercentage("")
    } catch (error) {
      setSaveStatus({ type: "error", message: "Failed to update prices" })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quick Price Updater</h1>
          <p className="text-muted-foreground">Apply percentage-based price changes across products</p>
        </div>
        <Button onClick={fetchProducts} disabled={loading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {selectedProducts.size > 0 && (
        <Card className="border-blue-500">
          <CardHeader>
            <CardTitle>Bulk Price Update ({selectedProducts.size} selected)</CardTitle>
            <CardDescription>Apply percentage-based price changes to selected products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Update Type</label>
                <Select value={updateType} onValueChange={(v: any) => setUpdateType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Increase Prices
                      </div>
                    </SelectItem>
                    <SelectItem value="decrease">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        Decrease Prices
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Percentage (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>

            {percentage && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will {updateType} prices by {percentage}% for {selectedProducts.size} selected products
                </AlertDescription>
              </Alert>
            )}

            <Button onClick={applyPriceUpdate} disabled={updating} className="w-full">
              <DollarSign className="mr-2 h-4 w-4" />
              {updating ? "Updating..." : "Apply Price Changes"}
            </Button>

            {saveStatus && (
              <Alert variant={saveStatus.type === "success" ? "default" : "destructive"}>
                {saveStatus.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>{saveStatus.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Select products to update pricing</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading products...</div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Checkbox
                  checked={selectedProducts.size === products.length && products.length > 0}
                  onCheckedChange={toggleAll}
                />
                <span className="text-sm font-medium">Select All ({products.length})</span>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.title}</h3>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {product.variants.map((variant) => (
                          <Badge key={variant.id} variant="outline">
                            {variant.title}: ${variant.price}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
