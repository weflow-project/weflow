'use client'
// 숫자 카운트업 — 뷰포트 진입 시 0 → end 까지 easeOut 으로 상승. format 이면 천 단위 콤마.
import { useEffect, useRef, useState } from 'react'

type Props = {
  end: number
  suffix?: string
  duration?: number
  format?: boolean
}

export default function CountUp({ end, suffix = '', duration = 1600, format = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || end === 0) return // 0 은 애니메이션 불필요
    const start = () => {
      if (started.current) return
      started.current = true
      // 모션 최소화 설정이면 즉시 최종값
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(end)
        return
      }
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        setValue(Math.round(end * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    // 첫 화면 안에 이미 들어와 있으면 관찰을 기다리지 않고 바로 시작한다
    // (모바일에서 밴드가 히어로와 함께 보이므로 관찰자만 믿으면 0 인 채로 멈춘다)
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
  }, [end, duration])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {format ? value.toLocaleString('ko-KR') : value}
      {suffix}
    </span>
  )
}
