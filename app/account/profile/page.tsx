import { requireAuth } from "@/lib/auth/protected-route"
import { getCustomer } from "@/lib/shopify/customer-account"
import { ProfileForm } from "@/components/account/profile-form"

export const metadata = {
  title: "My Profile - Atlantic Flagpole",
  description: "Manage your profile information",
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

export default async function ProfilePage() {
  const session = await requireAuth()

  let customer = null

  try {
    customer = await getCustomer(session.accessToken)
  } catch (error) {
    console.error("[v0] Error fetching customer:", error)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy">Profile Information</h1>
        <p className="text-gray-600 mt-1">Update your personal details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ProfileForm customer={customer} />
      </div>
    </div>
  )
}
