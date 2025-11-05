export interface Intent {
  name: string
  keywords: string[]
  response: string
  followUp?: string[]
  links?: { label: string; url: string }[] // Added links property for product URLs
}

export const KNOWLEDGE_BASE: Intent[] = [
  // -------------------------------
  // 1. Greeting & Introduction
  // -------------------------------
  {
    name: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    response: `
Hello and welcome to **Atlantic Flag & Pole** — home of the **Phoenix Telescoping Flagpole**, America's #1 rated flagpole system.  
I'm **Flaggy**, your digital flagpole expert.  
Whether you're looking to **buy**, **install**, or **repair**, I'll guide you step-by-step and get you squared away with confidence.  
What can I help you with today — a product question, installation, or an issue with your current flagpole?
    `,
    followUp: ["Show me the Premier Kit", "Help me with installation", "I need warranty support"],
    links: [
      {
        label: "Phoenix Premier Kit Starter Bundle",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
    ],
  },

  // -------------------------------
  // 2. Product Knowledge
  // -------------------------------
  {
    name: "product_overview",
    keywords: ["phoenix", "flagpole", "telescoping", "bundle", "kit", "premier", "what's included"],
    response: `
The **Phoenix Telescoping Flagpole** is proudly **American-made** using **aircraft-grade 6105-T5 anodized aluminum** — designed to withstand winds up to **100 mph** with zero rust, zero corrosion, and no need for painting.  

Every Phoenix includes:
• Fully assembled telescoping flagpole (15', 20', or 25')  
• American flag (3'x5' or 4'x6' depending on height)  
• ABS plastic ground sleeve and anti-theft locking clamp  
• 3" Gold Ball topper  
• Freedom Rings for 360° flag rotation  
• Securi-LOK™ interlocking sleeves — no push buttons or ropes  
• Lifetime Warranty + 365-Day Home Trial  

Our most popular model is the **Phoenix Premier Kit Starter Bundle**, featuring free shipping and a full accessory set.  
    `,
    followUp: ["Show me that bundle", "Tell me about installation", "What's the warranty like?"],
    links: [
      {
        label: "Premier Kit Starter Bundle",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
      { label: "All Phoenix Flagpoles", url: "https://atlanticflagpole.vercel.app/" },
    ],
  },

  // -------------------------------
  // 3. Installation & Setup
  // -------------------------------
  {
    name: "installation_help",
    keywords: ["install", "installation", "set up", "concrete", "cement", "mount", "hole", "base"],
    response: `
Installing your Phoenix Flagpole is straightforward and only takes about an hour.

**Recommended Steps:**
1. Dig a 28" deep x 14" diameter hole (or 3' deep in frost regions like Canada).  
2. Add 4–6" of gravel for drainage.  
3. Insert ground sleeve and level it.  
4. Pour concrete around the sleeve and allow 24–48 hours to cure.  
5. Once cured, insert the flagpole (collapsed) and ensure level.  

**Cold-Climate Tip:**  
In areas like Ontario or Alaska, a 3' hole with 1' gravel at the base prevents frost heave — this method has proven reliable over decades of installations.

Would you like me to send you the full illustrated install PDF and video?
    `,
    followUp: ["Send installation guide", "Show me winter instructions"],
    links: [{ label: "Phoenix Installation Guide (PDF)", url: "https://atlanticflagpole.com/pages/faq#installation" }],
  },

  // -------------------------------
  // 4. Operation — Raising & Lowering
  // -------------------------------
  {
    name: "operation_help",
    keywords: ["raise", "lower", "won't move", "stuck", "securi-lok", "twist", "collapse"],
    response: `
Your Phoenix Flagpole operates using our **Securi-LOK™ Interlocking Sleeve System** — no push buttons or ropes.

**To Raise:**
• Start at the top section  
• Lift it fully until it stops, then twist right to lock  
• Repeat downward until all sections are locked  

**To Lower:**
• Start from the bottom  
• Lift slightly, twist left to unlock, then lower carefully  

If the pole feels tight, it's likely temperature-related expansion. Bring it indoors for a few hours or cool the joint with ice.  
Never force the sections — the Securi-LOK system will free up once the temperature normalizes.
    `,
    followUp: ["Send me the operation video", "Show me how to fix a stuck joint"],
    links: [{ label: "Operation Video", url: "https://atlanticflagpole.com/pages/faq#operation" }],
  },

  // -------------------------------
  // 5. Troubleshooting
  // -------------------------------
  {
    name: "troubleshooting_stuck_joint",
    keywords: ["stuck", "tight", "won't collapse", "won't extend", "locked", "jammed"],
    response: `
A tight lower joint is often caused by the nylon 3.0" Securi-LOK sleeve expanding slightly in hot or humid conditions.  
Here's what to do:

1. Remove the flagpole from its sleeve.  
2. Move it into a cool, air-conditioned space for several hours.  
3. Or place a bag of ice directly on the stuck joint for 15–20 minutes.  
4. Once cooled, try unlocking the joint again — it should release easily.  

If you're still stuck, we'll send a replacement 3.0" interlocking sleeve **free of charge** (PC/PBT version for silver poles, modified nylon for bronze).  
    `,
    followUp: ["Start replacement request", "Send me sleeve replacement instructions"],
    links: [{ label: "Securi-LOK Replacement Guide", url: "https://atlanticflagpole.com/pages/warranty" }],
  },

  // -------------------------------
  // 6. Warranty & Claims
  // -------------------------------
  {
    name: "warranty_info",
    keywords: ["warranty", "guarantee", "return", "replacement", "forever", "claim", "365"],
    response: `
Your Phoenix Flagpole includes:
• **Lifetime Warranty** on all flagpoles  
• **100 MPH Wind Guarantee** (with 4x6 or smaller flag)  
• **365-Day Home Trial** — try it risk-free for a full year  

If you ever experience damage or a malfunction, our small family business will cover replacement parts — you only cover shipping.  
To start a claim, we'll walk you through our online form, which includes troubleshooting videos and part ID charts.  
    `,
    followUp: ["Start warranty claim", "Show me the process"],
    links: [{ label: "Warranty Center", url: "https://atlanticflagpole.com/pages/warranty" }],
  },

  // -------------------------------
  // 7. Flags & Accessories
  // -------------------------------
  {
    name: "flag_questions",
    keywords: ["flag", "fray", "flag wear", "flag warranty", "replacement flag", "nylon", "polyester"],
    response: `
Flags are wearable items, and lifespan varies based on wind exposure and climate.  
We recommend switching to a **polyester blend flag** for coastal or high-wind regions — it's heavier and more durable than nylon.  

We offer a **6-month warranty** on all full-price flags and provide discounts on replacements.  

Use code **FLAGTEN** for 10% off your next flag purchase.  
    `,
    followUp: ["Show me the polyester flag", "Where do I register my flag warranty?"],
    links: [
      {
        label: "Poly Extra US Flag",
        url: "https://atlanticflagpole.com/collections/usa-flags/products/poly-extra-us-flag",
      },
      { label: "Flag Warranty Registration", url: "https://atlanticflagpole.com/flag-vip" },
    ],
  },

  // -------------------------------
  // 8. Shipping & Tracking
  // -------------------------------
  {
    name: "shipping_info",
    keywords: ["shipping", "delivery", "track", "order", "where is my order", "arrival"],
    response: `
Flagpoles ship **free** via FedEx or UPS (1–3 days handling, 3–7 days delivery).  
Accessories ship separately via USPS.  

Each package includes tracking info by email once shipped.  
Note: Flagpoles cannot ship to PO Boxes — please use a physical address.
    `,
    followUp: ["Track my order", "Contact customer service"],
  },

  // -------------------------------
  // 9. Maintenance & Winter Care
  // -------------------------------
  {
    name: "winter_guidelines",
    keywords: ["winter", "freeze", "snow", "cold", "frost", "heave", "frost line"],
    response: `
Your Phoenix Flagpole is an **all-weather** design — but winter care is key:  

• Always leave the pole **fully extended outdoors**  
• Or remove it completely and store it inside — never leave collapsed outdoors  
• Use the **red sleeve cap** to block snow and debris  
• For cold climates, dig 3 feet with 1 foot gravel at the bottom for proper drainage  

This method has prevented frost heave for years in areas like Alaska and Ontario.
    `,
    followUp: ["Show me installation for frost regions", "Winter care video"],
    links: [{ label: "Winter Guidelines", url: "https://atlanticflagpole.com/pages/faq#winter" }],
  },

  // -------------------------------
  // 10. Thank You / End Chat
  // -------------------------------
  {
    name: "thank_you",
    keywords: ["thank you", "thanks", "appreciate", "helpful"],
    response: `
You're very welcome! We're honored to help you keep your American flag flying proudly.  
Would you like to see our current Phoenix deals or learn about solar light add-ons?
    `,
    followUp: ["Show me deals", "Tell me about solar lights"],
    links: [
      {
        label: "Phoenix Premier Kit",
        url: "https://atlanticflagpole.vercel.app/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      },
    ],
  },
]

export function matchIntent(message: string): Intent | null {
  const lower = message.toLowerCase()
  const humanKeywords = ["human", "person", "agent", "representative", "talk to someone", "speak to someone"]
  if (humanKeywords.some((k) => lower.includes(k))) return null

  for (const intent of KNOWLEDGE_BASE) {
    if (intent.keywords.some((k) => lower.includes(k))) return intent
  }

  return null
}
