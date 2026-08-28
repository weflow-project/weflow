// /diagnosis 전용 메타데이터 (page.tsx가 'use client'라 여기서 정의한다)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '무료 홈페이지 상담 · WEFLOW',
  description:
    '지금 쓰는 홈페이지를 무료로 검토받고, 업종에 맞는 개선 방향을 상담받으세요.',
  alternates: { canonical: '/diagnosis' },
  openGraph: {
    title: '무료 홈페이지 상담 · WEFLOW',
    description:
      '지금 쓰는 홈페이지를 무료로 검토받고, 업종에 맞는 개선 방향을 상담받으세요.',
    url: '/diagnosis',
  },
}

export default function DiagnosisLayout({ children }: { children: React.ReactNode }) {
  return children
}
