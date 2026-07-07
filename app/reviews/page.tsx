import type { Metadata } from 'next'
import ReviewsExplorer from '@/components/reviews/ReviewsExplorer'

export const metadata: Metadata = { title: '고객 인터뷰 · WEFLOW' }

export default function ReviewsPage() {
  return <ReviewsExplorer />
}
