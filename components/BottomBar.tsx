'use client'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, Newspaper, ClipboardCheck } from 'lucide-react'

const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'
const BLOG_URL = 'https://m.blog.naver.com/weflowlab'

const ITEMS = [
  { href: 'tel:010-2971-7280', label: '24시간 상담', icon: Phone, external: false, tel: true, color: '#2563eb' },
  { href: KAKAO_URL, label: '카카오톡 문의', icon: MessageCircle, external: true, color: '#f5a623' },
  { href: BLOG_URL, label: '블로그', icon: Newspaper, external: true, color: '#03c75a' },
  { href: '/diagnosis', label: '무료 진단', icon: ClipboardCheck, external: false, color: '#7c3aed' },
]

export default function BottomBar() {
  const pathname = usePathname()

  return (
    <nav className="bottom-action-bar">
      {ITEMS.map(({ href, label, icon: Icon, external, tel, color }) => {
        const isActive = !external && !tel && pathname === href
        const cls = `bottom-action-item${isActive ? ' active' : ''}`
        const itemStyle = { '--item-color': color } as CSSProperties
        const content = <><Icon size={20} fill="currentColor" fillOpacity={0.18} />{label}</>

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
