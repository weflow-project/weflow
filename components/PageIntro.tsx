import type { ReactNode } from 'react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

/**
 * 페이지 맨 위 도입부 — 라벨 · 제목(h1) · 설명 · CTA.
 * 하위 페이지들이 제목 없이 본문부터 시작하던 걸 이걸로 통일한다.
 * (제목이 h1 하나뿐이어야 하므로 페이지당 한 번만 쓴다)
 */
export default function PageIntro({
  eyebrow,
  title,
  body,
  ctaHref = '/diagnosis',
  ctaLabel = '무료 견적 신청하기 →',
  background = 'var(--section-a)',
}: {
  /** 제목 위 영문 라벨 */
  eyebrow: string
  title: ReactNode
  /** 줄바꿈이 필요하면 <br />를 넣은 JSX를 넘긴다 */
  body?: ReactNode
  ctaHref?: string
  ctaLabel?: string
  background?: string
}) {
  return (
    <section
      style={{
        background,
        padding: 'clamp(3rem, 7vw, 4.5rem) 1.5rem clamp(2.25rem, 5vw, 3.25rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <Reveal variant="up">
          <p
            className="caption-2 emphasized c-accent"
            style={{ letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}
          >
            {eyebrow}
          </p>
          <h1 className="title-1" style={{ margin: '0 0 0.75rem', wordBreak: 'keep-all' }}>
            {title}
          </h1>
          {body && (
            <p
              className="callout c-muted"
              style={{ margin: '0 0 1.75rem', maxWidth: '580px', wordBreak: 'keep-all' }}
            >
              {body}
            </p>
          )}
          <Link href={ctaHref} className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}>
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
