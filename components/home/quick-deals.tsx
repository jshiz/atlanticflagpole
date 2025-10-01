import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Clock, TrendingUp } from "lucide-react"

interface Deal {
  id: string
  title: string
  description: string
  originalPrice: number
  salePrice: number
  image: string
  badge: string
  link: string
}

const deals: Deal[] = [
  {
    id: "1",
    title: "Presidential Package",
    description: "25ft Flagpole + 4x6 Flag + Solar Light + Eagle Topper",
    originalPrice: 699,
    salePrice: 399,
    image: "/presidential-flagpole-package.jpg",
    badge: "43% OFF",
    link: "/products/presidential-package",
  },
  {
    id: "2",
    title: "Patriot Bundle",
    description: "20ft Flagpole + 3x5 Flag + LED Light",
    originalPrice: 499,
    salePrice: 299,
    image: "/patriot-flagpole-bundle.jpg",
    badge: "40% OFF",
    link: "/products/patriot-bundle",
  },
  {
    id: "3",
    title: "Starter Kit",
    description: "20ft Flagpole + 3x5 American Flag",
    originalPrice: 399,
    salePrice: 249,
    image: "/starter-flagpole-kit.jpg",
    badge: "38% OFF",
    link: "/products/starter-kit",
  },
]

export function QuickDeals() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-[#C8A55C]" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C]">Quick Deals</h2>
            </div>
            <p className="text-lg text-[#0B1C2C]/70">Limited time offers on our most popular bundles</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-red-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Ends Soon</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const savings = deal.originalPrice - deal.salePrice
            const savingsPercent = Math.round((savings / deal.originalPrice) * 100)

            return (
              <Card key={deal.id} className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-lg px-3 py-1">
                    {deal.badge}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">{deal.title}</h3>
                  <p className="text-sm text-[#0B1C2C]/70 mb-4">{deal.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[#C8A55C]">${deal.salePrice}</span>
                    <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800 font-semibold">Save ${savings} Today!</p>
                  </div>

                  <Button asChild className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-semibold">
                    <Link href={deal.link}>View Deal</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg" className="font-semibold bg-transparent">
            <Link href="/bundle-builder">Build Your Own Bundle →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
