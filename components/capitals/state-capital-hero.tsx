"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { StateCapitalData } from "@/lib/capitals/data"

interface StateCapitalHeroProps {
  stateData: StateCapitalData
}

export function StateCapitalHero({ stateData }: StateCapitalHeroProps) {
  const scrollToProduct = () => {
    const productSection = document.getElementById("phoenix-product")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-[#1B365D] to-[#0B1C2C] text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            The Best Telescoping Flagpole in {stateData.capital}, {stateData.state}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Get the American-Made Phoenix Telescoping Flagpole Delivered to {stateData.capital}.
          </p>
          <Button
            size="lg"
            onClick={scrollToProduct}
            className="bg-[#C8A55C] hover:bg-[#B8954C] text-white text-lg px-8 py-6"
          >
            Shop Phoenix Flagpoles Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F3EF] to-transparent" />
    </section>
  )
}
