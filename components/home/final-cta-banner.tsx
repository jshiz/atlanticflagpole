import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTABanner() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] relative overflow-hidden">
      {/* Background Pattern */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Flag Deserves Better Than a Cheap Pole.
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-10 font-light">
            The Last Flagpole You'll Ever Need. Guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-xl py-5 px-10 rounded-md transition-all shadow-2xl hover:shadow-3xl hover:scale-105 duration-300"
            >
              Shop Phoenix Flagpole Kits Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#C8A55C]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#C8A55C]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#C8A55C]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>365-Day Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#C8A55C]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Made in USA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
