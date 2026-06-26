'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Check, Phone, Zap, Wrench, BarChart2, Clock, RefreshCw, MessageCircle, Crown } from 'lucide-react'
import { reviews } from '@/data/reviews'
import { landingSteps as steps } from '@/data/landing'
import { makePlans } from '@/data/pricing'
import LandingForm from '@/components/LandingForm'

const MAKE_EMOJIS = ['🚀', '🌱', '👑']

const FEATURES = [
  { icon: RefreshCw,     title: 'WEFLOW CARE PLAN', desc: '제작부터 운영·광고·관리까지 한 번에 해결합니다.' },
  { icon: Zap,           title: '빠른 제작 진행',   desc: '랜딩페이지 3~4일 · 홈페이지 약 1주일. 빠르게 시작합니다.' },
  { icon: BarChart2,     title: '합리적인 비용',     desc: '필요한 기능만 구성하여 가성비·실속·퀄리티를 함께 제공합니다.' },
  { icon: Clock,         title: '24시간 상담',       desc: '언제 문의하셔도 빠른 피드백을 드립니다.' },
  { icon: Wrench,        title: '제작 후 운영 관리', desc: '검색 등록, 수정, 유지보수, 운영 관리까지 함께합니다.' },
  { icon: MessageCircle, title: '광고 연동 지원',    desc: '인스타·블로그·카카오·당근 등 광고와 한 번에 연결합니다.' },
]

const HERO_TAGS   = ['랜딩&홈페이지 제작', '광고 운영', '검색 상단 노출', '맞춤형 웹 솔루션']
const HERO_BADGES = ['케어 플랜 (제작·광고·운영)', '빠른제작 (3일~7일)', '합리적 비용 (가성비+퀄리티)']
const doubled = [...reviews.slice(0, 12), ...reviews.slice(0, 12)]

export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add('snap-home')
    return () => document.body.classList.remove('snap-home')
  }, [])

  return (
    <>
      {/* ── 드래그 가능 floating 폼 (데스크톱) ── */}
      <div className="lf-float-only"><LandingForm floating={true} /></div>

      {/* Hero */}
      <section className="l-snap l-snap-pad hero-pad">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {/* 왼쪽: 텍스트 */}
          <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: 520 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {HERO_TAGS.map(tag => (
                <span key={tag} className="footnote semibold c-accent" style={{ background: '#ebf2ff', padding: '0.35rem 0.9rem', borderRadius: '9999px', border: '1px solid #cdddf9' }}>{tag}</span>
              ))}
            </div>
            <h1 className="large-title" style={{ marginBottom: '1.25rem', wordBreak: 'keep-all' }}>
              문의로 이어지는<br /><span className="c-accent">홈페이지를 만듭니다</span>
            </h1>
            <p className="body c-secondary" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', marginBottom: 'clamp(1.5rem, 4vw, 2.25rem)', lineHeight: 1.8, wordBreak: 'keep-all' }}>
              기획부터 제작, 광고 연동, 운영 관리까지.<br />단순 제작이 아닌 <strong style={{ color: 'var(--text)' }}>문의 구조까지 설계</strong>합니다.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/diagnosis" className="btn-primary">무료 진단 신청</Link>
              <Link href="/cases" className="btn-outline">성공 사례 보기</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'clamp(1.5rem, 4vw, 3rem)' }}>
              {HERO_BADGES.map(b => (
                <div key={b} className="footnote semibold c-secondary" style={{ background: '#f9fafb', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.5rem 0.9rem' }}>{b}</div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 실적 카드 */}
          <div className="hero-stats">
            {[
              { num: '200+',  label: '제작 완료',     sub: '다양한 업종 경험' },
              { num: '98%',   label: '고객 만족도',   sub: '재의뢰·추천 기반' },
              { num: '3~7일', label: '평균 제작기간', sub: '랜딩~홈페이지' },
              { num: '24시간', label: '상담 가능',    sub: '연중무휴 빠른 응답' },
            ].map(({ num, label, sub }) => (
              <div key={label} style={{ padding: '1.25rem 1.5rem', border: '1px solid var(--border)', borderRadius: '12px', background: '#fff' }}>
                <p className="title-1 c-accent" style={{ margin: '0 0 0.2rem', lineHeight: 1 }}>{num}</p>
                <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.15rem' }}>{label}</p>
                <p className="footnote c-muted" style={{ margin: 0 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 모바일 전용 폼 */}
      <section className="l-snap landing-mob-form">
        <div className="l-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p className="l-eyebrow">FREE · 무료</p>
            <h2 className="l-h2">무료진단 신청</h2>
            <p className="callout c-muted">2분이면 충분합니다</p>
          </div>
          <LandingForm floating={false} />
        </div>
      </section>

      {/* WHY WEFLOW */}
      <section className="l-snap">
        <div className="l-inner" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="l-eyebrow">WHY WEFLOW</p>
            <h2 className="l-h2">한 번에 해결하는 이유</h2>
          </div>
          <div className="feature-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '12px', background: '#fff' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#ebf2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={22} color="var(--accent)" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="headline emphasized c-primary" style={{ margin: '0 0 0.4rem' }}>{title}</p>
                  <p className="callout c-muted" style={{ margin: 0, lineHeight: 1.7, wordBreak: 'keep-all' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 */}
      <section className="l-snap">
        <div className="lp-pricing-inner">
          <div className="pricing-header">
            {/* <p className="pricing-eyebrow">STEP 1 · 필수 선택</p> */}
            <h2 className="pricing-heading">제작 플랜</h2>
            <p className="pricing-sub">홈페이지 규모에 맞는 플랜을 선택하세요</p>
          </div>
          <div className="pricing-grid-3">
            {makePlans.map((plan, i) => (
              <div key={plan.id} className={`pcard pcard--visible${plan.highlight ? ' pcard--featured' : ''}`}>
                {plan.highlight && <div className="pcard-badge"><Crown size={11} strokeWidth={2.5} /> 인기 플랜</div>}
                <div className="pcard-body">
                  <div className="pcard-emoji">{MAKE_EMOJIS[i]}</div>
                  <h3 className="pcard-name">{plan.name}</h3>
                  <p className="pcard-sub-text">{plan.sub}</p>
                  <ul className="pcard-features">
                    {plan.features.map(f => <li key={f}><Check size={13} strokeWidth={2.5} /><span>{f}</span></li>)}
                  </ul>
                </div>
                <div className="pcard-foot">
                  <p className="pcard-original">{plan.originalPrice}</p>
                  <p className="pcard-price">{plan.price}</p>
                  <p className="pcard-note">{plan.note}</p>
                  <Link href="/diagnosis" className={`pcard-cta${plan.highlight ? ' pcard-cta--inv' : ''}`}>무료 진단 신청 →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로세스 */}
      <section className="l-snap">
        <div className="l-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="l-eyebrow">PROCESS</p>
            <h2 className="l-h2">6단계 제작 프로세스</h2>
          </div>
          <div className="step-grid">
            {steps.map(s => (
              <div key={s.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', borderRadius: '12px', padding: '1.75rem 1.5rem', border: '1px solid var(--border)', background: '#fff' }}>
                <span className="title-2 emphasized c-accent" style={{ background: '#ebf2ff', minWidth: 56, height: 56, borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.num}</span>
                <div>
                  <p className="headline emphasized c-primary" style={{ margin: '0 0 0.35rem' }}>{s.title}</p>
                  <p className="callout c-muted" style={{ margin: 0, wordBreak: 'keep-all', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="l-snap" style={{ overflow: 'hidden' }}>
        <div className="l-inner l-inner-center" style={{ marginBottom: '1.5rem' }}>
          <p className="l-eyebrow">REVIEWS</p>
          <h2 className="l-h2">고객 후기</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
          {/* 1행: 좌→우 */}
          <div style={{ display: 'flex', gap: '0.85rem', animation: 'lmarquee 38s linear infinite', width: 'max-content' }}>
            {doubled.map((r, i) => (
              <div key={i} style={{ width: 260, background: '#f9fafb', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', flexShrink: 0 }}>
                <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '0.35rem' }}>★★★★★</div>
                <p className="subhead c-primary" style={{ margin: '0 0 0.45rem', lineHeight: 1.65, wordBreak: 'keep-all' }}>{r.text}</p>
                <p className="footnote semibold c-muted" style={{ margin: 0 }}>— {r.name}</p>
              </div>
            ))}
          </div>
          {/* 2행: 우→좌 */}
          <div style={{ display: 'flex', gap: '0.85rem', animation: 'lmarquee-rev 42s linear infinite', width: 'max-content' }}>
            {[...doubled].reverse().map((r, i) => (
              <div key={i} style={{ width: 260, background: '#f9fafb', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', flexShrink: 0 }}>
                <div style={{ color: '#f59e0b', fontSize: '0.9rem', marginBottom: '0.35rem' }}>★★★★★</div>
                <p className="subhead c-primary" style={{ margin: '0 0 0.45rem', lineHeight: 1.65, wordBreak: 'keep-all' }}>{r.text}</p>
                <p className="footnote semibold c-muted" style={{ margin: 0 }}>— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="l-snap">
        <div className="l-inner l-inner-center">
          <p className="l-eyebrow">FREE · 무료</p>
          <h2 className="l-h2">무료진단에서 이런 걸<br />확인해드립니다</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            {['문의 구조 진단', '디자인 점검', '검색 노출 분석', '맞춤 제작 방향 제안'].map(t => (
              <div key={t} className="body c-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={14} color="var(--accent)" strokeWidth={2.5} /> {t}
              </div>
            ))}
          </div>
          <div className="l-btn-row" style={{ justifyContent: 'center' }}>
            <Link href="/diagnosis" className="btn-primary">무료진단 신청하기 →</Link>
            <a href="tel:010-2971-7280" className="btn-ghost">
              <Phone size={13} strokeWidth={2} /> 010-2971-7280
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ─── Hero 버튼 ─── */
        .hero-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          background: #3373df; color: #fff;
          font-weight: 700; font-size: 1rem;
          padding: 0.85rem 1.75rem; border-radius: 8px;
          text-decoration: none; transition: background 0.18s, transform 0.15s; border: none;
        }
        .hero-btn-primary:hover { background: #2861c9; transform: translateY(-2px); }
        .hero-btn-white {
          display: inline-flex; align-items: center; justify-content: center;
          background: #fff; color: #0f172a;
          font-weight: 700; font-size: 1rem;
          padding: 0.85rem 1.75rem; border-radius: 8px;
          text-decoration: none; transition: background 0.18s, transform 0.15s; border: none;
        }
        .hero-btn-white:hover { background: #f1f5f9; transform: translateY(-2px); }

        /* ─── 기본 공통 ─── */
        .l-eyebrow {
          font-size: 0.8125rem; font-weight: 700; color: var(--accent);
          letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 0.4rem;
        }
        .l-h1 {
          font-weight: 700; font-size: clamp(2.25rem, 5.5vw, 3.25rem);
          color: var(--text); letter-spacing: -0.03em; line-height: 1.1;
          margin: 0 0 1rem; word-break: keep-all;
        }
        .l-h2 {
          font-weight: 700; font-size: clamp(1.5rem, 4vw, 1.9rem); color: var(--text);
          letter-spacing: -0.025em; line-height: 1.18; margin: 0 0 1.25rem;
        }

        /* ─── pcard (pricing 페이지와 동일) ─── */
        .pcard {
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column; position: relative;
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .pcard--visible { opacity: 1; }
        .pcard:hover {
          transform: translateY(-6px);
          border-color: #cdddf9;
          box-shadow: 0 12px 32px rgba(51,115,223,0.1);
        }
        .pcard--featured { background: var(--accent); border-color: var(--accent); }
        .pcard--featured:hover { box-shadow: 0 14px 36px rgba(51,115,223,0.32); }
        .pcard-badge {
          position: absolute; top: 1rem; right: 1rem;
          background: #fbbf24; color: #78350f;
          font-size: 0.6875rem; font-weight: 700;
          padding: 0.25rem 0.65rem; border-radius: 9999px;
          display: flex; align-items: center; gap: 0.3rem;
        }
        .pcard-body { padding: 1.5rem 1.4rem 0; flex: 1; }
        .pcard-emoji { font-size: 1.65rem; margin-bottom: 0.65rem; }
        .pcard-name { font-weight: 700; font-size: 1.0625rem; letter-spacing: -0.01em; color: var(--text); margin: 0 0 0.15rem; }
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
          text-align: left;
        }
        .pcard-features li svg { flex-shrink: 0; margin-top: 2px; color: var(--accent); }
        .pcard--featured .pcard-features li { color: rgba(255,255,255,0.88); }
        .pcard--featured .pcard-features li svg { color: #86efac; }
        .pcard-foot { border-top: 1px solid var(--border); background: #fafafa; padding: 1rem 1.4rem; }
        .pcard--featured .pcard-foot { border-top-color: rgba(255,255,255,0.2); background: rgba(0,0,0,0.1); }
        .pcard-original { font-size: 0.8125rem; color: var(--text-muted); text-decoration: line-through; margin: 0 0 0.1rem; }
        .pcard--featured .pcard-original { color: rgba(255,255,255,0.45); }
        .pcard-price { font-size: 1.6rem; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; margin: 0 0 0.1rem; }
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
        .l-btn-row {
          display: flex; gap: 0.65rem; flex-wrap: wrap; align-items: center;
        }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.7rem 1.1rem; border-radius: 8px;
          border: 1.5px solid var(--border); background: #fff;
          color: var(--text-secondary); font-size: 0.88rem; font-weight: 600;
          text-decoration: none; transition: border-color 0.18s; white-space: nowrap;
        }
        .btn-ghost:hover { border-color: var(--accent); }

        /* ─── 스냅 섹션 ─── */
        .l-snap {
          min-height: calc(100vh - 64px);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px 340px 72px 1.25rem;
          overflow: hidden;
          box-sizing: border-box;
        }
        .l-snap-pad { padding: 16px 340px 72px 1.25rem; }
        .hero-pad { padding-left: clamp(3rem, 8vw, 7rem); }

        /* ─── 콘텐츠 inner (홈과 동일) ─── */
        .l-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        /* 가운데 정렬 섹션 */
        .l-inner-center {
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }

        /* ─── pricing 헤더 (pricing 페이지와 동일) ─── */
        .pricing-eyebrow {
          font-size: 0.6875rem; font-weight: 700; color: var(--accent);
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.35rem;
        }
        .pricing-heading {
          font-weight: 700; font-size: clamp(1.5rem, 3vw, 2rem); line-height: 1.18;
          color: var(--text); letter-spacing: -0.03em; margin: 0 0 0.35rem;
        }
        .pricing-sub { font-size: 0.875rem; color: var(--text-muted); margin: 0; }
        .pricing-header { text-align: center; margin-bottom: 1.75rem; }

        /* ─── pricing 전용 inner ─── */
        .lp-pricing-inner {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 3vw, 2.5rem);
          box-sizing: border-box;
        }

        /* ─── 그리드 ─── */
        .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .step-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .pricing-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 0.5rem; }

        /* ─── 실적 카드 그리드 ─── */
        .hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          flex: 1;
          min-width: 0;
        }

        /* ─── 모바일 전용 폼 (데스크톱 숨김) ─── */
        .landing-mob-form { display: none; }
        .lf-float-only    { display: contents; }

        /* ─── 모바일 (≤900px) ─── */
        @media (max-width: 900px) {
          .lf-float-only      { display: none; }
          .landing-mob-form   { display: flex; }
          .l-snap { padding: 60px 1rem 3rem; min-height: auto; }
          .l-snap-pad { padding: 80px 1rem 2rem; }
          .hero-pad { padding-left: 1rem; padding-top: 2rem; min-height: calc(100svh - 120px); }
          /* right padding reset on mobile (no floating form) */
          .l-inner, .l-inner-center { max-width: 100%; }
          .lp-pricing-inner { padding: 0 1rem; }
          .feature-grid { grid-template-columns: 1fr; }
          .step-grid    { grid-template-columns: 1fr; }
          .pricing-grid-3 { grid-template-columns: 1fr; }
          .l-h2 { font-size: 1.3rem; }
          .hero-stats { display: none; }
        }

        @media (max-width: 600px) {
          .l-btn-row { flex-direction: column; align-items: stretch; }
          .l-btn-row > * { text-align: center; justify-content: center; }
        }

        @keyframes lmarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes lmarquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
