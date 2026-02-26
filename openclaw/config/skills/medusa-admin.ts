/**
 * Medusa Admin API Skill for OpenClaw
 *
 * Provides the admin bot with access to the Medusa Admin API
 * for querying orders, products, inventory, and analytics.
 */

const MEDUSA_ADMIN_URL = process.env.MEDUSA_ADMIN_URL || "http://localhost:9000"
const ADMIN_API_KEY = process.env.MEDUSA_ADMIN_API_KEY || ""

interface MedusaRequestOptions {
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: Record<string, unknown>
  params?: Record<string, string>
}

async function medusaRequest({ endpoint, method = "GET", body, params }: MedusaRequestOptions) {
  const url = new URL(`${MEDUSA_ADMIN_URL}/admin/${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-medusa-access-token": ADMIN_API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`Medusa API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// === Order Skills ===

export async function getRecentOrders(limit: number = 10) {
  const data = await medusaRequest({
    endpoint: "orders",
    params: { limit: String(limit), order: "-created_at" },
  })
  return data.orders
}

export async function getOrderDetails(orderId: string) {
  const data = await medusaRequest({ endpoint: `orders/${orderId}` })
  return data.order
}

export async function getOrdersByStatus(status: string, limit: number = 10) {
  const data = await medusaRequest({
    endpoint: "orders",
    params: { status, limit: String(limit) },
  })
  return data.orders
}

// === Product Skills ===

export async function getProducts(limit: number = 20) {
  const data = await medusaRequest({
    endpoint: "products",
    params: { limit: String(limit) },
  })
  return data.products
}

export async function getProductDetails(productId: string) {
  const data = await medusaRequest({ endpoint: `products/${productId}` })
  return data.product
}

// === Inventory Skills ===

export async function getInventoryLevels() {
  const data = await medusaRequest({ endpoint: "inventory-items" })
  return data.inventory_items
}

export async function getLowStockItems(threshold: number = 10) {
  const items = await getInventoryLevels()
  return items.filter((item: any) =>
    item.location_levels?.some((level: any) => level.stocked_quantity <= threshold)
  )
}

// === Analytics Skills ===

export async function getDailyReport() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const orders = await medusaRequest({
    endpoint: "orders",
    params: {
      created_at: JSON.stringify({ gte: today.toISOString() }),
      limit: "100",
    },
  })

  const totalRevenue = orders.orders.reduce(
    (sum: number, order: any) => sum + (order.total || 0),
    0
  )

  return {
    date: today.toISOString().split("T")[0],
    orderCount: orders.orders.length,
    totalRevenue: totalRevenue / 100, // Convert from cents
    orders: orders.orders.map((o: any) => ({
      id: o.id,
      display_id: o.display_id,
      total: o.total / 100,
      status: o.status,
      created_at: o.created_at,
    })),
  }
}
