import type { Metadata } from "next"
import { ChristmasTreeSalesPage } from "@/components/christmas/christmas-tree-sales-page"

export const metadata: Metadata = {
  title: "LED Christmas Trees for Flagpoles - Transform Your Flagpole | Atlantic Flagpole",
  description:
    "Transform your flagpole into a stunning Christmas display with our Patriot Glo LED Christmas tree kits. Available in 20ft and 25ft sizes with warm white or multicolor LEDs. Free shipping and easy installation.",
  openGraph: {
    title: "LED Christmas Trees for Flagpoles - Atlantic Flagpole",
    description: "Transform your flagpole into a magical Christmas display with our premium LED light kits",
    images: ["/images/christmas-tree-hero.jpg"],
  },
}

export default function LEDChristmasTreesPage() {
  return <ChristmasTreeSalesPage />
}
