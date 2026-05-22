"use client"

import Image from "next/image"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface Product {
  id: string
  name: string
  category: string
  gender: "Men" | "Women" | "Kids"
  occasion: string[]
  fabric: string
  startingPrice: number
  image: string
  badge: "Made to Measure" | "Ready to Ship"
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/30">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge
          className={
            product.badge === "Made to Measure"
              ? "bg-gold-muted text-primary border-0"
              : "bg-primary text-primary-foreground border-0"
          }
        >
          {product.badge}
        </Badge>
      </div>

      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Starting from{" "}
          <span className="font-semibold text-primary">{formatPrice(product.startingPrice)}</span>
        </p>

        <Button asChild className="mt-auto w-full bg-primary hover:bg-gold-bright text-primary-foreground">
          <Link href="/order">Customize & Order</Link>
        </Button>

        {/* Paystack Badge */}
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-border">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Secured by</span>
          <span className="text-xs font-semibold text-foreground">Paystack</span>
        </div>
      </div>
    </div>
  )
}
