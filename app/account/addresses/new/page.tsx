import { requireAuth } from "@/lib/auth/protected-route"
import { AddressForm } from "@/components/account/address-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Add Address - Atlantic Flagpole",
  description: "Add a new shipping or billing address",
}

export default async function NewAddressPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Link
          href="/account/addresses"
          className="inline-flex items-center text-sm text-afp-gold hover:text-afp-gold-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Addresses
        </Link>
        <h1 className="text-2xl font-serif font-bold text-afp-navy">Add New Address</h1>
        <p className="text-gray-600 mt-1">Add a shipping or billing address</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <AddressForm />
      </div>
    </div>
  )
}
