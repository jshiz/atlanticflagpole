import { streamText } from "ai"
import { searchArticles } from "@/lib/help-center/articles"
import { getProducts } from "@/lib/shopify"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    const articleResults = searchArticles(query)

    let productResults = []
    try {
      productResults = await getProducts({ query, first: 5 })
    } catch (error) {
      console.error("[v0] Product search error:", error)
    }

    const intent = analyzeIntent(query)

    const context = `
User Query: "${query}"
Intent: ${intent.type}

Available Help Articles:
${articleResults
  .slice(0, 5)
  .map((a) => `- ${a.title}: ${a.excerpt}`)
  .join("\n")}

Available Products:
${productResults
  .slice(0, 3)
  .map((p: any) => `- ${p.title}: $${p.priceRange.minVariantPrice.amount}`)
  .join("\n")}

Provide a helpful, conversational response that:
1. Directly answers their question
2. Suggests the most relevant resource
3. Offers to help further if needed
Keep it concise (2-3 sentences).
`

    const result = await streamText({
      model: "openai/gpt-4o-mini",
      prompt: context,
      system: `You are a helpful customer service assistant for Atlantic Flagpole, a company that sells premium telescoping flagpoles. 
      Be friendly, concise, and always direct users to the most relevant help article or product.
      If they need installation help, point them to installation guides.
      If they have warranty questions, direct them to warranty information.
      If they're shopping, suggest relevant products.`,
    })

    const aiResponse = await result.text

    const results = [
      ...articleResults.slice(0, 3).map((article) => ({
        type: "article" as const,
        title: article.title,
        description: article.excerpt,
        url: `/help-center/${article.categorySlug}/${article.slug}`,
        icon: getIconForCategory(article.categorySlug),
      })),
      ...productResults.slice(0, 2).map((product: any) => ({
        type: "product" as const,
        title: product.title,
        description: `Starting at $${product.priceRange.minVariantPrice.amount}`,
        url: `/products/${product.handle}`,
        icon: "🏴",
      })),
    ]

    if (intent.type === "installation") {
      results.unshift({
        type: "action",
        title: "Installation Guide",
        description: "Step-by-step instructions for installing your Phoenix flagpole",
        url: "/help-center/getting-started/how-to-install-your-phoenix-telescoping-flagpole",
        icon: "🔧",
      })
    } else if (intent.type === "warranty") {
      results.unshift({
        type: "action",
        title: "File a Warranty Claim",
        description: "Submit a warranty claim for your flagpole",
        url: "/help-center/warranty/how-to-submit-warranty-claim",
        icon: "🛡️",
      })
    } else if (intent.type === "troubleshooting") {
      results.unshift({
        type: "action",
        title: "Troubleshooting Guide",
        description: "Solutions to common flagpole issues",
        url: "/help-center/troubleshooting",
        icon: "🔍",
      })
    }

    return Response.json({
      aiResponse,
      results: results.slice(0, 6),
    })
  } catch (error) {
    console.error("[v0] AI search error:", error)
    return Response.json(
      {
        aiResponse: "I'm having trouble processing your request. Please try again or contact our support team.",
        results: [],
      },
      { status: 500 },
    )
  }
}

function analyzeIntent(query: string): { type: string; confidence: number } {
  const lowerQuery = query.toLowerCase()

  if (
    lowerQuery.includes("install") ||
    lowerQuery.includes("setup") ||
    lowerQuery.includes("how to") ||
    lowerQuery.includes("dig")
  ) {
    return { type: "installation", confidence: 0.9 }
  }

  if (
    lowerQuery.includes("warranty") ||
    lowerQuery.includes("broken") ||
    lowerQuery.includes("replace") ||
    lowerQuery.includes("claim")
  ) {
    return { type: "warranty", confidence: 0.9 }
  }

  if (
    lowerQuery.includes("stuck") ||
    lowerQuery.includes("won't") ||
    lowerQuery.includes("problem") ||
    lowerQuery.includes("issue") ||
    lowerQuery.includes("fix")
  ) {
    return { type: "troubleshooting", confidence: 0.9 }
  }

  if (
    lowerQuery.includes("ship") ||
    lowerQuery.includes("order") ||
    lowerQuery.includes("track") ||
    lowerQuery.includes("delivery")
  ) {
    return { type: "shipping", confidence: 0.9 }
  }

  if (lowerQuery.includes("flag") && (lowerQuery.includes("care") || lowerQuery.includes("clean"))) {
    return { type: "flag-care", confidence: 0.8 }
  }

  if (lowerQuery.includes("buy") || lowerQuery.includes("purchase") || lowerQuery.includes("price")) {
    return { type: "shopping", confidence: 0.8 }
  }

  return { type: "general", confidence: 0.5 }
}

function getIconForCategory(categorySlug: string): string {
  const icons: Record<string, string> = {
    "getting-started": "🚀",
    "product-setup": "🔧",
    troubleshooting: "🔍",
    warranty: "🛡️",
    "flag-etiquette": "🇺🇸",
    "orders-shipping": "📦",
    "general-faqs": "❓",
  }
  return icons[categorySlug] || "📄"
}
