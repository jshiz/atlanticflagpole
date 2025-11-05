import { type NextRequest, NextResponse } from "next/server"
import { matchIntent } from "@/lib/flaggy/knowledge-base"

interface ConversationContext {
  attempts: number
  lastIntent?: string
  messageHistory: string[]
}

const conversationContexts = new Map<string, ConversationContext>()

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const sessionId = request.headers.get("x-session-id") || "default"

    let context = conversationContexts.get(sessionId)
    if (!context) {
      context = { attempts: 0, messageHistory: [] }
      conversationContexts.set(sessionId, context)
    }

    context.messageHistory.push(message)
    if (context.messageHistory.length > 5) {
      context.messageHistory.shift()
    }

    const matchedIntent = matchIntent(message)

    if (!matchedIntent) {
      context.attempts++

      if (context.attempts >= 2) {
        conversationContexts.delete(sessionId)
        return NextResponse.json({
          shouldEscalate: true,
          response: `I want to make sure you get the best help possible. It seems like your question might be outside my expertise, or I'm not understanding correctly.

I can connect you with our customer service team - real humans who can help with complex orders, custom requests, or anything I can't handle.

Or, try asking about: product recommendations, installation help, troubleshooting, warranty claims, or shipping questions.

Would you like me to connect you with our support team?`,
        })
      }

      return NextResponse.json({
        shouldEscalate: false,
        response: `I'm not quite sure I caught that. Let me help you out.

I'm great at answering questions about:
- Products (Phoenix flagpoles, bundles, specs)
- Installation (step-by-step setup)
- Troubleshooting (stuck joints, operation issues)
- Warranty (claims, replacements, guarantees)
- Flags (care, replacement, sizing)
- Shipping (tracking, delivery times)

What can I help you with?`,
        followUp: [
          "Tell me about Phoenix flagpoles",
          "Help with installation",
          "Troubleshoot stuck joint",
          "Check warranty info",
        ],
      })
    }

    context.attempts = 0
    context.lastIntent = matchedIntent.intent.name

    return NextResponse.json({
      shouldEscalate: false,
      response: matchedIntent.intent.response,
      followUp: matchedIntent.intent.followUp,
      links: matchedIntent.intent.links,
      matchedIntent: matchedIntent.intent.name,
      confidence: matchedIntent.score,
    })
  } catch (error) {
    console.error("[v0] Error in Flaggy chat API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Oops! Something went wrong. Please try again, or contact our support team if the issue persists.",
      },
      { status: 500 },
    )
  }
}

setInterval(
  () => {
    const now = Date.now()
    for (const [sessionId, context] of conversationContexts.entries()) {
      if (context.messageHistory.length === 0 || now - Date.now() > 30 * 60 * 1000) {
        conversationContexts.delete(sessionId)
      }
    }
  },
  5 * 60 * 1000,
)
