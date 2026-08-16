'use client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

type Variant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'fade'

/**
 * 스크롤 시 화면에 들어오면 등장하는 래퍼.
 * - variant: 등장 방향/효과 (up=아래→위, left/right=좌우 슬라이드, zoom, blur, fade)
 * - delay: 지연(초)
 * - stagger: true면 "직계 자식"들이 순차 등장 (카드 그리드용). 이땐 variant는 위로-페이드 고정.
 * - as: 렌더 태그 (기본 div). stagger로 그리드를 감쌀 땐 className에 그리드 클래스를 넘기면 됨.
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  stagger = false,
  once = true,
  className = '',
  style,
  as: Tag = 'div' as ElementType,
}: {
  children: ReactNode
  variant?: Variant
  delay?: number
  stagger?: boolean
  once?: boolean
  className?: string
  style?: CSSProperties
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 첫 진입 시 이미 화면 안(또는 바로 아래)에 있는 요소는 바로 보여준다.
    // 관찰자의 하단 마진(-12%) 때문에 첫 화면 아래쪽 카드가 스크롤 전까지 안 보이던 문제 방지.
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) {
      setVisible(true)
      if (once) return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const base = stagger ? 'reveal-stagger' : `reveal-x reveal-${variant}`
  const cls = [base, visible ? 'is-visible' : '', className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={cls} style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}>
      {children}
    </Tag>
  )
}
