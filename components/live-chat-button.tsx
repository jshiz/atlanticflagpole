"use client"

import { useState } from "react"
import { X, Send } from "lucide-react"

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message)
      setMessage("")
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-32 right-0 z-[110] bg-[#0B1C2C] hover:bg-[#1a2d3f] text-white px-2 py-6 rounded-l-lg shadow-lg transition-all duration-300 hover:px-3 group"
          aria-label="Open live chat"
        >
          <div className="flex flex-col items-center gap-3">
            {/* Pulsing green indicator */}
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
            </div>

            {/* Vertical "CHAT" text */}
            <div className="flex flex-col gap-0.5 text-xs font-semibold tracking-wider">
              <span>C</span>
              <span>H</span>
              <span>A</span>
              <span>T</span>
            </div>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-24 right-0 z-[120] w-[90vw] max-w-sm h-[500px] bg-white rounded-l-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="bg-[#0B1C2C] text-white p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-base md:text-lg">Live Chat Support</h3>
              <p className="text-xs text-white/80 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Online - We're here to help!
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-2 text-white hover:text-gray-300 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <p className="text-sm text-gray-700">👋 Welcome to Atlantic Flagpole! How can we help you today?</p>
              <p className="text-xs text-gray-400 mt-1">AI Assistant</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <p className="text-sm text-gray-700">
                I can help you with:
                <br />• Product recommendations
                <br />• Installation guidance
                <br />• Order tracking
                <br />• General questions
              </p>
              <p className="text-xs text-gray-400 mt-1">AI Assistant</p>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-[#C8A55C] hover:bg-[#B8954C] text-white p-2 rounded-md transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              If no agent is available, we'll email you at the address you provide.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
