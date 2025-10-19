import Link from "next/link"
import { helpCategories, getArticlesByCategory } from "@/lib/help-center/articles"
import { AISearch } from "@/components/help-center/ai-search"
import { ArrowRight, Search } from "lucide-react"

export const metadata = {
  title: "Help Center | Atlantic Flagpole",
  description: "Find answers to your questions about Phoenix flagpoles, installation, warranty, and more",
}

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a3a52] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">How Can We Help You?</h1>
            <p className="text-lg text-white/80 mb-8">
              Get instant answers with our AI-powered search or browse our comprehensive help articles
            </p>

            {/* AI Search */}
            <div className="max-w-2xl mx-auto">
              <AISearch />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category) => {
            const articles = getArticlesByCategory(category.slug)

            return (
              <Link
                key={category.id}
                href={`/help-center/${category.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-bold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-[#0B1C2C]/60 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#0B1C2C]/40">{articles.length} articles</span>
                      <ArrowRight className="w-4 h-4 text-[#C8A55C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "How to Install Your Phoenix Telescoping Flagpole",
                category: "Getting Started",
                url: "/help-center/getting-started/how-to-install-your-phoenix-telescoping-flagpole",
              },
              {
                title: "Lifetime Warranty Overview",
                category: "Warranty",
                url: "/help-center/warranty/lifetime-warranty-overview",
              },
              {
                title: "Pole Sections Stuck or Not Locking",
                category: "Troubleshooting",
                url: "/help-center/troubleshooting/pole-sections-stuck-or-not-locking",
              },
              {
                title: "When and How to Fly the U.S. Flag",
                category: "Flag Etiquette",
                url: "/help-center/flag-etiquette/when-and-how-to-fly-the-us-flag",
              },
            ].map((article, index) => (
              <Link
                key={index}
                href={article.url}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-[#F5F3EF] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#C8A55C]/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-[#C8A55C]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-[#0B1C2C]/40 mt-1">{article.category}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C8A55C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-[#C8A55C] to-[#a88947] rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-serif font-bold mb-2">Still Need Help?</h2>
          <p className="text-white/90 mb-6">Our customer service team is here to assist you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0B1C2C] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:1-800-XXX-XXXX"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Call 1-800-XXX-XXXX
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
