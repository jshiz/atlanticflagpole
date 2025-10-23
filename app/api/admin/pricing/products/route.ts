import { NextResponse } from "next/server"
import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export const dynamic = "force-dynamic"

const GET_PRODUCTS_PRICING_QUERY = `
  query GetProductsPricing($first: Int!, $after: String) {
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
                price
              }
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  try {
    let allProducts: any[] = []
    let hasNextPage = true
    let after: string | null = null

    while (hasNextPage) {
      const data = await shopifyAdminFetch({
        query: GET_PRODUCTS_PRICING_QUERY,
        variables: { first: 250, after },
      })

      const products = data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        variants: edge.node.variants.edges.map((v: any) => v.node),
      }))

      allProducts = [...allProducts, ...products]
      hasNextPage = data.products.pageInfo.hasNextPage
      after = data.products.pageInfo.endCursor
    }

    return NextResponse.json({ products: allProducts })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
