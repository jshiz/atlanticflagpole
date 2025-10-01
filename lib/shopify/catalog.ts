// Helper functions for fetching collections and menus
import { MENU_QUERY, ALL_COLLECTIONS_QUERY } from "./queries"
import { normalizeMenu } from "./menu-utils"

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "v0-template.myshopify.com"
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"

async function shopifyFetch<T>(query: string, variables?: Record<string, any>, opts?: RequestInit): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...opts,
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("[v0] Shopify catalog HTTP error:", res.status, errorText)
    throw new Error(`Shopify API error (${res.status}): ${errorText}`)
  }

  const json = await res.json()

  if (json.errors) {
    console.error("[v0] Shopify catalog GraphQL errors:", json.errors)
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

export async function getAllCollections() {
  let cursor: string | null = null
  const collections: any[] = []

  do {
    const data = await shopifyFetch<{ collections: any }>(
      ALL_COLLECTIONS_QUERY,
      { after: cursor },
      { next: { revalidate: 900, tags: ["collections"] } },
    )
    const { nodes, pageInfo } = data.collections
    collections.push(...nodes)
    cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null
  } while (cursor)

  return collections
}

export async function getMenu(handle: string) {
  const data = await shopifyFetch<{ menu: any }>(
    MENU_QUERY,
    { handle },
    { next: { revalidate: 3600, tags: [`menu:${handle}`] } },
  )
  return data.menu
}

export async function getMenuWithNormalizedUrls(handle: string) {
  const menu = await getMenu(handle)
  return normalizeMenu(menu)
}

export async function getCollectionWithProducts(handle: string, first = 6) {
  const query = /* GraphQL */ `
    query CollectionWithProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        handle
        products(first: $first, sortKey: BEST_SELLING) {
          nodes {
            id
            handle
            title
            featuredImage {
              url(transform: { maxWidth: 400, maxHeight: 400 })
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
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ collection: any }>(
    query,
    { handle, first },
    { next: { revalidate: 3600, tags: [`collection:${handle}`] } },
  )

  return data.collection
}
