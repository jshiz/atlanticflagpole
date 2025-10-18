import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, ExternalLink, Clock, Zap, Database, TrendingUp } from "lucide-react"
import Link from "next/link"
import { runDiagnostics } from "@/lib/diagnostics"

export const dynamic = "force-dynamic"

export default async function DiagnosticsPage() {
  const report = await runDiagnostics()

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
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-2">Atlantic Flagpole System Diagnostics</h1>
          <p className="text-[#0B1C2C]/70">
            Comprehensive health check and performance analysis for your headless Shopify store
          </p>
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
                  Critical Issues Detected
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
                ? "Your Shopify integration is fully configured and performing optimally!"
                : hasErrors
                  ? "Critical issues found. Review recommendations below to resolve them."
                  : "Your integration is working but needs attention for optimal performance."}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              <p className="text-xs text-[#0B1C2C]/60 mt-1">
                {report.performance.apiCallCount < 10
                  ? "Optimized"
                  : report.performance.apiCallCount < 20
                    ? "Moderate"
                    : "High"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0B1C2C]/70">Total Products</CardTitle>
                <Database className="h-4 w-4 text-[#0B1C2C]/50" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1C2C]">{report.siteStructure.totalProducts}</div>
              <p className="text-xs text-[#0B1C2C]/60 mt-1">Active products</p>
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
                {report.collections.filter((c) => c.status === "exists").length}/{report.collections.length}
              </div>
              <p className="text-xs text-[#0B1C2C]/60 mt-1">Collections found</p>
            </CardContent>
          </Card>
        </div>

        {/* API Health Checks */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>API Health Status</CardTitle>
            <CardDescription>Real-time connectivity and API endpoint health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(report.apiHealth).map(([key, result]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-[#0B1C2C]/5 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <p className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                    <p className="text-xs text-[#0B1C2C]/60">{result.message}</p>
                    {result.details && <p className="text-xs text-[#0B1C2C]/50 mt-1">{result.details}</p>}
                  </div>
                </div>
                {getStatusBadge(result.status)}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Collections Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Collections Status</CardTitle>
            <CardDescription>
              Verification of all collections referenced in your navigation and mega menus
            </CardDescription>
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

        {/* Recommendations */}
        {report.recommendations.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Actionable Recommendations</CardTitle>
              <CardDescription>Prioritized improvements to enhance performance and functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-[#0B1C2C]/5 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-[#0B1C2C]/70 flex-shrink-0" />
                      <span className="font-medium text-sm">{rec.category}</span>
                    </div>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <div className="ml-7 space-y-2">
                    <div>
                      <p className="text-sm font-medium text-[#0B1C2C]/90">Issue:</p>
                      <p className="text-sm text-[#0B1C2C]/70">{rec.issue}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                      <p className="text-sm font-medium text-blue-900 mb-1">Solution:</p>
                      <p className="text-sm text-blue-800">{rec.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Site Structure Overview */}
        <Card className="mb-6">
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Navigate to key pages and test API endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link
                href="/"
                className="px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors text-center"
              >
                View Homepage →
              </Link>
              <Link
                href="/products"
                className="px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors text-center"
              >
                Browse Products →
              </Link>
              <Link
                href="/collections"
                className="px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors text-center"
              >
                View Collections →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/api/shopify/test-products"
                target="_blank"
                className="px-4 py-3 border-2 border-[#0B1C2C] text-[#0B1C2C] rounded-lg hover:bg-[#0B1C2C]/5 transition-colors text-center text-sm flex items-center justify-center gap-2"
              >
                Test Products API <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href="/api/shopify/test-collections"
                target="_blank"
                className="px-4 py-3 border-2 border-[#0B1C2C] text-[#0B1C2C] rounded-lg hover:bg-[#0B1C2C]/5 transition-colors text-center text-sm flex items-center justify-center gap-2"
              >
                Test Collections API <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
