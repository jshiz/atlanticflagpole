import { requireAuth } from "@/lib/auth/protected-route"
import { getCustomerOrders } from "@/lib/shopify/customer-account"
import { Package, ChevronRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "My Orders - Atlantic Flagpole",
  description: "View your order history and track shipments",
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

export default async function OrdersPage() {
  const session = await requireAuth()

  let orders = []
  let hasNextPage = false

  try {
    const ordersData = await getCustomerOrders(session.accessToken, 20)
    orders = ordersData?.edges || []
    hasNextPage = ordersData?.pageInfo?.hasNextPage || false
  } catch (error) {
    console.error("[v0] Error fetching orders:", error)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy">Order History</h1>
        <p className="text-gray-600 mt-1">View and track your orders</p>
      </div>

      {orders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {orders.map((orderEdge: any) => {
              const order = orderEdge.node
              const orderId = order.id.split("/").pop()
              const lineItems = order.lineItems?.edges || []

              return (
                <Link
                  key={order.id}
                  href={`/account/orders/${orderId}`}
                  className="block p-6 hover:bg-afp-ivory transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-afp-navy text-lg">Order #{order.number}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Placed on{" "}
                        {new Date(order.processedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        order.fulfillmentStatus === "FULFILLED"
                          ? "bg-green-100 text-green-800"
                          : order.fulfillmentStatus === "PARTIALLY_FULFILLED"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.fulfillmentStatus?.replace("_", " ") || "Processing"}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                      {order.financialStatus?.replace("_", " ") || "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {lineItems.slice(0, 3).map((item: any, idx: number) => (
                      <div key={idx} className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {item.node.image?.url && (
                          <img
                            src={item.node.image.url || "/placeholder.svg"}
                            alt={item.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                    {lineItems.length > 3 && <div className="text-sm text-gray-600">+{lineItems.length - 3} more</div>}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {lineItems.length} {lineItems.length === 1 ? "item" : "items"}
                    </p>
                    <p className="font-semibold text-afp-navy">
                      ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-afp-navy mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link
            href="/collections/all"
            className="inline-flex items-center justify-center px-6 py-3 bg-afp-gold hover:bg-afp-gold-700 text-white rounded-md font-medium transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  )
}
