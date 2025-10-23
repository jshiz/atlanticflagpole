import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { getCustomerOrders } from "@/lib/shopify/customer-account"
import { getCustomerRewards, addPoints } from "@/lib/rewards/shopify-rewards"
import { calculatePointsFromOrder } from "@/lib/rewards/points-calculator"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ordersData = await getCustomerOrders(session.accessToken, 100)
    const orders = ordersData?.edges || []

    await getCustomerRewards(session.customerId, session.email)

    let pointsAdded = 0

    for (const orderEdge of orders) {
      const order = orderEdge.node
      const orderId = order.id
      const orderAmount = Number.parseFloat(order.totalPrice.amount)

      const points = calculatePointsFromOrder(orderAmount)

      await addPoints(
        session.customerId,
        session.email,
        points,
        "order_purchase",
        `Order #${order.number} - $${orderAmount}`,
        orderId,
      )

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
