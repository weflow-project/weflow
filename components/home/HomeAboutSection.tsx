import Link from 'next/link'

const MEANING = [
  { key: 'WE', desc: '우리 · 사람 · 관계 · 함께하는 가치' },
  { key: 'FLOW', desc: '흐름 · 성장 · 연결 · 나아가는 움직임' },
]

export default function HomeAboutSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div className="about-split">
          {/* 좌: 소개 */}
          <div className="about-text">
            <span className="footnote emphasized c-accent">회사소개</span>
            <h2 className="title-1" style={{ margin: '0.75rem 0 0', wordBreak: 'keep-all' }}>
              사람이 움직이면, <span className="c-accent">기술은 따라온다</span>
            </h2>
            <p className="callout c-muted" style={{ margin: '0.6rem 0 0', letterSpacing: '0.01em' }}>
              People move. Technology follows.
            </p>
            <p className="body c-secondary" style={{ margin: '1.4rem 0 0', maxWidth: '440px', wordBreak: 'keep-all' }}>
              위플로우는 사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는 회사입니다.
              기술은 뒤에서 받쳐주고, 사람은 앞에서 빛나게 합니다.
            </p>
            <Link
              href="/about"
              className="subhead emphasized c-accent"
              style={{ display: 'inline-block', marginTop: '1.6rem', textDecoration: 'none' }}
            >
              회사소개 자세히 보기 ›
            </Link>
          </div>

          {/* 우: WE · FLOW 의미 */}
          <div className="about-meaning">
            {MEANING.map(({ key, desc }) => (
              <div
                key={key}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                }}
              >
                <p className="large-title c-accent" style={{ margin: '0 0 0.5rem', lineHeight: 1 }}>{key}</p>
                <p className="headline" style={{ margin: 0, wordBreak: 'keep-all' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-split {
          display: flex;
          align-items: center;
          gap: clamp(1.75rem, 5vw, 4rem);
        }
        .about-text { flex: 1.1; min-width: 0; }
        .about-meaning { flex: 0.9; min-width: 0; display: flex; flex-direction: column; gap: 1.1rem; }
        @media (max-width: 768px) {
          .about-split { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </section>
  )
}
