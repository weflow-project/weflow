'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Crown, Check } from 'lucide-react'
import { makePlans } from '@/data/pricing'

const MAKE_ICONS = [
  '/images/3d-icon/image-3.svg',
  '/images/3d-icon/image-4.svg',
  '/images/3d-icon/image-5.svg',
]

export default function PricingPage() {
  const s1 = useRef<HTMLElement>(null)
  // const s2 = useRef<HTMLElement>(null) // 케어플랜 섹션 주석처리
  // const s3 = useRef<HTMLElement>(null) // 광고 세팅 섹션 주석처리

  const [activeSection, setActiveSection] = useState(0)
  const [v1, setV1] = useState(false)
  // const [v2, setV2] = useState(false) // 케어플랜 섹션 주석처리
  // const [v3, setV3] = useState(false) // 광고 세팅 섹션 주석처리

  useEffect(() => {
    document.body.classList.add('snap-home')
    return () => document.body.classList.remove('snap-home')
  }, [])

  useEffect(() => {
    const pairs: [React.RefObject<HTMLElement | null>, (v: boolean) => void, (i: number) => void][] = [
      [s1, setV1, setActiveSection],
      // [s2, setV2, setActiveSection], // 케어플랜 섹션 주석처리
      // [s3, setV3, setActiveSection], // 광고 세팅 섹션 주석처리
    ]
    const observers = pairs.map(([ref, setVisible, setActive], i) => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActive(i)
          setVisible(true)
        }
      }, { threshold: 0.2 })
      if (ref.current) obs.observe(ref.current)
      return obs
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* 우측 섹션 닷 네비 */}
      <div className="pricing-dots">
        {(['제작 플랜'] as const).map((label, i) => {
          const refs = [s1]
          return (
            <button key={i} onClick={() => scrollTo(refs[i])} title={label}
              className={`pdot${activeSection === i ? ' pdot--active' : ''}`} />
          )
        })}
      </div>

      {/* ─── SECTION 1: 제작 플랜 ─── */}
      <section ref={s1} className="pricing-section" style={{ background: '#fff' }}>
        <div className="pricing-inner">
          <div className="pricing-header">
            {/* <p className="pricing-eyebrow">STEP 1 · 필수 선택</p> */}
            <h2 className="pricing-heading">제작 플랜</h2>
            <p className="pricing-sub">홈페이지 규모에 맞는 플랜을 선택하세요</p>
          </div>
          <div className="pricing-grid-3">
            {makePlans.map((plan, i) => (
              <div key={plan.id}
                className={`pcard-wrap${plan.highlight ? ' pcard-wrap--featured' : ''}`}
              >
                {/* 인기 플랜: 왕관이 카드 상단 경계에 걸쳐 올라앉음 (카드와 함께 등장) */}
                {plan.highlight && (
                  <span className={`pcard-crown-wrap${v1 ? ' pcard-crown-wrap--in' : ''}`}
                    style={{ animationDelay: `${i * 0.1 + 0.12}s` }}>
                    <Image src={MAKE_ICONS[i]} alt="" width={120} height={120} className="pcard-crown" style={{ width: 120, height: 120 }} />
                  </span>
                )}
                <div className={`pcard${plan.highlight ? ' pcard--featured' : ''}${v1 ? ' pcard--in' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {plan.highlight && (
                    <div className="pcard-badge"><Crown size={11} strokeWidth={2.5} /> 인기 플랜</div>
                  )}
                  <div className="pcard-body">
                    <h3 className="pcard-name">{plan.name}</h3>
                    <p className="pcard-sub-text">{plan.sub}</p>
                    <ul className="pcard-features">
                      {plan.features.map(f => (
                        <li key={f}><Check size={13} strokeWidth={2.5} /><span>{f}</span></li>
                      ))}
                    </ul>
                    {!plan.highlight && (
                      <Image src={MAKE_ICONS[i]} alt="" width={140} height={140} className="pcard-emoji" style={{ width: 140, height: 140 }} />
                    )}
                  </div>
                  <div className="pcard-foot">
                    <div className="pcard-orig-row">
                      <span className="pcard-original">{plan.originalPrice}</span>
                      <span className="pcard-discount">{plan.discount}↓</span>
                    </div>
                    <p className="pcard-price">{plan.price}</p>
                    <p className="pcard-note">{plan.note}</p>
                    <Link href="/diagnosis" className={`pcard-cta${plan.highlight ? ' pcard-cta--inv' : ''}`}>
                      무료 진단 신청 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 유지보수 & 운영 ─── */}
      <section style={{ background: '#f9fafb', padding: 'clamp(3rem, 6vw, 4.5rem) 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            <p className="footnote emphasized c-accent">유지보수 &amp; 운영</p>
            <h2 className="title-1" style={{ margin: '0.7rem 0 0.5rem', wordBreak: 'keep-all' }}>제작 이후에도 안심하고 운영하세요</h2>
            <p className="callout c-muted">상품별 월 유지보수로 꾸준히 관리해 드립니다.</p>
          </div>

          {/* 상품별 월 유지보수 */}
          <div className="maint-grid">
            {[
              { name: '랜딩페이지', fee: '39,000원' },
              { name: '홈페이지', fee: '69,000원' },
              { name: '랜딩 + 홈페이지', fee: '89,000원' },
            ].map(m => (
              <div key={m.name} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '1.5rem 1.6rem', textAlign: 'center' }}>
                <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.5rem' }}>{m.name}</p>
                <p className="price-main" style={{ margin: 0 }}>월 {m.fee}</p>
                <p className="caption-1 c-muted" style={{ margin: '0.35rem 0 0' }}>VAT 별도</p>
              </div>
            ))}
          </div>

          {/* 포함 내역 */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.5rem, 4vw, 2rem)', marginTop: '1.1rem' }}>
            <p className="headline" style={{ margin: '0 0 1rem' }}>유지보수 포함 내역</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {['텍스트·이미지·링크 등 경미한 수정', '도메인·서버 관리 지원', '정기 점검 및 오류 대응'].map(t => (
                <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                  <Check size={16} strokeWidth={2.5} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span className="callout c-secondary" style={{ wordBreak: 'keep-all' }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 안내사항 ─── */}
      <section style={{ background: '#fff', padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
          <div className="pricing-notice">
            <p className="pricing-notice-title">📋 안내사항</p>
            <ul>
              {[
                '도메인은 고객님 명의로 등록되며 비용은 별도입니다.',
                '위플로우에서 등록 및 연결 세팅은 무료 지원해 드립니다.',
                '도메인 연결 지원 / 도메인 등록 대행 가능 / 도메인 비용 별도',
                '광고비는 고객 계정에서 고객 결제수단으로 직접 결제되며, 위플로우는 운영 및 세팅만 합니다.',
                '유지보수는 텍스트, 이미지, 링크 등 경미한 수정 기준입니다.',
                '페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.',
              ].map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 케어플랜 섹션 - 주석처리
      <section ref={s2} className="pricing-section" style={{ background: '#f9fafb' }}>
        <div className="pricing-inner">
          <div className="pricing-header">
            <p className="pricing-eyebrow">STEP 2 · 필수 선택</p>
            <h2 className="pricing-heading">WEFLOW 케어플랜</h2>
            <p className="pricing-sub">제작 후 지속적인 운영·관리 플랜을 선택하세요</p>
          </div>
          <div className="pricing-grid-3">
            {carePlans.map((plan, i) => (
              <div key={plan.name}
                className={`pcard${plan.highlight ? ' pcard--featured' : ''}${v2 ? ' pcard--in' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="pcard-badge"><Crown size={11} strokeWidth={2.5} /> 인기 플랜</div>
                )}
                <div className="pcard-body">
                  <div className="pcard-icon-wrap">
                    {i === 0 && <BarChart2 size={18} color={plan.highlight ? '#fff' : 'var(--accent)'} strokeWidth={1.75} />}
                    {i === 1 && <Zap size={18} color={plan.highlight ? '#fff' : 'var(--accent)'} strokeWidth={1.75} />}
                    {i === 2 && <Crown size={18} color={plan.highlight ? '#fff' : 'var(--accent)'} strokeWidth={1.75} />}
                  </div>
                  <h3 className="pcard-name">{plan.name}</h3>
                  <p className="pcard-sub-text">{plan.sub}</p>
                  <ul className="pcard-features">
                    {plan.features.map(f => (
                      <li key={f}><Check size={13} strokeWidth={2.5} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="pcard-foot">
                  <div className="pcard-orig-row">
                    <span className="pcard-original">{plan.originalPrice}</span>
                    <span className="pcard-discount">{plan.discount}↓</span>
                  </div>
                  <p className="pcard-price">{plan.price}</p>
                  <p className="pcard-note">{plan.note}</p>
                  <Link href="/diagnosis" className={`pcard-cta${plan.highlight ? ' pcard-cta--inv' : ''}`}>
                    무료 진단 신청 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* 광고 세팅 플랜 섹션 - 주석처리
      <section ref={s3} className="pricing-section" style={{ background: '#fff' }}>
        <div className="pricing-inner">
          <div className="pricing-header">
            <p className="pricing-eyebrow">OPTIONAL · 선택 추가</p>
            <h2 className="pricing-heading">광고 세팅 플랜</h2>
            <p className="pricing-sub">원하는 채널에 광고를 세팅하여 빠르게 고객을 늘려보세요</p>
          </div>

          <div className="pricing-grid-2" style={{ maxWidth: '760px', margin: '0 auto 2rem' }}>
            {adPlans.map((plan, i) => (
              <div key={plan.name}
                className={`pcard${v3 ? ' pcard--in' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="pcard-body">
                  <div className="pcard-icon-wrap">
                    {i === 0
                      ? <Star size={18} color="var(--accent)" strokeWidth={1.75} />
                      : <Zap size={18} color="var(--accent)" strokeWidth={1.75} />
                    }
                  </div>
                  <h3 className="pcard-name" style={{ fontSize: '0.95rem' }}>{plan.name}</h3>
                  <ul className="pcard-features">
                    {plan.features.map(f => (
                      <li key={f}><Check size={12} strokeWidth={2.5} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="pcard-foot">
                  <div className="pcard-orig-row">
                    <span className="pcard-original">{plan.originalPrice}</span>
                    <span className="pcard-discount">{plan.discount}↓</span>
                  </div>
                  <p className="pcard-price">{plan.price}</p>
                  <p className="pcard-note">{plan.note}</p>
                  <Link href="/diagnosis" className="pcard-cta">무료 진단 신청 →</Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="pricing-notice">
              <p className="pricing-notice-title">📋 안내사항</p>
              <ul>
                {[
                  '도메인은 고객님 명의로 등록되며 비용은 별도입니다. 등록 및 연결 세팅은 무료 지원해 드립니다.',
                  '광고비는 고객 계정에서 고객 결제수단으로 직접 결제되며, WEFLOW는 운영 및 세팅만 합니다.',
                  '유지보수는 텍스트·이미지·링크 등 경미한 수정 기준입니다. 페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.',
                ].map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      */}

      <style>{`
        .pricing-section {
          scroll-snap-align: start;
          min-height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.5rem 1.5rem;
        }
        .pricing-inner { max-width: 1100px; margin: 0 auto; width: 100%; }
        .pricing-header { text-align: center; margin-bottom: 1.75rem; }
        .pricing-eyebrow {
          font-size: 0.6875rem; font-weight: 700; color: var(--accent);
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.35rem;
        }
        .pricing-heading {
          font-weight: 700; font-size: clamp(1.5rem, 3vw, 2rem);
          color: var(--text); letter-spacing: -0.025em; line-height: 1.18; margin: 0 0 0.35rem;
        }
        .pricing-sub { font-size: 0.875rem; font-weight: 400; color: var(--text-muted); margin: 0; }

        .pricing-grid-3 {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem;
        }
        .pricing-grid-2 {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.1rem;
        }
        .maint-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem;
        }
        @media (max-width: 768px) { .maint-grid { grid-template-columns: 1fr; } }
        @media (max-width: 900px) {
          .pricing-grid-3 { grid-template-columns: 1fr; }
          .pricing-grid-2 { grid-template-columns: 1fr; }
        }

        /* ── 카드 ── */
        .pcard-wrap {
          position: relative;
          display: flex;
          /* 왕관이 카드 위로 걸쳐 올라앉을 공간 (카드 상단은 3개 모두 정렬) */
          margin-top: 64px;
          /* 카드+왕관을 한 세트로 함께 띄우기 위해 리프트는 래퍼에 건다 */
          transition: transform 0.22s ease;
        }
        .pcard-wrap:hover {
          transform: translateY(-6px);
        }
        .pcard {
          flex: 1; min-width: 0;
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column; position: relative;
          opacity: 0; transform: translateY(18px);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }

        /* 왕관 위치 래퍼 — 카드 상단 경계에 걸침 + 카드와 함께 등장 */
        .pcard-crown-wrap {
          position: absolute;
          top: 0;            /* 카드 상단 기준 */
          left: 50%;
          transform: translate(-50%, -64%);  /* 대부분 위로 걸쳐 올라앉음 */
          z-index: 3;
          pointer-events: none;
          opacity: 0;        /* 카드와 함께 등장하기 전엔 숨김 */
        }
        .pcard-crown-wrap--in {
          animation: crown-in 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes crown-in {
          from { opacity: 0; transform: translate(-50%, -28%) scale(0.6); }
          to   { opacity: 1; transform: translate(-50%, -64%) scale(1); }
        }
        /* 왕관 이미지 — 기울기 + hover wiggle (위치 래퍼와 분리되어 충돌 없음) */
        .pcard-crown {
          display: block;
          transform: rotate(-6deg);
          filter: drop-shadow(0 10px 14px rgba(15,23,42,0.22));
        }
        /* hover 마이크로 인터랙션: 왕관이 한 번 까딱 */
        .pcard-wrap--featured:hover .pcard-crown {
          animation: crown-wiggle 0.7s cubic-bezier(0.36,0.07,0.19,0.97);
        }
        @keyframes crown-wiggle {
          0%   { transform: rotate(-6deg); }
          30%  { transform: rotate(-13deg); }
          60%  { transform: rotate(2deg); }
          100% { transform: rotate(-6deg); }
        }
        @media (max-width: 900px) {
          .pcard-wrap { margin-top: 58px; }
          .pcard-crown { width: 104px !important; height: 104px !important; }
        }
        .pcard--in {
          animation: card-in 0.48s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes card-in {
          to { opacity: 1; transform: translateY(0); }
        }
        /* 리프트는 .pcard-wrap 이 담당. 카드는 테두리/그림자만 강조 */
        .pcard-wrap:hover .pcard {
          border-color: #cdddf9;
          box-shadow: 0 12px 32px rgba(51,115,223,0.1);
        }
        .pcard--featured {
          background: var(--accent); border-color: var(--accent);
        }
        .pcard-wrap:hover .pcard--featured {
          box-shadow: 0 14px 36px rgba(51,115,223,0.32);
        }

        .pcard-badge {
          position: absolute; top: 1rem; right: 1rem;
          background: #fbbf24; color: #78350f;
          font-size: 0.6875rem; font-weight: 700;
          padding: 0.25rem 0.65rem; border-radius: 9999px;
          display: flex; align-items: center; gap: 0.3rem;
          animation: badge-pulse 2.6s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.45); }
          50%      { box-shadow: 0 0 0 5px rgba(251,191,36,0); }
        }

        .pcard-body { padding: 1.5rem 1.4rem 1.5rem; flex: 1; position: relative; }
        .pcard-emoji {
          position: absolute;
          right: 1.2rem;
          bottom: 1.1rem;
          pointer-events: none;
          z-index: 1;
          transform: translateY(0) rotate(0);
        }
        /* hover 마이크로 인터랙션: 로켓·차트 아이콘이 살짝 튀어오름 */
        .pcard-wrap:hover .pcard-emoji {
          animation: emoji-pop 0.6s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes emoji-pop {
          0%   { transform: translateY(0) rotate(0); }
          40%  { transform: translateY(-7px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        .pcard-icon-wrap {
          width: 40px; height: 40px; border-radius: 10px;
          background: #ebf2ff; display: flex; align-items: center;
          justify-content: center; margin-bottom: 0.65rem;
        }
        .pcard--featured .pcard-icon-wrap { background: rgba(255,255,255,0.18); }
        .pcard-name {
          font-weight: 700; font-size: 1.0625rem; letter-spacing: -0.01em; color: var(--text); margin: 0 0 0.15rem;
        }
        .pcard--featured .pcard-name { color: #fff; }
        .pcard-sub-text { font-size: 0.8125rem; color: var(--text-muted); margin: 0 0 0.9rem; }
        .pcard--featured .pcard-sub-text { color: rgba(255,255,255,0.6); }

        .pcard-features {
          list-style: none; margin: 0; padding: 0;
          border-top: 1px dashed var(--border); padding-top: 0.9rem; margin-bottom: 0.9rem;
          display: flex; flex-direction: column; gap: 0.38rem;
        }
        .pcard--featured .pcard-features { border-top-color: rgba(255,255,255,0.22); }
        .pcard-features li {
          display: flex; align-items: flex-start; gap: 0.45rem;
          font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; word-break: keep-all;
        }
        .pcard-features li svg { flex-shrink: 0; margin-top: 2px; color: var(--accent); }
        .pcard--featured .pcard-features li { color: rgba(255,255,255,0.88); }
        .pcard--featured .pcard-features li svg { color: #86efac; }

        .pcard-foot {
          border-top: 1px solid var(--border); background: #fafafa;
          padding: 1rem 1.4rem;
        }
        .pcard--featured .pcard-foot {
          border-top-color: rgba(255,255,255,0.2); background: rgba(0,0,0,0.1);
        }
        .pcard-orig-row {
          display: flex; align-items: center; gap: 0.5rem; margin: 0 0 0.15rem;
        }
        .pcard-original {
          font-size: 0.8125rem; color: var(--text-muted);
          text-decoration: line-through; margin: 0;
        }
        .pcard--featured .pcard-original { color: rgba(255,255,255,0.45); }
        .pcard-discount {
          font-size: 0.8125rem; font-weight: 800; letter-spacing: -0.01em;
          color: #ef4444; background: #fef2f2;
          padding: 2px 9px; border-radius: 9999px;
          line-height: 1.3; white-space: nowrap;
        }
        .pcard--featured .pcard-discount {
          color: #ef4444; background: #fff;
        }
        .pcard-price {
          font-size: 1.6rem; font-weight: 800; color: var(--accent);
          letter-spacing: -0.02em; margin: 0 0 0.1rem;
        }
        .pcard--featured .pcard-price { color: #fff; }
        .pcard-note { font-size: 0.75rem; color: var(--text-muted); margin: 0 0 0.85rem; }
        .pcard--featured .pcard-note { color: rgba(255,255,255,0.4); }

        .pcard-cta {
          display: flex; align-items: center; justify-content: center;
          width: 100%; padding: 0.7rem;
          background: var(--accent); color: #fff;
          font-size: 0.875rem; font-weight: 700; border-radius: 8px;
          text-decoration: none; transition: opacity 0.15s;
        }
        .pcard-cta:hover { opacity: 0.88; }
        .pcard-cta--inv { background: #fff; color: var(--accent); }

        .pricing-notice {
          background: #f9fafb; border: 1px solid var(--border);
          border-radius: 12px; padding: 1.1rem 1.4rem;
        }
        .pricing-notice-title {
          font-size: 0.875rem; font-weight: 700; color: var(--text); margin: 0 0 0.65rem;
        }
        .pricing-notice ul {
          margin: 0; padding: 0 0 0 1.1rem;
          display: flex; flex-direction: column; gap: 0.35rem;
        }
        .pricing-notice li {
          font-size: 0.8125rem; color: var(--text-muted); line-height: 1.7; word-break: keep-all;
        }

        .pricing-dots {
          position: fixed; right: 1.25rem; top: 50%;
          transform: translateY(-50%); z-index: 50;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .pdot {
          width: 6px; height: 6px; border-radius: 9999px;
          background: #d1d5db; border: none; cursor: pointer; padding: 0;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .pdot--active { height: 22px; background: var(--accent); }
        @media (max-width: 640px) {
          .pricing-dots { display: none; }
          .pricing-section { min-height: auto; padding: 2rem 1.25rem; }
        }
      `}</style>
    </>
  )
}
