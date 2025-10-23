"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface StatsData {
  products: {
    total: number | null
  }
  orders: {
    count: number
    totalSales: number
    currencyCode: string
    recentOrders: any[]
  } | null
  collections: {
    total: number | null
  }
  customers: {
    total: number | null
  }
  period: string
}

export function AdminStatsClient() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/stats?days=30")
      if (!response.ok) {
        throw new Error("Failed to fetch stats")
      }
      const data = await response.json()
      setStats(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      console.error("[v0] Error fetching admin stats:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !stats) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Real-Time Store Analytics</CardTitle>
          <CardDescription>Loading store statistics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-[#0B1C2C]/50" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <TrendingUp className="h-5 w-5" />
            Store Analytics Unavailable
          </CardTitle>
          <CardDescription className="text-yellow-800">
            {error.includes("Unauthorized")
              ? "Admin API access token not configured. Add SHOPIFY_ADMIN_ACCESS_TOKEN to environment variables."
              : `Error: ${error}`}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!stats) return null

  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Real-Time Analytics Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Real-Time Store Analytics
              </CardTitle>
              <CardDescription>
                {stats.period} • Last updated: {lastUpdated?.toLocaleTimeString()}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchStats} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        {stats.orders && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-900">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {formatCurrency(stats.orders.totalSales, stats.orders.currencyCode)}
              </div>
              <p className="text-xs text-green-700 mt-1">{stats.period}</p>
            </CardContent>
          </Card>
        )}

        {/* Total Orders */}
        {stats.orders && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-900">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.orders.count}</div>
              <p className="text-xs text-blue-700 mt-1">{stats.period}</p>
            </CardContent>
          </Card>
        )}

        {/* Live Products */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-900">Live Products</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.products.total || "N/A"}</div>
            <p className="text-xs text-purple-700 mt-1">Active in store</p>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-900">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.customers.total || "N/A"}</div>
            <p className="text-xs text-orange-700 mt-1">Registered accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      {stats.orders && stats.orders.recentOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Last 10 orders from {stats.period.toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {stats.orders.recentOrders.map((order: any, index: number) => (
                <AccordionItem key={order.id} value={`order-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="h-4 w-4 text-[#0B1C2C]/70" />
                        <div className="text-left">
                          <p className="font-medium">Order #{order.name}</p>
                          <p className="text-sm text-[#0B1C2C]/60">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {formatCurrency(
                            Number.parseFloat(order.totalPriceSet.shopMoney.amount),
                            order.totalPriceSet.shopMoney.currencyCode,
                          )}
                        </p>
                        <p className="text-xs text-[#0B1C2C]/60">{order.financialStatus}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-[#0B1C2C]/60">Financial Status:</span>
                          <span className="ml-2 font-medium">{order.financialStatus}</span>
                        </div>
                        <div>
                          <span className="text-[#0B1C2C]/60">Fulfillment Status:</span>
                          <span className="ml-2 font-medium">{order.fulfillmentStatus || "Unfulfilled"}</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
