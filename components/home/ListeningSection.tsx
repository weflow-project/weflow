import { MessageCircle, PenLine, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const POINTS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: MessageCircle,
    title: '소통',
    desc: '제작 전 충분한 상담으로 고객이 진짜 원하는 것을 먼저 듣고 시작합니다.',
  },
  {
    Icon: PenLine,
    title: '맞춤형 워딩',
    desc: '업종과 브랜드 톤에 맞는 문구를 직접 설계해, 방문자에게 전달력 있게 다가갑니다.',
  },
  {
    Icon: Users,
    title: '2:1 맞춤 시스템',
    desc: '기획자·디자이너 2인이 고객 한 분을 전담하는 2:1 케어로 디테일까지 챙깁니다.',
  },
]

export default function ListeningSection() {
  return (
    <section
      style={{
        background: 'var(--bg-secondary)',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) 1.25rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 (좌측 정렬) */}
        <div style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          <span className="footnote emphasized c-accent">1줄소개</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left' }}>
            고객의 소리에 <span className="c-accent">귀 기울이는</span>위플로우
          </h2>
        </div>

        {/* 분할: 좌 이미지 · 우 3요소 */}
        <div className="listen-split">
          {/* 이미지 자리 (추후 교체) — 너비 확정 + 정사각형 */}
          <div
            className="listen-img"
            style={{
              aspectRatio: '1 / 1',
              borderRadius: 'var(--radius-2xl)',
              background: 'var(--surface-container)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="subhead c-muted">귀 디자인 이미지</span>
          </div>

          {/* 3요소 */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            {POINTS.map(({ Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: 'flex',
                  gap: '1.1rem',
                  alignItems: 'flex-start',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '1.5rem 1.6rem',
                }}
              >
                <span
                  style={{
                    width: '46px',
                    height: '46px',
                    flexShrink: 0,
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <div>
                  <h3 className="headline" style={{ margin: '0 0 0.35rem' }}>{title}</h3>
                  <p className="callout" style={{ margin: 0, wordBreak: 'keep-all' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .listen-split {
          display: flex;
          align-items: stretch;
          gap: clamp(1.5rem, 4vw, 3rem);
        }
        .listen-img {
          flex: 0 0 auto;
          width: clamp(260px, 30vw, 360px);
        }
        @media (max-width: 768px) {
          .listen-split { flex-direction: column; }
          .listen-img { width: 100%; max-width: 280px; }
        }
      `}</style>
    </section>
  )
}
