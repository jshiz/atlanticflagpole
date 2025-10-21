import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import {
  getOrCreateCustomerRewards,
  canSpinWheelToday,
  getLastSpinTime,
  getCustomerRedemptions,
  getRewardsTransactions,
} from "@/lib/rewards/database"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get or create rewards account
    const rewards = await getOrCreateCustomerRewards(session.customerId, session.email)

    // Check if can spin today
    const canSpin = await canSpinWheelToday(session.customerId)
    const lastSpin = await getLastSpinTime(session.customerId)

    // Get redemptions and transactions
    const redemptions = await getCustomerRedemptions(session.customerId)
    const transactions = await getRewardsTransactions(session.customerId, 20)

    return NextResponse.json({
      totalPoints: rewards.total_points,
      lifetimePoints: rewards.lifetime_points,
      canSpinToday: canSpin,
      lastSpinTime: lastSpin,
      redemptions,
      transactions,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching rewards:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch rewards" }, { status: 500 })
  }
}
