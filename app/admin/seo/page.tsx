import { requireAdminAuth } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import SEOEditorClient from "@/components/admin/seo-editor-client"

export const dynamic = "force-dynamic"

export default async function AdminSEOPage() {
  const isAuthenticated = await requireAdminAuth()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <SEOEditorClient />
}
