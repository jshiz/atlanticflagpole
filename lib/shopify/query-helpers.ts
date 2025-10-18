import { parseShopifyDomain } from "./parse-shopify-domain"

const rawStoreDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const fallbackStoreDomain = "v0-template.myshopify.com"
const SHOPIFY_STORE_DOMAIN = rawStoreDomain ? parseShopifyDomain(rawStoreDomain) : fallbackStoreDomain
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""
const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`

export async function shopifyQuery<T = any>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, any>
}): Promise<T> {
  const res = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    cache: "no-store",
    body: JSON.stringify({ query, variables: variables || {} }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Shopify API error: ${res.status} - ${errorText}`)
  }

  const json = await res.json()

  if (json.errors) {
    console.error("[v0] Shopify GraphQL errors:", json.errors)
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

// TypeScript types for bundle system
export type BundleComponent = {
  id: string
  title: string
  handle: string
  featuredImage: {
    url: string
    altText: string | null
  } | null
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        availableForSale: boolean
      }
    }>
  }
}

export type BundleMetadata = {
  includesPremier: boolean
  components: BundleComponent[]
  bundleType?: string
}

export type ProductWithBundle = {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  productType: string | null
  vendor: string | null
  tags: string[]
  featuredImage: {
    url: string
    altText: string | null
  } | null
  images: {
    edges: Array<{
      node: {
        url: string
        altText: string | null
      }
    }>
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    } | null
  } | null
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        price: {
          amount: string
          currencyCode: string
        }
        compareAtPrice: {
          amount: string
          currencyCode: string
        } | null
        availableForSale: boolean
        selectedOptions: Array<{
          name: string
          value: string
        }>
      }
    }>
  }
  metafields: Array<{
    key: string
    value: string
    namespace: string
  }>
}
