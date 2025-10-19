import { type NextRequest, NextResponse } from "next/server"
import { getGeoProducts } from "@/lib/shopify/queries/geoProducts"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ products: [] })
  }

  try {
    const products = await getGeoProducts(query)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("[v0] Geo products API error:", error)
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}
