"use client"

import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onMobileFilterToggle: () => void
  resultCount: number
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onMobileFilterToggle,
  resultCount,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={onMobileFilterToggle}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle filters</span>
          </Button>

          {/* Search Input */}
          <div
            className={`relative flex-1 max-w-md transition-all duration-200 ${
              isFocused ? "ring-2 ring-accent/20 rounded-lg" : ""
            }`}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search styles, fabrics, occasions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-10 bg-card border-border/50 focus-visible:border-accent focus-visible:ring-accent/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultCount}</span> styles
        </p>
      </div>
    </div>
  )
}
