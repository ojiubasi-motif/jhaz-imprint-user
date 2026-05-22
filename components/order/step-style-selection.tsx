"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { OUTFIT_STYLES, type OutfitStyle, formatNaira } from "@/lib/order-types"
import { Button } from "@/components/ui/button"

const STYLE_IMAGES: Record<string, string> = {
  agbada: "/images/products/agbada-royal-blue.jpg",
  ankara: "/images/products/ankara-dress-orange.jpg",
  kaftan: "/images/products/kaftan-white-silver.jpg",
  "aso-oke": "/images/products/aso-oke-purple.jpg",
  babariga: "/images/products/agbada-brown-gold.jpg",
  "iro-buba": "/images/products/ankara-gown-red.jpg",
  senator: "/images/products/senator-green.jpg",
}

interface StyleSelectionProps {
  selectedStyle: OutfitStyle | null
  onSelectStyle: (style: OutfitStyle) => void
  onNext: () => void
}

export function StyleSelection({
  selectedStyle,
  onSelectStyle,
  onNext,
}: StyleSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Choose Your Style
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Select the traditional outfit style you&apos;d like us to create for you
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {OUTFIT_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style.id as OutfitStyle)}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 transition-all duration-300",
              selectedStyle === style.id
                ? "border-[#D4A017] ring-2 ring-[#D4A017]/30"
                : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
            )}
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={STYLE_IMAGES[style.id]}
                alt={style.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {selectedStyle === style.id && (
                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#D4A017] flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
              <h3 className="font-semibold text-white">{style.name}</h3>
              <p className="text-xs text-white/80 mt-0.5">{style.description}</p>
              <p className="text-sm font-bold text-[#D4A017] mt-1">
                From {formatNaira(style.basePrice)}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!selectedStyle}
          className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white px-8"
        >
          Continue to Fabric
        </Button>
      </div>
    </div>
  )
}
