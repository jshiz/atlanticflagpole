import Link from "next/link"
import type { Metadata } from "next"
import { Flag, Sun, Wind, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: "Flag Care & Maintenance | Atlantic Flagpole",
  description: "Learn how to clean, repair, and maintain your American flag and flagpole to ensure they last for years.",
}

export default function FlagCarePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Flag Care & Maintenance</h1>
            <p className="text-xl text-white/90">
              Tips to keep your flag flying proudly and looking its best
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Sun, title: "Sun Exposure", desc: "UV rays can fade colors over time. Rotate flags if possible." },
              { icon: Wind, title: "Wind Damage", desc: "High winds cause fraying. Take down in extreme weather." },
              { icon: Droplets, title: "Cleaning", desc: "Most outdoor flags can be hand washed with mild soap." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                  <div className="bg-[#0B1C2C] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <h3 className="font-bold text-[#0B1C2C] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Cleaning Your Flag</h2>
              <p className="text-gray-700 mb-4">
                Outdoor flags can get dirty from pollution, dust, and dirt. Regular cleaning can extend the life of your flag.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Nylon/Polyester:</strong> Hand wash with warm water and mild soap. Rinse thoroughly and air dry. Do not let the flag sit in wash water as colors may bleed.</li>
                <li><strong>Cotton:</strong> Handle with care. Dry cleaning is often recommended for cotton flags to prevent shrinking and bleeding.</li>
                <li><strong>Drying:</strong> Always hang the flag to dry completely before storing or re-flying. Never fold a damp flag.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Repairing Your Flag</h2>
              <p className="text-gray-700 mb-4">
                Inspect your flag regularly for signs of wear, especially at the "fly end" (the end furthest from the pole).
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-[#0B1C2C] mb-2">The "Fly End" Hem</h4>
                <p className="text-gray-700">
                  This is usually the first place to show wear. If you catch fraying early, you can trim the frayed threads and re-hem the end. This will shorten the flag slightly but can significantly extend its life.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Flagpole Maintenance</h2>
              <p className="text-gray-700 mb-4">
                Your Phoenix Flagpole is designed to be low-maintenance, but a little care goes a long way.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Cleaning:</strong> Wipe down the aluminum pole with a damp cloth to remove dirt and salt buildup.</li>
                <li><strong>Lubrication:</strong> The telescoping mechanism generally doesn't require lubrication. If it feels sticky, clean it with water. Avoid oil-based lubricants which can attract dirt.</li>
                <li><strong>Hardware:</strong> Check clips and swivels periodically for wear and replace if necessary.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
