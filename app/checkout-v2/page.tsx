"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingBag, User, Truck, Shield, Package, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered"

interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  items: Array<{
    title: string
    quantity: number
    price: number
    image?: string
  }>
  total: number
  trackingNumber?: string
  createdAt: string
  shippingAddress: {
    name: string
    address1: string
    city: string
    state: string
    zip: string
  }
}

export default function CheckoutV2Page() {
  const { cart, loading } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"checkout" | "account" | "track">("checkout")
  const [processing, setProcessing] = useState(false)

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  // Checkout form
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")

  // Sign in form
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")

  // Order tracking
  const [trackingOrderNumber, setTrackingOrderNumber] = useState("")
  const [trackingEmail, setTrackingEmail] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null)

  const lines = cart?.lines?.edges ? cart.lines.edges.map((edge) => edge.node) : []
  const isEmpty = lines.length === 0
  const subtotal = cart?.cost?.subtotalAmount ? Number.parseFloat(cart.cost.subtotalAmount.amount) : 0
  const total = cart?.cost?.totalAmount ? Number.parseFloat(cart.cost.totalAmount.amount) : 0

  // Check if redirected from order confirmation
  useEffect(() => {
    const orderNumber = searchParams?.get("order")
    if (orderNumber) {
      setActiveTab("track")
      setTrackingOrderNumber(orderNumber)
    }
  }, [searchParams])

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Call your auth API
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      })

      if (response.ok) {
        const data = await response.json()
        setIsLoggedIn(true)
        setUserEmail(signInEmail)
        setEmail(signInEmail)
        // Load user orders
        loadUserOrders(signInEmail)
      } else {
        alert("Sign in failed. Please check your credentials.")
      }
    } catch (error) {
      alert("Sign in error. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  // Load user orders
  const loadUserOrders = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/orders?email=${userEmail}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error("[v0] Error loading orders:", error)
    }
  }

  // Handle checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
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

  // Track order
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const response = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: trackingOrderNumber,
          email: trackingEmail,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTrackedOrder(data.order)
      } else {
        alert("Order not found. Please check your order number and email.")
      }
    } catch (error) {
      alert("Error tracking order. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  // Order status progress
  const OrderProgress = ({ status }: { status: OrderStatus }) => {
    const steps = [
      { key: "pending", label: "Order Placed", icon: CheckCircle2 },
      { key: "processing", label: "Processing", icon: Package },
      { key: "shipped", label: "Shipped", icon: Truck },
      { key: "delivered", label: "Delivered", icon: CheckCircle2 },
    ]

    const currentStepIndex = steps.findIndex((step) => step.key === status)

    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted ? "bg-green-600" : isCurrent ? "bg-[#C8A55C]" : "bg-gray-300"
                  } text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-semibold text-center ${isCompleted || isCurrent ? "text-[#0B1C2C]" : "text-gray-400"}`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-6 h-1 ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
                    style={{
                      left: `${(index / (steps.length - 1)) * 100 + 8.33}%`,
                      width: `${100 / (steps.length - 1) - 16.66}%`,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
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
            <span>Secure Checkout & Account Management</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="checkout" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Checkout
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              My Account
            </TabsTrigger>
            <TabsTrigger value="track" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Track Order
            </TabsTrigger>
          </TabsList>

          {/* Checkout Tab */}
          <TabsContent value="checkout">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Complete Your Order</h2>

                  {!isLoggedIn && (
                    <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 mb-2">
                        <strong>Have an account?</strong> Sign in to access saved addresses and track orders.
                      </p>
                      <form onSubmit={handleSignIn} className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="password"
                          placeholder="Password"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" disabled={processing} className="bg-[#C8A55C] hover:bg-[#a88947]">
                          Sign In
                        </Button>
                      </form>
                    </div>
                  )}

                  {isLoggedIn && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-900">Signed in as {userEmail}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
                        Sign Out
                      </Button>
                    </div>
                  )}

                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
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

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>
                      <div className="space-y-4">
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
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white text-lg h-14"
                      disabled={processing || isEmpty}
                    >
                      {processing ? "Processing..." : `Complete Order - $${total.toFixed(2)}`}
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Order Summary */}
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
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="max-w-4xl mx-auto">
              {!isLoggedIn ? (
                <Card className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6 text-center">
                    Sign In to Your Account
                  </h2>
                  <form onSubmit={handleSignIn} className="space-y-4 max-w-md mx-auto">
                    <div>
                      <Label htmlFor="signInEmail">Email Address</Label>
                      <Input
                        id="signInEmail"
                        type="email"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signInPassword">Password</Label>
                      <Input
                        id="signInPassword"
                        type="password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white"
                      disabled={processing}
                    >
                      {processing ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">My Orders</h2>
                      <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                        Sign Out
                      </Button>
                    </div>

                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No orders yet</p>
                        <Button onClick={() => setActiveTab("checkout")} className="bg-[#C8A55C] hover:bg-[#a88947]">
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order.id} className="p-4 border-2">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-bold text-lg">Order #{order.orderNumber}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-lg text-[#C8A55C]">${order.total.toFixed(2)}</p>
                                <p className="text-sm text-gray-600">{order.items.length} items</p>
                              </div>
                            </div>

                            <OrderProgress status={order.status} />

                            {order.trackingNumber && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Truck className="w-5 h-5 text-blue-600" />
                                  <span className="text-sm text-blue-900">Tracking: {order.trackingNumber}</span>
                                </div>
                                <Button size="sm" variant="outline">
                                  Track Package
                                </Button>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Track Order Tab */}
          <TabsContent value="track">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6 text-center">Track Your Order</h2>

                <form onSubmit={handleTrackOrder} className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="trackingOrderNumber">Order Number</Label>
                    <Input
                      id="trackingOrderNumber"
                      value={trackingOrderNumber}
                      onChange={(e) => setTrackingOrderNumber(e.target.value)}
                      required
                      placeholder="#12345"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trackingEmail">Email Address</Label>
                    <Input
                      id="trackingEmail"
                      type="email"
                      value={trackingEmail}
                      onChange={(e) => setTrackingEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white"
                    disabled={processing}
                  >
                    {processing ? "Tracking..." : "Track Order"}
                  </Button>
                </form>

                {trackedOrder && (
                  <div className="space-y-6">
                    <div className="border-t-2 pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="font-bold text-xl">Order #{trackedOrder.orderNumber}</p>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(trackedOrder.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-bold text-xl text-[#C8A55C]">${trackedOrder.total.toFixed(2)}</p>
                      </div>

                      <OrderProgress status={trackedOrder.status} />

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Shipping To:</h3>
                        <p className="text-sm text-gray-700">{trackedOrder.shippingAddress.name}</p>
                        <p className="text-sm text-gray-700">{trackedOrder.shippingAddress.address1}</p>
                        <p className="text-sm text-gray-700">
                          {trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.state}{" "}
                          {trackedOrder.shippingAddress.zip}
                        </p>
                      </div>

                      {trackedOrder.trackingNumber && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Truck className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-900">Tracking Information</h3>
                          </div>
                          <p className="text-sm text-blue-700 mb-3">Tracking #: {trackedOrder.trackingNumber}</p>
                          <Button className="w-full bg-transparent" variant="outline">
                            View Carrier Tracking
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
