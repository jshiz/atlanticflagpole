import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { canSpinWheelToday, recordSpinWheel } from "@/lib/rewards/database"
import { getRandomSpinResult } from "@/lib/rewards/points-calculator"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if can spin today
    const canSpin = await canSpinWheelToday(session.customerId)
    if (!canSpin) {
      return NextResponse.json({ error: "You can only spin once per day" }, { status: 400 })
    }

    // Get random result
    const pointsWon = getRandomSpinResult()

    // Record spin and add points
    await recordSpinWheel(session.customerId, pointsWon)

    return NextResponse.json({
      success: true,
      pointsWon,
    })
  } catch (error: any) {
    console.error("[v0] Error spinning wheel:", error)
    return NextResponse.json({ error: error.message || "Failed to spin wheel" }, { status: 500 })
  }
}
