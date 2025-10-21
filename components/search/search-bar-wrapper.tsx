"use client"

import type React from "react"

import { Suspense } from "react"
import { SearchBar } from "./search-bar"

export function SearchBarWrapper(props: React.ComponentProps<typeof SearchBar>) {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <SearchBar {...props} />
    </Suspense>
  )
}

function SearchBarFallback() {
  return (
    <div className="relative">
      <div className="w-full pl-10 pr-10 h-8 md:h-9 bg-white/80 border border-gray-300 rounded-md animate-pulse" />
    </div>
  )
}
