import { Award, Users, MapPin, Heart } from "lucide-react"

export const dynamic = "force-dynamic"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">About Atlantic Flagpole</h1>
          <p className="text-lg text-[#0B1C2C]/70">America's trusted source for premium flagpoles since 1985</p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src="/american-flag-waving-on-flagpole-against-blue-sky.jpg"
              alt="Atlantic Flagpole"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-6">Our Story</h2>
              <div className="space-y-4 text-[#0B1C2C]/70 text-lg leading-relaxed">
                <p>
                  For over 35 years, Atlantic Flagpole has been dedicated to providing the highest quality flagpoles and
                  flags to homes, businesses, and institutions across America. What started as a small family business
                  has grown into one of the nation's leading flagpole suppliers, but our commitment to quality and
                  customer service remains unchanged.
                </p>
                <p>
                  We believe that flying the American flag is more than just a tradition—it's a powerful expression of
                  pride, patriotism, and unity. That's why we're committed to providing products that honor this
                  tradition with exceptional quality and durability.
                </p>
                <p>
                  Every flagpole we sell is carefully selected and tested to meet our rigorous standards. We work
                  directly with manufacturers to ensure that each product represents the best value and quality
                  available. Our team of experts is always available to help you choose the perfect flagpole for your
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">35+ Years</h3>
            <p className="text-[#0B1C2C]/70">Of excellence in the flagpole industry</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">50,000+</h3>
            <p className="text-[#0B1C2C]/70">Satisfied customers nationwide</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">All 50 States</h3>
            <p className="text-[#0B1C2C]/70">Shipping to every corner of America</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Family Owned</h3>
            <p className="text-[#0B1C2C]/70">Proudly American, family operated</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 md:p-12 shadow-md">
          <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-6">Our Values</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">Quality First</h3>
              <p className="text-[#0B1C2C]/70">
                We never compromise on quality. Every product we sell is rigorously tested and backed by
                industry-leading warranties.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">Customer Service Excellence</h3>
              <p className="text-[#0B1C2C]/70">
                Our knowledgeable team is here to help you every step of the way, from selection to installation and
                beyond.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">American Pride</h3>
              <p className="text-[#0B1C2C]/70">
                We're proud to support American traditions and values by providing products that help you display your
                patriotism with pride.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">Fair Pricing</h3>
              <p className="text-[#0B1C2C]/70">
                We believe everyone should have access to quality flagpoles at fair prices. That's why we offer
                competitive pricing and frequent promotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
