import Footer from '@/components/common/footer'
import Header from '@/components/common/header'

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
      {children}
      {/* Footer */}
      <Footer />
    </>
  )
}
