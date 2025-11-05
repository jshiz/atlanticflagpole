import { type NextRequest, NextResponse } from "next/server"
import { matchIntent } from "@/lib/flaggy/knowledge-base"

const conversationAttempts = new Map<string, number>()

export async function POST(request: NextRequest) {
  try {
    const { message, intent: suggestedIntent } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Generate a simple session ID (in production, use proper session management)
    const sessionId = request.headers.get("x-session-id") || "default"

    // Match intent from knowledge base
    const matchedIntent = matchIntent(message)

    if (!matchedIntent) {
      // No match found - increment attempts
      const attempts = (conversationAttempts.get(sessionId) || 0) + 1
      conversationAttempts.set(sessionId, attempts)

      if (attempts >= 2) {
        // Escalate after 2 failed attempts
        conversationAttempts.delete(sessionId)
        return NextResponse.json({
          shouldEscalate: true,
          response: "I want to make sure you get the best help possible. Let me connect you with our support team.",
        })
      }

      return NextResponse.json({
        shouldEscalate: false,
        response:
          "I'm not quite sure I understand. Could you rephrase that? Or you can ask me about:\n• Product recommendations\n• Installation help\n• Order tracking\n• Shipping information\n• Warranty details",
      })
    }

    // Reset attempts on successful match
    conversationAttempts.delete(sessionId)

    return NextResponse.json({
      shouldEscalate: false,
      response: matchedIntent.response,
      followUp: matchedIntent.followUp,
    })
  } catch (error) {
    console.error("[v0] Error in Flaggy chat API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
