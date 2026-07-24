// /reviews — 고객 인터뷰 페이지. 내용은 전부 ReviewsExplorer 가 그린다.
import type { Metadata } from 'next'
import ReviewsExplorer from '@/components/reviews/ReviewsExplorer'

export const metadata: Metadata = {
  title: '제작 사례 인터뷰 & 후기 · WEFLOW',
  description: 'WEFLOW와 함께한 분들이 직접 남겨주신 후기와 인터뷰입니다.',
  alternates: { canonical: '/reviews' },
}

export default function ReviewsPage() {
  return <ReviewsExplorer />
}
