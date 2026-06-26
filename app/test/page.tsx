import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'WEFLOW · 디자인 시스템 테스트' }

/* ── 타이포그래피 스케일 (Apple HIG 네임) ── */
const TYPE_SCALE: { cls: string; name: string; size: string; weight: string; leading: string; sample: string; wOverride?: number }[] = [
  { cls: 'large-title', name: 'Large Title', size: 'clamp(2.25 → 3.25rem)', weight: '700', leading: '1.1', sample: '내가 진짜 원하는 페이지, 위플로우' },
  { cls: 'title-1', name: 'Title 1', size: 'clamp(1.75 → 2.25rem)', weight: '700', leading: '1.18', sample: '섹션 최상위 제목입니다' },
  { cls: 'title-1', name: 'Title 1 (Regular)', size: 'clamp(1.75 → 2.25rem)', weight: '400', leading: '1.18', sample: '섹션 최상위 제목입니다', wOverride: 400 },
  { cls: 'title-2', name: 'Title 2', size: 'clamp(1.35 → 1.5rem)', weight: '600', leading: '1.25', sample: '대형 카드 헤드라인' },
  { cls: 'title-3', name: 'Title 3', size: '1.25rem', weight: '600', leading: '1.3', sample: '소제목 / 가격 표시' },
  { cls: 'headline', name: 'Headline', size: '1.0625rem', weight: '600', leading: '1.4', sample: '카드 제목 · 강조 라벨' },
  { cls: 'body', name: 'Body', size: '1rem', weight: '400', leading: '1.6', sample: '본문 기본 텍스트입니다. 가독성을 우선합니다.' },
  { cls: 'callout', name: 'Callout', size: '0.9375rem', weight: '400', leading: '1.55', sample: '설명 본문 · 카드 디스크립션' },
  { cls: 'subhead', name: 'Subhead', size: '0.875rem', weight: '500', leading: '1.5', sample: '보조 라벨 / 폼 라벨' },
  { cls: 'footnote', name: 'Footnote', size: '0.8125rem', weight: '400', leading: '1.45', sample: '작은 설명 · 링크 텍스트' },
  { cls: 'caption-1', name: 'Caption 1', size: '0.75rem', weight: '500', leading: '1.35', sample: '캡션 · 태그 · 메타정보' },
  { cls: 'caption-2', name: 'Caption 2', size: '0.6875rem', weight: '500', leading: '1.3', sample: '최소 라벨 · 배지' },
]

const WEIGHTS = [
  { cls: 'emphasized', name: 'emphasized', value: '700' },
  { cls: 'semibold', name: 'semibold', value: '600' },
  { cls: 'medium', name: 'medium', value: '500' },
]

const COLORS = [
  { token: '--bg', label: '배경', value: '#ffffff' },
  { token: '--bg-secondary', label: 'Surface', value: '#f7f9fc' },
  { token: '--surface-container', label: 'Surface Container', value: '#eef2f8' },
  { token: '--text', label: 'Text Primary', value: '#0b1220' },
  { token: '--text-secondary', label: 'Text Secondary', value: '#3d4759' },
  { token: '--text-muted', label: 'Text Muted', value: '#8a94a6' },
  { token: '--border', label: 'Border', value: '#eceff3' },
  { token: '--accent', label: 'Primary', value: '#3373df' },
  { token: '--accent-light', label: 'Primary Light', value: '#ebf2ff' },
  { token: '--accent-dim', label: 'Secondary (Navy)', value: '#1b2a4a' },
  { token: '--accent-hover', label: 'Primary Hover', value: '#2861c9' },
]

const RADII = [
  { token: '--radius-sm', value: '2px' },
  { token: '--radius', value: '4px' },
  { token: '--radius-md', value: '6px' },
  { token: '--radius-lg', value: '8px' },
  { token: '--radius-xl', value: '12px' },
  { token: '--radius-2xl', value: '16px' },
  { token: '--radius-full', value: '9999px' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <h2 className="title-2 emphasized" style={{ marginBottom: '0.35rem' }}>{title}</h2>
      <div style={{ height: 1, background: 'var(--border)', marginBottom: '1.75rem' }} />
      {children}
    </section>
  )
}

export default function DesignSystemTestPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', padding: 'clamp(2rem, 5vw, 4rem) 1.25rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="caption-1 emphasized c-accent" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>DESIGN SYSTEM</span>
          <h1 className="large-title" style={{ margin: '0.75rem 0 0.5rem' }}>WEFLOW 디자인 시스템</h1>
          <p className="body c-muted" style={{ margin: 0 }}>
            Apple HIG 텍스트 스타일 기반 타이포 스케일 · 컬러 토큰 · radius 전수 표시
          </p>
        </div>

        {/* ── 타이포그래피 ── */}
        <Section title="Typography">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {TYPE_SCALE.map(t => (
              <div key={t.cls} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.35rem', paddingBottom: '1.25rem', borderBottom: '1px dashed var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <code className="caption-1 c-accent" style={{ background: 'var(--accent-light)', padding: '2px 8px', borderRadius: 'var(--radius-md)' }}>.{t.cls}</code>
                  <span className="caption-1 c-muted">{t.name} · {t.size} · {t.weight} · LH {t.leading}</span>
                </div>
                <p className={t.cls} style={{ margin: 0, ...(t.wOverride ? { fontWeight: t.wOverride } : {}) }}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 웨이트 변형 ── */}
        <Section title="Weight Variants">
          <p className="callout c-muted" style={{ margin: '0 0 1rem' }}>
            같은 스타일에서 웨이트만 조정 (예: <code>title-3</code> 기준)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <code className="caption-1 c-accent" style={{ background: 'var(--accent-light)', padding: '2px 8px', borderRadius: 'var(--radius-md)' }}>기본 (400)</code>
              <span className="title-3" style={{ fontWeight: 400 }}>위플로우 디자인 시스템</span>
            </div>
            {WEIGHTS.map(w => (
              <div key={w.cls} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <code className="caption-1 c-accent" style={{ background: 'var(--accent-light)', padding: '2px 8px', borderRadius: 'var(--radius-md)' }}>.{w.cls} ({w.value})</code>
                <span className={`title-3 ${w.cls}`}>위플로우 디자인 시스템</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 컬러 토큰 ── */}
        <Section title="Color Tokens">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {COLORS.map(c => (
              <div key={c.token} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <div style={{ height: 64, background: `var(${c.token})`, borderBottom: '1px solid var(--border)' }} />
                <div style={{ padding: '0.6rem 0.75rem' }}>
                  <p className="footnote emphasized c-primary" style={{ margin: '0 0 0.15rem' }}>{c.label}</p>
                  <p className="caption-2 c-muted" style={{ margin: 0 }}>{c.token}</p>
                  <p className="caption-2 c-muted" style={{ margin: 0 }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 컬러 헬퍼 ── */}
        <Section title="Color Helpers">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p className="body c-primary" style={{ margin: 0 }}>.c-primary — 본문/제목 기본색</p>
            <p className="body c-secondary" style={{ margin: 0 }}>.c-secondary — 보조 본문</p>
            <p className="body c-muted" style={{ margin: 0 }}>.c-muted — 캡션/메타</p>
            <p className="body c-accent" style={{ margin: 0 }}>.c-accent — 강조/링크 (Primary)</p>
          </div>
        </Section>

        {/* ── Radius ── */}
        <Section title="Radius">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {RADII.map(r => (
              <div key={r.token} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: `var(${r.token})`, marginBottom: '0.5rem' }} />
                <p className="caption-2 c-muted" style={{ margin: 0 }}>{r.token}</p>
                <p className="caption-2 emphasized c-primary" style={{ margin: 0 }}>{r.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 버튼/배지 ── */}
        <Section title="Components">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
            <button className="btn-primary">btn-primary</button>
            <button className="btn-outline">btn-outline</button>
            <span className="tag-badge">tag-badge</span>
            <div className="card" style={{ width: 220 }}>
              <p className="headline" style={{ margin: '0 0 0.35rem' }}>.card</p>
              <p className="callout" style={{ margin: 0 }}>1px border · radius-2xl</p>
            </div>
          </div>
        </Section>
      </div>
    </main>
  )
}
