'use client'
// 숫자 뒤 스탬프('할인') — 숫자 카운트업(0.7s)이 끝나면 노란 테두리가 선으로 그려지고(~1.25s),
// 이어서 글자가 한 자씩 나타나 옆 칸 100% 카운트업(1.6s)과 같이 끝난다.
// 시작 조건은 CountUp/CharReveal 과 동일.
import { useEffect, useRef, useState } from 'react'

export default function TrustTailStamp({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [on, setOn] = useState(false)
  const chars = Array.from(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = () => setOn(true)
    // 모션 최소화 설정이면 즉시 노출
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      start()
      return
    }
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) {
      start()
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        start()
        io.disconnect()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} className={`trust-tail${on ? ' trust-tail--on' : ''}`}>
      {/* 테두리 — pathLength=100 으로 정규화해 dashoffset 100→0 이 곧 '그리기' */}
      <svg className="trust-tail__box" aria-hidden="true">
        <rect pathLength={100} />
      </svg>
      {chars.map((c, i) => (
        <span
          key={i}
          className="trust-tail__ch"
          style={{ transitionDelay: on ? `${1.25 + i * 0.18}s` : '0s' }}
        >
          {c}
        </span>
      ))}
    </span>
  )
}
