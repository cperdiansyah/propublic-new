import Footer from '@/components/footer'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Header */}
      {/* Cotnent */}
      {children}
      {/* Footer */}
      <Footer />
    </>
  )
}
