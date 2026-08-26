import type { Metadata } from 'next'

// 페이지 본문(page.tsx)이 클라이언트 컴포넌트라 메타데이터는 여기서 내보낸다 — /diagnosis 와 같은 구조
export const metadata: Metadata = {
  title: '사이트 자동 진단 · WEFLOW',
  description:
    '사이트 주소만 입력하면 로딩 속도·검색엔진 노출·모바일 대응·문의 동선을 바로 분석해 드립니다.',
  alternates: { canonical: '/check' },
  openGraph: {
    title: '사이트 자동 진단 · WEFLOW',
    description:
      '사이트 주소만 입력하면 로딩 속도·검색엔진 노출·모바일 대응·문의 동선을 바로 분석해 드립니다.',
    url: '/check',
  },
}

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
