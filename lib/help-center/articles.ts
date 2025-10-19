export interface HelpArticle {
  id: string
  slug: string
  title: string
  category: string
  categorySlug: string
  excerpt: string
  content: string
  keywords: string[]
  relatedArticles: string[]
}

export const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    slug: "getting-started",
    icon: "🚀",
    description: "Everything you need to know to get started with your Phoenix flagpole",
  },
  {
    id: "product-setup",
    title: "Product Setup & Instructions",
    slug: "product-setup",
    icon: "🔧",
    description: "Detailed setup guides and instructions for your flagpole system",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting & Repairs",
    slug: "troubleshooting",
    icon: "🔍",
    description: "Solutions to common issues and repair guides",
  },
  {
    id: "warranty",
    title: "Warranty & Replacement Parts",
    slug: "warranty",
    icon: "🛡️",
    description: "Information about our lifetime warranty and replacement parts",
  },
  {
    id: "flag-etiquette",
    title: "Flag Etiquette & Usage",
    slug: "flag-etiquette",
    icon: "🇺🇸",
    description: "Proper flag care, etiquette, and usage guidelines",
  },
  {
    id: "orders-shipping",
    title: "Orders & Shipping",
    slug: "orders-shipping",
    icon: "📦",
    description: "Shipping policies, tracking, and order information",
  },
  {
    id: "general-faqs",
    title: "General FAQs",
    slug: "general-faqs",
    icon: "❓",
    description: "Frequently asked questions about our products and services",
  },
]

export const helpArticles: HelpArticle[] = [
  // Getting Started
  {
    id: "whats-included",
    slug: "whats-included-in-my-phoenix-flagpole-kit",
    title: "What's Included in My Phoenix Flagpole Kit?",
    category: "Getting Started",
    categorySlug: "getting-started",
    excerpt: "Complete breakdown of everything included in your Phoenix flagpole kit",
    keywords: ["kit", "included", "contents", "package", "premier kit", "accessories"],
    relatedArticles: ["how-to-install", "premier-kit-breakdown"],
    content: `
# What's Included in My Phoenix Flagpole Kit?

Your Phoenix Telescoping Flagpole Kit comes with everything you need for a complete installation.

## Standard Kit Includes:
- Phoenix Telescoping Flagpole (your chosen height)
- Securi-LOK™ Interlocking System
- Ground Sleeve for in-ground installation
- Gold Ball Topper
- Rotating Rings (prevents flag tangling)
- Installation Hardware

## Premier Kit Bonus Items:
If you purchased a Premier Kit, you also receive:
- 3x5 ft American Flag (Made in USA)
- Solar Light (for 24/7 illumination)
- Anti-Theft Locking Clamp
- Flag Pole Repair Kit

## Installation Tools You'll Need:
- Shovel or post hole digger
- Level
- Concrete mix (for permanent installation)
- Measuring tape

Need help with installation? Check out our [Installation Guide](/help-center/getting-started/how-to-install-your-phoenix-telescoping-flagpole).
    `,
  },
  {
    id: "how-to-install",
    slug: "how-to-install-your-phoenix-telescoping-flagpole",
    title: "How to Install Your Phoenix Telescoping Flagpole",
    category: "Getting Started",
    categorySlug: "getting-started",
    excerpt: "Step-by-step installation guide for your Phoenix telescoping flagpole",
    keywords: ["install", "installation", "setup", "ground sleeve", "concrete", "dig"],
    relatedArticles: ["whats-included", "ground-sleeve-installation"],
    content: `
# How to Install Your Phoenix Telescoping Flagpole

Follow these steps for a professional installation of your Phoenix flagpole.

## Step 1: Choose Your Location
- Ensure 10-15 feet of clearance from power lines
- Check for underground utilities (call 811 before digging)
- Consider visibility and wind exposure
- Verify local zoning regulations

## Step 2: Prepare the Ground Sleeve
- Dig a hole 24-30 inches deep
- Diameter should be 12-14 inches
- Place ground sleeve in hole
- Use level to ensure it's perfectly vertical

## Step 3: Pour Concrete
- Mix concrete according to package directions
- Pour around ground sleeve
- Keep checking level as concrete settles
- Allow 24-48 hours to cure completely

## Step 4: Assemble Your Flagpole
- Start with the bottom section
- Extend each section upward
- Listen for the "click" of Securi-LOK™ engaging
- Attach flag clips to rotating rings

## Step 5: Raise Your Flagpole
- Insert assembled pole into ground sleeve
- Secure with locking clamp (if included)
- Attach your flag
- Raise to full height

**Pro Tips:**
- Install in dry weather for best concrete curing
- Have a helper for easier pole handling
- Take photos during installation for future reference

Need troubleshooting help? Visit our [Troubleshooting Guide](/help-center/troubleshooting).
    `,
  },
  {
    id: "choosing-flag-size",
    slug: "choosing-the-right-flag-size",
    title: "Choosing the Right Flag Size",
    category: "Getting Started",
    categorySlug: "getting-started",
    excerpt: "Guide to selecting the perfect flag size for your flagpole height",
    keywords: ["flag size", "dimensions", "height", "proportions"],
    relatedArticles: ["flag-etiquette", "how-to-install"],
    content: `
# Choosing the Right Flag Size

The right flag size ensures proper display and longevity.

## Recommended Flag Sizes by Pole Height:

| Pole Height | Flag Size | Notes |
|------------|-----------|-------|
| 15-20 ft | 3x5 ft | Standard residential |
| 20-25 ft | 4x6 ft | Larger homes |
| 25-30 ft | 5x8 ft | Commercial/large properties |
| 30-40 ft | 6x10 ft | Commercial buildings |

## General Guidelines:
- Flag length should be 1/4 to 1/3 of pole height
- Larger flags create more wind resistance
- Consider your local wind conditions
- Multiple flags require additional consideration

## Flying Two Flags:
When flying two flags, use our Double Flag Harness (DUA-Harness) and size both flags appropriately. Learn more in our [Two Flags Guide](/help-center/getting-started/how-to-fly-two-flags).
    `,
  },

  // Product Setup & Instructions
  {
    id: "raising-lowering",
    slug: "raising-and-lowering-your-flagpole",
    title: "Raising and Lowering Your Flagpole",
    category: "Product Setup & Instructions",
    categorySlug: "product-setup",
    excerpt: "Learn the proper technique for raising and lowering your telescoping flagpole",
    keywords: ["raise", "lower", "extend", "retract", "operation"],
    relatedArticles: ["securi-lok-system", "troubleshooting-stuck-poles"],
    content: `
# Raising and Lowering Your Flagpole

The Phoenix telescoping design makes flag changes easy and safe.

## Raising Your Flagpole:
1. **Start from the bottom** - Grasp the lowest visible section
2. **Lift smoothly** - Extend upward with steady pressure
3. **Listen for the click** - Securi-LOK™ will engage automatically
4. **Continue upward** - Repeat for each section
5. **Final check** - Ensure all sections are locked

## Lowering Your Flagpole:
1. **Twist to unlock** - Rotate the section slightly (about 1/4 turn)
2. **Press down gently** - Apply downward pressure to release lock
3. **Lower smoothly** - Guide section down with control
4. **Repeat for each section** - Work from top to bottom

## Safety Tips:
- Never force sections - they should move smoothly
- Keep fingers clear of locking mechanisms
- Lower pole in high winds for safety
- Two people recommended for poles over 25 ft

**Sections won't separate?** Check our [Troubleshooting Guide](/help-center/troubleshooting/pole-sections-stuck).
    `,
  },
  {
    id: "securi-lok-system",
    slug: "understanding-the-securi-lok-system",
    title: "Understanding the Securi-LOK™ System",
    category: "Product Setup & Instructions",
    categorySlug: "product-setup",
    excerpt: "How the Securi-LOK™ interlocking system works and maintenance tips",
    keywords: ["securi-lok", "locking", "mechanism", "interlocking", "sleeves"],
    relatedArticles: ["raising-lowering", "replacing-interlocking-sleeves"],
    content: `
# Understanding the Securi-LOK™ System

The Securi-LOK™ system is what makes your Phoenix flagpole secure and easy to use.

## How It Works:
The Securi-LOK™ uses precision-engineered interlocking sleeves that:
- **Automatically engage** when sections are extended
- **Lock securely** to prevent collapse
- **Release easily** with a twist and press motion
- **Withstand extreme winds** up to 100 MPH

## Maintenance:
- **Clean annually** - Wipe sleeves with dry cloth
- **Lubricate sparingly** - Use silicone spray if needed (not oil)
- **Inspect regularly** - Check for wear or damage
- **Replace when needed** - Sleeves are replaceable parts

## Signs of Wear:
- Difficulty locking or unlocking
- Sections not staying extended
- Visible cracks or damage
- Loose fit between sections

Need replacement sleeves? Visit our [Warranty & Parts](/help-center/warranty) section.
    `,
  },
  {
    id: "ground-sleeve-installation",
    slug: "ground-sleeve-installation-guide",
    title: "Ground Sleeve Installation Guide",
    category: "Product Setup & Instructions",
    categorySlug: "product-setup",
    excerpt: "Detailed guide for properly installing your ground sleeve",
    keywords: ["ground sleeve", "concrete", "installation", "foundation"],
    relatedArticles: ["how-to-install", "cold-weather-installation"],
    content: `
# Ground Sleeve Installation Guide

Proper ground sleeve installation ensures your flagpole's stability and longevity.

## Materials Needed:
- Ground sleeve (included with kit)
- 2-3 bags of concrete mix
- Post hole digger or shovel
- Level (4-foot recommended)
- Water source
- Mixing container

## Installation Steps:

### 1. Dig the Hole
- **Depth**: 24-30 inches (1/3 of pole height)
- **Diameter**: 12-14 inches
- **Shape**: Straight sides, flat bottom

### 2. Position the Sleeve
- Center sleeve in hole
- Top should be 2-3 inches above ground
- Use level to ensure perfectly vertical
- Brace with wood stakes if needed

### 3. Mix and Pour Concrete
- Follow concrete package directions
- Pour in layers, tamping each layer
- Keep checking level as you pour
- Fill to within 2 inches of top

### 4. Finish and Cure
- Slope concrete away from sleeve for drainage
- Smooth surface with trowel
- Allow 48 hours minimum cure time
- Protect from rain during curing

## Pro Tips:
- Install on a dry, mild day
- Have helper hold sleeve level while pouring
- Take photos for future reference
- Mark location before digging

**Installing in challenging conditions?** See our [Cold Weather Installation Tips](/help-center/product-setup/cold-weather-installation).
    `,
  },

  // Troubleshooting & Repairs
  {
    id: "pole-sections-stuck",
    slug: "pole-sections-stuck-or-not-locking",
    title: "Pole Sections Stuck or Not Locking",
    category: "Troubleshooting & Repairs",
    categorySlug: "troubleshooting",
    excerpt: "Solutions for stuck pole sections or locking mechanism issues",
    keywords: ["stuck", "jammed", "won't lock", "won't unlock", "frozen"],
    relatedArticles: ["securi-lok-system", "how-to-remove-tubes"],
    content: `
# Pole Sections Stuck or Not Locking

Common solutions for locking mechanism issues.

## Sections Won't Lock:

### Possible Causes:
1. **Dirt or debris** in locking mechanism
2. **Misalignment** of sections
3. **Worn interlocking sleeves**
4. **Bent or damaged sections**

### Solutions:
1. **Clean the mechanism**
   - Lower pole completely
   - Wipe all sections with dry cloth
   - Remove any dirt, leaves, or debris
   - Apply light silicone spray if needed

2. **Check alignment**
   - Ensure sections are straight
   - Rotate slightly while extending
   - Listen for the "click" of engagement

3. **Inspect for damage**
   - Look for dents or bends
   - Check interlocking sleeves for cracks
   - Contact us for replacement parts if needed

## Sections Won't Unlock:

### Quick Fixes:
1. **Twist and press** - Rotate 1/4 turn while pressing down
2. **Apply penetrating oil** - Let sit 15 minutes, then try again
3. **Gentle tapping** - Tap section with rubber mallet while twisting
4. **Warm the pole** - Cold weather can cause sticking

### When to Call for Help:
- Sections completely frozen together
- Visible damage to locking mechanism
- Multiple attempts unsuccessful

**Still stuck?** See our detailed [Tube Removal Guide](/help-center/troubleshooting/how-to-remove-tubes) or contact our support team.

## Prevention:
- Clean and inspect quarterly
- Lower pole during extreme weather
- Store properly in off-season
- Lubricate annually with silicone spray
    `,
  },
  {
    id: "replacing-interlocking-sleeves",
    slug: "replacing-interlocking-sleeves-securi-lok",
    title: "Replacing Interlocking Sleeves (Securi-LOK™)",
    category: "Troubleshooting & Repairs",
    categorySlug: "troubleshooting",
    excerpt: "How to replace worn or damaged Securi-LOK™ interlocking sleeves",
    keywords: ["replace", "sleeves", "repair", "parts", "securi-lok"],
    relatedArticles: ["securi-lok-system", "warranty-claim"],
    content: `
# Replacing Interlocking Sleeves (Securi-LOK™)

Interlocking sleeves are replaceable parts covered under our warranty.

## When to Replace:
- Sections won't lock securely
- Visible cracks or damage
- Excessive wear after years of use
- Pole sections feel loose

## Replacement Process:

### 1. Order Replacement Sleeves
- Contact customer service with pole model
- Covered under lifetime warranty
- Specify which section needs replacement

### 2. Remove Old Sleeve
- Lower pole completely
- Locate set screws on damaged sleeve
- Use Allen wrench to remove screws
- Slide old sleeve off pole section

### 3. Install New Sleeve
- Clean pole section thoroughly
- Slide new sleeve into position
- Align with locking mechanism
- Tighten set screws securely

### 4. Test Operation
- Extend and retract section several times
- Ensure smooth locking and unlocking
- Check for proper engagement

## Tools Needed:
- Allen wrench set
- Clean cloth
- Silicone spray (optional)
- Replacement sleeves

**Need replacement parts?** File a [Warranty Claim](/help-center/warranty/how-to-submit-warranty-claim) or contact our parts department.

## Warranty Coverage:
All Securi-LOK™ components are covered under our lifetime warranty for manufacturing defects.
    `,
  },
  {
    id: "flag-fraying",
    slug: "my-flag-is-fraying-what-can-i-do",
    title: "My Flag Is Fraying – What Can I Do?",
    category: "Troubleshooting & Repairs",
    categorySlug: "troubleshooting",
    excerpt: "Tips for preventing and addressing flag fraying and wear",
    keywords: ["fraying", "torn", "damaged", "flag care", "replacement"],
    relatedArticles: ["flag-care", "flag-warranty"],
    content: `
# My Flag Is Fraying – What Can I Do?

Flag fraying is normal wear, but you can extend flag life with proper care.

## Why Flags Fray:
- **Wind exposure** - Constant flapping causes wear
- **UV damage** - Sun breaks down fabric over time
- **Weather** - Rain, snow, and ice accelerate wear
- **Quality** - Lower quality flags wear faster

## Prevention Tips:

### 1. Choose Quality Flags
- Made in USA flags last longer
- Nylon for most conditions
- Polyester for high-wind areas
- Heavier weight = longer life

### 2. Proper Care
- Lower during severe weather
- Bring in during winter (optional)
- Wash gently when soiled
- Dry completely before storing

### 3. Rotate Flags
- Keep 2-3 flags in rotation
- Reduces wear on any single flag
- Always have a backup ready

## Repair Options:

### Minor Fraying:
- Trim loose threads with scissors
- Apply fabric glue to prevent spreading
- Sew reinforcement stitching if skilled

### Major Damage:
- Retire flag respectfully
- Order replacement flag
- Consider upgrading to heavier weight

## Flag Retirement:
Worn flags should be retired respectfully. Many VFW and American Legion posts offer flag retirement ceremonies.

**Need a replacement flag?** Browse our [Flag Collection](/collections/flags) or check our [Flag Warranty Coverage](/help-center/warranty/flag-warranty-coverage).

## Expected Lifespan:
- **Residential use**: 6-12 months
- **Commercial use**: 3-6 months
- **High-wind areas**: 3-6 months
- **Protected areas**: 12-18 months
    `,
  },

  // Warranty & Replacement Parts
  {
    id: "lifetime-warranty-overview",
    slug: "lifetime-warranty-overview",
    title: "Lifetime Warranty Overview",
    category: "Warranty & Replacement Parts",
    categorySlug: "warranty",
    excerpt: "Complete details about our lifetime warranty coverage",
    keywords: ["warranty", "lifetime", "coverage", "guarantee"],
    relatedArticles: ["warranty-claim", "whats-covered"],
    content: `
# Lifetime Warranty Overview

Atlantic Flagpole stands behind our products with an industry-leading lifetime warranty.

## What's Covered:
- **Flagpole structure** - All pole sections and components
- **Securi-LOK™ system** - Interlocking sleeves and mechanisms
- **Ground sleeve** - Manufacturing defects
- **Hardware** - Rotating rings, clips, and fasteners
- **Finish** - Powder coating and anodizing

## Coverage Details:
- **Lifetime** - As long as you own the pole
- **Manufacturing defects** - Materials and workmanship
- **Normal use** - Residential and commercial installations
- **Transferable** - Warranty transfers to new owner

## What's NOT Covered:
- Acts of nature (lightning, tornadoes, hurricanes)
- Improper installation
- Neglect or abuse
- Cosmetic wear from normal use
- Flags (separate 6-month warranty)

## 100 MPH Wind Guarantee:
Your Phoenix flagpole is guaranteed to withstand winds up to 100 MPH when properly installed. See [Wind Guarantee Details](/help-center/warranty/100-mph-wind-guarantee).

## How to File a Claim:
1. Contact customer service
2. Provide proof of purchase
3. Describe the issue with photos
4. Receive replacement parts or instructions

**Ready to file a claim?** Visit our [Warranty Claim Process](/help-center/warranty/how-to-submit-warranty-claim).

## Customer Satisfaction:
Beyond our warranty, we offer a 365-Day Home Trial. Not satisfied? Return for full refund within one year of purchase.
    `,
  },
  {
    id: "warranty-claim",
    slug: "how-to-submit-warranty-claim",
    title: "How to Submit a Warranty Claim",
    category: "Warranty & Replacement Parts",
    categorySlug: "warranty",
    excerpt: "Step-by-step process for filing a warranty claim",
    keywords: ["claim", "warranty", "process", "submit", "file"],
    relatedArticles: ["lifetime-warranty-overview", "whats-covered"],
    content: `
# How to Submit a Warranty Claim

Filing a warranty claim is quick and easy.

## Before You Start:
Gather the following information:
- Order number or proof of purchase
- Photos of the issue
- Description of the problem
- Your contact information

## Claim Process:

### Step 1: Contact Us
**Phone**: 1-800-XXX-XXXX (Mon-Fri, 9am-5pm EST)
**Email**: warranty@atlanticflagpole.com
**Online**: Submit claim form at atlanticflagpole.com/warranty

### Step 2: Provide Information
- Order details
- Product information (model, height)
- Clear photos showing the issue
- Description of when/how issue occurred

### Step 3: Review & Approval
- Our team reviews your claim (usually within 24 hours)
- We may ask for additional information
- Approval notification sent via email

### Step 4: Receive Replacement
- Replacement parts shipped free
- Tracking number provided
- Installation instructions included
- No need to return damaged parts (usually)

## Response Time:
- **Initial response**: Within 24 hours
- **Claim review**: 1-2 business days
- **Parts shipping**: 3-5 business days
- **Total time**: Usually under 1 week

## Tips for Faster Processing:
- Include clear, well-lit photos
- Provide detailed description
- Have order number ready
- Check spam folder for responses

## Common Warranty Issues:
- Interlocking sleeve replacement
- Damaged sections
- Finish defects
- Hardware replacement

**Questions about coverage?** See [What's Covered & What's Not](/help-center/warranty/whats-covered-whats-not).
    `,
  },

  // Flag Etiquette & Usage
  {
    id: "flag-etiquette",
    slug: "when-and-how-to-fly-the-us-flag",
    title: "When and How to Fly the U.S. Flag",
    category: "Flag Etiquette & Usage",
    categorySlug: "flag-etiquette",
    excerpt: "Proper flag etiquette and display guidelines",
    keywords: ["etiquette", "display", "rules", "proper", "respect"],
    relatedArticles: ["half-staff", "flag-care"],
    content: `
# When and How to Fly the U.S. Flag

Proper flag etiquette shows respect for our nation's symbol.

## Display Hours:
- **Sunrise to sunset** - Traditional display hours
- **24 hours** - Allowed if properly illuminated
- **All weather** - All-weather flags can fly in any conditions

## Proper Display:
- **Union (stars) on top** - Never display upside down (except distress)
- **Free to wave** - Should fly freely, not touching anything
- **Well-maintained** - Replace when worn or faded
- **Properly lit** - If flying at night, must be illuminated

## Special Occasions:
- **Memorial Day** - Half-staff until noon, then full-staff
- **Flag Day** - June 14th
- **Independence Day** - July 4th
- **Veterans Day** - November 11th

## Multiple Flags:
When flying multiple flags:
1. **U.S. flag highest** - Or same height as others
2. **U.S. flag to its own right** - Observer's left
3. **State flag below** - Or to the left of U.S. flag
4. **Other flags below** - In order of precedence

## What NOT to Do:
- Don't let flag touch the ground
- Don't fly in severe weather (unless all-weather flag)
- Don't use as decoration or clothing
- Don't display torn or faded flags

## Illumination Requirements:
If flying 24/7, flag must be properly lit. Our solar lights provide perfect illumination. [Shop Solar Lights](/collections/accessories).

**Learn about half-staff display**: [What is Half-Staff?](/help-center/flag-etiquette/what-is-half-staff)

## Official Resources:
- U.S. Flag Code: [4 U.S. Code § 1](https://www.law.cornell.edu/uscode/text/4/chapter-1)
- Veterans Affairs: [Flag Etiquette](https://www.va.gov/opa/publications/celebrate/flagdisplay.pdf)
    `,
  },
  {
    id: "half-staff",
    slug: "what-is-half-staff-and-when-should-i-use-it",
    title: "What is Half-Staff and When Should I Use It?",
    category: "Flag Etiquette & Usage",
    categorySlug: "flag-etiquette",
    excerpt: "Guidelines for flying the flag at half-staff",
    keywords: ["half-staff", "half-mast", "mourning", "respect"],
    relatedArticles: ["flag-etiquette", "how-to-fly-two-flags"],
    content: `
# What is Half-Staff and When Should I Use It?

Flying the flag at half-staff is a sign of mourning and respect.

## Half-Staff vs. Half-Mast:
- **Half-staff** - On land (flagpoles)
- **Half-mast** - On ships
- Both terms often used interchangeably

## How to Display at Half-Staff:
1. **Raise to peak** - First hoist flag to top of pole
2. **Lower to half-staff** - Then lower to position halfway between top and bottom
3. **Raise to peak before lowering** - At day's end, raise to peak, then lower completely

## When to Fly at Half-Staff:

### By Presidential Proclamation:
- Death of current or former President
- Death of Vice President or other officials
- National tragedies
- Memorial events

### By State Governor:
- Death of state officials
- State tragedies
- State memorial events

### Scheduled Half-Staff Days:
- **Memorial Day** - Sunrise to noon only
- **Peace Officers Memorial Day** - May 15th
- **Patriot Day** - September 11th
- **Pearl Harbor Remembrance Day** - December 7th

## Duration:
- **President**: 30 days
- **Vice President**: 10 days
- **Supreme Court Justice**: Day of death until burial
- **Member of Congress**: Day of death and following day

## Personal Mourning:
You may fly your flag at half-staff for personal mourning, though it's not required by flag code.

## Notification:
- Check [HalfStaff.org](https://halfstaff.org) for current orders
- Sign up for email alerts
- Follow official government announcements

**Need help adjusting your flagpole?** See [Raising and Lowering Your Flagpole](/help-center/product-setup/raising-and-lowering-your-flagpole).
    `,
  },
  {
    id: "flag-care",
    slug: "how-to-clean-and-care-for-your-flag",
    title: "How to Clean and Care for Your Flag",
    category: "Flag Etiquette & Usage",
    categorySlug: "flag-etiquette",
    excerpt: "Proper flag cleaning and maintenance tips",
    keywords: ["clean", "wash", "care", "maintain", "storage"],
    relatedArticles: ["flag-fraying", "flag-etiquette"],
    content: `
# How to Clean and Care for Your Flag

Proper care extends your flag's life and keeps it looking beautiful.

## Cleaning Your Flag:

### Hand Washing (Recommended):
1. **Fill basin** with cold water and mild detergent
2. **Soak flag** for 15-30 minutes
3. **Gently agitate** - Don't scrub or wring
4. **Rinse thoroughly** with cold water
5. **Air dry** - Hang or lay flat, never machine dry

### Machine Washing (If Necessary):
1. **Use gentle cycle** with cold water
2. **Mild detergent** only
3. **Wash alone** - Don't mix with other items
4. **Remove promptly** when cycle ends
5. **Air dry** - Never use dryer

## Stain Removal:
- **Dirt/mud** - Let dry, brush off, then wash
- **Bird droppings** - Soak in cold water first
- **Mildew** - Use oxygen bleach (not chlorine)
- **Stubborn stains** - Professional cleaning recommended

## Storage:

### Short-term (Seasonal):
- Clean and dry completely
- Fold properly (triangle fold)
- Store in cool, dry place
- Use breathable storage bag
- Avoid plastic bags (traps moisture)

### Long-term:
- Acid-free tissue paper between folds
- Cedar chest or climate-controlled area
- Check periodically for moisture
- Refold occasionally to prevent creases

## Proper Folding:
The traditional triangle fold:
1. Fold in half lengthwise twice
2. Start triangle fold from striped end
3. Continue folding until only blue field shows
4. Tuck remaining fabric into fold

## Maintenance Schedule:
- **Weekly**: Visual inspection for damage
- **Monthly**: Check for fraying or fading
- **Quarterly**: Clean if soiled
- **Annually**: Deep clean and inspection

## When to Replace:
Replace your flag when:
- Colors are significantly faded
- Fabric is torn or frayed
- Stripes are separating
- Stars are damaged

**Flag showing wear?** See [My Flag Is Fraying](/help-center/troubleshooting/my-flag-is-fraying-what-can-i-do).

## Flag Quality Matters:
Higher quality flags last longer:
- **Nylon** - Best for most conditions, lightweight
- **Polyester** - Heavy-duty, high-wind areas
- **Cotton** - Traditional, indoor/ceremonial use

[Shop Premium Flags](/collections/flags)
    `,
  },

  // Orders & Shipping
  {
    id: "shipping-policies",
    slug: "shipping-policies-and-timelines",
    title: "Shipping Policies and Timelines",
    category: "Orders & Shipping",
    categorySlug: "orders-shipping",
    excerpt: "Information about shipping options, costs, and delivery times",
    keywords: ["shipping", "delivery", "timeline", "cost", "tracking"],
    relatedArticles: ["order-tracking", "international-shipping"],
    content: `
# Shipping Policies and Timelines

We offer fast, reliable shipping across the United States.

## Shipping Options:

### Standard Shipping (FREE):
- **Cost**: FREE on all orders
- **Timeline**: 5-7 business days
- **Tracking**: Provided via email
- **Carrier**: UPS or FedEx

### Expedited Shipping:
- **2-Day**: $29.99
- **Overnight**: $49.99
- **Order by 2pm EST** for same-day processing

## Processing Time:
- **In-stock items**: Ships within 1-2 business days
- **Custom orders**: 3-5 business days
- **Bulk orders**: Contact for timeline

## What's Included:
- Flagpole and all components
- Installation hardware
- Instruction manual
- Warranty registration card

## Packaging:
- Heavy-duty boxes
- Protective padding
- Weather-resistant wrapping
- Discreet packaging (no external branding)

## Delivery:
- **Signature required** for orders over $500
- **Safe place delivery** available
- **Hold at location** available through carrier
- **Delivery notifications** via email and text

## Shipping Restrictions:
- **PO Boxes**: Not available for flagpoles
- **APO/FPO**: Contact for special arrangements
- **Alaska/Hawaii**: Additional fees may apply
- **International**: See [International Shipping](/help-center/orders-shipping/international-shipping)

## Order Tracking:
Track your order at [atlanticflagpole.com/track](/track) or see [Order Tracking Guide](/help-center/orders-shipping/order-tracking-missing-items).

## Shipping Damage:
- Inspect package upon delivery
- Note any damage on delivery receipt
- Contact us within 48 hours
- Photos required for claim
- Replacement shipped immediately

## Holiday Shipping:
During peak seasons (Memorial Day, July 4th, Veterans Day):
- Order early for guaranteed delivery
- Extended processing times possible
- Expedited shipping recommended

**Questions about your order?** Contact customer service at 1-800-XXX-XXXX or orders@atlanticflagpole.com.
    `,
  },
  {
    id: "order-tracking",
    slug: "order-tracking-and-missing-items",
    title: "Order Tracking & Missing Items",
    category: "Orders & Shipping",
    categorySlug: "orders-shipping",
    excerpt: "How to track your order and what to do if items are missing",
    keywords: ["tracking", "missing", "lost", "order status", "where is my order"],
    relatedArticles: ["shipping-policies", "gold-ball-topper"],
    content: `
# Order Tracking & Missing Items

Stay informed about your order status and resolve any issues quickly.

## Tracking Your Order:

### Automatic Notifications:
You'll receive emails at:
- **Order confirmation** - Immediately after purchase
- **Order shipped** - When package leaves our facility
- **Out for delivery** - Day of delivery
- **Delivered** - Confirmation of delivery

### Track Online:
1. Visit [atlanticflagpole.com/track](/track)
2. Enter order number and email
3. View real-time tracking information
4. See estimated delivery date

### Track with Carrier:
- Click tracking link in shipping email
- Visit carrier website directly
- Use carrier mobile app
- Call carrier customer service

## Order Status Meanings:

- **Processing** - Order received, preparing to ship
- **Shipped** - Package in transit
- **Out for Delivery** - Arriving today
- **Delivered** - Package delivered
- **Exception** - Delay or issue (contact us)

## Missing Items:

### Check First:
1. **Multiple packages** - Large orders may ship separately
2. **Delivery location** - Check all possible delivery spots
3. **Neighbors** - Ask if they received package
4. **Carrier** - Contact for delivery details

### If Truly Missing:
1. **Contact us immediately** - Don't wait
2. **Provide order number** - And tracking information
3. **File claim** - We'll handle carrier claim
4. **Replacement shipped** - Usually same day

## Common "Missing" Items:

### Gold Ball Topper:
Often ships separately in small package. See [Where Is My Gold Ball Topper?](/help-center/orders-shipping/where-is-my-gold-ball-topper).

### Small Accessories:
- Check all packaging carefully
- Look in bottom of box
- Check packing material
- Review packing slip

## Delivery Issues:

### Package Marked Delivered But Not Received:
1. Check all delivery locations
2. Wait 24 hours (sometimes marked early)
3. Contact carrier
4. Contact us if not resolved

### Damaged Package:
1. Note damage on delivery receipt
2. Take photos immediately
3. Contact us within 48 hours
4. Keep all packaging

### Wrong Address:
- Contact us immediately
- We'll attempt to redirect
- May require reshipment

## Resolution Time:
- **Missing items**: Replacement shipped within 24 hours
- **Lost packages**: Claim filed, replacement shipped within 3-5 days
- **Damaged items**: Replacement shipped upon photo review

**Need help?** Contact customer service:
- **Phone**: 1-800-XXX-XXXX
- **Email**: orders@atlanticflagpole.com
- **Hours**: Mon-Fri, 9am-5pm EST
    `,
  },
  {
    id: "gold-ball-topper",
    slug: "where-is-my-gold-ball-topper",
    title: "Where Is My Gold Ball Topper?",
    category: "Orders & Shipping",
    categorySlug: "orders-shipping",
    excerpt: "Information about gold ball topper shipping and installation",
    keywords: ["gold ball", "topper", "finial", "missing", "separate package"],
    relatedArticles: ["order-tracking", "whats-included"],
    content: `
# Where Is My Gold Ball Topper?

The gold ball topper often ships separately - here's why and what to expect.

## Why Separate Shipping?
- **Size difference** - Small item, separate packaging
- **Protection** - Prevents damage during shipping
- **Warehouse location** - May ship from different facility
- **Timing** - Usually arrives within 1-2 days of main package

## What to Expect:
- **Separate tracking number** - Check your email
- **Small package** - USPS or UPS small parcel
- **Usually arrives after** - Main flagpole package
- **No additional cost** - Included in free shipping

## If You Haven't Received It:

### Check Your Email:
- Look for second tracking number
- Check spam/junk folder
- Search for "Atlantic Flagpole" or "tracking"

### Check Delivery Locations:
- Mailbox (if USPS)
- Front door/porch
- Package locker
- Leasing office (apartments)

### Wait a Few Days:
- May arrive 1-3 days after main package
- Sometimes marked delivered early
- Check daily for small package

### Contact Us:
If not received within 5 days of main package:
- **Email**: orders@atlanticflagpole.com
- **Phone**: 1-800-XXX-XXXX
- **Provide**: Order number and main package tracking

## Installation:
Once received, installation is simple:
1. Screw onto top of flagpole
2. Hand-tighten securely
3. No tools required
4. Should be snug but not over-tightened

## Replacement Toppers:
Need a replacement or upgrade?
- **Standard gold ball** - Included with kit
- **Decorative finials** - Available for purchase
- **Custom toppers** - Contact for options

[Shop Flagpole Toppers](/collections/accessories)

## What's Included:
Every Phoenix flagpole kit includes:
- Gold ball topper (standard)
- Mounting hardware
- Installation instructions

See [What's Included in My Kit](/help-center/getting-started/whats-included-in-my-phoenix-flagpole-kit) for complete list.

**Still missing your topper after 5 days?** We'll send a replacement immediately at no charge.
    `,
  },

  // General FAQs
  {
    id: "fly-flag-at-night",
    slug: "can-i-fly-a-flag-at-night",
    title: "Can I Fly a Flag at Night?",
    category: "General FAQs",
    categorySlug: "general-faqs",
    excerpt: "Guidelines for 24-hour flag display and illumination requirements",
    keywords: ["night", "24 hours", "illumination", "solar light", "lighting"],
    relatedArticles: ["flag-etiquette", "solar-light-troubleshooting"],
    content: `
# Can I Fly a Flag at Night?

Yes! You can fly the American flag 24 hours a day if properly illuminated.

## The Rule:
According to U.S. Flag Code:
> "It is the universal custom to display the flag only from sunrise to sunset on buildings and on stationary flagstaffs in the open. However, when a patriotic effect is desired, the flag may be displayed 24 hours a day if properly illuminated during the hours of darkness."

## Illumination Requirements:

### What Qualifies as "Proper Illumination":
- Flag must be clearly visible
- Light should illuminate entire flag
- Brightness sufficient to see colors and details
- Consistent lighting (not flickering)

### Lighting Options:

**Solar Lights (Recommended)**:
- Included with Premier Kits
- Automatic on/off
- No wiring required
- Eco-friendly
- Low maintenance

**Spotlights**:
- Ground-mounted uplight
- 50-100 watt LED
- Aimed at flag
- Requires electrical outlet

**Pole-Mounted Lights**:
- Attaches to pole
- Downward-facing
- Solar or wired options
- Even illumination

## Our Solar Light:
The Phoenix Solar Light included with Premier Kits:
- **Brightness**: 20 lumens (sufficient for up to 25 ft pole)
- **Runtime**: 8-10 hours per charge
- **Charging**: Full charge in 6-8 hours of sunlight
- **Lifespan**: 2-3 years typical
- **Warranty**: 1 year

## Installation:
Solar light installation is simple:
1. Attach to top of flagpole
2. Position solar panel toward south
3. Ensure panel is clean and unobstructed
4. Light activates automatically at dusk

## Troubleshooting:
Light not working? See [Solar Light Troubleshooting](/help-center/troubleshooting/solar-light-not-working).

## Alternative: Lower at Sunset:
If you prefer not to illuminate:
- Lower flag at sunset
- Raise again at sunrise
- Traditional approach
- No lighting required

## Benefits of 24-Hour Display:
- Continuous patriotic display
- No daily raising/lowering
- Convenience
- Impressive nighttime appearance

**Need a solar light?** [Shop Solar Lights](/collections/accessories) or upgrade to a [Premier Kit](/collections/kits).

## Other Considerations:
- **HOA rules** - Check local regulations
- **Light pollution** - Be considerate of neighbors
- **Maintenance** - Keep light clean and functional
- **Weather** - Ensure light is weather-resistant
    `,
  },
  {
    id: "wind-speed-rating",
    slug: "what-wind-speed-can-my-flagpole-handle",
    title: "What Wind Speed Can My Flagpole Handle?",
    category: "General FAQs",
    categorySlug: "general-faqs",
    excerpt: "Information about wind ratings and the 100 MPH guarantee",
    keywords: ["wind", "speed", "rating", "100 mph", "guarantee", "hurricane"],
    relatedArticles: ["100-mph-wind-guarantee", "high-wind-installation"],
    content: `
# What Wind Speed Can My Flagpole Handle?

Phoenix flagpoles are engineered to withstand extreme winds up to 100 MPH.

## Wind Rating:
- **Sustained winds**: Up to 100 MPH
- **Gusts**: Up to 120 MPH
- **Guarantee**: Covered under warranty
- **Proper installation**: Required for guarantee

## How We Achieve This:

### Engineering:
- **Telescoping design** - Distributes wind load
- **Securi-LOK™ system** - Prevents collapse
- **Tapered construction** - Reduces wind resistance
- **Quality materials** - Aircraft-grade aluminum

### Testing:
- Wind tunnel tested
- Real-world storm data
- Engineering calculations
- Third-party verification

## Wind Load Factors:

### What Affects Wind Load:
1. **Pole height** - Taller = more wind exposure
2. **Flag size** - Larger flag = more resistance
3. **Installation** - Proper foundation critical
4. **Location** - Open areas vs. protected

### Reducing Wind Load:
- Use appropriate flag size
- Lower flag in extreme weather (optional)
- Ensure proper installation depth
- Use rotating rings (included)

## Installation Requirements:

For 100 MPH guarantee:
- **Ground sleeve depth**: 1/3 of pole height minimum
- **Concrete**: Proper mix and cure time
- **Level installation**: Perfectly vertical
- **Quality hardware**: Use all included components

See [Installation Guide](/help-center/getting-started/how-to-install-your-phoenix-telescoping-flagpole).

## High-Wind Areas:

### Special Considerations:
- **Coastal regions** - Salt air and high winds
- **Mountain areas** - Gusty conditions
- **Open plains** - Constant wind exposure
- **Hurricane zones** - Extreme weather events

### Recommendations:
- Consider shorter pole height
- Use smaller flag size
- Install with extra concrete
- Add anti-theft locking clamp

See [High-Wind Installation Tips](/help-center/product-setup/cold-weather-installation).

## What About Hurricanes?

### Category 1-2 (74-110 MPH):
- Pole should withstand with proper installation
- Consider lowering flag
- Monitor conditions

### Category 3+ (111+ MPH):
- Lower pole if possible
- Remove flag
- Secure loose items
- Follow evacuation orders

## 100 MPH Wind Guarantee:

### Coverage:
- Structural failure due to wind
- Proper installation required
- Proof of wind speed needed
- Lifetime warranty applies

### Not Covered:
- Improper installation
- Neglect or abuse
- Acts of God beyond 100 MPH
- Flag damage (separate warranty)

**Learn more**: [100 MPH Wind Guarantee Details](/help-center/warranty/100-mph-wind-guarantee)

## Real-World Performance:
Our flagpoles have withstood:
- Hurricane-force winds
- Severe thunderstorms
- Tornado-adjacent conditions
- Extreme winter storms

**Thousands of satisfied customers** in high-wind areas trust Phoenix flagpoles.

## Maintenance:
- Inspect after severe weather
- Check Securi-LOK™ engagement
- Tighten hardware if needed
- Contact us with any concerns

**Questions about wind ratings?** Contact our technical support team at 1-800-XXX-XXXX.
    `,
  },
  {
    id: "install-on-slope",
    slug: "can-i-install-on-a-slope",
    title: "Can I Install on a Slope?",
    category: "General FAQs",
    categorySlug: "general-faqs",
    excerpt: "Guidelines for installing flagpoles on sloped or uneven ground",
    keywords: ["slope", "hill", "uneven", "grade", "angle"],
    relatedArticles: ["how-to-install", "ground-sleeve-installation"],
    content: `
# Can I Install on a Slope?

Yes, you can install on a slope with proper techniques.

## Key Principle:
**The flagpole must be perfectly vertical**, regardless of ground slope.

## Installation on Slopes:

### Mild Slopes (up to 15°):
- Dig hole perpendicular to slope
- Use longer level for accuracy
- May need extra concrete on downhill side
- Relatively straightforward

### Moderate Slopes (15-30°):
- Consider terracing installation area
- Build up low side with retaining wall
- Use transit level for precision
- Professional help recommended

### Steep Slopes (30°+):
- Terracing required
- Significant excavation needed
- Professional installation strongly recommended
- Consider alternative location

## Step-by-Step for Sloped Installation:

### 1. Choose Location:
- Avoid steepest part of slope if possible
- Consider drainage patterns
- Ensure clearance for flag
- Check for underground utilities

### 2. Prepare Site:
- Mark pole location
- Use transit level or laser level
- Dig hole perpendicular to true vertical (not slope)
- May need to excavate more on uphill side

### 3. Set Ground Sleeve:
- Use long level (4-6 feet recommended)
- Check vertical in multiple directions
- Brace securely while pouring concrete
- Double-check level as concrete sets

### 4. Pour Concrete:
- May need more concrete on downhill side
- Ensure sleeve remains vertical
- Slope concrete away from sleeve for drainage
- Allow extra cure time on slopes

### 5. Final Check:
- Verify vertical alignment
- Check from multiple angles
- Make adjustments before concrete fully cures
- Document installation with photos

## Tools for Sloped Installation:

### Essential:
- 4-6 foot level
- Transit level or laser level
- Plumb bob
- Measuring tape
- Stakes and string

### Helpful:
- Post level (attaches to pole)
- Digital angle finder
- Extra bracing materials
- Helper (highly recommended)

## Drainage Considerations:
- Water should flow away from pole
- Slope concrete surface appropriately
- Consider French drain if needed
- Prevent water pooling around base

## Common Mistakes:

### Don't:
- Install perpendicular to slope (pole will lean)
- Eyeball the vertical alignment
- Rush the concrete curing
- Ignore drainage issues

### Do:
- Use proper leveling tools
- Take your time
- Check vertical from multiple angles
- Plan for drainage

## Alternative Solutions:

### If Slope Is Too Steep:
1. **Terrace the area** - Create level platform
2. **Retaining wall** - Build up low side
3. **Different location** - Find flatter spot
4. **Deck mount** - Install on level deck/patio

### Deck/Patio Mounting:
- Requires deck mount kit (sold separately)
- Must be level surface
- Structural support required
- Professional installation recommended

## Professional Installation:
Consider professional help if:
- Slope exceeds 20°
- You're unsure about leveling
- Significant excavation needed
- Local codes require it

## Warranty Considerations:
- Proper vertical installation required
- Improper installation voids warranty
- Document installation process
- Contact us with questions before installing

**Need installation help?** Contact our support team at 1-800-XXX-XXXX or see our [Installation Guide](/help-center/getting-started/how-to-install-your-phoenix-telescoping-flagpole).

## Success Tips:
- Measure twice, dig once
- Use quality leveling tools
- Don't rush the process
- Ask for help if needed
- When in doubt, call us!
    `,
  },
]

// Helper function to search articles
export function searchArticles(query: string): HelpArticle[] {
  const lowerQuery = query.toLowerCase()
  return helpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
      article.content.toLowerCase().includes(lowerQuery),
  )
}

// Helper function to get articles by category
export function getArticlesByCategory(categorySlug: string): HelpArticle[] {
  return helpArticles.filter((article) => article.categorySlug === categorySlug)
}

// Helper function to get related articles
export function getRelatedArticles(articleId: string): HelpArticle[] {
  const article = helpArticles.find((a) => a.id === articleId)
  if (!article) return []

  return helpArticles.filter((a) => article.relatedArticles.includes(a.id))
}
