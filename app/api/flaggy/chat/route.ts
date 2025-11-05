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
    const { message, intent: suggestedIntent } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Generate session ID (in production, use proper session management)
    const sessionId = request.headers.get("x-session-id") || "default"

    // Get or create conversation context
    let context = conversationContexts.get(sessionId)
    if (!context) {
      context = { attempts: 0, messageHistory: [] }
      conversationContexts.set(sessionId, context)
    }

    // Add message to history (keep last 5 messages)
    context.messageHistory.push(message)
    if (context.messageHistory.length > 5) {
      context.messageHistory.shift()
    }

    const matchedIntent = matchIntent(message)

    if (!matchedIntent) {
      // No match found - increment attempts
      context.attempts++

      if (context.attempts >= 2) {
        // Escalate after 2 failed attempts
        conversationContexts.delete(sessionId)
        return NextResponse.json({
          shouldEscalate: true,
          response: `I want to make sure you get the best help possible! 🤝

It seems like your question might be outside my expertise, or I'm just not understanding correctly (my bad!).

**Here's what I can do:**
• Connect you with our **customer service team** — real humans who know their stuff!
• They can help with complex orders, custom requests, or anything I can't handle

**Or, try asking about:**
• Product recommendations and comparisons
• Installation and setup help
• Troubleshooting and repairs
• Warranty claims and support
• Shipping and order tracking

Would you like me to connect you with our support team?`,
        })
      }

      return NextResponse.json({
        shouldEscalate: false,
        response: `Hmm, I'm not quite sure I caught that! 🤔 Let me help you out.

**I'm great at answering questions about:**
• **Products** — Phoenix flagpoles, bundles, specifications
• **Installation** — Step-by-step setup and concrete work
• **Troubleshooting** — Stuck joints, operation issues
• **Warranty** — Claims, replacements, guarantees
• **Flags** — Care, replacement, sizing
• **Shipping** — Tracking, delivery times

**Try asking something like:**
• "Tell me about the Phoenix flagpole"
• "How do I install my flagpole?"
• "My pole is stuck, help!"
• "What's covered under warranty?"
• "When will my order arrive?"

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

    console.log(
      `[v0] Flaggy matched intent: ${matchedIntent.intent.name} (score: ${matchedIntent.score}, keywords: ${matchedIntent.matchedKeywords.join(", ")})`,
    )

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
        response:
          "Oops! Something went wrong on my end. Please try again, or contact our support team if the issue persists.",
      },
      { status: 500 },
    )
  }
}

setInterval(
  () => {
    const now = Date.now()
    for (const [sessionId, context] of conversationContexts.entries()) {
      // Remove contexts older than 30 minutes
      if (context.messageHistory.length === 0 || now - Date.now() > 30 * 60 * 1000) {
        conversationContexts.delete(sessionId)
      }
    }
  },
  5 * 60 * 1000,
) // Run every 5 minutes
