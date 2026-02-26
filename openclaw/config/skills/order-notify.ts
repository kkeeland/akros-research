/**
 * Order Notification Skill
 *
 * Handles incoming webhooks from Medusa when orders are placed.
 * Formats order data and sends notifications to the admin team.
 */

interface OrderData {
  id: string
  display_id: number
  email: string
  total: number
  currency_code: string
  items: {
    title: string
    quantity: number
    unit_price: number
  }[]
  shipping_address?: {
    city?: string
    province?: string
    country_code?: string
  }
  created_at: string
}

export function formatOrderNotification(order: OrderData): string {
  const total = (order.total / 100).toFixed(2)
  const items = order.items
    .map((item) => `  - ${item.title} x${item.quantity} ($${(item.unit_price / 100).toFixed(2)})`)
    .join("\n")

  const location = order.shipping_address
    ? `${order.shipping_address.city || ""}, ${order.shipping_address.province || ""} ${order.shipping_address.country_code?.toUpperCase() || ""}`
    : "N/A"

  return `🔔 **New Order #${order.display_id}**

**Total:** $${total} ${order.currency_code.toUpperCase()}
**Customer:** ${order.email}
**Location:** ${location.trim()}

**Items:**
${items}

**Time:** ${new Date(order.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })} ET`
}

export function formatLowStockAlert(items: { title: string; quantity: number }[]): string {
  const list = items
    .map((item) => `  ⚠️ **${item.title}** — ${item.quantity} remaining`)
    .join("\n")

  return `📦 **Low Stock Alert**\n\n${list}\n\nPlease restock soon.`
}
