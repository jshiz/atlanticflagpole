import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { deductPoints, createRedemption, getOrCreateCustomerRewards } from "@/lib/rewards/database"
import { generateDiscountCode } from "@/lib/rewards/points-calculator"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { points, tier } = await request.json()

    // Check if customer has enough points
    const rewards = await getOrCreateCustomerRewards(session.customerId, session.email)
    if (rewards.total_points < points) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    // Generate discount code
    const discountCode = generateDiscountCode()

    // Deduct points
    const success = await deductPoints(session.customerId, points, `Redeemed ${tier.label}`)
    if (!success) {
      return NextResponse.json({ error: "Failed to deduct points" }, { status: 500 })
    }

    // Create redemption record
    const discountType = tier.label.includes("%") ? "percentage" : "fixed_amount"
    const discountValue = tier.label.includes("%")
      ? Number.parseInt(tier.label.replace("%", "").trim())
      : Number.parseInt(tier.label.replace("$", "").replace("Off", "").trim())

    const redemption = await createRedemption(session.customerId, points, discountCode, discountType, discountValue)

    // TODO: Create discount code in Shopify
    // This would require Shopify Admin API integration

    return NextResponse.json({
      success: true,
      redemption,
    })
  } catch (error: any) {
    console.error("[v0] Error redeeming reward:", error)
    return NextResponse.json({ error: error.message || "Failed to redeem reward" }, { status: 500 })
  }
}
