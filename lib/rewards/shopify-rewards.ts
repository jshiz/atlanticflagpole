import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export interface CustomerRewards {
  customerId: string
  email: string
  totalPoints: number
  lifetimePoints: number
  lastSpinDate: string | null
  transactions: RewardsTransaction[]
  redemptions: RewardsRedemption[]
}

export interface RewardsTransaction {
  id: string
  points: number
  type: string
  description: string
  orderId?: string
  date: string
}

export interface RewardsRedemption {
  id: string
  pointsRedeemed: number
  discountCode: string
  discountType: string
  discountValue: number
  expiresAt: string
  claimedAt: string
  status: string
}

const METAFIELD_NAMESPACE = "rewards"

// Get customer rewards from Shopify metafields
export async function getCustomerRewards(customerId: string, email: string): Promise<CustomerRewards> {
  const query = `
    query getCustomerMetafields($id: ID!) {
      customer(id: $id) {
        metafields(first: 10, namespace: "${METAFIELD_NAMESPACE}") {
          edges {
            node {
              key
              value
            }
          }
        }
      }
    }
  `

  const response = await shopifyAdminFetch({
    query,
    variables: { id: customerId },
  })

  const metafields = response.data?.customer?.metafields?.edges || []
  const metafieldMap: Record<string, any> = {}

  metafields.forEach((edge: any) => {
    const key = edge.node.key
    const value = edge.node.value
    try {
      metafieldMap[key] = JSON.parse(value)
    } catch {
      metafieldMap[key] = value
    }
  })

  return {
    customerId,
    email,
    totalPoints: metafieldMap.total_points || 0,
    lifetimePoints: metafieldMap.lifetime_points || 0,
    lastSpinDate: metafieldMap.last_spin_date || null,
    transactions: metafieldMap.transactions || [],
    redemptions: metafieldMap.redemptions || [],
  }
}

// Update customer metafield
async function updateCustomerMetafield(customerId: string, key: string, value: any) {
  const mutation = `
    mutation updateCustomerMetafield($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const input = {
    id: customerId,
    metafields: [
      {
        namespace: METAFIELD_NAMESPACE,
        key,
        value: JSON.stringify(value),
        type: "json",
      },
    ],
  }

  return await shopifyAdminFetch({ query: mutation, variables: { input } })
}

// Add points to customer account
export async function addPoints(
  customerId: string,
  email: string,
  points: number,
  transactionType: string,
  description: string,
  orderId?: string,
): Promise<void> {
  const rewards = await getCustomerRewards(customerId, email)

  const newTransaction: RewardsTransaction = {
    id: Date.now().toString(),
    points,
    type: transactionType,
    description,
    orderId,
    date: new Date().toISOString(),
  }

  const updatedTransactions = [newTransaction, ...rewards.transactions].slice(0, 50) // Keep last 50

  await updateCustomerMetafield(customerId, "total_points", rewards.totalPoints + points)
  await updateCustomerMetafield(customerId, "lifetime_points", rewards.lifetimePoints + points)
  await updateCustomerMetafield(customerId, "transactions", updatedTransactions)
}

// Deduct points from customer account
export async function deductPoints(
  customerId: string,
  email: string,
  points: number,
  description: string,
): Promise<boolean> {
  const rewards = await getCustomerRewards(customerId, email)

  if (rewards.totalPoints < points) {
    return false
  }

  const newTransaction: RewardsTransaction = {
    id: Date.now().toString(),
    points: -points,
    type: "redeem",
    description,
    date: new Date().toISOString(),
  }

  const updatedTransactions = [newTransaction, ...rewards.transactions].slice(0, 50)

  await updateCustomerMetafield(customerId, "total_points", rewards.totalPoints - points)
  await updateCustomerMetafield(customerId, "transactions", updatedTransactions)

  return true
}

// Check if customer can spin wheel today
export async function canSpinWheelToday(customerId: string, email: string): Promise<boolean> {
  const rewards = await getCustomerRewards(customerId, email)

  if (!rewards.lastSpinDate) {
    return true
  }

  const lastSpin = new Date(rewards.lastSpinDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  lastSpin.setHours(0, 0, 0, 0)

  return lastSpin < today
}

// Record spin wheel result
export async function recordSpinWheel(customerId: string, email: string, pointsWon: number): Promise<void> {
  await updateCustomerMetafield(customerId, "last_spin_date", new Date().toISOString())
  await addPoints(customerId, email, pointsWon, "spin_wheel", `Won ${pointsWon} points from daily spin`)
}

// Get last spin time
export async function getLastSpinTime(customerId: string, email: string): Promise<Date | null> {
  const rewards = await getCustomerRewards(customerId, email)
  return rewards.lastSpinDate ? new Date(rewards.lastSpinDate) : null
}

// Create redemption
export async function createRedemption(
  customerId: string,
  email: string,
  pointsRedeemed: number,
  discountCode: string,
  discountType: string,
  discountValue: number,
): Promise<RewardsRedemption> {
  const rewards = await getCustomerRewards(customerId, email)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  const redemption: RewardsRedemption = {
    id: Date.now().toString(),
    pointsRedeemed,
    discountCode,
    discountType,
    discountValue,
    expiresAt: expiresAt.toISOString(),
    claimedAt: new Date().toISOString(),
    status: "active",
  }

  const updatedRedemptions = [redemption, ...rewards.redemptions].slice(0, 20)
  await updateCustomerMetafield(customerId, "redemptions", updatedRedemptions)

  return redemption
}
