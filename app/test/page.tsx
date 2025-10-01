"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { getProducts, getCollections } from "@/lib/shopify"
import type { ShopifyProduct, ShopifyCollection } from "@/lib/shopify/types"
import { Loader } from "@/components/ui/loader"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function TestPage() {
  const { cart, loading: cartLoading, addToCart } = useCart()
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [collections, setCollections] = useState<ShopifyCollection[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [collectionsLoading, setCollectionsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)
  const [collectionsError, setCollectionsError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<Record<string, boolean>>({})

  // Check environment variables
  useEffect(() => {
    const checkEnvVars = () => {
      const vars = {
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: !!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
      }
      setEnvVars(vars)
      console.log("[v0] Environment variables check:", vars)
    }
    checkEnvVars()
  }, [])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("[v0] Fetching products...")
        const data = await getProducts({ first: 5 })
        console.log("[v0] Products fetched:", data)
        setProducts(data)
        setProductsError(null)
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
        setProductsError(error instanceof Error ? error.message : "Unknown error")
      } finally {
        setProductsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Fetch collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        console.log("[v0] Fetching collections...")
        const data = await getCollections(5)
        console.log("[v0] Collections fetched:", data)
        setCollections(data)
        setCollectionsError(null)
      } catch (error) {
        console.error("[v0] Error fetching collections:", error)
        setCollectionsError(error instanceof Error ? error.message : "Unknown error")
      } finally {
        setCollectionsLoading(false)
      }
    }
    fetchCollections()
  }, [])

  const StatusIndicator = ({ status }: { status: boolean | null }) => {
    if (status === null) return <Loader className="w-4 h-4" />
    if (status) return <CheckCircle2 className="w-4 h-4 text-green-600" />
    return <XCircle className="w-4 h-4 text-red-600" />
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-8">Shopify Integration Test Page</h1>

        {/* Environment Variables Check */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Environment Variables
          </h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <StatusIndicator status={value} />
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key}</code>
                <span className="text-sm text-gray-600">{value ? "✓ Set" : "✗ Not set"}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Cart Status */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Cart Status</h2>
          {cartLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4" />
              <span>Loading cart...</span>
            </div>
          ) : cart ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="font-semibold">Cart Active</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Cart ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{cart.id}</code>
                </p>
                <p>Total Items: {cart.lines?.edges?.length || 0}</p>
                <p>
                  Total: ${cart.cost?.totalAmount?.amount || "0.00"} {cart.cost?.totalAmount?.currencyCode || "USD"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span>No active cart</span>
            </div>
          )}
        </Card>

        {/* Products Test */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Products API Test</h2>
          {productsLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4" />
              <span>Loading products...</span>
            </div>
          ) : productsError ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4" />
                <span className="font-semibold">Error loading products</span>
              </div>
              <pre className="bg-red-50 p-4 rounded text-xs overflow-auto">{productsError}</pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">Successfully loaded {products.length} products</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 3).map((product) => {
                  const variant = product.variants?.edges?.[0]?.node
                  const image = product.images?.edges?.[0]?.node
                  return (
                    <Card key={product.id} className="p-4">
                      {image && (
                        <div className="w-full h-32 bg-gray-100 rounded mb-2 overflow-hidden">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.altText || product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        ${product.priceRange?.minVariantPrice?.amount}{" "}
                        {product.priceRange?.minVariantPrice?.currencyCode}
                      </p>
                      {variant && (
                        <Button
                          size="sm"
                          onClick={() => addToCart(variant.id, 1)}
                          disabled={!variant.availableForSale}
                          className="w-full bg-[#C8A55C] hover:bg-[#a88947]"
                        >
                          {variant.availableForSale ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </Card>

        {/* Collections Test */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Collections API Test</h2>
          {collectionsLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4" />
              <span>Loading collections...</span>
            </div>
          ) : collectionsError ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4" />
                <span className="font-semibold">Error loading collections</span>
              </div>
              <pre className="bg-red-50 p-4 rounded text-xs overflow-auto">{collectionsError}</pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">Successfully loaded {collections.length} collections</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collections.slice(0, 4).map((collection) => (
                  <Card key={collection.id} className="p-4">
                    {collection.image && (
                      <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
                        <img
                          src={collection.image.url || "/placeholder.svg"}
                          alt={collection.image.altText || collection.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-sm">{collection.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{collection.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Debug Console */}
        <Card className="p-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Debug Information</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-auto max-h-96">
            <p>Check browser console (F12) for detailed logs with [v0] prefix</p>
            <p className="mt-2">Cart Object:</p>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
          </div>
        </Card>
      </div>
    </main>
  )
}
