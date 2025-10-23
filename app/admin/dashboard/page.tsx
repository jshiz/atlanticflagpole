import { requireAdminAuth } from "@/lib/admin-auth"
import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { runDiagnostics } from "@/lib/diagnostics"
import { CheckCircle2, XCircle, AlertCircle, Clock, Zap, TrendingUp, Package, LinkIcon, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { AdminStatsClient } from "@/components/admin/admin-stats-client"
import { DailyTasksClient } from "@/components/admin/daily-tasks-client"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  await requireAdminAuth()

  const report = await runDiagnostics()

  // Check environment variables
  const envVars = {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: !!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_TOKEN: !!process.env.SHOPIFY_STOREFRONT_TOKEN || !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_ADMIN_ACCESS_TOKEN: !!process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    JUDGEME_API_TOKEN: !!process.env.JUDGEME_API_TOKEN,
    NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
  }

  const envVarsCount = Object.values(envVars).filter(Boolean).length
  const totalEnvVars = Object.keys(envVars).length

  const getStatusIcon = (status: "success" | "error" | "warning") => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: "success" | "error" | "warning") => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Healthy</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
    }
  }

  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
    }
  }

  const hasErrors = Object.values(report.apiHealth).some((r) => r.status === "error")
  const hasWarnings = Object.values(report.apiHealth).some((r) => r.status === "warning")
  const allSuccess = Object.values(report.apiHealth).every((r) => r.status === "success")

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <AdminNav />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-2">Admin Dashboard</h1>
          <p className="text-[#0B1C2C]/70">Comprehensive system monitoring, diagnostics, and content management</p>
        </div>

        {/* Overall Status Banner */}
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
                  Critical Issues Detected
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  Warnings Present
                </>
              )}
            </CardTitle>
            <CardDescription>Last checked: {new Date().toLocaleString()} • Next check in 5 minutes</CardDescription>
          </CardHeader>
        </Card>

        <AdminStatsClient />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0B1C2C]/70">Load Time</CardTitle>
                <Clock className="h-4 w-4 text-[#0B1C2C]/50" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1C2C]">{report.performance.totalLoadTime}ms</div>
              <p className="text-xs text-[#0B1C2C]/60 mt-1">
                {report.performance.totalLoadTime < 1000
                  ? "Excellent"
                  : report.performance.totalLoadTime < 3000
                    ? "Good"
                    : "Needs improvement"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0B1C2C]/70">API Calls</CardTitle>
                <Zap className="h-4 w-4 text-[#0B1C2C]/50" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1C2C]">{report.performance.apiCallCount}</div>
              <p className="text-xs text-[#0B1C2C]/60 mt-1">During diagnostics</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0B1C2C]/70">Total Products</CardTitle>
                <Package className="h-4 w-4 text-[#0B1C2C]/50" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1C2C]">{report.siteStructure.totalProducts}</div>
              <p className="text-xs text-[#0B1C2C]/60 mt-1">Active in store</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0B1C2C]/70">Collections</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#0B1C2C]/50" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1C2C]">
                {report.collections.filter((c) => c.status === "exists").length}
              </div>
              <p className="text-xs text-[#0B1C2C]/60 mt-1">Collections found</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="diagnostics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="recommendations">Tasks</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>

          {/* Diagnostics Tab */}
          <TabsContent value="diagnostics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Health Status</CardTitle>
                <CardDescription>Real-time connectivity and endpoint health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(report.apiHealth).map(([key, result], index) => (
                    <AccordionItem key={key} value={`item-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(result.status)}
                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          </div>
                          {getStatusBadge(result.status)}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-8 space-y-2 text-sm">
                          <p className="text-[#0B1C2C]/80">{result.message}</p>
                          {result.details && (
                            <p className="text-[#0B1C2C]/60 bg-[#0B1C2C]/5 p-3 rounded">{result.details}</p>
                          )}
                          <p className="text-xs text-[#0B1C2C]/50">
                            Last checked: {new Date(result.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Collections Status</CardTitle>
                <CardDescription>All collections referenced in navigation and mega menus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {report.collections.map((collection, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        collection.status === "exists" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{collection.name}</p>
                          <code className="text-xs text-[#0B1C2C]/60">{collection.handle}</code>
                        </div>
                        {collection.status === "exists" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#0B1C2C]/70">{collection.message}</p>
                      {collection.productCount !== undefined && (
                        <p className="text-xs text-[#0B1C2C]/60 mt-1">{collection.productCount} products</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations/Tasks Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <DailyTasksClient />
          </TabsContent>

          {/* Structure Tab */}
          <TabsContent value="structure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Structure Overview</CardTitle>
                <CardDescription>Current state of your headless storefront architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#0B1C2C]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#0B1C2C]">{report.siteStructure.totalMenuItems}</p>
                    <p className="text-sm text-[#0B1C2C]/70">Menu Items</p>
                  </div>
                  <div className="p-4 bg-[#0B1C2C]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#0B1C2C]">{report.siteStructure.megaMenus}</p>
                    <p className="text-sm text-[#0B1C2C]/70">Mega Menus</p>
                  </div>
                  <div className="p-4 bg-[#0B1C2C]/5 rounded-lg">
                    <p className="text-2xl font-bold text-[#0B1C2C]">{report.siteStructure.totalProducts}</p>
                    <p className="text-sm text-[#0B1C2C]/70">Total Products</p>
                  </div>
                  <div className="p-4 bg-[#0B1C2C]/5 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{report.siteStructure.missingCollections}</p>
                    <p className="text-sm text-[#0B1C2C]/70">Missing Collections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Environment Variables
                </CardTitle>
                <CardDescription>Configuration status for critical environment variables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#0B1C2C]/5 rounded">
                    <span className="text-sm font-medium">Configuration Status</span>
                    <Badge
                      className={
                        envVarsCount === totalEnvVars ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {envVarsCount}/{totalEnvVars} Configured
                    </Badge>
                  </div>
                  {Object.entries(envVars).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-[#0B1C2C]/5 rounded">
                      <div className="flex items-center gap-2">
                        {value ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <code className="text-sm">{key}</code>
                      </div>
                      <span className="text-xs text-[#0B1C2C]/60">{value ? "Set" : "Not set"}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Link Validation
                </CardTitle>
                <CardDescription>Check critical site links and navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm font-medium text-blue-900 mb-2">Quick Links</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Link
                        href="/"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        Homepage
                      </Link>
                      <Link
                        href="/products"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        Products
                      </Link>
                      <Link
                        href="/collections"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        Collections
                      </Link>
                      <Link
                        href="/about"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        About
                      </Link>
                      <Link
                        href="/cart"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        Cart
                      </Link>
                      <Link
                        href="/checkout"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        Checkout
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0B1C2C]/5 rounded">
                    <p className="text-sm font-medium text-[#0B1C2C] mb-2">Navigation Status</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Main Menu Items</span>
                        <Badge className="bg-green-100 text-green-800">
                          {report.siteStructure.totalMenuItems} Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mega Menus</span>
                        <Badge className="bg-green-100 text-green-800">
                          {report.siteStructure.megaMenus} Configured
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
