import { NextResponse } from "next/server"
import { getProductCount, getOrdersStats, getCollectionCount, getCustomerCount } from "@/lib/shopify/admin-api"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  // Check admin authentication
  const cookieStore = await cookies()
  const adminAuth = cookieStore.get("admin_auth")

  if (!adminAuth || adminAuth.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const daysAgo = Number.parseInt(searchParams.get("days") || "30")

  try {
    // Fetch all stats in parallel
    const [productCount, ordersStats, collectionCount, customerCount] = await Promise.all([
      getProductCount(),
      getOrdersStats(daysAgo),
      getCollectionCount(),
      getCustomerCount(),
    ])

    return NextResponse.json({
      products: {
        total: productCount,
      },
      orders: ordersStats
        ? {
            count: ordersStats.orderCount,
            totalSales: ordersStats.totalSales,
            currencyCode: ordersStats.currencyCode,
            recentOrders: ordersStats.orders,
          }
        : null,
      collections: {
        total: collectionCount,
      },
      customers: {
        total: customerCount,
      },
      period: `Last ${daysAgo} days`,
    })
  } catch (error) {
    console.error("[v0] Error fetching admin stats:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
