'use client'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUp, Crown } from 'lucide-react'

type Point = {
  order: string
  title: string
  stat: string
  desc: ReactNode
  source: string
}

const POINTS: Point[] = [
  {
    order: '첫째',
    title: '방문이 그대로 고객 DB가 됩니다',
    stat: '99.9%',
    desc: (
      <>
        홈페이지로 들어온 문의·예약을 <strong>빠짐없이 기록</strong>해 관리자 페이지에 쌓습니다.
        <br />
        흩어지던 고객 정보가 통계로 관리되는 온전한 내 자산이 됩니다.
      </>
    ),
    source: '* WEFLOW 관리자 페이지에서 문의·예약·통계 기본 제공',
  },
  {
    order: '둘째',
    title: '홈페이지는 실제 매출로 이어집니다',
    stat: '15~50%',
    desc: (
      <>
        웹사이트를 활용하면 매출이 <strong>15~50%</strong> 늘어납니다.
        <br />
        반대로 홈페이지가 없으면 소개로 찾아온 고객의 <strong>20~35%</strong>가 그대로 새어나갑니다.
      </>
    ),
    source: '출처: BusinessDasher (2026), LeadsAgent · Google 소비자 조사 인용',
  },
  {
    order: '셋째',
    title: '인스타·블로그만으로는 부족합니다',
    stat: '84%',
    desc: (
      <>
        소비자의 <strong>84%</strong>가 소셜미디어보다 홈페이지를 더 신뢰합니다.
        <br />
        플랫폼 알고리즘 변화에 휘둘리지 않는, 온전히 내 것인 공간이 필요합니다.
      </>
    ),
    source: '출처: BusinessDasher, "Statistics About Website" (2026)',
  },
  {
    order: '넷째',
    title: '고객이 먼저 홈페이지를 찾습니다',
    stat: '81%',
    desc: (
      <>
        소비자의 <strong>81%</strong>가 구매 전 온라인으로 정보를 찾아봅니다.
        <br />
        홈페이지가 없으면 이 탐색 단계에서 선택지에조차 오르지 못합니다.
      </>
    ),
    source: '출처: BusinessDasher (2026) 웹사이트 통계',
  },
  {
    order: '다섯째',
    title: 'SEO 상위 노출 증가',
    stat: '50%',
    desc: (
      <>
        각 페이지별 <strong>고유 URL</strong>과 메타·구조화 정보를 최적화하면, 검색 결과에서 <strong>클릭률(CTR)이 20~80%</strong>까지 높아집니다.
        <br />
        노출 기회가 늘어 상위 노출과 유입 확대에 유리해집니다.
      </>
    ),
    source: '출처: Wellows (2026) 스키마마크업 리치 결과 CTR 분석',
  },
  {
    order: '여섯째',
    title: '전문성과 체계성을 증명합니다',
    stat: '75%',
    desc: (
      <>
        목적에 맞게 구조화된 홈페이지는 그 자체로 <strong>전문성과 체계성</strong>을 보여줍니다.
        <br />
        실제로 소비자의 <strong>75%</strong>가 웹사이트 디자인으로 비즈니스의 신뢰도를 판단합니다.
      </>
    ),
    source: '출처: BusinessDasher (2026) "Statistics About Website"',
  },
]

export default function WhatIsHomepageSection() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: '#fff', padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <span className="footnote emphasized c-accent">02 · 홈페이지가 필요한 이유</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left', wordBreak: 'keep-all' }}>
            홈페이지가 <span className="c-accent">왜 필요할까요?</span>
          </h2>
        </div>

        {/* 지그재그 포인트 */}
        {POINTS.map((p, i) => (
          <div key={p.order} className={`wih-row${i % 2 === 0 ? ' reverse' : ''}`}>
            {/* 텍스트 */}
            <div className="wih-text">
              {i === 0 && (
                <Crown
                  strokeWidth={2}
                  color="#f5b301"
                  fill="#f5b301"
                  style={{ width: '1.625rem', height: '1.625rem', display: 'block', marginBottom: '0.2rem', marginLeft: '-0.15rem' }}
                />
              )}
              <span className="footnote emphasized c-accent">{p.order}</span>
              <h3 className="title-2 emphasized" style={{ margin: '0.5rem 0 1rem', wordBreak: 'keep-all' }}>
                {p.title}
              </h3>
              <div style={{ marginBottom: '0.9rem' }}>
                <span
                  className={`wih-stat${inView ? ' go' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <span
                    className="large-title emphasized c-accent"
                    style={{
                      lineHeight: 1,
                      fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
                      display: 'inline-block',
                    }}
                  >
                    {p.stat}
                  </span>
                  {i >= 1 && (
                    <ArrowUp
                      strokeWidth={2.6}
                      color="var(--accent)"
                      style={{ width: 'clamp(2rem, 5vw, 3.25rem)', height: 'clamp(2rem, 5vw, 3.25rem)', flexShrink: 0 }}
                    />
                  )}
                </span>
              </div>
              <p className="body c-muted" style={{ margin: 0, wordBreak: 'keep-all' }}>
                {p.desc}
              </p>
              <p style={{ fontSize: '11px', color: '#aaa', margin: '8px 0 0', wordBreak: 'keep-all' }}>
                {p.source}
              </p>
            </div>

            {/* 이미지 자리 (추후 교체) */}
            <div className="wih-img">
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: 'var(--radius-2xl)',
                  background: '#e6eaf1',
                  border: '1px dashed rgba(11,18,32,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                이미지
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .wih-row {
          display: flex;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 3.5rem);
        }
        .wih-row.reverse { flex-direction: row-reverse; }
        .wih-row + .wih-row { margin-top: clamp(2.5rem, 6vw, 4rem); }
        .wih-text { flex: 1; min-width: 0; }
        .wih-img { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .wih-row, .wih-row.reverse { flex-direction: column; }
        }
        /* 파란 숫자 흔들림 효과 (화면 진입 후 7초마다 잠깐 흔들림) */
        .wih-stat { transform-origin: center bottom; }
        .wih-stat.go { animation: wih-wiggle 7s ease-in-out infinite; }
        @keyframes wih-wiggle {
          0%, 87%, 100% { transform: rotate(0deg); }
          89% { transform: rotate(-5deg); }
          91% { transform: rotate(4deg); }
          93% { transform: rotate(-3deg); }
          95% { transform: rotate(2deg); }
          97% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wih-stat.go { animation: none; }
        }
      `}</style>
    </section>
  )
}
