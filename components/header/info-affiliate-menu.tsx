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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#0B1C2C] mb-2">{title}</h3>
        <p className="text-gray-700">
          {isInfoCenter
            ? "Find helpful resources, guides, and support information"
            : "Join our affiliate program and earn commissions on every sale"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={onLinkClick}
            className="group relative bg-white hover:bg-gray-50 border-2 border-[#C8A55C] hover:border-[#FFD700] rounded-lg p-4 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="flex flex-col h-full text-center">
              {/* Icon */}
              <div className="mb-3 text-[#C8A55C] group-hover:text-[#FFD700] group-hover:scale-110 transition-all duration-300 flex justify-center">
                {getIcon(item.title)}
              </div>

              <h4 className="text-sm font-bold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                {item.title}
              </h4>

              <p className="text-xs text-gray-600 mb-3 flex-grow">{getDescription(item.title)}</p>

              {/* Arrow indicator */}
              <div className="flex items-center justify-center text-[#C8A55C] group-hover:text-[#FFD700] text-xs font-medium">
                <span className="group-hover:translate-x-1 transition-transform">Learn more →</span>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
          </Link>
        ))}
      </div>

      {isAffiliate && (
        <div className="mt-6 bg-gradient-to-br from-[#C8A55C]/10 to-[#FFD700]/10 rounded-lg p-6 text-center border-2 border-[#C8A55C]">
          <h4 className="text-xl font-bold text-[#0B1C2C] mb-2">Ready to Get Started?</h4>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto text-sm">
            Join thousands of partners earning commissions by promoting quality flagpoles and accessories
          </p>
          <Link
            href="/pages/join-affiliates"
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#b8954c] text-white px-6 py-2 rounded-lg font-bold transition-all hover:scale-105 shadow-lg text-sm"
          >
            <Users className="w-4 h-4" />
            Join Our Affiliate Program
          </Link>
        </div>
      )}

      {isInfoCenter && (
        <div className="mt-6 bg-gradient-to-br from-[#C8A55C]/10 to-[#FFD700]/10 rounded-lg p-6 text-center border-2 border-[#C8A55C]">
          <h4 className="text-xl font-bold text-[#0B1C2C] mb-2">Still Have Questions?</h4>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto text-sm">
            Our customer support team is here to help you with any questions or concerns
          </p>
          <Link
            href="/help-center"
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#b8954c] text-white px-6 py-2 rounded-lg font-bold transition-all hover:scale-105 shadow-lg text-sm"
          >
            <Phone className="w-4 h-4" />
            Contact Support
          </Link>
        </div>
      )}
    </div>
  )
}
