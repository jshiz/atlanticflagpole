import { requireAdminAuth } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import ProductsClient from "@/components/admin/products-client"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  const isAuthenticated = await requireAdminAuth()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <ProductsClient />
}
