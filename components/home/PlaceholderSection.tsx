import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CornerLeftDown, Star } from 'lucide-react'
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
  photoAspect = '16 / 9',
  photoFit = 'cover',
  carousel = false,
  image,
  imageAlt = '',
  imageHref,
  hint,
  stars = false,
  children,
}: {
  eyebrow: string
  title: ReactNode
  body?: string
  background?: string
  /** true면 아이브로우와 제목 사이에 별 5개 노출 */
  stars?: boolean
  imageCount?: number
  imageCols?: number
  imageAspect?: string
  /** image로 넣은 실제 사진의 표시 비율 — 사진 원본 비율과 맞춰야 잘리지 않는다 */
  photoAspect?: string
  /** 원본과 다른 비율로 보여줄 때 — cover는 잘라서 채우고, fill은 자르지 않고 늘린다 */
  photoFit?: 'cover' | 'fill'
  /** true면 이미지를 나란히 놓지 않고 히어로처럼 슬라이드로 전환 */
  carousel?: boolean
  /** 단일 이미지 자리에 넣을 실제 이미지 경로 (테스트/실제 교체용) */
  image?: string
  imageAlt?: string
  /** 값이 있으면 이미지 전체가 이 경로로 연결된다 */
  imageHref?: string
  /** 이미지를 가리키는 안내 문구 — 헤더 오른쪽에 화살표와 함께 노출 */
  hint?: ReactNode
  /** 이미지 자리에 직접 넣을 내용 — 넘기면 image·imageCount 대신 이게 그려진다 */
  children?: ReactNode
}) {
  return (
    <section
      style={{
        background,
        padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 (좌측 정렬 · 안내 문구는 우측 하단) */}
        <Reveal variant="up" className="ps-header" style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          <div>
            <span className="footnote emphasized c-accent">{eyebrow}</span>
            {stars && (
              <div aria-hidden="true" style={{ display: 'flex', gap: '1px', margin: '0.75rem 0 0' }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={19} fill="#f5b301" color="#f5b301" strokeWidth={0} />
                ))}
              </div>
            )}
            <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left', wordBreak: 'keep-all' }}>
              {title}
            </h2>
            {body && (
              <p className="body c-muted" style={{ margin: '1rem 0 0', maxWidth: '640px', wordBreak: 'keep-all' }}>
                {body}
              </p>
            )}
          </div>

          {hint && (
            <p className="body c-muted ps-hint" style={{ margin: 0, wordBreak: 'keep-all' }}>
              <CornerLeftDown size={24} strokeWidth={2.25} aria-hidden="true" style={{ flexShrink: 0, color: 'var(--accent)' }} />
              {hint}
            </p>
          )}
        </Reveal>

        {/* 이미지 자리 (텍스트 아래 · 추후 교체) */}
        {children ? (
          <Reveal variant="up">{children}</Reveal>
        ) : carousel ? (
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
            {(() => {
              const box = (
                <div className={imageHref ? 'ps-photo ps-photo-link' : 'ps-photo'} style={{ aspectRatio: photoAspect }}>
                  <Image src={image} alt={imageAlt} fill sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectFit: photoFit }} />
                </div>
              )
              if (!imageHref) return box
              // 외부 사이트는 새 창으로 연다
              return /^https?:\/\//.test(imageHref) ? (
                <a href={imageHref} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                  {box}
                </a>
              ) : (
                <Link href={imageHref} style={{ display: 'block' }}>
                  {box}
                </Link>
              )
            })()}
          </Reveal>
        ) : (
          <Reveal variant="up">
            <ImageBox aspectRatio="16 / 9" />
          </Reveal>
        )}
      </div>

      <style>{`
        .ps-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .ps-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
          white-space: nowrap;
          padding-bottom: 0.35rem;
        }
        .ps-photo {
          position: relative;
          width: 100%;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          border: 1px solid var(--border);
          background: #e6eaf1;
        }
        .ps-photo-link {
          transition: border-color 0.2s, transform 0.3s, box-shadow 0.3s;
        }
        .ps-photo-link:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 14px 34px rgba(11, 18, 32, 0.14);
        }
        @media (max-width: 768px) {
          .ps-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.9rem;
          }
          .ps-hint {
            padding-bottom: 0;
            white-space: normal;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
