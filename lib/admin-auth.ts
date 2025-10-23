import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function requireAdminAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin_auth")

  if (authCookie?.value !== "authenticated") {
    redirect("/admin/login")
  }

  return true
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin_auth")
  return authCookie?.value === "authenticated"
}
