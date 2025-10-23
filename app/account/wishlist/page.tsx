import { requireAuth } from "@/lib/auth/protected-route"
import { WishlistClient } from "@/components/account/wishlist-client"

export const metadata = {
  title: "My Wishlist - Atlantic Flagpole",
  description: "View your saved products",
}

export const dynamic = "force-dynamic"

export default async function WishlistPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy">My Wishlist</h1>
        <p className="text-gray-600 mt-1">Products you've saved for later</p>
      </div>

      <WishlistClient />
    </div>
  )
}
