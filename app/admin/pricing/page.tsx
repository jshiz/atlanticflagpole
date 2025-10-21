import { requireAdminAuth } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import PricingClient from "@/components/admin/pricing-client"

export const dynamic = "force-dynamic"

export default async function AdminPricingPage() {
  const isAuthenticated = await requireAdminAuth()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <PricingClient />
}
