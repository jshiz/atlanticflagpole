import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "LED Christmas Trees for Flagpoles - Atlantic Flagpole",
  description: "Transform your flagpole into a stunning Christmas display with our LED Christmas trees",
}

export default function LEDChristmasTreesPage() {
  // Redirect to the holiday collection page
  redirect("/holiday")
}
