import { Wrench, Flag, Wind, Award } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Installs in ~30 Minutes",
    description: "Minimal tools. No special equipment needed.",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: <Flag className="w-8 h-8" />,
    title: "American Forged Military Grade Aerospace Aluminum",
    description: "Unmatched strength, no rattles, no rust.",
    color: "from-red-600 to-red-700",
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Wind-Tested to 100 MPH",
    description: "Stands tall through serious storms.",
    color: "from-gray-600 to-gray-700",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Lifetime Structural Warranty",
    description: "One flagpole. For life.",
    color: "from-[#C8A55C] to-[#B8954C]",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3">Not All Flagpoles Are Created Equal.</h2>
          <p className="text-base md:text-lg text-[#666666] max-w-3xl mx-auto">
            The Phoenix Premier Kit is built from the same material trusted in aerospace — and engineered for everyday
            patriots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-[#E5E3DF] hover:border-[#C8A55C]"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} text-white mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0B1C2C] mb-2 leading-tight">{feature.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-8 max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="/images/features/easy-installation.jpg"
              alt="Install in as little as 30 minutes"
              width={1200}
              height={400}
              className="w-full h-auto"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/features/easy-to-use.jpg"
                alt="Easy to use with Securi-LOK system"
                width={600}
                height={500}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/features/many-uses.jpg"
                alt="Many uses - Ground, Porch, Hitch, Side, Wheel, Business"
                width={600}
                height={500}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#bestseller"
            className="inline-flex items-center gap-2 text-[#C8A55C] hover:text-[#B8954C] font-semibold text-base transition-colors"
          >
            See the Difference
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
