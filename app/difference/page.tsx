// /difference — WEFLOW만의 차별점 페이지.
// 템플릿 방식 제작 업체와 WEFLOW가 어떻게 다른지를 설명한다.
// 별도 도입부(h1 배너) 없이 바로 "그 기능은 안 됩니다"라는 공감 질문(h1)으로 시작해
// 템플릿이란 → 최신 기술이란 → 실제 화면 → 걱정 비교 → 상담 CTA 순으로 짧게 흐른다.
import type { Metadata } from 'next'
import DiffHook from '@/components/difference/DiffHook'
import DiffTemplate from '@/components/difference/DiffTemplate'
import DiffModern from '@/components/difference/DiffModern'
import DiffGallery from '@/components/difference/DiffGallery'
import DiffWorries from '@/components/difference/DiffWorries'
import DiffCTA from '@/components/difference/DiffCTA'

export const metadata: Metadata = {
  title: 'WEFLOW만의 차별점 · WEFLOW',
  description:
    '자동 계산기·스마트스토어 연동을 요청했다가 “안 됩니다”라는 답을 들으셨나요? 템플릿 제작 업체와 최신 기술로 직접 만드는 WEFLOW의 차이를 정리했습니다.',
  alternates: { canonical: '/difference' },
  openGraph: {
    title: 'WEFLOW만의 차별점 · WEFLOW',
    description:
      '템플릿 제작 업체와 최신 기술로 직접 만드는 WEFLOW, 무엇이 다른지 짧게 정리했습니다.',
    url: '/difference',
  },
}

export default function DifferencePage() {
  return (
    <>
      <DiffHook />
      <DiffTemplate />
      <DiffModern />
      <DiffGallery />
      <DiffWorries />
      <DiffCTA />
    </>
  )
}
