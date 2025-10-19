import type { Metadata } from "next"
import Link from "next/link"
import { Check, Phone, ShoppingBag } from "lucide-react"
import { PhoenixTrialFAQ } from "@/components/phoenix-trial-faq"

export const metadata: Metadata = {
  title: "Phoenix 365-Day Home Trial | Atlantic Flagpole",
  description:
    "Try the Phoenix Flagpole at home for a full 365 days. If you're not thrilled, return it. Made in the USA with lifetime warranty and free shipping on select bundles.",
}

export default function PhoenixHomeTrialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-[#0A2740] text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#1F6FFF] text-white text-sm font-semibold mb-6">
            365-Day Home Trial
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">The Legendary Phoenix 365-Day Home Trial</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty leading-relaxed">
            Try the Phoenix Flagpole at home for a full year. If you're not completely thrilled, return it. No questions
            asked.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections/flagpoles"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E63946] hover:bg-[#E63946]/90 text-white font-semibold rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Flagpoles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[#0A2740] font-semibold rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2740] mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Order Your Phoenix Flagpole",
                description: "Choose from our premium selection of American-made flagpoles and complete your order.",
              },
              {
                title: "Try It for 365 Days",
                description:
                  "Install and use your flagpole for a full year. Experience the quality and durability firsthand.",
              },
              {
                title: "Love It or Return It",
                description:
                  "If you're not completely satisfied within 365 days, return it for a full refund. No questions asked.",
              },
              {
                title: "Lifetime Warranty Included",
                description:
                  "Every Phoenix Flagpole comes with our Forever Warranty, covering manufacturing defects for life.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#1F6FFF] text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0A2740] mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2740] mb-8 text-center">What's Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "365-Day Money-Back Guarantee",
              "Lifetime Warranty",
              "Made in the USA",
              "Free Shipping on Select Bundles",
              "Expert Installation Support",
              "Premium Quality Materials",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Check className="w-6 h-6 text-[#1F6FFF] flex-shrink-0 mt-0.5" />
                <span className="text-[#0A2740] font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2740] mb-8 text-center">Frequently Asked Questions</h2>
          <PhoenixTrialFAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0A2740] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Phoenix Difference?</h2>
          <p className="text-xl text-white/90 mb-8 text-pretty">
            Join thousands of satisfied customers who trust Atlantic Flagpole for their flagpole needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections/flagpoles"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E63946] hover:bg-[#E63946]/90 text-white font-semibold rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Flagpoles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[#0A2740] font-semibold rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long do I have to try the Phoenix Flagpole?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You have a full 365 days (one year) to try the Phoenix Flagpole at home. If you're not completely satisfied, you can return it for a full refund.",
                },
              },
              {
                "@type": "Question",
                name: "What if I need to return my flagpole?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Simply contact our customer support team within 365 days of purchase. We'll provide return instructions and process your full refund once we receive the flagpole.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a restocking fee?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, there are no restocking fees. We want you to be completely satisfied with your purchase.",
                },
              },
              {
                "@type": "Question",
                name: "Does the lifetime warranty cover everything?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our Forever Warranty covers manufacturing defects for the lifetime of the product. Normal wear and tear, damage from extreme weather events, or improper installation are not covered.",
                },
              },
              {
                "@type": "Question",
                name: "Can I exchange my flagpole for a different size?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Within the 365-day trial period, you can exchange your flagpole for a different size. Contact our support team to arrange the exchange.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
