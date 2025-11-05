export interface Intent {
  name: string
  keywords: string[]
  response: string | string[] // Allow multiple response variations
  followUp?: string[]
  links?: { label: string; url: string }[]
  priority?: number
  aliases?: string[]
}

export interface IntentMatch {
  intent: Intent
  score: number
  matchedKeywords: string[]
}

export const KNOWLEDGE_BASE: Intent[] = [
  // -------------------------------
  // 1. Greeting & Introduction
  // -------------------------------
  {
    name: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
    aliases: ["sup", "yo", "hiya"],
    priority: 10,
    response: [
      `Hey there! I'm Flaggy, your flagpole expert. I can help you with product info, installation, troubleshooting, warranty questions, and more. What brings you here today?`,
      `Hi! Flaggy here - your friendly neighborhood flagpole specialist. Whether you need help choosing a flagpole, installing one, or troubleshooting an issue, I've got you covered. What can I help with?`,
      `Hello! Welcome to Atlantic Flagpole. I'm Flaggy, and I'm here to help with everything flagpole-related. Product questions? Installation help? Troubleshooting? Just ask!`,
    ],
    followUp: [
      "Tell me about Phoenix flagpoles",
      "Help with installation",
      "I need troubleshooting help",
      "Check warranty info",
    ],
    links: [
      {
        label: "Phoenix Premier Kit",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
    ],
  },

  // -------------------------------
  // 2. Product Overview & Specifications
  // -------------------------------
  {
    name: "product_overview",
    keywords: [
      "phoenix",
      "flagpole",
      "telescoping",
      "bundle",
      "kit",
      "premier",
      "what's included",
      "specs",
      "specifications",
      "features",
      "what do i get",
    ],
    aliases: ["tell me about", "what is", "describe"],
    priority: 9,
    response: `The Phoenix Telescoping Flagpole is America's #1 rated flagpole system. Here's what makes it special:

Built from aircraft-grade 6105-T5 anodized aluminum, 100% American-made, rated for 100 MPH winds. Available in 15', 20', and 25' heights.

The Premier Kit includes: fully assembled flagpole, premium American flag, heavy-duty ground sleeve with anti-theft lock, gold ball topper, Freedom Rings for 360° rotation, and our patented Securi-LOK interlocking system (no push buttons, no ropes, no hassle).

Backed by a lifetime warranty, 365-day home trial, 100 MPH wind guarantee, and anti-theft promise. The 20' model is our most popular choice for residential properties.`,
    followUp: [
      "Show me the Phoenix Premier Kit",
      "Help me choose the right height",
      "What's the installation process?",
      "Tell me about the warranty",
      "Show me pricing",
    ],
    links: [
      {
        label: "Phoenix Premier Kit",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
      { label: "Browse All Phoenix Flagpoles", url: "https://atlanticflagpole.vercel.app/" },
      { label: "Customer Reviews", url: "https://atlanticflagpole.com/pages/reviews" },
    ],
  },

  // -------------------------------
  // 3. Height Selection & Comparison
  // -------------------------------
  {
    name: "height_selection",
    keywords: [
      "height",
      "tall",
      "size",
      "15 foot",
      "20 foot",
      "25 foot",
      "which height",
      "how tall",
      "difference between",
      "compare",
    ],
    aliases: ["15'", "20'", "25'", "15ft", "20ft", "25ft"],
    priority: 8,
    response: `Here's how to choose the right height:

15' Phoenix: Best for smaller yards, townhomes, or properties under 1/4 acre. Uses a 3'x5' flag.

20' Phoenix (Most Popular): Perfect for standard residential properties 1/4 to 1/2 acre. Uses a 4'x6' flag. This is our #1 seller and the sweet spot for most homes.

25' Phoenix: Ideal for larger properties over 1/2 acre, farms, or commercial use. Uses a 5'x8' flag and is visible from a mile away.

Most residential customers choose the 20' model. It's tall enough to make a statement without overwhelming your property.`,
    followUp: [
      "Show me the 20' Premier Kit",
      "I have a large property, show me the 25'",
      "What about installation?",
      "Tell me about pricing",
    ],
    links: [
      {
        label: "20' Phoenix Premier Kit",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
    ],
  },

  // -------------------------------
  // 4. Installation & Setup
  // -------------------------------
  {
    name: "installation_help",
    keywords: [
      "install",
      "installation",
      "set up",
      "setup",
      "concrete",
      "cement",
      "mount",
      "hole",
      "base",
      "dig",
      "ground sleeve",
    ],
    aliases: ["how to install", "installing", "put it in"],
    priority: 9,
    response: `Installation takes about an hour plus concrete curing time. Here's the process:

1. Dig a hole 28" deep x 14" diameter (36" deep in cold climates below frost line)
2. Add 4-6" of gravel for drainage (12" in cold climates)
3. Insert the ground sleeve and level it perfectly
4. Pour concrete around the sleeve, keeping it level
5. Let cure for 24-48 hours
6. Insert your collapsed flagpole and extend section by section

You'll need: post hole digger, level, 2-3 bags of concrete mix, and gravel.

For cold climates (Canada, Alaska, northern states), the 36" depth with extra gravel prevents frost heave. This method has been proven for decades.`,
    followUp: ["How do I raise and lower it?", "What if a joint gets stuck?", "Tell me about winter care"],
    links: [
      { label: "Installation Guide", url: "https://atlanticflagpole.com/pages/faq#installation" },
      { label: "Installation Video", url: "https://atlanticflagpole.com/pages/faq#videos" },
    ],
  },

  // -------------------------------
  // 5. Operation — Raising & Lowering
  // -------------------------------
  {
    name: "operation_help",
    keywords: [
      "raise",
      "lower",
      "extend",
      "collapse",
      "won't move",
      "stuck",
      "securi-lok",
      "twist",
      "lock",
      "unlock",
      "how to use",
    ],
    aliases: ["put up", "take down", "operate"],
    priority: 9,
    response: `The Securi-LOK system is simple: no ropes, no pulleys, just lift and twist.

To raise: Start at the top section. Lift straight up until it stops, twist clockwise 1/4 turn to lock. Move to the next section down and repeat.

To lower: Start at the bottom section. Lift slightly to relieve pressure, twist counter-clockwise 1/4 turn to unlock, gently lower. Move to the next section up and repeat.

Pro tips: Temperature affects the nylon sleeves. Hot or humid weather can make them feel tight (this is normal). Never force it. Always lower from bottom to top to prevent stress on joints.

If a section feels stuck, bring the pole inside to a cool room for a few hours, or apply ice to the stuck joint for 15-20 minutes.`,
    followUp: [
      "Show me the operation video",
      "My pole is stuck, help!",
      "What about troubleshooting?",
      "Tell me about winter storage",
    ],
    links: [
      { label: "Operation Video", url: "https://atlanticflagpole.com/pages/faq#operation" },
      { label: "Troubleshooting Guide", url: "https://atlanticflagpole.com/pages/faq#troubleshooting" },
    ],
  },

  // -------------------------------
  // 6. Troubleshooting — Stuck Joints
  // -------------------------------
  {
    name: "troubleshooting_stuck_joint",
    keywords: [
      "stuck",
      "tight",
      "won't collapse",
      "won't extend",
      "locked",
      "jammed",
      "can't unlock",
      "won't twist",
      "frozen",
    ],
    aliases: ["stuck joint", "tight joint", "won't budge"],
    priority: 10,
    response: `Stuck joints are common and easily fixed. The nylon Securi-LOK sleeve expands in hot or humid weather, creating a tighter grip.

Quick fixes:

Method 1 (Best): Remove the pole from the ground sleeve. Bring it inside to an air-conditioned room for 2-4 hours. Try unlocking again.

Method 2 (Faster): Remove the pole and place ice directly on the stuck joint for 15-20 minutes. The cold contracts the nylon and frees it up.

Method 3: Lift the section slightly to relieve pressure, then twist left while gently pulling up.

Still stuck? We'll send you a free replacement Securi-LOK sleeve. Contact our support team with your pole finish (silver or bronze) and we'll ship it out.

Prevention: In hot climates, bring your pole in during extreme heat. Store it fully extended outdoors or fully collapsed indoors, never partially extended.`,
    followUp: [
      "Request replacement sleeve",
      "Connect me with support",
      "Send troubleshooting guide",
      "What about winter storage?",
    ],
    links: [
      { label: "Warranty & Replacement Parts", url: "https://atlanticflagpole.com/pages/warranty" },
      { label: "Contact Support", url: "https://atlanticflagpole.com/pages/contact" },
    ],
  },

  // -------------------------------
  // 7. Warranty & Guarantees
  // -------------------------------
  {
    name: "warranty_info",
    keywords: [
      "warranty",
      "guarantee",
      "return",
      "replacement",
      "forever",
      "lifetime",
      "claim",
      "365",
      "money back",
      "refund",
    ],
    aliases: ["warrantee", "garantee"],
    priority: 8,
    response: `Our guarantees are industry-leading:

Lifetime Warranty: Every Phoenix flagpole comes with a lifetime warranty on all components. If something breaks, we replace it. You only cover shipping.

100 MPH Wind Guarantee: Rated for hurricane-force winds. If it fails in high winds (with proper flag size), we replace it.

365-Day Home Trial: Try your Phoenix for a full year risk-free. Not satisfied? Full refund.

Anti-Theft Promise: If your Phoenix gets stolen, we replace it at a significant discount.

Flag Warranty: 6-month warranty on all full-price flags. Use code FLAGTEN for 10% off replacements.

To file a claim: Visit our warranty center, fill out the form with photos if needed, and we'll walk you through troubleshooting. If replacement is needed, we ship it ASAP.

We're a small family business that stands behind every product.`,
    followUp: [
      "Start a warranty claim",
      "Show me the warranty center",
      "Tell me about flag warranty",
      "What's covered under lifetime warranty?",
    ],
    links: [
      { label: "Warranty Center", url: "https://atlanticflagpole.com/pages/warranty" },
      { label: "Flag VIP Registration", url: "https://atlanticflagpole.com/flag-vip" },
      { label: "Contact Support", url: "https://atlanticflagpole.com/pages/contact" },
    ],
  },

  // -------------------------------
  // 8. Pricing & Deals
  // -------------------------------
  {
    name: "pricing_questions",
    keywords: [
      "price",
      "cost",
      "how much",
      "expensive",
      "cheap",
      "deal",
      "sale",
      "discount",
      "coupon",
      "promo",
      "special",
    ],
    aliases: ["$", "dollar", "payment"],
    priority: 8,
    response: `Phoenix Flagpole pricing:

15' Kit: $299-$349
20' Kit: $349-$399 (Most Popular)
25' Kit: $449-$499

Premier Kit Starter Bundle (Best Value): Includes everything - flagpole, flag, ground sleeve, topper, accessories, and free shipping. Usually $399-$449 for the 20' model.

Why Phoenix costs more: 100% American-made, aircraft-grade aluminum, lifetime warranty, no maintenance (no rust, no painting), and 365-day trial.

Current deals: We run frequent promotions on Skip Bedell's Special Bundles, holiday sales (July 4th, Memorial Day, Veterans Day), and seasonal discounts.

Save more: Use code FLAGTEN for 10% off flags. Check our specials page or sign up for our email list for exclusive deals.

A cheap $50 flagpole from a big box store will rust and break in 1-2 years. A Phoenix lasts a lifetime, making it more affordable long-term.`,
    followUp: [
      "Show me current deals",
      "What's included in the Premier Kit?",
      "Do you have payment plans?",
      "Show me Skip's specials",
    ],
    links: [
      {
        label: "Phoenix Premier Kit (Best Value)",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
      { label: "Current Deals & Specials", url: "https://atlanticflagpole.com/pages/cyber-monday" },
    ],
  },

  // -------------------------------
  // 9. Flags & Accessories
  // -------------------------------
  {
    name: "flag_questions",
    keywords: [
      "flag",
      "fray",
      "flag wear",
      "flag warranty",
      "replacement flag",
      "nylon",
      "polyester",
      "flag size",
      "which flag",
    ],
    aliases: ["american flag", "usa flag", "stars and stripes"],
    priority: 7,
    response: `Flags are wearable items that battle wind, sun, and weather constantly.

Expected lifespan:
- Coastal/high-wind areas: 3-6 months
- Moderate climates: 6-12 months
- Protected areas: 12-18 months

Nylon vs Polyester:

Nylon: Lightweight, flies beautifully in light winds, vibrant colors. Best for moderate climates. Lasts 6-12 months.

Polyester (Heavy-Duty): Heavier, more durable, better for high-wind and coastal areas. Resists fading and fraying longer. Lasts 12-18 months. Recommended for tough climates.

Flag sizes:
- 15' Phoenix: 3'x5' flag
- 20' Phoenix: 4'x6' flag
- 25' Phoenix: 5'x8' flag

Care tips: Bring it in during severe weather, replace when frayed, wash occasionally, store properly when not in use.

Flag warranty: 6-month warranty on full-price flags. Use code FLAGTEN for 10% off replacements. Register at Flag VIP for extended benefits.`,
    followUp: [
      "Show me polyester flags",
      "I need a replacement flag",
      "Tell me about solar lights",
      "Register for Flag VIP",
    ],
    links: [
      { label: "Premium Polyester Flags", url: "https://atlanticflagpole.com/collections/usa-flags" },
      { label: "Flag VIP Registration", url: "https://atlanticflagpole.com/flag-vip" },
      { label: "Solar Flagpole Lights", url: "https://atlanticflagpole.com/collections/flagpole-lighting" },
    ],
  },

  // -------------------------------
  // 10. Shipping & Delivery
  // -------------------------------
  {
    name: "shipping_info",
    keywords: [
      "shipping",
      "delivery",
      "track",
      "order",
      "where is my order",
      "arrival",
      "when will it arrive",
      "tracking",
      "fedex",
      "ups",
    ],
    aliases: ["ship", "deliver", "tracking number"],
    priority: 7,
    response: `Shipping details:

Flagpoles: Ship via FedEx or UPS Ground
Accessories: Ship separately via USPS
Processing: 1-3 business days
Delivery: 3-7 business days after processing
Cost: FREE SHIPPING on most Phoenix kits

What to expect:
1. Order confirmation email immediately
2. Processing (1-3 days)
3. Shipping notification with tracking
4. Delivery to your door (signature required)
5. Accessories follow separately

Important: No PO Boxes (flagpoles are too large). Someone must be home to sign. Accessories ship separately.

We ship to all 50 states. Alaska and Hawaii may have longer delivery times. International shipping available (contact us for quote).

Need to track your order? Use the tracking link in your shipping confirmation email or contact us with your order number.`,
    followUp: [
      "Track my order",
      "When will my order arrive?",
      "I haven't received tracking info",
      "Contact customer service",
    ],
    links: [
      { label: "Order Status & Tracking", url: "https://atlanticflagpole.com/pages/contact" },
      { label: "Shipping FAQ", url: "https://atlanticflagpole.com/pages/faq#shipping" },
    ],
  },

  // -------------------------------
  // 11. Winter Care & Maintenance
  // -------------------------------
  {
    name: "winter_guidelines",
    keywords: ["winter", "freeze", "snow", "cold", "frost", "heave", "frost line", "ice", "frozen", "winter storage"],
    aliases: ["winterize", "cold weather"],
    priority: 7,
    response: `Winter care for your Phoenix:

Storage options:

Option 1 - Leave it up (fully extended): Best for mild to moderate winters. Use the red sleeve cap to block snow and debris. The flag can stay up but may wear faster in harsh conditions.

Option 2 - Bring it inside (fully collapsed): Best for harsh winters. Collapse completely and store indoors (garage, basement). This extends lifespan and prevents weather issues.

Never leave it partially extended outdoors or collapsed in the ground sleeve (moisture can get trapped).

Frost heave prevention (cold climates): Dig 36" deep below frost line. Add 12" of gravel at the bottom for drainage. This prevents frost heave and keeps your sleeve stable.

Winter maintenance: Check the ground sleeve for shifting, inspect for ice buildup, bring the flag in during severe weather, use the sleeve cap.

Temperature issues: Stuck joints in cold? Bring the pole inside to warm up. Ice on the pole? Let it thaw naturally. Snow in the sleeve? Use the red cap.

Spring prep: Inspect for winter damage, clean with mild soap and water, check all joints and locks, replace worn flags.`,
    followUp: [
      "Send winter care guide",
      "What about frost heave?",
      "Should I take my flag down in winter?",
      "How do I clean my Phoenix?",
    ],
    links: [
      { label: "Winter Care Guide", url: "https://atlanticflagpole.com/pages/faq#winter" },
      { label: "Installation for Cold Climates", url: "https://atlanticflagpole.com/pages/faq#installation" },
    ],
  },

  // -------------------------------
  // 12. Thank You / Closing
  // -------------------------------
  {
    name: "thank_you",
    keywords: ["thank you", "thanks", "appreciate", "helpful", "great", "awesome", "perfect"],
    aliases: ["thx", "ty", "thank u"],
    priority: 5,
    response: `You're welcome! Happy to help. We're a small family business and every Phoenix owner becomes part of our extended family. If you need anything else - troubleshooting, parts, or just want to chat about flagpoles - we're here for you.

Before you go: Register your warranty to activate all benefits, check out our solar lights and premium flags, or sign up for our email list for exclusive deals.

Is there anything else I can help with?`,
    followUp: ["Show me solar lights", "Current deals", "Register warranty", "I'm all set"],
    links: [
      { label: "Register Warranty", url: "https://atlanticflagpole.com/pages/warranty" },
      { label: "Solar Lights", url: "https://atlanticflagpole.com/collections/flagpole-lighting" },
    ],
  },

  // -------------------------------
  // 13. Customer Orders
  // -------------------------------
  {
    name: "order_status",
    keywords: ["my order", "order status", "where is my order", "track order", "order number", "purchase", "bought"],
    aliases: ["tracking", "shipment"],
    priority: 9,
    response: [
      `I'd love to help you track your order! To check your order status, I'll need your order number or email address.

You can also:
• Check your email for tracking info (it's sent when your order ships)
• Visit our order tracking page
• Contact our support team for personalized help

Do you have your order number handy?`,
      `Let's get your order tracked down! I can help you find out where your flagpole is.

To check your order:
• Use the tracking link in your shipping confirmation email
• Visit our order status page with your order number
• Contact support if you need help

What's your order number?`,
    ],
    followUp: ["I have my order number", "I didn't get tracking info", "Contact support", "When will it arrive?"],
    links: [
      { label: "Track Your Order", url: "https://atlanticflagpole.com/pages/contact" },
      { label: "Contact Support", url: "https://atlanticflagpole.com/pages/contact" },
    ],
  },
]

export function matchIntent(message: string): IntentMatch | null {
  const lower = message.toLowerCase().trim()

  // Check for human escalation first
  const humanKeywords = [
    "human",
    "person",
    "agent",
    "representative",
    "talk to someone",
    "speak to someone",
    "real person",
    "customer service",
    "call me",
  ]
  if (humanKeywords.some((k) => lower.includes(k))) return null

  const matches: IntentMatch[] = []

  for (const intent of KNOWLEDGE_BASE) {
    let score = 0
    const matchedKeywords: string[] = []

    // Check primary keywords
    for (const keyword of intent.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        score += 10
        matchedKeywords.push(keyword)
      }
    }

    // Check aliases
    if (intent.aliases) {
      for (const alias of intent.aliases) {
        if (lower.includes(alias.toLowerCase())) {
          score += 5
          matchedKeywords.push(alias)
        }
      }
    }

    // Apply priority multiplier
    if (intent.priority) {
      score *= intent.priority / 10
    }

    // Bonus for exact matches
    if (intent.keywords.some((k) => lower === k.toLowerCase())) {
      score += 20
    }

    if (score > 0) {
      matches.push({ intent, score, matchedKeywords })
    }
  }

  if (matches.length === 0) return null

  matches.sort((a, b) => b.score - a.score)
  return matches[0]
}

export function matchMultipleIntents(message: string, limit = 3): IntentMatch[] {
  const lower = message.toLowerCase().trim()
  const matches: IntentMatch[] = []

  for (const intent of KNOWLEDGE_BASE) {
    let score = 0
    const matchedKeywords: string[] = []

    for (const keyword of intent.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        score += 10
        matchedKeywords.push(keyword)
      }
    }

    if (intent.aliases) {
      for (const alias of intent.aliases) {
        if (lower.includes(alias.toLowerCase())) {
          score += 5
          matchedKeywords.push(alias)
        }
      }
    }

    if (intent.priority) {
      score *= intent.priority / 10
    }

    if (score > 0) {
      matches.push({ intent, score, matchedKeywords })
    }
  }

  matches.sort((a, b) => b.score - a.score)
  return matches.slice(0, limit)
}

export function getRandomResponse(intent: Intent): string {
  if (Array.isArray(intent.response)) {
    const randomIndex = Math.floor(Math.random() * intent.response.length)
    return intent.response[randomIndex]
  }
  return intent.response
}
