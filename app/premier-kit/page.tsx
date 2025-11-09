import type { Metadata } from "next"
import { PhoenixPremierKitSalesPage } from "@/components/premier-kit/phoenix-premier-kit-sales-page"

export const metadata: Metadata = {
  title: "Phoenix Telescoping Flagpole Premier Kit - The Last Flagpole You'll Ever Need | Atlantic Flagpole",
  description:
    "You don't just raise a flag — you raise a legacy. The Phoenix Premier Kit is built to fly, built to last, and built to matter. Made in USA with a Forever Warranty. Trusted by 33,758+ Americans.",
  openGraph: {
    title: "Phoenix Premier Kit - The Last Flagpole You'll Ever Need",
    description: "Forged from aerospace-grade aluminum. Wind-rated to 100+ MPH. Backed by our Forever Warranty.",
    images: ["/images/phoenix-flagpole-hero.jpg"],
  },
}

export default function PremierKitSalesPage() {
  return <PhoenixPremierKitSalesPage />
}
