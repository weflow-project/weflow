// /benefits — WEFLOW 혜택 페이지.
// 도입부(h1) 아래에 메인에도 쓰이는 혜택 요약 섹션과 상세 설명을 이어 붙인다.
// BenefitsSection 은 메인에서도 쓰여 제목이 h2 라, 이 페이지의 h1 은 PageIntro 가 맡는다.
import type { Metadata } from 'next'
import PageIntro from '@/components/PageIntro'
import BenefitsSection from '@/components/home/BenefitsSection'
import BenefitDetails from '@/components/home/BenefitDetails'

export const metadata: Metadata = {
  title: 'WEFLOW 혜택 · WEFLOW',
  description: '제작만 하고 끝나지 않습니다 — SEO 관리, 관리자 페이지, 제휴 마케팅까지 함께 제공하는 혜택을 확인하세요.',
  alternates: { canonical: '/benefits' },
}

export default function BenefitsPage() {
  return (
    <>
      <PageIntro
        eyebrow="BENEFITS"
        title={
          <>
            만들고 끝이 아니라,{" "}
            <br className="br-mobile" />
            <span className="c-accent">계속 함께합니다</span>
          </>
        }
        body={
          <>
            제작 이후에도 검색 노출 관리와 운영을 이어갑니다.
            <br />
            WEFLOW가 기본으로 챙기는 것들을 정리했습니다.
          </>
        }
        ctaLabel="혜택 신청하기 →"
      />
      <BenefitsSection />
      <BenefitDetails />
    </>
  )
}
