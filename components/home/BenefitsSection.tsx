import Link from 'next/link'
import Image from 'next/image'

const BENEFITS = [
  {
    no: '혜택 01',
    icon: '/images/3d-icon/feature001.svg',
    title: ['랜딩 & 홈페이지', '50% 특별 프로모션'],
    desc: '랜딩페이지 & 홈페이지까지 190,000원 할인!',
  },
  {
    no: '혜택 02',
    icon: '/images/3d-icon/feature002.svg',
    title: ['도메인 걱정 없는', '유지보수'],
    desc: '따로 도메인 등록 NO · 서버 도메인까지 제공!',
  },
  {
    no: '혜택 03',
    icon: '/images/3d-icon/feature003.svg',
    title: ['제휴 마케팅 협업', 'SEO 최적화까지'],
    desc: '제휴 마케팅 협업으로 SEO 최적화까지 한번에',
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      style={{
        position: 'relative',
        background: 'var(--accent-dim)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      {/* 우측 사이드 탭 — 혜택 더보기 (넓은 화면에서만 노출) */}
      <Link href="/pricing" className="benefit-more footnote emphasized">
        혜택 더보기 ›
      </Link>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <span className="caption-1 emphasized" style={{ color: '#9dbff6', letterSpacing: '0.06em' }}>
            위플로우만의 혜택
          </span>
          <h2 className="title-1" style={{ margin: '0.7rem 0 0', color: '#fff', wordBreak: 'keep-all' }}>
            이 모든 혜택을 한번에!
          </h2>
        </div>

        {/* 혜택 카드 3개 */}
        <div className="benefit-grid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.no}
              className="benefit-card"
              style={{
                position: 'relative',
                background: '#fff',
                borderRadius: 'var(--radius-2xl)',
                padding: 'clamp(2rem, 4vw, 2.75rem) clamp(1.6rem, 3vw, 2rem)',
                minHeight: 'clamp(360px, 38vw, 440px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* 번호 북마크 리본 */}
              <span
                aria-label={b.no}
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '20px',
                  width: '84px',
                  height: '68px',
                  backgroundImage: "url('/images/3d-icon/bookmark.svg')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top center',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: '13px',
                }}
              >
                <span className="footnote emphasized" style={{ color: 'var(--accent-dim)' }}>{b.no}</span>
              </span>

              {/* 3D 아이콘 */}
              <Image src={b.icon} alt="" width={128} height={128} style={{ width: i === 2 ? 156 : 128, height: i === 2 ? 156 : 128, marginBottom: '1.5rem' }} />

              {/* 제목 */}
              <h3 className="title-3 emphasized" style={{ margin: '0 0 0.6rem', wordBreak: 'keep-all' }}>
                {b.title[0]}
                <br />
                {b.title[1]}
              </h3>

              {/* 설명 */}
              <p className="callout" style={{ margin: '0 0 1.25rem', wordBreak: 'keep-all' }}>{b.desc}</p>

              {/* 자세히 보기 */}
              <Link
                href="/pricing"
                className="footnote semibold c-accent"
                style={{ marginTop: 'auto', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                자세히 보기 ›
              </Link>
            </div>
          ))}
        </div>

        {/* 안내 + CTA */}
        <p className="footnote" style={{ textAlign: 'center', color: '#9dbff6', margin: 'clamp(1.75rem, 4vw, 2.5rem) 0 1.25rem', wordBreak: 'keep-all' }}>
          * 프로모션은 선착순으로 조기 마감될 수 있습니다. 지금 부담 없이 시작하세요!
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link href="/diagnosis" className="btn-white" style={{ fontSize: '1rem' }}>
            혜택 신청하기 →
          </Link>
        </div>
      </div>

      <style>{`
        .benefit-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .benefit-card { transition: transform 0.2s, box-shadow 0.2s; }
        .benefit-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.18); }

        /* 우측 사이드 탭 */
        .benefit-more {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #fff;
          color: var(--accent);
          padding: 0.85rem 1.1rem;
          border-radius: var(--radius-xl) 0 0 var(--radius-xl);
          box-shadow: 0 6px 20px rgba(11,18,32,0.22);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s;
        }
        .benefit-more:hover { opacity: 0.92; }

        /* 좁은 화면에서는 콘텐츠와 겹쳐 숨김 */
        @media (max-width: 1024px) {
          .benefit-more { display: none; }
        }
        @media (max-width: 768px) {
          .benefit-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
