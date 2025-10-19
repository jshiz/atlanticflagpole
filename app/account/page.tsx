import { requireAuth } from "@/lib/auth/protected-route"
import { getCustomer, getCustomerOrders } from "@/lib/shopify/customer-account"
import { Package, MapPin, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "My Account - Atlantic Flagpole",
  description: "Manage your Atlantic Flagpole account, orders, and preferences",
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

export default async function AccountOverviewPage() {
  const session = await requireAuth()

  // Fetch customer data and recent orders
  let customer = null
  let recentOrders = null

  try {
    customer = await getCustomer(session.accessToken)
    const ordersData = await getCustomerOrders(session.accessToken, 3)
    recentOrders = ordersData?.edges || []
  } catch (error) {
    console.error("[v0] Error fetching customer data:", error)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy mb-2">Welcome back, {session.firstName}!</h1>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/account/orders"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-afp-gold transition-colors group"
        >
          <div className="flex items-center justify-between mb-4">
            <Package className="h-8 w-8 text-afp-gold" />
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-afp-gold transition-colors" />
          </div>
          <p className="text-2xl font-bold text-afp-navy mb-1">{recentOrders?.length || 0}</p>
          <p className="text-sm text-gray-600">Recent Orders</p>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-afp-gold transition-colors group"
        >
          <div className="flex items-center justify-between mb-4">
            <MapPin className="h-8 w-8 text-afp-gold" />
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-afp-gold transition-colors" />
          </div>
          <p className="text-2xl font-bold text-afp-navy mb-1">{customer?.defaultAddress ? "1" : "0"}</p>
          <p className="text-sm text-gray-600">Saved Addresses</p>
        </Link>

        <Link
          href="/account/profile"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-afp-gold transition-colors group"
        >
          <div className="flex items-center justify-between mb-4">
            <User className="h-8 w-8 text-afp-gold" />
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-afp-gold transition-colors" />
          </div>
          <p className="text-2xl font-bold text-afp-navy mb-1">Profile</p>
          <p className="text-sm text-gray-600">Manage Details</p>
        </Link>
      </div>

      {/* Recent Orders */}
      {recentOrders && recentOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-afp-navy">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-afp-gold hover:text-afp-gold-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((orderEdge: any) => {
              const order = orderEdge.node
              return (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id.split("/").pop()}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-afp-gold transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-afp-navy">Order #{order.number}</p>
                    <span className="text-sm px-2 py-1 bg-afp-ivory text-afp-charcoal rounded">
                      {order.fulfillmentStatus || "Processing"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(order.processedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm font-medium text-afp-navy mt-2">
                    ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Default Address */}
      {customer?.defaultAddress && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-afp-navy">Default Address</h2>
            <Link href="/account/addresses" className="text-sm text-afp-gold hover:text-afp-gold-700 font-medium">
              Manage
            </Link>
          </div>
          <div className="text-gray-600">
            <p className="font-medium text-afp-navy">
              {customer.defaultAddress.firstName} {customer.defaultAddress.lastName}
            </p>
            <p>{customer.defaultAddress.address1}</p>
            {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
            <p>
              {customer.defaultAddress.city}, {customer.defaultAddress.provinceCode} {customer.defaultAddress.zip}
            </p>
            <p>{customer.defaultAddress.countryCode}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!recentOrders || recentOrders.length === 0) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-afp-navy mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Button asChild className="bg-afp-gold hover:bg-afp-gold-700 text-white">
            <Link href="/collections/all">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
