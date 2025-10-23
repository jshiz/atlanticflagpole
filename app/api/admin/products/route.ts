import { NextResponse } from "next/server"
import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export const dynamic = "force-dynamic"

const GET_ALL_PRODUCTS_QUERY = `
  query GetAllProducts($first: Int!, $after: String) {
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
          status
          totalInventory
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          tags
          createdAt
          updatedAt
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

    // Fetch all products with pagination
    while (hasNextPage) {
      const data = await shopifyAdminFetch({
        query: GET_ALL_PRODUCTS_QUERY,
        variables: {
          first: 250,
          after,
        },
      })

      const products = data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        status: edge.node.status,
        totalInventory: edge.node.totalInventory,
        priceRange: edge.node.priceRangeV2,
        featuredImage: edge.node.featuredImage,
        tags: edge.node.tags,
        createdAt: edge.node.createdAt,
        updatedAt: edge.node.updatedAt,
      }))

      allProducts = [...allProducts, ...products]
      hasNextPage = data.products.pageInfo.hasNextPage
      after = data.products.pageInfo.endCursor
    }

    return NextResponse.json({
      products: allProducts,
      total: allProducts.length,
    })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
