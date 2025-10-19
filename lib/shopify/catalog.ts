// Helper functions for fetching collections and menus
import { MENU_QUERY, ALL_COLLECTIONS_QUERY } from "./queries"
import { normalizeMenu } from "./menu-utils"
import { buildProductQuery } from "./query-builder"

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
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyFetch<{ collection: any }>(
      query,
      { handle, first },
      { next: { revalidate: 3600, tags: [`collection:${handle}`] } },
    )

    if (!data || !data.collection) {
      console.log(`[v0] Collection "${handle}" not found in Shopify`)
      return null
    }

    return data.collection
  } catch (error) {
    console.error(`[v0] Error fetching collection "${handle}":`, error)
    return null
  }
}

export async function searchProducts(searchParams: {
  q?: string
  type?: string
  vendor?: string
  tag?: string
  available?: string
  min?: string
  max?: string
  sort?: string
  first?: number
  after?: string
}) {
  const queryString = buildProductQuery({
    tag: searchParams.tag,
    type: searchParams.type,
    vendor: searchParams.vendor,
    q: searchParams.q,
    available: searchParams.available,
    min: searchParams.min,
    max: searchParams.max,
  })

  // Map sort parameter to Shopify sort keys
  let sortKey = "RELEVANCE"
  let reverse = false

  if (searchParams.sort === "price-asc") {
    sortKey = "PRICE"
    reverse = false
  } else if (searchParams.sort === "price-desc") {
    sortKey = "PRICE"
    reverse = true
  } else if (searchParams.sort === "title-asc") {
    sortKey = "TITLE"
    reverse = false
  } else if (searchParams.sort === "title-desc") {
    sortKey = "TITLE"
    reverse = true
  }

  const query = /* GraphQL */ `
    query SearchProducts($query: String!, $first: Int!, $after: String, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
      products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          handle
          title
          vendor
          productType
          tags
          availableForSale
          featuredImage {
            url(transform: { maxWidth: 800, maxHeight: 800 })
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch<{ products: any }>(
    query,
    {
      query: queryString,
      first: searchParams.first || 24,
      after: searchParams.after || null,
      sortKey,
      reverse,
    },
    { cache: "no-store" },
  )

  return data.products
}

export async function getAllProducts(searchParams: {
  q?: string
  type?: string
  vendor?: string
  tag?: string
  available?: string
  min?: string
  max?: string
  sort?: string
}) {
  const queryString = buildProductQuery({
    tag: searchParams.tag,
    type: searchParams.type,
    vendor: searchParams.vendor,
    q: searchParams.q,
    available: searchParams.available,
    min: searchParams.min,
    max: searchParams.max,
  })

  // Map sort parameter to Shopify sort keys
  let sortKey = "RELEVANCE"
  let reverse = false

  if (searchParams.sort === "price-asc") {
    sortKey = "PRICE"
    reverse = false
  } else if (searchParams.sort === "price-desc") {
    sortKey = "PRICE"
    reverse = true
  } else if (searchParams.sort === "title-asc") {
    sortKey = "TITLE"
    reverse = false
  } else if (searchParams.sort === "title-desc") {
    sortKey = "TITLE"
    reverse = true
  }

  const query = /* GraphQL */ `
    query SearchProducts($query: String!, $first: Int!, $after: String, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
      products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          handle
          title
          vendor
          productType
          tags
          availableForSale
          featuredImage {
            url(transform: { maxWidth: 800, maxHeight: 800 })
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `

  let cursor: string | null = null
  const allProducts: any[] = []

  // Loop through all pages to fetch ALL products
  do {
    const data = await shopifyFetch<{ products: any }>(
      query,
      {
        query: queryString,
        first: 250, // Fetch 250 per page for efficiency
        after: cursor,
        sortKey,
        reverse,
      },
      { cache: "no-store" },
    )

    const { nodes, pageInfo } = data.products
    allProducts.push(...nodes)
    cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null

    console.log(
      `[v0] Fetched ${nodes.length} products, total so far: ${allProducts.length}, hasNextPage: ${pageInfo.hasNextPage}`,
    )
  } while (cursor)

  console.log(`[v0] ✅ Finished fetching all products. Total: ${allProducts.length}`)

  return allProducts
}
