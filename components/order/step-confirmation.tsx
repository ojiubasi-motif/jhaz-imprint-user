"use client"

import { CheckCircle2, Package, Mail, Calendar, Copy, Check } from "lucide-react"
import { useState } from "react"
import { format, addDays } from "date-fns"
import Link from "next/link"
import {
  type OrderData,
  OUTFIT_STYLES,
  calculateOrderTotal,
  formatNaira,
} from "@/lib/order-types"
import { Button } from "@/components/ui/button"

interface OrderConfirmationProps {
  order: OrderData
  paymentReference: string
}

export function OrderConfirmation({
  order,
  paymentReference,
}: OrderConfirmationProps) {
  const [copiedOrderId, setCopiedOrderId] = useState(false)
  const [copiedRef, setCopiedRef] = useState(false)

  const pricing = calculateOrderTotal(order)
  const style = OUTFIT_STYLES.find((s) => s.id === order.style)
  const orderId = `JHZ-${Date.now().toString(36).toUpperCase()}`
  
  const estimatedDelivery = order.delivery?.deliveryMethod === "express"
    ? addDays(new Date(), 10)
    : addDays(new Date(), 21)

  const copyToClipboard = (text: string, type: "order" | "ref") => {
    navigator.clipboard.writeText(text)
    if (type === "order") {
      setCopiedOrderId(true)
      setTimeout(() => setCopiedOrderId(false), 2000)
    } else {
      setCopiedRef(true)
      setTimeout(() => setCopiedRef(false), 2000)
    }
  }

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25" />
          <div className="relative bg-green-500 rounded-full p-4">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-2xl font-bold text-[#1B4332]">
          Order Placed Successfully!
        </h2>
        <p className="mt-2 text-[#1B4332]/70">
          Thank you for choosing Jhaz-Imprints. Your custom {style?.name} is now being prepared.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-[#FDF6EC] rounded-xl p-6 border border-[#1B4332]/10 text-left space-y-4">
        {/* Order ID */}
        <div className="flex justify-between items-center pb-3 border-b border-[#1B4332]/10">
          <div>
            <p className="text-sm text-[#1B4332]/60">Order ID</p>
            <p className="font-mono font-bold text-[#1B4332]">{orderId}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(orderId, "order")}
            className="text-[#1B4332]/60 hover:text-[#1B4332]"
          >
            {copiedOrderId ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {/* Payment Reference */}
        <div className="flex justify-between items-center pb-3 border-b border-[#1B4332]/10">
          <div>
            <p className="text-sm text-[#1B4332]/60">Paystack Reference</p>
            <p className="font-mono text-sm text-[#1B4332]">{paymentReference}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(paymentReference, "ref")}
            className="text-[#1B4332]/60 hover:text-[#1B4332]"
          >
            {copiedRef ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#1B4332]/60">Item</span>
            <span className="text-[#1B4332] font-medium">{style?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#1B4332]/60">Delivery Method</span>
            <span className="text-[#1B4332] font-medium capitalize">
              {order.delivery?.deliveryMethod}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#1B4332]/60">Delivery Address</span>
            <span className="text-[#1B4332] font-medium text-right max-w-[200px]">
              {order.delivery?.city}, {order.delivery?.state}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#1B4332]/10">
            <span className="font-semibold text-[#1B4332]">Total Paid</span>
            <span className="font-bold text-[#D4A017]">{formatNaira(pricing.total)}</span>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="bg-[#1B4332] rounded-lg p-4 flex items-center justify-center gap-3">
        <Calendar className="h-6 w-6 text-[#D4A017]" />
        <div className="text-left">
          <p className="text-white/70 text-sm">Estimated Delivery</p>
          <p className="text-white font-bold">
            {format(estimatedDelivery, "EEEE, MMMM d, yyyy")}
          </p>
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <div className="flex items-center justify-center gap-2 text-[#1B4332]/70">
        <Mail className="h-5 w-5" />
        <p className="text-sm">
          A confirmation email has been sent to your email address
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          asChild
          className="flex-1 bg-[#1B4332] hover:bg-[#1B4332]/90 text-white"
        >
          <Link href="/track-order">
            <Package className="h-4 w-4 mr-2" />
            Track Your Order
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 border-[#1B4332]/30 text-[#1B4332]"
        >
          <Link href="/catalog">
            Continue Shopping
          </Link>
        </Button>
      </div>

      {/* Support Info */}
      <div className="pt-4 border-t border-[#1B4332]/10">
        <p className="text-sm text-[#1B4332]/60">
          Questions about your order? Contact us at{" "}
          <a href="mailto:support@jhaz-imprints.com" className="text-[#D4A017] hover:underline">
            support@jhaz-imprints.com
          </a>{" "}
          or call{" "}
          <a href="tel:+2348012345678" className="text-[#D4A017] hover:underline">
            +234 801 234 5678
          </a>
        </p>
      </div>
    </div>
  )
}
