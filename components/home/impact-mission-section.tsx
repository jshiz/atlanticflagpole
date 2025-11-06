import { Check, Heart, Globe } from "lucide-react"

export function ImpactMissionSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#F5F3EF] to-white py-24 overflow-hidden">
      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#0B1C2C] mb-8 leading-tight">
            Fly Your Flag.
            <br />
            Feed a Family.
            <br />
            Free a Warrior.
          </h2>
          <p className="text-xl md:text-2xl text-[#0B1C2C]/80 max-w-4xl mx-auto leading-relaxed">
            When you invest in a <span className="font-bold text-[#0B1C2C]">Phoenix Flagpole</span>, you're not just
            buying the last flagpole you'll ever need — you're making a difference.
          </p>
        </div>

        {/* Three Impact Columns */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Meals Donated */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#0B1C2C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Check className="w-10 h-10 text-white stroke-[3]" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-4">10 Meals Donated</h3>
            <p className="text-lg text-[#0B1C2C]/70 leading-relaxed">to families in need through every purchase</p>
          </div>

          {/* Column 2: K9s For Warriors */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#0B1C2C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-4">
              Supporting
              <br />
              K9s For Warriors
            </h3>
            <p className="text-lg text-[#0B1C2C]/70 leading-relaxed">— pairing rescue dogs with veterans</p>
          </div>

          {/* Column 3: Operation Underground Railroad */}
          <div className="text-center group">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#0B1C2C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-white stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1C2C] mb-4">
              Backing Operation
              <br />
              Underground Railroad
            </h3>
            <p className="text-lg text-[#0B1C2C]/70 leading-relaxed">— fighting child trafficking around the globe</p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-[#0B1C2C] mb-2 flex items-center justify-center gap-3">
            <span className="text-3xl">🇺🇸</span>
            <span className="italic font-serif">Every order helps restore lives.</span>
          </p>
          <p className="text-xl md:text-2xl text-[#0B1C2C] italic font-serif">
            Every flagpole helps raise more than a flag.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C8A55C]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C8A55C]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  )
}
