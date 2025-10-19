import type { Metadata } from "next"
import Link from "next/link"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "My Account - Atlantic Flagpole",
  description: "Manage your Atlantic Flagpole account, orders, and preferences",
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#0B1C2C] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-2">My Account</h1>
            <p className="text-gray-600">Manage your orders, preferences, and account settings</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/account/orders"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#C8A55C] transition-colors group"
            >
              <Package className="w-8 h-8 text-[#C8A55C] mb-3" />
              <h2 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                Order History
              </h2>
              <p className="text-gray-600">View your past orders and track shipments</p>
            </Link>

            <Link
              href="/account/favorites"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#C8A55C] transition-colors group"
            >
              <Heart className="w-8 h-8 text-[#C8A55C] mb-3" />
              <h2 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                Favorites
              </h2>
              <p className="text-gray-600">Save your favorite products for later</p>
            </Link>

            <Link
              href="/account/settings"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#C8A55C] transition-colors group"
            >
              <Settings className="w-8 h-8 text-[#C8A55C] mb-3" />
              <h2 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                Account Settings
              </h2>
              <p className="text-gray-600">Update your profile and preferences</p>
            </Link>

            <div className="p-6 border-2 border-gray-200 rounded-lg">
              <LogOut className="w-8 h-8 text-gray-400 mb-3" />
              <h2 className="text-xl font-semibold text-[#0B1C2C] mb-2">Sign Out</h2>
              <p className="text-gray-600 mb-4">Log out of your account</p>
              <Button variant="outline" className="w-full bg-transparent">
                Sign Out
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#0B1C2C] mb-2">Customer Account Integration Coming Soon</h3>
            <p className="text-gray-700 mb-4">
              We're building a comprehensive customer account system with Shopify integration. Soon you'll be able to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#C8A55C] mr-2">✓</span>
                <span>View and track all your orders from your Shopify account</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C8A55C] mr-2">✓</span>
                <span>Earn points on every purchase with our rewards program</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C8A55C] mr-2">✓</span>
                <span>Access exclusive deals and promotions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C8A55C] mr-2">✓</span>
                <span>Manage your shipping addresses and payment methods</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
