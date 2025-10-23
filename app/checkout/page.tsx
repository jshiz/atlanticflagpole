"use client"

export const dynamic = "force-dynamic"

import type React from "react"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag, User, Truck, CreditCard, Shield, ChevronRight, Package, Mail, Phone, MapPin } from "lucide-react"

type CheckoutStep = "customer" | "shipping" | "payment"

export default function CheckoutPage() {
  const { cart, loading } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("customer")
  const [customerType, setCustomerType] = useState<"guest" | "login">("guest")
  const [processing, setProcessing] = useState(false)

  // Customer info
  const [email, setEmail] = useState("")

  // Shipping info
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")

  const lines = cart?.lines?.edges ? cart.lines.edges.map((edge) => edge.node) : []
  const isEmpty = lines.length === 0
  const subtotal = cart?.cost?.subtotalAmount ? Number.parseFloat(cart.cost.subtotalAmount.amount) : 0
  const total = cart?.cost?.totalAmount ? Number.parseFloat(cart.cost.totalAmount.amount) : 0

  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account/login`

  useEffect(() => {
    if (isEmpty && !loading) {
      router.push("/cart")
    }
  }, [isEmpty, loading, router])

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (customerType === "login") {
      window.location.href = shopifyAccountUrl
      return
    } else {
      // Guest - proceed to shipping
      setCurrentStep("shipping")
    }
  }

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Create checkout with Shopify
      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart?.id,
          email,
          shippingAddress: {
            firstName,
            lastName,
            address1,
            address2,
            city,
            province: state,
            zip,
            country: "US",
            phone,
          },
        }),
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        // Redirect to Shopify's payment page
        window.location.href = data.checkoutUrl
      } else {
        alert("Checkout error. Please try again.")
      }
    } catch (error) {
      alert("Checkout error. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (isEmpty || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading checkout...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-2xl font-serif font-bold text-[#0B1C2C]">
            ATLANTIC FLAGPOLE
          </Link>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div
            className={`flex items-center gap-2 ${currentStep === "customer" ? "text-[#C8A55C]" : currentStep === "shipping" || currentStep === "payment" ? "text-green-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "customer" ? "bg-[#C8A55C]" : currentStep === "shipping" || currentStep === "payment" ? "bg-green-600" : "bg-gray-300"} text-white`}
            >
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold">Customer</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div
            className={`flex items-center gap-2 ${currentStep === "shipping" ? "text-[#C8A55C]" : currentStep === "payment" ? "text-green-600" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "shipping" ? "bg-[#C8A55C]" : currentStep === "payment" ? "bg-green-600" : "bg-gray-300"} text-white`}
            >
              <Truck className="w-4 h-4" />
            </div>
            <span className="font-semibold">Shipping</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-[#C8A55C]" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "payment" ? "bg-[#C8A55C]" : "bg-gray-300"} text-white`}
            >
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="font-semibold">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Customer Step */}
            {currentStep === "customer" && (
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Customer Information</h2>

                <RadioGroup
                  value={customerType}
                  onValueChange={(value: any) => setCustomerType(value)}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-2 p-4 border-2 rounded-lg cursor-pointer hover:border-[#C8A55C]">
                    <RadioGroupItem value="guest" id="guest" />
                    <Label htmlFor="guest" className="cursor-pointer flex-1">
                      <div className="font-semibold">Continue as Guest</div>
                      <div className="text-sm text-gray-600">Quick checkout without an account</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border-2 rounded-lg cursor-pointer hover:border-[#C8A55C]">
                    <RadioGroupItem value="login" id="login" />
                    <Label htmlFor="login" className="cursor-pointer flex-1">
                      <div className="font-semibold">Log In</div>
                      <div className="text-sm text-gray-600">Access your saved addresses and order history</div>
                    </Label>
                  </div>
                </RadioGroup>

                <form onSubmit={handleCustomerSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>

                  {customerType === "login" && (
                    <p className="text-xs text-gray-600 text-center">
                      You'll be redirected to sign in with your Shopify account
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white"
                    disabled={processing}
                  >
                    {customerType === "login" ? "Sign In with Shopify" : "Continue to Shipping"}
                  </Button>
                </form>
              </Card>
            )}

            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Shipping Address</h2>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address1" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    <Input
                      id="address1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                      placeholder="Street address"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="address2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="CA"
                        maxLength={2}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                        placeholder="12345"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="(555) 123-4567"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("customer")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-[#C8A55C] hover:bg-[#a88947] text-white">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Payment</h2>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Secure Payment Processing</p>
                      <p className="text-sm text-blue-700 mt-1">
                        You'll be redirected to Shopify's secure payment page to complete your purchase. All payment
                        information is encrypted and secure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {lines.map((line) => {
                    const product = line.merchandise.product
                    const variant = line.merchandise
                    const image = product.images?.edges?.[0]?.node
                    const price = Number.parseFloat(line.cost.totalAmount.amount)

                    return (
                      <div key={line.id} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {image ? (
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.altText || product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-gray-400 m-auto" />
                          )}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#C8A55C] rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {line.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0B1C2C] line-clamp-2">{product.title}</p>
                          {variant.title !== "Default Title" && (
                            <p className="text-xs text-gray-600">{variant.title}</p>
                          )}
                          <p className="text-sm font-bold text-[#C8A55C] mt-1">${price.toFixed(2)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold">
                    <span className="text-[#0B1C2C]">Total</span>
                    <span className="text-[#C8A55C]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free Shipping & Returns</span>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit}>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("shipping")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 bg-[#C8A55C] hover:bg-[#a88947] text-white"
                      disabled={processing}
                    >
                      {processing ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-serif font-bold text-[#0B1C2C] mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {lines.map((line) => {
                  const product = line.merchandise.product
                  const variant = line.merchandise
                  const image = product.images?.edges?.[0]?.node
                  const price = Number.parseFloat(line.cost.totalAmount.amount)

                  return (
                    <div key={line.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {image ? (
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.altText || product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400 m-auto" />
                        )}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#C8A55C] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {line.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0B1C2C] line-clamp-2">{product.title}</p>
                        {variant.title !== "Default Title" && <p className="text-xs text-gray-600">{variant.title}</p>}
                        <p className="text-sm font-bold text-[#C8A55C] mt-1">${price.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600 font-semibold">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span className="text-[#0B1C2C]">Total</span>
                  <span className="text-[#C8A55C]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free Shipping & Returns</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
