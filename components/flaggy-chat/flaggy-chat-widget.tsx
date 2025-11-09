"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, HelpCircle, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

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

type FlaggyState = "hidden" | "sliding-in" | "minimized" | "expanded"

export function FlaggyChatWidget() {
  const [flaggyState, setFlaggyState] = useState<FlaggyState>("hidden")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isEscalating, setIsEscalating] = useState(false)
  const [ticketForm, setTicketForm] = useState({ name: "", email: "", issue: "" })
  const [hasShownInitialAnimation, setHasShownInitialAnimation] = useState(false)
  const [showHelpBubble, setShowHelpBubble] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasShownInitialAnimation) {
      const timer = setTimeout(() => {
        console.log("[v0] Flaggy sliding in after 5 seconds")
        setFlaggyState("sliding-in")
        setHasShownInitialAnimation(true)
        setTimeout(() => setShowHelpBubble(true), 500)

        setTimeout(() => {
          if (flaggyState === "sliding-in") {
            console.log("[v0] Auto-minimizing Flaggy after 10 seconds")
            setFlaggyState("minimized")
            setShowHelpBubble(false)
          }
        }, 10000)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [hasShownInitialAnimation, flaggyState])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking, isTyping])

  useEffect(() => {
    if (flaggyState === "expanded" && messages.length === 0) {
      setTimeout(() => {
        addFlaggyMessage("Hi there! I'm Flaggy, your friendly flagpole assistant. How can I help you today?")
      }, 500)
    }
  }, [flaggyState])

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
      console.error("[v0] Error processing message:", error)
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
          `Perfect! I've created a support ticket and our team will reach out to you at ${ticketForm.email} within 24 hours. Your ticket details have been emailed to our support team. Is there anything else I can help with in the meantime?`,
        )
        setIsEscalating(false)
        setTicketForm({ name: "", email: "", issue: "" })
        setShowSuggestions(true)
      } else {
        addFlaggyMessage(
          "I had trouble creating the ticket. Please email us directly at support@atlanticflagpole.com or call us.",
        )
      }
    } catch (error) {
      console.error("[v0] Error creating ticket:", error)
      addFlaggyMessage(
        "I had trouble creating the ticket. Please email us directly at support@atlanticflagpole.com or call us.",
      )
    }
  }

  const handleFlaggyClick = () => {
    console.log("[v0] Flaggy clicked, current state:", flaggyState)
    setShowHelpBubble(false)
    if (flaggyState === "sliding-in") {
      setFlaggyState("expanded")
    } else if (flaggyState === "minimized") {
      setFlaggyState("expanded")
    }
  }

  const handleClose = () => {
    console.log("[v0] Flaggy closed, minimizing")
    setFlaggyState("minimized")
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
        addFlaggyMessage(`Great choice! I've added the ${productTitle} to your cart. Ready to checkout?`)
      } else {
        addFlaggyMessage("I had trouble adding that to your cart. Please try again or visit the product page directly.")
      }
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      addFlaggyMessage("I had trouble adding that to your cart. Please try again or visit the product page directly.")
    }
  }

  console.log("[v0] Flaggy current state:", flaggyState)

  return (
    <>
      {flaggyState === "minimized" && (
        <button
          onClick={handleFlaggyClick}
          className="fixed bottom-20 md:bottom-[180px] right-1 md:right-0 z-[110] bg-[#C8A55C] hover:bg-[#B8954C] text-white px-1.5 md:px-2 py-4 md:py-6 rounded-l-lg shadow-lg transition-all duration-300 hover:px-2 md:hover:px-3 group"
          aria-label="Open Flaggy chat"
        >
          <div className="flex flex-col items-center">
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        </button>
      )}

      {flaggyState === "sliding-in" && (
        <>
          <div
            onClick={handleFlaggyClick}
            className="fixed bottom-2 md:bottom-4 right-2 md:right-4 z-[110] cursor-pointer animate-slide-in-from-right"
            style={{
              transform: "translateX(0%) rotate(-5deg)",
            }}
          >
            <div className="relative w-20 h-20 md:w-32 md:h-32 animate-rock">
              <Image
                src="/images/design-mode/Flaggy.png"
                alt="Flaggy"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {showHelpBubble && (
            <div
              className="fixed bottom-24 md:bottom-40 right-2 md:right-4 z-[109] animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative bg-white px-3 py-2 md:px-4 md:py-2.5 rounded-2xl shadow-xl border-2 border-[#C8A55C] max-w-[140px] md:max-w-[180px]">
                <p className="text-xs md:text-sm font-semibold text-[#0B1C2C] text-center whitespace-nowrap">
                  Hey, Need help?
                </p>
                <div className="absolute -bottom-2 right-6 md:right-10 w-4 h-4 bg-white border-r-2 border-b-2 border-[#C8A55C] transform rotate-45"></div>
              </div>
            </div>
          )}
        </>
      )}

      {flaggyState === "expanded" && (
        <div className="fixed bottom-2 md:bottom-4 right-2 md:right-4 z-[120] w-[90vw] md:w-[85vw] max-w-md h-[500px] md:h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-[#C8A55C] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a2d3f] text-white p-3 md:p-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] animate-pulse"></div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 relative z-10">
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#C8A55C] to-[#B8954C] rounded-full p-1 shadow-lg">
                <div className="relative w-full h-full bg-white rounded-full p-1 overflow-hidden">
                  <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base md:text-lg">Flaggy</h3>
                <p className="text-[10px] md:text-xs text-white/90 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Your AI Flagpole Assistant
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="ml-2 text-white hover:text-gray-300 transition-colors relative z-10"
              aria-label="Minimize chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 p-3 md:p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white relative"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 md:mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                  {msg.sender === "flaggy" && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative w-5 h-5 md:w-6 md:h-6">
                        <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-contain" />
                      </div>
                      <span className="text-[10px] md:text-xs font-semibold text-gray-600">Flaggy</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-2.5 md:p-3 shadow-sm text-xs md:text-sm ${
                      msg.sender === "user"
                        ? "bg-[#C8A55C] text-white rounded-tr-none"
                        : "bg-white border border-gray-200 rounded-tl-none"
                    }`}
                  >
                    <p className={`whitespace-pre-line ${msg.sender === "user" ? "text-white" : "text-gray-800"}`}>
                      {msg.text}
                    </p>
                  </div>

                  {msg.sender === "flaggy" && msg.product && (
                    <div className="mt-2 md:mt-3 bg-white border-2 border-[#C8A55C] rounded-xl overflow-hidden shadow-md">
                      <div className="flex gap-2 md:gap-3 p-2 md:p-3">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          {msg.product.image && msg.product.image.startsWith("http") ? (
                            <Image
                              src={msg.product.image || "/placeholder.svg"}
                              alt={msg.product.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                              unoptimized={msg.product.image.includes("placehold.co")}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-[10px]">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h4 className="font-bold text-[10px] md:text-xs text-gray-900 mb-1 line-clamp-2">
                              {msg.product.title}
                            </h4>
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-2 h-2 md:w-2.5 md:h-2.5 ${
                                    i < Math.floor(msg.product!.rating)
                                      ? "fill-[#C8A55C] text-[#C8A55C]"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                              <span className="text-[9px] md:text-[10px] text-gray-600 ml-0.5">
                                {msg.product.rating} ({msg.product.reviewCount.toLocaleString()})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm md:text-base font-bold text-[#0B1C2C]">{msg.product.price}</span>
                            <button
                              onClick={() => handleAddToCart(msg.product!.variantId, msg.product!.title)}
                              className="bg-[#C8A55C] hover:bg-[#B8954C] text-white px-2 py-1 rounded-lg text-[9px] md:text-[10px] font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
                            >
                              <ShoppingCart className="w-2.5 h-2.5 md:w-3 md:h-3" />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-600">Flaggy is thinking...</span>
                  </div>
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
              </div>
            )}

            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-600">Flaggy is typing...</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "200ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "400ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showSuggestions && messages.length > 0 && !isEscalating && (
              <div className="mt-3 md:mt-4 space-y-2">
                <p className="text-[10px] md:text-xs text-gray-500 font-semibold mb-2">Quick topics:</p>
                {[
                  { label: "Product Recommendations", intent: "product_recommendation" },
                  { label: "Installation Help", intent: "installation_help" },
                  { label: "Order Tracking", intent: "order_tracking" },
                  { label: "Shipping Questions", intent: "shipping_questions" },
                ].map((suggestion) => (
                  <button
                    key={suggestion.intent}
                    onClick={() => handleSuggestionClick(suggestion.intent, suggestion.label)}
                    className="w-full text-left px-3 md:px-4 py-1.5 md:py-2 bg-white border-2 border-[#C8A55C] text-[#0B1C2C] rounded-lg hover:bg-[#C8A55C] hover:text-white transition-all duration-200 text-xs md:text-sm font-medium shadow-sm"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            )}

            {isEscalating && (
              <div className="mt-3 md:mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-3 md:p-4">
                <h4 className="font-bold text-xs md:text-sm text-blue-900 mb-2 md:mb-3">Connect with Support</h4>
                <div className="space-y-2 md:space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={ticketForm.name}
                    onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                    className="w-full px-2.5 md:px-3 py-1.5 md:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                    className="w-full px-2.5 md:px-3 py-1.5 md:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
                  />
                  <textarea
                    placeholder="Brief summary of your issue"
                    value={ticketForm.issue}
                    onChange={(e) => setTicketForm({ ...ticketForm, issue: e.target.value })}
                    rows={3}
                    className="w-full px-2.5 md:px-3 py-1.5 md:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm resize-none"
                  />
                  <button
                    onClick={handleTicketSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 md:py-2 rounded-md transition-colors font-medium text-xs md:text-sm"
                  >
                    Send to Support Team
                  </button>
                  <p className="text-[10px] md:text-xs text-blue-700 text-center">
                    Our team will email you within 24 hours
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 md:p-4 border-t-2 border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                disabled={isThinking || isTyping}
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-xs md:text-sm disabled:bg-gray-100"
              />
              <button
                onClick={handleSend}
                disabled={isThinking || isTyping || !message.trim()}
                className="bg-[#C8A55C] hover:bg-[#B8954C] text-white p-2 md:p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
            <p className="text-[10px] md:text-xs text-gray-500 mt-2 text-center">
              Powered by Flaggy AI - Here to help 24/7
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes rock {
          0%,
          100% {
            transform: translateX(0%) rotate(-5deg);
          }
          50% {
            transform: translateX(0%) rotate(-8deg);
          }
        }
        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%) rotate(-5deg);
            opacity: 0;
          }
          to {
            transform: translateX(0%) rotate(-5deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-rock {
          animation: rock 3s ease-in-out infinite;
        }
        .animate-slide-in-from-right {
          animation: slide-in-from-right 0.8s ease-out forwards;
        }
      `}</style>
    </>
  )
}
