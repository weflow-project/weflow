// /pricing 전용 메타데이터 (page.tsx가 'use client'라 여기서 정의한다)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '제작 플랜 · 가격 안내 · WEFLOW',
  description:
    '랜딩페이지부터 기업형 홈페이지까지, WEFLOW의 제작 플랜별 구성과 가격을 확인하세요.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: '제작 플랜 · 가격 안내 · WEFLOW',
    description:
      '랜딩페이지부터 기업형 홈페이지까지, WEFLOW의 제작 플랜별 구성과 가격을 확인하세요.',
    url: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
