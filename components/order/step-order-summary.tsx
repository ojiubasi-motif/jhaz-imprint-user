"use client"

import { useState } from "react"
import { Pencil, Tag, Check, X } from "lucide-react"
import { format, addDays } from "date-fns"
import {
  type OrderData,
  OUTFIT_STYLES,
  FABRIC_PRESETS,
  calculateOrderTotal,
  formatNaira,
} from "@/lib/order-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface OrderSummaryStepProps {
  order: OrderData
  onEditStep: (step: number) => void
  onApplyPromo: (code: string) => void
  onNext: () => void
  onBack: () => void
}

export function OrderSummaryStep({
  order,
  onEditStep,
  onApplyPromo,
  onNext,
  onBack,
}: OrderSummaryStepProps) {
  const [promoCode, setPromoCode] = useState(order.promoCode)
  const [promoError, setPromoError] = useState("")
  const [promoSuccess, setPromoSuccess] = useState(order.promoCode === "JHAZ10")

  const pricing = calculateOrderTotal(order)
  const style = OUTFIT_STYLES.find((s) => s.id === order.style)
  const fabric = FABRIC_PRESETS.find((f) => f.id === order.fabric?.presetId)

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "JHAZ10") {
      onApplyPromo(promoCode.toUpperCase())
      setPromoSuccess(true)
      setPromoError("")
    } else if (promoCode.trim() === "") {
      setPromoError("")
    } else {
      setPromoError("Invalid promo code")
      setPromoSuccess(false)
    }
  }

  const estimatedDelivery = order.delivery?.deliveryMethod === "express"
    ? addDays(new Date(), 10)
    : addDays(new Date(), 21)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Order Summary
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Review your order before proceeding to payment
        </p>
      </div>

      <div className="space-y-4">
        {/* Style Section */}
        <div className="bg-[#FDF6EC] rounded-lg p-4 border border-[#1B4332]/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-[#1B4332]">Outfit Style</h3>
              <p className="text-[#1B4332]/70">{style?.name}</p>
              <p className="text-sm text-[#D4A017] font-medium">{formatNaira(style?.basePrice || 0)}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(1)}
              className="text-[#1B4332]/60 hover:text-[#1B4332]"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Fabric Section */}
        <div className="bg-[#FDF6EC] rounded-lg p-4 border border-[#1B4332]/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-[#1B4332]">Fabric</h3>
              {order.fabric?.type === "preset" ? (
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="h-6 w-6 rounded border border-[#1B4332]/20"
                    style={{ backgroundColor: fabric?.color }}
                  />
                  <span className="text-[#1B4332]/70">{fabric?.name}</span>
                </div>
              ) : (
                <p className="text-[#1B4332]/70">Custom fabric uploaded</p>
              )}
              {order.fabric?.notes && (
                <p className="text-xs text-[#1B4332]/50 mt-1 italic">
                  Note: {order.fabric.notes}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(2)}
              className="text-[#1B4332]/60 hover:text-[#1B4332]"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Measurements Section */}
        <div className="bg-[#FDF6EC] rounded-lg p-4 border border-[#1B4332]/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-[#1B4332]">Measurements</h3>
              <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-[#1B4332]/70">
                <span>Chest: {order.measurements?.chest}cm</span>
                <span>Waist: {order.measurements?.waist}cm</span>
                <span>Hips: {order.measurements?.hips}cm</span>
                <span>Height: {order.measurements?.height}cm</span>
                <span>Shoulder: {order.measurements?.shoulderWidth}cm</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(3)}
              className="text-[#1B4332]/60 hover:text-[#1B4332]"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Personalization Section */}
        <div className="bg-[#FDF6EC] rounded-lg p-4 border border-[#1B4332]/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-[#1B4332]">Personalization</h3>
              <div className="mt-2 space-y-1 text-sm text-[#1B4332]/70">
                <p>Embroidery: {order.personalization?.embroideryStyle}</p>
                <p>Neckline: {order.personalization?.necklineType}</p>
                <p>Sleeves: {order.personalization?.sleeveLength}</p>
                {order.personalization?.addLining && <p>Premium Lining: Yes</p>}
                {order.personalization?.accessories && order.personalization.accessories.length > 0 && (
                  <p>Accessories: {order.personalization.accessories.join(", ")}</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(4)}
              className="text-[#1B4332]/60 hover:text-[#1B4332]"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="bg-[#FDF6EC] rounded-lg p-4 border border-[#1B4332]/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-[#1B4332]">Delivery</h3>
              <div className="mt-2 space-y-1 text-sm text-[#1B4332]/70">
                <p>{order.delivery?.fullName}</p>
                <p>{order.delivery?.phoneNumber}</p>
                <p>{order.delivery?.address}</p>
                <p>{order.delivery?.city}, {order.delivery?.state}</p>
                <p className="font-medium text-[#1B4332] mt-2">
                  {order.delivery?.deliveryMethod === "express" ? "Express" : "Standard"} Delivery
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(5)}
              className="text-[#1B4332]/60 hover:text-[#1B4332]"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="border border-[#1B4332]/10 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-[#D4A017]" />
          <span className="font-medium text-[#1B4332]">Promo Code</span>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="border-[#1B4332]/20 focus:border-[#D4A017]"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            className="border-[#1B4332]/30 text-[#1B4332] px-6"
          >
            Apply
          </Button>
        </div>
        {promoError && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <X className="h-4 w-4" />
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <Check className="h-4 w-4" />
            10% discount applied!
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="border border-[#1B4332]/20 rounded-lg p-4 bg-white">
        <h3 className="font-semibold text-[#1B4332] mb-3">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#1B4332]/70">
            <span>Outfit Base Price</span>
            <span>{formatNaira(pricing.basePrice)}</span>
          </div>
          <div className="flex justify-between text-[#1B4332]/70">
            <span>Customization Fee</span>
            <span>{formatNaira(pricing.customizationFee)}</span>
          </div>
          <div className="flex justify-between text-[#1B4332]/70">
            <span>Delivery Fee</span>
            <span>{formatNaira(pricing.deliveryFee)}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatNaira(pricing.discount)}</span>
            </div>
          )}
          <div className="border-t border-[#1B4332]/10 pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg text-[#1B4332]">
              <span>Total</span>
              <span className="text-[#D4A017]">{formatNaira(pricing.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="text-center text-sm text-[#1B4332]/70">
        <span className="font-medium text-[#1B4332]">Estimated Delivery:</span>{" "}
        {format(estimatedDelivery, "MMMM d, yyyy")}
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
          className="bg-[#D4A017] hover:bg-[#D4A017]/90 text-white px-8"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  )
}
