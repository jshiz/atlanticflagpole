import { NextResponse } from "next/server"
import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export const dynamic = "force-dynamic"

const GET_PRODUCTS_SEO_QUERY = `
  query GetProductsSEO($first: Int!, $after: String) {
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
          seo {
            title
            description
          }
          featuredImage {
            altText
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
        query: GET_PRODUCTS_SEO_QUERY,
        variables: { first: 250, after },
      })

      const products = data.products.edges.map((edge: any) => edge.node)
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
