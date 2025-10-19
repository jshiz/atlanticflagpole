import { requireAuth } from "@/lib/auth/protected-route"
import { getCustomerAddresses } from "@/lib/shopify/customer-account"
import { MapPin, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AddressCard } from "@/components/account/address-card"

export const metadata = {
  title: "My Addresses - Atlantic Flagpole",
  description: "Manage your shipping and billing addresses",
}

export default async function AddressesPage() {
  const session = await requireAuth()

  let addresses = []

  try {
    const addressesData = await getCustomerAddresses(session.accessToken)
    addresses = addressesData?.edges || []
  } catch (error) {
    console.error("[v0] Error fetching addresses:", error)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-afp-navy">Saved Addresses</h1>
            <p className="text-gray-600 mt-1">Manage your shipping and billing addresses</p>
          </div>
          <Button asChild className="bg-afp-gold hover:bg-afp-gold-700 text-white">
            <Link href="/account/addresses/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Link>
          </Button>
        </div>
      </div>

      {addresses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((addressEdge: any) => (
            <AddressCard key={addressEdge.node.id} address={addressEdge.node} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-afp-navy mb-2">No addresses saved</h3>
          <p className="text-gray-600 mb-6">Add an address to make checkout faster</p>
          <Button asChild className="bg-afp-gold hover:bg-afp-gold-700 text-white">
            <Link href="/account/addresses/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Address
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
