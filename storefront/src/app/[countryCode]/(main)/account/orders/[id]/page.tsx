export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <h1 className="text-2xl font-heading font-bold mb-8">
        Order #{id.slice(0, 8)}
      </h1>
      <div className="card-panel p-8">
        <p className="text-text-muted">Order details will appear here when connected to the backend.</p>
      </div>
    </div>
  )
}
