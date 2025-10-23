import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
        },
        body: JSON.stringify({
          query: `{ 
            products(first: 5) { 
              nodes { 
                id 
                title 
                handle 
                availableForSale
                productType
                tags
              } 
            } 
          }`,
        }),
      },
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        {
          error: `Shopify API returned ${res.status}`,
          statusText: res.statusText,
          body: text,
        },
        { status: res.status },
      )
    }

    const json = await res.json()
    return NextResponse.json(json)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch from Shopify",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
