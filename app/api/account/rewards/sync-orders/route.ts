import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { getCustomerOrders } from "@/lib/shopify/customer-account"
import { getOrCreateCustomerRewards, addPoints } from "@/lib/rewards/database"
import { calculatePointsFromOrder } from "@/lib/rewards/points-calculator"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get customer orders
    const ordersData = await getCustomerOrders(session.accessToken, 100)
    const orders = ordersData?.edges || []

    // Get or create rewards account
    await getOrCreateCustomerRewards(session.customerId, session.email)

    let pointsAdded = 0

    // Process each order
    for (const orderEdge of orders) {
      const order = orderEdge.node
      const orderId = order.id
      const orderAmount = Number.parseFloat(order.totalPrice.amount)

      // Calculate points
      const points = calculatePointsFromOrder(orderAmount)

      // Add points for this order
      await addPoints(session.customerId, points, "order_purchase", `Order #${order.number} - $${orderAmount}`, orderId)

      pointsAdded += points
    }

    return NextResponse.json({
      success: true,
      ordersProcessed: orders.length,
      pointsAdded,
    })
  } catch (error: any) {
    console.error("[v0] Error syncing orders:", error)
    return NextResponse.json({ error: error.message || "Failed to sync orders" }, { status: 500 })
  }
}
