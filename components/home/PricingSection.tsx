import Link from 'next/link'
import { Check } from 'lucide-react'
import { makePlans } from '@/data/pricing'

export default function PricingSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="footnote emphasized c-accent">제작 플랜 &amp; 가격</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left', wordBreak: 'keep-all' }}>
            목표에 맞는 <span className="c-accent">플랜</span>을 골라보세요
          </h2>
        </div>

        {/* 플랜 카드 */}
        <div className="pricing-grid">
          {makePlans.map(plan => (
            <div key={plan.id} className={`pricing-card${plan.highlight ? ' is-highlight' : ''}`}>
              {plan.highlight && <span className="pricing-tag">가장 인기</span>}

              {/* 상단: 이름 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{plan.emoji}</span>
                <div>
                  <h3 className="headline emphasized" style={{ margin: 0 }}>{plan.name}</h3>
                  <span className="caption-1 c-muted">{plan.sub}</span>
                </div>
              </div>

              {/* 가격 */}
              <div style={{ margin: '1.1rem 0 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="caption-1 emphasized c-accent" style={{ background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '9999px' }}>
                    {plan.discount} 할인
                  </span>
                  <span className="footnote c-muted" style={{ textDecoration: 'line-through' }}>{plan.originalPrice}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.5rem' }}>
                  <span className="title-2 emphasized">{plan.price}</span>
                  <span className="caption-1 c-muted">부터</span>
                </div>
                <p className="caption-1 c-muted" style={{ margin: '0.4rem 0 0' }}>{plan.note}</p>
              </div>

              {/* 기능 */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <Check size={16} strokeWidth={2.5} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem' }} />
                    <span className="callout" style={{ wordBreak: 'keep-all' }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/pricing"
                className={plan.highlight ? 'btn-primary' : 'btn-outline'}
                style={{ justifyContent: 'center', width: '100%', marginTop: '1.5rem', borderRadius: '9999px' }}
              >
                자세히 보기
              </Link>
            </div>
          ))}
        </div>

        {/* 전체 플랜 링크 */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
          <Link href="/pricing" className="subhead emphasized c-accent" style={{ textDecoration: 'none' }}>
            케어플랜·광고 세팅 등 전체 플랜 보기 ›
          </Link>
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
          align-items: stretch;
        }
        .pricing-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.6rem;
        }
        .pricing-card.is-highlight {
          border: 2px solid var(--accent);
          box-shadow: 0 12px 32px rgba(51,115,223,0.14);
        }
        .pricing-tag {
          position: absolute;
          top: -12px;
          left: 1.6rem;
          background: var(--accent);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 11px;
          border-radius: 9999px;
        }
        @media (max-width: 860px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
