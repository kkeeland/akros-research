import { sdk } from "./client"

export async function getProductsList(params: {
  limit?: number
  offset?: number
  collection_id?: string[]
  category_id?: string[]
  region_id?: string
}) {
  const { limit = 12, offset = 0, region_id, ...rest } = params

  return sdk.store.product.list({
    limit,
    offset,
    region_id,
    fields:
      "*variants.calculated_price,+variants.inventory_quantity",
    ...rest,
  })
}

export async function getProductByHandle(handle: string, regionId: string) {
  const { products } = await sdk.store.product.list({
    handle,
    region_id: regionId,
    fields:
      "*variants.calculated_price,+variants.inventory_quantity",
  })

  return products[0] || null
}

export async function getCollectionsList(limit: number = 10, offset: number = 0) {
  return sdk.store.collection.list({ limit, offset })
}

export async function getCollectionByHandle(handle: string) {
  const { collections } = await sdk.store.collection.list({ handle })
  return collections[0] || null
}

export async function getCategoriesList(limit: number = 10, offset: number = 0) {
  return sdk.store.category.list({ limit, offset })
}

export async function getCategoryByHandle(handle: string) {
  const { product_categories } = await sdk.store.category.list({ handle })
  return product_categories[0] || null
}
