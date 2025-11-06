import Image from "next/image"
import { Check, Heart, Globe, Users, Shield } from "lucide-react"

export function ImpactMissionSection() {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#F5F3EF] to-white py-32 overflow-hidden opacity-100">
      {/* Subtle USA Flag Background */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <Image src="/images/design-mode/american-flag-background-14774885226da.jpg" alt="" fill className="object-cover" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Hero Section with Heart Flag */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Image
                src="/images/heart-flag-icon.webp"
                alt="American Heart Flag"
                width={120}
                height={120}
                className="drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-[#C8A55C]/20 blur-3xl rounded-full scale-150" />
            </div>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#0B1C2C] mb-8 leading-tight">
            Fly Your Flag.
            <br />
            Feed a Family.
            <br />
            Free a Warrior.
          </h2>
          <p className="text-xl md:text-2xl text-[#0B1C2C]/80 max-w-4xl mx-auto leading-relaxed">
            When you invest in a <span className="font-bold text-[#0B1C2C]">Phoenix Flagpole</span>, you're not just
            buying the last flagpole you'll ever need. You're joining a movement that transforms lives across America.
          </p>
        </div>

        {/* Staggered Impact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Meals Donated - Elevated */}
          <div className="md:transform md:-translate-y-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#C8A55C]/20 hover:border-[#C8A55C] transition-all duration-300 hover:shadow-[#C8A55C]/20 hover:-translate-y-2 group">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Check className="w-8 h-8 text-white stroke-[3]" />
                </div>
              </div>
              <div className="mb-4">
                <div className="text-5xl font-bold text-[#C8A55C] mb-2">10</div>
                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-3">Meals Donated</h3>
              </div>
              <p className="text-base text-[#0B1C2C]/70 leading-relaxed mb-4">
                Every Phoenix Flagpole purchased provides 10 nutritious meals to families facing food insecurity across
                America. Together, we've donated over <span className="font-bold text-[#0B1C2C]">330,000 meals</span>{" "}
                and counting.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#C8A55C] font-semibold">
                <Users className="w-4 h-4" />
                <span>33,000+ families helped</span>
              </div>
            </div>
          </div>

          {/* Card 2: K9s For Warriors - Center */}
          <div>
            <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] rounded-2xl shadow-2xl p-8 border-2 border-[#C8A55C] hover:shadow-[#C8A55C]/30 transition-all duration-300 hover:-translate-y-2 group">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-[#C8A55C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-3">Supporting K9s For Warriors</h3>
              </div>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                We proudly partner with K9s For Warriors to pair rescue dogs with military veterans suffering from PTSD,
                traumatic brain injury, and military sexual trauma. These service dogs provide life-saving companionship
                and support.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#C8A55C] font-semibold">
                <Shield className="w-4 h-4" />
                <span>Healing heroes, one paw at a time</span>
              </div>
            </div>
          </div>

          {/* Card 3: Operation Underground Railroad - Elevated */}
          <div className="md:transform md:-translate-y-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#C8A55C]/20 hover:border-[#C8A55C] transition-all duration-300 hover:shadow-[#C8A55C]/20 hover:-translate-y-2 group">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0B1C2C] to-[#1A2F44] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Globe className="w-8 h-8 text-white stroke-[2.5]" />
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#0B1C2C] mb-3">Backing Operation Underground Railroad</h3>
              </div>
              <p className="text-base text-[#0B1C2C]/70 leading-relaxed mb-4">
                A portion of every sale supports Operation Underground Railroad in their mission to rescue children from
                sex trafficking and exploitation worldwide. Your purchase helps fund rescue operations and survivor
                rehabilitation programs.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#C8A55C] font-semibold">
                <Shield className="w-4 h-4" />
                <span>Protecting the innocent globally</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Impact Statement with Heart Flag */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#0B1C2C] via-[#1A2F44] to-[#0B1C2C] rounded-3xl p-12 shadow-2xl border-2 border-[#C8A55C]">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image
                src="/images/heart-flag-icon.webp"
                alt="American Heart"
                width={48}
                height={48}
                className="drop-shadow-lg"
              />
              <div className="h-12 w-px bg-[#C8A55C]" />
              <p className="text-2xl md:text-3xl text-white font-serif italic">Every order helps restore lives.</p>
            </div>
            <p className="text-2xl md:text-3xl text-white font-serif italic mb-6">
              Every flagpole helps raise more than a flag.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-[#C8A55C]/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C8A55C] mb-1">330K+</div>
                <div className="text-sm text-white/70">Meals Donated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C8A55C] mb-1">100+</div>
                <div className="text-sm text-white/70">Veterans Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C8A55C] mb-1">$50K+</div>
                <div className="text-sm text-white/70">Donated to O.U.R.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gold Accents */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#C8A55C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#C8A55C]/10 rounded-full blur-3xl" />
    </section>
  )
}
