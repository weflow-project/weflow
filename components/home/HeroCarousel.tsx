'use client'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// 추후 실제 대표 이미지로 교체 (예: <Image src=... fill /> 로 배경 대체)
const SLIDES = [
  { label: '대표 이미지 1', bg: 'var(--accent-light)' },
  { label: '대표 이미지 2', bg: '#eef2f8' },
  { label: '대표 이미지 3', bg: '#e7ecf4' },
]
const COUNT = SLIDES.length
const INTERVAL = 3000

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const go = (i: number) => setIndex((i + COUNT) % COUNT)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  // 3초 자동 전환 (수동 조작/호버 시 타이머 리셋·정지)
  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIndex(i => (i + 1) % COUNT), INTERVAL)
    return () => clearTimeout(id)
  }, [index, paused])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) (delta < 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '960px',
        margin: 'clamp(2.5rem, 6vw, 4rem) auto 0',
        aspectRatio: '16 / 9',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="대표 이미지"
    >
      {/* 슬라이드 트랙 */}
      <div
        style={{
          display: 'flex',
          height: '100%',
          transform: `translateX(-${index * 100}%)`,
          transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            style={{
              flex: '0 0 100%',
              height: '100%',
              background: s.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="subhead c-muted"
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* 좌우 화살표 */}
      <button
        type="button"
        onClick={prev}
        aria-label="이전 이미지"
        className="hero-carousel-arrow"
        style={{ left: '0.75rem' }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="다음 이미지"
        className="hero-carousel-arrow"
        style={{ right: '0.75rem' }}
      >
        <ChevronRight size={20} />
      </button>

      {/* 하단 도트 */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.9rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.45rem',
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`${i + 1}번 이미지로 이동`}
            aria-current={i === index}
            style={{
              width: i === index ? '22px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: i === index ? 'var(--accent)' : 'rgba(11,18,32,0.22)',
              transition: 'width 0.25s, background 0.25s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
