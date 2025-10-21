import { Star } from "lucide-react"
import { getJudgemeFeaturedReviews, getJudgemeStats } from "@/lib/judgeme"

export async function JudgemeFooterWidget() {
  const [stats, featuredReviews] = await Promise.all([getJudgemeStats(), getJudgemeFeaturedReviews(3)])

  const highRatedReviews = featuredReviews.filter((review) => review.rating >= 4)

  return (
    <div className="bg-[#0B1C2C] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-serif font-bold text-white mb-2">Trusted by Thousands</h3>
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#C8A55C] text-[#C8A55C]" />
              ))}
            </div>
            <span className="text-lg font-bold text-white">{stats.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-white/80 text-sm">Based on {(stats.totalReviews || 0).toLocaleString()} reviews</p>
        </div>

        {highRatedReviews.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {highRatedReviews.map((review) => (
              <div key={review.id} className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-white/20 text-white/20"}`}
                    />
                  ))}
                </div>
                <p className="text-white text-xs leading-relaxed mb-3 line-clamp-4">{review.body}</p>
                <div>
                  <p className="font-medium text-white text-xs">{review.reviewer.name}</p>
                  {review.reviewer.verified_buyer && <p className="text-xs text-[#C8A55C]">Verified Buyer</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <a
            href="https://judge.me/reviews/stores/atlanticflagpole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8A55C] hover:bg-[#a88947] text-white text-sm rounded-lg transition-colors"
          >
            Read All Reviews
          </a>
        </div>
      </div>
    </div>
  )
}
