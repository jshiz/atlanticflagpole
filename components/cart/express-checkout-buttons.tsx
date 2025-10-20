"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { AppleIcon, CreditCard, Zap } from "lucide-react"
import { ApplePaySession } from "apple-pay-js-api"

interface ExpressCheckoutButtonsProps {
  cartId?: string
  variantId?: string
  quantity?: number
  onCheckoutStart?: () => void
}

export function ExpressCheckoutButtons({
  cartId,
  variantId,
  quantity = 1,
  onCheckoutStart,
}: ExpressCheckoutButtonsProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [supportsApplePay, setSupportsApplePay] = useState(false)
  const [supportsGooglePay, setSupportsGooglePay] = useState(false)

  useEffect(() => {
    // Check if Apple Pay is available (Safari/iOS)
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
      setSupportsApplePay(true)
    }

    // Check if Google Pay is available (Chrome/Android)
    if (window.PaymentRequest) {
      try {
        const supportedInstruments = [
          {
            supportedMethods: "https://google.com/pay",
            data: {
              environment: "TEST",
              apiVersion: 2,
              apiVersionMinor: 0,
              merchantInfo: {
                merchantName: "Atlantic Flagpole",
              },
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                },
              ],
            },
          },
        ]

        const details = {
          total: {
            label: "Total",
            amount: { currency: "USD", value: "0.00" },
          },
        }

        const request = new PaymentRequest(supportedInstruments, details)
        request.canMakePayment().then((result) => {
          if (result) {
            setSupportsGooglePay(true)
          }
        })
      } catch (e) {
        console.log("[v0] Google Pay not available")
      }
    }
  }, [])

  const handleExpressCheckout = async (method: "apple" | "google" | "shop") => {
    setIsProcessing(true)
    onCheckoutStart?.()

    try {
      let checkoutCartId = cartId

      // If no cart ID provided, create a new cart with the variant
      if (!checkoutCartId && variantId) {
        const response = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merchandiseId: variantId,
            quantity,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create cart")
        }

        const data = await response.json()
        checkoutCartId = data.cart.id
      }

      if (!checkoutCartId) {
        throw new Error("No cart available")
      }

      // Get the checkout URL
      const checkoutResponse = await fetch("/api/cart/checkout-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId: checkoutCartId }),
      })

      if (!checkoutResponse.ok) {
        throw new Error("Failed to get checkout URL")
      }

      const { checkoutUrl } = await checkoutResponse.json()

      // Add payment method hint to URL
      const url = new URL(checkoutUrl)
      if (method === "apple") {
        url.searchParams.set("payment_method", "apple_pay")
      } else if (method === "google") {
        url.searchParams.set("payment_method", "google_pay")
      } else if (method === "shop") {
        url.searchParams.set("payment_method", "shop_pay")
      }

      // Redirect to Shopify checkout with payment method pre-selected
      window.location.href = url.toString()
    } catch (error) {
      console.error("[v0] Express checkout error:", error)
      alert("Express checkout failed. Please try regular checkout.")
    } finally {
      setIsProcessing(false)
    }
  }

  // If no payment methods are supported, don't render anything
  if (!supportsApplePay && !supportsGooglePay) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500 font-medium">Express Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {supportsApplePay && (
          <Button
            onClick={() => handleExpressCheckout("apple")}
            disabled={isProcessing}
            className="w-full h-12 bg-black hover:bg-gray-900 text-white font-semibold"
            variant="outline"
          >
            {isProcessing ? (
              <Loader className="w-5 h-5" />
            ) : (
              <>
                <AppleIcon className="w-5 h-5 mr-2" />
                Apple Pay
              </>
            )}
          </Button>
        )}

        {supportsGooglePay && (
          <Button
            onClick={() => handleExpressCheckout("google")}
            disabled={isProcessing}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 font-semibold border-2 border-gray-300"
            variant="outline"
          >
            {isProcessing ? (
              <Loader className="w-5 h-5" />
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Google Pay
              </>
            )}
          </Button>
        )}

        <Button
          onClick={() => handleExpressCheckout("shop")}
          disabled={isProcessing}
          className="w-full h-12 bg-[#5A31F4] hover:bg-[#4A21D4] text-white font-semibold"
          variant="outline"
        >
          {isProcessing ? (
            <Loader className="w-5 h-5" />
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Shop Pay
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
