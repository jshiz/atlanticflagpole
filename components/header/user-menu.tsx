"use client"

import { useState, useEffect } from "react"
import { User, Package, Gift, Settings, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => setSession(data))
      .catch(() => setSession(null))
  }, [])

  if (!session) {
    return (
      <Link href="/account/login" className="text-sm font-medium text-afp-navy hover:text-afp-gold transition-colors">
        Sign In
      </Link>
    )
  }

  const initials = `${session.firstName?.[0] || ""}${session.lastName?.[0] || ""}`.toUpperCase() || "U"

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afp-gold text-afp-navy text-sm font-bold">
          {initials}
        </div>
        <ChevronDown className={`h-4 w-4 text-afp-navy transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-afp-navy">
                {session.firstName} {session.lastName}
              </p>
              <p className="text-xs text-gray-600 truncate">{session.email}</p>
            </div>

            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-2 text-sm text-afp-charcoal hover:bg-afp-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 text-afp-gold" />
              Profile
            </Link>

            <Link
              href="/account/orders"
              className="flex items-center gap-3 px-4 py-2 text-sm text-afp-charcoal hover:bg-afp-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Package className="h-4 w-4 text-afp-gold" />
              Orders
            </Link>

            <Link
              href="/account/rewards"
              className="flex items-center gap-3 px-4 py-2 text-sm text-afp-charcoal hover:bg-afp-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Gift className="h-4 w-4 text-afp-gold" />
              Rewards
            </Link>

            <Link
              href="/account/security"
              className="flex items-center gap-3 px-4 py-2 text-sm text-afp-charcoal hover:bg-afp-ivory transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 text-afp-gold" />
              Settings
            </Link>

            <div className="border-t border-gray-200 mt-2 pt-2">
              <Link
                href="/api/auth/logout"
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
