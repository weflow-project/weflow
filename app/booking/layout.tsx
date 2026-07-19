// /booking 전용 메타데이터 (page.tsx가 'use client'라 여기서 정의한다)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '상담 예약 · WEFLOW',
  description:
    '원하는 날짜와 시간을 골라 WEFLOW 홈페이지 제작 상담을 예약하세요.',
  alternates: { canonical: '/booking' },
  openGraph: {
    title: '상담 예약 · WEFLOW',
    description: '원하는 날짜와 시간을 골라 WEFLOW 홈페이지 제작 상담을 예약하세요.',
    url: '/booking',
  },
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children
}
