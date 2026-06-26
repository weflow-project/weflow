import Link from 'next/link'

export default function ComparisonCTA() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(2rem, 5vw, 3.5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div
          className="cmp-banner"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            background: 'linear-gradient(100deg, #5b8fe6 0%, #a9dcf2 100%)',
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1.75rem, 5vw, 3.5rem)',
            minHeight: '220px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* 텍스트 */}
          <div className="cmp-text" style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="title-2 emphasized" style={{ color: '#15336b', margin: 0, wordBreak: 'keep-all' }}>
              혹시, 타사와 고민 중이신가요?
            </h2>
            <p className="callout" style={{ color: 'rgba(21,51,107,0.78)', margin: '0.6rem 0 1.4rem', wordBreak: 'keep-all' }}>
              기능부터 가격까지 볼 수 있는 비교자료를 한 눈에 확인해보세요.
            </p>
            <Link
              href="/pricing"
              className="subhead emphasized"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#fff',
                color: 'var(--accent)',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(21,51,107,0.18)',
              }}
            >
              비교자료 보러가기
            </Link>
          </div>

          {/* 캐릭터 이미지 자리 (추후 교체) */}
          <div className="cmp-char">
            <span className="footnote" style={{ color: 'rgba(21,51,107,0.55)' }}>캐릭터 이미지</span>
          </div>
        </div>
      </div>

      <style>{`
        .cmp-text { max-width: 60%; }
        .cmp-char {
          position: absolute;
          right: clamp(1rem, 4vw, 3rem);
          bottom: 0;
          width: clamp(160px, 22vw, 240px);
          height: 90%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 0.5rem;
        }
        @media (max-width: 768px) {
          .cmp-text { max-width: 100%; }
          .cmp-char { display: none; }
        }
      `}</style>
    </section>
  )
}
