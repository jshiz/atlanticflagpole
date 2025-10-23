import { redirect } from "next/navigation"
import { getSession } from "./session"

export async function requireAuth() {
  try {
    const session = await getSession()

    if (!session) {
      redirect("/account/login")
    }

    return session
  } catch (error) {
    console.error("[v0] Auth check failed:", error)
    redirect("/account/login")
  }
}
