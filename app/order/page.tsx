import { Metadata } from "next"
import { OrderFlow } from "@/components/order/order-flow"

export const metadata: Metadata = {
  title: "Create Custom Order | Jhaz-Imprints",
  description: "Design your custom Nigerian traditional outfit with Jhaz-Imprints. Choose your style, fabric, measurements, and personalization options.",
}

export default function OrderPage() {
  return <OrderFlow />
}
