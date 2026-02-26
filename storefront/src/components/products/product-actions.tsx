"use client"

import { useState } from "react"

type ProductActionsProps = {
  productId: string
  variants: {
    id: string
    title: string
    inventory_quantity?: number
    calculated_price?: {
      calculated_amount: number
      currency_code: string
    }
  }[]
}

export default function ProductActions({ productId, variants }: ProductActionsProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.id || "")
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  const currentVariant = variants.find((v) => v.id === selectedVariant)
  const inStock = (currentVariant?.inventory_quantity ?? 0) > 0

  const handleAddToCart = async () => {
    if (!selectedVariant || !inStock) return
    setAdding(true)
    // Cart add logic will be connected via context
    // For now, store in localStorage as a simple cart
    try {
      const cart = JSON.parse(localStorage.getItem("akro_cart") || "[]")
      const existing = cart.find((item: { variantId: string }) => item.variantId === selectedVariant)
      if (existing) {
        existing.quantity += quantity
      } else {
        cart.push({ variantId: selectedVariant, productId, quantity })
      }
      localStorage.setItem("akro_cart", JSON.stringify(cart))
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Variant Selector */}
      {variants.length > 1 && (
        <div>
          <label className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-2 block">
            Variant
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  selectedVariant === variant.id
                    ? "border-brand-gold bg-brand-gold-light text-brand-gold"
                    : "border-border-default text-text-secondary hover:border-brand-gold/30"
                }`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-2 block">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-default text-text-secondary hover:border-brand-gold/30 transition-colors"
          >
            -
          </button>
          <span className="text-sm font-medium w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-default text-text-secondary hover:border-brand-gold/30 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={adding || !inStock}
        className="btn-primary w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!inStock ? "Out of Stock" : adding ? "Adding..." : "Add to Cart"}
      </button>

      {/* Research disclaimer */}
      <p className="text-xs text-text-muted text-center">
        For research purposes only. Not for human consumption.
      </p>
    </div>
  )
}
