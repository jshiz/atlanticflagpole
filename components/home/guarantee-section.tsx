import { Shield, RotateCcw, Award, Truck, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

const guarantees = [
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "365-Day Home Trial",
    description: "Not satisfied? Return within a year for full refund.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Lifetime Structural Warranty",
    description: "If it breaks, we replace it. No questions asked.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "BBB A+ Rated",
    description: "Accredited business with highest rating.",
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Fast, Insured Shipping",
    description: "Ships in 1-2 business days. Fully insured.",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "USA-Made, USA-Supported",
    description: "Manufactured and supported right here in America.",
  },
]

export function GuaranteeSection() {
  return (
    <section className="py-16 md:py-20 bg-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            <CheckCircle className="w-4 h-4" />
            OUR PROMISE TO YOU
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3">Backed for Life. Risk-Free to Try.</h2>
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto">
            We stand behind every flagpole we sell with industry-leading guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-[#E5E3DF] hover:border-[#C8A55C]"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#B8954C] text-white mb-4">
                {guarantee.icon}
              </div>
              <h3 className="text-base font-bold text-[#0B1C2C] mb-2">{guarantee.title}</h3>
              <p className="text-sm text-[#666666]">{guarantee.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0B1C2C] hover:bg-[#1A2F44] text-white font-bold text-lg py-4 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
          >
            Shop With Confidence
          </Link>
        </div>
      </div>
    </section>
  )
}
