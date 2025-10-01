import type { ProductCollectionSortKey, ProductSortKey, ShopifyCart, ShopifyCollection, ShopifyProduct } from "./types"

import { parseShopifyDomain } from "./parse-shopify-domain"
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_KEY } from "./constants"

const rawStoreDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const fallbackStoreDomain = "v0-template.myshopify.com"
const SHOPIFY_STORE_DOMAIN = rawStoreDomain ? parseShopifyDomain(rawStoreDomain) : fallbackStoreDomain

const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`

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
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 3600, tags },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Shopify API HTTP error! Status: ${response.status}, Body: ${errorBody}`)
    }

    const json = await response.json()

    if (json.errors) {
      console.error("Shopify API errors:", json.errors)
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    return json
  } catch (error) {
    console.error("Shopify fetch error:", error)
    throw error
  }
}

// Get all products
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
  const query = /* gql */ `
    query getProducts($first: Int!, $sortKey: ProductSortKeys!, $reverse: Boolean) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            description
            descriptionHtml
            handle
            availableForSale
            productType
            options {
              id
              name
              values
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  thumbhash
                }
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
              edges {
                node {
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
    }
  `

  const { data } = await shopifyFetch<{
    products: {
      edges: Array<{ node: ShopifyProduct }>
    }
  }>({
    query,
    variables: { first, sortKey, reverse, query: searchQuery },
    tags: ["products"],
  })

  return data.products.edges.map((edge) => edge.node)
}

// Get single product by handle
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const query = /* gql */ `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        handle
        productType
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
          edges {
            node {
              url
              altText
              thumbhash
            }
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
          edges {
            node {
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
    product: ShopifyProduct | null
  }>({
    query,
    variables: { handle },
    tags: ["products", `product-${handle}`],
  })

  return data.product
}

// Get collections
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  const query = /* gql */ `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
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
    }
  `

  const { data } = await shopifyFetch<{
    collections: {
      edges: Array<{ node: ShopifyCollection }>
    }
  }>({
    query,
    variables: { first },
    tags: ["collections"],
  })

  return data.collections.edges.map((edge) => edge.node)
}

// Get products from a specific collection (simplified - no server-side filtering)
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

  const query = /* gql */ `
    query getCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean) {
      collection(handle: $handle) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          edges {
            node {
              id
              title
              description
              descriptionHtml
              handle
              productType
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
                edges {
                  node {
                    url
                    altText
                    thumbhash
                  }
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
                edges {
                  node {
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
      }
    }
  `

  const { data } = await shopifyFetch<{
    collection: {
      products: {
        edges: Array<{ node: ShopifyProduct }>
      }
    } | null
  }>({
    query,
    variables: { handle: collection, first: limit, sortKey, query: searchQuery, reverse },
    tags: ["collections", `collection-${collection}`],
  })

  if (!data.collection) {
    return []
  }

  return data.collection.products.edges.map((edge) => edge.node)
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

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[v0] Shopify createCart HTTP error:", response.status, errorText)
    throw new Error(`Shopify API error (${response.status}): ${errorText}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error("[v0] Shopify createCart GraphQL errors:", json.errors)
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  const { data } = json

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

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { cartId, lines },
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[v0] Shopify addCartLines HTTP error:", response.status, errorText)
    throw new Error(`Shopify API error (${response.status}): ${errorText}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error("[v0] Shopify addCartLines GraphQL errors:", json.errors)
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  const { data } = json

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

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { cartId, lines },
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[v0] Shopify updateCartLines HTTP error:", response.status, errorText)
    throw new Error(`Shopify API error (${response.status}): ${errorText}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error("[v0] Shopify updateCartLines GraphQL errors:", json.errors)
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  const { data } = json

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

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { cartId, lineIds },
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[v0] Shopify removeCartLines HTTP error:", response.status, errorText)
    throw new Error(`Shopify API error (${response.status}): ${errorText}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error("[v0] Shopify removeCartLines GraphQL errors:", json.errors)
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  const { data } = json

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

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { cartId },
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[v0] Shopify getCart HTTP error:", response.status, errorText)
    throw new Error(`Shopify API error (${response.status}): ${errorText}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error("[v0] Shopify getCart GraphQL errors:", json.errors)
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  const { data } = json

  return data.cart
}

// Get ALL products with pagination
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
          edges {
            node {
              id
              title
              description
              descriptionHtml
              handle
              availableForSale
              productType
              vendor
              tags
              options {
                id
                name
                values
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                    thumbhash
                  }
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
                edges {
                  node {
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
      }
    `

    const { data } = await shopifyFetch<{
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string }
        edges: Array<{ node: ShopifyProduct }>
      }
    }>({
      query,
      variables: { first: 250, after: cursor },
      tags: ["products"],
    })

    allProducts.push(...data.products.edges.map((edge) => edge.node))
    hasNextPage = data.products.pageInfo.hasNextPage
    cursor = data.products.pageInfo.endCursor
  }

  console.log(`[v0] Fetched ${allProducts.length} total products from Shopify`)
  return allProducts
}
