import Link from "next/link"
import { Home, ShoppingBag, Info, HelpCircle, Phone, FileText } from "lucide-react"

export const metadata = {
  title: "Sitemap | Atlantic Flagpole",
  description: "Navigate our complete site directory to find flagpoles, flags, accessories, and helpful resources.",
}

export default function SitemapPage() {
  const sections = [
    {
      title: "Shop",
      icon: ShoppingBag,
      links: [
        { label: "All Products", href: "/products" },
        { label: "Telescoping Flagpoles", href: "/collections/telescoping-flagpoles" },
        { label: "Traditional Flagpoles", href: "/collections/traditional-flagpoles" },
        { label: "Commercial Flagpoles", href: "/collections/commercial-flagpoles" },
        { label: "American Flags", href: "/flags/american-flags" },
        { label: "State Flags", href: "/flags/state-flags" },
        { label: "Military Flags", href: "/flags/military-flags" },
        { label: "Accessories", href: "/accessories/flagpole-accessories" },
        { label: "LED Christmas Trees", href: "/led-christmas-trees-for-flagpole" },
      ],
    },
    {
      title: "Tools & Guides",
      icon: HelpCircle,
      links: [
        { label: "Flagpole Finder", href: "/flagpole-finder" },
        { label: "Flagpole Quiz", href: "/?quiz=open" },
        { label: "Bundle Builder", href: "/bundle-builder" },
        { label: "Installation Guides", href: "/installation-guides" },
        { label: "State Capitals Guide", href: "/capitals" },
      ],
    },
    {
      title: "Information",
      icon: Info,
      links: [
        { label: "About Us", href: "/about" },
        { label: "365-Day Home Trial", href: "/info-center/phoenix-365-day-home-trial" },
        { label: "Warranty Information", href: "/warranty" },
        { label: "Guarantee", href: "/guarantee" },
        { label: "Reviews", href: "/reviews" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      icon: Phone,
      links: [
        { label: "Help Center", href: "/help-center" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Shipping Information", href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "Installation Help", href: "/installation" },
      ],
    },
    {
      title: "Legal",
      icon: FileText,
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Cookie Settings", href: "/cookie-settings" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C8A55C]/10 mb-4">
              <Home className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Site Map</h1>
            <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
              Navigate our complete site directory to find everything you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-[#C8A55C]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C8A55C]" />
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#0B1C2C]">{section.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[#0B1C2C]/70 hover:text-[#C8A55C] transition-colors text-sm flex items-center gap-2 py-1 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#C8A55C] opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#0B1C2C] to-[#1a3a52] rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-serif font-bold mb-3">Can't Find What You're Looking For?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help you find exactly what you need
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#C8A55C] hover:bg-[#a88947] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Support
              </Link>
              <Link
                href="/help-center"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-white/20"
              >
                <HelpCircle className="w-4 h-4" />
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
