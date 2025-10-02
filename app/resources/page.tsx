import Link from "next/link"
import { BookOpen, FileText, HelpCircle, ArrowRight } from "lucide-react"

export default function ResourcesPage() {
  const resourceSections = [
    {
      title: "Blog & Articles",
      description: "Expert advice, guides, and tips for flagpole owners and enthusiasts",
      icon: BookOpen,
      href: "/blog",
      color: "bg-[#C8A55C]",
      items: ["Choosing the Right Flagpole", "Flag Etiquette Guide", "Maintenance Tips", "Installation Best Practices"],
    },
    {
      title: "Installation Guides",
      description: "Professional installation guides and video tutorials for all flagpole types",
      icon: FileText,
      href: "/installation-guides",
      color: "bg-[#0B1C2C]",
      items: [
        "Telescoping Flagpole Setup",
        "In-Ground Installation",
        "Wall Mount Instructions",
        "Lighting System Setup",
      ],
    },
    {
      title: "FAQ",
      description: "Find answers to common questions about flagpoles, flags, and installation",
      icon: HelpCircle,
      href: "/faq",
      color: "bg-[#8B4513]",
      items: ["Sizing & Selection", "Installation Requirements", "Maintenance & Care", "Warranty Information"],
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Resources & Support</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Everything you need to know about flagpoles, flags, and proper installation. Expert guides, tutorials, and
              answers to your questions.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {resourceSections.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`${section.color} p-6 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h2 className="text-2xl font-serif font-bold mb-2">{section.title}</h2>
                    <p className="text-white/90">{section.description}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {section.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-[#0B1C2C]/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A55C]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-[#C8A55C] font-medium group-hover:gap-3 transition-all">
                      Explore {section.title}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-8 text-center">
              Popular Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "How to Choose the Right Flagpole Height", href: "/blog" },
                { title: "Telescoping Flagpole Installation", href: "/installation-guides" },
                { title: "Flag Etiquette & Display Guidelines", href: "/blog" },
                { title: "Flagpole Maintenance Tips", href: "/blog" },
                { title: "What Size Flagpole Do I Need?", href: "/faq" },
                { title: "Permit Requirements", href: "/faq" },
              ].map((topic, index) => (
                <Link
                  key={index}
                  href={topic.href}
                  className="flex items-center gap-3 p-4 rounded-lg border-2 border-[#F5F3EF] hover:border-[#C8A55C] hover:bg-[#F5F3EF] transition-all group"
                >
                  <ArrowRight className="w-5 h-5 text-[#C8A55C] group-hover:translate-x-1 transition-transform" />
                  <span className="text-[#0B1C2C] font-medium">{topic.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-[#F5F3EF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-4">Need Personalized Help?</h2>
            <p className="text-lg text-[#0B1C2C]/70 mb-8">
              Our flagpole experts are here to answer your questions and help you find the perfect solution for your
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-8 py-4 rounded-md transition-colors"
              >
                Contact Our Team
              </Link>
              <Link
                href="/flagpole-finder"
                className="inline-block bg-[#0B1C2C] hover:bg-[#1a3a52] text-white font-medium px-8 py-4 rounded-md transition-colors"
              >
                Find Your Flagpole
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
