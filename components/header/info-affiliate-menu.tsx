"use client"

import Link from "next/link"
import { FileText, HelpCircle, BookOpen, Phone, Users, DollarSign, TrendingUp, Award } from "lucide-react"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface InfoAffiliateMenuProps {
  title: string
  menuItems: MenuItem[]
  onLinkClick?: () => void
}

export function InfoAffiliateMenu({ title, menuItems, onLinkClick }: InfoAffiliateMenuProps) {
  const isInfoCenter = title.toLowerCase().includes("info") || title.toLowerCase().includes("help")
  const isAffiliate = title.toLowerCase().includes("affiliate") || title.toLowerCase().includes("partner")

  const getIcon = (itemTitle: string) => {
    const lower = itemTitle.toLowerCase()
    if (lower.includes("guide") || lower.includes("installation")) return <BookOpen className="w-5 h-5" />
    if (lower.includes("faq") || lower.includes("question")) return <HelpCircle className="w-5 h-5" />
    if (lower.includes("contact") || lower.includes("support")) return <Phone className="w-5 h-5" />
    if (lower.includes("document") || lower.includes("resource")) return <FileText className="w-5 h-5" />
    if (lower.includes("partner") || lower.includes("join")) return <Users className="w-5 h-5" />
    if (lower.includes("commission") || lower.includes("earn")) return <DollarSign className="w-5 h-5" />
    if (lower.includes("benefit") || lower.includes("advantage")) return <TrendingUp className="w-5 h-5" />
    if (lower.includes("success") || lower.includes("testimonial")) return <Award className="w-5 h-5" />
    return <FileText className="w-5 h-5" />
  }

  const getDescription = (itemTitle: string) => {
    const lower = itemTitle.toLowerCase()
    if (lower.includes("installation")) return "Step-by-step installation instructions"
    if (lower.includes("maintenance")) return "Keep your flagpole in top condition"
    if (lower.includes("faq")) return "Answers to common questions"
    if (lower.includes("contact")) return "Get in touch with our team"
    if (lower.includes("warranty")) return "Learn about our warranty coverage"
    if (lower.includes("shipping")) return "Shipping information and policies"
    if (lower.includes("return")) return "Easy returns and exchanges"
    if (lower.includes("join")) return "Become a partner and earn commissions"
    if (lower.includes("commission")) return "Competitive commission structure"
    if (lower.includes("resource")) return "Marketing materials and tools"
    if (lower.includes("portal")) return "Access your affiliate dashboard"
    return "Learn more about this topic"
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-2">{title}</h3>
        <p className="text-gray-600">
          {isInfoCenter
            ? "Find helpful resources, guides, and support information"
            : "Join our affiliate program and earn commissions on every sale"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={onLinkClick}
            className="group relative bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#C8A55C] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              {/* Icon */}
              <div className="mb-4 text-[#C8A55C] group-hover:scale-110 transition-transform duration-300">
                {getIcon(item.title)}
              </div>

              {/* Title */}
              <h4 className="text-base font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 flex-grow">{getDescription(item.title)}</p>

              {/* Arrow indicator */}
              <div className="flex items-center text-[#C8A55C] text-sm font-medium">
                <span className="group-hover:translate-x-1 transition-transform">Learn more →</span>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8A55C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
          </Link>
        ))}
      </div>

      {isAffiliate && (
        <div className="mt-8 bg-gradient-to-br from-[#C8A55C]/10 to-[#0B1C2C]/5 rounded-lg p-8 text-center">
          <h4 className="text-xl font-serif font-bold text-[#0B1C2C] mb-3">Ready to Get Started?</h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of partners earning commissions by promoting quality flagpoles and accessories
          </p>
          <Link
            href="/pages/join-affiliates"
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#a88947] text-white px-8 py-3 rounded-md font-semibold transition-colors"
          >
            <Users className="w-5 h-5" />
            Join Our Affiliate Program
          </Link>
        </div>
      )}

      {isInfoCenter && (
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-8 text-center">
          <h4 className="text-xl font-serif font-bold text-[#0B1C2C] mb-3">Still Have Questions?</h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions or concerns
          </p>
          <Link
            href="/help-center"
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#a88947] text-white px-8 py-3 rounded-md font-semibold transition-colors"
          >
            <Phone className="w-5 h-5" />
            Contact Support
          </Link>
        </div>
      )}
    </div>
  )
}
