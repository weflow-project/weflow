import { cases, caseDetails, defaultCaseDetail, caseImagePath } from '@/data/cases'
import CaseDetailContent from '@/components/cases/CaseDetailContent'

/**
 * 사례 상세 페이지(/cases/[slug]) — 업종 slug로 데이터만 골라 넘기고
 * 화면은 CaseDetailContent가 그린다.
 */

// 모르는 slug로 들어와도 기본 사례를 보여준다
export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = caseDetails[slug] || defaultCaseDetail
  const imageSrc = caseImagePath(slug)
  return <CaseDetailContent c={c} imageSrc={imageSrc} slug={slug} />
}

// 사례별 상세를 빌드 때 미리 뽑아둔다 (cases가 비면 아무것도 생성되지 않는다)
export function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }))
}
