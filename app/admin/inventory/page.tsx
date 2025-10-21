import { requireAdminAuth } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import InventoryClient from "@/components/admin/inventory-client"

export const dynamic = "force-dynamic"

export default async function AdminInventoryPage() {
  const isAuthenticated = await requireAdminAuth()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <InventoryClient />
}
