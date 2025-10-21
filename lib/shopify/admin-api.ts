/**
 * Shopify Admin API client for fetching store analytics and managing products
 * Requires SHOPIFY_ADMIN_ACCESS_TOKEN environment variable
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ""
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || ""
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"

async function adminApiFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!SHOPIFY_ADMIN_ACCESS_TOKEN) {
    throw new Error("SHOPIFY_ADMIN_ACCESS_TOKEN is not configured")
  }

  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("[v0] Shopify Admin API HTTP error:", res.status, errorText)
    throw new Error(`Shopify Admin API error (${res.status}): ${errorText}`)
  }

  const json = await res.json()

  if (json.errors) {
    console.error("[v0] Shopify Admin API GraphQL errors:", json.errors)
    throw new Error(`Shopify Admin GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

export async function shopifyAdminFetch({ query, variables }: { query: string; variables?: Record<string, any> }) {
  return adminApiFetch(query, variables)
}

export async function getProductCount() {
  const query = /* GraphQL */ `
    query GetProductCount {
      productsCount {
        count
      }
    }
  `

  try {
    const data = await adminApiFetch<{ productsCount: { count: number } }>(query)
    return data.productsCount.count
  } catch (error) {
    console.error("[v0] Error fetching product count:", error)
    return null
  }
}

export async function getOrdersStats(daysAgo = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysAgo)
  const createdAtMin = startDate.toISOString()

  const query = /* GraphQL */ `
    query GetOrdersStats($createdAtMin: DateTime!) {
      orders(first: 250, query: $createdAtMin) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            name
            createdAt
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            financialStatus
            fulfillmentStatus
          }
        }
      }
    }
  `

  try {
    const data = await adminApiFetch<{ orders: any }>(query, {
      createdAtMin: `created_at:>='${createdAtMin}'`,
    })

    const orders = data.orders.edges.map((edge: any) => edge.node)
    const totalSales = orders.reduce((sum: number, order: any) => {
      return sum + Number.parseFloat(order.totalPriceSet.shopMoney.amount)
    }, 0)

    return {
      orderCount: orders.length,
      totalSales,
      currencyCode: orders[0]?.totalPriceSet.shopMoney.currencyCode || "USD",
      orders: orders.slice(0, 10), // Return last 10 orders
    }
  } catch (error) {
    console.error("[v0] Error fetching orders stats:", error)
    return null
  }
}

export async function getCollectionCount() {
  const query = /* GraphQL */ `
    query GetCollectionCount {
      collectionsCount {
        count
      }
    }
  `

  try {
    const data = await adminApiFetch<{ collectionsCount: { count: number } }>(query)
    return data.collectionsCount.count
  } catch (error) {
    console.error("[v0] Error fetching collection count:", error)
    return null
  }
}

export async function getCustomerCount() {
  const query = /* GraphQL */ `
    query GetCustomerCount {
      customersCount {
        count
      }
    }
  `

  try {
    const data = await adminApiFetch<{ customersCount: { count: number } }>(query)
    return data.customersCount.count
  } catch (error) {
    console.error("[v0] Error fetching customer count:", error)
    return null
  }
}
