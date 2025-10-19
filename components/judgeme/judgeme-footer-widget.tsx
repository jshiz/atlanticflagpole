import { Star } from "lucide-react"
import { getJudgemeFeaturedReviews, getJudgemeStats } from "@/lib/judgeme"

export async function JudgemeFooterWidget() {
  const [stats, featuredReviews] = await Promise.all([getJudgemeStats(), getJudgemeFeaturedReviews(3)])

  const highRatedReviews = featuredReviews.filter((review) => review.rating >= 4)

  return (
    <div className="bg-[#0B1C2C] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif font-bold text-white mb-2">Trusted by Thousands</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#C8A55C] text-[#C8A55C]" />
              ))}
            </div>
            <span className="text-xl font-bold text-white">{stats.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-white/80">Based on {(stats.totalReviews || 0).toLocaleString()} reviews</p>
        </div>

        {highRatedReviews.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {highRatedReviews.map((review) => (
              <div key={review.id} className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-white/20 text-white/20"}`}
                    />
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed mb-4 line-clamp-4">{review.body}</p>
                <div>
                  <p className="font-medium text-white text-sm">{review.reviewer.name}</p>
                  {review.reviewer.verified_buyer && <p className="text-xs text-[#C8A55C]">Verified Buyer</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="https://judge.me/reviews/stores/atlanticflagpole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A55C] hover:bg-[#a88947] text-white rounded-lg transition-colors"
          >
            Read All Reviews
          </a>
        </div>
      </div>
    </div>
  )
}
