import { getProducts } from "@/lib/shopify"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await getProducts({ first: 10 })

    return NextResponse.json({
      success: true,
      count: products.length,
      products: products,
    })
  } catch (error: any) {
    console.error("[v0] Shopify products test error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch products",
      },
      { status: 500 },
    )
  }
}
