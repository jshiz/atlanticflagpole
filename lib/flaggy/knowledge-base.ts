export interface Intent {
  name: string
  keywords: string[]
  response: string
  followUp?: string[]
}

export const KNOWLEDGE_BASE: Intent[] = [
  {
    name: "order_tracking",
    keywords: ["tracking", "order status", "where is my order", "track", "shipment", "delivery status"],
    response:
      "I can help you track your order! To get the most accurate information, I'll need to create a support ticket with your order number. Our team will send you a tracking update within a few hours. Would you like me to create that ticket for you?",
  },
  {
    name: "product_recommendation",
    keywords: ["which flagpole", "best pole", "recommend", "what should i buy", "help me choose", "suggestion"],
    response:
      "I'd be happy to help you find the perfect flagpole! Our most popular options are:\n\n• Phoenix Series - Our premium telescoping flagpole with lifetime warranty\n• Titan Series - Heavy-duty commercial grade for extreme weather\n• Liberty Series - Residential favorite with easy installation\n\nWhat's your primary use case? Residential or commercial? And do you have any specific height requirements?",
    followUp: ["Tell me about Phoenix", "Tell me about Titan", "Tell me about Liberty"],
  },
  {
    name: "installation_help",
    keywords: ["install", "installation", "how to set up", "setup", "instructions", "cement", "concrete", "mount"],
    response:
      "Installation is easier than you think! Here are the basics:\n\n1. Dig a hole 10% of pole height (e.g., 2ft for 20ft pole)\n2. Mix concrete according to package directions\n3. Insert ground sleeve and ensure it's level\n4. Fill with concrete and let cure 24-48 hours\n5. Insert your flagpole and enjoy!\n\nWould you like me to email you our detailed installation guide with photos?",
  },
  {
    name: "shipping_questions",
    keywords: ["shipping", "delivery", "how long", "when will it arrive", "shipping cost", "free shipping"],
    response:
      "Great question! Here's our shipping info:\n\n• FREE shipping on all orders over $99\n• Most orders ship within 1-2 business days\n• Delivery typically takes 3-7 business days\n• Expedited shipping available at checkout\n\nAll orders include tracking information sent to your email. Is there anything specific about shipping I can help with?",
  },
  {
    name: "warranty_info",
    keywords: ["warranty", "guarantee", "lifetime", "return", "refund", "money back"],
    response:
      "We stand behind our products with industry-leading guarantees:\n\n• Lifetime Warranty on Phoenix Series\n• 365-Day Home Trial - Try it risk-free!\n• Forever Warranty on select models\n• 100% Satisfaction Guarantee\n\nIf you're not completely satisfied, we'll make it right. What specific warranty question do you have?",
  },
  {
    name: "pricing_questions",
    keywords: ["price", "cost", "how much", "expensive", "cheap", "discount", "sale", "coupon"],
    response:
      "Our flagpoles range from $279 to $1,299 depending on height and features. We currently have:\n\n• Up to 40% OFF select models\n• FREE accessories bundle ($255 value)\n• 0% financing available\n• Military & First Responder discounts\n\nWould you like me to show you our current deals?",
  },
  {
    name: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    response:
      "Hello! I'm Flaggy, your friendly flagpole assistant. I'm here to help you find the perfect flagpole and answer any questions you have. What can I help you with today?",
  },
  {
    name: "thank_you",
    keywords: ["thank you", "thanks", "appreciate", "helpful"],
    response:
      "You're very welcome! I'm always here to help. Is there anything else you'd like to know about our flagpoles?",
  },
]

export function matchIntent(message: string): Intent | null {
  const lowerMessage = message.toLowerCase()

  // Check for explicit human request
  const humanKeywords = ["human", "person", "agent", "representative", "talk to someone", "speak to someone"]
  if (humanKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return null // Escalate to human
  }

  // Find matching intent
  for (const intent of KNOWLEDGE_BASE) {
    if (intent.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return intent
    }
  }

  return null // No match found
}
