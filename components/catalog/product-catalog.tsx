"use client"

import { useState, useMemo, useCallback } from "react"
import { FilterSidebar, type FilterState } from "@/components/catalog/filter-sidebar"
import { SearchBar } from "@/components/catalog/search-bar"
import { ProductGrid } from "@/components/catalog/product-grid"
import { products } from "@/lib/products-data"
import { X } from "lucide-react"

export function ProductCatalog() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    genders: [],
    occasions: [],
    fabrics: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.fabric.toLowerCase().includes(query) ||
          product.occasion.some((o) => o.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Gender filter
      if (filters.genders.length > 0 && !filters.genders.includes(product.gender)) {
        return false
      }

      // Occasion filter
      if (
        filters.occasions.length > 0 &&
        !filters.occasions.some((o) => product.occasion.includes(o))
      ) {
        return false
      }

      // Fabric filter
      if (filters.fabrics.length > 0 && !filters.fabrics.includes(product.fabric)) {
        return false
      }

      return true
    })
  }, [filters, searchQuery])

  const productCounts = useMemo(() => {
    const counts = {
      categories: {} as Record<string, number>,
      genders: {} as Record<string, number>,
      occasions: {} as Record<string, number>,
      fabrics: {} as Record<string, number>,
    }

    products.forEach((product) => {
      // Categories
      counts.categories[product.category] = (counts.categories[product.category] || 0) + 1
      // Genders
      counts.genders[product.gender] = (counts.genders[product.gender] || 0) + 1
      // Occasions
      product.occasion.forEach((o) => {
        counts.occasions[o] = (counts.occasions[o] || 0) + 1
      })
      // Fabrics
      counts.fabrics[product.fabric] = (counts.fabrics[product.fabric] || 0) + 1
    })

    return counts
  }, [])

  const handleMobileFilterToggle = useCallback(() => {
    setMobileFiltersOpen((prev) => !prev)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Our Collection
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto text-pretty">
            Discover premium Nigerian traditional attire, handcrafted with care. Each piece tells a story of heritage and elegance.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMobileFilterToggle={handleMobileFilterToggle}
          resultCount={filteredProducts.length}
        />

        <div className="mt-6 flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              productCounts={productCounts}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFiltersOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-background shadow-xl lg:hidden overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-serif text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    productCounts={productCounts}
                  />
                </div>
              </div>
            </>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}
