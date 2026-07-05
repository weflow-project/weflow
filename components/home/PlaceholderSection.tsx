import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import SlideCarousel from './SlideCarousel'

function ImageBox({ aspectRatio, style }: { aspectRatio: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio,
        borderRadius: 'var(--radius-2xl)',
        background: '#e6eaf1',
        border: '1px dashed rgba(11,18,32,0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      이미지
    </div>
  )
}

/**
 * 스켈레톤용 임시 섹션 — 헤더(아이브로우 + 제목 + 임시 본문) 아래 이미지 자리.
 * imageCount로 이미지 칸 개수 지정(기본 1). 2개 이상이면 가로 나란히 배치.
 * 실제 콘텐츠가 확정되면 전용 컴포넌트로 분리한다.
 */
export default function PlaceholderSection({
  eyebrow,
  title,
  body,
  background = '#fff',
  imageCount = 1,
  imageCols,
  imageAspect = '1 / 1',
  carousel = false,
  image,
  imageAlt = '',
}: {
  eyebrow: string
  title: ReactNode
  body?: string
  background?: string
  imageCount?: number
  imageCols?: number
  imageAspect?: string
  /** true면 이미지를 나란히 놓지 않고 히어로처럼 슬라이드로 전환 */
  carousel?: boolean
  /** 단일 이미지 자리에 넣을 실제 이미지 경로 (테스트/실제 교체용) */
  image?: string
  imageAlt?: string
}) {
  return (
    <section
      style={{
        background,
        padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 (좌측 정렬) */}
        <Reveal variant="up" style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          <span className="footnote emphasized c-accent">{eyebrow}</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left', wordBreak: 'keep-all' }}>
            {title}
          </h2>
          {body && (
            <p className="body c-muted" style={{ margin: '1rem 0 0', maxWidth: '640px', wordBreak: 'keep-all' }}>
              {body}
            </p>
          )}
        </Reveal>

        {/* 이미지 자리 (텍스트 아래 · 추후 교체) */}
        {carousel ? (
          <Reveal variant="up">
            <SlideCarousel count={Math.max(imageCount, 1)} aspectRatio={imageAspect} />
          </Reveal>
        ) : imageCount > 1 ? (
          imageCols ? (
            <Reveal as="div" stagger style={{ display: 'grid', gridTemplateColumns: `repeat(${imageCols}, minmax(0, 1fr))`, gap: '1.1rem' }}>
              {Array.from({ length: imageCount }, (_, i) => (
                <ImageBox key={i} aspectRatio={imageAspect} />
              ))}
            </Reveal>
          ) : (
            <Reveal as="div" stagger style={{ display: 'flex', flexWrap: 'wrap', gap: '1.1rem' }}>
              {Array.from({ length: imageCount }, (_, i) => (
                <ImageBox key={i} aspectRatio={imageAspect} style={{ flex: '1 1 160px' }} />
              ))}
            </Reveal>
          )
        ) : image ? (
          <Reveal variant="up">
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', border: '1px solid var(--border)', background: '#e6eaf1' }}>
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectFit: 'cover' }} />
            </div>
          </Reveal>
        ) : (
          <Reveal variant="up">
            <ImageBox aspectRatio="16 / 9" />
          </Reveal>
        )}
      </div>
    </section>
  )
}
