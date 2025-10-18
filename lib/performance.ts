// Performance tracking utilities for monitoring site performance

export interface PerformanceMetric {
  name: string
  duration: number
  timestamp: number
  metadata?: Record<string, any>
}

class PerformanceTracker {
  private metrics: PerformanceMetric[] = []
  private timers: Map<string, number> = new Map()

  start(name: string): void {
    this.timers.set(name, Date.now())
  }

  end(name: string, metadata?: Record<string, any>): PerformanceMetric | null {
    const startTime = this.timers.get(name)
    if (!startTime) {
      console.warn(`[Performance] No start time found for "${name}"`)
      return null
    }

    const duration = Date.now() - startTime
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    }

    this.metrics.push(metric)
    this.timers.delete(name)

    // Log slow operations
    if (duration > 1000) {
      console.warn(`[Performance] Slow operation detected: "${name}" took ${duration}ms`, metadata)
    } else {
      console.log(`[Performance] "${name}" completed in ${duration}ms`)
    }

    return metric
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name)
  }

  getAverageDuration(name: string): number {
    const metrics = this.getMetricsByName(name)
    if (metrics.length === 0) return 0
    const total = metrics.reduce((sum, m) => sum + m.duration, 0)
    return total / metrics.length
  }

  clear(): void {
    this.metrics = []
    this.timers.clear()
  }

  getSummary(): {
    totalMetrics: number
    slowOperations: PerformanceMetric[]
    averages: Record<string, number>
  } {
    const uniqueNames = [...new Set(this.metrics.map((m) => m.name))]
    const averages: Record<string, number> = {}

    uniqueNames.forEach((name) => {
      averages[name] = this.getAverageDuration(name)
    })

    return {
      totalMetrics: this.metrics.length,
      slowOperations: this.metrics.filter((m) => m.duration > 1000),
      averages,
    }
  }
}

// Global performance tracker instance
export const performanceTracker = new PerformanceTracker()

// Helper function to track async operations
export async function trackPerformance<T>(
  name: string,
  operation: () => Promise<T>,
  metadata?: Record<string, any>,
): Promise<T> {
  performanceTracker.start(name)
  try {
    const result = await operation()
    performanceTracker.end(name, { ...metadata, success: true })
    return result
  } catch (error) {
    performanceTracker.end(name, {
      ...metadata,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
    throw error
  }
}

// Helper to measure cache hit rates
export class CacheMetrics {
  private hits = 0
  private misses = 0

  recordHit(): void {
    this.hits++
  }

  recordMiss(): void {
    this.misses++
  }

  getHitRate(): number {
    const total = this.hits + this.misses
    return total === 0 ? 0 : (this.hits / total) * 100
  }

  getStats(): { hits: number; misses: number; hitRate: number; total: number } {
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: this.getHitRate(),
      total: this.hits + this.misses,
    }
  }

  reset(): void {
    this.hits = 0
    this.misses = 0
  }
}

export const cacheMetrics = new CacheMetrics()
