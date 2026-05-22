"use client"

import { useState } from "react"
import { CalendarIcon, Truck, Zap } from "lucide-react"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { type DeliveryDetails, type DeliveryMethod, DELIVERY_PRICES, formatNaira } from "@/lib/order-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]

interface DeliveryStepProps {
  delivery: DeliveryDetails | null
  onUpdateDelivery: (delivery: DeliveryDetails) => void
  onNext: () => void
  onBack: () => void
}

export function DeliveryStep({
  delivery,
  onUpdateDelivery,
  onNext,
  onBack,
}: DeliveryStepProps) {
  const [formData, setFormData] = useState<DeliveryDetails>(
    delivery || {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      preferredDate: null,
      deliveryMethod: "standard",
    }
  )

  const handleChange = <K extends keyof DeliveryDetails>(
    field: K,
    value: DeliveryDetails[K]
  ) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdateDelivery(updated)
  }

  const minDate = addDays(new Date(), formData.deliveryMethod === "express" ? 7 : 14)

  const isValid =
    formData.fullName.trim() !== "" &&
    formData.phoneNumber.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state !== ""

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Delivery Details
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Where should we deliver your custom outfit?
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-[#1B4332]">Contact Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#1B4332]">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="border-[#1B4332]/20 focus:border-[#D4A017]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-[#1B4332]">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+234 XXX XXX XXXX"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="border-[#1B4332]/20 focus:border-[#D4A017]"
            />
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4">
        <h3 className="font-semibold text-[#1B4332]">Delivery Address</h3>
        
        <div className="space-y-2">
          <Label htmlFor="address" className="text-[#1B4332]">Street Address</Label>
          <Input
            id="address"
            placeholder="Enter your street address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="border-[#1B4332]/20 focus:border-[#D4A017]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#1B4332]">City</Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="border-[#1B4332]/20 focus:border-[#D4A017]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state" className="text-[#1B4332]">State</Label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="flex h-10 w-full rounded-md border border-[#1B4332]/20 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:ring-offset-2"
            >
              <option value="">Select state</option>
              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Preferred Delivery Date */}
      <div className="space-y-2">
        <Label className="text-[#1B4332]">Preferred Delivery Date (Optional)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-[#1B4332]/20",
                !formData.preferredDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.preferredDate ? (
                format(formData.preferredDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.preferredDate || undefined}
              onSelect={(date) => handleChange("preferredDate", date || null)}
              disabled={(date) => date < minDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-[#1B4332]/60">
          Earliest available: {format(minDate, "PPP")}
        </p>
      </div>

      {/* Delivery Method */}
      <div className="space-y-3">
        <Label className="text-[#1B4332] font-semibold">Delivery Method</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleChange("deliveryMethod", "standard")}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all",
              formData.deliveryMethod === "standard"
                ? "border-[#D4A017] bg-[#D4A017]/5"
                : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
            )}
          >
            <Truck className="h-6 w-6 text-[#1B4332] mt-0.5" />
            <div>
              <p className="font-semibold text-[#1B4332]">Standard Delivery</p>
              <p className="text-sm text-[#1B4332]/60">14-21 business days</p>
              <p className="text-sm font-bold text-[#D4A017] mt-2">
                {formatNaira(DELIVERY_PRICES.standard)}
              </p>
            </div>
          </button>

          <button
            onClick={() => handleChange("deliveryMethod", "express")}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all",
              formData.deliveryMethod === "express"
                ? "border-[#D4A017] bg-[#D4A017]/5"
                : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
            )}
          >
            <Zap className="h-6 w-6 text-[#D4A017] mt-0.5" />
            <div>
              <p className="font-semibold text-[#1B4332]">Express Delivery</p>
              <p className="text-sm text-[#1B4332]/60">7-10 business days</p>
              <p className="text-sm font-bold text-[#D4A017] mt-2">
                {formatNaira(DELIVERY_PRICES.express)}
              </p>
            </div>
          </button>
        </div>
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
          Continue to Summary
        </Button>
      </div>
    </div>
  )
}
