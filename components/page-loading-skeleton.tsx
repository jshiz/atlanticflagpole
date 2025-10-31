export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[600px] bg-muted" />

      {/* Content sections skeleton */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="h-96 bg-muted rounded-lg" />
        <div className="h-64 bg-muted rounded-lg" />
        <div className="h-96 bg-muted rounded-lg" />
      </div>
    </div>
  )
}
