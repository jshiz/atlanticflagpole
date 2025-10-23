import { NextResponse } from "next/server"
import { getAllProducts } from "@/lib/shopify/index"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[v0] Testing product fetch...")
    const products = await getAllProducts()

    return NextResponse.json({
      success: true,
      count: products.length,
      products: products.slice(0, 5).map((p) => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        tags: p.tags,
        productType: p.productType,
        vendor: p.vendor,
      })),
      message: `Successfully fetched ${products.length} products`,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: "Check your Shopify environment variables",
      },
      { status: 500 },
    )
  }
}
