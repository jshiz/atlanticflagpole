import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle2, Home, Flag, Ruler, DollarSign, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Flagpole Buying Guide | Atlantic Flagpole Info Center",
  description:
    "Expert advice on choosing the perfect flagpole. Learn about heights, materials, installation types, and features to find the ideal flagpole for your home or business.",
}

export default function FlagpoleBuyingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Flagpole Buying Guide</h1>
            <p className="text-xl text-white/90">
              Everything you need to know to choose the perfect flagpole for your home or business
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Decision Factors */}
          <div className="bg-gradient-to-br from-[#1F6FFF]/10 to-[#C8A55C]/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6">Key Decision Factors</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Home, title: "Location Type", desc: "Residential, commercial, or government" },
                { icon: Ruler, title: "Height Needed", desc: "15ft to 40ft+ options available" },
                { icon: Flag, title: "Flag Size", desc: "Proper proportions for your pole" },
                { icon: DollarSign, title: "Budget", desc: "Quality options at every price point" },
              ].map((factor) => {
                const Icon = factor.icon
                return (
                  <div key={factor.title} className="flex items-start gap-4">
                    <div className="bg-[#1F6FFF] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1C2C] mb-1">{factor.title}</h3>
                      <p className="text-gray-600 text-sm">{factor.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Height Selection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B1C2C] mb-6">Choosing the Right Height</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Flagpole height is one of the most important decisions. Consider your property size, local regulations,
              and visibility needs.
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#1F6FFF] pl-6 py-2">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">15-20 Feet (Residential)</h3>
                <p className="text-gray-700 mb-3">
                  Perfect for standard residential properties, front yards, and suburban homes. Visible from the street
                  without overwhelming your landscape.
                </p>
                <ul className="space-y-2">
                  {[
                    "Ideal for lots up to 1/4 acre",
                    "Flies 3x5 ft flags beautifully",
                    "Easy DIY installation",
                    "Most HOA-friendly height",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#1F6FFF] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-[#C8A55C] pl-6 py-2">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">
                  20-25 Feet (Large Residential/Small Commercial)
                </h3>
                <p className="text-gray-700 mb-3">
                  Great for larger properties, corner lots, or small businesses. Provides excellent visibility while
                  maintaining residential appeal.
                </p>
                <ul className="space-y-2">
                  {[
                    "Perfect for 1/4 to 1/2 acre properties",
                    "Flies 4x6 ft or 5x8 ft flags",
                    "Visible from greater distances",
                    "Professional appearance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-[#E63946] pl-6 py-2">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">25-40+ Feet (Commercial/Government)</h3>
                <p className="text-gray-700 mb-3">
                  Designed for commercial properties, government buildings, and large estates. Maximum visibility and
                  impressive presence.
                </p>
                <ul className="space-y-2">
                  {[
                    "Ideal for commercial properties",
                    "Flies 6x10 ft to 8x12 ft flags",
                    "Visible from highways and long distances",
                    "Professional installation recommended",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Material Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B1C2C] mb-6">Material Comparison</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-4">Aluminum (Recommended)</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Lightweight and durable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Rust-resistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Low maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Best value for residential use</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Our Phoenix flagpoles use premium marine-grade aluminum for maximum durability and longevity.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-4">Fiberglass</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Extremely flexible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Ideal for high-wind areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Corrosion-proof</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Great for coastal areas</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Best for extreme weather conditions and areas with salt air exposure.
                </p>
              </div>
            </div>
          </section>

          {/* Installation Types */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B1C2C] mb-6">Installation Types</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border-2 border-[#1F6FFF]">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">In-Ground (Most Popular)</h3>
                <p className="text-gray-700 mb-4">
                  The most common and stable installation method. Uses a ground sleeve set in concrete for permanent,
                  secure mounting.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#0B1C2C] mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Maximum stability</li>
                      <li>• Clean, professional look</li>
                      <li>• Removable for storage</li>
                      <li>• Best wind resistance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1C2C] mb-2">Best For:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Permanent installations</li>
                      <li>• Front yards and lawns</li>
                      <li>• Commercial properties</li>
                      <li>• Maximum flag display</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">Wall Mount</h3>
                <p className="text-gray-700 mb-4">
                  Attaches directly to exterior walls, perfect for homes without yard space or for displaying flags near
                  entryways.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#0B1C2C] mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• No ground work needed</li>
                      <li>• Space-efficient</li>
                      <li>• Easy installation</li>
                      <li>• Great for townhomes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1C2C] mb-2">Best For:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Limited yard space</li>
                      <li>• Porch displays</li>
                      <li>• Apartment/condo living</li>
                      <li>• Decorative flags</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Phoenix Advantage */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#C8A55C] w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">The Phoenix Advantage</h2>
                  <p className="text-white/90">Why thousands choose Phoenix telescoping flagpoles</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Lifetime Warranty",
                    desc: "Forever guarantee on all components",
                  },
                  {
                    title: "Made in USA",
                    desc: "Premium American craftsmanship",
                  },
                  {
                    title: "Easy Installation",
                    desc: "DIY-friendly with included instructions",
                  },
                  {
                    title: "100 MPH Wind Rating",
                    desc: "Engineered for extreme weather",
                  },
                  {
                    title: "No Tangling",
                    desc: "Patented Securi-LOK™ system",
                  },
                  {
                    title: "365-Day Trial",
                    desc: "Full year to test at home",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/80">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#C8A55C] to-[#B8954C] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Perfect Flagpole?</h2>
            <p className="text-lg mb-6 text-white/90">
              Use our interactive Flagpole Finder to get personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/flagpole-finder"
                className="bg-white text-[#0B1C2C] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Flagpole Finder
              </Link>
              <Link
                href="/products"
                className="bg-[#0A2740] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0B1C2C] transition-colors shadow-lg"
              >
                Browse All Flagpoles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
