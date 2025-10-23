"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Package, RefreshCw, Search } from "lucide-react"
import Link from "next/link"

interface InventoryItem {
  productId: string
  productTitle: string
  productHandle: string
  variantId: string
  variantTitle: string
  inventory: number
  status: "critical" | "low" | "ok"
}

export default function InventoryClient() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [threshold, setThreshold] = useState(10)

  const fetchInventory = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/inventory?threshold=${threshold}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data.items || [])
      }
    } catch (error) {
      console.error("Failed to fetch inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [threshold])

  const filteredItems = items.filter(
    (item) =>
      item.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variantTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const criticalCount = items.filter((i) => i.status === "critical").length
  const lowCount = items.filter((i) => i.status === "low").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Alerts</h1>
          <p className="text-muted-foreground">Monitor low stock and out-of-stock products</p>
        </div>
        <Button onClick={fetchInventory} disabled={loading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Critical (0 units)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{criticalCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{lowCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Below threshold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Alert Threshold</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number.parseInt(e.target.value) || 10)}
              min="1"
              max="100"
              className="w-24"
            />
            <p className="text-xs text-muted-foreground mt-1">Units</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
          <CardDescription>Products requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading inventory...</div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No inventory alerts</p>
                <p className="text-xs mt-2">All products are well-stocked</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.productTitle}</h3>
                        {item.status === "critical" ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Out of Stock
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.variantTitle} - {item.inventory} units remaining
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/products/${item.productHandle}`} target="_blank">
                        View Product
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
