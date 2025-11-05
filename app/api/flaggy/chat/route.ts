import { type NextRequest, NextResponse } from "next/server"
import { matchIntent } from "@/lib/flaggy/knowledge-base"
import { getCollectionProducts } from "@/lib/shopify"

interface ConversationContext {
  attempts: number
  lastIntent?: string
  messageHistory: string[]
}

const conversationContexts = new Map<string, ConversationContext>()

const INTENT_COLLECTION_MAP: Record<string, string | null> = {
  greeting: null, // No product for greetings
  product_overview: "telescoping-flagpoles",
  height_selection: "telescoping-flagpoles",
  installation_help: "telescoping-flagpoles",
  operation_help: "telescoping-flagpoles",
  troubleshooting_stuck_joint: "telescoping-flagpoles",
  warranty_info: null, // No product for warranty questions
  pricing_questions: "telescoping-flagpoles",
  flag_questions: "usa-flags",
  shipping_info: null, // No product for shipping questions
  winter_guidelines: null, // No product for winter care
  thank_you: null, // No product for thank you
}

const KEYWORD_COLLECTION_MAP: Record<string, string> = {
  light: "flagpole-lighting",
  lighting: "flagpole-lighting",
  solar: "flagpole-lighting",
  flag: "usa-flags",
  american: "usa-flags",
  state: "state-flags",
  international: "international-flags",
  pole: "telescoping-flagpoles",
  flagpole: "telescoping-flagpoles",
  phoenix: "telescoping-flagpoles",
  indoor: "indoor-flagpoles",
  kit: "telescoping-flagpoles",
  bundle: "telescoping-flagpoles",
}

async function getProductRecommendation(intentName: string, userMessage: string) {
  try {
    // Don't show products for these intents
    const noProductIntents = ["greeting", "warranty_info", "shipping_info", "winter_guidelines", "thank_you"]
    if (noProductIntents.includes(intentName)) {
      return null
    }

    // First, try to find collection based on keywords in user message
    const messageLower = userMessage.toLowerCase()
    let collectionHandle: string | null = null

    // Search for keywords in user message
    for (const [keyword, collection] of Object.entries(KEYWORD_COLLECTION_MAP)) {
      if (messageLower.includes(keyword)) {
        collectionHandle = collection
        break
      }
    }

    // If no keyword match, use intent-based collection
    if (!collectionHandle) {
      collectionHandle = INTENT_COLLECTION_MAP[intentName] || null
    }

    // If still no collection, don't show product
    if (!collectionHandle) {
      return null
    }

    // Fetch products from the collection
    const products = await getCollectionProducts({ collection: collectionHandle })

    if (!products || products.length === 0) {
      return null
    }

    // Get the first product (or a random one for variety)
    const product = products[0]
    if (!product) return null

    const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
    const variantId = product.variants[0]?.id

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: product.featuredImage?.url || "",
      price: `$${price.toFixed(2)}`,
      rating: 4.9,
      reviewCount: 2847,
      timesBought: "12,500+",
      variantId,
      url: `/product/${product.handle}`,
    }
  } catch (error) {
    console.error("[v0] Error fetching product recommendation:", error)
    return null
  }
}

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
• Products (Phoenix flagpoles, bundles, specs)
• Installation (step-by-step setup)
• Troubleshooting (stuck joints, operation issues)
• Warranty (claims, replacements, guarantees)
• Flags (care, replacement, sizing)
• Shipping (tracking, delivery times)

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

    const productRecommendation = await getProductRecommendation(matchedIntent.intent.name, message)

    return NextResponse.json({
      shouldEscalate: false,
      response: matchedIntent.intent.response,
      followUp: matchedIntent.intent.followUp,
      links: matchedIntent.intent.links,
      matchedIntent: matchedIntent.intent.name,
      confidence: matchedIntent.score,
      product: productRecommendation,
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
