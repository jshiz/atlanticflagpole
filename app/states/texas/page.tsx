import type { Metadata } from "next"
import { getProduct } from "@/lib/shopify"
import { StateCapitalHero } from "@/components/capitals/state-capital-hero"
import { TrustBar } from "@/components/capitals/trust-bar"
import { PhoenixProductShowcase } from "@/components/capitals/phoenix-product-showcase"
import { SpotlightProducts } from "@/components/products/spotlight-products"
import { FinalCTA } from "@/components/capitals/final-cta"

export const metadata: Metadata = {
  title: "Texas Flagpoles | Austin, TX | Premium Telescoping Flagpoles",
  description:
    "Shop premium flagpoles designed for Austin, Texas's hot climate. 100 MPH wind rating, heat-resistant finish. Show your Texas pride!",
}

const stateData = {
  stateCode: "TX",
  state: "Texas",
  capital: "Austin",
  stateNickname: "The Lone Star State",
  countyName: "Travis County",
  climate: {
    type: "Humid subtropical with hot summers",
    challenges: ["Extreme heat", "Severe thunderstorms", "High winds"],
    phoenixBenefits: [
      "Heat-resistant anodized finish won't warp or fade",
      "100 MPH wind rating for Texas storms",
      "Rust-proof construction handles all conditions",
    ],
  },
}

export default async function TexasPage() {
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
