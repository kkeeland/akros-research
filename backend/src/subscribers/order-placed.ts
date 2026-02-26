import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function orderPlacedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderService = container.resolve("order")
  const order = await orderService.retrieveOrder(event.data.id, {
    relations: ["items", "shipping_address"],
  })

  // Notify OpenClaw webhook
  const webhookUrl = process.env.OPENCLAW_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENCLAW_API_KEY || ""}`,
        },
        body: JSON.stringify({
          event: "order.placed",
          data: {
            id: order.id,
            display_id: order.display_id,
            email: order.email,
            total: order.total,
            currency_code: order.currency_code,
            items: order.items?.map((item: any) => ({
              title: item.title,
              quantity: item.quantity,
              unit_price: item.unit_price,
            })),
            shipping_address: order.shipping_address,
            created_at: order.created_at,
          },
        }),
      })
    } catch (error) {
      console.error("Failed to notify OpenClaw:", error)
    }
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
