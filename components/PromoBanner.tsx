import Link from 'next/link'

/**
 * 헤더 바로 위에 붙는 프로모션 띠 — 할인 문구를 알리고 누르면 무료 진단으로 간다.
 */
export default function PromoBanner() {
  return (
    <Link
      href="/diagnosis"
      className="promo-banner"
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'var(--accent-strong)',
        color: 'var(--on-accent-strong)',
        transition: 'opacity 0.18s',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.25rem',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.55rem',
          flexWrap: 'wrap',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        <span
          className="caption-1 emphasized"
          style={{
            flexShrink: 0,
            background: 'var(--on-accent-strong)',
            color: 'var(--accent-strong)',
            padding: '2px 11px',
            borderRadius: '9999px',
            letterSpacing: '-0.01em',
          }}
        >
          특별 프로모션
        </span>
        <strong className="subhead emphasized" style={{ letterSpacing: '-0.01em',color: 'rgba(255,255,255,0.88)' }}>
          제작비 <span style={{ color: 'var(--on-accent-strong)' }}>50% 할인</span> + 무료 상담 제공!
        </strong>
        <span className="hide-sm footnote medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
          (선착순 마감 · 지금 바로 신청하세요)
        </span>
      </div>
    </Link>
  )
}
