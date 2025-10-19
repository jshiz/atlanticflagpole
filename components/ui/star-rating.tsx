import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  count?: number
  className?: string
}

export function StarRating({ rating, size = "md", showCount = false, count, className }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              i < Math.floor(rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200",
            )}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className={cn("text-gray-600", textSizeClasses[size])}>({count})</span>
      )}
    </div>
  )
}
