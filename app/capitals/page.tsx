import type { Metadata } from "next"
import { USStateMap } from "@/components/capitals/us-state-map"
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Find Your State's Perfect Flagpole
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Click on your state to discover premium flagpoles, state flags, and local sports team flags designed for your
          area's unique climate and conditions.
        </p>
      </section>

      {/* Interactive Map Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-5xl rounded-lg border bg-card p-8 shadow-lg">
          <USStateMap />
        </div>
      </section>

      {/* State List Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Browse All States</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(stateCapitals)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
            .map(([code, state]) => (
              <Link
                key={code}
                href={`/capitals/${code.toLowerCase()}`}
                className="group rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary">{state.name}</h3>
                    <p className="text-sm text-muted-foreground">{state.capital}</p>
                  </div>
                  <svg
                    className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
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
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Shop by State?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">State-Specific Flags</h3>
              <p className="text-muted-foreground">
                Find your state flag and local sports team flags all in one place.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Climate-Optimized</h3>
              <p className="text-muted-foreground">
                Get recommendations based on your state's unique weather conditions.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Local Expertise</h3>
              <p className="text-muted-foreground">
                Benefit from recommendations tailored to your state's regulations and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
