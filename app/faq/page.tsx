import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const dynamic = "force-dynamic"

export default function FAQPage() {
  const faqs = [
    {
      question: "What size flagpole do I need?",
      answer:
        "The ideal flagpole height depends on your property size and flag size. As a general rule, residential properties work well with 20-25 ft poles, while commercial properties may need 30 ft or taller. The flag should be approximately 1/4 to 1/3 the height of the pole.",
    },
    {
      question: "How do I install a flagpole?",
      answer:
        "Installation varies by flagpole type. Telescoping flagpoles typically use a ground sleeve system, while traditional poles require concrete foundations. We provide detailed installation guides for all our products. Professional installation is also available in most areas.",
    },
    {
      question: "What material is best for flagpoles?",
      answer:
        "Aluminum is the most popular choice for residential flagpoles due to its durability, lightweight nature, and resistance to rust. It requires minimal maintenance and can withstand various weather conditions. Fiberglass is another excellent option for coastal areas.",
    },
    {
      question: "Do I need a permit to install a flagpole?",
      answer:
        "Permit requirements vary by location. Most residential areas don't require permits for flagpoles under 25 feet, but it's important to check with your local building department and homeowners association before installation.",
    },
    {
      question: "How do I maintain my flagpole?",
      answer:
        "Regular maintenance includes cleaning the pole with mild soap and water, checking hardware for wear, lubricating moving parts, and inspecting the rope or halyard. We recommend a thorough inspection at least twice a year.",
    },
    {
      question: "What's your warranty policy?",
      answer:
        "We offer comprehensive warranties on all our flagpoles, typically ranging from 5 to 20 years depending on the product. Our warranties cover manufacturing defects and structural issues. Visit our warranty page for complete details.",
    },
    {
      question: "Can I fly multiple flags on one pole?",
      answer:
        "Yes, with the right hardware. You can use a multi-flag halyard system or install additional flag arms. The American flag should always be positioned at the highest point when flying multiple flags.",
    },
    {
      question: "What's the difference between residential and commercial flagpoles?",
      answer:
        "Commercial flagpoles are typically taller (30-80 ft), have thicker walls for increased durability, and are designed to handle larger flags. They often require professional installation and concrete foundations. Residential poles (15-25 ft) are easier to install and maintain.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-[#0B1C2C]/70">Find answers to common questions about flagpoles and flags</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-[#0B1C2C] font-medium hover:text-[#C8A55C]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#0B1C2C]/70">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-md text-center">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Still Have Questions?</h2>
          <p className="text-[#0B1C2C]/70 mb-6">
            Our customer service team is here to help with any questions you may have.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  )
}
