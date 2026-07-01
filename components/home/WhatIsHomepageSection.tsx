'use client'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

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
    order: '둘째',
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
    order: '셋째',
    title: '고객이 먼저 홈페이지를 찾습니다',
    stat: '81%',
    desc: (
      <>
        소비자의 <strong>81%</strong>가 구매 전 온라인 조사를 합니다.
        <br />
        그리고 <strong>39%</strong>(젊은층 45%)는,
        <br />
        홈페이지가 없다는 이유만으로 그 사업체를 포기한 경험이 있습니다.
      </>
    ),
    source: '출처: GE Capital Retail Bank 조사 (81%), DreamHost 2026 Local Business Trust Index (39%)',
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
    <section ref={ref} style={{ background: 'var(--bg-secondary)', padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem' }}>
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
          <div key={p.order} className={`wih-row${i % 2 === 1 ? ' reverse' : ''}`}>
            {/* 텍스트 */}
            <div className="wih-text">
              <span className="footnote emphasized c-accent">{p.order}</span>
              <h3 className="title-2 emphasized" style={{ margin: '0.5rem 0 1rem', wordBreak: 'keep-all' }}>
                {p.title}
              </h3>
              <div style={{ marginBottom: '0.9rem' }}>
                <span
                  className={`large-title emphasized c-accent wih-stat${inView ? ' go' : ''}`}
                  style={{
                    lineHeight: 1,
                    fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
                    display: 'inline-block',
                  }}
                >
                  {p.stat}
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
