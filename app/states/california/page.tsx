import type { Metadata } from "next"
import { getProduct } from "@/lib/shopify"
import { StateCapitalHero } from "@/components/capitals/state-capital-hero"
import { TrustBar } from "@/components/capitals/trust-bar"
import { PhoenixProductShowcase } from "@/components/capitals/phoenix-product-showcase"
import { SpotlightProducts } from "@/components/products/spotlight-products"
import { FinalCTA } from "@/components/capitals/final-cta"

export const metadata: Metadata = {
  title: "California Flagpoles | Sacramento, CA | Premium Telescoping Flagpoles",
  description:
    "Shop premium flagpoles designed for Sacramento, California's Mediterranean climate. Heat-resistant, wind-rated. Show your California pride!",
}

const stateData = {
  stateCode: "CA",
  state: "California",
  capital: "Sacramento",
  stateNickname: "The Golden State",
  countyName: "Sacramento County",
  climate: {
    type: "Mediterranean climate with hot, dry summers",
    challenges: ["Intense summer heat", "Strong valley winds", "Occasional wildfires"],
    phoenixBenefits: [
      "Heat-resistant anodized finish won't warp or fade",
      "100 MPH wind rating handles valley winds",
      "Fire-resistant aluminum construction",
    ],
  },
}

export default async function CaliforniaPage() {
  const phoenixProduct = await getProduct("phoenix-telescoping-flagpole-premier-kit-starter-bundle")

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <StateCapitalHero stateData={stateData} />
      <TrustBar />

      {phoenixProduct && <PhoenixProductShowcase product={phoenixProduct} stateData={stateData} />}

      <SpotlightProducts />

      <FinalCTA stateData={stateData} />
    </main>
  )
}
