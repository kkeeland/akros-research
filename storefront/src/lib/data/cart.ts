import { sdk } from "./client"

export async function createCart(regionId: string) {
  return sdk.store.cart.create({ region_id: regionId })
}

export async function getCart(cartId: string) {
  return sdk.store.cart.retrieve(cartId, {
    fields:
      "+items,+items.variant,+items.product,+items.variant.calculated_price",
  })
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  return sdk.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  })
}

export async function updateCartItem(cartId: string, lineItemId: string, quantity: number) {
  return sdk.store.cart.updateLineItem(cartId, lineItemId, { quantity })
}

export async function removeCartItem(cartId: string, lineItemId: string) {
  return sdk.store.cart.deleteLineItem(cartId, lineItemId)
}

export async function updateCart(
  cartId: string,
  data: {
    email?: string
    shipping_address?: Record<string, string>
    billing_address?: Record<string, string>
  }
) {
  return sdk.store.cart.update(cartId, data)
}
