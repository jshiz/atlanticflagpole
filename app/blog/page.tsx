import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "How to Choose the Right Flagpole Height",
      excerpt: "Learn about the factors that determine the ideal flagpole height for your property.",
      date: "March 15, 2024",
      slug: "choosing-flagpole-height",
      image: "/flagpole-height.jpg",
    },
    {
      title: "Flagpole Installation Guide",
      excerpt: "Step-by-step instructions for installing your new flagpole safely and correctly.",
      date: "March 10, 2024",
      slug: "flagpole-installation-guide",
      image: "/flagpole-installation.jpg",
    },
    {
      title: "Flag Etiquette: Displaying the American Flag",
      excerpt: "Everything you need to know about proper flag display and etiquette.",
      date: "March 5, 2024",
      slug: "flag-etiquette",
      image: "/american-flag-etiquette.jpg",
    },
    {
      title: "Maintaining Your Flagpole",
      excerpt: "Tips for keeping your flagpole in excellent condition year-round.",
      date: "February 28, 2024",
      slug: "flagpole-maintenance",
      image: "/flagpole-maintenance.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Blog & Resources</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            Expert advice, guides, and tips for flagpole owners and enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-[#C8A55C] font-medium mb-2">{post.date}</p>
                <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">{post.title}</h2>
                <p className="text-[#0B1C2C]/70 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#C8A55C] hover:text-[#a88947] font-medium transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
