import type { ProductCollectionSortKey, ProductSortKey, ShopifyCart, ShopifyCollection, ShopifyProduct } from "./types"
import { parseShopifyDomain } from "./parse-shopify-domain"
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from "./constants"
import { toNodes } from "@/lib/connection"
import type { ConnectionLike } from "@/lib/connection"
import { searchProducts } from "./catalog"

const rawStoreDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const fallbackStoreDomain = "v0-template.myshopify.com"
const SHOPIFY_STORE_DOMAIN = rawStoreDomain ? parseShopifyDomain(rawStoreDomain) : fallbackStoreDomain

const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, timeout = 10000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return response
    } catch (error: any) {
      const isLastRetry = i === retries - 1
      const isTimeout = error.name === "AbortError"

      console.error(`[v0] Fetch attempt ${i + 1}/${retries} failed:`, error.message)

      if (isLastRetry) {
        throw new Error(isTimeout ? "Request timeout" : error.message)
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000
      console.log(`[v0] Retrying in ${delay}ms...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw new Error("Max retries exceeded")
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function shopifyFetch<T>({
  query,
  variables = {},
  tags,
}: {
  query: string
  variables?: Record<string, any>
  tags?: string[]
}): Promise<{ data: T; errors?: any[] }> {
  try {
    await delay(100)

    const response = await fetchWithRetry(
      SHOPIFY_STOREFRONT_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: "no-store",
      },
      3, // 3 retries
      10000, // 10 second timeout
    )

    if (!response.ok) {
      const errorBody = await response.text()

      if (response.status === 429) {
        return { data: {} as T }
      }

      console.error(`[v0] Shopify API HTTP error! Status: ${response.status}, Body: ${errorBody}`)
      throw new Error(`Shopify API HTTP error! Status: ${response.status}, Body: ${errorBody}`)
    }

    const json = await response.json()

    if (json.error) {
      if (json.error.code === "429" || json.error.message === "Too Many Requests") {
        return { data: {} as T }
      }

      console.error("[v0] Shopify API error in response body:", json.error)
      throw new Error(`Shopify API error: ${JSON.stringify(json.error)}`)
    }

    if (json.errors) {
      console.error("[v0] Shopify GraphQL errors:", json.errors)
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    return json
  } catch (error) {
    console.error("[v0] Shopify fetch error:", error)
    return { data: {} as T }
  }
}

export async function getProducts({
  first = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
  reverse = false,
  query: searchQuery,
}: {
  first?: number
  sortKey?: ProductSortKey
  reverse?: boolean
  query?: string
}): Promise<ShopifyProduct[]> {
  try {
    const query = /* gql */ `
      query getProducts($first: Int!, $sortKey: ProductSortKeys!, $reverse: Boolean, $query: String) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
          nodes {
            id
            title
            description
            descriptionHtml
            handle
            availableForSale
            productType
            tags
            vendor
            options {
              id
              name
              values
            }
            images(first: 5) {
              nodes {
                url
                altText
                thumbhash
              }
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
            variants(first: 10) {
              nodes {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `

    const result = await shopifyFetch<{
      products: ConnectionLike<ShopifyProduct>
    }>({
      query,
      variables: { first, sortKey, reverse, query: searchQuery },
      tags: ["products"],
    })

    if (!result || !result.data || !result.data.products) {
      // Silently return empty array for rate limit or empty responses
      return []
    }

    return toNodes(result.data.products)
  } catch (error) {
    console.error("[v0] getProducts error:", error)
    return []
  }
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const query = /* gql */ `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
          descriptionHtml
          handle
          productType
          tags
          vendor
          category {
            id
            name
          }
          options {
            id
            name
            values
          }
          images(first: 10) {
            nodes {
              url
              altText
              thumbhash
            }
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
          variants(first: 10) {
            nodes {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    `

    const result = await shopifyFetch<{
      product: ShopifyProduct | null
    }>({
      query,
      variables: { handle },
      tags: ["products", `product-${handle}`],
    })

    console.log(`[v0] getProduct("${handle}") - Response:`, {
      hasResult: !!result,
      hasData: !!result?.data,
      hasProduct: !!result?.data?.product,
      productTitle: result?.data?.product?.title,
      imagesStructure: result?.data?.product?.images
        ? {
            type: typeof result.data.product.images,
            hasNodes: !!(result.data.product.images as any).nodes,
            nodesLength: (result.data.product.images as any).nodes?.length,
            firstImageUrl: (result.data.product.images as any).nodes?.[0]?.url,
          }
        : null,
    })

    // Check if result and data exist before accessing product
    if (!result || !result.data) {
      console.error(`[v0] getProduct: Invalid response structure for handle "${handle}"`, result)
      return null
    }

    return result.data.product
  } catch (error) {
    console.error(`[v0] getProduct error for handle "${handle}":`, error)
    return null
  }
}

export function getProductImage(product: ShopifyProduct | null): string | null {
  if (!product) return null

  // Try nodes array first (GraphQL response)
  const imageUrl = product.images?.nodes?.[0]?.url || product.images?.[0]?.url

  // Validate URL
  if (imageUrl && imageUrl.startsWith("http")) {
    return imageUrl
  }

  return null
}

export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  const query = /* gql */ `
    query getCollections($first: Int!) {
      collections(first: $first) {
        nodes {
          id
          title
          handle
          description
          image {
            url
            altText
            thumbhash
          }
        }
      }
    }
  `

  const { data } = await shopifyFetch<{
    collections: ConnectionLike<ShopifyCollection>
  }>({
    query,
    variables: { first },
    tags: ["collections"],
  })

  return toNodes(data.collections)
}

export async function getAllCollections(): Promise<ShopifyCollection[]> {
  const allCollections: ShopifyCollection[] = []
  let hasNextPage = true
  let cursor: string | null = null

  while (hasNextPage) {
    const query = /* gql */ `
      query getAllCollections($first: Int!, $after: String) {
        collections(first: $first, after: $after, sortKey: TITLE) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            title
            handle
            description
            image {
              url
              altText
              thumbhash
            }
          }
        }
      }
    `

    const { data } = await shopifyFetch<{
      collections: {
        pageInfo: { hasNextPage: boolean; endCursor: string }
      } & ConnectionLike<ShopifyCollection>
    }>({
      query,
      variables: { first: 250, after: cursor },
      tags: ["collections"],
    })

    allCollections.push(...toNodes(data.collections))
    hasNextPage = data.collections?.pageInfo?.hasNextPage || false
    cursor = data.collections?.pageInfo?.endCursor || null
  }

  console.log(`[v0] Fetched ${allCollections.length} total collections from Shopify`)
  return allCollections
}

export async function getCollectionProducts({
  collection,
  limit = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
  query: searchQuery,
  reverse = false,
}: {
  collection?: string
  limit?: number
  sortKey?: ProductCollectionSortKey
  query?: string
  reverse?: boolean
} = {}): Promise<ShopifyProduct[]> {
  if (!collection) {
    return getProducts({ first: limit, sortKey: sortKey as ProductSortKey, reverse, query: searchQuery })
  }

  try {
    const query = /* gql */ `
      query getCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean) {
        collection(handle: $handle) {
          products(first: $first, sortKey: $sortKey, reverse: $reverse) {
            nodes {
              id
              title
              description
              descriptionHtml
              handle
              availableForSale
              productType
              tags
              vendor
              category {
                id
                name
              }
              options {
                id
                name
                values
              }
              images(first: 5) {
                nodes {
                  url
                  altText
                  thumbhash
                }
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
              variants(first: 10) {
                nodes {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    `

    const { data } = await shopifyFetch<{
      collection: {
        products: ConnectionLike<ShopifyProduct>
      } | null
    }>({
      query,
      variables: { handle: collection, first: limit, sortKey, query: searchQuery, reverse },
      tags: ["collections", `collection-${collection}`],
    })

    if (!data || !data.collection) {
      console.log(`[v0] Collection "${collection}" not found in Shopify or API error`)
      return []
    }

    const products = toNodes(data.collection.products)
    console.log(`[v0] ✅ Found ${products.length} products in collection "${collection}"`)
    return products
  } catch (error) {
    console.error(`[v0] getCollectionProducts error for collection "${collection}":`, error)
    return []
  }
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const allProducts: ShopifyProduct[] = []
  let hasNextPage = true
  let cursor: string | null = null

  while (hasNextPage) {
    const query = /* gql */ `
      query getAllProducts($first: Int!, $after: String) {
        products(first: $first, after: $after, sortKey: TITLE) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            title
            description
            descriptionHtml
            handle
            availableForSale
            productType
            tags
            vendor
            options {
              id
              name
              values
            }
            images(first: 5) {
              nodes {
                url
                altText
                thumbhash
              }
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
            variants(first: 10) {
              nodes {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `

    const { data } = await shopifyFetch<{
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string }
      } & ConnectionLike<ShopifyProduct>
    }>({
      query,
      variables: { first: 250, after: cursor },
      tags: ["products"],
    })

    allProducts.push(...toNodes(data.products))
    hasNextPage = data.products?.pageInfo?.hasNextPage || false
    cursor = data.products?.pageInfo?.endCursor || null
  }

  console.log(`[v0] Fetched ${allProducts.length} total products from Shopify`)
  return allProducts
}

export async function createCart(): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
  })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  return data.cartCreate.cart
}

export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: { cartId, lines },
  })

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }

  return data.cartLinesAdd.cart
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      title
                      handle
                      images(first: 10) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: { cartId, lines },
  })

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message)
  }

  return data.cartLinesUpdate.cart
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      title
                      handle
                      images(first: 10) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart
      userErrors: Array<{ field: string; message: string }>
    }
  }>({
    query,
    variables: { cartId, lineIds },
  })

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message)
  }

  return data.cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = /* gql */ `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    title
                    handle
                    images(first: 10) {
                      edges {
                        node {
                          url
                          altText
                          thumbhash
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
    }
  `

  const { data } = await shopifyFetch<{
    cart: ShopifyCart | null
  }>({
    query,
    variables: { cartId },
  })

  return data.cart
}

/**
 * Simplified Shopify Storefront API wrapper for testing
 * Returns just the data portion of the response
 */
export async function sf<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const { data } = await shopifyFetch<T>({
    query,
    variables: variables || {},
  })
  return data
}

export { shopifyFetch, searchProducts }
