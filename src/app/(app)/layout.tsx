import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Cotnent */}
      <main className="pb-20 md:pb-0">{children}</main>
      {/* Footer */}
      <Footer />
    </>
  )
}
