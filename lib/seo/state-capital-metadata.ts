import type { Metadata } from "next"
import type { StateCapitalData } from "@/lib/capitals/data"

export function generateStateCapitalMetadata(stateData: StateCapitalData): Metadata {
  const title = `Best Telescoping Flagpole in ${stateData.capital}, ${stateData.state} | Phoenix Flagpole`
  const description = `Get the American-made Phoenix Telescoping Flagpole delivered to ${stateData.capital}, ${stateData.state}. 100 MPH wind guarantee, lifetime warranty, and 365-day home trial. Perfect for ${stateData.stateNickname}.`

  return {
    title,
    description,
    keywords: [
      `telescoping flagpole ${stateData.capital}`,
      `best flagpole ${stateData.capital}`,
      `buy flagpole ${stateData.capital}`,
      `American-made flagpole ${stateData.capital}`,
      `${stateData.state} flagpole`,
      `Phoenix flagpole ${stateData.state}`,
      `flagpole ${stateData.countyName}`,
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Atlantic Flagpole",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
