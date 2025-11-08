import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL || ""
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const customerToken = cookieStore.get("customer_token")?.value

    if (!customerToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Fetch customer orders using Storefront API
    const query = /* GraphQL */ `
      query getCustomerOrders($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                orderNumber
                processedAt
                financialStatus
                fulfillmentStatus
                totalPrice {
                  amount
                  currencyCode
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        price {
                          amount
                        }
                        image {
                          url
                        }
                      }
                    }
                  }
                }
                shippingAddress {
                  name
                  address1
                  city
                  province
                  zip
                }
              }
            }
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
        variables: {
          customerAccessToken: customerToken,
        },
      }),
    })

    const result = await response.json()

    if (!result.data?.customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Transform orders to our format
    const orders = result.data.customer.orders.edges.map((edge: any) => {
      const order = edge.node
      return {
        id: order.id,
        orderNumber: order.orderNumber.toString(),
        status: mapFulfillmentStatus(order.fulfillmentStatus),
        items: order.lineItems.edges.map((lineEdge: any) => ({
          title: lineEdge.node.title,
          quantity: lineEdge.node.quantity,
          price: Number.parseFloat(lineEdge.node.variant.price.amount),
          image: lineEdge.node.variant.image?.url,
        })),
        total: Number.parseFloat(order.totalPrice.amount),
        createdAt: order.processedAt,
        shippingAddress: {
          name: order.shippingAddress?.name || "",
          address1: order.shippingAddress?.address1 || "",
          city: order.shippingAddress?.city || "",
          state: order.shippingAddress?.province || "",
          zip: order.shippingAddress?.zip || "",
        },
      }
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("[v0] Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

function mapFulfillmentStatus(status: string): "pending" | "processing" | "shipped" | "delivered" {
  switch (status) {
    case "UNFULFILLED":
      return "pending"
    case "PARTIAL":
      return "processing"
    case "FULFILLED":
      return "shipped"
    default:
      return "pending"
  }
}
