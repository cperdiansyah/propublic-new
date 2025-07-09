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
      <main className="">{children}</main>
      {/* Footer */}
      <Footer />
    </>
  )
}
