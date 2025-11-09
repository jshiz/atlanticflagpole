import { notFound } from "next/navigation"
import { getStateCapitalData, getAllStateCapitals } from "@/lib/capitals/data"
import { getStateAddOns } from "@/lib/capitals/product-search"
import { getProduct } from "@/lib/shopify"
import { StateCapitalHero } from "@/components/capitals/state-capital-hero"
import { TrustBar } from "@/components/capitals/trust-bar"
import { LocalizedHook } from "@/components/capitals/localized-hook"
import { PhoenixProductShowcase } from "@/components/capitals/phoenix-product-showcase"
import { StateAddOns } from "@/components/capitals/state-add-ons"
import { WhyPhoenix } from "@/components/capitals/why-phoenix"
import { LocalContentHub } from "@/components/capitals/local-content-hub"
import { StateCapitalFAQ } from "@/components/capitals/state-capital-faq"
import { FinalCTA } from "@/components/capitals/final-cta"
import { generateStateCapitalMetadata } from "@/lib/seo/state-capital-metadata"
import { generateStateCapitalSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import type { Metadata } from "next"

interface StateCapitalPageProps {
  params: {
    state: string
  }
}

export async function generateStaticParams() {
  const allCapitals = getAllStateCapitals()
  return allCapitals.map((capital) => ({
    state: capital.stateCode.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: StateCapitalPageProps): Promise<Metadata> {
  const stateData = getStateCapitalData(params.state.toUpperCase())
  if (!stateData) return {}

  return generateStateCapitalMetadata(stateData)
}

export default async function StateCapitalPage({ params }: StateCapitalPageProps) {
  const stateData = getStateCapitalData(params.state.toUpperCase())

  if (!stateData) {
    notFound()
  }

  let phoenixProduct = null
  try {
    phoenixProduct = await getProduct("phoenix-telescoping-flagpole-premier-kit-starter-bundle")
  } catch (error) {
    console.error("[v0] Error fetching Phoenix product:", error)
  }

  console.log("[v0] Phoenix product found:", phoenixProduct ? phoenixProduct.handle : "none")

  let addOns = []
  try {
    const addOnsPromise = getStateAddOns(stateData.stateCode, stateData.state)
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
    addOns = (await Promise.race([addOnsPromise, timeoutPromise])) as typeof addOns
  } catch (error) {
    console.log("[v0] Add-ons timed out or failed, continuing without them")
  }

  const stateSchema = phoenixProduct ? generateStateCapitalSchema(stateData, phoenixProduct) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app" },
    {
      name: "State Capitals",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/capitals`,
    },
    {
      name: `${stateData.capital}, ${stateData.state}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/capitals/${params.state}`,
    },
  ])

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      {stateSchema && <StructuredData data={stateSchema} />}
      <StructuredData data={breadcrumbSchema} />

      <StateCapitalHero stateData={stateData} />
      <TrustBar />
      <LocalizedHook stateData={stateData} />

      {phoenixProduct && <PhoenixProductShowcase product={phoenixProduct} stateData={stateData} />}

      {addOns && addOns.length >= 4 && <StateAddOns addOns={addOns.slice(0, 4)} stateData={stateData} />}

      <WhyPhoenix />
      <LocalContentHub stateData={stateData} />
      <StateCapitalFAQ stateData={stateData} />
      <FinalCTA stateData={stateData} />
    </main>
  )
}
