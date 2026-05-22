"use client"

import { useState } from "react"
import { OrderProgressBar } from "@/components/order/order-progress-bar"
import { StyleSelection } from "@/components/order/step-style-selection"
import { FabricSelectionStep } from "@/components/order/step-fabric-selection"
import { MeasurementsStep } from "@/components/order/step-measurements"
import { PersonalizationStep } from "@/components/order/step-personalization"
import { DeliveryStep } from "@/components/order/step-delivery"
import { OrderSummaryStep } from "@/components/order/step-order-summary"
import { PaymentStep } from "@/components/order/step-payment"
import { OrderConfirmation } from "@/components/order/step-confirmation"
import {
  type OrderData,
  type OutfitStyle,
  type FabricSelection,
  type Measurements,
  type Personalization,
  type DeliveryDetails,
} from "@/lib/order-types"

export function OrderFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentReference, setPaymentReference] = useState("")
  const [orderData, setOrderData] = useState<OrderData>({
    style: null,
    fabric: null,
    measurements: null,
    personalization: null,
    delivery: null,
    promoCode: "",
  })

  const goToStep = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

  const updateOrderData = <K extends keyof OrderData>(
    key: K,
    value: OrderData[K]
  ) => {
    setOrderData((prev) => ({ ...prev, [key]: value }))
  }

  const handlePaymentComplete = (reference: string) => {
    setPaymentReference(reference)
    goToStep(8)
  }

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-[#1B4332] text-white py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Create Your Custom Outfit
          </h1>
          <p className="mt-2 text-white/70 text-sm sm:text-base">
            Handcrafted Nigerian traditional wear, tailored just for you
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#1B4332]/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <OrderProgressBar currentStep={currentStep} />
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-[#1B4332]/10 p-6 sm:p-8">
          {currentStep === 1 && (
            <StyleSelection
              selectedStyle={orderData.style}
              onSelectStyle={(style: OutfitStyle) => updateOrderData("style", style)}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <FabricSelectionStep
              fabric={orderData.fabric}
              onSelectFabric={(fabric: FabricSelection) => updateOrderData("fabric", fabric)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <MeasurementsStep
              measurements={orderData.measurements}
              onUpdateMeasurements={(m: Measurements) => updateOrderData("measurements", m)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <PersonalizationStep
              personalization={orderData.personalization}
              onUpdatePersonalization={(p: Personalization) => updateOrderData("personalization", p)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <DeliveryStep
              delivery={orderData.delivery}
              onUpdateDelivery={(d: DeliveryDetails) => updateOrderData("delivery", d)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 6 && (
            <OrderSummaryStep
              order={orderData}
              onEditStep={goToStep}
              onApplyPromo={(code: string) => updateOrderData("promoCode", code)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 7 && (
            <PaymentStep
              order={orderData}
              onPaymentComplete={handlePaymentComplete}
              onBack={handleBack}
            />
          )}

          {currentStep === 8 && (
            <OrderConfirmation
              order={orderData}
              paymentReference={paymentReference}
            />
          )}
        </div>
      </div>
    </div>
  )
}
