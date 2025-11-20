"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Shield, Zap, Wind, AlertTriangle, HeartHandshake } from "lucide-react"
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
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white z-[9999] max-h-[90vh] overflow-y-auto">
        <div className="relative h-24 sm:h-28 bg-[#0B1C2C] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/phoenix-flagpole-gold.png" alt="" fill className="object-contain scale-150 blur-sm" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2C]/70 via-[#0B1C2C]/85 to-[#0B1C2C]"></div>

          <div className="relative z-10 text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#C8A55C] mb-1">Protect Your Investment</h2>
            <p className="text-gray-300 text-xs sm:text-sm">Complete peace of mind with premium coverage</p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Comparison */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#0B1C2C] mb-3">What's Covered</h3>
              <ComparisonRow icon={<Shield className="w-4 h-4" />} label="Manufacturing Defects" premium={true} />
              <ComparisonRow icon={<Wind className="w-4 h-4" />} label="Storm & Wind Damage" premium={true} />
              <ComparisonRow icon={<AlertTriangle className="w-4 h-4" />} label="Accidental Damage" premium={true} />
              <ComparisonRow icon={<Zap className="w-4 h-4" />} label="Theft Protection" premium={true} />
              <ComparisonRow icon={<HeartHandshake className="w-4 h-4" />} label="24/7 Support" premium={true} />
            </div>

            {/* Plans */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#0B1C2C] mb-3">Choose Your Plan</h3>

              <div
                className={cn(
                  "border-2 rounded-lg p-3 cursor-pointer transition-all",
                  selectedPlan === "monthly"
                    ? "border-[#C8A55C] bg-[#C8A55C]/5"
                    : "border-gray-200 hover:border-[#C8A55C]/30",
                )}
                onClick={() => setSelectedPlan("monthly")}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm">Monthly Plan</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#0B1C2C] mt-1">
                      $14.99<span className="text-xs text-gray-500">/mo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Cancel anytime</p>
                  </div>
                  {selectedPlan === "monthly" && <Check className="w-5 h-5 text-[#C8A55C]" />}
                </div>
              </div>

              <div
                className={cn(
                  "border-2 rounded-lg p-3 cursor-pointer transition-all relative",
                  selectedPlan === "2year"
                    ? "border-[#C8A55C] bg-[#C8A55C]/5"
                    : "border-gray-200 hover:border-[#C8A55C]/30",
                )}
                onClick={() => setSelectedPlan("2year")}
              >
                <div className="absolute -top-2 left-3 bg-[#C8A55C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  BEST VALUE
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm">2-Year Premium</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#0B1C2C] mt-1">
                      $299<span className="text-xs text-gray-500">/once</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Save $60 vs monthly</p>
                  </div>
                  {selectedPlan === "2year" && <Check className="w-5 h-5 text-[#C8A55C]" />}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full bg-[#C8A55C] hover:bg-[#B69446] text-white font-bold py-4 text-sm sm:text-base"
                  onClick={() => onAddPlan(selectedPlan)}
                >
                  Add Protection Plan
                </Button>
                <button className="w-full text-xs text-gray-400 hover:text-gray-600 mt-2" onClick={onClose}>
                  No thanks, continue without protection
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ComparisonRow({ icon, label, premium }: { icon: React.ReactNode; label: string; premium: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs py-2 border-b border-gray-100 last:border-0">
      <span className="text-[#C8A55C]">{icon}</span>
      <span className="font-medium text-gray-700 flex-1">{label}</span>
      {premium && <Check className="w-4 h-4 text-green-500" />}
    </div>
  )
}
