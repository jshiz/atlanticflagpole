import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-serif font-bold text-[#0B1C2C] mb-4">Product Not Found</h1>
          <p className="text-lg text-[#0B1C2C]/70 mb-8">
            Sorry, we couldn't find the product you're looking for. It may have been discontinued or is temporarily
            unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#0B1C2C] hover:bg-[#0B1C2C]/90">
            <Link href="/products">Browse All Products</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#0B1C2C] text-[#0B1C2C] hover:bg-[#0B1C2C]/10 bg-transparent"
          >
            <Link href="/flagpole-finder">Use Flagpole Finder</Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#0B1C2C]/10">
          <p className="text-sm text-[#0B1C2C]/60 mb-4">Need help finding the right flagpole?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="text-sm text-[#C8A55C] hover:underline">
              Contact Our Team
            </Link>
            <span className="text-[#0B1C2C]/30">•</span>
            <Link href="/faq" className="text-sm text-[#C8A55C] hover:underline">
              View FAQ
            </Link>
            <span className="text-[#0B1C2C]/30">•</span>
            <Link href="/" className="text-sm text-[#C8A55C] hover:underline">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
