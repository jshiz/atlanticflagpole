"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"

type TestResult = {
  name: string
  status: "pending" | "success" | "error" | "warning"
  message: string
  details?: any
}

export default function TestShopifyPage() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])

  const runTests = async () => {
    setTesting(true)
    setResults([])

    const tests: TestResult[] = []

    // Test 1: Check environment variables
    tests.push({
      name: "Environment Variables",
      status: "pending",
      message: "Checking configuration...",
    })
    setResults([...tests])

    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    if (!storeDomain) {
      tests[0] = {
        name: "Environment Variables",
        status: "warning",
        message: "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN not set, using fallback: v0-template.myshopify.com",
        details: {
          recommendation: "Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN in your environment variables",
          blazityDocs: "https://docs.blazity.com/enterprise-commerce/setup#shopify-store-domain",
        },
      }
    } else {
      tests[0] = {
        name: "Environment Variables",
        status: "success",
        message: `Store domain configured: ${storeDomain}`,
      }
    }
    setResults([...tests])

    // Test 2: Fetch products
    tests.push({
      name: "Products API",
      status: "pending",
      message: "Fetching products...",
    })
    setResults([...tests])

    try {
      const response = await fetch("/api/shopify/test-products")
      const data = await response.json()

      if (data.error) {
        tests[1] = {
          name: "Products API",
          status: "error",
          message: data.error,
          details: {
            recommendation: "Check your Shopify store domain and ensure it's accessible",
            possibleIssues: [
              "Store domain is incorrect",
              "Store is password protected",
              "Storefront API is not enabled",
            ],
            blazityDocs: "https://docs.blazity.com/enterprise-commerce/setup#headless-app",
          },
        }
      } else {
        tests[1] = {
          name: "Products API",
          status: "success",
          message: `Successfully fetched ${data.count} products`,
          details: {
            products: data.products.slice(0, 3).map((p: any) => ({
              title: p.title,
              handle: p.handle,
              price: p.priceRange.minVariantPrice.amount,
            })),
          },
        }
      }
    } catch (error: any) {
      tests[1] = {
        name: "Products API",
        status: "error",
        message: `Failed to fetch products: ${error.message}`,
        details: {
          recommendation: "Verify your Shopify store is accessible and the Storefront API is enabled",
          blazityDocs: "https://docs.blazity.com/enterprise-commerce/setup#headless-app",
        },
      }
    }
    setResults([...tests])

    // Test 3: Fetch collections
    tests.push({
      name: "Collections API",
      status: "pending",
      message: "Fetching collections...",
    })
    setResults([...tests])

    try {
      const response = await fetch("/api/shopify/test-collections")
      const data = await response.json()

      if (data.error) {
        tests[2] = {
          name: "Collections API",
          status: "error",
          message: data.error,
          details: {
            recommendation: "Ensure collections exist in your Shopify store",
          },
        }
      } else {
        tests[2] = {
          name: "Collections API",
          status: "success",
          message: `Successfully fetched ${data.count} collections`,
          details: {
            collections: data.collections.map((c: any) => ({
              title: c.title,
              handle: c.handle,
            })),
          },
        }
      }
    } catch (error: any) {
      tests[2] = {
        name: "Collections API",
        status: "error",
        message: `Failed to fetch collections: ${error.message}`,
      }
    }
    setResults([...tests])

    // Test 4: Cart operations
    tests.push({
      name: "Cart API",
      status: "pending",
      message: "Testing cart creation...",
    })
    setResults([...tests])

    try {
      const response = await fetch("/api/shopify/test-cart")
      const data = await response.json()

      if (data.error) {
        tests[3] = {
          name: "Cart API",
          status: "error",
          message: data.error,
          details: {
            recommendation: "Verify Storefront API has cart permissions enabled",
          },
        }
      } else {
        tests[3] = {
          name: "Cart API",
          status: "success",
          message: "Cart operations working correctly",
          details: {
            cartId: data.cartId,
            checkoutUrl: data.checkoutUrl,
          },
        }
      }
    } catch (error: any) {
      tests[3] = {
        name: "Cart API",
        status: "error",
        message: `Failed to test cart: ${error.message}`,
      }
    }
    setResults([...tests])

    setTesting(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Testing...</Badge>
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shopify Integration Diagnostics</h1>
        <p className="text-muted-foreground">
          Test your Shopify connection and get recommendations for fixing any issues
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuration Check</CardTitle>
          <CardDescription>
            This tool will test your Shopify integration and provide guidance based on{" "}
            <a
              href="https://docs.blazity.com/enterprise-commerce/setup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Blazity Enterprise Commerce setup docs
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runTests} disabled={testing} size="lg" className="w-full sm:w-auto">
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              "Run Diagnostic Tests"
            )}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
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
                <p className="text-sm mb-3">{result.message}</p>

                {result.details && (
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    {result.details.recommendation && (
                      <div>
                        <p className="font-semibold text-sm mb-1">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">{result.details.recommendation}</p>
                      </div>
                    )}

                    {result.details.blazityDocs && (
                      <div>
                        <p className="font-semibold text-sm mb-1">Documentation:</p>
                        <a
                          href={result.details.blazityDocs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {result.details.blazityDocs}
                        </a>
                      </div>
                    )}

                    {result.details.possibleIssues && (
                      <div>
                        <p className="font-semibold text-sm mb-1">Possible Issues:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {result.details.possibleIssues.map((issue: string, i: number) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.details.products && (
                      <div>
                        <p className="font-semibold text-sm mb-1">Sample Products:</p>
                        <pre className="text-xs bg-background p-2 rounded overflow-auto">
                          {JSON.stringify(result.details.products, null, 2)}
                        </pre>
                      </div>
                    )}

                    {result.details.collections && (
                      <div>
                        <p className="font-semibold text-sm mb-1">Collections:</p>
                        <pre className="text-xs bg-background p-2 rounded overflow-auto">
                          {JSON.stringify(result.details.collections, null, 2)}
                        </pre>
                      </div>
                    )}

                    {result.details.cartId && (
                      <div>
                        <p className="font-semibold text-sm mb-1">Cart Details:</p>
                        <p className="text-xs text-muted-foreground">Cart ID: {result.details.cartId}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results.length > 0 && !testing && (
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Based on the Blazity Enterprise Commerce setup guide, ensure you have:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>SHOPIFY_STORE_DOMAIN</strong> - Your store domain (e.g., your-store.myshopify.com)
              </li>
              <li>
                <strong>Headless App</strong> - Installed from Shopify App Store with Storefront API access
              </li>
              <li>
                <strong>API Scopes</strong> - Enabled unauthenticated_read_product_inventory and
                unauthenticated_read_customer_tags
              </li>
              <li>
                <strong>Webhooks</strong> - Configured for product/collection updates (for production)
              </li>
            </ul>
            <p className="mt-3">
              Full setup guide:{" "}
              <a
                href="https://docs.blazity.com/enterprise-commerce/setup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://docs.blazity.com/enterprise-commerce/setup
              </a>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
