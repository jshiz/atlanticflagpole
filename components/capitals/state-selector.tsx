"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin } from "lucide-react"
import { getAllStateCapitals } from "@/lib/capitals/data"

export function StateSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const allStates = getAllStateCapitals()

  const filteredStates = allStates.filter(
    (state) =>
      state.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.stateCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by state or capital city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 focus:border-[#C8A55C] focus:outline-none text-lg"
          />
        </div>
      </div>

      {/* State Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStates.map((state) => (
          <Link
            key={state.stateCode}
            href={`/capitals/${state.stateCode.toLowerCase()}`}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-[#0B1C2C] hover:to-[#1a2f42] border-2 border-gray-200 hover:border-[#C8A55C] rounded-lg p-6 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#C8A55C]/10 group-hover:bg-[#C8A55C]/20 flex items-center justify-center mb-3 transition-colors">
                <MapPin className="w-6 h-6 text-[#C8A55C]" />
              </div>
              <div className="text-2xl font-bold text-[#0B1C2C] group-hover:text-white mb-1 transition-colors">
                {state.stateCode}
              </div>
              <div className="text-sm font-semibold text-[#0B1C2C] group-hover:text-white mb-1 transition-colors">
                {state.state}
              </div>
              <div className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">{state.capital}</div>
            </div>
          </Link>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No states found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}
