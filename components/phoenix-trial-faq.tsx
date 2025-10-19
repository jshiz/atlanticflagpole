"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How long do I have to try the Phoenix Flagpole?",
    answer:
      "You have a full 365 days (one year) to try the Phoenix Flagpole at home. If you're not completely satisfied, you can return it for a full refund.",
  },
  {
    question: "What if I need to return my flagpole?",
    answer:
      "Simply contact our customer support team within 365 days of purchase. We'll provide return instructions and process your full refund once we receive the flagpole.",
  },
  {
    question: "Is there a restocking fee?",
    answer: "No, there are no restocking fees. We want you to be completely satisfied with your purchase.",
  },
  {
    question: "Does the lifetime warranty cover everything?",
    answer:
      "Our Forever Warranty covers manufacturing defects for the lifetime of the product. Normal wear and tear, damage from extreme weather events, or improper installation are not covered.",
  },
  {
    question: "Can I exchange my flagpole for a different size?",
    answer:
      "Yes! Within the 365-day trial period, you can exchange your flagpole for a different size. Contact our support team to arrange the exchange.",
  },
  {
    question: "Is shipping free?",
    answer:
      "We offer free shipping on select bundles. Individual flagpoles may have shipping charges depending on your location and the size of the flagpole.",
  },
  {
    question: "Are Phoenix Flagpoles really made in the USA?",
    answer:
      "Yes! Every Phoenix Flagpole is handcrafted in the USA using premium American materials. We're proud to support American manufacturing and jobs.",
  },
  {
    question: "What makes Phoenix Flagpoles different from competitors?",
    answer:
      "Phoenix Flagpoles feature superior engineering, premium materials, and the industry's best warranty. Our 365-day home trial and lifetime warranty demonstrate our confidence in our products.",
  },
]

export function PhoenixTrialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggleFAQ(index)
              }
            }}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F6FFF] focus:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="text-lg font-semibold text-[#0A2740] pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#0A2740] flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"}`}
          >
            <div className="p-6 pt-0 text-gray-600 leading-relaxed">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
