import { Star } from "lucide-react"
import { getJudgemeStats } from "@/lib/judgeme"
import Image from "next/image"

export async function JudgemeBadge() {
  const stats = await getJudgemeStats()

  return (
    <a
      href="https://judge.me/reviews/stores/atlanticflagpole.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all shadow-md border-2 border-white"
    >
      <Image src="/images/judge-me-logo.webp" alt="Judge.me" width={60} height={16} className="h-4 w-auto" />
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < Math.floor(stats.averageRating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-300 text-gray-300"}`}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-black">{stats.averageRating.toFixed(1)}</span>
      <span className="text-xs text-gray-700">({stats.totalReviews.toLocaleString()})</span>
    </a>
  )
}
