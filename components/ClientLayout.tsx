'use client'
import { usePathname } from 'next/navigation'
import PromoBanner from './PromoBanner'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingButtons from './FloatingButtons'
import EventPopup from './EventPopup'

/**
 * 모든 페이지를 감싸는 공통 껍데기 — 상단 배너·헤더 · 본문 · 푸터 · 하단 바.
 * 관리자(/admin)는 이 껍데기 없이 본문만 그린다.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  // 견적 페이지에서는 상단 배너를 감춘다 — "무료 견적 받으세요" 배너를
  // 이미 견적 신청하러 온 사람에게 또 띄우면 화면만 밀린다.
  const hidePromo = pathname.startsWith('/diagnosis')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 201 }}>
        {!hidePromo && <PromoBanner />}
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
      <EventPopup />
    </>
  )
}
