import Image from 'next/image'
import Link from 'next/link'
import { caseImagePath } from '@/data/cases'

/**
 * 사례 썸네일 카드 — 이미지(4:3) 위에 이름과 "자세히 보기" 링크를 얹은 공용 카드.
 * href 를 주면 그 주소로, 없으면 slug 로 만든 /cases/{slug} 상세 페이지로 간다.
 * (지금은 /cases 페이지가 자체 카드를 쓰고 있어 이 공용 카드를 쓰는 곳은 없다)
 */
export default function CaseCard({
  name,
  slug,
  href,
}: {
  name: string
  slug: string
  href?: string
}) {
  const to = href ?? `/cases/${slug}`
  return (
    <Link href={to} className="case-card" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#fff' }}>
        <div style={{ position: 'relative', paddingTop: '75%' }}>
          <Image
            src={caseImagePath(slug)}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </div>
        <div style={{ padding: '0.75rem 1rem' }}>
          <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.2rem' }}>{name}</p>
          <p className="caption-1 c-accent" style={{ margin: 0 }}>자세히 보기 →</p>
        </div>
      </div>
    </Link>
  )
}
