import type { StateCapitalData } from "@/lib/capitals/data"

interface LocalizedHookProps {
  stateData: StateCapitalData
}

export function LocalizedHook({ stateData }: LocalizedHookProps) {
  return (
    <section className="py-16 bg-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-6 text-center">
            A Flagpole Built to Handle {stateData.capital}'s Weather
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <p className="text-lg text-[#0B1C2C]/80 mb-6">
              {stateData.capital}, {stateData.state} experiences {stateData.climate.type}. Residents of{" "}
              {stateData.stateNickname} face unique weather challenges that demand a flagpole built to last.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#0B1C2C] mb-4">Weather Challenges:</h3>
                <ul className="space-y-2">
                  {stateData.climate.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span className="text-[#0B1C2C]/70">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#0B1C2C] mb-4">Phoenix Solutions:</h3>
                <ul className="space-y-2">
                  {stateData.climate.phoenixBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-[#0B1C2C]/70">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="text-center text-[#0B1C2C]/60 italic">
            The Phoenix Telescoping Flagpole is specifically engineered to withstand {stateData.capital}'s toughest
            conditions, giving you peace of mind and a lifetime of proud flag display.
          </p>
        </div>
      </div>
    </section>
  )
}
