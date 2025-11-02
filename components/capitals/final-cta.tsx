"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { StateCapitalData } from "@/lib/capitals/data"

interface FinalCTAProps {
  stateData: StateCapitalData
}

export function FinalCTA({ stateData }: FinalCTAProps) {
  const scrollToProduct = () => {
    const productSection = document.getElementById("phoenix-product")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#1B365D] to-[#0B1C2C] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Join Thousands of Patriots in {stateData.state}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Show your pride with a flagpole that's as strong and resilient as {stateData.capital} itself. Order your
            American-made Phoenix Telescoping Flagpole today and get $255 in Free Accessories (including a Premium Nylon
            American Flag with Embroidered Stars) for a limited time!
          </p>
          <Button
            size="lg"
            onClick={scrollToProduct}
            className="bg-[#C8A55C] hover:bg-[#B8954C] text-white text-lg px-8 py-6"
          >
            Shop Now & Claim Your $255 in Free Gifts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-white/70 mt-6">
            365-Day Home Trial • Forever Warranty • 100 MPH Wind Guarantee • Made in the USA
          </p>
        </div>
      </div>
    </section>
  )
}
