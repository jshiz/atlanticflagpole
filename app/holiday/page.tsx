import { redirect } from "next/navigation"

export default function HolidayPage() {
  // Redirect to the holiday collection
  redirect("/collections/holiday-seasonal")
}
