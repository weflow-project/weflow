'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, Newspaper, ClipboardCheck } from 'lucide-react'

const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'
const BLOG_URL = 'https://m.blog.naver.com/weflowlab'

const ITEMS = [
  { href: 'tel:010-2971-7280', label: '24시간 상담', icon: Phone, external: false, tel: true },
  { href: KAKAO_URL, label: '카카오톡문의', icon: MessageCircle, external: true },
  { href: BLOG_URL, label: '블로그', icon: Newspaper, external: true },
  { href: '/diagnosis', label: '무료진단', icon: ClipboardCheck, external: false },
]

export default function BottomBar() {
  const pathname = usePathname()

  return (
    <nav className="bottom-action-bar">
      {ITEMS.map(({ href, label, icon: Icon, external, tel }) => {
        const isActive = !external && !tel && pathname === href
        const cls = `bottom-action-item${isActive ? ' active' : ''}`
        const content = <><Icon size={20} />{label}</>

        if (external || tel) {
          return (
            <a key={label} href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={cls}>
              {content}
            </a>
          )
        }
        return (
          <Link key={label} href={href}
            onClick={(e) => { if (pathname === href) { e.preventDefault(); window.location.href = href } }}
            className={cls}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}
