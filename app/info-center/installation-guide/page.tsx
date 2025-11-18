import Link from "next/link"
import type { Metadata } from "next"
import { Wrench, CheckCircle2, AlertTriangle, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: "Flagpole Installation Guide | Atlantic Flagpole",
  description: "Step-by-step instructions for installing your Phoenix telescoping flagpole. DIY-friendly guide with diagrams and tips.",
}

export default function InstallationGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0A2740] to-[#0B1C2C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/info-center" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2">
              ← Back to Info Center
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Installation Guide</h1>
            <p className="text-xl text-white/90">
              Complete step-by-step instructions for installing your Phoenix Flagpole
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-12 rounded-r-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">Before You Dig</h3>
                <p className="text-yellow-700">
                  Always call 811 or your local utility notification center before digging. This free service will mark underground utility lines to keep you safe and prevent service interruptions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#C8A55C]" />
                Tools Needed
              </h3>
              <ul className="space-y-3">
                {[
                  "Post hole digger or shovel",
                  "Tape measure",
                  "Level",
                  "Wheelbarrow or mixing tub",
                  "Water hose",
                  "Pea gravel (approx. 2-3 bags)",
                  "Concrete mix (approx. 4-6 bags)",
                ].map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0B1C2C] text-white p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-[#C8A55C]" />
                Download Instructions
              </h3>
              <p className="text-white/80 mb-6">
                Get the official PDF installation manual for offline reference.
              </p>
              <button className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold py-3 rounded-lg transition-colors">
                Download PDF Manual
              </button>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Step 1: Site Preparation</h2>
              <p className="text-gray-700 mb-4">
                Choose a location that is clear of trees, power lines, and other obstructions. Ensure the ground is level and has good drainage.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-[#0B1C2C] mb-2">Hole Dimensions</h4>
                <p className="text-gray-700">
                  Dig a hole approximately 24-30 inches deep and 18-24 inches wide. The exact depth depends on your specific flagpole model and local frost line.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Step 2: Prepare the Ground Sleeve</h2>
              <p className="text-gray-700 mb-4">
                Place about 4-6 inches of pea gravel in the bottom of the hole. This allows for drainage and prevents water from pooling around the base of the pole.
              </p>
              <p className="text-gray-700">
                Insert the provided stop bolt through the ground sleeve and secure it with the nut. Place the sleeve in the center of the hole.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Step 3: Concrete & Leveling</h2>
              <p className="text-gray-700 mb-4">
                Mix your concrete according to the package instructions. Pour the concrete around the ground sleeve, being careful not to get any inside the sleeve itself.
              </p>
              <p className="text-gray-700">
                Use a level to ensure the sleeve is perfectly vertical. This is critical - if the sleeve is crooked, your flagpole will be crooked!
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0B1C2C] mb-6 border-b pb-2">Step 4: Curing & Finishing</h2>
              <p className="text-gray-700 mb-4">
                Allow the concrete to cure for at least 24-48 hours before installing the flagpole. Once cured, you can cover the top of the concrete with soil or decorative stone.
              </p>
              <p className="text-gray-700">
                Slide your Phoenix Flagpole into the sleeve, and you're ready to raise the flag!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
