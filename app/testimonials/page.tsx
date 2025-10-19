import { Star } from "lucide-react"
import { getAllJudgemeReviews, getJudgemeStats } from "@/lib/judgeme"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: "Customer Testimonials | Atlantic Flagpole",
  description: "Read what our customers have to say about Atlantic Flagpole products and service.",
}

export const revalidate = 3600 // Revalidate every 1 hour for testimonials page

export default async function TestimonialsPage() {
  const [stats, allReviews] = await Promise.all([getJudgemeStats(), getAllJudgemeReviews(50)])

  // Separate featured and regular reviews
  const featuredReviews = allReviews.filter((r) => r.featured)
  const regularReviews = allReviews.filter((r) => !r.featured)

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      {/* Hero Section */}
      <section className="bg-[#0B1C2C] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Customer Testimonials</h1>
          <p className="text-xl text-white/80 mb-8">See why thousands of customers trust Atlantic Flagpole</p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-[#C8A55C] text-[#C8A55C]" />
                  ))}
                </div>
                <span className="text-3xl font-bold text-white">{stats.averageRating.toFixed(1)}</span>
              </div>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold text-white mb-1">{stats.totalReviews}</p>
              <p className="text-white/80">Total Reviews</p>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold text-white mb-1">{stats.fiveStarCount}</p>
              <p className="text-white/80">5-Star Reviews</p>
            </div>
          </div>

          <a
            href="https://judge.me/reviews/stores/atlanticflagpole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A55C] hover:bg-[#a88947] text-white rounded-lg transition-colors"
          >
            Write a Review
          </a>
        </div>
      </section>

      {/* Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-8 text-center">Featured Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredReviews.map((review) => (
                <Card key={review.id} className="p-6 bg-white border-2 border-[#C8A55C]">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  {review.title && <h3 className="font-semibold text-[#0B1C2C] mb-2">{review.title}</h3>}
                  <p className="text-[#0B1C2C]/80 leading-relaxed mb-4">{review.body}</p>
                  {review.pictures && review.pictures.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.pictures.slice(0, 3).map((pic, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded overflow-hidden">
                          <Image
                            src={pic.urls.compact || "/placeholder.svg"}
                            alt="Review"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-medium text-[#0B1C2C] text-sm">{review.reviewer.name}</p>
                      {review.reviewer.verified_buyer && <p className="text-xs text-[#C8A55C]">Verified Buyer</p>}
                    </div>
                    <p className="text-xs text-[#0B1C2C]/60">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                  {review.product_title && (
                    <p className="text-xs text-[#0B1C2C]/60 mt-2">Product: {review.product_title}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-8 text-center">All Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {regularReviews.map((review) => (
              <Card key={review.id} className="p-6 bg-[#F5F3EF]">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                {review.title && <h3 className="font-semibold text-[#0B1C2C] mb-2">{review.title}</h3>}
                <p className="text-[#0B1C2C]/80 leading-relaxed mb-4">{review.body}</p>
                {review.pictures && review.pictures.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.pictures.slice(0, 3).map((pic, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={pic.urls.compact || "/placeholder.svg"}
                          alt="Review"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-[#0B1C2C]/10">
                  <div>
                    <p className="font-medium text-[#0B1C2C] text-sm">{review.reviewer.name}</p>
                    {review.reviewer.verified_buyer && <p className="text-xs text-[#C8A55C]">Verified Buyer</p>}
                  </div>
                  <p className="text-xs text-[#0B1C2C]/60">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
                {review.product_title && (
                  <p className="text-xs text-[#0B1C2C]/60 mt-2">Product: {review.product_title}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
