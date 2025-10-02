export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar with Logo and Actions */}
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button Skeleton */}
          <div className="lg:hidden w-6 h-6 bg-gray-200 rounded animate-pulse" />

          {/* Logo Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            <div className="hidden md:block space-y-2">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-28 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Search Bar Skeleton - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Right Actions Skeleton */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 mr-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="hidden lg:block w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="hidden lg:block w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Navigation Bar Skeleton - Desktop */}
        <div className="hidden lg:block border-t border-gray-100">
          <nav className="flex items-center justify-center gap-8 py-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
