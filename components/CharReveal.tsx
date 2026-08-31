'use client'
// 글자 하나씩 드러내기 — CountUp 과 같은 시작 조건·시간·이징을 써서
// 숫자 카운트업(0 → 100%)과 정확히 같은 속도로 끝난다.
// 전체 글자는 처음부터 투명하게 깔아 두어 너비가 미리 잡힌다(레이아웃 흔들림 방지).
import { useEffect, useRef, useState } from 'react'

type Props = {
  text: string
  duration?: number
}

export default function CharReveal({ text, duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(0)
  const started = useRef(false)
  const chars = Array.from(text)

  useEffect(() => {
    const el = ref.current
    if (!el || chars.length === 0) return
    const start = () => {
      if (started.current) return
      started.current = true
      // 모션 최소화 설정이면 즉시 전체 노출
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setShown(chars.length)
        return
      }
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic — CountUp 과 동일
        setShown(Math.round(chars.length * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    // 첫 화면 안에 이미 들어와 있으면 관찰을 기다리지 않고 바로 시작한다 (CountUp 과 동일)
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
  }, [text, duration, chars.length])

  return (
    <span ref={ref}>
      {chars.map((c, i) => (
        <span key={i} style={{ opacity: i < shown ? 1 : 0, transition: 'opacity 0.15s' }}>
          {c}
        </span>
      ))}
    </span>
  )
}
