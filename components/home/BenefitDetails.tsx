import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

type Benefit = {
  title: string
  points: string[]
  image: string
  icon: string
  cta?: { label: string; href: string }
}

const BENEFITS: Benefit[] = [
  {
    title: '제휴 마케팅 연결',
    points: [
      '네이버 블로그 — 검색 상단 노출용 정보성 콘텐츠',
      '인스타그램 — 피드·릴스로 브랜드 도달',
      '유튜브 숏폼 — 짧은 영상으로 바이럴 확산',
      '제휴 채널 통합 운영으로 SEO 최적화까지',
    ],
    image: '/images/benefits/benefit-01-partnership.png',
    icon: '/images/3d-icon/benefit001.svg',
  },
  {
    title: '합리적 가성비',
    points: [
      '정가 대비 100만원 이내로 제작 가능',
      '필요한 기능만 구성한 합리적인 비용',
    ],
    image: '/images/benefits/benefit-02-price.png',
    icon: '/images/3d-icon/benefit002.svg',
    cta: { label: '제작 플랜 보기', href: '/pricing' },
  },
  {
    title: '빠른 제작',
    points: [
      '랜딩페이지 — 3~4일 이내 완성',
      '홈페이지 — 1~2주 이내 완성',
    ],
    image: '/images/benefits/benefit-03-fast.png',
    icon: '/images/3d-icon/benefit003.svg',
  },
  {
    title: '고객의 소리 · 2:1 관리 시스템',
    points: [
      '충분한 소통으로 진짜 니즈를 먼저 듣습니다',
      '기획자·디자이너 2인이 고객 한 분을 전담',
    ],
    image: '/images/benefits/benefit-04-listen.png',
    icon: '/images/3d-icon/benefit004.svg',
  },
  {
    title: '각 상품별 전용 유지보수',
    points: [
      '3가지 상품별 맞춤 유지보수 제공',
      '도메인·서버 관리 지원',
      '텍스트 문구 / 통이미지 수정 지원',
    ],
    image: '/images/benefits/benefit-05-maintain.png',
    icon: '/images/3d-icon/benefit005.svg',
  },
  {
    title: '반응형 디자인 (PC / MO)',
    points: [
      'PC·모바일 등 모든 기기에서 최적화',
      '화면 잘림 없는 깔끔한 반응형 전환',
    ],
    image: '/images/benefits/benefit-06-responsive.png',
    icon: '/images/3d-icon/benefit006.svg',
  },
]

export default function BenefitDetails() {
  return (
    <>
    <section style={{ background: '#fff', padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <span className="footnote emphasized c-accent">혜택 상세</span>
          <h2 className="title-1" style={{ margin: '0.75rem 0 0', wordBreak: 'keep-all' }}>
            위플로우의 혜택, <span className="c-accent">하나하나 풀어봤습니다</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 7vw, 5.5rem)' }}>
          {BENEFITS.map((b, i) => (
            <div key={b.title} className={`bd-row${i % 2 === 1 ? ' bd-row--rev' : ''}`}>
              {/* 텍스트 */}
              <div className="bd-text">
                <Image src={b.icon} alt="" width={72} height={72} style={{ width: 72, height: 72, marginBottom: '1.1rem' }} />
                <h3 className="title-2 emphasized" style={{ margin: '0 0 1rem', wordBreak: 'keep-all' }}>{b.title}</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {b.points.map(p => (
                    <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <Check size={18} strokeWidth={2.5} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span className="callout c-secondary" style={{ wordBreak: 'keep-all' }}>{p}</span>
                    </li>
                  ))}
                </ul>
                {b.cta && (
                  <Link href={b.cta.href} className="btn-primary" style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>
                    {b.cta.label} →
                  </Link>
                )}
              </div>

              {/* 이미지 */}
              <div className="bd-img">
                <Image src={b.image} alt={b.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', borderRadius: 'var(--radius-2xl)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 24시간 상담 대기 — 좌우 풀-블리드 밴드 */}
    <section
      style={{
        background: 'var(--accent-dim)',
        padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.25rem, 4vw, 3rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <span className="footnote emphasized" style={{ color: '#9dbff6' }}>24시간 상담 대기</span>
        <h3 className="title-1" style={{ margin: '0.75rem 0 0', color: '#fff', wordBreak: 'keep-all', lineHeight: 1.4 }}>
          모두가 잠든 이 시간에도,
          <br />
          위플로우는 <span style={{ color: '#9dbff6' }}>고객을 기다립니다</span>
        </h3>
        <p className="callout" style={{ margin: '1rem 0 1.75rem', color: 'rgba(255,255,255,0.72)' }}>
          연중무휴 24시간, 언제 문의하셔도 빠르게 응답합니다.
        </p>
        <div className="bd-band-imgs">
          <div className="bd-band-img">
            <Image src="/images/benefits/support/support-working.png" alt="업무 중인 모습" fill sizes="(max-width: 768px) 100vw, 360px" style={{ objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} />
          </div>
          <div className="bd-band-img">
            <Image src="/images/benefits/support/support-happy.png" alt="행복해하는 모습" fill sizes="(max-width: 768px) 100vw, 360px" style={{ objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} />
          </div>
        </div>
        <Link href="/diagnosis" className="btn-white" style={{ marginTop: '1.75rem', fontSize: '1rem' }}>
          무료진단 신청하기
        </Link>
      </div>
    </section>

    <style>{`
        .bd-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
        }
        .bd-row--rev .bd-text { order: 2; }
        .bd-row--rev .bd-img { order: 1; }
        .bd-img {
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-2xl);
          position: relative;
          overflow: hidden;
        }
        .bd-band-imgs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .bd-band-img {
          aspect-ratio: 16 / 10;
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .bd-row { grid-template-columns: 1fr; }
          .bd-row--rev .bd-text { order: 1; }
          .bd-row--rev .bd-img { order: 2; }
          .bd-band-imgs { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
