import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { updateCustomer } from "@/lib/shopify/customer-account"

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { firstName, lastName, phoneNumber } = await request.json()

    const updatedCustomer = await updateCustomer(session.accessToken, {
      firstName,
      lastName,
      phoneNumber,
    })

    return NextResponse.json({ success: true, customer: updatedCustomer })
  } catch (error: any) {
    console.error("[v0] Error updating profile:", error)
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 })
  }
}
