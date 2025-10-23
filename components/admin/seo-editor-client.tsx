"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Save, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Product {
  id: string
  title: string
  handle: string
  seo: {
    title: string | null
    description: string | null
  }
  featuredImage: {
    altText: string | null
  } | null
}

export default function SEOEditorClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [bulkTitle, setBulkTitle] = useState("")
  const [bulkDescription, setBulkDescription] = useState("")
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/seo/products")
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

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.handle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(filteredProducts.map((p) => p.id)))
    }
  }

  const updateSingleProduct = async (productId: string, updates: { title?: string; description?: string }) => {
    try {
      const response = await fetch("/api/admin/seo/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, ...updates }),
      })

      if (!response.ok) throw new Error("Failed to update")

      // Update local state
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? {
                ...p,
                seo: {
                  title: updates.title !== undefined ? updates.title : p.seo.title,
                  description: updates.description !== undefined ? updates.description : p.seo.description,
                },
              }
            : p,
        ),
      )

      return true
    } catch (error) {
      console.error("Failed to update product:", error)
      return false
    }
  }

  const bulkUpdate = async () => {
    if (selectedProducts.size === 0) {
      setSaveStatus({ type: "error", message: "No products selected" })
      return
    }

    if (!bulkTitle && !bulkDescription) {
      setSaveStatus({ type: "error", message: "Enter at least one field to update" })
      return
    }

    setSaving(true)
    setSaveStatus(null)

    let successCount = 0
    const updates: { title?: string; description?: string } = {}
    if (bulkTitle) updates.title = bulkTitle
    if (bulkDescription) updates.description = bulkDescription

    for (const productId of Array.from(selectedProducts)) {
      const success = await updateSingleProduct(productId, updates)
      if (success) successCount++
    }

    setSaving(false)
    setSaveStatus({
      type: successCount === selectedProducts.size ? "success" : "error",
      message: `Updated ${successCount} of ${selectedProducts.size} products`,
    })

    // Clear selections and bulk fields
    setSelectedProducts(new Set())
    setBulkTitle("")
    setBulkDescription("")
  }

  const hasIssues = (product: Product) => {
    const titleLength = product.seo.title?.length || 0
    const descLength = product.seo.description?.length || 0
    return titleLength === 0 || titleLength > 60 || descLength === 0 || descLength > 160
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Bulk Editor</h1>
          <p className="text-muted-foreground">Manage meta titles and descriptions across your products</p>
        </div>
        <Button onClick={fetchProducts} disabled={loading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {selectedProducts.size > 0 && (
        <Card className="border-blue-500">
          <CardHeader>
            <CardTitle>Bulk Update ({selectedProducts.size} selected)</CardTitle>
            <CardDescription>Apply changes to all selected products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Meta Title</label>
              <Input
                placeholder="Leave empty to keep existing titles"
                value={bulkTitle}
                onChange={(e) => setBulkTitle(e.target.value)}
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">{bulkTitle.length}/60 characters</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Meta Description</label>
              <Textarea
                placeholder="Leave empty to keep existing descriptions"
                value={bulkDescription}
                onChange={(e) => setBulkDescription(e.target.value)}
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">{bulkDescription.length}/160 characters</p>
            </div>

            <Button onClick={bulkUpdate} disabled={saving} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Updating..." : "Apply to Selected Products"}
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
          <CardDescription>Select products to edit SEO metadata</CardDescription>
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
              <div className="text-center py-12 text-muted-foreground">Loading products...</div>
            ) : (
              <>
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Checkbox
                    checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                    onCheckedChange={toggleAll}
                  />
                  <span className="text-sm font-medium">Select All ({filteredProducts.length})</span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedProducts.has(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{product.title}</h3>
                            {hasIssues(product) && (
                              <Badge variant="destructive" className="text-xs">
                                Needs Attention
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">/{product.handle}</p>
                        </div>
                      </div>

                      <div className="space-y-2 pl-8">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Meta Title</label>
                          <Input
                            value={product.seo.title || ""}
                            onChange={(e) => updateSingleProduct(product.id, { title: e.target.value })}
                            placeholder="Enter meta title..."
                            maxLength={60}
                            className="mt-1"
                          />
                          <p
                            className={`text-xs mt-1 ${
                              (product.seo.title?.length || 0) > 60 ? "text-red-500" : "text-muted-foreground"
                            }`}
                          >
                            {product.seo.title?.length || 0}/60 characters
                          </p>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Meta Description</label>
                          <Textarea
                            value={product.seo.description || ""}
                            onChange={(e) => updateSingleProduct(product.id, { description: e.target.value })}
                            placeholder="Enter meta description..."
                            maxLength={160}
                            rows={2}
                            className="mt-1"
                          />
                          <p
                            className={`text-xs mt-1 ${
                              (product.seo.description?.length || 0) > 160 ? "text-red-500" : "text-muted-foreground"
                            }`}
                          >
                            {product.seo.description?.length || 0}/160 characters
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
