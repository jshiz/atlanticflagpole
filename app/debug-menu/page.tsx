"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Loader2, ExternalLink, Copy, Check } from "lucide-react"
import Link from "next/link"

type MenuTest = {
  name: string
  status: "pending" | "success" | "error" | "warning"
  message: string
  details?: any
}

export default function DebugMenuPage() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<MenuTest[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const runTests = async () => {
    setTesting(true)
    setResults([])

    const tests: MenuTest[] = []

    // Test 1: Check Shopify Menu
    tests.push({
      name: "Shopify Menu Structure",
      status: "pending",
      message: "Fetching menu from Shopify...",
    })
    setResults([...tests])

    try {
      const response = await fetch("/api/menu")
      const data = await response.json()

      if (data.error) {
        tests[0] = {
          name: "Shopify Menu Structure",
          status: "error",
          message: "Failed to fetch menu from Shopify",
          details: {
            error: data.error,
            recommendation: "Create a menu called 'main-menu' in Shopify Admin → Online Store → Navigation",
            usingFallback: true,
          },
        }
      } else if (!data.menu) {
        tests[0] = {
          name: "Shopify Menu Structure",
          status: "warning",
          message: "No menu found in Shopify - using fallback menu",
          details: {
            recommendation: "Create a menu called 'main-menu' in Shopify Admin → Online Store → Navigation",
            usingFallback: true,
            fallbackItems: data.fallbackMenu?.items || [],
          },
        }
      } else {
        tests[0] = {
          name: "Shopify Menu Structure",
          status: "success",
          message: `Successfully loaded menu with ${data.menu.items?.length || 0} top-level items`,
          details: {
            menu: data.menu,
            itemCount: data.menu.items?.length || 0,
          },
        }
      }
    } catch (error: any) {
      tests[0] = {
        name: "Shopify Menu Structure",
        status: "error",
        message: `Error: ${error.message}`,
        details: {
          recommendation: "Check your Shopify connection and API credentials",
        },
      }
    }
    setResults([...tests])

    // Test 2: Check Collections
    tests.push({
      name: "Collections Availability",
      status: "pending",
      message: "Checking collections...",
    })
    setResults([...tests])

    try {
      const response = await fetch("/api/shopify/test-collections")
      const data = await response.json()

      if (data.error) {
        tests[1] = {
          name: "Collections Availability",
          status: "error",
          message: data.error,
          details: {
            recommendation: "Create collections in Shopify Admin → Products → Collections",
          },
        }
      } else {
        const requiredCollections = [
          "flagpoles",
          "flags",
          "accessories",
          "holiday-seasonal",
          "telescoping-flagpoles",
          "aluminum-flagpoles",
          "american-flags",
          "state-flags",
        ]

        const existingHandles = data.collections.map((c: any) => c.handle)
        const missingCollections = requiredCollections.filter((handle) => !existingHandles.includes(handle))

        if (missingCollections.length > 0) {
          tests[1] = {
            name: "Collections Availability",
            status: "warning",
            message: `Found ${data.count} collections, but ${missingCollections.length} required collections are missing`,
            details: {
              existing: data.collections,
              missing: missingCollections,
              recommendation: "Create the missing collections in Shopify Admin",
            },
          }
        } else {
          tests[1] = {
            name: "Collections Availability",
            status: "success",
            message: `All required collections exist (${data.count} total)`,
            details: {
              collections: data.collections,
            },
          }
        }
      }
    } catch (error: any) {
      tests[1] = {
        name: "Collections Availability",
        status: "error",
        message: `Failed to fetch collections: ${error.message}`,
      }
    }
    setResults([...tests])

    // Test 3: Test Collection Links
    tests.push({
      name: "Collection Page Links",
      status: "pending",
      message: "Testing collection page accessibility...",
    })
    setResults([...tests])

    const testLinks = [
      { name: "Flagpoles", url: "/collections/flagpoles" },
      { name: "Flags", url: "/collections/flags" },
      { name: "Accessories", url: "/collections/accessories" },
    ]

    const linkResults = await Promise.all(
      testLinks.map(async (link) => {
        try {
          const response = await fetch(link.url, { method: "HEAD" })
          return {
            ...link,
            status: response.ok ? "success" : "error",
            statusCode: response.status,
          }
        } catch {
          return {
            ...link,
            status: "error",
            statusCode: 0,
          }
        }
      }),
    )

    const failedLinks = linkResults.filter((r) => r.status === "error")

    if (failedLinks.length === 0) {
      tests[2] = {
        name: "Collection Page Links",
        status: "success",
        message: "All collection pages are accessible",
        details: {
          tested: linkResults,
        },
      }
    } else {
      tests[2] = {
        name: "Collection Page Links",
        status: "warning",
        message: `${failedLinks.length} collection pages returned errors`,
        details: {
          failed: failedLinks,
          recommendation: "These collections may not exist in Shopify or have no products",
        },
      }
    }
    setResults([...tests])

    setTesting(false)
  }

  const getStatusIcon = (status: MenuTest["status"]) => {
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

  const getStatusBadge = (status: MenuTest["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Working</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Testing...</Badge>
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Menu & Navigation Debug Tool</h1>
        <p className="text-muted-foreground">Diagnose why your menu links aren't working and get step-by-step fixes</p>
      </div>

      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle>Quick Fix Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-semibold">If your menu links aren't working, you need to:</p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>
              <strong>Create Collections in Shopify</strong> - Go to Products → Collections and create collections with
              handles like "flagpoles", "flags", etc.
            </li>
            <li>
              <strong>Add Products to Collections</strong> - Each collection needs at least one product
            </li>
            <li>
              <strong>Create a Menu in Shopify</strong> - Go to Online Store → Navigation and create a menu called
              "main-menu"
            </li>
            <li>
              <strong>Link Menu Items to Collections</strong> - Add menu items that link to your collections
            </li>
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">Run the diagnostic below to see exactly what's missing</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Run Diagnostics</CardTitle>
          <CardDescription>Test your menu structure and collection availability</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runTests} disabled={testing} size="lg" className="w-full sm:w-auto">
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              "Run Menu Diagnostics"
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
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                        <p className="font-semibold text-sm mb-1 text-yellow-900">💡 Recommendation:</p>
                        <p className="text-sm text-yellow-800">{result.details.recommendation}</p>
                      </div>
                    )}

                    {result.details.menu && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Menu Structure:</p>
                        <div className="bg-background p-3 rounded border space-y-2">
                          {result.details.menu.items?.map((item: any, i: number) => (
                            <div key={i} className="text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.title}</span>
                                <code className="text-xs bg-muted px-2 py-0.5 rounded">{item.url}</code>
                                <Link
                                  href={item.url}
                                  target="_blank"
                                  className="text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              </div>
                              {item.items && item.items.length > 0 && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {item.items.map((subItem: any, j: number) => (
                                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <span>↳ {subItem.title}</span>
                                      <code className="bg-muted px-1.5 py-0.5 rounded">{subItem.url}</code>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.details.missing && result.details.missing.length > 0 && (
                      <div className="bg-red-50 border border-red-200 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-red-900">Missing Collections:</p>
                        <div className="space-y-2">
                          {result.details.missing.map((handle: string, i: number) => (
                            <div key={i} className="flex items-center justify-between bg-white p-2 rounded">
                              <code className="text-xs font-mono">{handle}</code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(handle, handle)}
                                className="h-7 text-xs"
                              >
                                {copied === handle ? (
                                  <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy Handle
                                  </>
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-red-700 mt-2">
                          Create these collections in Shopify with these exact handles
                        </p>
                      </div>
                    )}

                    {result.details.collections && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Existing Collections:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {result.details.collections.map((collection: any, i: number) => (
                            <div key={i} className="bg-background p-2 rounded border flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">{collection.title}</p>
                                <code className="text-xs text-muted-foreground">{collection.handle}</code>
                              </div>
                              <Link
                                href={`/collections/${collection.handle}`}
                                target="_blank"
                                className="text-blue-600 hover:underline"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.details.failed && (
                      <div>
                        <p className="font-semibold text-sm mb-2">Failed Links:</p>
                        <div className="space-y-1">
                          {result.details.failed.map((link: any, i: number) => (
                            <div key={i} className="text-sm bg-background p-2 rounded border">
                              <span className="font-medium">{link.name}</span>
                              <code className="text-xs ml-2 text-red-600">{link.url}</code>
                              <span className="text-xs text-muted-foreground ml-2">(Status: {link.statusCode})</span>
                            </div>
                          ))}
                        </div>
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
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg">Step-by-Step Fix Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-semibold mb-2">1. Create Collections in Shopify Admin</p>
              <p className="text-muted-foreground mb-2">
                Go to: <strong>Products → Collections → Create collection</strong>
              </p>
              <p className="text-muted-foreground">
                Make sure the "Handle" field matches exactly (e.g., "flagpoles", "american-flags")
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Add Products to Each Collection</p>
              <p className="text-muted-foreground">
                Each collection needs at least one product. Use automated conditions or manually add products.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Create Menu in Shopify</p>
              <p className="text-muted-foreground mb-2">
                Go to: <strong>Online Store → Navigation → Add menu</strong>
              </p>
              <p className="text-muted-foreground">Name it exactly: "main-menu" (lowercase, with hyphen)</p>
            </div>

            <div>
              <p className="font-semibold mb-2">4. Add Menu Items</p>
              <p className="text-muted-foreground">
                Add menu items and link them to your collections. You can nest items to create dropdown menus.
              </p>
            </div>

            <div className="bg-white p-3 rounded border">
              <p className="font-semibold mb-1">Need more help?</p>
              <p className="text-xs text-muted-foreground">
                Check the SHOPIFY_SETUP.md file in your project root for detailed instructions
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
