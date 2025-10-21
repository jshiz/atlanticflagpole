"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, Gift, Mail, KeyRound } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export const dynamic = "force-dynamic"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const discountCode = searchParams.get("discount")

  const [step, setStep] = useState<"details" | "otp">("details")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [devOtp, setDevOtp] = useState<string | null>(null)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          type: "signup",
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send code")
      }

      // In development, show the OTP
      if (data.otp) {
        setDevOtp(data.otp)
      }

      setStep("otp")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid code")
      }

      // Redirect to account page on success
      router.push("/account")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setOtp("")
    setError(null)
    await handleSendOTP(new Event("submit") as any)
  }

  return (
    <div className="min-h-screen bg-afp-ivory flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-afp-navy mb-2">Create Account</h1>
          <p className="text-gray-600">
            {step === "details" ? "Join Atlantic Flagpole today" : "Enter the code sent to your email"}
          </p>

          {discountCode && step === "details" && (
            <div className="mt-4 p-4 bg-gradient-to-r from-[#C8A55C]/20 to-[#0B1C2C]/20 rounded-lg border-2 border-[#C8A55C]">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-[#C8A55C]" />
                <p className="font-bold text-[#0B1C2C]">Welcome Bonus Active!</p>
              </div>
              <p className="text-sm text-[#0B1C2C]/70">
                Sign up now and get <span className="font-bold text-[#C8A55C]">$5 OFF</span> your first order with code:{" "}
                <code className="font-bold">{discountCode}</code>
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {devOtp && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Development Mode:</strong> Your code is <code className="font-mono font-bold">{devOtp}</code>
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {step === "details" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-afp-gold hover:bg-afp-gold-700 text-white h-12 text-base"
              >
                {loading ? "Sending Code..." : "Continue"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative mt-1">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="pl-10 text-center text-2xl tracking-widest font-mono"
                    placeholder="000000"
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Code sent to {formData.email}</p>
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-afp-gold hover:bg-afp-gold-700 text-white h-12 text-base"
              >
                {loading ? "Creating Account..." : "Verify & Create Account"}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button type="button" onClick={() => setStep("details")} className="text-gray-600 hover:text-afp-navy">
                  ← Change details
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-afp-gold hover:text-afp-gold-700"
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/account/login" className="text-afp-gold hover:text-afp-gold-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-afp-navy">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
