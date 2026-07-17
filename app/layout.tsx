// 전체 페이지를 감싸는 루트 레이아웃.
// 사이트 공통 메타데이터(SEO·OG·네이버 인증)를 정의하고,
// 헤더·푸터 등 공통 UI(ClientLayout)와 방문 통계 스크립트를 얹는다.
import type { Metadata } from 'next'
import '../styles/globals.css'
import ClientLayout from '@/components/ClientLayout'
import Analytics from '@/components/Analytics'
import PageTracker from '@/components/PageTracker'

// 사이트 공통 메타 — 개별 페이지에서 title 등을 덮어쓴다
export const metadata: Metadata = {
  metadataBase: new URL('https://weflowlab.kr'),
  title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
  description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
  keywords: '홈페이지 제작, 랜딩페이지 제작, 광고 운영, 검색 상단 노출, 웹사이트 제작',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
    description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
    url: 'https://weflowlab.kr',
    siteName: 'WEFLOW',
    images: [{ url: '/images/main/main-homepage-01.png', width: 1895, height: 909 }],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
    description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
    images: ['/images/main/main-homepage-01.png'],
  },
  verification: {
    other: {
      'naver-site-verification': '273b65c0c97f6eb30704a68b165015c3e1c7d5fb',
    },
  },
}

// html·body 뼈대 — 공통 UI로 감싸고 방문 추적기를 함께 실행한다
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <PageTracker />
      </body>
    </html>
  )
}
