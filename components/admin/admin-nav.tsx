"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"

export function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <nav className="bg-[#0B1C2C] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-serif font-bold">Atlantic Flagpole Admin</h1>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Blog
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
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
