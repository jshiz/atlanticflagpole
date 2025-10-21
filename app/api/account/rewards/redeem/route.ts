import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { deductPoints, createRedemption, getCustomerRewards } from "@/lib/rewards/shopify-rewards"
import { generateDiscountCode } from "@/lib/rewards/points-calculator"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { points, tier } = await request.json()

    const rewards = await getCustomerRewards(session.customerId, session.email)
    if (rewards.totalPoints < points) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    const discountCode = generateDiscountCode()

    const success = await deductPoints(session.customerId, session.email, points, `Redeemed ${tier.label}`)
    if (!success) {
      return NextResponse.json({ error: "Failed to deduct points" }, { status: 500 })
    }

    const discountType = tier.label.includes("%") ? "percentage" : "fixed_amount"
    const discountValue = tier.label.includes("%")
      ? Number.parseInt(tier.label.replace("%", "").trim())
      : Number.parseInt(tier.label.replace("$", "").replace("Off", "").trim())

    const redemption = await createRedemption(
      session.customerId,
      session.email,
      points,
      discountCode,
      discountType,
      discountValue,
    )

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
