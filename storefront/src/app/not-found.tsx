import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-brand-gold mb-4">404</p>
        <h1 className="text-2xl font-heading font-bold mb-2">Page Not Found</h1>
        <p className="text-text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/us" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}
