"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, Package, Eye, Archive, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: string
  title: string
  handle: string
  status: string
  totalInventory: number
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  featuredImage: {
    url: string
    altText: string | null
  } | null
  tags: string[]
  createdAt: string
  updatedAt: string
}

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/products")
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTab =
      (activeTab === "active" && product.status === "ACTIVE") ||
      (activeTab === "draft" && product.status === "DRAFT") ||
      (activeTab === "archived" && product.status === "ARCHIVED")

    return matchesSearch && matchesTab
  })

  const counts = {
    active: products.filter((p) => p.status === "ACTIVE").length,
    draft: products.filter((p) => p.status === "DRAFT").length,
    archived: products.filter((p) => p.status === "ARCHIVED").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your store products, prices, and inventory</p>
        </div>
        <Button onClick={fetchProducts} disabled={loading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>View and manage all products across your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, handle, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live ({counts.active})
                </TabsTrigger>
                <TabsTrigger value="draft" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Draft ({counts.draft})
                </TabsTrigger>
                <TabsTrigger value="archived" className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  Archived ({counts.archived})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {loading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No products found {searchTerm && `matching "${searchTerm}"`}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        {product.featuredImage ? (
                          <Image
                            src={product.featuredImage.url || "/placeholder.svg"}
                            alt={product.featuredImage.altText || product.title}
                            width={64}
                            height={64}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{product.title}</h3>
                            <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">/{product.handle}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="font-medium">
                              ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}{" "}
                              {product.priceRange.minVariantPrice.currencyCode}
                            </span>
                            <span className="text-muted-foreground">Inventory: {product.totalInventory}</span>
                          </div>
                          {product.tags.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {product.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {product.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/products/${product.handle}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
