import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Orders",
}

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <h1 className="text-2xl font-heading font-bold mb-8">Order History</h1>

      <div className="card-panel p-12 text-center">
        <p className="text-text-muted">No orders yet.</p>
      </div>
    </div>
  )
}
