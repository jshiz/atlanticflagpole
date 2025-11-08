import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shop by State | Premium Flagpoles for Every State",
  description:
    "Find the perfect flagpole for your state. Browse state-specific flags and accessories tailored to your location.",
}

const states = [
  { name: "Alabama", slug: "alabama", capital: "Montgomery" },
  { name: "Alaska", slug: "alaska", capital: "Juneau" },
  { name: "Arizona", slug: "arizona", capital: "Phoenix" },
  { name: "Arkansas", slug: "arkansas", capital: "Little Rock" },
  { name: "California", slug: "california", capital: "Sacramento" },
  { name: "Colorado", slug: "colorado", capital: "Denver" },
  { name: "Connecticut", slug: "connecticut", capital: "Hartford" },
  { name: "Delaware", slug: "delaware", capital: "Dover" },
  { name: "Florida", slug: "florida", capital: "Tallahassee" },
  { name: "Georgia", slug: "georgia", capital: "Atlanta" },
  // Add all 50 states...
]

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-[#0B1C2C]">
          Find Your State's Perfect Flagpole
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#0B1C2C]/70 md:text-xl">
          Discover premium flagpoles designed for your state's unique climate and conditions.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              className="group rounded-lg border-2 border-gray-200 bg-white hover:bg-gradient-to-br hover:from-[#0B1C2C] hover:to-[#1a2f42] hover:border-[#C8A55C] p-4 transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="font-semibold text-[#0B1C2C] group-hover:text-white transition-colors">{state.name}</h3>
              <p className="text-sm text-[#0B1C2C]/60 group-hover:text-white/80 transition-colors">{state.capital}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
