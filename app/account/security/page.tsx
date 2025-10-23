import { requireAuth } from "@/lib/auth/protected-route"
import { Shield, Key } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Security - Atlantic Flagpole",
  description: "Manage your account security settings",
}

export const dynamic = "force-dynamic"

export default async function SecurityPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-afp-navy">Security Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account security and password</p>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-afp-ivory rounded-lg">
            <Key className="h-6 w-6 text-afp-gold" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-afp-navy mb-2">Password</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your password is managed through Shopify's secure authentication system. To change your password, you'll
              need to use Shopify's password reset flow.
            </p>
            <Button variant="outline" className="border-afp-gold text-afp-gold hover:bg-afp-ivory bg-transparent">
              Request Password Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-afp-ivory rounded-lg">
            <Shield className="h-6 w-6 text-afp-gold" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-afp-navy mb-2">Account Security</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your account is protected by Shopify's enterprise-grade security infrastructure, including encrypted data
              storage and secure authentication protocols.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-gray-700">Two-factor authentication available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-gray-700">Encrypted data transmission</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-gray-700">Secure session management</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-afp-navy mb-2">Sign Out</h2>
        <p className="text-sm text-gray-600 mb-4">Sign out of your account on this device</p>
        <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
          <Link href="/api/auth/logout">Sign Out</Link>
        </Button>
      </div>
    </div>
  )
}
