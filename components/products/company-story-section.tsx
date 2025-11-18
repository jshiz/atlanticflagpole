import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Shield, Users, Award, Heart } from 'lucide-react'

export function CompanyStorySection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Story */}
          <div className="space-y-6 text-white">
            <div className="inline-block px-4 py-2 bg-[#C8A55C] rounded-full text-sm font-bold mb-4">
              Family & Veteran Owned
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Why Choose Atlantic Flagpole</h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Founded by veterans who understand the importance of displaying the flag with pride, Atlantic Flagpole is
              a family-owned business dedicated to creating the finest flagpoles in America. Every product we make
              reflects our commitment to quality, durability, and the values that make our country great.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              We don't just sell flagpoles—we provide a symbol of freedom, patriotism, and pride. Our team of craftsmen
              uses military-grade materials and aerospace engineering to create flagpoles that will stand tall for
              generations. When you choose Atlantic Flagpole, you're supporting American manufacturing and veteran-owned
              businesses.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
                <Shield className="w-10 h-10 text-[#C8A55C] mb-3" />
                <h3 className="font-bold text-xl mb-2 text-white">Veteran Owned</h3>
                <p className="text-sm text-white/80">Founded and operated by those who served</p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
                <Users className="w-10 h-10 text-[#C8A55C] mb-3" />
                <h3 className="font-bold text-xl mb-2 text-white">Family Business</h3>
                <p className="text-sm text-white/80">Three generations of American craftsmanship</p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
                <Award className="w-10 h-10 text-[#C8A55C] mb-3" />
                <h3 className="font-bold text-xl mb-2 text-white">Made in USA</h3>
                <p className="text-sm text-white/80">100% American materials and manufacturing</p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
                <Heart className="w-10 h-10 text-[#C8A55C] mb-3" />
                <h3 className="font-bold text-xl mb-2 text-white">Customer First</h3>
                <p className="text-sm text-white/80">Lifetime support and satisfaction guarantee</p>
              </Card>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#C8A55C]/20">
              <Image
                src="/american-veteran-family.jpg"
                alt="Atlantic Flagpole - Family & Veteran Owned"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#C8A55C] text-white p-6 rounded-xl shadow-2xl border-2 border-white/20">
              <p className="text-4xl font-bold mb-1">50,000+</p>
              <p className="text-sm font-semibold">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
