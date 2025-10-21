"use client"

import { useEffect, useState } from "react"
import { Gift, TrendingUp, Clock, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpinWheelModal } from "./spin-wheel-modal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface RewardsClientProps {
  customerId: string
  email: string
}

interface RewardsData {
  totalPoints: number
  lifetimePoints: number
  canSpinToday: boolean
  lastSpinTime: string | null
  redemptions: any[]
  transactions: any[]
}

const REWARD_TIERS = [
  { points: 50, label: "5% Off", description: "Get 5% off your next order" },
  { points: 100, label: "$10 Off", description: "Get $10 off your next order" },
  { points: 250, label: "$20 Off", description: "Get $20 off your next order" },
  { points: 500, label: "10% Off", description: "Get 10% off your next order" },
]

export function RewardsClient({ customerId, email }: RewardsClientProps) {
  const [rewards, setRewards] = useState<RewardsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSpinWheel, setShowSpinWheel] = useState(false)
  const [claiming, setClaiming] = useState<number | null>(null)

  useEffect(() => {
    loadRewards()
  }, [])

  const loadRewards = async () => {
    try {
      const response = await fetch("/api/account/rewards")
      const data = await response.json()
      setRewards(data)
    } catch (error) {
      console.error("[v0] Error loading rewards:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSpinComplete = () => {
    setShowSpinWheel(false)
    loadRewards()
  }

  const handleClaimReward = async (points: number, tier: (typeof REWARD_TIERS)[0]) => {
    if (!rewards || rewards.totalPoints < points) return

    setClaiming(points)
    try {
      const response = await fetch("/api/account/rewards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points, tier }),
      })

      if (response.ok) {
        await loadRewards()
        alert(`Reward claimed! Your discount code has been generated.`)
      } else {
        alert("Failed to claim reward. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error claiming reward:", error)
      alert("Failed to claim reward. Please try again.")
    } finally {
      setClaiming(null)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-600">Loading rewards...</p>
      </div>
    )
  }

  const nextReward = REWARD_TIERS.find((tier) => tier.points > (rewards?.totalPoints || 0))
  const progressToNext = nextReward ? ((rewards?.totalPoints || 0) / nextReward.points) * 100 : 100

  return (
    <>
      {/* Points Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-afp-gold to-afp-gold-700 rounded-lg shadow-sm p-6 text-white">
          <Gift className="h-8 w-8 mb-3 opacity-90" />
          <p className="text-sm opacity-90 mb-1">Available Points</p>
          <p className="text-4xl font-bold">{rewards?.totalPoints || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <TrendingUp className="h-8 w-8 text-afp-gold mb-3" />
          <p className="text-sm text-gray-600 mb-1">Lifetime Points</p>
          <p className="text-4xl font-bold text-afp-navy">{rewards?.lifetimePoints || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Clock className="h-8 w-8 text-afp-gold mb-3" />
          <p className="text-sm text-gray-600 mb-1">Daily Spin</p>
          <Button
            onClick={() => setShowSpinWheel(true)}
            disabled={!rewards?.canSpinToday}
            className="mt-2 w-full bg-afp-gold hover:bg-afp-gold-700 text-white disabled:opacity-50"
          >
            {rewards?.canSpinToday ? "Spin Now!" : "Come Back Tomorrow"}
          </Button>
        </div>
      </div>

      {/* Progress to Next Reward */}
      {nextReward && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-afp-navy">Next Reward: {nextReward.label}</h3>
            <span className="text-sm text-gray-600">
              {rewards?.totalPoints || 0} / {nextReward.points} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-afp-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressToNext, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {nextReward.points - (rewards?.totalPoints || 0)} more points to unlock
          </p>
        </div>
      )}

      {/* Available Rewards */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-serif font-bold text-afp-navy mb-4">Available Rewards</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {REWARD_TIERS.map((tier) => {
            const canClaim = (rewards?.totalPoints || 0) >= tier.points
            const isClaiming = claiming === tier.points

            return (
              <div
                key={tier.points}
                className={`border-2 rounded-lg p-4 transition-all ${
                  canClaim ? "border-afp-gold bg-afp-ivory" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-lg text-afp-navy">{tier.label}</p>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>
                  <Ticket className={`h-6 w-6 ${canClaim ? "text-afp-gold" : "text-gray-400"}`} />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-gray-700">{tier.points} points</span>
                  <Button
                    onClick={() => handleClaimReward(tier.points, tier)}
                    disabled={!canClaim || isClaiming}
                    size="sm"
                    className="bg-afp-gold hover:bg-afp-gold-700 text-white disabled:opacity-50"
                  >
                    {isClaiming ? "Claiming..." : "Claim"}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Discount Codes */}
      {rewards?.redemptions && rewards.redemptions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-serif font-bold text-afp-navy mb-4">Your Discount Codes</h2>
          <div className="space-y-3">
            {rewards.redemptions
              .filter((r: any) => r.status === "active")
              .map((redemption: any) => (
                <div key={redemption.id} className="border border-afp-gold rounded-lg p-4 bg-afp-ivory">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-lg text-afp-navy">{redemption.discount_code}</p>
                      <p className="text-sm text-gray-600">
                        {redemption.discount_type === "percentage"
                          ? `${redemption.discount_value}% off`
                          : `$${redemption.discount_value} off`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Expires: {new Date(redemption.expires_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(redemption.discount_code)
                        alert("Code copied to clipboard!")
                      }}
                      variant="outline"
                      size="sm"
                      className="border-afp-gold text-afp-gold hover:bg-afp-gold hover:text-white"
                    >
                      Copy Code
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Points History */}
      <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm border border-gray-200">
        <AccordionItem value="history" className="border-none">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <h2 className="text-xl font-serif font-bold text-afp-navy">Points History</h2>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3">
              {rewards?.transactions && rewards.transactions.length > 0 ? (
                rewards.transactions.map((transaction: any) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-afp-navy">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-bold ${transaction.points > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.points > 0 ? "+" : ""}
                      {transaction.points}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">No transactions yet</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Spin Wheel Modal */}
      {showSpinWheel && <SpinWheelModal onClose={() => setShowSpinWheel(false)} onComplete={handleSpinComplete} />}
    </>
  )
}
