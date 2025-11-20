"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "flaggy"
  timestamp: Date
  product?: ProductRecommendation
}

interface ProductRecommendation {
  id: string
  title: string
  handle: string
  image: string
  price: string
  rating: number
  reviewCount: number
  timesBought: string
  variantId: string
  url: string
}

interface FlaggyContentProps {
  onClose: () => void
}

export function FlaggyContent({ onClose }: FlaggyContentProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isEscalating, setIsEscalating] = useState(false)
  const [ticketForm, setTicketForm] = useState({ name: "", email: "", issue: "" })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking, isTyping])

  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addFlaggyMessage("Hi there! I'm Flaggy, your friendly flagpole assistant. How can I help you today?")
      }, 500)
    }
  }, [])

  const addFlaggyMessage = (text: string, product?: ProductRecommendation) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "flaggy",
      timestamp: new Date(),
      product,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSuggestionClick = async (intent: string, label: string) => {
    addUserMessage(label)
    await processMessage(label, intent)
  }

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = message.trim()
      setMessage("")
      addUserMessage(userMessage)
      await processMessage(userMessage)
    }
  }

  const processMessage = async (userMessage: string, suggestedIntent?: string) => {
    setIsThinking(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsThinking(false)
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsTyping(false)

    try {
      const response = await fetch("/api/flaggy/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, intent: suggestedIntent }),
      })

      const data = await response.json()

      if (data.shouldEscalate) {
        setIsEscalating(true)
        addFlaggyMessage(
          "That's a great question that needs a human expert's touch. Let me collect your information and I'll have our team reach out to you via email within 24 hours.",
        )
      } else {
        addFlaggyMessage(data.response, data.product)
        setShowSuggestions(true)
      }
    } catch (error) {
      console.error("Error processing message:", error)
      addFlaggyMessage("I'm having trouble connecting right now. Let me connect you with our support team instead.")
      setIsEscalating(true)
    }
  }

  const handleTicketSubmit = async () => {
    if (!ticketForm.name || !ticketForm.email || !ticketForm.issue) {
      addFlaggyMessage("Please fill in all fields so I can connect you with our team.")
      return
    }

    try {
      const response = await fetch("/api/create-support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ticketForm.name,
          email: ticketForm.email,
          issue: ticketForm.issue,
          chatHistory: messages.map((m) => `${m.sender}: ${m.text}`).join("\n"),
        }),
      })

      if (response.ok) {
        addFlaggyMessage(
          `Perfect! I've created a support ticket and our team will reach out to you at ${ticketForm.email} within 24 hours.`,
        )
        setIsEscalating(false)
        setTicketForm({ name: "", email: "", issue: "" })
        setShowSuggestions(true)
      } else {
        addFlaggyMessage("I had trouble creating the ticket. Please email us directly at support@atlanticflagpole.com.")
      }
    } catch (error) {
      console.error("Error creating ticket:", error)
      addFlaggyMessage("I had trouble creating the ticket. Please email us directly at support@atlanticflagpole.com.")
    }
  }

  const handleAddToCart = async (variantId: string, productTitle: string) => {
    try {
      let cartId = localStorage.getItem("cartId")

      if (!cartId) {
        const createResponse = await fetch("/api/cart", {
          method: "POST",
        })
        const createData = await createResponse.json()
        cartId = createData.id
        localStorage.setItem("cartId", cartId)
      }

      const addResponse = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        }),
      })

      if (addResponse.ok) {
        addFlaggyMessage(`Great choice! I've added the ${productTitle} to your cart.`)
      } else {
        addFlaggyMessage("I had trouble adding that to your cart. Please try again.")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      addFlaggyMessage("I had trouble adding that to your cart. Please try again.")
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="bg-[#0B1C2C] text-white p-2.5 shrink-0 border-b-2 border-[#C8A55C]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="relative w-4 h-4 bg-gradient-to-br from-[#C8A55C] to-[#B8954C] rounded-full flex items-center justify-center">
              <div className="relative w-full h-full bg-white rounded-full overflow-hidden">
                <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-cover" />
              </div>
            </div>
            Flaggy AI
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#C8A55C] transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 p-2.5 overflow-y-auto bg-gradient-to-b from-gray-50 to-white overscroll-contain touch-pan-y">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("mb-4 flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[80%]", msg.sender === "user" ? "order-2" : "order-1")}>
              {msg.sender === "flaggy" && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="relative w-12 h-12">
                    <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-contain" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">Flaggy</span>
                </div>
              )}
              <div
                className={cn(
                  "rounded-2xl p-3 shadow-sm text-sm",
                  msg.sender === "user"
                    ? "bg-[#C8A55C] text-white rounded-tr-none"
                    : "bg-white border border-gray-200 rounded-tl-none",
                )}
              >
                <p className={cn("whitespace-pre-line", msg.sender === "user" ? "text-white" : "text-gray-800")}>
                  {msg.text}
                </p>
              </div>

              {msg.sender === "flaggy" && msg.product && (
                <div className="mt-3 bg-white border-2 border-[#C8A55C] rounded-xl overflow-hidden shadow-md">
                  <div className="flex gap-3 p-3">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      {msg.product.image && msg.product.image.startsWith("http") ? (
                        <Image
                          src={msg.product.image || "/placeholder.svg"}
                          alt={msg.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 mb-1 line-clamp-2">{msg.product.title}</h4>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-2.5 h-2.5",
                                i < Math.floor(msg.product!.rating)
                                  ? "fill-[#C8A55C] text-[#C8A55C]"
                                  : "fill-gray-200 text-gray-200",
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-0.5">
                            {msg.product.rating} ({msg.product.reviewCount.toLocaleString()})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-[#0B1C2C]">{msg.product.price}</span>
                        <button
                          onClick={() => handleAddToCart(msg.product!.variantId, msg.product!.title)}
                          className="bg-[#C8A55C] hover:bg-[#B8954C] text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-1 px-2">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="mb-4 flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-[#C8A55C] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#C8A55C] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#C8A55C] rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {showSuggestions && messages.length > 0 && !isEscalating && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500 font-semibold mb-2">Quick topics:</p>
            {[
              { label: "Product Recommendations", intent: "product_recommendation" },
              { label: "Installation Help", intent: "installation_help" },
              { label: "Order Tracking", intent: "order_tracking" },
              { label: "Shipping Questions", intent: "shipping_questions" },
            ].map((suggestion) => (
              <button
                key={suggestion.intent}
                onClick={() => handleSuggestionClick(suggestion.intent, suggestion.label)}
                className="w-full text-left px-4 py-2 bg-white border-2 border-[#C8A55C] text-[#0B1C2C] rounded-lg hover:bg-[#C8A55C] hover:text-white transition-all duration-200 text-sm font-medium shadow-sm"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        )}

        {isEscalating && (
          <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-blue-900 mb-3">Connect with Support</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={ticketForm.name}
                onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={ticketForm.email}
                onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <textarea
                placeholder="Brief summary of your issue"
                value={ticketForm.issue}
                onChange={(e) => setTicketForm({ ...ticketForm, issue: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
              <button
                onClick={handleTicketSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors font-medium text-sm"
              >
                Send to Support Team
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-2.5 border-t-2 border-gray-200 bg-white shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            disabled={isThinking || isTyping}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm disabled:bg-gray-100"
          />
          <button
            onClick={handleSend}
            disabled={isThinking || isTyping || !message.trim()}
            className="bg-[#C8A55C] hover:bg-[#B8954C] text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
