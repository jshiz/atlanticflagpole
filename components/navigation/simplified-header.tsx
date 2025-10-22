"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SimplifiedHeaderProps {
  cartCount?: number
}

export function SimplifiedHeader({ cartCount = 0 }: SimplifiedHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between pl-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Atlantic Flagpole
          </span>
        </Link>

        {/* Right Side - Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && <Badge className="bg-blue-600">{cartCount}</Badge>}
        </Link>
      </div>
    </header>
  )
}
