"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, name: "Style" },
  { id: 2, name: "Fabric" },
  { id: 3, name: "Measurements" },
  { id: 4, name: "Personalize" },
  { id: 5, name: "Delivery" },
  { id: 6, name: "Summary" },
  { id: 7, name: "Payment" },
  { id: 8, name: "Confirmation" },
]

interface OrderProgressBarProps {
  currentStep: number
}

export function OrderProgressBar({ currentStep }: OrderProgressBarProps) {
  return (
    <div className="w-full py-4 px-2 sm:px-4">
      <div className="relative">
        {/* Progress line background */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#1B4332]/20" />
        
        {/* Progress line filled */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-[#1B4332] transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {/* Step indicators */}
        <div className="relative flex justify-between">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id
            const isCurrent = currentStep === step.id

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300",
                    isCompleted
                      ? "border-[#1B4332] bg-[#1B4332] text-white"
                      : isCurrent
                        ? "border-[#D4A017] bg-[#D4A017] text-white"
                        : "border-[#1B4332]/30 bg-[#FDF6EC] text-[#1B4332]/50"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-[10px] sm:text-xs font-medium text-center max-w-[60px] sm:max-w-none",
                    isCompleted || isCurrent
                      ? "text-[#1B4332]"
                      : "text-[#1B4332]/50"
                  )}
                >
                  {step.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
