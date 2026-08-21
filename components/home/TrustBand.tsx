// 히어로 바로 아래 신뢰 밴드 — 좌우 월계수 장식 + 경력·누적 제작 강조 한 줄.
import { CAREER_YEARS, TOTAL_PROJECTS } from '@/data/solution'

// 월계수 잎 금장 — 사이트 파랑 대신 이 장식에만 쓰는 포인트 골드.
const GOLD = '#b8976b'

// 스타일라이즈드 월계수 가지 (줄기 + 잎). flip 으로 좌우 대칭.
const LEAVES: [number, number, number][] = [
  [11, 66, -40], [24, 60, 30], [9, 52, -45], [22, 45, 25],
  [8, 37, -50], [21, 30, 20], [9, 22, -55], [19, 15, 15], [13, 8, -60],
]

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 80"
      aria-hidden="true"
      className="laurel"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M26 76 C13 62 9 42 14 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {LEAVES.map(([x, y, a]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="6"
          ry="2.4"
          fill="currentColor"
          transform={`rotate(${a} ${x} ${y})`}
        />
      ))}
    </svg>
  )
}

export default function TrustBand() {
  return (
    <section
      aria-label="WEFLOW 신뢰 지표"
      style={{
        background: 'var(--section-b)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="trustband-inner">
        <span className="laurel-wrap" style={{ color: GOLD }}>
          <Laurel />
        </span>

        <div style={{ minWidth: 0 }}>
          <p
            className="caption-1"
            style={{
              margin: 0,
              color: 'var(--accent)',
              letterSpacing: '0.14em',
            }}
          >
            수많은 고객이 선택한 WEFLOW_위플로우
          </p>
          <p className="trustband-headline">
            {CAREER_YEARS}년차 홈페이지 제작 ·{' '}
            <br className="br-mobile" />
            누적 제작 {TOTAL_PROJECTS}건 이상
          </p>
          <p
            className="body"
            style={{ margin: '0.75rem 0 0', color: 'var(--text-secondary)' }}
          >
            고객의 브랜드를 가장 효과적으로 완성합니다
          </p>
        </div>

        <span className="laurel-wrap" style={{ color: GOLD }}>
          <Laurel flip />
        </span>
      </div>

      <style>{`
        .trustband-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.75rem, 3vw, 2rem);
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(1.5rem, 4vw, 2.5rem) 1.25rem;
          text-align: center;
        }
        .laurel-wrap { flex-shrink: 0; display: block; }
        .laurel {
          display: block;
          width: clamp(1.6rem, 4vw, 2.5rem);
          height: clamp(4.5rem, 11vw, 7rem);
        }
        .trustband-headline {
          margin: 0.7rem 0 0;
          font-size: clamp(1.15rem, 3.6vw, 1.9rem);
          font-weight: 700;
          line-height: 1.4;
          color: var(--text);
          word-break: keep-all;
        }
      `}</style>
    </section>
  )
}
