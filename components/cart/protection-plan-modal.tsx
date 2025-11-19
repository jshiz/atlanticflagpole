"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, X, Shield, Zap, Wind, AlertTriangle, HeartHandshake } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProtectionPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPlan: (planType: "monthly" | "2year") => void
}

export function ProtectionPlanModal({ isOpen, onClose, onAddPlan }: ProtectionPlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "2year">("2year")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white z-[9999] max-h-fit">
        <div className="relative h-32 bg-[#0B1C2C] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30">
            <Image 
              src="/images/phoenix-flagpole-gold.png" 
              alt="" 
              fill 
              className="object-contain scale-150 blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2C]/70 via-[#0B1C2C]/85 to-[#0B1C2C]"></div>
          
          <div className="relative z-10 text-center px-4">
            <h2 className="text-3xl font-serif text-[#C8A55C] mb-2">Protect Your Investment</h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto">Complete peace of mind with our Premium Protection Plan</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Comparison */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 mb-3">Coverage Comparison</h3>
              <ComparisonRow icon={<Shield className="w-3.5 h-3.5" />} label="Manufacturing" standard={true} premium={true} />
              <ComparisonRow icon={<Wind className="w-3.5 h-3.5" />} label="Storm & Wind" standard={false} premium={true} />
              <ComparisonRow icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Accidental" standard={false} premium={true} />
              <ComparisonRow icon={<Zap className="w-3.5 h-3.5" />} label="Theft" standard={false} premium={true} />
              <ComparisonRow icon={<HeartHandshake className="w-3.5 h-3.5" />} label="24/7 Support" standard={false} premium={true} />
            </div>

            {/* Right: Plans */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 mb-3">Choose Your Plan</h3>
              
              <div 
                className={cn(
                  "border-2 rounded-lg p-3 cursor-pointer transition-all",
                  selectedPlan === "monthly" ? "border-[#C8A55C] bg-[#C8A55C]/5" : "border-gray-200 hover:border-[#C8A55C]/30"
                )}
                onClick={() => setSelectedPlan("monthly")}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm">Monthly Plan</div>
                    <div className="text-2xl font-bold text-[#0B1C2C] mt-1">$14.99<span className="text-xs text-gray-500">/mo</span></div>
                    <p className="text-xs text-gray-500 mt-1">Cancel anytime</p>
                  </div>
                  {selectedPlan === "monthly" && <Check className="w-5 h-5 text-[#C8A55C]" />}
                </div>
              </div>

              <div 
                className={cn(
                  "border-2 rounded-lg p-3 cursor-pointer transition-all relative",
                  selectedPlan === "2year" ? "border-[#C8A55C] bg-[#C8A55C]/5" : "border-gray-200 hover:border-[#C8A55C]/30"
                )}
                onClick={() => setSelectedPlan("2year")}
              >
                <div className="absolute -top-2 left-3 bg-[#C8A55C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  BEST VALUE
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm">2-Year Premium</div>
                    <div className="text-2xl font-bold text-[#0B1C2C] mt-1">$299<span className="text-xs text-gray-500">/once</span></div>
                    <p className="text-xs text-gray-500 mt-1">Save $60 vs monthly</p>
                  </div>
                  {selectedPlan === "2year" && <Check className="w-5 h-5 text-[#C8A55C]" />}
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full bg-[#C8A55C] hover:bg-[#B69446] text-white font-bold py-5 text-base"
                  onClick={() => onAddPlan(selectedPlan)}
                >
                  Add Protection Plan
                </Button>
                <button 
                  className="w-full text-xs text-gray-400 hover:text-gray-600 mt-2 underline"
                  onClick={onClose}
                >
                  No thanks, I'll risk it
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ComparisonRow({ icon, label, standard, premium }: { icon: React.ReactNode, label: string, standard: boolean, premium: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-gray-400">{icon}</span>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-16 text-center">
          {standard ? <Check className="w-3.5 h-3.5 text-green-500 mx-auto" /> : <X className="w-3.5 h-3.5 text-gray-300 mx-auto" />}
        </div>
        <div className="w-16 text-center bg-[#C8A55C]/10 rounded py-1">
          {premium && <Check className="w-3.5 h-3.5 text-[#C8A55C] mx-auto" />}
        </div>
      </div>
    </div>
  )
}
