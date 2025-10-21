import { SHOPIFY_STOREFRONT_TOKEN } from "@/lib/env"

export const GEO_PRODUCTS_QUERY = /* GraphQL */ `
  query GeoProducts($query: String!, $first: Int = 8) {
    products(first: $first, query: $query, sortKey: BEST_SELLING) {
      nodes {
        id
        handle
        title
        vendor
        productType
        tags
        availableForSale
        featuredImage {
          url(transform: { maxWidth: 600, maxHeight: 600 })
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export interface GeoProduct {
  id: string
  handle: string
  title: string
  vendor: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage?: {
    url: string
    altText?: string
    width?: number
    height?: number
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    nodes: Array<{
      id: string
      title: string
      availableForSale: boolean
      price: {
        amount: string
        currencyCode: string
      }
    }>
  }
}

export async function getGeoProducts(query: string): Promise<GeoProduct[]> {
  if (!query) return []

  try {
    const response = await fetch(process.env.SHOPIFY_STOREFRONT_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: GEO_PRODUCTS_QUERY,
        variables: { query, first: 8 },
      }),
      next: { revalidate: 3600 },
    })

    const { data } = await response.json()
    return data?.products?.nodes || []
  } catch (error) {
    console.error("[v0] Geo products fetch error:", error)
    return []
  }
}
