'use client'
import { useEffect, useRef, useState } from 'react'
import { processSections, sixSteps } from '@/data/home'

// 타임라인 한 칸 — 왼쪽에 번호 원 + 아래로 이어지는 연결선, 오른쪽에 제목·설명.
// 마지막 칸(isLast)은 연결선을 그리지 않아 선이 허공에 뜨지 않는다.
// delay 만큼 늦게 떠서 위에서부터 순차적으로 나타난다.
function TimelineStep({
  num,
  title,
  desc,
  isLast,
  active,
  delay,
}: {
  num: string
  title: string
  desc?: string
  isLast: boolean
  active: boolean
  delay: number
}) {
  return (
    <div style={{
      display: 'flex', gap: '0.85rem',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(10px)',
      transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
    }}>
      {/* 왼쪽: 번호 + 커넥터 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }} className="caption-2 emphasized">{num}</div>
        {!isLast && (
          <div style={{ width: '2px', flex: 1, minHeight: '20px', background: '#e5e7eb', margin: '4px 0' }} />
        )}
      </div>
      {/* 오른쪽: 텍스트 */}
      <div style={{ paddingTop: '0.3rem', paddingBottom: isLast ? 0 : '1.1rem', minWidth: 0 }}>
        <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.15rem', wordBreak: 'keep-all' }}>{title}</p>
        {desc && <p className="caption-1" style={{ margin: 0, wordBreak: 'keep-all' }}>{desc}</p>}
      </div>
    </div>
  )
}

// 카드 하나 — 상단 헤더(라벨 배지 + 제목) 아래로 TimelineStep 을 쭉 세운다.
// baseDelay 는 이 카드의 첫 칸이 뜨는 시점 (카드끼리 시차를 두는 용도)
function ProcessCard({
  label,
  title,
  steps,
  active,
  baseDelay,
}: {
  label: string
  title: string
  steps: { num: string; title: string; desc?: string }[]
  active: boolean
  baseDelay: number
}) {
  return (
    <div style={{
      background: '#fff', border: '1.5px solid var(--border)',
      borderRadius: '14px', overflow: 'hidden',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(14px)',
      transition: 'opacity 0.45s ease, transform 0.45s ease',
    }}>
      {/* 헤더 */}
      <div style={{
        padding: '0.9rem 1.25rem',
        borderBottom: '1.5px solid var(--border)',
        background: '#f9fafb',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
      }}>
        <div className="caption-2 emphasized" style={{
          background: 'var(--accent)', borderRadius: '6px',
          padding: '0.2rem 0.55rem', color: '#fff',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{label}</div>
        <p className="callout emphasized c-primary" style={{ margin: 0 }}>{title}</p>
      </div>
      {/* 타임라인 */}
      <div style={{ padding: '1.25rem 1.25rem 1rem' }}>
        {steps.map((s, i) => (
          <TimelineStep
            key={i}
            num={s.num}
            title={s.title}
            desc={s.desc}
            isLast={i === steps.length - 1}
            active={active}
            delay={baseDelay + i * 0.07}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * "제작 진행 과정" 섹션 — 4단계(왼쪽)와 6단계(오른쪽) 카드를 나란히 놓고
 * 스크롤이 닿으면 각 단계가 순서대로 떠오르게 한다.
 * 단계 내용은 data/home.ts 의 processSections · sixSteps 에서 가져온다.
 *
 * 주의: 현재 app/page.tsx 에 붙어 있지 않아 화면에 나오지 않는다.
 */
export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // 등장 애니메이션 스위치 — 한 번 켜지면 다시 끄지 않는다
  const [active, setActive] = useState(false)

  // 섹션이 15% 보이면 애니메이션을 켜고 관찰을 끊는다 (재진입해도 다시 재생하지 않음)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // processSections 에는 번호가 없어서 배열 순서로 01, 02 … 를 붙인다
  const process4 = processSections.map((p, i) => ({
    num: String(i + 1).padStart(2, '0'),
    title: p.step,
    desc: p.desc,
  }))
  const process6 = sixSteps.map(s => ({ num: s.num, title: s.title, desc: s.desc }))

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(2rem, 4vw, 3.5rem) 1.25rem', background: '#f9fafb',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        <div className="reveal" style={{ marginBottom: '1.5rem' }}>
          <p className="caption-1 emphasized c-accent" style={{
            letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.4rem',
          }}>HOW WE WORK</p>
          <h2 className="title-1" style={{ marginBottom: '0.3rem' }}>제작 진행 과정</h2>
          <p className="callout c-muted" style={{ marginTop: '0.4rem' }}>상담부터 운영까지, 모든 단계를 체계적으로 진행합니다</p>
        </div>

        <div className="proc-two-col">
          <ProcessCard
            label="PROCESS"
            title="제작 진행 과정"
            steps={process4}
            active={active}
            baseDelay={0.05}
          />
          <ProcessCard
            label="6-STEP"
            title="6단계 제작 프로세스"
            steps={process6}
            active={active}
            baseDelay={0.15}
          />
        </div>
      </div>

      <style>{`
        .proc-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .proc-two-col {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
        }
      `}</style>
    </section>
  )
}
