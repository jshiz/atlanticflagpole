import type React from "react"
import { requireAuth } from "@/lib/auth/protected-route"
import { User, Package, MapPin, Settings, Heart, Star, LogOut, Home } from "lucide-react"
import Link from "next/link"

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth()

  const initials = `${session.firstName?.[0] || ""}${session.lastName?.[0] || ""}`.toUpperCase() || "U"

  const navigation = [
    { name: "Overview", href: "/account", icon: Home },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Profile", href: "/account/profile", icon: User },
    { name: "Security", href: "/account/security", icon: Settings },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Reviews", href: "/account/reviews", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-afp-ivory">
      {/* Mobile Header */}
      <div className="lg:hidden bg-navy px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-afp-gold text-afp-navy font-bold">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-afp-ivory">
              {session.firstName} {session.lastName}
            </p>
            <p className="text-xs text-afp-ivory/70">{session.email}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop Profile Header */}
              <div className="hidden lg:block p-6 bg-navy">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-afp-gold text-afp-navy text-xl font-bold mb-3">
                    {initials}
                  </div>
                  <p className="text-base font-medium text-afp-ivory">
                    {session.firstName} {session.lastName}
                  </p>
                  <p className="text-sm text-afp-ivory/70 mt-1">{session.email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-afp-charcoal rounded-md hover:bg-afp-ivory transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-afp-gold" />
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/api/auth/logout"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors mt-2"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="mt-8 lg:mt-0 lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  )
}
