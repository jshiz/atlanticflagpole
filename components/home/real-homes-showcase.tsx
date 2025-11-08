"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const homes = [
  {
    image: "/images/customer-photos/customer1.jpg",
    location: "South Carolina",
    title: "Pride on Display",
    description: "35ft Premier Kit with dual flag setup",
  },
  {
    image: "/images/customer-photos/customer2.jpg",
    location: "Texas",
    title: "Front Yard Statement",
    description: "Ranger Battalion flag flies with Old Glory",
  },
  {
    image: "/images/customer-photos/customer3.jpg",
    location: "Florida",
    title: "Coastal Pride",
    description: "Withstands hurricane-force winds",
  },
  {
    image: "/images/customer-photos/customer4.jpg",
    location: "Georgia",
    title: "Lakeside Beauty",
    description: "Perfect addition to this stunning property",
  },
  {
    image: "/images/customer-photos/customer5.jpg",
    location: "Minnesota",
    title: "Backyard Sanctuary",
    description: "POW/MIA flag honors our heroes",
  },
]

export function RealHomesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % homes.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + homes.length) % homes.length)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A2740] to-[#0B1C2C] relative overflow-hidden">
      {/* Subtle stars background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#C8A55C] font-semibold text-sm uppercase tracking-wider mb-3">
            Real Homes, Real Patriots
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">See Phoenix in Action</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of proud Americans flying their flags with confidence
          </p>
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={homes[currentIndex].image || "/placeholder.svg"}
              alt={homes[currentIndex].title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-[#C8A55C] text-sm font-semibold mb-1">{homes[currentIndex].location}</p>
              <h3 className="text-2xl font-bold mb-2">{homes[currentIndex].title}</h3>
              <p className="text-white/90">{homes[currentIndex].description}</p>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {homes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-[#C8A55C] w-8" : "bg-white/30"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Bento Grid */}
        <div className="hidden md:grid grid-cols-12 grid-rows-2 gap-4 max-w-7xl mx-auto h-[600px]">
          {/* Large featured image - spans 2 rows */}
          <div className="col-span-6 row-span-2 relative rounded-2xl overflow-hidden group shadow-2xl hover:shadow-[0_0_40px_rgba(200,165,92,0.3)] transition-all duration-500">
            <Image
              src={homes[0].image || "/placeholder.svg"}
              alt={homes[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-[#C8A55C] text-sm font-semibold mb-2">{homes[0].location}</p>
              <h3 className="text-3xl font-bold mb-3">{homes[0].title}</h3>
              <p className="text-lg text-white/90">{homes[0].description}</p>
            </div>
          </div>

          {/* Top right - medium */}
          <div className="col-span-6 row-span-1 relative rounded-2xl overflow-hidden group shadow-xl hover:shadow-[0_0_30px_rgba(200,165,92,0.2)] transition-all duration-500">
            <Image
              src={homes[1].image || "/placeholder.svg"}
              alt={homes[1].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-[#C8A55C] text-xs font-semibold mb-1">{homes[1].location}</p>
              <h3 className="text-xl font-bold mb-1">{homes[1].title}</h3>
              <p className="text-sm text-white/90">{homes[1].description}</p>
            </div>
          </div>

          {/* Bottom right - three small cards */}
          <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden group shadow-xl hover:shadow-[0_0_30px_rgba(200,165,92,0.2)] transition-all duration-500">
            <Image
              src={homes[2].image || "/placeholder.svg"}
              alt={homes[2].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-[#C8A55C] text-xs font-semibold mb-1">{homes[2].location}</p>
              <h3 className="text-sm font-bold">{homes[2].title}</h3>
            </div>
          </div>

          <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden group shadow-xl hover:shadow-[0_0_30px_rgba(200,165,92,0.2)] transition-all duration-500">
            <Image
              src={homes[3].image || "/placeholder.svg"}
              alt={homes[3].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-[#C8A55C] text-xs font-semibold mb-1">{homes[3].location}</p>
              <h3 className="text-sm font-bold">{homes[3].title}</h3>
            </div>
          </div>

          <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden group shadow-xl hover:shadow-[0_0_30px_rgba(200,165,92,0.2)] transition-all duration-500">
            <Image
              src={homes[4].image || "/placeholder.svg"}
              alt={homes[4].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-[#C8A55C] text-xs font-semibold mb-1">{homes[4].location}</p>
              <h3 className="text-sm font-bold">{homes[4].title}</h3>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 text-sm mb-4">Join 50,000+ satisfied customers</p>
          <a
            href="#bestseller"
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#B8954C] text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get Your Phoenix Flagpole
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
