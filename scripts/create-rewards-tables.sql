-- Create rewards points table
CREATE TABLE IF NOT EXISTS customer_rewards (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  total_points INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rewards transactions table
CREATE TABLE IF NOT EXISTS rewards_transactions (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(255) NOT NULL,
  points INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- 'earn', 'redeem', 'spin_wheel', 'order_purchase'
  description TEXT,
  order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create spin wheel history table
CREATE TABLE IF NOT EXISTS spin_wheel_history (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(255) NOT NULL,
  points_won INTEGER NOT NULL,
  spun_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create rewards redemptions table
CREATE TABLE IF NOT EXISTS rewards_redemptions (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(255) NOT NULL,
  points_redeemed INTEGER NOT NULL,
  discount_code VARCHAR(100) UNIQUE NOT NULL,
  discount_type VARCHAR(50) NOT NULL, -- 'percentage', 'fixed_amount'
  discount_value DECIMAL(10, 2) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  used_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active' -- 'active', 'used', 'expired'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customer_rewards_customer_id ON customer_rewards(customer_id);
CREATE INDEX IF NOT EXISTS idx_rewards_transactions_customer_id ON rewards_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_spin_wheel_customer_id ON spin_wheel_history(customer_id);
CREATE INDEX IF NOT EXISTS idx_rewards_redemptions_customer_id ON rewards_redemptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_rewards_redemptions_code ON rewards_redemptions(discount_code);
