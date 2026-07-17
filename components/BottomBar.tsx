'use client'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Newspaper, ClipboardCheck } from 'lucide-react'
import { RiKakaoTalkFill } from 'react-icons/ri'

const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'
const BLOG_URL = 'https://m.blog.naver.com/weflowlab'

// 하단 바 4칸 — color는 아이콘 색, whiteLines는 아이콘 테두리를 흰 선으로 뺄지 여부
const ITEMS = [
  { href: 'tel:010-2971-7280', label: '24시간 상담', icon: Phone, external: false, tel: true, color: '#2563eb', whiteLines: false, textColor: undefined as string | undefined },
  { href: KAKAO_URL, label: '카카오톡 문의', icon: RiKakaoTalkFill, external: true, color: '#FEE500', whiteLines: false, textColor: '#3C1E1E', filled: true },
  { href: BLOG_URL, label: '블로그', icon: Newspaper, external: true, color: '#03c75a', whiteLines: true, textColor: undefined },
  { href: '/diagnosis', label: '3초 견적', icon: ClipboardCheck, external: false, color: '#7c3aed', whiteLines: true, textColor: undefined },
]

/**
 * 모바일 화면 맨 아래 고정되는 액션 바 — 전화·카톡·블로그·견적 바로가기.
 * 전화/외부 링크는 <a>, 내부 경로는 <Link>로 나눠 그린다.
 */
export default function BottomBar() {
  const pathname = usePathname()

  return (
    <nav className="bottom-action-bar">
      {ITEMS.map(({ href, label, icon: Icon, external, tel, color, whiteLines, textColor, filled }) => {
        const isActive = !external && !tel && pathname === href
        const cls = `bottom-action-item${isActive ? ' active' : ''}`
        const itemStyle = { '--item-color': color } as CSSProperties
        const content = (
          <>
            {filled ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#FEE500',
                }}
              >
                <Icon size={14} color="#3C1E1E" />
              </span>
            ) : (
              <Icon
                size={20}
                fill="currentColor"
                stroke={whiteLines ? '#fff' : 'currentColor'}
                strokeWidth={whiteLines ? 1.9 : 2}
              />
            )}
            <span style={textColor ? { color: textColor } : undefined}>{label}</span>
          </>
        )

        if (external || tel) {
          return (
            <a key={label} href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={cls} style={itemStyle}>
              {content}
            </a>
          )
        }
        return (
          <Link key={label} href={href}
            onClick={(e) => { if (pathname === href) { e.preventDefault(); window.location.href = href } }}
            className={cls} style={itemStyle}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}
