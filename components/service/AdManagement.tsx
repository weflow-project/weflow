'use client'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  FileEdit, Camera, AtSign, Search, MapPin,
  BarChart2, Globe, Map,
} from 'lucide-react'

const AD_SERVICES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: FileEdit,  title: '블로그 업로드',         desc: '네이버 블로그 정기 업로드' },
  { Icon: Camera,    title: '인스타 업로드',         desc: '인스타그램 피드·릴스 운영' },
  { Icon: AtSign,    title: '스레드 업로드',         desc: '스레드 계정 운영 관리' },
  { Icon: Search,    title: '네이버 키워드',         desc: '네이버 키워드 광고 세팅·운영' },
  { Icon: MapPin,    title: '당근플레이스',          desc: '당근플레이스 키워드 업로드' },
  { Icon: BarChart2, title: '네이버 서치어드바이저', desc: '상단 등록 및 최적화' },
  { Icon: Globe,     title: '구글 콘솔',             desc: '구글 검색 상단 등록' },
  { Icon: Map,       title: '사이트맵 등록',         desc: 'XML 사이트맵 생성 및 등록' },
]

function AdCard({ Icon, title, desc }: { Icon: LucideIcon; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#ebf2ff' : '#fff',
        border: hovered ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
        borderRadius: '10px', padding: '1.25rem',
        cursor: 'default',
        transition: 'all 0.18s',
      }}
    >
      <div style={{
        width: '42px', height: '42px',
        background: hovered ? 'var(--accent)' : '#ebf2ff',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0.85rem',
        transition: 'background 0.18s',
      }}>
        <Icon size={20} color={hovered ? '#fff' : 'var(--accent)'} strokeWidth={2} />
      </div>
      <h4 className="subhead emphasized c-primary" style={{ margin: '0 0 0.35rem' }}>
        {title}
      </h4>
      <p className="footnote c-muted" style={{ margin: 0 }}>
        {desc}
      </p>
    </div>
  )
}

export default function AdManagement() {
  return (
    <section style={{
      padding: '3.5rem 1.5rem', background: '#fff',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="caption-1 emphasized c-accent" style={{
            letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.4rem',
          }}>AD MANAGEMENT</p>
          <h2 className="title-1" style={{ margin: '0 0 0.5rem' }}>
            광고 운영·사후관리 시스템
          </h2>
          <p className="callout c-muted">
            제작 후에도 꾸준히 성장할 수 있도록 전방위 운영을 지원합니다
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="ad-grid">
          {AD_SERVICES.map(({ Icon, title, desc }) => (
            <AdCard key={title} Icon={Icon} title={title} desc={desc} />
          ))}
        </div>

        {/* 안내 문구 */}
        <div style={{
          marginTop: '2rem', padding: '1rem 1.25rem',
          background: '#f9fafb', border: '1px solid var(--border)',
          borderRadius: '10px', textAlign: 'center',
        }}>
          <p className="footnote c-muted" style={{ margin: 0 }}>
            케어 플랜에 따라 운영 항목이 달라집니다.
            <span className="c-accent semibold"> 무료 진단</span>을 통해 맞춤 운영 플랜을 확인하세요.
          </p>
        </div>
      </div>

      <style>{`
        .ad-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 1024px) {
          .ad-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .ad-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ad-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}
