import { requireAuth } from "@/lib/auth/protected-route"
import { RewardsClient } from "@/components/account/rewards-client"

export const metadata = {
  title: "My Rewards - Atlantic Flagpole",
  description: "Earn and redeem rewards points",
}

export const dynamic = "force-dynamic"

export default async function RewardsPage() {
  const session = await requireAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy">AFP Rewards</h1>
        <p className="text-gray-600 mt-1">Earn points with every purchase and redeem for discounts</p>
      </div>

      <RewardsClient customerId={session.customerId} email={session.email} />
    </div>
  )
}
