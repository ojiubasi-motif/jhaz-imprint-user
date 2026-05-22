export type OutfitStyle =
  | "agbada"
  | "ankara"
  | "kaftan"
  | "aso-oke"
  | "babariga"
  | "iro-buba"
  | "senator"

export type EmbroideryStyle =
  | "none"
  | "minimal"
  | "moderate"
  | "elaborate"

export type NecklineType =
  | "round"
  | "v-neck"
  | "mandarin"
  | "open-collar"

export type SleeveLength =
  | "short"
  | "three-quarter"
  | "full"
  | "cap"

export type DeliveryMethod = "standard" | "express"

export interface FabricSelection {
  type: "preset" | "custom"
  presetId?: string
  customImageUrl?: string
  notes?: string
}

export interface Measurements {
  chest: number
  waist: number
  hips: number
  height: number
  shoulderWidth: number
  saveForFuture: boolean
}

export interface Personalization {
  embroideryStyle: EmbroideryStyle
  necklineType: NecklineType
  sleeveLength: SleeveLength
  addLining: boolean
  accessories: string[]
  specialRequests: string
}

export interface DeliveryDetails {
  fullName: string
  phoneNumber: string
  address: string
  city: string
  state: string
  preferredDate: Date | null
  deliveryMethod: DeliveryMethod
}

export interface OrderData {
  style: OutfitStyle | null
  fabric: FabricSelection | null
  measurements: Measurements | null
  personalization: Personalization | null
  delivery: DeliveryDetails | null
  promoCode: string
}

export interface OrderPricing {
  basePrice: number
  customizationFee: number
  deliveryFee: number
  discount: number
  total: number
}

export const OUTFIT_STYLES = [
  { id: "agbada", name: "Agbada", description: "Traditional flowing robe", basePrice: 85000 },
  { id: "ankara", name: "Ankara", description: "Vibrant African prints", basePrice: 45000 },
  { id: "kaftan", name: "Kaftan", description: "Elegant loose-fitting garment", basePrice: 55000 },
  { id: "aso-oke", name: "Aso-Oke", description: "Hand-woven ceremonial fabric", basePrice: 120000 },
  { id: "babariga", name: "Babariga", description: "Flowing outer garment", basePrice: 75000 },
  { id: "iro-buba", name: "Iro & Buba", description: "Traditional wrapper set", basePrice: 65000 },
  { id: "senator", name: "Senator", description: "Modern Nigerian formal wear", basePrice: 60000 },
] as const

export const FABRIC_PRESETS = [
  { id: "cotton-white", name: "Premium Cotton - White", color: "#FFFFFF", price: 0 },
  { id: "cotton-cream", name: "Premium Cotton - Cream", color: "#FDF6EC", price: 0 },
  { id: "silk-gold", name: "Silk Blend - Gold", color: "#D4A017", price: 15000 },
  { id: "silk-green", name: "Silk Blend - Deep Green", color: "#1B4332", price: 15000 },
  { id: "lace-white", name: "Swiss Lace - White", color: "#FFFEFA", price: 25000 },
  { id: "lace-champagne", name: "Swiss Lace - Champagne", color: "#F7E7CE", price: 25000 },
  { id: "brocade-burgundy", name: "Brocade - Burgundy", color: "#722F37", price: 20000 },
  { id: "brocade-navy", name: "Brocade - Navy", color: "#1B2A4E", price: 20000 },
] as const

export const DELIVERY_PRICES = {
  standard: 3500,
  express: 7500,
} as const

export const CUSTOMIZATION_PRICES = {
  embroidery: {
    none: 0,
    minimal: 5000,
    moderate: 12000,
    elaborate: 25000,
  },
  lining: 8000,
  accessories: 3000,
} as const

export function calculateOrderTotal(order: OrderData): OrderPricing {
  const style = OUTFIT_STYLES.find((s) => s.id === order.style)
  const basePrice = style?.basePrice || 0

  const fabric = FABRIC_PRESETS.find((f) => f.id === order.fabric?.presetId)
  const fabricPrice = fabric?.price || 0

  let customizationFee = fabricPrice
  if (order.personalization) {
    customizationFee += CUSTOMIZATION_PRICES.embroidery[order.personalization.embroideryStyle]
    if (order.personalization.addLining) {
      customizationFee += CUSTOMIZATION_PRICES.lining
    }
    customizationFee += order.personalization.accessories.length * CUSTOMIZATION_PRICES.accessories
  }

  const deliveryFee = order.delivery
    ? DELIVERY_PRICES[order.delivery.deliveryMethod]
    : 0

  const subtotal = basePrice + customizationFee + deliveryFee
  const discount = order.promoCode === "JHAZ10" ? subtotal * 0.1 : 0
  const total = subtotal - discount

  return {
    basePrice,
    customizationFee,
    deliveryFee,
    discount,
    total,
  }
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}
