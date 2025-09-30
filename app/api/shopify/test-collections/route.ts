import { getCollections } from "@/lib/shopify"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const collections = await getCollections(10)

    return NextResponse.json({
      success: true,
      count: collections.length,
      collections: collections,
    })
  } catch (error: any) {
    console.error("[v0] Shopify collections test error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch collections",
      },
      { status: 500 },
    )
  }
}
