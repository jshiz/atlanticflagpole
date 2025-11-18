import Link from "next/link"
import type { Metadata } from "next"
import { BookOpen, Clock, Moon, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Flag Etiquette Guide | Atlantic Flagpole",
  description: "Official U.S. Flag Code rules and etiquette. Learn when and how to display the American flag properly.",
}

export default function FlagEtiquettePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Flag Etiquette Guide</h1>
            <p className="text-xl text-white/90">
              Respecting the Stars and Stripes: Essential rules from the U.S. Flag Code
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl border-2 border-[#0B1C2C]/10 shadow-lg">
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C8A55C]" />
                Display Times
              </h3>
              <p className="text-gray-700 mb-4">
                Traditionally, the flag should be displayed only from sunrise to sunset.
              </p>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <Moon className="w-5 h-5 text-[#0B1C2C] mt-1" />
                <p className="text-sm text-gray-600">
                  <strong>Exception:</strong> The flag may be displayed 24 hours a day if properly illuminated during the hours of darkness.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-[#0B1C2C]/10 shadow-lg">
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#E63946]" />
                Important Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Never let the flag touch the ground</li>
                <li>• Never use the flag as clothing or drapery</li>
                <li>• Never display a tattered or worn flag</li>
                <li>• Never use the flag for advertising</li>
                <li>• Never carry the flag flat or horizontally</li>
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Half-Staff Etiquette</h2>
              <p className="text-gray-700 mb-4">
                Flying the flag at half-staff is a sign of mourning or respect. This is done by order of the President or a state Governor.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#0B1C2C]">
                <h4 className="font-bold text-[#0B1C2C] mb-2">Proper Procedure</h4>
                <p className="text-gray-700">
                  When flying at half-staff, the flag should be hoisted to the peak for an instant and then lowered to the half-staff position. The flag should be again raised to the peak before it is lowered for the day.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Group Display</h2>
              <p className="text-gray-700 mb-4">
                When displayed with other flags (state, city, organizational), the U.S. flag should always be:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>At the peak (highest point)</li>
                <li>To the flag's own right (observer's left)</li>
                <li>Hoisted first and lowered last</li>
                <li>Larger or equal size to other flags (never smaller)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Retiring a Flag</h2>
              <p className="text-gray-700 mb-4">
                "The flag, when it is in such condition that it is no longer a fitting emblem for display, should be destroyed in a dignified way, preferably by burning."
              </p>
              <p className="text-gray-700">
                Many local organizations like the VFW, American Legion, and Boy Scouts collect worn flags and perform dignified retirement ceremonies.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
