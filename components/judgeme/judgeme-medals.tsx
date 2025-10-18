import { getJudgemeStats } from "@/lib/judgeme"

export async function JudgemeMedals() {
  const stats = await getJudgemeStats()

  // Determine medal based on rating and review count
  const getMedal = () => {
    if (stats.averageRating >= 4.8 && stats.totalReviews >= 1000) {
      return { emoji: "🏆", text: "Excellent", color: "text-yellow-600" }
    } else if (stats.averageRating >= 4.5 && stats.totalReviews >= 500) {
      return { emoji: "🥇", text: "Outstanding", color: "text-yellow-500" }
    } else if (stats.averageRating >= 4.0 && stats.totalReviews >= 100) {
      return { emoji: "🥈", text: "Great", color: "text-gray-400" }
    } else {
      return { emoji: "🥉", text: "Good", color: "text-orange-600" }
    }
  }

  const medal = getMedal()

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full border border-yellow-200/50">
      <span className="text-lg leading-none">{medal.emoji}</span>
      <span className={`text-xs font-bold ${medal.color} leading-none`}>{medal.text}</span>
    </div>
  )
}
