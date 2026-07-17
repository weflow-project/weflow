'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { portfolios, type Portfolio } from '@/data/cases'

const ROTATE_MS = 3500
// 사진 3장 모두 약 2.19:1 — 원본 비율에 맞춰야 좌우가 잘리지 않는다
const PHOTO_ASPECT = '1896 / 867'

function PortfolioCard({ p }: { p: Portfolio }) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  // 사진 자동 전환 (마우스를 올리면 멈춘다)
  useEffect(() => {
    if (hovered || p.images.length < 2) return
    const t = setInterval(() => setIndex(i => (i + 1) % p.images.length), ROTATE_MS)
    return () => clearInterval(t)
  }, [hovered, p.images.length])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        border: `1.5px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        background: '#fff',
        transition: 'border-color 0.2s',
      }}
    >
      {/* 사진 자리 — 겹쳐놓고 페이드로 전환 */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: PHOTO_ASPECT, background: '#e6eaf1' }}>
        {p.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${p.name} ${i + 1}번째 화면`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
            style={{
              objectFit: 'cover',
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
        ))}

        {/* 현재 사진 표시 — 눌러서 바로 넘길 수도 있다 (카드 링크보다 위에 둔다) */}
        {p.images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '0.7rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '0.35rem', zIndex: 3,
          }}>
            {p.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}번째 사진 보기`}
                style={{
                  width: i === index ? 18 : 6, height: 6, padding: 0,
                  borderRadius: '9999px', border: 'none', cursor: 'pointer',
                  background: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 설명 */}
      <div style={{ padding: '0.95rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem' }}>
        <div>
          <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.2rem' }}>{p.name}</p>
          <p className="footnote c-muted" style={{ margin: 0 }}>{p.desc}</p>
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={2.5}
          style={{
            flexShrink: 0,
            color: hovered ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 0.2s',
          }}
        />
      </div>

      {/* 카드 전체를 실제 사이트로 연결 — 사진 넘기는 점은 위(zIndex 3)에 있어 안 가로챈다 */}
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${p.name} 사이트 새 창에서 열기`}
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      />
    </div>
  )
}

// 업종 칩 — '전체' + 사례에 실제로 있는 업종들 (사례가 늘면 업종도 따라 늘어난다)
const ALL = '전체'
const CATEGORIES = [ALL, ...Array.from(new Set(portfolios.map(p => p.category)))]

/** 실제 제작 사례 — 업종 칩으로 거르고, 한 줄에 두 칸(화면 반)씩 채운다 */
export default function PortfolioShowcase() {
  const [active, setActive] = useState(ALL)
  const filtered = active === ALL ? portfolios : portfolios.filter(p => p.category === active)

  return (
    <div>
      {/* 업종 칩 */}
      <div className="portfolio-chips">
        {CATEGORIES.map(cat => {
          const isActive = cat === active
          const count = cat === ALL ? portfolios.length : portfolios.filter(p => p.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="subhead"
              style={{
                flexShrink: 0,
                padding: '0.4rem 1rem',
                background: isActive ? 'var(--accent)' : '#f3f4f6',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              {cat}
              <span
                className="caption-2 semibold"
                style={{
                  color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)',
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="portfolio-grid">
        {filtered.map(p => (
          <PortfolioCard key={p.slug} p={p} />
        ))}
      </div>

      <style>{`
        .portfolio-chips {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.1rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
