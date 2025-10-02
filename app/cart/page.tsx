"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { Loader } from "@/components/ui/loader"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { cart, loading, updateCartLine, removeFromCart } = useCart()

  console.log("[v0] Cart page - cart:", cart)
  console.log("[v0] Cart page - checkoutUrl:", cart?.checkoutUrl)

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
        <Loader className="w-8 h-8" />
      </div>
    )
  }

  const lines = cart?.lines?.edges ? cart.lines.edges.map((edge) => edge.node) : []
  const isEmpty = lines.length === 0

  const subtotal = cart?.cost?.subtotalAmount ? Number.parseFloat(cart.cost.subtotalAmount.amount) : 0

  const total = cart?.cost?.totalAmount ? Number.parseFloat(cart.cost.totalAmount.amount) : 0

  if (isEmpty) {
    return (
      <main className="min-h-screen bg-[#F5F3EF]">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-2">Your cart is empty</h2>
            <p className="text-[#0B1C2C]/70 mb-6">Add some premium flagpoles to get started!</p>
            <Button asChild className="bg-[#C8A55C] hover:bg-[#a88947]">
              <Link href="/products">Shop Products</Link>
            </Button>
          </Card>
        </div>
      </main>
    )
  }

  const handleCheckout = () => {
    console.log("[v0] Checkout button clicked, redirecting to:", cart?.checkoutUrl)
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    } else {
      console.error("[v0] No checkout URL available")
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {lines.map((line) => {
              const product = line.merchandise.product
              const variant = line.merchandise
              const price = Number.parseFloat(line.cost.totalAmount.amount)
              const productImages = product.images?.edges ? product.images.edges.map((edge) => edge.node) : []
              const image = productImages[0] || variant.image

              return (
                <Card key={line.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                      {image ? (
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.altText || product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${product.handle}`}
                        className="font-semibold text-[#0B1C2C] hover:text-[#C8A55C] transition-colors line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      {variant.title !== "Default Title" && (
                        <p className="text-sm text-[#0B1C2C]/70 mt-1">{variant.title}</p>
                      )}
                      <p className="text-lg font-bold text-[#0B1C2C] mt-2">${price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(line.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-2 border border-gray-300 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartLine(line.id, line.quantity - 1)}
                          disabled={line.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{line.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartLine(line.id, line.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-serif font-bold text-[#0B1C2C] mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-[#0B1C2C]/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#0B1C2C]/70">
                  <span>Shipping</span>
                  <span className="text-sm text-[#0B1C2C]/60">Calculated at checkout</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold text-[#0B1C2C] mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {cart?.checkoutUrl ? (
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-semibold py-6"
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <Button disabled className="w-full py-6">
                  Loading checkout...
                </Button>
              )}

              <Button asChild variant="outline" className="w-full mt-3 bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-center text-[#0B1C2C]/60 mb-3">Secure Checkout Powered by Shopify</p>
                <div className="flex items-center justify-center gap-4 text-[#0B1C2C]/40">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                  <span className="text-xs font-medium">SSL Encrypted</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
