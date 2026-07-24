'use client'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, ClipboardCheck } from 'lucide-react'

const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'

// 카카오톡 공식 말풍선 심볼 (노란 원 위에 얹는 검은 말풍선)
function KakaoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M128 36C70.6 36 24 72.9 24 118.4c0 29.4 19.5 55.2 48.9 69.8-1.6 5.5-8.8 30.4-9.1 32.4 0 0-.2 1.5.8 2.1.9.6 2.2.1 2.2.1 2.9-.4 33.2-21.7 38.4-25.4 7.4 1 15.1 1.6 22.8 1.6 57.4 0 104-36.9 104-82.4S185.4 36 128 36z" />
    </svg>
  )
}

// 우측 세로 플로팅 3칸 — 전화·카톡·견적. bg/fg는 버튼 색.
const ITEMS = [
  { href: 'tel:010-2971-7280', label: '24시간 상담', icon: Phone, bg: '#2563eb', fg: '#fff', tel: true },
  { href: KAKAO_URL, label: '카카오톡 문의', icon: KakaoIcon, bg: '#FEE500', fg: '#3C1E1E', external: true },
  { href: '/diagnosis', label: '3초 견적', icon: ClipboardCheck, bg: '#7c3aed', fg: '#fff', wiggle: true },
]

/**
 * 화면 우측에 세로로 고정되는 원형 CTA 버튼 — 전화·카카오톡·견적 바로가기.
 * 평소엔 원형 아이콘만, hover 하면 라벨이 왼쪽으로 펼쳐진다(터치 기기는 아이콘만).
 * 전화/외부 링크는 <a>, 내부 경로는 <Link>로 나눠 그린다.
 */
export default function FloatingButtons() {
  // 모바일에서만: 스크롤 중엔 보이고, 멈춘 뒤 2초가 지나면 숨긴다.
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    if (!mq.matches) return

    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setHidden(false)
      clearTimeout(timer)
      timer = setTimeout(() => setHidden(true), 2000)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`floating-cta${hidden ? ' is-hidden' : ''}`}>
      {ITEMS.map(({ href, label, icon: Icon, bg, fg, external, tel, wiggle }) => {
        const style = { '--fab-bg': bg, '--fab-fg': fg } as CSSProperties
        const className = wiggle ? 'fab fab-wiggle' : 'fab'
        const inner = (
          <>
            <span className="fab-label">{label}</span>
            <span className="fab-icon"><Icon size={24} /></span>
          </>
        )

        if (external || tel) {
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={className}
              style={style}
            >
              {inner}
            </a>
          )
        }
        return (
          <Link key={label} href={href} aria-label={label} className={className} style={style}>
            {inner}
          </Link>
        )
      })}
    </div>
  )
}