import { redirect } from "next/navigation"
import { getSession } from "./session"

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/account/login")
  }

  return session
}
