import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { canSpinWheelToday, recordSpinWheel } from "@/lib/rewards/shopify-rewards"
import { getRandomSpinResult } from "@/lib/rewards/points-calculator"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const canSpin = await canSpinWheelToday(session.customerId, session.email)
    if (!canSpin) {
      return NextResponse.json({ error: "You can only spin once per day" }, { status: 400 })
    }

    const pointsWon = getRandomSpinResult()

    await recordSpinWheel(session.customerId, session.email, pointsWon)

    return NextResponse.json({
      success: true,
      pointsWon,
    })
  } catch (error: any) {
    console.error("[v0] Error spinning wheel:", error)
    return NextResponse.json({ error: error.message || "Failed to spin wheel" }, { status: 500 })
  }
}
