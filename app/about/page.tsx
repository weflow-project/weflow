import type { Metadata } from 'next'
import Link from 'next/link'
import { PencilRuler, Workflow, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: '회사소개 · WEFLOW',
  description: '사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는 회사, WEFLOW.',
}

const VALUES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: PencilRuler, title: '직접 기획·설계', desc: '템플릿이 아니라, 사람이 목표부터 구조까지 전략을 세웁니다.' },
  { Icon: Workflow, title: '맞춤형 플로우', desc: '업종과 고객 흐름에 맞춰 문의로 이어지는 동선을 설계합니다.' },
  { Icon: Wrench, title: '지속 가능한 운영', desc: '제작 이후에도 광고 연동·유지보수·운영까지 함께합니다.' },
]

const INFO: { label: string; value: string }[] = [
  { label: '상호', value: 'WEFLOW (위플로우)' },
  { label: '대표', value: '신서준' },
  { label: '사업자등록번호', value: '884-07-03480' },
  { label: '이메일', value: 'contact@weflowlab.kr' },
  { label: '운영시간', value: '연중무휴 24시간 상담 가능' },
]

export default function AboutPage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* 인트로 */}
      <section style={{ padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
          <span className="footnote emphasized c-accent">회사소개</span>
          <h1 className="title-1" style={{ margin: '0.9rem 0 0', wordBreak: 'keep-all' }}>
            사람이 움직이면, <span className="c-accent">기술은 따라온다</span>
          </h1>
          <p className="callout c-muted" style={{ margin: '0.75rem 0 0', letterSpacing: '0.01em' }}>
            People move. Technology follows.
          </p>
          <p className="body c-secondary" style={{ margin: '1.5rem 0 0', maxWidth: '640px', wordBreak: 'keep-all' }}>
            WEFLOW는 사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는 회사입니다.
            단순히 개발만 하는 회사가 아니라, 기술은 뒤에서 받쳐주고 사람은 앞에서 빛나게 하는 흐름을 만듭니다.
          </p>
        </div>
      </section>

      {/* WE · FLOW 의미 */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <h2 className="title-2 emphasized" style={{ margin: '0 0 clamp(1.5rem, 4vw, 2.25rem)', wordBreak: 'keep-all' }}>
            이름에 담은 의미
          </h2>
          <div className="about-grid-2">
            <div style={{ background: '#f4f6fa', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              <p className="large-title c-accent" style={{ margin: '0 0 0.75rem', lineHeight: 1 }}>WE</p>
              <p className="headline" style={{ margin: 0, wordBreak: 'keep-all' }}>우리 · 사람 · 관계 · 함께하는 가치</p>
            </div>
            <div style={{ background: '#f4f6fa', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              <p className="large-title c-accent" style={{ margin: '0 0 0.75rem', lineHeight: 1 }}>FLOW</p>
              <p className="headline" style={{ margin: 0, wordBreak: 'keep-all' }}>흐름 · 성장 · 연결 · 앞으로 나아가는 움직임</p>
            </div>
          </div>
        </div>
      </section>

      {/* 철학 문장 */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) 1.25rem', background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2 className="title-1" style={{ margin: 0, wordBreak: 'keep-all', lineHeight: 1.4 }}>
            기술은 <span className="c-accent emphasized">뒤에서 받쳐주고</span>,
            <br />
            사람은 <span className="c-accent emphasized">앞에서 빛나게</span> 하는 흐름
          </h2>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section style={{ padding: 'clamp(3rem, 7vw, 5rem) 1.25rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
          <span className="footnote emphasized c-accent">우리의 시작</span>
          <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <p className="body c-secondary" style={{ margin: 0, wordBreak: 'keep-all', fontSize: '1.0625rem', lineHeight: 1.8 }}>
              처음엔 돈도, 스펙도, 대단한 기술도 없었습니다.
            </p>
            <p className="body c-secondary" style={{ margin: 0, wordBreak: 'keep-all', fontSize: '1.0625rem', lineHeight: 1.8 }}>
              하지만 사람과 관계, 그리고 좋은 흐름은 결국 큰 결과를 만든다고 믿었습니다.
            </p>
            <p className="body c-secondary" style={{ margin: 0, wordBreak: 'keep-all', fontSize: '1.0625rem', lineHeight: 1.8 }}>
              우리는 혼자 성공하는 회사보다, 함께 흘러가며 성장하는 회사를 만들고 싶었습니다.
            </p>
            <p className="title-3 emphasized" style={{ margin: '0.5rem 0 0', wordBreak: 'keep-all' }}>
              그래서 이름은 <span className="c-accent">WEFLOW</span>입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 일하는 방식 */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <h2 className="title-2 emphasized" style={{ margin: '0 0 clamp(1.5rem, 4vw, 2.25rem)', wordBreak: 'keep-all' }}>
            위플로우가 일하는 방식
          </h2>
          <div className="about-grid-3">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '1.75rem 1.6rem' }}>
                <span
                  style={{
                    width: '46px', height: '46px', borderRadius: 'var(--radius-xl)',
                    background: 'var(--accent-light)', color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem',
                  }}
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="headline" style={{ margin: '0 0 0.4rem', wordBreak: 'keep-all' }}>{title}</h3>
                <p className="callout" style={{ margin: 0, wordBreak: 'keep-all' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 회사 정보 */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
          <h2 className="title-2 emphasized" style={{ margin: '0 0 1.5rem' }}>회사 정보</h2>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
            {INFO.map(({ label, value }, i) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem 1.4rem',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <span className="subhead emphasized c-primary" style={{ flex: '0 0 140px' }}>{label}</span>
                <span className="callout">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(3.5rem, 7vw, 5.5rem) 1.25rem', background: 'var(--accent-dim)', textAlign: 'center' }}>
        <p className="title-2 emphasized" style={{ margin: 0, color: '#fff', wordBreak: 'keep-all' }}>
          Flow Together, Grow Beyond.
        </p>
        <p className="callout" style={{ margin: '0.6rem 0 1.75rem', color: '#9dbff6' }}>
          함께 흐르고, 더 크게 성장하다
        </p>
        <Link href="/diagnosis" className="btn-white" style={{ fontSize: '1rem' }}>
          무료진단 신청하기
        </Link>
      </section>

      <style>{`
        .about-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .about-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        @media (max-width: 768px) {
          .about-grid-2, .about-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
