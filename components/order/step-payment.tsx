"use client"

import { useState } from "react"
import { CreditCard, Building2, Phone, Smartphone, Lock, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { type OrderData, calculateOrderTotal, formatNaira } from "@/lib/order-types"
import { Button } from "@/components/ui/button"

type PaymentMethod = "card" | "bank" | "ussd" | "mobile"

const PAYMENT_METHODS = [
  { id: "card", label: "Card Payment", icon: CreditCard, description: "Debit/Credit Card" },
  { id: "bank", label: "Bank Transfer", icon: Building2, description: "Direct bank transfer" },
  { id: "ussd", label: "USSD", icon: Phone, description: "Pay with USSD code" },
  { id: "mobile", label: "Mobile Money", icon: Smartphone, description: "Mobile wallet" },
] as const

interface PaymentStepProps {
  order: OrderData
  onPaymentComplete: (reference: string) => void
  onBack: () => void
}

export function PaymentStep({
  order,
  onPaymentComplete,
  onBack,
}: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const pricing = calculateOrderTotal(order)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate Paystack payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Generate a mock Paystack reference
    const reference = `PSK_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    setIsProcessing(false)
    onPaymentComplete(reference)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Secure Payment
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Complete your order with Paystack secure checkout
        </p>
      </div>

      {/* Paystack Branding */}
      <div className="bg-gradient-to-r from-[#00C3F7]/10 to-[#0AA5FF]/10 rounded-lg p-4 border border-[#0AA5FF]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#00C3F7] text-white font-bold px-2 py-1 rounded text-sm">
              paystack
            </div>
            <span className="text-sm text-[#1B4332]/70">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-medium">256-bit SSL</span>
          </div>
        </div>
      </div>

      {/* Amount to Pay */}
      <div className="bg-[#1B4332] rounded-lg p-6 text-center">
        <p className="text-white/70 text-sm">Amount to Pay</p>
        <p className="text-3xl font-bold text-[#D4A017] mt-1">
          {formatNaira(pricing.total)}
        </p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#1B4332]">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                  selectedMethod === method.id
                    ? "border-[#D4A017] bg-[#D4A017]/5"
                    : "border-[#1B4332]/10 hover:border-[#1B4332]/30"
                )}
              >
                <Icon className={cn(
                  "h-6 w-6",
                  selectedMethod === method.id ? "text-[#D4A017]" : "text-[#1B4332]/60"
                )} />
                <div>
                  <p className="font-medium text-[#1B4332]">{method.label}</p>
                  <p className="text-xs text-[#1B4332]/60">{method.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Card Form Preview (Mock) */}
      {selectedMethod === "card" && (
        <div className="border border-[#1B4332]/10 rounded-lg p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1B4332]">Card Number</label>
            <div className="flex items-center border border-[#1B4332]/20 rounded-md px-3 py-2">
              <CreditCard className="h-4 w-4 text-[#1B4332]/40 mr-2" />
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="flex-1 bg-transparent outline-none text-sm"
                disabled={isProcessing}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1B4332]">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-[#1B4332]/20 rounded-md px-3 py-2 text-sm"
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1B4332]">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full border border-[#1B4332]/20 rounded-md px-3 py-2 text-sm"
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Info */}
      {selectedMethod === "bank" && (
        <div className="border border-[#1B4332]/10 rounded-lg p-4 bg-[#FDF6EC]/50">
          <p className="text-sm text-[#1B4332]/70">
            You will receive bank transfer details after clicking &quot;Place Order & Pay&quot;.
            Complete the transfer within 30 minutes to confirm your order.
          </p>
        </div>
      )}

      {/* USSD Info */}
      {selectedMethod === "ussd" && (
        <div className="border border-[#1B4332]/10 rounded-lg p-4 bg-[#FDF6EC]/50">
          <p className="text-sm text-[#1B4332]/70">
            Select your bank and dial the USSD code on your phone to complete payment.
            Works with all major Nigerian banks.
          </p>
        </div>
      )}

      {/* Mobile Money Info */}
      {selectedMethod === "mobile" && (
        <div className="border border-[#1B4332]/10 rounded-lg p-4 bg-[#FDF6EC]/50">
          <p className="text-sm text-[#1B4332]/70">
            Pay using your mobile money wallet. Supported: OPay, PalmPay, Kuda, and more.
          </p>
        </div>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-4 py-4 border-t border-b border-[#1B4332]/10">
        <div className="flex items-center gap-2 text-[#1B4332]/60">
          <Lock className="h-4 w-4" />
          <span className="text-xs">Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-[#1B4332]/60">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs">Secured by Paystack</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#00C3F7] text-white font-bold px-1.5 py-0.5 rounded text-[10px]">
            paystack
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="border-[#1B4332]/30 text-[#1B4332]"
        >
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-[#D4A017] hover:bg-[#D4A017]/90 text-white px-8"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            `Place Order & Pay ${formatNaira(pricing.total)}`
          )}
        </Button>
      </div>
    </div>
  )
}
