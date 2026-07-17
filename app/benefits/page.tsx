// /benefits — WEFLOW 혜택 페이지.
// 메인에도 쓰이는 혜택 요약 섹션 아래에 상세 설명을 이어 붙인다.
import type { Metadata } from 'next'
import BenefitsSection from '@/components/home/BenefitsSection'
import BenefitDetails from '@/components/home/BenefitDetails'

export const metadata: Metadata = { title: 'WEFLOW 혜택 · WEFLOW' }

export default function BenefitsPage() {
  return (
    <>
      <BenefitsSection />
      <BenefitDetails />
    </>
  )
}
