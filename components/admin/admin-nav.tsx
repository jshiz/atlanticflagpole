"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, FileText, BarChart3, Package, Search, DollarSign, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/seo", label: "SEO", icon: Search },
    { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
    { href: "/admin/inventory", label: "Inventory", icon: AlertTriangle },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/blog", label: "Blog", icon: FileText },
  ]

  return (
    <nav className="bg-[#0B1C2C] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-serif font-bold">Atlantic Flagpole Admin</h1>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                    isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-white hover:bg-white/10 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  )
}
