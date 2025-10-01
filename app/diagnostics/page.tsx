import { getProducts, getCollections, createCart } from "@/lib/shopify"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

type TestResult = {
  name: string
  status: "success" | "error" | "warning"
  message: string
  details?: any
}

export default async function UnifiedDiagnosticsPage() {
  const results: TestResult[] = []

  // Test 1: Environment Variables
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"

  if (!storeDomain || !storefrontToken) {
    results.push({
      name: "Environment Variables",
      status: "error",
      message: "Missing required environment variables",
      details: {
        SHOPIFY_STORE_DOMAIN: storeDomain || "NOT SET",
        SHOPIFY_STOREFRONT_TOKEN: storefrontToken ? "SET" : "NOT SET",
        SHOPIFY_API_VERSION: apiVersion,
        fix: "Add these environment variables in your Vercel project settings",
      },
    })
  } else {
    results.push({
      name: "Environment Variables",
      status: "success",
      message: "All required environment variables are set",
      details: {
        SHOPIFY_STORE_DOMAIN: storeDomain,
        SHOPIFY_STOREFRONT_TOKEN: "SET (hidden)",
        SHOPIFY_API_VERSION: apiVersion,
      },
    })
  }

  // Test 2: Products API
  try {
    const products = await getProducts({ first: 5 })

    if (products.length === 0) {
      results.push({
        name: "Products API",
        status: "warning",
        message: "API connection works, but no products found",
        details: {
          count: 0,
          fix: "Make sure products are published to the 'Headless' sales channel in Shopify Admin",
          steps: [
            "Go to Shopify Admin → Products",
            "Select your products",
            "Click 'More actions' → 'Manage'",
            "Enable the 'Headless' channel",
          ],
        },
      })
    } else {
      results.push({
        name: "Products API",
        status: "success",
        message: `Successfully fetched ${products.length} products`,
        details: {
          count: products.length,
          sampleProducts: products.slice(0, 3).map((p) => ({
            title: p.title,
            handle: p.handle,
            price: p.priceRange.minVariantPrice.amount,
            available: p.availableForSale,
          })),
        },
      })
    }
  } catch (error: any) {
    results.push({
      name: "Products API",
      status: "error",
      message: `Failed to fetch products: ${error.message}`,
      details: {
        error: error.message,
        commonCauses: [
          "Invalid SHOPIFY_STOREFRONT_TOKEN",
          "Store domain is incorrect",
          "Storefront API not enabled in Shopify",
          "Network/firewall issues",
        ],
        fix: "Check your Shopify Storefront API token and store domain",
      },
    })
  }

  // Test 3: Collections API
  try {
    const collections = await getCollections(10)

    if (collections.length === 0) {
      results.push({
        name: "Collections API",
        status: "warning",
        message: "API connection works, but no collections found",
        details: {
          count: 0,
          fix: "Create collections in Shopify Admin → Products → Collections",
        },
      })
    } else {
      results.push({
        name: "Collections API",
        status: "success",
        message: `Successfully fetched ${collections.length} collections`,
        details: {
          count: collections.length,
          collections: collections.map((c) => ({
            title: c.title,
            handle: c.handle,
          })),
        },
      })
    }
  } catch (error: any) {
    results.push({
      name: "Collections API",
      status: "error",
      message: `Failed to fetch collections: ${error.message}`,
      details: {
        error: error.message,
        fix: "Check your Shopify API configuration",
      },
    })
  }

  // Test 4: Cart API
  try {
    const cart = await createCart()

    results.push({
      name: "Cart API",
      status: "success",
      message: "Cart operations working correctly",
      details: {
        cartId: cart.id,
        checkoutUrl: cart.checkoutUrl,
      },
    })
  } catch (error: any) {
    results.push({
      name: "Cart API",
      status: "error",
      message: `Failed to create cart: ${error.message}`,
      details: {
        error: error.message,
        fix: "Verify Storefront API has cart permissions enabled",
      },
    })
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Working</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
    }
  }

  const hasErrors = results.some((r) => r.status === "error")
  const allSuccess = results.every((r) => r.status === "success")

  return (
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-2">Shopify Integration Diagnostics</h1>
          <p className="text-[#0B1C2C]/70">Complete diagnostic report for your Atlantic Flagpole Shopify integration</p>
        </div>

        {/* Overall Status */}
        <Card
          className={`mb-6 ${allSuccess ? "border-green-200 bg-green-50" : hasErrors ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {allSuccess ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  All Systems Operational
                </>
              ) : hasErrors ? (
                <>
                  <XCircle className="h-6 w-6 text-red-600" />
                  Issues Detected
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  Warnings Present
                </>
              )}
            </CardTitle>
            <CardDescription>
              {allSuccess
                ? "Your Shopify integration is fully configured and working correctly!"
                : hasErrors
                  ? "Critical issues found. Follow the recommendations below to fix them."
                  : "Your integration is working but needs attention."}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Test Results */}
        <div className="space-y-4 mb-6">
          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 text-[#0B1C2C]/80">{result.message}</p>

                {result.details && (
                  <div className="bg-[#0B1C2C]/5 p-4 rounded-lg space-y-3">
                    {result.details.fix && (
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                        <p className="font-semibold text-sm mb-1 text-yellow-900">💡 How to Fix:</p>
                        <p className="text-sm text-yellow-800">{result.details.fix}</p>
                      </div>
                    )}

                    {result.details.steps && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Steps:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-[#0B1C2C]/70">
                          {result.details.steps.map((step: string, i: number) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {result.details.commonCauses && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Common Causes:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-[#0B1C2C]/70">
                          {result.details.commonCauses.map((cause: string, i: number) => (
                            <li key={i}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.details.sampleProducts && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Sample Products:</p>
                        <div className="space-y-2">
                          {result.details.sampleProducts.map((product: any, i: number) => (
                            <div key={i} className="bg-white p-3 rounded border border-[#0B1C2C]/10">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">{product.title}</p>
                                  <p className="text-xs text-[#0B1C2C]/60">
                                    ${product.price} • {product.available ? "Available" : "Sold Out"}
                                  </p>
                                </div>
                                <Link
                                  href={`/products/${product.handle}`}
                                  className="text-[#0B1C2C] hover:underline flex items-center gap-1 text-sm"
                                >
                                  View <ExternalLink className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.details.collections && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Collections Found:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {result.details.collections.map((collection: any, i: number) => (
                            <div
                              key={i}
                              className="bg-white p-2 rounded border border-[#0B1C2C]/10 flex items-center justify-between"
                            >
                              <div>
                                <p className="text-sm font-medium">{collection.title}</p>
                                <code className="text-xs text-[#0B1C2C]/60">{collection.handle}</code>
                              </div>
                              <Link
                                href={`/collections/${collection.handle}`}
                                className="text-[#0B1C2C] hover:underline"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.details.SHOPIFY_STORE_DOMAIN && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Configuration:</p>
                        <div className="space-y-1 font-mono text-xs bg-white p-3 rounded border border-[#0B1C2C]/10">
                          <div className="flex justify-between">
                            <span className="text-[#0B1C2C]/60">SHOPIFY_STORE_DOMAIN:</span>
                            <span className="font-semibold">{result.details.SHOPIFY_STORE_DOMAIN}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#0B1C2C]/60">SHOPIFY_STOREFRONT_TOKEN:</span>
                            <span className="font-semibold">{result.details.SHOPIFY_STOREFRONT_TOKEN}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#0B1C2C]/60">SHOPIFY_API_VERSION:</span>
                            <span className="font-semibold">{result.details.SHOPIFY_API_VERSION}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to key pages and resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/products"
              className="block px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors text-center"
            >
              View All Products →
            </Link>
            <Link
              href="/collections"
              className="block px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors text-center"
            >
              View All Collections →
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/api/debug-products"
                target="_blank"
                className="px-4 py-3 border-2 border-[#0B1C2C] text-[#0B1C2C] rounded-lg hover:bg-[#0B1C2C]/5 transition-colors text-center text-sm"
              >
                Test Products API
              </Link>
              <Link
                href="/api/shopify/test-collections"
                target="_blank"
                className="px-4 py-3 border-2 border-[#0B1C2C] text-[#0B1C2C] rounded-lg hover:bg-[#0B1C2C]/5 transition-colors text-center text-sm"
              >
                Test Collections API
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Setup Guide */}
        {hasErrors && (
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">Complete Setup Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-2">1. Set Environment Variables in Vercel</p>
                <p className="text-[#0B1C2C]/70 mb-2">Go to your Vercel project → Settings → Environment Variables</p>
                <div className="bg-white p-3 rounded border border-blue-200 font-mono text-xs space-y-1">
                  <div>SHOPIFY_STORE_DOMAIN=your-store.myshopify.com</div>
                  <div>SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token</div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">2. Get Your Storefront Access Token</p>
                <p className="text-[#0B1C2C]/70">
                  In Shopify Admin → Settings → Apps and sales channels → Develop apps → Create an app → Configure
                  Storefront API scopes → Install app
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">3. Publish Products to Headless Channel</p>
                <p className="text-[#0B1C2C]/70">
                  Products → Select products → More actions → Manage → Enable "Headless" channel
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">4. Redeploy Your Site</p>
                <p className="text-[#0B1C2C]/70">
                  After setting environment variables, trigger a new deployment in Vercel
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
