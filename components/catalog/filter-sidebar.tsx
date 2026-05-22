"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export interface FilterState {
  categories: string[]
  genders: string[]
  occasions: string[]
  fabrics: string[]
}

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  productCounts?: {
    categories: Record<string, number>
    genders: Record<string, number>
    occasions: Record<string, number>
    fabrics: Record<string, number>
  }
}

const categories = [
  "Agbada",
  "Ankara",
  "Kaftan",
  "Aso-Oke",
  "Senator",
  "Buba & Iro",
  "Dashiki",
]

const genders = ["Men", "Women", "Kids"]

const occasions = ["Wedding", "Casual", "Corporate", "Party", "Festival", "Cultural"]

const fabrics = [
  "Aso-Oke",
  "Ankara (African Print)",
  "Lace",
  "Jacquard",
  "Guinea Brocade",
  "Atiku",
  "Adire",
]

interface FilterSectionProps {
  title: string
  items: string[]
  selected: string[]
  onChange: (items: string[]) => void
  counts?: Record<string, number>
}

function FilterSection({ title, items, selected, onChange, counts }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleItem = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item))
    } else {
      onChange([...selected, item])
    }
  }

  return (
    <div className="border-b border-border/50 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground hover:text-accent transition-colors"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox
                id={`${title}-${item}`}
                checked={selected.includes(item)}
                onCheckedChange={() => toggleItem(item)}
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label
                htmlFor={`${title}-${item}`}
                className="flex-1 cursor-pointer text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                {item}
              </Label>
              {counts && counts[item] !== undefined && (
                <span className="text-xs text-muted-foreground">({counts[item]})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function FilterSidebar({ filters, onFilterChange, productCounts }: FilterSidebarProps) {
  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      genders: [],
      occasions: [],
      fabrics: [],
    })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.genders.length > 0 ||
    filters.occasions.length > 0 ||
    filters.fabrics.length > 0

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="rounded-xl border border-border/50 bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-semibold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <ScrollArea className="h-auto max-h-[calc(100vh-200px)] pr-2">
          <div className="space-y-1">
            <FilterSection
              title="Category"
              items={categories}
              selected={filters.categories}
              onChange={(categories) => onFilterChange({ ...filters, categories })}
              counts={productCounts?.categories}
            />

            <FilterSection
              title="Gender"
              items={genders}
              selected={filters.genders}
              onChange={(genders) => onFilterChange({ ...filters, genders })}
              counts={productCounts?.genders}
            />

            <FilterSection
              title="Occasion"
              items={occasions}
              selected={filters.occasions}
              onChange={(occasions) => onFilterChange({ ...filters, occasions })}
              counts={productCounts?.occasions}
            />

            <FilterSection
              title="Fabric Type"
              items={fabrics}
              selected={filters.fabrics}
              onChange={(fabrics) => onFilterChange({ ...filters, fabrics })}
              counts={productCounts?.fabrics}
            />
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
