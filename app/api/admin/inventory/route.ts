import { NextResponse } from "next/server"
import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export const dynamic = "force-dynamic"

const GET_INVENTORY_QUERY = `
  query GetInventory($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          variants(first: 10) {
            edges {
              node {
                id
                title
                inventoryQuantity
              }
            }
          }
        }
      }
    }
  }
`

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const threshold = Number.parseInt(searchParams.get("threshold") || "10")

    let allProducts: any[] = []
    let hasNextPage = true
    let after: string | null = null

    while (hasNextPage) {
      const data = await shopifyAdminFetch({
        query: GET_INVENTORY_QUERY,
        variables: { first: 250, after },
      })

      allProducts = [...allProducts, ...data.products.edges.map((e: any) => e.node)]
      hasNextPage = data.products.pageInfo.hasNextPage
      after = data.products.pageInfo.endCursor
    }

    // Flatten to inventory items and filter by threshold
    const items = allProducts.flatMap((product) =>
      product.variants.edges
        .map((v: any) => ({
          productId: product.id,
          productTitle: product.title,
          productHandle: product.handle,
          variantId: v.node.id,
          variantTitle: v.node.title,
          inventory: v.node.inventoryQuantity || 0,
          status: v.node.inventoryQuantity === 0 ? "critical" : v.node.inventoryQuantity <= threshold ? "low" : "ok",
        }))
        .filter((item: any) => item.status !== "ok"),
    )

    return NextResponse.json({ items })
  } catch (error) {
    console.error("Failed to fetch inventory:", error)
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}
