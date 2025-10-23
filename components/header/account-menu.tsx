"use client"

import { User, LogIn, LogOut, Package, MapPin, Heart, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface AccountMenuProps {
  session: {
    firstName?: string
    lastName?: string
    email: string
  } | null
}

export function AccountMenu({ session }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!session) {
    return (
      <Link
        href="/account/login"
        className="flex items-center gap-2 px-4 py-2 bg-[#C8A55C] hover:bg-[#a88947] text-white rounded-lg font-semibold transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Link>
    )
  }

  const initials =
    `${session.firstName?.[0] || ""}${session.lastName?.[0] || ""}`.toUpperCase() || session.email[0].toUpperCase()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Account menu"
      >
        <div className="w-8 h-8 bg-[#0B1C2C] text-white rounded-full flex items-center justify-center font-semibold text-sm">
          {initials}
        </div>
        <span className="hidden md:inline text-sm font-medium text-[#0B1C2C]">{session.firstName || "Account"}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-[#0B1C2C]">
                {session.firstName} {session.lastName}
              </p>
              <p className="text-sm text-gray-600 truncate">{session.email}</p>
            </div>

            <div className="py-2">
              <Link
                href="/account"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-[#0B1C2C]">Account Overview</span>
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Package className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-[#0B1C2C]">My Orders</span>
              </Link>
              <Link
                href="/account/wishlist"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-[#0B1C2C]">Wishlist</span>
              </Link>
              <Link
                href="/account/addresses"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-[#0B1C2C]">Addresses</span>
              </Link>
              <Link
                href="/account/profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-[#0B1C2C]">Settings</span>
              </Link>
            </div>

            <div className="border-t border-gray-100 pt-2">
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-[#0B1C2C]">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
