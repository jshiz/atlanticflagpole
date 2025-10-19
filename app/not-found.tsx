import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-[#0B1C2C] mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-4">Page Not Found</h2>
          <p className="text-lg text-[#0B1C2C]/70 mb-8">
            Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#0B1C2C] hover:bg-[#0B1C2C]/90">
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#0B1C2C] text-[#0B1C2C] hover:bg-[#0B1C2C]/10 bg-transparent"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#0B1C2C]/10">
          <p className="text-sm text-[#0B1C2C]/60 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/flagpole-finder" className="text-sm text-[#C8A55C] hover:underline">
              Flagpole Finder
            </Link>
            <span className="text-[#0B1C2C]/30">•</span>
            <Link href="/contact" className="text-sm text-[#C8A55C] hover:underline">
              Contact Us
            </Link>
            <span className="text-[#0B1C2C]/30">•</span>
            <Link href="/faq" className="text-sm text-[#C8A55C] hover:underline">
              FAQ
            </Link>
            <span className="text-[#0B1C2C]/30">•</span>
            <Link href="/installation" className="text-sm text-[#C8A55C] hover:underline">
              Installation Guide
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
