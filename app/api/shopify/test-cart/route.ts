import { createCart } from "@/lib/shopify"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cart = await createCart()

    return NextResponse.json({
      success: true,
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
    })
  } catch (error: any) {
    console.error("[v0] Shopify cart test error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to create cart",
      },
      { status: 500 },
    )
  }
}
