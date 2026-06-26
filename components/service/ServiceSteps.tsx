import Image from 'next/image'
import { MessageSquare, FileText, Palette, Code2, Monitor, Share2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { steps } from '@/data/service'

const STEP_ICONS: LucideIcon[] = [MessageSquare, FileText, Palette, Code2, Monitor, Share2]

export default function ServiceSteps() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="footnote emphasized c-accent">6-STEP PROCESS</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', wordBreak: 'keep-all' }}>제작 진행과정</h2>
        </div>

        {/* 세로 타임라인 */}
        <div className="pt-timeline">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? MessageSquare
            const isLast = i === steps.length - 1
            return (
              <div key={s.num} className="pt-row">
                {/* 좌: 번호 + 커넥터 */}
                <div className="pt-rail">
                  <div className="pt-num">
                    <Icon size={18} color="#fff" strokeWidth={2} />
                  </div>
                  {!isLast && <div className="pt-line" />}
                </div>

                {/* 우: 내용 */}
                <div className="pt-content">
                  <p className="footnote emphasized c-accent" style={{ margin: '0 0 0.3rem', letterSpacing: '0.06em' }}>STEP {s.num}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <h3 className="title-3 emphasized" style={{ margin: 0, wordBreak: 'keep-all' }}>{s.title}</h3>
                    <span
                      className="caption-1 emphasized c-accent"
                      style={{ background: 'var(--accent-light)', padding: '2px 10px', borderRadius: '9999px' }}
                    >
                      {s.desc}
                    </span>
                  </div>
                  <p className="callout" style={{ margin: 0, wordBreak: 'keep-all' }}>{s.detail}</p>

                  {/* 이미지 */}
                  <div className="pt-img">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 880px) 100vw, 640px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .pt-timeline { display: flex; flex-direction: column; }
        .pt-row { display: grid; grid-template-columns: 44px 1fr; gap: 1.25rem; }
        .pt-rail { display: flex; flex-direction: column; align-items: center; }
        .pt-num {
          width: 44px; height: 44px; border-radius: 9999px;
          background: var(--accent); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .pt-line { width: 2px; flex: 1; min-height: 28px; background: var(--border); margin: 6px 0; }
        .pt-content { padding-bottom: clamp(2rem, 5vw, 3rem); min-width: 0; }
        .pt-img {
          position: relative;
          margin-top: 1.1rem;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        @media (max-width: 520px) {
          .pt-row { grid-template-columns: 36px 1fr; gap: 0.85rem; }
          .pt-num { width: 36px; height: 36px; }
        }
      `}</style>
    </section>
  )
}
