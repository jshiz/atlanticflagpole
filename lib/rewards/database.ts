import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface CustomerRewards {
  id: number
  customer_id: string
  email: string
  total_points: number
  lifetime_points: number
  created_at: Date
  updated_at: Date
}

export interface RewardsTransaction {
  id: number
  customer_id: string
  points: number
  transaction_type: string
  description: string
  order_id?: string
  created_at: Date
}

export interface SpinWheelHistory {
  id: number
  customer_id: string
  points_won: number
  spun_at: Date
}

export interface RewardsRedemption {
  id: number
  customer_id: string
  points_redeemed: number
  discount_code: string
  discount_type: string
  discount_value: number
  expires_at: Date
  claimed_at: Date
  used_at?: Date
  status: string
}

// Get or create customer rewards account
export async function getOrCreateCustomerRewards(customerId: string, email: string): Promise<CustomerRewards> {
  const existing = await sql`
    SELECT * FROM customer_rewards WHERE customer_id = ${customerId}
  `

  if (existing.length > 0) {
    return existing[0] as CustomerRewards
  }

  const newRewards = await sql`
    INSERT INTO customer_rewards (customer_id, email, total_points, lifetime_points)
    VALUES (${customerId}, ${email}, 0, 0)
    RETURNING *
  `

  return newRewards[0] as CustomerRewards
}

// Add points to customer account
export async function addPoints(
  customerId: string,
  points: number,
  transactionType: string,
  description: string,
  orderId?: string,
): Promise<void> {
  await sql`
    UPDATE customer_rewards
    SET total_points = total_points + ${points},
        lifetime_points = lifetime_points + ${points},
        updated_at = CURRENT_TIMESTAMP
    WHERE customer_id = ${customerId}
  `

  await sql`
    INSERT INTO rewards_transactions (customer_id, points, transaction_type, description, order_id)
    VALUES (${customerId}, ${points}, ${transactionType}, ${description}, ${orderId})
  `
}

// Deduct points from customer account
export async function deductPoints(customerId: string, points: number, description: string): Promise<boolean> {
  const customer = await sql`
    SELECT total_points FROM customer_rewards WHERE customer_id = ${customerId}
  `

  if (customer.length === 0 || customer[0].total_points < points) {
    return false
  }

  await sql`
    UPDATE customer_rewards
    SET total_points = total_points - ${points},
        updated_at = CURRENT_TIMESTAMP
    WHERE customer_id = ${customerId}
  `

  await sql`
    INSERT INTO rewards_transactions (customer_id, points, transaction_type, description)
    VALUES (${customerId}, ${-points}, 'redeem', ${description})
  `

  return true
}

// Check if customer can spin wheel today
export async function canSpinWheelToday(customerId: string): Promise<boolean> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const spins = await sql`
    SELECT * FROM spin_wheel_history
    WHERE customer_id = ${customerId}
    AND spun_at >= ${today.toISOString()}
  `

  return spins.length === 0
}

// Record spin wheel result
export async function recordSpinWheel(customerId: string, pointsWon: number): Promise<void> {
  await sql`
    INSERT INTO spin_wheel_history (customer_id, points_won)
    VALUES (${customerId}, ${pointsWon})
  `

  await addPoints(customerId, pointsWon, "spin_wheel", `Won ${pointsWon} points from daily spin`)
}

// Get last spin time
export async function getLastSpinTime(customerId: string): Promise<Date | null> {
  const result = await sql`
    SELECT spun_at FROM spin_wheel_history
    WHERE customer_id = ${customerId}
    ORDER BY spun_at DESC
    LIMIT 1
  `

  return result.length > 0 ? new Date(result[0].spun_at) : null
}

// Create redemption
export async function createRedemption(
  customerId: string,
  pointsRedeemed: number,
  discountCode: string,
  discountType: string,
  discountValue: number,
): Promise<RewardsRedemption> {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30) // 30 days expiration

  const redemption = await sql`
    INSERT INTO rewards_redemptions (
      customer_id, points_redeemed, discount_code, discount_type, discount_value, expires_at
    )
    VALUES (
      ${customerId}, ${pointsRedeemed}, ${discountCode}, ${discountType}, ${discountValue}, ${expiresAt.toISOString()}
    )
    RETURNING *
  `

  return redemption[0] as RewardsRedemption
}

// Get customer redemptions
export async function getCustomerRedemptions(customerId: string): Promise<RewardsRedemption[]> {
  const redemptions = await sql`
    SELECT * FROM rewards_redemptions
    WHERE customer_id = ${customerId}
    ORDER BY claimed_at DESC
  `

  return redemptions as RewardsRedemption[]
}

// Get rewards transactions
export async function getRewardsTransactions(customerId: string, limit = 20): Promise<RewardsTransaction[]> {
  const transactions = await sql`
    SELECT * FROM rewards_transactions
    WHERE customer_id = ${customerId}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `

  return transactions as RewardsTransaction[]
}
