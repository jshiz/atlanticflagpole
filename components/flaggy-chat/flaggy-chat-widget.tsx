"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, HelpCircle } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  text: string
  sender: "user" | "flaggy"
  timestamp: Date
}

interface SuggestionButton {
  label: string
  intent: string
}

const INITIAL_SUGGESTIONS: SuggestionButton[] = [
  { label: "Product Recommendations", intent: "product_recommendation" },
  { label: "Installation Help", intent: "installation_help" },
  { label: "Order Tracking", intent: "order_tracking" },
  { label: "Shipping Questions", intent: "shipping_questions" },
]

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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasShownInitialAnimation) {
      const timer = setTimeout(() => {
        console.log("[v0] Flaggy sliding in after 5 seconds")
        setFlaggyState("sliding-in")
        setHasShownInitialAnimation(true)

        // Auto-minimize after 10 seconds if user doesn't interact
        setTimeout(() => {
          if (flaggyState === "sliding-in") {
            console.log("[v0] Auto-minimizing Flaggy after 10 seconds")
            setFlaggyState("minimized")
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

  const addFlaggyMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "flaggy",
      timestamp: new Date(),
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
    setShowSuggestions(false)
    addUserMessage(label)
    await processMessage(label, intent)
  }

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = message.trim()
      setMessage("")
      setShowSuggestions(false)
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
          "That's a great question that needs a human expert's touch. I can create a support ticket for you, and one of our team members will email you back shortly.",
        )
      } else {
        addFlaggyMessage(data.response)
      }
    } catch (error) {
      console.error("[v0] Error processing message:", error)
      addFlaggyMessage("I'm having trouble connecting right now. Let me create a support ticket for you instead.")
      setIsEscalating(true)
    }
  }

  const handleTicketSubmit = async () => {
    if (!ticketForm.name || !ticketForm.email || !ticketForm.issue) {
      addFlaggyMessage("Please fill in all fields so I can create your ticket.")
      return
    }

    try {
      const response = await fetch("/api/create-support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: ticketForm.name,
          customerEmail: ticketForm.email,
          issueSummary: ticketForm.issue,
          chatHistory: messages.map((m) => `${m.sender}: ${m.text}`).join("\n"),
        }),
      })

      const data = await response.json()

      if (data.success) {
        addFlaggyMessage(
          `Got it! Your ticket (#${data.ticketId}) has been created. Our team will be in touch with you at ${ticketForm.email} very soon. Is there anything else I can help with?`,
        )
        setIsEscalating(false)
        setTicketForm({ name: "", email: "", issue: "" })
      } else {
        addFlaggyMessage(
          "I had trouble creating your ticket. Please try again or email us directly at support@atlanticflagpole.com",
        )
      }
    } catch (error) {
      console.error("[v0] Error creating ticket:", error)
      addFlaggyMessage(
        "I had trouble creating your ticket. Please try again or email us directly at support@atlanticflagpole.com",
      )
    }
  }

  const handleFlaggyClick = () => {
    console.log("[v0] Flaggy clicked, current state:", flaggyState)
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

  console.log("[v0] Flaggy current state:", flaggyState)

  return (
    <>
      {flaggyState === "minimized" && (
        <button
          onClick={handleFlaggyClick}
          className="fixed bottom-[180px] right-0 z-[110] bg-[#C8A55C] hover:bg-[#B8954C] text-white px-2 py-6 rounded-l-lg shadow-lg transition-all duration-300 hover:px-3 group"
          aria-label="Open Flaggy chat"
        >
          <div className="flex flex-col items-center">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
        </button>
      )}

      {flaggyState === "sliding-in" && (
        <div
          onClick={handleFlaggyClick}
          className="fixed bottom-4 right-4 z-[110] cursor-pointer animate-slide-in-from-right"
          style={{
            transform: "translateX(0%) rotate(-5deg)",
          }}
        >
          <div className="relative w-32 h-32 animate-rock">
            <Image
              src="/images/design-mode/Flaggy.png"
              alt="Flaggy"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      )}

      {flaggyState === "expanded" && (
        <div className="fixed bottom-24 right-4 z-[120] w-[90vw] max-w-md h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-[#C8A55C] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a2d3f] text-white p-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] animate-pulse"></div>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#C8A55C] to-[#B8954C] rounded-full p-1 shadow-lg">
                <div className="relative w-full h-full bg-white rounded-full p-1 overflow-hidden">
                  <Image
                    src="/images/design-mode/Flaggy.png"
                    alt="Flaggy"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Flaggy</h3>
                <p className="text-xs text-white/90 flex items-center gap-2">
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
            className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white relative"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                  {msg.sender === "flaggy" && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative w-6 h-6">
                        <Image
                          src="/images/design-mode/Flaggy.png"
                          alt="Flaggy"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">Flaggy</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-3 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#C8A55C] text-white rounded-tr-none"
                        : "bg-white border border-gray-200 rounded-tl-none"
                    }`}
                  >
                    <p className={`text-sm ${msg.sender === "user" ? "text-white" : "text-gray-800"}`}>{msg.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 px-2">
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

            {showSuggestions && messages.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 font-semibold mb-2">Quick topics:</p>
                {INITIAL_SUGGESTIONS.map((suggestion) => (
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
                <h4 className="font-bold text-sm text-blue-900 mb-3">Create Support Ticket</h4>
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
                    Submit Ticket
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t-2 border-gray-200 bg-white">
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
            <p className="text-xs text-gray-500 mt-2 text-center">Powered by Flaggy AI - Here to help 24/7</p>
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
