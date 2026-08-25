'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const ROTATE_MS = 3500

/**
 * 사례 사진 슬라이드쇼 — 목록 카드(PortfolioShowcase)와 같은 방식으로
 * 사진을 겹쳐 놓고 페이드로 전환한다. 상세 페이지의 상단과 본문에서 함께 쓰는데,
 * start 로 시작 사진을 다르게 주면 두 슬라이드쇼가 같은 사진으로 겹치지 않는다.
 */
export default function CaseSlideshow({
  images,
  alt,
  start = 0,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 900px',
}: {
  images: string[]
  alt: string
  /** 시작 사진 번호 — 길이로 나눈 나머지를 쓰므로 넘쳐도 된다 */
  start?: number
  priority?: boolean
  sizes?: string
}) {
  const first = start % images.length
  const [index, setIndex] = useState(first)
  const [hovered, setHovered] = useState(false)

  // 사진 자동 전환 (마우스를 올리면 멈춘다)
  useEffect(() => {
    if (hovered || images.length < 2) return
    const t = setInterval(() => setIndex(i => (i + 1) % images.length), ROTATE_MS)
    return () => clearInterval(t)
  }, [hovered, images.length])

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'block',
        // 사진마다 비율이 조금씩 달라(약 2.0~2.2:1) 한 비율로 고정하고 cover 로 채운다
        aspectRatio: '2.05 / 1',
        background: 'var(--surface-container)',
        overflow: 'hidden',
      }}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}번째 화면`}
          fill
          sizes={sizes}
          priority={priority && i === first}
          style={{
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      ))}

      {/* 현재 사진 표시 — 눌러서 바로 넘길 수도 있다.
          상단 슬라이드쇼는 링크(a) 안에 있어서, 점을 눌렀을 때 밖으로 나가지 않게 막는다 */}
      {images.length > 1 && (
        <span
          style={{
            position: 'absolute', bottom: '0.7rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '0.35rem', zIndex: 3,
          }}
        >
          {images.map((src, i) => (
            <button
              key={src}
              onClick={e => { e.preventDefault(); e.stopPropagation(); setIndex(i) }}
              aria-label={`${i + 1}번째 사진 보기`}
              style={{
                width: i === index ? 18 : 6, height: 6, padding: 0,
                borderRadius: '9999px', border: 'none', cursor: 'pointer',
                background: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
                transition: 'width 0.3s, background 0.3s',
              }}
            />
          ))}
        </span>
      )}
    </span>
  )
}
