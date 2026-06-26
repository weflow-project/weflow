import { cases, caseDetails, defaultCaseDetail, caseImagePath } from '@/data/cases'
import CaseDetailContent from '@/components/cases/CaseDetailContent'

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const c = caseDetails[params.slug] || defaultCaseDetail
  const imageSrc = caseImagePath(params.slug)
  return <CaseDetailContent c={c} imageSrc={imageSrc} slug={params.slug} />
}

export function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }))
}
