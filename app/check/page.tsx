'use client'
import { useEffect, useRef, useState } from 'react'
import {
  Gauge, Search, Smartphone, MessageCircle,
  Lock, ArrowRight, Phone, Globe, RotateCcw, Check,
} from 'lucide-react'
import Reveal from '@/components/Reveal'

/**
 * 자동 진단 도구 — 방문자가 자기 사이트 주소를 넣으면
 * /api/diagnose 가 분석한 결과를 보여 준다.
 *
 * 결과 일부(로딩 속도)는 바로 보여 주고, 나머지 상세는
 * 연락처를 남기면 그 자리에서 열린다. 자기 사이트 주소를 넣은 방문자는
 * 관심이 확실한 리드라서, 이 흐름 자체가 문의 수집 장치다.
 */

interface CheckItem {
  label: string
  status: 'good' | 'warn' | 'bad'
  value: string
  advice: string
}
interface Category {
  score: number
  items: CheckItem[]
}
interface Result {
  finalUrl: string
  overall: number
  categories: { speed: Category; seo: Category; mobile: Category; contact: Category }
}

const CATEGORY_META = [
  { key: 'speed', label: '로딩 속도', Icon: Gauge },
  { key: 'seo', label: '검색엔진 노출', Icon: Search },
  { key: 'mobile', label: '모바일 대응', Icon: Smartphone },
  { key: 'contact', label: '문의 동선', Icon: MessageCircle },
] as const

const LOADING_STEPS = ['사이트 접속 확인', '응답 속도 측정', '페이지 구조 분석', '리포트 작성']

/** 점수대별 색 — 관리자 페이지의 상태 배지와 같은 계열을 쓴다 */
function scoreColor(n: number) {
  if (n >= 80) return 'var(--success-text)'
  if (n >= 60) return '#eab308'
  return 'var(--danger-text)'
}
function gradeWord(n: number) {
  if (n === 100) return '완벽하게 관리되고 있어요'
  if (n >= 90) return '흠잡을 데가 거의 없어요'
  if (n >= 80) return '전반적으로 잘 갖춰져 있어요'
  if (n >= 60) return '개선할 부분이 보여요'
  if (n >= 40) return '손봐야 할 곳이 많아요'
  return '지금 바로 개선이 필요해요'
}

/** 숫자만 남겨 11자리로 자르고 010-0000-0000 꼴로 하이픈을 넣는다 */
function formatPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length < 4) return d
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`
}

/** 결과 점수가 0 → 목표값으로 차오르는 연출 */
function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const started = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - started) / 900, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run])
  return value
}

export default function CheckPage() {
  const [url, setUrl] = useState('')
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  // 연락처를 남기면 전체 리포트가 열린다
  const [unlocked, setUnlocked] = useState(false)
  const [lead, setLead] = useState({ name: '', phone: '', agree: false })
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const overallShown = useCountUp(result?.overall ?? 0, phase === 'done')

  // 분석 중 단계 문구를 순서대로 넘긴다
  useEffect(() => {
    if (phase !== 'loading') return
    setStep(0)
    const t = setInterval(() => setStep(s => Math.min(s + 1, LOADING_STEPS.length - 1)), 1100)
    return () => clearInterval(t)
  }, [phase])

  useEffect(() => {
    if (phase === 'done') resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 실패 안내도 화면 밖에 있으면 못 보고 지나친다 — 뜨는 위치로 내려 준다
    if (phase === 'error') errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [phase])

  const runCheck = async () => {
    if (!url.trim() || phase === 'loading') return
    // 입력칸이 사라지며 페이지가 짧아질 때 제목이 화면 밖으로 밀리지 않게 맨 위로
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPhase('loading')
    setUnlocked(false)
    setLead({ name: '', phone: '', agree: false })
    setShowErrors(false)
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '분석에 실패했습니다.')
      setResult(data)
      setPhase('done')
    } catch (e) {
      setError(e instanceof Error ? e.message : '분석에 실패했습니다. 잠시 후 다시 시도해 주세요.')
      setPhase('error')
    }
  }

  const phoneOk = lead.phone.replace(/\D/g, '').length === 11

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead.name || !phoneOk || !lead.agree) {
      setShowErrors(true)
      return
    }
    if (!result) return
    setSubmitting(true)
    try {
      const c = result.categories
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          type: '자동 진단',
          industry: '',
          note: `진단 사이트: ${result.finalUrl}\n종합 ${result.overall}점 (속도 ${c.speed.score} · 검색 ${c.seo.score} · 모바일 ${c.mobile.score} · 문의동선 ${c.contact.score})`,
          agree: true,
          source: 'auto-diagnosis',
        }),
      })
      setUnlocked(true)
    } catch {
      // 저장이 실패해도 방문자 경험을 막지 않는다 — 리포트는 열어 준다
      setUnlocked(true)
    } finally {
      setSubmitting(false)
      // 리포트가 열리면 점수부터 다시 보이게 결과 상단으로 올린다
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
  }

  // "다른 사이트 점검하기" — 맨 위 입력칸으로 올라가 바로 새 주소를 넣게 한다
  const checkAnother = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    inputRef.current?.focus({ preventScroll: true })
    inputRef.current?.select()
  }

  return (
    <div style={{ background: 'var(--section-a)' }}>
      {/* ── 주소 입력 ── */}
      <section
        style={{
          background: 'var(--section-b)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(3rem, 7vw, 5rem) 1.5rem',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal variant="up">
            <p
              className="caption-1 emphasized c-accent"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem' }}
            >
              FREE AUTO CHECK
            </p>
            <h1
              className="emphasized"
              style={{ margin: '0 0 1rem', fontSize: 'clamp(1.9rem, 5vw, 3rem)', lineHeight: 1.3, wordBreak: 'keep-all' }}
            >
              내 홈페이지,<br className="ck-br-mobile" /> 지금 몇 점일까요?
            </h1>
            <p className="c-muted" style={{ margin: '0 0 2rem', fontSize: 'clamp(1rem, 2.6vw, 1.15rem)', lineHeight: 1.7, wordBreak: 'keep-all' }}>
              주소만 입력하면 로딩 속도 · 검색엔진 노출 · 모바일 대응 · 문의 동선을
              <br className="hide-mobile" /> 바로 분석해 드립니다.
            </p>

            {phase !== 'loading' ? (
              <>
                <div className="ck-inputrow">
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Globe
                      size={17}
                      strokeWidth={2}
                      style={{ position: 'absolute', left: '1rem', top: '50%', translate: '0 -50%', color: 'var(--text-muted)' }}
                    />
                    <input
                      ref={inputRef}
                      className="form-input"
                      style={{ paddingLeft: '2.6rem', height: '54px' }}
                      placeholder="사이트 주소 (예: example.co.kr)"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && runCheck()}
                      inputMode="url"
                      autoComplete="url"
                    />
                  </div>
                  <button
                    onClick={runCheck}
                    className="btn-primary"
                    style={{ height: '54px', padding: '0 1.8rem', fontSize: '1.05rem', whiteSpace: 'nowrap', justifyContent: 'center' }}
                  >
                    사이트 점검하기
                  </button>
                </div>
                <p className="footnote c-muted" style={{ marginTop: '0.85rem' }}>
                  회원가입 없음 · 빠른 결과
                </p>
              </>
            ) : (
              /* 분석 중 — 입력칸이 있던 자리에서 단계가 한 줄씩 나타난다 */
              <div className="ck-steps" role="status" aria-live="polite">
                <p className="footnote c-muted" style={{ margin: '0 0 1.1rem', wordBreak: 'break-all' }}>
                  {url.trim()} 분석 중
                </p>
                {LOADING_STEPS.slice(0, step + 1).map((s, i) => (
                  <div key={s} className="ck-step">
                    {i < step ? (
                      <span className="ck-step__icon ck-step__icon--done">
                        <Check size={13} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="ck-step__icon ck-spinner" />
                    )}
                    <span
                      className="subhead"
                      style={{ color: i < step ? 'var(--success-text)' : 'var(--text)', fontWeight: i === step ? 700 : 500 }}
                    >
                      {s}
                      {i === step ? '...' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── 접속 실패 ── */}
      {phase === 'error' && (
        <section style={{ padding: 'clamp(3rem, 6vw, 4rem) 1.5rem' }}>
          <div ref={errorRef} style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', scrollMarginTop: '128px' }}>
            <p className="emphasized c-primary" style={{ margin: '0 0 0.7rem', fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)', wordBreak: 'keep-all' }}>
              분석하지 못했습니다
            </p>
            <p className="c-muted" style={{ marginBottom: '1.5rem', wordBreak: 'keep-all', fontSize: 'clamp(1.02rem, 2.6vw, 1.15rem)', lineHeight: 1.7 }}>{error}</p>
            <button
              onClick={() => {
                setPhase('idle')
                // 입력칸이 있는 맨 위로 되돌아가 바로 다시 입력하게 한다
                window.scrollTo({ top: 0, behavior: 'smooth' })
                inputRef.current?.focus({ preventScroll: true })
                inputRef.current?.select()
              }}
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <RotateCcw size={16} strokeWidth={2.5} /> 다시 시도하기
            </button>
          </div>
        </section>
      )}

      {/* ── 진단 결과 ── */}
      {phase === 'done' && result && (
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* 종합 점수 — 스크롤이 여기로 오도록 잡는다. 여백은 상단 고정 헤더(프로모션 바+메뉴) 높이만큼 */}
            <div ref={resultRef} style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)', scrollMarginTop: '48px' }}>
              <p className="footnote c-muted" style={{ margin: '0 0 0.4rem', wordBreak: 'break-all' }}>{result.finalUrl}</p>
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(4rem, 12vw, 6.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: scoreColor(result.overall),
                }}
              >
                {overallShown}
                <span style={{ fontSize: '0.35em', fontWeight: 700, color: 'var(--text-muted)' }}> / 100</span>
              </p>
              <p className="title-3 emphasized c-primary" style={{ margin: '0.6rem 0 0' }}>{gradeWord(result.overall)}</p>
            </div>

            {/* 카테고리 카드 */}
            <div className="ck-grid">
              {CATEGORY_META.map(({ key, label, Icon }) => {
                const cat = result.categories[key]
                const locked = !unlocked && key !== 'speed'
                return (
                  <div key={key} className="ck-card">
                    <div className="ck-card__head">
                      <span className="ck-card__title">
                        <Icon size={17} strokeWidth={2.2} color="var(--accent)" /> {label}
                      </span>
                      <span className="ck-card__score" style={{ color: scoreColor(cat.score) }}>
                        {cat.score}점
                      </span>
                    </div>
                    <div className="ck-bar" aria-hidden="true">
                      <span style={{ width: `${cat.score}%`, background: scoreColor(cat.score) }} />
                    </div>

                    <ul className="ck-items" style={locked ? { filter: 'blur(7px)', pointerEvents: 'none', userSelect: 'none' } : undefined} aria-hidden={locked}>
                      {cat.items.map(item => (
                        <li key={item.label}>
                          <div className="ck-item__row">
                            <span className="ck-dot" style={{
                              background: item.status === 'good' ? 'var(--success-text)' : item.status === 'warn' ? '#eab308' : 'var(--danger-text)',
                            }} />
                            {/* 라벨은 한 줄 고정, 값도 한 줄 — 길면 말줄임(…)으로 잘라 라인을 맞춘다 */}
                            <span className="subhead c-primary" style={{ fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{item.label}</span>
                            <span className="footnote c-muted" style={{ marginLeft: 'auto', textAlign: 'right', minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.value}>{item.value}</span>
                          </div>
                          <p className="footnote c-muted" style={{ margin: '0.25rem 0 0 1.05rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                            {item.advice}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {locked && (
                      <div className="ck-lock">
                        <span className="ck-lock__pill">
                          <Lock size={14} strokeWidth={2.4} />
                          연락처를 남기면 바로 확인할 수 있어요
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* 잠금 해제 / 해제 후 안내 */}
            {!unlocked ? (
              <form onSubmit={submitLead} className="ck-lead">
                <p className="title-3 emphasized c-primary" style={{ margin: 0, wordBreak: 'keep-all', textAlign: 'center' }}>
                  전체 리포트를 바로 확인하세요
                </p>
                <p className="c-muted" style={{ margin: '0.4rem 0 1.4rem', lineHeight: 1.65, wordBreak: 'keep-all', textAlign: 'center' }}>
                  연락처를 남기면 나머지 항목을 바로 확인할 수 있고, 전담 매니저가 개선 방향을 무료로 안내드립니다.
                </p>
                <div className="ck-lead__row">
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <input className="form-input" placeholder="이름" value={lead.name} onChange={e => setLead(f => ({ ...f, name: e.target.value }))} />
                    {showErrors && !lead.name && <p className="field-error">* 이름을 입력해 주세요</p>}
                  </div>
                  <div style={{ flex: 1.4, minWidth: '180px' }}>
                    <input className="form-input" placeholder="연락처 (010-0000-0000)" value={lead.phone} onChange={e => setLead(f => ({ ...f, phone: formatPhone(e.target.value) }))} inputMode="tel" maxLength={13} />
                    {showErrors && !phoneOk && (
                      <p className="field-error">{lead.phone ? '* 연락처 형식으로 입력해주세요' : '* 연락처를 입력해 주세요'}</p>
                    )}
                  </div>
                </div>
                <label className="subhead c-secondary" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0.55rem', cursor: 'pointer', margin: '0.9rem 0 1.1rem', lineHeight: 1.5, fontSize: '1rem' }}>
                  <input
                    type="checkbox"
                    checked={lead.agree}
                    onChange={e => setLead(f => ({ ...f, agree: e.target.checked }))}
                    style={{ marginTop: '3px', width: '17px', height: '17px', accentColor: 'var(--accent)', flexShrink: 0 }}
                  />
                  개인정보 수집 및 상담 안내 동의
                </label>
                {showErrors && !lead.agree && <p className="field-error" style={{ marginTop: '-0.6rem', marginBottom: '0.8rem', textAlign: 'center' }}>* 개인정보 수집에 동의해 주세요</p>}
                <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%', maxWidth: '560px', display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }}>
                  {submitting ? '확인 중...' : '전체 리포트 확인하기'} <ArrowRight size={17} strokeWidth={2.5} />
                </button>
              </form>
            ) : (
              <div className="ck-lead" style={{ textAlign: 'center' }}>
                <p className="title-3 emphasized c-primary" style={{ margin: 0 }}>개선 방향이 궁금하신가요?</p>
                <p className="c-muted" style={{ margin: '0.5rem 0 1.4rem', lineHeight: 1.65, wordBreak: 'keep-all' }}>
                  전담 매니저가 빠르게 연락드려 항목별 개선 방향을 안내드리겠습니다.
                  <br className="hide-mobile" /> 급하시면 지금 바로 전화 주셔도 됩니다.
                </p>
                {/* 두 버튼을 같은 폭으로 — PC 에선 나란히 반반, 좁은 화면에선 쌓이며 전체 폭 */}
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '560px', margin: '0 auto' }}>
                  <button onClick={checkAnother} className="btn-outline" style={{ flex: '1 1 200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <RotateCcw size={16} strokeWidth={2.2} /> 다른 사이트 점검하기
                  </button>
                  <a href="tel:010-2971-7280" className="btn-outline" style={{ flex: '1 1 200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Phone size={16} strokeWidth={2.2} /> 010-2971-7280
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <style>{`
        /* 모바일에서만 제목을 두 줄로 나눈다 */
        .ck-br-mobile { display: none; }
        @media (max-width: 560px) {
          .ck-br-mobile { display: inline; }
        }
        .ck-inputrow {
          display: flex;
          gap: 0.9rem;
          max-width: 620px;
          margin: 0 auto;
        }
        @media (max-width: 560px) {
          .ck-inputrow { flex-direction: column; }
        }

        /* 분석 단계 — 입력칸 높이만큼 최소 높이를 잡아 화면이 덜컹거리지 않게 한다 */
        .ck-steps {
          min-height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }
        .ck-step {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          animation: ckStepIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes ckStepIn {
          from { opacity: 0; translate: 0 8px; }
          to { opacity: 1; translate: 0 0; }
        }
        .ck-step__icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .ck-step__icon--done {
          border-radius: 9999px;
          background: var(--success-dim);
          color: var(--success-text);
        }
        .ck-spinner {
          border-radius: 9999px;
          border: 2.5px solid var(--border);
          border-top-color: var(--accent);
          animation: ckSpin 0.8s linear infinite;
        }
        @keyframes ckSpin { to { transform: rotate(360deg); } }

        .ck-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        /* minmax(0,1fr) 이어야 긴 측정값이 칸을 화면보다 넓게 밀어내지 않는다 */
        @media (max-width: 768px) {
          .ck-grid { grid-template-columns: minmax(0, 1fr); }
        }
        .ck-card {
          position: relative;
          min-width: 0;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          background: var(--surface);
          padding: 1.25rem 1.25rem 1.35rem;
        }
        .ck-card__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.7rem;
        }
        .ck-card__title {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-weight: 700;
          color: var(--text);
        }
        .ck-card__score { font-size: 1.15rem; font-weight: 800; }
        .ck-bar {
          height: 6px;
          border-radius: 9999px;
          background: var(--surface-container);
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .ck-bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          transition: width 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ck-items {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .ck-item__row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .ck-dot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
        }
        /* 잠긴 카테고리 위에 뜨는 안내 — 한 줄 알약 배지.
           목록이 아니라 카드 전체를 기준으로 세로 가운데에 둔다.
           그리드가 같은 줄의 카드 높이를 맞춰 주므로 옆 카드와 줄도 맞는다. */
        .ck-lock {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
        }
        .ck-lock__pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.1rem;
          border: 1px solid var(--border);
          border-radius: 9999px;
          background: var(--surface-container);
          box-shadow: var(--shadow-card);
          color: var(--text);
          font-size: 0.85rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .ck-lead {
          margin-top: 1.6rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          background: var(--surface);
          padding: clamp(1.4rem, 4vw, 2rem);
        }
        /* 입력 오류 안내 — 진단·예약 페이지와 같은 스타일 */
        .field-error {
          color: #ef4444;
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0.4rem 0 0;
        }
        .ck-lead__row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          max-width: 560px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
