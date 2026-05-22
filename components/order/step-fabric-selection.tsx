"use client"

import { useState } from "react"
import { Upload, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { FABRIC_PRESETS, type FabricSelection, formatNaira } from "@/lib/order-types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface FabricSelectionStepProps {
  fabric: FabricSelection | null
  onSelectFabric: (fabric: FabricSelection) => void
  onNext: () => void
  onBack: () => void
}

export function FabricSelectionStep({
  fabric,
  onSelectFabric,
  onNext,
  onBack,
}: FabricSelectionStepProps) {
  const [notes, setNotes] = useState(fabric?.notes || "")
  const [customImage, setCustomImage] = useState<string | null>(
    fabric?.type === "custom" ? fabric.customImageUrl || null : null
  )

  const handlePresetSelect = (presetId: string) => {
    onSelectFabric({
      type: "preset",
      presetId,
      notes,
    })
  }

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCustomImage(url)
      onSelectFabric({
        type: "custom",
        customImageUrl: url,
        notes,
      })
    }
  }

  const handleNotesChange = (value: string) => {
    setNotes(value)
    if (fabric) {
      onSelectFabric({ ...fabric, notes: value })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Select Your Fabric
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Choose from our premium fabrics or upload your own
        </p>
      </div>

      {/* Preset Fabrics */}
      <div>
        <h3 className="text-lg font-semibold text-[#1B4332] mb-3">
          Premium Fabric Swatches
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FABRIC_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className={cn(
                "relative p-3 rounded-lg border-2 transition-all text-left",
                fabric?.type === "preset" && fabric.presetId === preset.id
                  ? "border-[#D4A017] ring-2 ring-[#D4A017]/30"
                  : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
              )}
            >
              <div
                className="h-16 w-full rounded-md mb-2 border border-[#1B4332]/10"
                style={{ backgroundColor: preset.color }}
              />
              <p className="text-sm font-medium text-[#1B4332] truncate">
                {preset.name}
              </p>
              <p className="text-xs text-[#1B4332]/60">
                {preset.price === 0 ? "Included" : `+${formatNaira(preset.price)}`}
              </p>
              
              {fabric?.type === "preset" && fabric.presetId === preset.id && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[#D4A017] flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Upload */}
      <div>
        <h3 className="text-lg font-semibold text-[#1B4332] mb-3">
          Or Upload Your Own Fabric
        </h3>
        <label
          className={cn(
            "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            customImage
              ? "border-[#D4A017] bg-[#D4A017]/5"
              : "border-[#1B4332]/20 hover:border-[#1B4332]/40 bg-[#FDF6EC]/50"
          )}
        >
          {customImage ? (
            <div className="flex items-center gap-3">
              <div
                className="h-16 w-16 rounded-md bg-cover bg-center border"
                style={{ backgroundImage: `url(${customImage})` }}
              />
              <div className="text-left">
                <p className="text-sm font-medium text-[#1B4332]">
                  Custom fabric uploaded
                </p>
                <p className="text-xs text-[#1B4332]/60">
                  Click to change
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-[#1B4332]/40 mb-2" />
              <p className="text-sm text-[#1B4332]/70">
                Click to upload fabric photo
              </p>
              <p className="text-xs text-[#1B4332]/50">
                PNG, JPG up to 5MB
              </p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleCustomUpload}
          />
        </label>
      </div>

      {/* Notes for Tailor */}
      <div className="space-y-2">
        <Label htmlFor="fabric-notes" className="text-[#1B4332]">
          Notes for the Tailor (Optional)
        </Label>
        <Textarea
          id="fabric-notes"
          placeholder="Any specific fabric preferences, patterns, or instructions..."
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
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
          disabled={!fabric}
          className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white px-8"
        >
          Continue to Measurements
        </Button>
      </div>
    </div>
  )
}
