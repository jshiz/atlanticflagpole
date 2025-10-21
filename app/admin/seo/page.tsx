import { requireAdminAuth } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import SEOEditorClient from "@/components/admin/seo-editor-client"
import { AdminNav } from "@/components/admin/admin-nav"

export const dynamic = "force-dynamic"

export default async function AdminSEOPage() {
  const isAuthenticated = await requireAdminAuth()
  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container mx-auto p-6">
        <SEOEditorClient />
      </div>
    </div>
  )
}
