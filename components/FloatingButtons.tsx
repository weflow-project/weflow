'use client'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Phone, ClipboardCheck, CalendarCheck } from 'lucide-react'

// PC 우측 세로 플로팅 — 전화·상담. bg/fg는 버튼 색.
const ITEMS = [
  { href: 'tel:010-2971-7280', label: '24시간 상담', icon: Phone, bg: '#2563eb', fg: '#fff', tel: true },
  { href: '/diagnosis', label: '3초 상담', icon: ClipboardCheck, bg: '#7c3aed', fg: '#fff', wiggle: true },
]

/**
 * 고정 CTA — 화면 크기에 따라 모양이 다르다.
 * · PC: 우측 세로 원형 버튼 3개(전화·카톡·상담). hover 하면 라벨이 왼쪽으로 펼쳐진다.
 * · 모바일: 화면 맨 아래에 붙는 두 칸 바(바로전화 · 무료상담신청).
 *   원형 버튼이 스크롤을 따라다니며 내용을 가리는 것보다, 늘 같은 자리의 큰 바가 누르기 쉽다.
 * 전화/외부 링크는 <a>, 내부 경로는 <Link>로 나눠 그린다.
 */
export default function FloatingButtons() {
  return (
    <>
      {/* PC — 우측 세로 원형 버튼 (모바일에선 CSS 로 숨김) */}
      <div className="floating-cta">
        {ITEMS.map(({ href, label, icon: Icon, bg, fg, tel, wiggle }) => {
          const style = { '--fab-bg': bg, '--fab-fg': fg } as CSSProperties
          const className = wiggle ? 'fab fab-wiggle' : 'fab'
          const inner = (
            <>
              <span className="fab-label">{label}</span>
              <span className="fab-icon"><Icon size={24} /></span>
            </>
          )

          if (tel) {
            return (
              <a key={label} href={href} aria-label={label} className={className} style={style}>
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

      {/* 모바일 — 화면 맨 아래 두 칸 바 (PC 에선 CSS 로 숨김) */}
      <div className="mobile-cta-bar">
        <a href="tel:010-2971-7280" className="mobile-cta-bar__btn mobile-cta-bar__btn--call">
          <Phone size={20} strokeWidth={1.8} />
          바로전화
        </a>
        <Link href="/diagnosis" className="mobile-cta-bar__btn mobile-cta-bar__btn--form">
          <CalendarCheck size={20} strokeWidth={1.8} />
          무료상담신청
        </Link>
      </div>
    </>
  )
}
