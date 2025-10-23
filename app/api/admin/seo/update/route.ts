import { NextResponse } from "next/server"
import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export const dynamic = "force-dynamic"

const UPDATE_PRODUCT_SEO_MUTATION = `
  mutation UpdateProductSEO($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        seo {
          title
          description
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(request: Request) {
  try {
    const { productId, title, description } = await request.json()

    const input: any = { id: productId, seo: {} }
    if (title !== undefined) input.seo.title = title
    if (description !== undefined) input.seo.description = description

    const data = await shopifyAdminFetch({
      query: UPDATE_PRODUCT_SEO_MUTATION,
      variables: { input },
    })

    if (data.productUpdate.userErrors.length > 0) {
      return NextResponse.json({ error: data.productUpdate.userErrors[0].message }, { status: 400 })
    }

    return NextResponse.json({ success: true, product: data.productUpdate.product })
  } catch (error) {
    console.error("Failed to update product SEO:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}
