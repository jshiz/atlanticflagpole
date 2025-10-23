// Stub file for deployment compatibility
// Rewards system has been removed in favor of Shopify native features

export async function getCustomerRewards(customerId: string) {
  return { points: 0, tier: "none" }
}

export async function canSpinWheelToday(customerId: string) {
  return false
}

export async function getLastSpinTime(customerId: string) {
  return null
}

export async function deductPoints(customerId: string, points: number) {
  return false
}

export async function createRedemption(customerId: string, points: number, reward: string) {
  return null
}

export async function recordSpinWheel(customerId: string) {
  return false
}
