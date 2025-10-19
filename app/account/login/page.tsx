import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Sign In - Atlantic Flagpole",
  description: "Sign in to your Atlantic Flagpole account",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  // If already logged in, redirect to account
  const session = await getSession()
  if (session) {
    redirect("/account")
  }

  const errorMessages: Record<string, string> = {
    missing_params: "Missing required parameters. Please try again.",
    invalid_state: "Invalid authentication state. Please try again.",
    token_exchange_failed: "Failed to complete sign in. Please try again.",
    callback_failed: "Authentication failed. Please try again.",
  }

  const error = searchParams.error ? errorMessages[searchParams.error] : null

  return (
    <div className="min-h-screen bg-afp-ivory flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-afp-navy mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Atlantic Flagpole account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <Button asChild className="w-full bg-afp-gold hover:bg-afp-gold-700 text-white h-12 text-base">
            <Link href="/api/auth/login">Sign In with Shopify</Link>
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/account/signup" className="text-afp-gold hover:text-afp-gold-700 font-medium">
                Sign up
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
