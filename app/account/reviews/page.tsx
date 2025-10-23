import { requireAuth } from "@/lib/auth/protected-route"
import { Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "My Reviews - Atlantic Flagpole",
  description: "View and manage your product reviews",
}

export const dynamic = "force-dynamic"

export default async function ReviewsPage() {
  const session = await requireAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy">My Reviews</h1>
        <p className="text-gray-600 mt-1">Reviews you've written for products</p>
      </div>

      {/* Judge.me Integration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <Star className="h-16 w-16 text-afp-gold mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-afp-navy mb-2">Your Reviews</h3>
          <p className="text-gray-600 mb-6">
            View and manage your product reviews through Judge.me. Your reviews help other customers make informed
            decisions.
          </p>

          {/* Judge.me Widget Container */}
          <div id="judgeme-customer-reviews" className="jdgm-widget jdgm-customer-reviews" data-email={session.email} />

          <div className="mt-6">
            <Button asChild className="bg-afp-gold hover:bg-afp-gold-700 text-white">
              <Link href="/collections/all">Browse Products to Review</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Purchases to Review */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-afp-navy mb-4">Products You Can Review</h2>
        <p className="text-sm text-gray-600 mb-4">
          Based on your recent purchases, here are products you can leave a review for:
        </p>
        <div className="text-center py-8 text-gray-500">
          <p>Check your order history to find products to review</p>
          <Button
            asChild
            variant="outline"
            className="mt-4 border-afp-gold text-afp-gold hover:bg-afp-ivory bg-transparent"
          >
            <Link href="/account/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
