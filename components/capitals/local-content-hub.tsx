import { Book, MapPin, Flag } from "lucide-react"
import type { StateCapitalData } from "@/lib/capitals/data"

interface LocalContentHubProps {
  stateData: StateCapitalData
}

export function LocalContentHub({ stateData }: LocalContentHubProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-12 text-center">
            Your Guide to Flagpoles in {stateData.capital}, {stateData.state}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Flag Etiquette */}
            <div className="bg-[#F5F3EF] rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-[#C8A55C]/10 flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-[#C8A55C]" />
              </div>
              <h3 className="font-semibold text-[#0B1C2C] mb-3">Flag Etiquette</h3>
              <p className="text-sm text-[#0B1C2C]/70">
                A quick guide on proper flag etiquette for {stateData.stateNickname} residents. Display your flag with
                pride and respect, following U.S. Flag Code guidelines for raising, lowering, and caring for your
                American flag.
              </p>
            </div>

            {/* Local Installation */}
            <div className="bg-[#F5F3EF] rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-[#C8A55C]/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#C8A55C]" />
              </div>
              <h3 className="font-semibold text-[#0B1C2C] mb-3">Local Installation</h3>
              <p className="text-sm text-[#0B1C2C]/70">
                What to know about installing a flagpole in {stateData.countyName}. Before installation, check with your
                local HOA or municipal guidelines. Most residential areas welcome flagpoles, and our ground sleeve
                system makes installation simple.
              </p>
            </div>

            {/* Best Flag for State */}
            <div className="bg-[#F5F3EF] rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-[#C8A55C]/10 flex items-center justify-center mb-4">
                <Flag className="w-6 h-6 text-[#C8A55C]" />
              </div>
              <h3 className="font-semibold text-[#0B1C2C] mb-3">Best Flag for {stateData.state}</h3>
              <p className="text-sm text-[#0B1C2C]/70">
                We recommend our durable nylon American flag with embroidered stars, which flies beautifully in a light
                breeze but is tough enough for {stateData.state}'s weather. Available in multiple sizes to match your
                flagpole height.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
