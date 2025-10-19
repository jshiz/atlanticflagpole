import { Star, Quote } from "lucide-react"

export default function ReviewsPage() {
  const reviews = [
    {
      name: "John Mitchell",
      location: "Dallas, TX",
      rating: 5,
      date: "March 2024",
      product: "25ft Telescoping Flagpole",
      review:
        "Outstanding quality and incredibly easy to install. The telescoping design makes maintenance a breeze. I've had it up for 6 months now and it still looks brand new. Highly recommend!",
    },
    {
      name: "Sarah Thompson",
      location: "Portland, OR",
      rating: 5,
      date: "February 2024",
      product: "20ft Aluminum Flagpole Kit",
      review:
        "The customer service was exceptional. They helped me choose the right size for my property and answered all my questions. The flagpole arrived quickly and was exactly as described. Very happy with my purchase!",
    },
    {
      name: "Michael Rodriguez",
      location: "Miami, FL",
      rating: 5,
      date: "February 2024",
      product: "Presidential Package",
      review:
        "This is a premium product through and through. The finish is beautiful, the hardware is solid, and it's held up perfectly in our coastal weather. Worth every penny.",
    },
    {
      name: "Emily Chen",
      location: "Seattle, WA",
      rating: 5,
      date: "January 2024",
      product: "Indoor Flagpole Set",
      review:
        "Perfect for our office lobby. The quality is excellent and it looks very professional. Installation was straightforward and the included flag is beautiful.",
    },
    {
      name: "David Wilson",
      location: "Phoenix, AZ",
      rating: 5,
      date: "January 2024",
      product: "30ft Commercial Flagpole",
      review:
        "We installed this at our business and it's been fantastic. Very sturdy, even in high winds. The solar light works great and the whole setup looks professional.",
    },
    {
      name: "Jennifer Brown",
      location: "Boston, MA",
      rating: 5,
      date: "December 2023",
      product: "Patriot Bundle",
      review:
        "Everything you need in one package. The quality exceeded my expectations and the price was very competitive. Installation guide was clear and helpful.",
    },
  ]

  const stats = [
    { label: "Average Rating", value: "4.9/5.0" },
    { label: "Total Reviews", value: "12,847" },
    { label: "Recommend", value: "98%" },
    { label: "Repeat Customers", value: "87%" },
  ]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Customer Reviews</h1>
          <p className="text-lg text-[#0B1C2C]/70">See what our customers are saying about Atlantic Flagpole</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl font-bold text-[#C8A55C] mb-2">{stat.value}</div>
              <div className="text-sm text-[#0B1C2C]/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg p-6 md:p-8 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B1C2C]">{review.name}</h3>
                  <p className="text-sm text-[#0B1C2C]/60">{review.location}</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C8A55C] text-[#C8A55C]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#0B1C2C]/60">{review.date}</p>
                </div>
              </div>
              <div className="mb-3">
                <span className="inline-block bg-[#C8A55C]/10 text-[#C8A55C] text-sm font-medium px-3 py-1 rounded-full">
                  {review.product}
                </span>
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#C8A55C]/20" />
                <p className="text-[#0B1C2C]/70 pl-6">{review.review}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-md text-center">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Share Your Experience</h2>
          <p className="text-[#0B1C2C]/70 mb-6">
            We'd love to hear about your experience with Atlantic Flagpole. Your feedback helps us serve you better.
          </p>
          <button className="bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-3 rounded-md transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </main>
  )
}
