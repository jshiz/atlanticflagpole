import Image from "next/image"
import { Quote } from "lucide-react"

const spotlights = [
  {
    image: "/images/customer-photos/customer2.jpg",
    name: "Michael R.",
    location: "Fort Worth, TX",
    quote: "After serving 20 years in the Army, I wanted a flagpole that matched my pride. Phoenix delivered.",
    product: "15ft Premier Kit",
  },
  {
    image: "/images/customer-photos/customer5.jpg",
    name: "Sarah J.",
    location: "Minneapolis, MN",
    quote: "The POW/MIA flag flies beautifully. Quality that honors those who served.",
    product: "20ft Premier Kit",
  },
  {
    image: "/images/customer-photos/customer3.jpg",
    name: "David L.",
    location: "Naples, FL",
    quote: "Survived Hurricane Ian without a scratch. This pole is built to last.",
    product: "25ft Premier Kit",
  },
]

export function CustomerSpotlightCards() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3">What Patriots Are Saying</h2>
          <p className="text-lg text-[#666666]">Real customers, real stories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {spotlights.map((customer, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#F5F3EF] to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#E5E3DF]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={customer.image || "/placeholder.svg"}
                  alt={`${customer.name}'s home`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-[#C8A55C] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Verified Purchase
                </div>
              </div>
              <div className="p-6">
                <Quote className="w-8 h-8 text-[#C8A55C] mb-3" />
                <p className="text-[#0B1C2C] text-base leading-relaxed mb-4 italic">"{customer.quote}"</p>
                <div className="border-t border-[#E5E3DF] pt-4">
                  <p className="font-bold text-[#0B1C2C]">{customer.name}</p>
                  <p className="text-sm text-[#666666]">{customer.location}</p>
                  <p className="text-xs text-[#C8A55C] font-semibold mt-1">{customer.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
