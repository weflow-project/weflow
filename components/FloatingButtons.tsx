'use client'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Phone, ClipboardCheck, CalendarCheck } from 'lucide-react'

const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'

// 카카오톡 공식 말풍선 심볼 (노란 원 위에 얹는 검은 말풍선)
function KakaoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M128 36C70.6 36 24 72.9 24 118.4c0 29.4 19.5 55.2 48.9 69.8-1.6 5.5-8.8 30.4-9.1 32.4 0 0-.2 1.5.8 2.1.9.6 2.2.1 2.2.1 2.9-.4 33.2-21.7 38.4-25.4 7.4 1 15.1 1.6 22.8 1.6 57.4 0 104-36.9 104-82.4S185.4 36 128 36z" />
    </svg>
  )
}

// PC 우측 세로 플로팅 3칸 — 전화·카톡·상담. bg/fg는 버튼 색.
const ITEMS = [
  { href: 'tel:010-2971-7280', label: '24시간 상담', icon: Phone, bg: '#2563eb', fg: '#fff', tel: true },
  { href: KAKAO_URL, label: '카카오톡 문의', icon: KakaoIcon, bg: '#FEE500', fg: '#3C1E1E', external: true },
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

      {/* 모바일 — 화면 맨 아래 두 칸 바 (PC 에선 CSS 로 숨김) */}
      <div className="mobile-cta-bar">
        <a href="tel:010-2971-7280" className="mobile-cta-bar__btn mobile-cta-bar__btn--call">
          <Phone size={19} strokeWidth={2.2} />
          바로전화
        </a>
        <Link href="/diagnosis" className="mobile-cta-bar__btn mobile-cta-bar__btn--form">
          <CalendarCheck size={19} strokeWidth={2.2} />
          무료상담신청
        </Link>
      </div>
    </>
  )
}
