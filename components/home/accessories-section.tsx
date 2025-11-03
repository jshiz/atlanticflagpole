import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

const accessories = [
  {
    name: "Solar Flagpole Light",
    price: "$39.99",
    description: "Respectfully illuminate your flag at night.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/solar-flagpole-light",
  },
  {
    name: "Eagle Topper",
    price: "$29.99",
    description: "A patriotic finishing touch.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/eagle-topper",
  },
  {
    name: "Flash Collar",
    price: "$19.99",
    description: "Clean, professional install appearance.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/flash-collar",
  },
  {
    name: "Engraved Nameplate",
    price: "$29.99",
    description: "Memorialize a veteran, father, or fallen hero.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/engraved-nameplate",
  },
]

export function AccessoriesSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#0B1C2C] text-white px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            COMPLETE YOUR DISPLAY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3">Upgrade Your Installation</h2>
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto">
            Purpose-built accessories designed to enhance your flagpole display.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {accessories.map((accessory, index) => (
            <Link
              key={index}
              href={accessory.href}
              className="group bg-[#F5F3EF] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#C8A55C]"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-2">{accessory.name}</h3>
                <p className="text-sm text-[#666666] mb-3 min-h-[40px]">{accessory.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0B1C2C]">{accessory.price}</span>
                  <div className="flex items-center gap-1 text-[#C8A55C] font-semibold text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/collections/accessories"
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-base py-3 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
          >
            Shop Accessories
          </Link>
        </div>
      </div>
    </section>
  )
}
