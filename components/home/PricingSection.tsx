import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Reveal from '@/components/Reveal'

type Plan = {
  id: string
  name: string
  sub: string
  img: string
  highlight: boolean
  discount: string
  originalPrice: string
  price: string
  note: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    id: 'landing',
    name: '랜딩페이지',
    sub: '한 페이지 집중형',
    img: '/images/3d-icon/image-3.svg',
    highlight: false,
    discount: '50%',
    originalPrice: '780,000원',
    price: '390,000원',
    note: '월 유지보수 39,000원 · VAT 별도',
    features: ['랜딩페이지 1P', '반응형 (PC/모바일)', '문의폼 연동', '기본 SEO 설정'],
  },
  {
    id: 'landing-home',
    name: '랜딩형 홈페이지',
    sub: '원페이지 홈페이지',
    img: '/images/3d-icon/image-4.svg',
    highlight: false,
    discount: '50%',
    originalPrice: '1,180,000원',
    price: '590,000원',
    note: '월 유지보수 59,000원 · VAT 별도',
    features: ['원페이지 홈페이지', '헤더 앵커 이동 구성', '반응형 (PC/모바일)', '문의폼·카톡 연동', '기본 SEO 설정'],
  },
  {
    id: 'home',
    name: '홈페이지',
    sub: '다중 페이지',
    img: '/images/3d-icon/image-5.svg',
    highlight: true,
    discount: '50%',
    originalPrice: '1,980,000원',
    price: '990,000원',
    note: '월 유지보수 99,000원 · VAT 별도',
    features: ['홈페이지 2P~', '반응형 (PC/모바일)', '문의폼·카톡 상담 연동', 'SEO 최적화'],
  },
]

export default function PricingSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="footnote emphasized c-accent">제작 플랜 &amp; 가격</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left', wordBreak: 'keep-all' }}>
            목표에 맞는 <span className="c-accent">플랜</span>을 골라보세요
          </h2>
        </Reveal>

        {/* 플랜 카드 */}
        <Reveal as="div" stagger className="pricing-grid">
          {PLANS.map(plan => (
            <div key={plan.id} className={`pricing-card${plan.highlight ? ' is-highlight' : ''}`}>
              {plan.highlight && <span className="pricing-tag">가장 인기</span>}

              {/* 상단: 아이콘 + 이름 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Image src={plan.img} alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: 'contain' }} />
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
        </Reveal>

        {/* 전체 플랜 링크 */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
          <Link href="/pricing" className="subhead emphasized c-accent" style={{ textDecoration: 'none', fontSize: '1.1rem' }}>
            플랜 전체 보기 ›
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
