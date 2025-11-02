import { Shield, Award, Clock, MapPin } from "lucide-react"

export function TrustBar() {
  const trustItems = [
    {
      icon: MapPin,
      title: "Made in the USA",
      description: "American craftsmanship",
    },
    {
      icon: Shield,
      title: "100 MPH Wind Guarantee",
      description: "Engineered for strength",
    },
    {
      icon: Award,
      title: "Exclusive Forever Warranty",
      description: "Lifetime protection",
    },
    {
      icon: Clock,
      title: "365-Day Home Trial",
      description: "Risk-free guarantee",
    },
  ]

  return (
    <section className="py-8 bg-white border-y border-[#0B1C2C]/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-[#C8A55C]" />
              </div>
              <h3 className="font-semibold text-[#0B1C2C] mb-1">{item.title}</h3>
              <p className="text-sm text-[#0B1C2C]/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
