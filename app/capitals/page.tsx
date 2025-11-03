import type { Metadata } from "next"
import { stateCapitals } from "@/lib/capitals/data"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shop by State | Premium Flagpoles for Every State Capital",
  description:
    "Find the perfect flagpole for your state. Browse state-specific flags, sports team flags, and accessories tailored to your location.",
  openGraph: {
    title: "Shop by State | Premium Flagpoles for Every State Capital",
    description:
      "Find the perfect flagpole for your state. Browse state-specific flags, sports team flags, and accessories tailored to your location.",
  },
}

export default function CapitalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-[#0B1C2C]">
          Find Your State's Perfect Flagpole
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#0B1C2C]/70 md:text-xl">
          Discover premium flagpoles, state flags, and local sports team flags designed for your area's unique climate
          and conditions.
        </p>
      </section>

      {/* State List Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#0B1C2C]">Browse All States</h2>
        <div className="max-w-5xl mx-auto grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(stateCapitals)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
            .map(([code, state]) => (
              <Link
                key={code}
                href={`/capitals/${code.toLowerCase()}`}
                className="group rounded-lg border-2 border-gray-200 bg-white hover:bg-gradient-to-br hover:from-[#0B1C2C] hover:to-[#1a2f42] hover:border-[#C8A55C] p-4 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-[#C8A55C] group-hover:text-[#C8A55C] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-[#0B1C2C] group-hover:text-white transition-colors">
                        {state.name}
                      </h3>
                      <p className="text-sm text-[#0B1C2C]/60 group-hover:text-white/80 transition-colors">
                        {state.capital}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="h-5 w-5 text-[#0B1C2C]/40 group-hover:text-[#C8A55C] transition-all group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t bg-gradient-to-b from-white to-[#F5F3EF] py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#0B1C2C]">Why Shop by State?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8A55C]/10">
                  <svg className="h-8 w-8 text-[#C8A55C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#0B1C2C]">State-Specific Flags</h3>
              <p className="text-[#0B1C2C]/70">Find your state flag and local sports team flags all in one place.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8A55C]/10">
                  <svg className="h-8 w-8 text-[#C8A55C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#0B1C2C]">Climate-Optimized</h3>
              <p className="text-[#0B1C2C]/70">Get recommendations based on your state's unique weather conditions.</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8A55C]/10">
                  <svg className="h-8 w-8 text-[#C8A55C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#0B1C2C]">Local Expertise</h3>
              <p className="text-[#0B1C2C]/70">
                Benefit from recommendations tailored to your state's regulations and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
