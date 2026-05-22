"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { type Measurements } from "@/lib/order-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const MEASUREMENT_GUIDES = {
  chest: "Measure around the fullest part of your chest, keeping the tape horizontal.",
  waist: "Measure around your natural waistline, keeping the tape comfortably loose.",
  hips: "Measure around the fullest part of your hips, about 20cm below your waist.",
  height: "Stand straight against a wall and measure from floor to top of head.",
  shoulderWidth: "Measure from the edge of one shoulder to the edge of the other.",
}

interface MeasurementsStepProps {
  measurements: Measurements | null
  onUpdateMeasurements: (measurements: Measurements) => void
  onNext: () => void
  onBack: () => void
}

export function MeasurementsStep({
  measurements,
  onUpdateMeasurements,
  onNext,
  onBack,
}: MeasurementsStepProps) {
  const [formData, setFormData] = useState<Measurements>(
    measurements || {
      chest: 0,
      waist: 0,
      hips: 0,
      height: 0,
      shoulderWidth: 0,
      saveForFuture: false,
    }
  )

  const handleChange = (field: keyof Measurements, value: number | boolean) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdateMeasurements(updated)
  }

  const isValid =
    formData.chest > 0 &&
    formData.waist > 0 &&
    formData.hips > 0 &&
    formData.height > 0 &&
    formData.shoulderWidth > 0

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1B4332]">
            Your Measurements
          </h2>
          <p className="mt-2 text-[#1B4332]/70">
            Enter your body measurements in centimeters for a perfect fit
          </p>
        </div>

        {/* Size Guide Banner */}
        <div className="bg-[#D4A017]/10 border border-[#D4A017]/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-[#D4A017] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#1B4332]">
                Need help measuring?
              </p>
              <p className="text-xs text-[#1B4332]/70 mt-1">
                Hover over the info icons next to each field for detailed measurement instructions. 
                For best results, have someone help you measure.
              </p>
            </div>
          </div>
        </div>

        {/* Measurement Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "chest", label: "Chest" },
            { key: "waist", label: "Waist" },
            { key: "hips", label: "Hips" },
            { key: "height", label: "Height" },
            { key: "shoulderWidth", label: "Shoulder Width" },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={key} className="text-[#1B4332]">
                  {label} (cm)
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="text-[#1B4332]/50 hover:text-[#1B4332]">
                      <Info className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[250px] bg-[#1B4332] text-white"
                  >
                    <p className="text-xs">
                      {MEASUREMENT_GUIDES[key as keyof typeof MEASUREMENT_GUIDES]}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id={key}
                type="number"
                min="0"
                step="0.5"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={formData[key as keyof Measurements] || ""}
                onChange={(e) =>
                  handleChange(
                    key as keyof Measurements,
                    parseFloat(e.target.value) || 0
                  )
                }
                className="border-[#1B4332]/20 focus:border-[#D4A017]"
              />
            </div>
          ))}
        </div>

        {/* Visual Guide */}
        <div className="bg-[#FDF6EC] rounded-lg p-4 border border-[#1B4332]/10">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-1">
                <span className="text-[#1B4332] font-bold">C</span>
              </div>
              <span className="text-[#1B4332]/70">Chest</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-1">
                <span className="text-[#1B4332] font-bold">W</span>
              </div>
              <span className="text-[#1B4332]/70">Waist</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-1">
                <span className="text-[#1B4332] font-bold">H</span>
              </div>
              <span className="text-[#1B4332]/70">Hips</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-1">
                <span className="text-[#1B4332] font-bold">Ht</span>
              </div>
              <span className="text-[#1B4332]/70">Height</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-1">
                <span className="text-[#1B4332] font-bold">S</span>
              </div>
              <span className="text-[#1B4332]/70">Shoulder</span>
            </div>
          </div>
        </div>

        {/* Save for Future */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="save-measurements"
            checked={formData.saveForFuture}
            onCheckedChange={(checked) =>
              handleChange("saveForFuture", checked as boolean)
            }
            className="border-[#1B4332]/30 data-[state=checked]:bg-[#1B4332]"
          />
          <Label
            htmlFor="save-measurements"
            className="text-sm text-[#1B4332]/80 cursor-pointer"
          >
            Save my measurements for future orders
          </Label>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-[#1B4332]/30 text-[#1B4332]"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!isValid}
            className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white px-8"
          >
            Continue to Personalization
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
