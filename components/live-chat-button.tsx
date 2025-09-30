"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      // Placeholder for AI chat functionality
      console.log("Message sent:", message)
      setMessage("")
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#C8A55C] hover:bg-[#B8954C] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open live chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#0B1C2C] text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Live Chat Support</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online - We're here to help!
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
              <p className="text-sm text-gray-700">👋 Welcome to Atlantic Flagpoles! How can we help you today?</p>
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
