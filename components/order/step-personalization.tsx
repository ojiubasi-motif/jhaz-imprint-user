"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  type Personalization,
  type EmbroideryStyle,
  type NecklineType,
  type SleeveLength,
  CUSTOMIZATION_PRICES,
  formatNaira,
} from "@/lib/order-types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const EMBROIDERY_OPTIONS: { value: EmbroideryStyle; label: string; description: string }[] = [
  { value: "none", label: "None", description: "Clean, simple finish" },
  { value: "minimal", label: "Minimal", description: "Subtle accents on collar and cuffs" },
  { value: "moderate", label: "Moderate", description: "Elegant patterns on front panel" },
  { value: "elaborate", label: "Elaborate", description: "Full intricate embroidery throughout" },
]

const NECKLINE_OPTIONS: { value: NecklineType; label: string }[] = [
  { value: "round", label: "Round Neck" },
  { value: "v-neck", label: "V-Neck" },
  { value: "mandarin", label: "Mandarin Collar" },
  { value: "open-collar", label: "Open Collar" },
]

const SLEEVE_OPTIONS: { value: SleeveLength; label: string }[] = [
  { value: "short", label: "Short Sleeve" },
  { value: "three-quarter", label: "3/4 Sleeve" },
  { value: "full", label: "Full Length" },
  { value: "cap", label: "Cap Sleeve" },
]

const ACCESSORY_OPTIONS = [
  { id: "cap", label: "Matching Cap/Fila" },
  { id: "shoes", label: "Matching Shoes" },
  { id: "bag", label: "Matching Bag" },
  { id: "jewelry", label: "Jewelry Set" },
]

interface PersonalizationStepProps {
  personalization: Personalization | null
  onUpdatePersonalization: (personalization: Personalization) => void
  onNext: () => void
  onBack: () => void
}

export function PersonalizationStep({
  personalization,
  onUpdatePersonalization,
  onNext,
  onBack,
}: PersonalizationStepProps) {
  const [formData, setFormData] = useState<Personalization>(
    personalization || {
      embroideryStyle: "none",
      necklineType: "round",
      sleeveLength: "full",
      addLining: false,
      accessories: [],
      specialRequests: "",
    }
  )

  const handleChange = <K extends keyof Personalization>(
    field: K,
    value: Personalization[K]
  ) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdatePersonalization(updated)
  }

  const toggleAccessory = (accessoryId: string) => {
    const newAccessories = formData.accessories.includes(accessoryId)
      ? formData.accessories.filter((a) => a !== accessoryId)
      : [...formData.accessories, accessoryId]
    handleChange("accessories", newAccessories)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Personalize Your Outfit
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Customize every detail to make it uniquely yours
        </p>
      </div>

      {/* Embroidery Style */}
      <div className="space-y-3">
        <Label className="text-[#1B4332] font-semibold">Embroidery Style</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EMBROIDERY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange("embroideryStyle", option.value)}
              className={cn(
                "p-3 rounded-lg border-2 text-left transition-all",
                formData.embroideryStyle === option.value
                  ? "border-[#D4A017] bg-[#D4A017]/5"
                  : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
              )}
            >
              <p className="font-medium text-[#1B4332]">{option.label}</p>
              <p className="text-xs text-[#1B4332]/60 mt-1">{option.description}</p>
              <p className="text-xs font-semibold text-[#D4A017] mt-2">
                {CUSTOMIZATION_PRICES.embroidery[option.value] === 0
                  ? "Included"
                  : `+${formatNaira(CUSTOMIZATION_PRICES.embroidery[option.value])}`}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Neckline Type */}
      <div className="space-y-3">
        <Label className="text-[#1B4332] font-semibold">Neckline Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {NECKLINE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange("necklineType", option.value)}
              className={cn(
                "p-3 rounded-lg border-2 text-center transition-all",
                formData.necklineType === option.value
                  ? "border-[#D4A017] bg-[#D4A017]/5"
                  : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
              )}
            >
              <p className="font-medium text-[#1B4332]">{option.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Sleeve Length */}
      <div className="space-y-3">
        <Label className="text-[#1B4332] font-semibold">Sleeve Length</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SLEEVE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange("sleeveLength", option.value)}
              className={cn(
                "p-3 rounded-lg border-2 text-center transition-all",
                formData.sleeveLength === option.value
                  ? "border-[#D4A017] bg-[#D4A017]/5"
                  : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
              )}
            >
              <p className="font-medium text-[#1B4332]">{option.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lining Option */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-[#1B4332]/10 bg-[#FDF6EC]/50">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="add-lining"
            checked={formData.addLining}
            onCheckedChange={(checked) => handleChange("addLining", checked as boolean)}
            className="border-[#1B4332]/30 data-[state=checked]:bg-[#1B4332]"
          />
          <div>
            <Label htmlFor="add-lining" className="text-[#1B4332] font-medium cursor-pointer">
              Add Premium Lining
            </Label>
            <p className="text-xs text-[#1B4332]/60">
              Soft inner lining for extra comfort
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-[#D4A017]">
          +{formatNaira(CUSTOMIZATION_PRICES.lining)}
        </span>
      </div>

      {/* Accessories */}
      <div className="space-y-3">
        <Label className="text-[#1B4332] font-semibold">
          Add Matching Accessories
          <span className="font-normal text-[#1B4332]/60 ml-2">
            (+{formatNaira(CUSTOMIZATION_PRICES.accessories)} each)
          </span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {ACCESSORY_OPTIONS.map((accessory) => (
            <div
              key={accessory.id}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                formData.accessories.includes(accessory.id)
                  ? "border-[#D4A017] bg-[#D4A017]/5"
                  : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
              )}
              onClick={() => toggleAccessory(accessory.id)}
            >
              <Checkbox
                checked={formData.accessories.includes(accessory.id)}
                onCheckedChange={() => toggleAccessory(accessory.id)}
                className="border-[#1B4332]/30 data-[state=checked]:bg-[#D4A017]"
              />
              <span className="text-[#1B4332]">{accessory.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-2">
        <Label htmlFor="special-requests" className="text-[#1B4332] font-semibold">
          Special Requests (Optional)
        </Label>
        <Textarea
          id="special-requests"
          placeholder="Any other customization requests or notes for our tailors..."
          value={formData.specialRequests}
          onChange={(e) => handleChange("specialRequests", e.target.value)}
          className="border-[#1B4332]/20 focus:border-[#D4A017] min-h-[80px]"
        />
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
          className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white px-8"
        >
          Continue to Delivery
        </Button>
      </div>
    </div>
  )
}
