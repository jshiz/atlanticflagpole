import { Shield, Wrench, Wind, Award, Zap, Globe } from "lucide-react"

export function WhyPhoenix() {
  const features = [
    {
      icon: Zap,
      title: "No Ropes, No Noise",
      description: "Rope-free telescoping design means no tangling, no freezing, and no loud clanging in the wind.",
    },
    {
      icon: Shield,
      title: "Forti-Armor™ Secur-Lok™ System",
      description:
        "Fully internal, invisible locking components forged from high-strength polymer make it nearly impossible to disengage.",
    },
    {
      icon: Award,
      title: "American Forged Military Grade Aluminum",
      description:
        "100% rust-proof, corrosion-proof aerospace aluminum ensures unmatched strength and lifetime beauty.",
    },
    {
      icon: Wrench,
      title: "Easy DIY Installation",
      description: "Simple ground sleeve installation. No concrete needed for most models. Set up in minutes.",
    },
    {
      icon: Wind,
      title: "360° No-Tangle Swivel",
      description: "Your flag will never wrap or tangle, flying freely 24/7 in any wind condition.",
    },
    {
      icon: Globe,
      title: "Made in the USA",
      description: "Proudly manufactured in America with premium materials and superior craftsmanship.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-12 text-center">
            Why Choose the Phoenix?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-lg bg-[#C8A55C]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">{feature.title}</h3>
                <p className="text-[#0B1C2C]/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
