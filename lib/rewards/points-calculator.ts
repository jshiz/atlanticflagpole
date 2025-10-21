// Calculate points earned from order amount
export function calculatePointsFromOrder(orderAmount: number): number {
  // $1 spent = 1 point
  return Math.floor(orderAmount)
}

// Reward tiers and their requirements
export const REWARD_TIERS = [
  {
    points: 50,
    type: "percentage" as const,
    value: 5,
    label: "5% Off",
    description: "Get 5% off your next order",
  },
  {
    points: 100,
    type: "fixed_amount" as const,
    value: 10,
    label: "$10 Off",
    description: "Get $10 off your next order",
  },
  {
    points: 250,
    type: "fixed_amount" as const,
    value: 20,
    label: "$20 Off",
    description: "Get $20 off your next order",
  },
  {
    points: 500,
    type: "percentage" as const,
    value: 10,
    label: "10% Off",
    description: "Get 10% off your next order",
  },
]

// Spin wheel possible outcomes (weighted)
export const SPIN_WHEEL_OUTCOMES = [
  { points: 1, weight: 50 }, // 50% chance
  { points: 1, weight: 25 }, // 25% chance
  { points: 2, weight: 15 }, // 15% chance
  { points: 5, weight: 8 }, // 8% chance
  { points: 10, weight: 2 }, // 2% chance
]

export function getRandomSpinResult(): number {
  const totalWeight = SPIN_WHEEL_OUTCOMES.reduce((sum, outcome) => sum + outcome.weight, 0)
  let random = Math.random() * totalWeight

  for (const outcome of SPIN_WHEEL_OUTCOMES) {
    random -= outcome.weight
    if (random <= 0) {
      return outcome.points
    }
  }

  return 1 // Fallback
}

// Generate unique discount code
export function generateDiscountCode(): string {
  const prefix = "AFP"
  const random = Math.random().toString(36).substring(2, 10).toUpperCase()
  return `${prefix}${random}`
}
