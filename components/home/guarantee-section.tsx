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
    <section className="py-12 md:py-16 lg:py-20 bg-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-4 font-bold text-[10px] md:text-xs tracking-widest uppercase">
            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
            OUR PROMISE TO YOU
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1C2C] mb-2 md:mb-3 px-2">
            Backed for Life. Risk-Free to Try.
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#666666] max-w-2xl mx-auto px-2">
            We stand behind every flagpole we sell with industry-leading guarantees.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-[#E5E3DF] hover:border-[#C8A55C]"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#B8954C] text-white mb-2 md:mb-4">
                {guarantee.icon}
              </div>
              <h3 className="text-xs md:text-base font-bold text-[#0B1C2C] mb-1 md:mb-2 leading-tight">
                {guarantee.title}
              </h3>
              <p className="text-[10px] md:text-sm text-[#666666] leading-snug">{guarantee.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0B1C2C] hover:bg-[#1A2F44] text-white font-bold text-base md:text-lg py-3 md:py-4 px-6 md:px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
          >
            Shop With Confidence
          </Link>
        </div>
      </div>
    </section>
  )
}
