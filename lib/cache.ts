// Simple in-memory cache for server-side data
import { cacheMetrics } from "./performance"

const cache = new Map<string, { data: any; timestamp: number }>()

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (!cached) {
    cacheMetrics.recordMiss()
    return null
  }

  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION
  if (isExpired) {
    cache.delete(key)
    cacheMetrics.recordMiss()
    return null
  }

  cacheMetrics.recordHit()
  return cached.data as T
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export function clearCache(key?: string): void {
  if (key) {
    cache.delete(key)
  } else {
    cache.clear()
  }
}
