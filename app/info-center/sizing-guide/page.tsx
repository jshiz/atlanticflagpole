import Link from "next/link"
import type { Metadata } from "next"
import { Ruler, Home, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: "Flagpole Sizing Guide | Atlantic Flagpole",
  description: "How to choose the right size flagpole and flag for your property. Visual guides and recommendations.",
}

export default function SizingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Sizing Guide</h1>
            <p className="text-xl text-white/90">
              Find the perfect proportions for your home or business
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#0B1C2C] mb-8 text-center">Flagpole Height Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border-2 border-[#C8A55C]/30 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#C8A55C]/10 p-3 rounded-full">
                    <Home className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1C2C]">Residential</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  For most single and two-story homes, the goal is to have the pole clear the roofline but not dwarf the house.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">1-Story House</span>
                    <span className="text-[#0B1C2C] font-bold">15' - 20' Pole</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">2-Story House</span>
                    <span className="text-[#0B1C2C] font-bold">20' - 25' Pole</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Large Estate</span>
                    <span className="text-[#0B1C2C] font-bold">25' - 30' Pole</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-[#0B1C2C]/10 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#0B1C2C]/10 p-3 rounded-full">
                    <Building2 className="w-6 h-6 text-[#0B1C2C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1C2C]">Commercial</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Commercial buildings often require taller poles for visibility from roads and parking lots.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Small Business</span>
                    <span className="text-[#0B1C2C] font-bold">25' - 30' Pole</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Office Park</span>
                    <span className="text-[#0B1C2C] font-bold">30' - 40' Pole</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Landmark/Govt</span>
                    <span className="text-[#0B1C2C] font-bold">40'+ Pole</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1C2C] mb-8 text-center">Flag Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0B1C2C] text-white">
                    <th className="p-4 text-left rounded-tl-lg">Pole Height</th>
                    <th className="p-4 text-left">Recommended Flag Size</th>
                    <th className="p-4 text-left rounded-tr-lg">Max Flag Size</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">15 Feet</td>
                    <td className="p-4">3' x 5'</td>
                    <td className="p-4">3' x 5'</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">20 Feet</td>
                    <td className="p-4">3' x 5'</td>
                    <td className="p-4">4' x 6'</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">25 Feet</td>
                    <td className="p-4">4' x 6'</td>
                    <td className="p-4">5' x 8'</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">30 Feet</td>
                    <td className="p-4">5' x 8'</td>
                    <td className="p-4">6' x 10'</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">40 Feet</td>
                    <td className="p-4">6' x 10'</td>
                    <td className="p-4">8' x 12'</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              *Note: In high wind areas, we recommend using the "Recommended" size rather than the "Max" size to reduce load on the pole.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
