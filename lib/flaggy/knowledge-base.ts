export interface Intent {
  name: string
  keywords: string[]
  response: string
  followUp?: string[]
  links?: { label: string; url: string }[]
  priority?: number // Higher priority intents match first
  aliases?: string[] // Alternative phrasings
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
    response: `
Hey there! 👋 Welcome to **Atlantic Flag & Pole** — home of the legendary **Phoenix Telescoping Flagpole**, proudly holding the title of America's #1 rated flagpole system.

I'm **Flaggy**, your friendly neighborhood flagpole expert (yes, that's a real thing, and yes, I love my job! 🇺🇸).

Whether you're looking to **buy your first Phoenix**, **install like a pro**, or **troubleshoot** a stubborn joint, I've got your six. I can help with:
• Product recommendations and comparisons
• Step-by-step installation guidance
• Troubleshooting and repairs
• Warranty claims and support
• Flag care and accessories

**So, what brings you here today?** Got a question about our flagpoles, need help with an installation, or just want to chat about Old Glory?
    `,
    followUp: [
      "Show me the Phoenix Premier Kit",
      "Help me choose the right height",
      "I need installation help",
      "Tell me about your warranty",
    ],
    links: [
      {
        label: "Phoenix Premier Kit Starter Bundle",
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
    response: `
Ah, the **Phoenix Telescoping Flagpole** — let me tell you why this beauty is America's favorite! 🦅

**Built Like a Tank (But Lighter):**
• **100% American-made** using **aircraft-grade 6105-T5 anodized aluminum**
• Rated for winds up to **100 MPH** (that's hurricane-force, folks!)
• **Zero rust, zero corrosion, zero maintenance** — no painting, ever
• Available in **15', 20', and 25'** heights (most folks go with 20')

**What's in the Box:**
✓ Fully assembled telescoping flagpole (ready to fly!)
✓ Premium American flag (3'x5' or 4'x6' depending on height)
✓ Heavy-duty ABS ground sleeve with anti-theft locking clamp
✓ 3" Gold Ball topper (because your flag deserves to shine)
✓ Freedom Rings for 360° flag rotation (no tangling!)
✓ **Securi-LOK™ interlocking sleeves** — our patented system means **no push buttons, no ropes, no hassle**

**The Guarantees That Matter:**
• **Lifetime Warranty** on the flagpole (yes, lifetime!)
• **365-Day Home Trial** — try it for a full year, risk-free
• **100 MPH Wind Guarantee** — we've got you covered
• **Anti-Theft Promise** — if it gets stolen, we'll replace it

Our **Phoenix Premier Kit Starter Bundle** is the most popular choice — it includes everything above PLUS free shipping and a full accessory set. It's basically the "I want it all" package, and honestly? That's the smart move.

**Want to see it in action?** I can show you installation videos, customer reviews, or walk you through choosing the perfect height for your home.
    `,
    followUp: [
      "Show me the Premier Bundle",
      "Help me choose the right height",
      "What's the difference between 20' and 25'?",
      "Tell me about installation",
    ],
    links: [
      {
        label: "Phoenix Premier Kit Starter Bundle",
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
    response: `
Great question! Choosing the right height is all about **visibility** and **your property size**. Here's the breakdown:

**15' Phoenix** — The Compact Patriot
• Perfect for: Smaller yards, townhomes, RVs, or close-to-street installations
• Flag size: 3'x5'
• Visibility: Great for neighbors and passersby
• Best for: Properties under 1/4 acre

**20' Phoenix** — The Sweet Spot (Most Popular!)
• Perfect for: Standard residential properties, suburban homes
• Flag size: 4'x6'
• Visibility: Visible from several blocks away
• Best for: Properties 1/4 to 1/2 acre
• **This is our #1 seller** — it's the Goldilocks height (just right!)

**25' Phoenix** — The Statement Maker
• Perfect for: Larger properties, farms, businesses, or "I want everyone to see this" situations
• Flag size: 5'x8'
• Visibility: Visible from a mile away (seriously!)
• Best for: Properties over 1/2 acre or commercial use

**Pro Tip:** Most residential customers go with the **20' model** — it's tall enough to make a statement but not so tall that it overwhelms your property. Plus, the 4'x6' flag is the perfect size for most homes.

**Still not sure?** Tell me about your property (yard size, location, etc.) and I'll help you nail down the perfect height!
    `,
    followUp: [
      "Show me the 20' Premier Kit",
      "I have a large property, show me the 25'",
      "What if I want to upgrade later?",
    ],
    links: [
      {
        label: "20' Phoenix Premier Kit (Most Popular)",
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
    response: `
Installing your Phoenix is easier than you think — most folks knock it out in about an hour (plus concrete curing time). Let me walk you through it:

**What You'll Need:**
• Post hole digger or auger
• Level
• Concrete mix (about 2-3 bags)
• Gravel (for drainage)
• A cold beverage (optional but recommended 🍺)

**Step-by-Step Installation:**

**1. Dig the Hole**
• **Standard depth:** 28" deep x 14" diameter
• **Cold climates** (frost line areas): 36" deep to prevent frost heave
• **Pro tip:** In places like Canada, Alaska, or northern states, go deeper!

**2. Add Drainage**
• Pour 4-6" of gravel at the bottom
• This prevents water from pooling and causing issues

**3. Insert the Ground Sleeve**
• Place the ABS ground sleeve in the hole
• Use a level to make sure it's perfectly vertical (this is important!)
• The top should be about 1" above ground level

**4. Pour Concrete**
• Mix and pour concrete around the sleeve
• Keep checking that level — you want it straight!
• Smooth the top and create a slight slope away from the sleeve (for water runoff)

**5. Wait for It...**
• Let concrete cure for **24-48 hours** (I know, the anticipation is killing you!)
• Don't rush this — good things come to those who wait

**6. Install Your Phoenix**
• Once cured, insert your flagpole (collapsed) into the sleeve
• Extend it section by section using the Securi-LOK system
• Attach your flag and raise that beauty!

**Cold Climate Special Note:**
If you're in a frost-prone area (Ontario, Minnesota, Alaska, etc.), dig that 36" hole with 12" of gravel at the bottom. This method has been battle-tested for decades and prevents frost heave like a champ.

**Want the visual guide?** I can send you our illustrated PDF and video walkthrough — seeing it makes it even easier!
    `,
    followUp: [
      "Send me the installation PDF",
      "Show me the installation video",
      "What about winter installation?",
      "I need help with the Securi-LOK system",
    ],
    links: [
      { label: "Installation Guide (PDF)", url: "https://atlanticflagpole.com/pages/faq#installation" },
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
    response: `
The **Securi-LOK™ system** is what makes the Phoenix so special — no ropes, no pulleys, no push buttons. Just lift, twist, and lock. Here's how it works:

**Raising Your Phoenix (Extending):**

1. **Start at the top section** (the smallest one)
2. **Lift it straight up** until it stops (you'll feel it hit the stop)
3. **Twist clockwise (right)** about 1/4 turn to lock it in place
4. **Move to the next section down** and repeat
5. Continue until all sections are extended and locked

**Think of it like this:** Lift → Twist Right → Lock. Repeat down the pole.

**Lowering Your Phoenix (Collapsing):**

1. **Start at the bottom section** (the largest one)
2. **Lift it slightly** to take pressure off the lock
3. **Twist counter-clockwise (left)** about 1/4 turn to unlock
4. **Gently lower** the section down
5. **Move to the next section up** and repeat

**Think of it like this:** Lift → Twist Left → Lower. Repeat up the pole.

**Pro Tips:**
• **Temperature matters!** If it's hot or humid, the nylon sleeves can expand slightly and feel tight. This is normal!
• **Never force it** — if a section feels stuck, see my troubleshooting tips below
• **The first few times** might feel a bit stiff, but it'll smooth out with use
• **Always lower from bottom to top** — this prevents stress on the joints

**Feeling stuck?** If a joint won't budge, bring the pole inside to a cool room for a few hours, or put ice on the stuck joint for 15-20 minutes. The temperature change will free it right up!

**Want to see it in action?** I can show you our operation video — it's way easier to understand when you see it!
    `,
    followUp: [
      "Show me the operation video",
      "My pole is stuck, help!",
      "What if it's too tight?",
      "Send troubleshooting guide",
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
    response: `
Ah, the dreaded stuck joint! Don't worry — this is actually a common (and easily fixable) issue. Here's what's happening and how to fix it:

**Why It Happens:**
The Securi-LOK™ system uses a **nylon interlocking sleeve** that can expand slightly in hot or humid weather. When it expands, it grips tighter — which is great for security, but not so great when you're trying to lower your pole!

**The Fix (Works 99% of the Time):**

**Method 1: The Cool-Down Trick**
1. Remove the entire flagpole from the ground sleeve
2. Bring it inside to an air-conditioned room
3. Let it sit for 2-4 hours (overnight is even better)
4. Try unlocking the joint again — it should release easily!

**Method 2: The Ice Pack Method** (Faster!)
1. Remove the pole from the ground sleeve
2. Place a bag of ice directly on the stuck joint
3. Wait 15-20 minutes
4. Try unlocking — the cold contracts the nylon and frees it up

**Method 3: The Gentle Persuasion**
1. Lift the section slightly to relieve pressure
2. Try twisting left while gently pulling up
3. Sometimes a little wiggle helps!

**Still Stuck?** No problem! We'll send you a **free replacement Securi-LOK sleeve** — just reach out to our support team. We've got:
• **PC/PBT version** for silver/natural finish poles
• **Modified nylon version** for bronze/midnight bronze poles

**Prevention Tips:**
• If you live in a hot/humid climate, consider bringing your pole in during extreme heat
• Store it fully extended outdoors, or fully collapsed indoors — never leave it partially extended
• The sleeve will "break in" over time and become easier to operate

**Need more help?** I can connect you with our support team, or send you the detailed troubleshooting guide with photos!
    `,
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
    response: `
Let me tell you about our **legendary guarantees** — because we don't just sell flagpoles, we stand behind them like they're family:

**🛡️ Lifetime Warranty**
• **Every Phoenix flagpole** comes with a **lifetime warranty** on all components
• If something breaks or malfunctions (and it rarely does), we'll replace it
• You only cover shipping — we cover the parts
• No fine print, no gotchas — just a promise from our small family business

**💨 100 MPH Wind Guarantee**
• Your Phoenix is rated for winds up to **100 MPH** (that's hurricane-force!)
• If it fails in high winds (with a 4'x6' or smaller flag), we'll replace it
• We've had Phoenix poles survive tornadoes — seriously!

**🏠 365-Day Home Trial**
• Try your Phoenix for a **full year** — risk-free
• If you're not absolutely thrilled, return it for a full refund
• That's 365 days to fall in love with it (spoiler: you will!)

**🔒 Anti-Theft Promise**
• If your Phoenix gets stolen, we'll replace it at a **significant discount**
• Because nobody should have to go without their flag

**🇺🇸 Flag Warranty**
• **6-month warranty** on all full-price flags
• Discounts on replacement flags (use code **FLAGTEN** for 10% off!)
• Register your flag at our Flag VIP program for extended benefits

**How to File a Claim:**
1. Visit our warranty center (I can send you the link!)
2. Fill out the simple online form
3. Include photos if needed
4. We'll walk you through troubleshooting
5. If a replacement is needed, we'll ship it ASAP

**The Atlantic Difference:**
We're a small, family-owned business that actually cares. When you call, you talk to real people who know flagpoles inside and out. We're not some faceless corporation — we're your neighbors, and we've got your back.

**Need to start a claim?** I can walk you through it right now!
    `,
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
    response: `
Great question! Let's talk investment (because that's what a Phoenix is — an investment in quality and pride 🇺🇸).

**Phoenix Flagpole Pricing:**
• **15' Phoenix Kit:** Starting around $299-$349
• **20' Phoenix Kit:** Starting around $349-$399 (Most Popular!)
• **25' Phoenix Kit:** Starting around $449-$499

**Premier Kit Starter Bundle** (The Best Value!):
• Includes EVERYTHING: Flagpole, flag, ground sleeve, topper, accessories
• **Free shipping** (that's a $50+ value right there!)
• Usually priced around $399-$449 for the 20' model
• **This is our #1 seller** — it's the complete package

**Why Phoenix Costs More (And Why It's Worth It):**
• **100% American-made** (not cheap imports)
• **Aircraft-grade aluminum** (the good stuff)
• **Lifetime warranty** (buy once, fly forever)
• **No maintenance** (no painting, no rust, no hassle)
• **365-day trial** (risk-free!)

**Current Deals & Specials:**
We frequently run promotions on:
• Skip Bedell's Special Bundles
• Holiday sales (July 4th, Memorial Day, Veterans Day)
• Seasonal discounts
• Bundle deals with accessories

**Want to save even more?**
• Use code **FLAGTEN** for 10% off flags
• Check out our current specials page
• Sign up for our email list for exclusive deals

**The Bottom Line:**
A cheap $50 flagpole from a big box store will rust, break, and need replacing in 1-2 years. A Phoenix lasts a lifetime. Do the math — it's actually the more affordable option in the long run!

**Ready to see our current deals?** I can show you what's on sale right now!
    `,
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
    response: `
Ah, flags — the heart and soul of your flagpole! Let's talk about keeping Old Glory flying proud:

**Flag Lifespan (The Real Talk):**
Flags are **wearable items** — they're constantly battling wind, sun, rain, and weather. Here's what to expect:
• **Coastal/high-wind areas:** 3-6 months
• **Moderate climates:** 6-12 months
• **Protected areas:** 12-18 months

**Nylon vs. Polyester — The Showdown:**

**Nylon Flags** (Standard)
• Lightweight and flies beautifully in light winds
• Vibrant colors
• Best for: Moderate climates, residential use
• Lifespan: 6-12 months

**Polyester Flags** (Heavy-Duty)
• Heavier and more durable
• Better for high-wind and coastal areas
• Resists fading and fraying longer
• Best for: Coastal areas, high-wind zones, commercial use
• Lifespan: 12-18 months
• **Recommended for Phoenix owners in tough climates!**

**Flag Sizes for Your Phoenix:**
• **15' Phoenix:** 3'x5' flag
• **20' Phoenix:** 4'x6' flag (most common)
• **25' Phoenix:** 5'x8' flag

**Flag Care Tips:**
• **Bring it in during severe weather** (if possible)
• **Don't fly a tattered flag** — replace it when it starts fraying
• **Wash it occasionally** (yes, you can wash flags!)
• **Store properly** when not in use (fold it respectfully)

**Flag Warranty:**
• **6-month warranty** on all full-price flags
• Register at our **Flag VIP program** for extended benefits
• Use code **FLAGTEN** for 10% off replacement flags

**Accessories to Consider:**
• **Solar lights** — illuminate your flag 24/7 (code requires it!)
• **Flag storage case** — keep your flag pristine
• **Extra flags** — rotate them to extend lifespan

**Need a replacement flag?** I can show you our selection of premium American flags, including the heavy-duty polyester options!
    `,
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
    response: `
Let's get your Phoenix to you ASAP! Here's the shipping scoop:

**Shipping Details:**
• **Flagpoles:** Ship via **FedEx or UPS Ground**
• **Accessories:** Ship separately via **USPS**
• **Processing time:** 1-3 business days
• **Delivery time:** 3-7 business days (after processing)
• **Cost:** **FREE SHIPPING** on most Phoenix kits! 🎉

**What to Expect:**
1. **Order confirmation** — You'll get an email right away
2. **Processing** — We prep your Phoenix (1-3 days)
3. **Shipping notification** — You'll get tracking info via email
4. **Delivery** — FedEx/UPS will deliver to your door
5. **Accessories follow** — They ship separately via USPS

**Important Notes:**
• **No PO Boxes** — Flagpoles are too large for PO Boxes (use a physical address!)
• **Signature required** — Someone needs to be home to sign
• **Separate shipments** — Don't panic if accessories arrive separately
• **Track your order** — Use the tracking number in your email

**Shipping Restrictions:**
• We ship to all 50 states
• Alaska & Hawaii may have longer delivery times
• International shipping available (contact us for quote)

**Order Status:**
• **Processing:** We're getting it ready
• **Shipped:** It's on the way!
• **Out for Delivery:** It'll arrive today
• **Delivered:** Enjoy your Phoenix!

**Need to track your order?** Give me your order number and I can help you check the status, or you can use the tracking link in your shipping confirmation email!
    `,
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
    response: `
Winter is coming (or already here!), and your Phoenix needs a little TLC to handle the cold like a champ. Here's your winter survival guide:

**Winter Storage Options:**

**Option 1: Leave It Up (Fully Extended)**
• **Best for:** Mild to moderate winters
• Keep the pole **fully extended** outdoors
• Use the **red sleeve cap** to block snow and debris
• The flag can stay up (but may wear faster in harsh conditions)
• **Pro tip:** Consider bringing the flag in during severe storms

**Option 2: Bring It Inside (Fully Collapsed)**
• **Best for:** Harsh winters, extreme cold
• Collapse the pole completely
• Store it indoors (garage, basement, etc.)
• This extends the lifespan and prevents any weather-related issues
• **Pro tip:** Clean it before storing!

**What NOT to Do:**
• ❌ **Never leave it partially extended outdoors** — this can cause issues with the joints
• ❌ **Don't leave it collapsed in the ground sleeve** — moisture can get trapped

**Frost Heave Prevention (Cold Climates):**
If you're in a frost-prone area (Canada, Alaska, Minnesota, etc.), proper installation is key:
• Dig **36" deep** (below frost line)
• Add **12" of gravel** at the bottom for drainage
• This prevents frost heave and keeps your sleeve stable
• **This method has been battle-tested for decades!**

**Winter Maintenance Tips:**
• **Check the ground sleeve** — make sure it's not shifting
• **Inspect the pole** — look for any ice buildup
• **Bring the flag in** during severe weather (ice storms, blizzards)
• **Use the sleeve cap** — it's your best friend in winter!

**Temperature-Related Issues:**
• **Stuck joints in cold?** Bring the pole inside to warm up
• **Ice on the pole?** Let it thaw naturally (don't force it!)
• **Snow in the sleeve?** Use the red cap to prevent this

**Spring Prep:**
• Inspect the pole for any winter damage
• Clean it with mild soap and water
• Check all joints and locks
• Replace the flag if it's worn from winter weather

**Need more winter tips?** I can send you our detailed winter care guide with photos and videos!
    `,
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
    response: `
You're very welcome! 🇺🇸 It's been an honor helping you keep Old Glory flying proud.

Remember, we're a small family business, and every Phoenix owner becomes part of our extended family. If you ever need anything — troubleshooting, parts, or just want to chat about flagpoles (yes, we love that!) — we're here for you.

**Before you go:**
• Got your Phoenix? **Register your warranty** to activate all benefits
• Need accessories? Check out our **solar lights** and **premium flags**
• Want deals? Sign up for our **email list** for exclusive offers

**Fly it proud, fly it high!** 🦅

Is there anything else I can help you with today?
    `,
    followUp: ["Show me solar lights", "Tell me about current deals", "Register my warranty", "I'm all set, thanks!"],
    links: [
      { label: "Register Your Warranty", url: "https://atlanticflagpole.com/pages/warranty" },
      { label: "Solar Flagpole Lights", url: "https://atlanticflagpole.com/collections/flagpole-lighting" },
      { label: "Current Deals", url: "https://atlanticflagpole.com/pages/cyber-monday" },
    ],
  },
]

export function matchIntent(message: string): IntentMatch | null {
  const lower = message.toLowerCase().trim()

  // Check for human escalation keywords first
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

  // Score each intent based on keyword matches
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

    // Check aliases (lower weight)
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

    // Bonus for exact phrase matches
    if (intent.keywords.some((k) => lower === k.toLowerCase())) {
      score += 20
    }

    if (score > 0) {
      matches.push({ intent, score, matchedKeywords })
    }
  }

  // Return the highest scoring match
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
