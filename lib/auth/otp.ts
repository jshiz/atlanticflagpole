// OTP management utilities
interface OTPData {
  code: string
  email: string
  expiresAt: number
  type: "login" | "signup"
  userData?: {
    firstName: string
    lastName: string
  }
}

// In-memory storage for OTP codes (in production, use Redis or database)
const otpStore = new Map<string, OTPData>()

export function generateOTP(): string {
  // Generate 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function storeOTP(
  email: string,
  code: string,
  type: "login" | "signup",
  userData?: { firstName: string; lastName: string },
): void {
  const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes
  otpStore.set(email.toLowerCase(), {
    code,
    email: email.toLowerCase(),
    expiresAt,
    type,
    userData,
  })
}

export function verifyOTP(email: string, code: string): OTPData | null {
  const data = otpStore.get(email.toLowerCase())

  if (!data) {
    return null
  }

  // Check if expired
  if (Date.now() > data.expiresAt) {
    otpStore.delete(email.toLowerCase())
    return null
  }

  // Check if code matches
  if (data.code !== code) {
    return null
  }

  // Delete OTP after successful verification
  otpStore.delete(email.toLowerCase())

  return data
}

export function deleteOTP(email: string): void {
  otpStore.delete(email.toLowerCase())
}

// Clean up expired OTPs periodically
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email)
    }
  }
}, 60 * 1000) // Run every minute
