import { Shield, Award, RotateCcw, Clock } from 'lucide-react'

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#C8A55C]/10 flex items-center justify-center">
          <Clock className="w-6 h-6 text-[#C8A55C]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0B1C2C]">FAST SHIPPING</p>
          <p className="text-xs text-[#0B1C2C]/60">Ships in 1-2 days</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#C8A55C]/10 flex items-center justify-center">
          <RotateCcw className="w-6 h-6 text-[#C8A55C]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0B1C2C]">MONEY-BACK</p>
          <p className="text-xs text-[#0B1C2C]/60">GUARANTEE</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#C8A55C]/10 flex items-center justify-center">
          <Shield className="w-6 h-6 text-[#C8A55C]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0B1C2C]">SECURED</p>
          <p className="text-xs text-[#0B1C2C]/60">PAYMENT</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#C8A55C]/10 flex items-center justify-center">
          <Award className="w-6 h-6 text-[#C8A55C]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0B1C2C]">LIFETIME</p>
          <p className="text-xs text-[#0B1C2C]/60">WARRANTY</p>
        </div>
      </div>
    </div>
  )
}
