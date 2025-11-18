import Link from "next/link"
import type { Metadata } from "next"
import { Shield, Check, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: "Lifetime Warranty Information | Atlantic Flagpole",
  description: "Details about our industry-leading lifetime warranty on Phoenix Flagpoles. We stand behind our American-made quality forever.",
}

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Lifetime Warranty</h1>
            <p className="text-xl text-white/90">
              Our promise to you: Quality that lasts a lifetime.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0B1C2C] text-white rounded-2xl p-8 md:p-12 mb-12 text-center">
            <Shield className="w-16 h-16 text-[#C8A55C] mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">The Phoenix Guarantee</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We warrant that every Phoenix Flagpole will be free from defects in material and workmanship for the lifetime of the original purchaser.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-6">What's Covered</h3>
              <ul className="space-y-4">
                {[
                  "Telescoping mechanism failure",
                  "Locking system defects",
                  "Corrosion or rust on aluminum parts",
                  "Wind damage (when properly installed)",
                  "Manufacturing defects",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0B1C2C] mb-6">What's Not Covered</h3>
              <ul className="space-y-4">
                {[
                  "Damage from improper installation",
                  "Flags and ornaments (wear items)",
                  "Damage from misuse or abuse",
                  "Modifications to the pole",
                  "Acts of God (lightning, earthquakes, etc.)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="bg-red-100 p-1 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C8A55C]" />
              How to File a Claim
            </h3>
            <p className="text-gray-700 mb-4">
              If you experience an issue with your Phoenix Flagpole, we're here to help.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4 mb-6">
              <li>Contact our support team at support@atlanticflagpole.com</li>
              <li>Provide your original order number and photos of the issue</li>
              <li>We will troubleshoot the problem and send replacement parts if needed</li>
            </ol>
            <Link href="/contact" className="inline-block bg-[#0B1C2C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2d3f] transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
