import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { getCustomerRewards, canSpinWheelToday, getLastSpinTime } from "@/lib/rewards/shopify-rewards"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get rewards from Shopify metafields
    const rewards = await getCustomerRewards(session.customerId, session.email)

    // Check if can spin today
    const canSpin = await canSpinWheelToday(session.customerId, session.email)
    const lastSpin = await getLastSpinTime(session.customerId, session.email)

    return NextResponse.json({
      totalPoints: rewards.totalPoints,
      lifetimePoints: rewards.lifetimePoints,
      canSpinToday: canSpin,
      lastSpinTime: lastSpin,
      redemptions: rewards.redemptions,
      transactions: rewards.transactions,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching rewards:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch rewards" }, { status: 500 })
  }
}
