import { Suspense } from "react"
import { ChristmasTreeProduct } from "@/components/products/christmas-tree-product"
import { SnowOverlay } from "@/components/effects/snow-overlay"

export const metadata = {
  title: "Patriot Glo Flagpole Christmas Tree Light Kit | Atlantic Flagpole",
  description:
    "Transform your flagpole into a stunning Christmas tree with our LED light kit. Easy setup, energy-efficient, weather-resistant, and backed by a 42-month warranty.",
  openGraph: {
    title: "Patriot Glo Flagpole Christmas Tree Light Kit",
    description: "Transform your flagpole into a stunning Christmas tree with our LED light kit",
    type: "website",
  },
}

export default function ChristmasTreePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] relative overflow-hidden">
      <SnowOverlay />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ChristmasTreeProduct />
      </Suspense>
    </main>
  )
}
