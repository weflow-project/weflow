'use client'
import { usePathname } from 'next/navigation'
import PromoBanner from './PromoBanner'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomBar from './BottomBar'
import SocialProofToast from './SocialProofToast'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 201 }}>
        <PromoBanner />
        <Navbar />
      </div>
      <main style={{ paddingBottom: '56px' }}>{children}</main>
      <Footer />
      <BottomBar />
      <SocialProofToast />
    </>
  )
}
