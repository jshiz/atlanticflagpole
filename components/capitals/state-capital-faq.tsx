import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { StateCapitalData } from "@/lib/capitals/data"

interface StateCapitalFAQProps {
  stateData: StateCapitalData
}

export function StateCapitalFAQ({ stateData }: StateCapitalFAQProps) {
  const faqs = [
    {
      question: `Do you ship to ${stateData.capital}, ${stateData.state}?`,
      answer: `Yes! We ship directly to ${stateData.capital} and all of ${stateData.state}. Most orders arrive within 5-7 business days with free shipping on select bundles.`,
    },
    {
      question: `How does the Phoenix flagpole handle ${stateData.capital}'s weather?`,
      answer: `The Phoenix is specifically engineered for ${stateData.climate.type}. ${stateData.climate.phoenixBenefits.join(" ")} Our 100 MPH wind guarantee ensures your flagpole will stand strong through ${stateData.capital}'s toughest conditions.`,
    },
    {
      question: "What is the Forever Warranty?",
      answer:
        "Our Forever Warranty covers all manufacturing defects for the lifetime of your flagpole. If anything goes wrong due to materials or workmanship, we'll repair or replace it at no cost to you.",
    },
    {
      question: "What is the 365-Day Home Trial?",
      answer:
        "We're so confident you'll love your Phoenix flagpole that we give you a full year to try it at home. If you're not completely satisfied for any reason, return it for a full refund. No questions asked.",
    },
    {
      question: "How easy is it to install?",
      answer:
        "The Phoenix flagpole features a simple DIY ground sleeve installation. Most customers complete setup in under 30 minutes with basic tools. No concrete is needed for most models, and detailed instructions are included.",
    },
    {
      question: "What's the difference between the 20ft and 25ft models?",
      answer:
        "The 20ft model is perfect for residential properties and flies a 3'x5' flag beautifully. The 25ft model is ideal for larger properties or commercial use and can fly a 4'x6' flag. Both feature the same premium construction and lifetime warranty.",
    },
  ]

  return (
    <section className="py-16 bg-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-[#0B1C2C] hover:text-[#C8A55C]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#0B1C2C]/70">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
