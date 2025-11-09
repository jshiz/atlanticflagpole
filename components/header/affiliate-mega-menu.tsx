"use client"

import Link from "next/link"
import { DollarSign, Users, TrendingUp, Gift, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AffiliateMegaMenuProps {
  onLinkClick?: () => void
}

export function AffiliateMegaMenu({ onLinkClick }: AffiliateMegaMenuProps) {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-[#C8A55C]" />,
      title: "Earn 10% Commission",
      description: "Get paid for every sale you refer. No cap on earnings.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#C8A55C]" />,
      title: "90-Day Cookie Duration",
      description: "Earn commissions even if customers purchase later.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#C8A55C]" />,
      title: "Dedicated Support",
      description: "Get help from our affiliate team whenever you need it.",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#C8A55C]" />,
      title: "Exclusive Promotions",
      description: "Access special deals and marketing materials for your audience.",
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-2">Join Our Affiliate Program</h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Partner with Atlantic Flagpole and earn generous commissions by sharing America's #1 flagpole brand with your
          audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#F5F3EF] to-white rounded-lg p-6 border border-gray-200 hover:border-[#C8A55C] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {benefit.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0B1C2C] mb-1">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#0B1C2C] to-[#0A2740] rounded-xl p-6 text-center text-white">
        <h4 className="text-xl font-bold mb-3">Ready to Get Started?</h4>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Join hundreds of affiliates earning passive income by promoting premium American-made flagpoles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white font-bold">
            <Link href="/affiliate/signup" onClick={onLinkClick}>
              Apply Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 hover:bg-white/20 text-white font-bold"
          >
            <Link href="/affiliate/learn-more" onClick={onLinkClick}>
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Questions?{" "}
          <Link href="/contact" onClick={onLinkClick} className="text-[#C8A55C] hover:text-[#a88947] font-semibold">
            Contact our affiliate team
          </Link>
        </p>
      </div>
    </div>
  )
}
