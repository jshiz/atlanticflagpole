"use client"

import { User } from "lucide-react"
import Link from "next/link"

export function AccountMenu() {
  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  return (
    <Link
      href={shopifyAccountUrl}
      className="flex items-center gap-2 px-4 py-2 bg-[#C8A55C] hover:bg-[#a88947] text-white rounded-lg font-semibold transition-colors"
    >
      <User className="w-4 h-4" />
      <span className="hidden sm:inline">Account</span>
    </Link>
  )
}
