import Link from "next/link"
import { notFound } from "next/navigation"
import { helpCategories, getArticlesByCategory } from "@/lib/help-center/articles"
import { ArrowLeft, ArrowRight } from "lucide-react"

export async function generateStaticParams() {
  return helpCategories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = helpCategories.find((c) => c.slug === params.category)
  if (!category) return {}

  return {
    title: `${category.title} | Help Center | Atlantic Flagpole`,
    description: category.description,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = helpCategories.find((c) => c.slug === params.category)
  if (!category) notFound()

  const articles = getArticlesByCategory(params.category)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a3a52] text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/help-center"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{category.title}</h1>
              <p className="text-lg text-white/80">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/help-center/${params.category}/${article.slug}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-bold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#0B1C2C]/60">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {article.keywords.slice(0, 4).map((keyword) => (
                        <span key={keyword} className="text-xs px-2 py-1 rounded-full bg-[#C8A55C]/10 text-[#C8A55C]">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#C8A55C] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
