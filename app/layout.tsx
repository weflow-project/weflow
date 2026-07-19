// 전체 페이지를 감싸는 루트 레이아웃.
// 사이트 공통 메타데이터(SEO·OG·네이버 인증)를 정의하고,
// 헤더·푸터 등 공통 UI(ClientLayout)와 방문 통계 스크립트를 얹는다.
import type { Metadata } from 'next'
import '../styles/globals.css'
import ClientLayout from '@/components/ClientLayout'
import Analytics from '@/components/Analytics'
import PageTracker from '@/components/PageTracker'

/**
 * 리뉴얼 미리보기 사이트(weflow-pied.vercel.app)를 검색에서 가린다.
 * Vercel 환경변수 NOINDEX=1 이 걸린 프로젝트에서만 동작하므로,
 * 이 코드가 main 에 합쳐져도 운영 사이트(weflowlab.kr)는 영향받지 않는다.
 */
const isNoindex = process.env.NOINDEX === '1'

// 사이트 공통 메타 — 개별 페이지에서 title 등을 덮어쓴다
export const metadata: Metadata = {
  metadataBase: new URL('https://weflowlab.kr'),
  ...(isNoindex && { robots: { index: false, follow: false } }),
  title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
  description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
  keywords: '홈페이지 제작, 랜딩페이지 제작, 광고 운영, 검색 상단 노출, 웹사이트 제작',
  // 쿼리스트링·www 변형이 별개 URL로 색인되지 않도록 대표 주소를 지정한다.
  // './' 는 각 페이지 경로에 맞춰 자동으로 해석된다.
  alternates: { canonical: './' },
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

// 검색엔진에 넘기는 사업자 정보 (구글 지식 패널·리치 결과용).
// 화면에 보이는 /about 의 사업자 정보와 값을 맞춰야 한다.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'WEFLOW',
  alternateName: '위플로우',
  url: 'https://weflowlab.kr',
  logo: 'https://weflowlab.kr/logo.png',
  image: 'https://weflowlab.kr/images/main/main-homepage-01.png',
  description:
    '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계하는 홈페이지 제작 전문 업체.',
  email: 'contact@weflowlab.kr',
  telephone: '+82-10-2971-7280',
  founder: { '@type': 'Person', name: '신서준' },
  taxID: '884-07-03480',
  areaServed: { '@type': 'Country', name: '대한민국' },
  serviceType: ['홈페이지 제작', '랜딩페이지 제작', '광고 운영 대행'],
}

// html·body 뼈대 — 공통 UI로 감싸고 방문 추적기를 함께 실행한다
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <PageTracker />
      </body>
    </html>
  )
}
