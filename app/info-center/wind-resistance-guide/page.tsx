import Link from "next/link"
import type { Metadata } from "next"
import { Wind, ShieldCheck, Map } from 'lucide-react'

export const metadata: Metadata = {
  title: "Wind Resistance Guide | Atlantic Flagpole",
  description: "Understanding wind ratings for flagpoles. Learn why our Phoenix Flagpoles are rated for 100+ MPH winds.",
}

export default function WindGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Wind Resistance Guide</h1>
            <p className="text-xl text-white/90">
              Built to withstand the toughest weather conditions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-[#1F6FFF] mb-12">
            <div className="flex items-start gap-4">
              <Wind className="w-8 h-8 text-[#1F6FFF] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-[#0B1C2C] mb-2">The 100 MPH Standard</h2>
                <p className="text-gray-700 text-lg">
                  All Phoenix Telescoping Flagpoles are engineered to withstand wind speeds of up to 100 MPH when flying one 3'x5' flag.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-4">Why Wind Rating Matters</h3>
              <p className="text-gray-700 mb-4">
                Wind exerts tremendous force on a flagpole, especially when a flag is flying. The flag acts like a sail, catching the wind and transferring that energy to the pole.
              </p>
              <p className="text-gray-700">
                A higher wind rating means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
                <li>Thicker aluminum walls</li>
                <li>Stronger locking mechanisms</li>
                <li>Better structural integrity</li>
                <li>Peace of mind during storms</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
              {/* Placeholder for wind map image */}
              <div className="text-center">
                <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Wind Zone Map</p>
                <p className="text-xs text-gray-400">Check your local wind zone requirements</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-4">Factors Affecting Wind Load</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Flag Size", desc: "Larger flags catch more wind. Reduce flag size in high winds." },
                  { title: "Number of Flags", desc: "Flying two flags increases the load significantly." },
                  { title: "Wet Flags", desc: "Wet flags are heavier and don't fly as freely, increasing strain." },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                    <h4 className="font-bold text-[#0B1C2C] mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-4">Storm Preparation</h2>
              <div className="bg-[#0B1C2C] text-white p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-[#C8A55C] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">When a Storm is Approaching</h4>
                    <p className="text-white/80 mb-4">
                      While our poles are tough, we always recommend lowering the pole or removing the flag during:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                      <li>Hurricanes or tropical storms</li>
                      <li>Severe thunderstorms with high gusts</li>
                      <li>Blizzards or heavy icing events</li>
                    </ul>
                    <p className="text-white/80 mt-4 text-sm italic">
                      Tip: With a telescoping pole, you can lower it in seconds without tools!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
