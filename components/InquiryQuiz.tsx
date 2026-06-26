'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STEP1 = [
  { label: '뷰티·피부', emoji: '💅' },
  { label: '피트니스·PT', emoji: '🏋️' },
  { label: '요식업·카페', emoji: '☕' },
  { label: '인테리어', emoji: '🏠' },
  { label: '전문직·컨설팅', emoji: '📋' },
  { label: '기타 업종', emoji: '✨' },
]

const STEP2 = [
  { label: '홈페이지가 없어요', emoji: '❌' },
  { label: '있지만 문의가 없어요', emoji: '😓' },
  { label: '검색 상위가 안 돼요', emoji: '🔍' },
]

const RESULTS: Record<string, { plan: string; desc: string }> = {
  '없음': { plan: 'START 플랜', desc: '처음 홈페이지를 제작하고 기본 SEO까지 세팅합니다.' },
  '문의없음': { plan: 'GROW 플랜', desc: '문의 전환에 최적화된 구조로 전면 리뉴얼합니다.' },
  '상위노출': { plan: 'MASTER 플랜', desc: '검색 상위노출 + 광고 연동까지 풀패키지로 운영합니다.' },
}

export default function InquiryQuiz() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [biz, setBiz] = useState('')
  const [situation, setSituation] = useState('')
  const [result, setResult] = useState<{ plan: string; desc: string } | null>(null)

  const reset = () => { setStep(0); setBiz(''); setSituation(''); setResult(null) }
  const close = () => { setOpen(false); setTimeout(reset, 300) }

  const selectSituation = (label: string) => {
    setSituation(label)
    const key = label.includes('없어요') && !label.includes('문의') ? '없음'
      : label.includes('문의') ? '문의없음'
      : '상위노출'
    setResult(RESULTS[key])
    setStep(2)
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="내 업종 맞춤 플랜 알아보기"
        className="caption-1 emphasized"
        style={{
          position: 'fixed', bottom: '72px', right: '1rem', zIndex: 190,
          background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: '9999px',
          padding: '0.6rem 1rem',
          cursor: 'pointer', whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(51,115,223,0.35)',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(51,115,223,0.45)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = ''
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(51,115,223,0.35)'
        }}
      >
        <span>💡</span> 맞춤 플랜 알아보기
      </button>

      {/* 퀴즈 패널 */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '118px', right: '1rem', zIndex: 190,
          width: 'min(300px, calc(100vw - 2rem))',
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: '16px', padding: '1.25rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          animation: 'quiz-in 0.28s cubic-bezier(0.34,1.2,0.64,1)',
        }}>
          {/* 헤더 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <p className="caption-2 emphasized c-accent" style={{ margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                PLAN FINDER
              </p>
              <p className="subhead emphasized c-primary" style={{ margin: 0 }}>
                {step === 0 ? '업종을 선택해주세요'
                  : step === 1 ? '현재 상황을 알려주세요'
                  : '추천 플랜 결과'}
              </p>
            </div>
            <button onClick={close} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '0.9rem', padding: 0,
            }}>✕</button>
          </div>

          {/* 단계 인디케이터 */}
          <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                flex: 1, height: '3px', borderRadius: '9999px',
                background: i <= step ? 'var(--accent)' : 'var(--border)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>

          {/* STEP 0: 업종 */}
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {STEP1.map(({ label, emoji }) => (
                <button key={label} onClick={() => { setBiz(label); setStep(1) }} style={{
                  background: '#f9fafb', border: '1.5px solid var(--border)',
                  borderRadius: '10px', padding: '0.65rem 0.5rem',
                  cursor: 'pointer', textAlign: 'center',
                  color: 'var(--text)',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                  className="footnote semibold"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'
                    ;(e.currentTarget as HTMLButtonElement).style.background = '#ebf2ff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLButtonElement).style.background = '#f9fafb'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.25rem' }}>{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* STEP 1: 상황 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p className="footnote c-muted" style={{ margin: '0 0 0.25rem' }}>
                선택: <strong style={{ color: 'var(--accent)' }}>{biz}</strong>
              </p>
              {STEP2.map(({ label, emoji }) => (
                <button key={label} onClick={() => selectSituation(label)} style={{
                  background: '#f9fafb', border: '1.5px solid var(--border)',
                  borderRadius: '10px', padding: '0.75rem 1rem',
                  cursor: 'pointer', textAlign: 'left',
                  color: 'var(--text)',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                  className="footnote semibold"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'
                    ;(e.currentTarget as HTMLButtonElement).style.background = '#ebf2ff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLButtonElement).style.background = '#f9fafb'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* STEP 2: 결과 */}
          {step === 2 && result && (
            <div>
              <div style={{
                background: '#ebf2ff', border: '1.5px solid #cdddf9',
                borderRadius: '12px', padding: '1rem', marginBottom: '1rem', textAlign: 'center',
              }}>
                <p className="caption-2 emphasized c-accent" style={{ margin: '0 0 0.3rem', letterSpacing: '0.06em' }}>
                  추천 플랜
                </p>
                <p className="headline emphasized c-primary" style={{ margin: '0 0 0.5rem' }}>
                  {result.plan}
                </p>
                <p className="caption-1 c-secondary" style={{ margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>
                  {result.desc}
                </p>
              </div>

              <button
                onClick={() => { close(); router.push('/diagnosis') }}
                style={{
                  width: '100%', padding: '0.8rem',
                  background: 'var(--accent)', color: '#fff',
                  border: 'none', borderRadius: '10px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                }}
                className="subhead emphasized"
              >
                무료진단 신청하기 →
              </button>
              <button onClick={reset} className="footnote c-muted" style={{
                width: '100%', padding: '0.5rem',
                background: 'none', border: 'none',
                cursor: 'pointer',
              }}>
                다시 선택하기
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes quiz-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
