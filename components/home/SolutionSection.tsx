// 솔루션 섹션 — 헤더 → 신뢰 통계 밴드 → 실시간 문의 → 강점 6종.
// 강조 두 개(100% 맞춤 제작 · 무료 홈페이지 상담)는 파란 카드로, 모바일에서는 첫 줄에 온다.
import {
  Code2,
  Palette,
  Ruler,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from 'lucide-react'
import Reveal from '@/components/Reveal'
import CountUp from '@/components/CountUp'
import LiveInquiries from './LiveInquiries'
import { STRENGTH, TRUST, type StrengthIconName } from '@/data/solution'

// 모바일에서 색 부각 칸을 앞으로 끌어올린 시각 순서 (배열 순서는 PC 배치 그대로 둔다)
const MOBILE_SEQ = TRUST.map((_, i) => i).sort(
  (a, b) => Number(!!TRUST[b].highlight) - Number(!!TRUST[a].highlight),
)

const ICONS: Record<StrengthIconName, typeof Ruler> = {
  ruler: Ruler,
  userCheck: UserRoundCheck,
  code: Code2,
  palette: Palette,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
}

export default function SolutionSection() {
  return (
    <section id="solution" style={{ background: 'var(--section-a)', padding: 'clamp(2.25rem, 4.5vw, 3.75rem) 0' }}>
      {/* 섹션 헤더 */}
      <div style={{ padding: '0 clamp(1.25rem, 4vw, 3rem)' }}>
        <Reveal variant="up" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span
            className="caption-1 emphasized"
            style={{ color: 'var(--accent)', letterSpacing: '0.16em' }}
          >
            {STRENGTH.eyebrow}
          </span>
          <p
            className="callout semibold"
            style={{ margin: '0.9rem 0 0', color: 'var(--text-secondary)' }}
          >
            {STRENGTH.intro}
          </p>
          <h2 className="solution-heading">
            믿을 수 있는 전문가가 직접
            <br className="br-mobile" /> 기획·디자인·제작합니다
          </h2>
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              width: '48px',
              height: '1px',
              margin: '1.5rem auto 0',
              background: 'var(--accent)',
            }}
          />
        </Reveal>
      </div>

      {/* 신뢰 통계 밴드 — 화면 끝까지 이어지는 면 */}
      <Reveal
        variant="up"
        delay={0.1}
        style={{
          marginTop: 'clamp(2rem, 4vw, 3rem)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--section-b)',
        }}
      >
        <ul className="trust-grid">
          {TRUST.map((t, i) => {
            // 모바일(2열 3행) 시각 순서 — 색 부각 칸이 첫 줄로 온다 (CSS order 와 같은 규칙).
            // 구분선은 시각 위치 기준이라 order 로 섞인 뒤의 자리를 미리 계산해 클래스를 단다.
            const mpos = MOBILE_SEQ.indexOf(i)
            return (
            <li key={t.label} className={`trust-cell${t.highlight ? ' trust-cell--hl' : ''}${mpos < 4 ? ' trust-cell--mtop' : ''}${mpos % 2 === 1 ? ' trust-cell--mleft' : ''}`}>
              <span className="trust-num">
                {/* 숫자 + animate 일 때만 카운트업, 'N' 이나 정적 값은 그대로 */}
                {t.animate && typeof t.end === 'number' ? (
                  <CountUp end={t.end} suffix={t.suffix} format={t.format} />
                ) : (
                  <>
                    {typeof t.end === 'number' && t.format
                      ? t.end.toLocaleString('ko-KR')
                      : t.end}
                    {t.suffix}
                  </>
                )}
              </span>
              <span className="trust-label">{t.label}</span>
            </li>
            )
          })}
        </ul>
      </Reveal>

      {/* 실시간 문의 보드 */}
      <Reveal
        variant="up"
        delay={0.15}
        style={{ margin: 'clamp(1.5rem, 3vw, 2rem) auto 0', padding: '0 clamp(1rem, 4vw, 3rem)' }}
      >
        <LiveInquiries />
      </Reveal>

      {/* 강점 6종 */}
      <div style={{ padding: '0 clamp(1rem, 4vw, 3rem)' }}>
        <Reveal as="ul" stagger className="strength-grid">
          {STRENGTH.items.map((item) => {
            const Icon = ICONS[item.icon]
            const hl = !!item.highlight
            return (
              <li key={item.title} className={`strength-item${hl ? ' strength-item--hl' : ''}`}>
                <div className={`strength-card${hl ? ' strength-card--hl' : ''}`}>
                  <span className="strength-icon">
                    <Icon size={44} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <h3 className="strength-title">{item.title}</h3>
                  <p className="strength-desc">{item.desc}</p>
                </div>
              </li>
            )
          })}
        </Reveal>
      </div>

      <style>{`
        .solution-heading {
          margin: 0.7rem 0 0;
          font-size: clamp(1.5rem, 4.2vw, 2.6rem);
          font-weight: 700;
          line-height: 1.4;
          color: var(--text);
          word-break: keep-all;
        }

        /* 통계 밴드 — 모바일 2열 3행, PC 6열 한 줄 */
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          list-style: none;
        }
        .trust-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vw, 2.25rem) 0.5rem;
          text-align: center;
        }
        /* 모바일 구분선 — 1·2번째 줄 아래, 2열 왼쪽 */
        .trust-cell--mtop { border-bottom: 1px solid var(--border-subtle); }
        .trust-cell--mleft { border-left: 1px solid var(--border-subtle); }
        /* 색 부각 칸 — 강점 카드와 같은 파란 면, 모바일에서는 첫 줄로 */
        .trust-cell--hl { order: -1; background: var(--accent-strong); }
        .trust-cell--hl .trust-num { color: #fff; }
        .trust-cell--hl .trust-label { color: rgba(255,255,255,0.8); }
        .trust-num {
          font-size: clamp(1.75rem, 4.5vw, 2.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--accent);
        }
        .trust-label {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          word-break: keep-all;
        }

        /* 강점 그리드 — 모바일 2열 / 태블릿 3열 / PC 6열 */
        .strength-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          max-width: 1200px;
          margin: clamp(2.5rem, 5vw, 4rem) auto 0;
          padding: 0;
          list-style: none;
        }
        .strength-item { height: 100%; }
        /* 모바일·태블릿: 강조 두 칸을 맨 윗줄로 끌어올린다 (PC 에서는 아래에서 되돌림) */
        .strength-item--hl { order: -1; }
        .strength-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          padding: clamp(1.5rem, 3vw, 2rem) 0.75rem;
          text-align: center;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          background: var(--surface);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .strength-card--hl {
          border-color: transparent;
          background: var(--accent-strong);
          box-shadow: 0 8px 24px rgba(27, 78, 167, 0.28);
        }
        .strength-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.45); }
        .strength-icon {
          display: inline-flex;
          margin-bottom: 1.1rem;
          color: var(--accent);
          transition: transform 0.3s;
        }
        .strength-card--hl .strength-icon { color: #fff; }
        .strength-card:hover .strength-icon { transform: scale(1.1); }
        .strength-title {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          word-break: keep-all;
        }
        .strength-card--hl .strength-title { color: #fff; }
        .strength-desc {
          margin: 0.5rem 0 0;
          font-size: 0.8rem;
          line-height: 1.6;
          white-space: pre-line;
          color: var(--text-muted);
          word-break: keep-all;
        }
        .strength-card--hl .strength-desc { color: rgba(255,255,255,0.78); }

        @media (min-width: 641px) {
          .strength-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
        @media (min-width: 1025px) {
          .trust-grid { grid-template-columns: repeat(6, 1fr); max-width: 1320px; }
          .trust-cell--mtop { border-bottom: none; }
          .trust-cell--mleft { border-left: none; }
          .trust-cell + .trust-cell { border-left: 1px solid var(--border-subtle); }
          /* PC: 배열 순서 그대로 — 색 부각 두 칸이 3·4번째(가운데)에 온다 */
          .trust-cell--hl { order: 0; }
          /* 6열은 카드가 좁아진다 — 그리드 폭을 넓히고 간격을 줄여 카드 가로를 키운다.
             (통계 밴드도 같은 1320px 를 써서 좌우 선이 맞는다) */
          .strength-grid { grid-template-columns: repeat(6, 1fr); gap: 0.65rem; max-width: 1320px; }
          /* PC: order 를 되돌려 배열 순서대로 놓으면 강조 두 칸이 3·4번째(가운데)에 온다 */
          .strength-item--hl { order: 0; }
          /* PC 는 6열이라 카드가 작아 보인다 — 여백·아이콘·글씨를 한 단계씩 키운다 */
          .strength-card { padding: 2.5rem 1rem; }
          .strength-icon { margin-bottom: 1.4rem; }
          .strength-icon svg { width: 54px; height: 54px; }
          .strength-title { font-size: 1.05rem; }
          .strength-desc { margin-top: 0.65rem; font-size: 0.875rem; }
        }
      `}</style>
    </section>
  )
}
