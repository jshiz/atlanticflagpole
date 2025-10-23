import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { createCustomerAddress, updateCustomerAddress, deleteCustomerAddress } from "@/lib/shopify/customer-account"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { address } = await request.json()

    const newAddress = await createCustomerAddress(session.accessToken, address)

    return NextResponse.json({ success: true, address: newAddress })
  } catch (error: any) {
    console.error("[v0] Error creating address:", error)
    return NextResponse.json({ error: error.message || "Failed to create address" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { addressId, address } = await request.json()

    const updatedAddress = await updateCustomerAddress(session.accessToken, addressId, address)

    return NextResponse.json({ success: true, address: updatedAddress })
  } catch (error: any) {
    console.error("[v0] Error updating address:", error)
    return NextResponse.json({ error: error.message || "Failed to update address" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { addressId } = await request.json()

    await deleteCustomerAddress(session.accessToken, addressId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error deleting address:", error)
    return NextResponse.json({ error: error.message || "Failed to delete address" }, { status: 500 })
  }
}
