import Reveal from '@/components/Reveal'
import SplitText from '@/components/SplitText'

export default function ServiceSwitch() {
  return (
    <section
      style={{
        background: '#fff',
        padding: 'clamp(4rem, 9vw, 7rem) 1.25rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <Reveal variant="up">
          <p className="footnote emphasized c-accent" style={{ margin: '0 0 0.85rem' }}>여기서 하나 더</p>
        </Reveal>
        <SplitText
          as="h2"
          className="title-1 svc-switch-title"
          style={{ margin: 0, wordBreak: 'keep-all', lineHeight: 1.4 }}
          step={0.024}
          segments={[
            { text: '타 서비스에서 전환하신다면?\n' },
            { text: '추가혜택', className: 'c-accent emphasized' },
            { text: '까지 받아가세요!' },
          ]}
        />

        {/* 가로 박스 2개 */}
        <Reveal as="div" stagger className="svc-switch-boxes">
          {['텍스트1', '텍스트2'].map((t) => (
            <div key={t} className="svc-switch-box">
              <p className="headline" style={{ margin: 0, wordBreak: 'keep-all' }}>{t}</p>
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .svc-switch-title {
          font-size: clamp(2.2rem, 5.5vw, 3.5rem);
        }
        .svc-switch-boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
          margin-top: clamp(2rem, 4vw, 3rem);
        }
        .svc-switch-box {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: clamp(1.75rem, 4vw, 2.5rem) 1.5rem;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .svc-switch-box:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        @media (max-width: 560px) {
          .svc-switch-boxes { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
