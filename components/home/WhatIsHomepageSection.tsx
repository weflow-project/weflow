'use client'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowUp, Crown, Star } from 'lucide-react'

type Point = {
  order: string
  title: string
  stat: string
  desc: ReactNode
  source: string
}

// 홈페이지가 필요한 이유 6가지 — 지그재그 행(통계 숫자 + 설명 + 출처)을 채운다
const POINTS: Point[] = [
  {
    order: '첫째',
    title: '홈페이지로 유입되는 순간, 고객 DB 확보',
    stat: '99.9%',
    desc: (
      <>
        카톡·SNS 폼보다 요청사항까지 남기고 들어와, <br /><strong>니즈가 명확한 고객</strong>이 데이터로 남습니다.
        <br />
        유입되는 순간부터 기록돼, 명확한 고객 DB 유입량이 늘어납니다.
      </>
    ),
    source: '* WEFLOW 관리자 페이지에서 문의·예약·통계 기본 제공',
  },
  {
    order: '둘째',
    title: 'SNS(네이버·인스타 등) 유입만으로는 부족',
    stat: '84%',
    desc: (
      <>
        SNS를 하지 말라는 게 아니에요.<br />내 <strong>홈페이지를 가진 상태</strong>로 SNS를 운영하라는 뜻입니다.
        <br />
        소비자의 <strong>84%</strong>가 소셜미디어보다 홈페이지를 더 신뢰하니,<br />함께 굴릴수록 광고·유입 효과가 커집니다.
      </>
    ),
    source: '출처: BusinessDasher, "Statistics About Website" (2026)',
  },
  {
    order: '셋째',
    title: 'SEO 상단 관리·상위 노출',
    stat: '50%',
    desc: (
      <>
        각 페이지별 <strong>고유 URL</strong>과 메타·구조화 정보를 최적화하면,<br />검색 결과에서 <strong>클릭률(CTR)이 20~80%</strong>까지 높아집니다.
        <br />
        노출 기회가 늘어 상위 노출과 유입 확대에 유리해집니다.
      </>
    ),
    source: '출처: Wellows (2026) 스키마마크업 리치 결과 CTR 분석',
  },
  {
    order: '넷째',
    title: '홈페이지로 이어지는 실제 매출',
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
    order: '다섯째',
    title: '고객이 먼저 찾는 홈페이지',
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
    order: '여섯째',
    title: '전문성과 체계성의 증명',
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

// POINTS 순서와 1:1 매핑 (03만 .jpg)
const WHY_IMAGES = [
  '/images/main/main-why-01.png',
  '/images/main/main-why-02.png',
  '/images/main/main-why-03.png',
  '/images/main/main-why-04.png',
  '/images/main/main-why-05.png',
  '/images/main/main-why-06.png',
]

/**
 * "02 · 홈페이지가 필요한 이유" 섹션 — 통계 근거 6가지를 지그재그 좌우 배치로 보여준다
 * 앞의 3개는 핵심으로 왕관·뱃지와 강조 패널이 붙는다
 */
export default function WhatIsHomepageSection() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  // 섹션이 화면에 들어오면 파란 통계 숫자 흔들림 애니메이션을 시작한다 (한 번만)
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
    <section id="why-homepage" ref={ref} style={{ background: 'var(--section-a)', padding: 'clamp(2.25rem, 5vw, 4rem) 1.25rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <span className="footnote emphasized c-accent">02 · 홈페이지가 필요한 이유</span>
          {/* 별 5개 (배경 없이) */}
          <div aria-hidden="true" style={{ display: 'flex', gap: '1px', margin: '0.9rem 0 0.5rem' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={19} fill="#f5b301" color="#f5b301" strokeWidth={0} />
            ))}
          </div>
          <h2 className="title-1" style={{ marginTop: 0, textAlign: 'left', wordBreak: 'keep-all' }}>
            홈페이지가 <span className="c-accent tilt-hl tilt-hl-red">왜 필요할까요?</span>
          </h2>
        </div>

        {/* 지그재그 포인트 */}
        {POINTS.map((p, i) => (
          <div key={p.order} className={`wih-row${i % 2 === 0 ? ' reverse' : ''}`}>
            {/* 텍스트 */}
            <div className={`wih-text${i < 3 ? ' wih-text--key' : ''}`}>
              {i < 3 && (
                <Crown
                  strokeWidth={2}
                  color="#f5b301"
                  fill="#f5b301"
                  style={{ width: '1.625rem', height: '1.625rem', display: 'block', marginBottom: '0.2rem', marginLeft: '-0.15rem' }}
                />
              )}
              <span className="footnote emphasized c-accent">{p.order}</span>
              {i < 3 && <span className="wih-badge">핵심</span>}
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
                      fontSize: 'clamp(1.7rem, 4.2vw, 2.7rem)',
                      display: 'inline-block',
                    }}
                  >
                    {p.stat}
                  </span>
                  {i >= 1 && (
                    <ArrowUp
                      strokeWidth={2.6}
                      color="var(--accent)"
                      style={{ width: 'clamp(1.7rem, 4.2vw, 2.75rem)', height: 'clamp(1.7rem, 4.2vw, 2.75rem)', flexShrink: 0 }}
                    />
                  )}
                </span>
              </div>
              <p className="body c-muted" style={{ margin: 0, wordBreak: 'keep-all' }}>
                {p.desc}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '8px 0 0', wordBreak: 'keep-all' }}>
                {p.source}
              </p>
            </div>

            {/* 이미지 */}
            <div className="wih-img">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: 'var(--radius-2xl)',
                  overflow: 'hidden',
                  background: 'var(--surface-container)',
                  border: '1px solid var(--border)',
                }}
              >
                <Image
                  src={WHY_IMAGES[i]}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* 그리드로 칸을 반씩 고정한다 — flex 는 내용에 따라 폭이 밀려서
           줄마다 가운데 경계선이 어긋났다. 좌우가 바뀌어도 경계선은 항상 같은 자리다. */
        .wih-row {
          display: grid;
          /* 사진과 글을 반반 — 사진이 칸을 꽉 채우므로
             가운데 경계선과 바깥 끝선이 줄마다 똑같이 떨어진다 */
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 3.5rem);
        }
        /* 번갈아 놓기는 order 로 — 칸 자체는 그대로 두고 내용만 자리를 바꾼다 */
        .wih-row.reverse .wih-text { order: 2; }
        .wih-row.reverse .wih-img { order: 1; }
        .wih-row + .wih-row { margin-top: clamp(2.5rem, 6vw, 4rem); }
        .wih-text { min-width: 0; }
        /* 줄 전체를 한 단계 작게 — 전역 글씨 클래스는 rem 이라
           틀만 좁혀서는 글씨가 따라 줄지 않아 여기서 직접 낮춘다 */
        .wih-text .title-2 { font-size: clamp(1.2rem, 2.6vw, 1.33rem); }
        .wih-text .body { font-size: 0.92rem; }
        .wih-img { min-width: 0; }
        @media (max-width: 768px) {
          .wih-row { grid-template-columns: 1fr; align-items: stretch; }
          .wih-row .wih-text, .wih-row.reverse .wih-text { order: 2; }
          .wih-row .wih-img, .wih-row.reverse .wih-img { order: 1; }
          /* 한 줄로 쌓이면 사진이 너무 커지지 않게만 잡아둔다 */
          .wih-img > div { max-width: 480px; margin-inline: auto; }
        }
        /* 핵심 뱃지 */
        .wih-badge {
          display: inline-block;
          margin-left: 0.5rem;
          vertical-align: middle;
          background: var(--accent);
          color: var(--on-accent);
          font-size: 0.66rem;
          font-weight: 700;
          padding: 2px 9px;
          border-radius: 9999px;
          letter-spacing: 0.02em;
        }
        /* 1·2·3 핵심 강조 패널 */
        .wih-text--key {
          background: var(--accent-light);
          border: 1px solid var(--accent-light);
          border-radius: var(--radius-2xl);
          padding: clamp(1rem, 2.2vw, 1.5rem);
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
