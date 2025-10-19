import Link from "next/link"
import { notFound } from "next/navigation"
import { helpArticles, getRelatedArticles } from "@/lib/help-center/articles"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ReactMarkdown from "react-markdown"

export async function generateStaticParams() {
  return helpArticles.map((article) => ({
    category: article.categorySlug,
    article: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { category: string; article: string } }) {
  const article = helpArticles.find((a) => a.categorySlug === params.category && a.slug === params.article)
  if (!article) return {}

  return {
    title: `${article.title} | Help Center | Atlantic Flagpole`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: { params: { category: string; article: string } }) {
  const article = helpArticles.find((a) => a.categorySlug === params.category && a.slug === params.article)
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(article.id)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1C2C] to-[#1a3a52] text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href={`/help-center/${params.category}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {article.category}
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{article.title}</h1>
          <p className="text-lg text-white/80 mt-2">{article.excerpt}</p>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => <p className="text-[#0B1C2C]/80 leading-relaxed mb-4">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
                  li: ({ children }) => <li className="text-[#0B1C2C]/80">{children}</li>,
                  a: ({ href, children }) => (
                    <Link href={href || "#"} className="text-[#C8A55C] hover:underline">
                      {children}
                    </Link>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-[#0B1C2C]">{children}</strong>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#C8A55C] pl-4 italic text-[#0B1C2C]/70 my-4">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-gray-200">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-[#F5F3EF]">{children}</thead>,
                  tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
                  tr: ({ children }) => <tr>{children}</tr>,
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#0B1C2C] uppercase tracking-wider">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => <td className="px-4 py-3 text-sm text-[#0B1C2C]/80">{children}</td>,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/help-center/${related.categorySlug}/${related.slug}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-bold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors mb-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-[#0B1C2C]/60 line-clamp-2">{related.excerpt}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#C8A55C] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#C8A55C] to-[#a88947] rounded-xl p-8 text-center text-white">
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
      </div>
    </main>
  )
}
