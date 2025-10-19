import { requireAuth } from "@/lib/auth/protected-route"
import { getCustomerOrders } from "@/lib/shopify/customer-account"
import { ArrowLeft, Package, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Order Details - Atlantic Flagpole",
  description: "View your order details and tracking information",
}

export default async function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const session = await requireAuth()

  let order = null

  try {
    // Fetch all orders and find the matching one
    const ordersData = await getCustomerOrders(session.accessToken, 50)
    const orders = ordersData?.edges || []
    const orderEdge = orders.find((edge: any) => edge.node.id.endsWith(params.orderId))

    if (!orderEdge) {
      notFound()
    }

    order = orderEdge.node
  } catch (error) {
    console.error("[v0] Error fetching order:", error)
    notFound()
  }

  const lineItems = order.lineItems?.edges || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Link
          href="/account/orders"
          className="inline-flex items-center text-sm text-afp-gold hover:text-afp-gold-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-afp-navy">Order #{order.number}</h1>
            <p className="text-gray-600 mt-1">
              Placed on{" "}
              {new Date(order.processedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-2">
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
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-afp-navy mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-afp-gold" />
              Order Items
            </h2>
            <div className="space-y-4">
              {lineItems.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.node.image?.url && (
                      <img
                        src={item.node.image.url || "/placeholder.svg"}
                        alt={item.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-afp-navy">{item.node.title}</p>
                    <p className="text-sm text-gray-600 mt-1">Quantity: {item.node.quantity}</p>
                    <p className="text-sm font-medium text-afp-navy mt-2">
                      ${item.node.price.amount} {item.node.price.currencyCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reorder Button */}
          <Button className="w-full bg-afp-gold hover:bg-afp-gold-700 text-white">Reorder All Items</Button>
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-afp-navy mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-afp-navy font-medium">
                  ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-afp-navy font-medium">Calculated at checkout</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold text-afp-navy">Total</span>
                <span className="font-bold text-afp-navy text-lg">
                  ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-afp-navy mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-afp-gold" />
              Payment
            </h2>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-medium text-afp-navy">{order.financialStatus?.replace("_", " ") || "Pending"}</span>
            </p>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-afp-navy mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-afp-gold" />
              Shipping Address
            </h2>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-afp-navy">Customer Address</p>
              <p className="mt-2">Address details available after fulfillment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
