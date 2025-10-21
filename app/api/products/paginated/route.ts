import { type NextRequest, NextResponse } from "next/server"
import { searchProducts } from "@/lib/shopify/catalog"

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
  const page = Number.parseInt(searchParams.page || "1")
  const limit = Number.parseInt(searchParams.limit || "24")

  try {
    // Calculate cursor for pagination
    const skip = (page - 1) * limit

    const result = await searchProducts({
      q: searchParams.q,
      type: searchParams.type,
      vendor: searchParams.vendor,
      tag: searchParams.tag,
      available: searchParams.available,
      min: searchParams.min,
      max: searchParams.max,
      sort: searchParams.sort,
      first: limit,
      after: searchParams.after,
    })

    return NextResponse.json({
      products: result.nodes,
      hasMore: result.pageInfo.hasNextPage,
      endCursor: result.pageInfo.endCursor,
    })
  } catch (error) {
    console.error("[v0] Error fetching paginated products:", error)
    return NextResponse.json({ products: [], hasMore: false }, { status: 500 })
  }
}
