"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, X, Shield, Zap, Wind, AlertTriangle, HeartHandshake, ShieldCheck } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ProtectionPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPlan: (planType: "monthly" | "2year") => void
}

export function ProtectionPlanModal({ isOpen, onClose, onAddPlan }: ProtectionPlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "2year">("2year")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white z-[9999] max-h-[85vh] overflow-y-auto">
        <div className="bg-[#0B1C2C] py-6 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/images/hero-flagpole.jpg')] bg-cover bg-center"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0B1C2C]/80 to-[#0B1C2C]"></div>
          
          <DialogHeader className="relative z-10 space-y-3">
            <div className="flex justify-center">
              <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-sm border border-white/20 shadow-lg shadow-[#C8A55C]/20">
                <ShieldCheck className="w-7 h-7 text-green-400 fill-green-400/20" />
              </div>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-serif text-[#C8A55C] leading-tight">
              Protect Your Investment
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Don't let the unexpected ruin your display. Upgrade to our Premium Protection Plan for complete peace of mind.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="mb-4 border rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-[55%_22.5%_22.5%] bg-gray-50 border-b">
              <div className="p-2 text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">Coverage</div>
              <div className="p-2 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-l flex items-center justify-center leading-tight">Standard<br className="hidden sm:block" /> Warranty</div>
              <div className="p-2 text-[10px] sm:text-xs font-bold text-[#C8A55C] uppercase tracking-wider text-center border-l bg-[#C8A55C]/10 flex items-center justify-center leading-tight">Premium<br className="hidden sm:block" /> Plan</div>
            </div>

            <ComparisonRow 
              icon={<Shield className="w-4 h-4" />}
              label="Manufacturing Defects"
              standard={true}
              premium={true}
            />
            <ComparisonRow 
              icon={<Wind className="w-4 h-4" />}
              label="Storm & Wind Damage"
              standard={false}
              premium={true}
            />
            <ComparisonRow 
              icon={<AlertTriangle className="w-4 h-4" />}
              label="Accidental Damage"
              standard={false}
              premium={true}
            />
            <ComparisonRow 
              icon={<Zap className="w-4 h-4" />}
              label="Theft Protection"
              standard={false}
              premium={true}
            />
            <ComparisonRow 
              icon={<HeartHandshake className="w-4 h-4" />}
              label="24/7 Priority Support"
              standard={false}
              premium={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div 
              className={cn(
                "border-2 rounded-xl p-3 cursor-pointer transition-all relative hover:border-[#C8A55C]/50",
                selectedPlan === "monthly" ? "border-[#C8A55C] bg-[#C8A55C]/5" : "border-gray-200"
              )}
              onClick={() => setSelectedPlan("monthly")}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-gray-900">Monthly Plan</span>
                {selectedPlan === "monthly" && <div className="w-4 h-4 rounded-full bg-[#C8A55C] flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
              </div>
              <div className="text-xl font-bold text-[#0B1C2C]">$14.99<span className="text-xs font-normal text-gray-500">/mo</span></div>
              <p className="text-xs text-gray-500 mt-1">Pay as you go. Cancel anytime.</p>
            </div>

            <div 
              className={cn(
                "border-2 rounded-xl p-3 cursor-pointer transition-all relative hover:border-[#C8A55C]/50",
                selectedPlan === "2year" ? "border-[#C8A55C] bg-[#C8A55C]/5" : "border-gray-200"
              )}
              onClick={() => setSelectedPlan("2year")}
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#C8A55C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Best Value
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-gray-900">2-Year Premium</span>
                {selectedPlan === "2year" && <div className="w-4 h-4 rounded-full bg-[#C8A55C] flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
              </div>
              <div className="text-xl font-bold text-[#0B1C2C]">$299<span className="text-xs font-normal text-gray-500">/one-time</span></div>
              <p className="text-xs text-gray-500 mt-1">Save $60 compared to monthly.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <img src="/images/phoenix-flagpole-gold.png" alt="Phoenix Protection" className="w-8 h-8 object-contain" />
              <span className="font-semibold">Phoenix Protection</span>
            </div>
            <Button 
              className="w-full bg-[#C8A55C] hover:bg-[#B69446] text-white font-bold py-5 text-base shadow-lg shadow-[#C8A55C]/20"
              onClick={() => onAddPlan(selectedPlan)}
            >
              Add Protection Plan
            </Button>
            <button 
              className="text-xs text-gray-400 hover:text-gray-600 underline decoration-dotted"
              onClick={onClose}
            >
              No thanks, I'll risk it
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ComparisonRow({ icon, label, standard, premium }: { icon: React.ReactNode, label: string, standard: boolean, premium: boolean }) {
  return (
    <div className="grid grid-cols-[55%_22.5%_22.5%] border-b last:border-0 hover:bg-gray-50 transition-colors group">
      <div className="p-2 text-sm font-medium text-gray-700 flex items-center gap-2 border-r">
        <span className="text-gray-400 group-hover:text-[#C8A55C] transition-colors shrink-0">{icon}</span>
        <span className="leading-tight">{label}</span>
      </div>
      <div className="p-2 flex justify-center items-center border-r">
        {standard ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-gray-300/50" />}
      </div>
      <div className="p-2 flex justify-center items-center bg-[#C8A55C]/5 group-hover:bg-[#C8A55C]/10 transition-colors">
        {premium ? <Check className="w-4 h-4 text-[#C8A55C] fill-[#C8A55C]/20" /> : <X className="w-4 h-4 text-gray-300" />}
      </div>
    </div>
  )
}
