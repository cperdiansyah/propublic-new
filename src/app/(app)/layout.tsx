import Footer from '@shared/components/layout/footer'
import Header from '@shared/components/layout/header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Content */}
      <main className="">{children}</main>
      {/* Footer */}
      <Footer />
    </>
  )
}
