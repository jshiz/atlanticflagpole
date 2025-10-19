import { getProducts } from "@/lib/shopify"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tag = searchParams.get("tag")
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

  if (!tag) {
    return NextResponse.json({ error: "Tag parameter is required" }, { status: 400 })
  }

  try {
    console.log(`[v0] Fetching products with tag: ${tag}, limit: ${limit}`)

    // Fetch products and filter by tag
    const allProducts = await getProducts({ first: 100 })
    const filteredProducts = allProducts
      .filter((product) => product.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
      .slice(0, limit)

    console.log(`[v0] Found ${filteredProducts.length} products with tag "${tag}"`)

    return NextResponse.json({ products: filteredProducts })
  } catch (error) {
    console.error("[v0] Error fetching products by tag:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
