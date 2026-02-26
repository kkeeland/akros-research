import Nav from "@/components/layout/nav"
import Footer from "@/components/layout/footer"

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <>
      <Nav countryCode={countryCode} />
      <main className="min-h-screen">{children}</main>
      <Footer countryCode={countryCode} />
    </>
  )
}
