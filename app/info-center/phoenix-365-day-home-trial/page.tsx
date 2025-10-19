import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Star, Award, Shield, CheckCircle, Users, TrendingUp, Medal, Trophy } from "lucide-react"
import { getJudgemeReviews, getJudgemeStats } from "@/lib/judgeme"

export const metadata: Metadata = {
  title: "Phoenix 365-Day Home Trial | Atlantic Flagpole",
  description:
    "Experience the legendary Phoenix 365-Day Home Trial. Try America's #1 flagpole at home for a full year. If you're not thrilled, return it. Made in the USA with a lifetime warranty.",
  openGraph: {
    title: "Phoenix 365-Day Home Trial | Atlantic Flagpole",
    description: "Try the Phoenix Flagpole at home for 365 days. America's #1 rated flagpole with lifetime warranty.",
  },
}

async function HomeTrialContent() {
  const [stats, reviews] = await Promise.all([
    getJudgemeStats().catch(() => ({ averageRating: 4.62, totalReviews: 2898, fiveStarCount: 83 })),
    getJudgemeReviews({ per_page: 6, min_rating: 5 }).catch(() => []),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section with Red Accent */}
      <section className="relative bg-gradient-to-br from-[#0A2740] via-[#0B1C2C] to-[#0A2740] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#E63946]/20 to-transparent" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Award Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E63946] text-white text-sm font-semibold mb-6 animate-pulse">
              <Trophy className="w-4 h-4" />
              America's #1 Rated Flagpole
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Legendary{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A55C] via-[#F4E5B8] to-[#C8A55C]">
                Phoenix 365-Day
              </span>{" "}
              Home Trial
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Experience the flagpole that's been trusted by over{" "}
              <span className="text-[#C8A55C] font-semibold">{stats.totalReviews.toLocaleString()}+ Americans</span> for
              a full year. If you're not absolutely thrilled, return it.
            </p>

            {/* Judge.me Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C8A55C] text-[#C8A55C]" />
                  ))}
                </div>
                <span className="text-lg font-semibold">{stats.averageRating}/5.0</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="text-lg">
                <span className="font-semibold text-[#C8A55C]">{stats.totalReviews.toLocaleString()}</span> Verified
                Reviews
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="text-lg">
                <span className="font-semibold text-[#C8A55C]">{stats.fiveStarCount}%</span> 5-Star Rating
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections/telescoping-flagpoles"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#E63946] hover:bg-[#D62839] text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Your 365-Day Trial
              </Link>
              <Link
                href="/flagpole-finder"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-lg transition-all border-2 border-white/30"
              >
                Find Your Perfect Flagpole
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Phoenix is #1 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2740] mb-4">Why Phoenix Has Been #1 for Years</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Decades of American craftsmanship, innovation, and an unwavering commitment to quality have made Phoenix
                the gold standard in flagpoles.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#E63946] flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2740] mb-3">Made in the USA</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every Phoenix flagpole is proudly manufactured in America using premium-grade aluminum and aerospace
                  engineering.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#1F6FFF] flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2740] mb-3">Lifetime Warranty</h3>
                <p className="text-gray-600 leading-relaxed">
                  We stand behind our craftsmanship with a comprehensive lifetime warranty on all Phoenix flagpoles.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#C8A55C] flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2740] mb-3">Patented Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our exclusive telescoping mechanism and wind-resistant engineering set the industry standard.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#E63946] flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2740] mb-3">Trusted by Thousands</h3>
                <p className="text-gray-600 leading-relaxed">
                  Over {stats.totalReviews.toLocaleString()} verified customers have chosen Phoenix for their homes and
                  businesses.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#1F6FFF] flex items-center justify-center mb-4">
                  <Medal className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2740] mb-3">Award-Winning Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Recognized by industry leaders and customers alike for exceptional quality and innovation.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#C8A55C] flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2740] mb-3">Easy Installation</h3>
                <p className="text-gray-600 leading-relaxed">
                  No digging, no concrete. Set up your Phoenix flagpole in minutes with our innovative mounting system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2740] mb-4">How the 365-Day Trial Works</h2>
            <p className="text-xl text-gray-600">
              We're so confident you'll love your Phoenix flagpole that we give you a full year to decide.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E63946] to-[#D62839] text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#0A2740] mb-3">Order Your Flagpole</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your perfect Phoenix flagpole and complete your order. Free shipping on select bundles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1F6FFF] to-[#1557CC] text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#0A2740] mb-3">Try It for 365 Days</h3>
              <p className="text-gray-600 leading-relaxed">
                Install and enjoy your flagpole for a full year. Experience the quality and durability firsthand.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A55C] to-[#B8954C] text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#0A2740] mb-3">Love It or Return It</h3>
              <p className="text-gray-600 leading-relaxed">
                If you're not completely satisfied within 365 days, return it for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#0A2740] mb-4">What Our Customers Say</h2>
                <p className="text-xl text-gray-600">
                  Real reviews from real customers who tried the Phoenix 365-Day Home Trial
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.slice(0, 6).map((review: any) => (
                  <div
                    key={review.id}
                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <h4 className="font-bold text-[#0A2740] mb-2">{review.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">{review.body}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-semibold text-[#0A2740]">{review.reviewer.name}</span>
                      {review.verified_buyer && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1F6FFF]/10 text-[#1F6FFF] text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A2740] hover:bg-[#0B1C2C] text-white font-semibold transition-all"
                >
                  Read All {stats.totalReviews.toLocaleString()} Reviews
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges & Partners */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2740] mb-4">Trusted by America's Best</h2>
              <p className="text-xl text-gray-600">Backed by industry leaders and recognized for excellence</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all">
                <div className="w-16 h-16 rounded-full bg-[#E63946]/10 flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-[#E63946]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-[#0A2740]">A+</div>
                  <div className="text-sm text-gray-600">BBB Rating</div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all">
                <div className="w-16 h-16 rounded-full bg-[#1F6FFF]/10 flex items-center justify-center mb-3">
                  <Shield className="w-8 h-8 text-[#1F6FFF]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-[#0A2740]">100%</div>
                  <div className="text-sm text-gray-600">Made in USA</div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all">
                <div className="w-16 h-16 rounded-full bg-[#C8A55C]/10 flex items-center justify-center mb-3">
                  <Trophy className="w-8 h-8 text-[#C8A55C]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-[#0A2740]">#1</div>
                  <div className="text-sm text-gray-600">Industry Leader</div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-[#C8A55C] transition-all">
                <div className="w-16 h-16 rounded-full bg-[#E63946]/10 flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-[#E63946]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-[#0A2740]">{stats.averageRating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0A2740] via-[#0B1C2C] to-[#0A2740] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1600')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience the Phoenix Difference?</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Join {stats.totalReviews.toLocaleString()}+ satisfied customers and start your 365-day home trial today.
              Made in America, backed by a lifetime warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections/telescoping-flagpoles"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#E63946] hover:bg-[#D62839] text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Your 365-Day Trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-lg transition-all border-2 border-white/30"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function PhoenixHomeTrialPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#C8A55C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <HomeTrialContent />
    </Suspense>
  )
}
