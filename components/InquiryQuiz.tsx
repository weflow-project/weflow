'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { makePlans } from '@/data/pricing'
import { caseDetails } from '@/data/cases'

// 업종: 추천 로직엔 관여하지 않고 예시문구·아이콘·연결 성공사례만 바뀜
const INDUSTRIES = [
  { label: '뷰티·피부', emoji: '💄', example: '미용실·네일·피부·왁싱', caseSlug: 'skin' },
  { label: '피트니스·PT', emoji: '💪', example: 'PT샵·필라테스·헬스장', caseSlug: 'pt-shop' },
  { label: '요식업·카페', emoji: '🍽️', example: '카페·음식점·베이커리', caseSlug: 'cafe' },
  { label: '인테리어', emoji: '🛋️', example: '인테리어·시공·리모델링', caseSlug: 'interior' },
  { label: '전문직·컨설팅', emoji: '💼', example: '법률·세무·보험·컨설팅', caseSlug: 'law' },
  { label: '기타 업종', emoji: '🌐', example: '다양한 업종', caseSlug: '' },
]

// 상황 → 추천 플랜 (업종과 무관, 상황만으로 결정)
const SITUATIONS = [
  { label: '홈페이지가 없어요', emoji: '🚫', planId: 'start' },
  { label: '있지만 문의가 없어요', emoji: '📉', planId: 'grow' },
  { label: '검색 상위가 안 돼요', emoji: '🔝', planId: 'master' },
]

// 플랜별 부가정보 (제작기간 / 무료진단 폼 제작종류 / 추천 이유)
const PLAN_EXTRA: Record<string, { duration: string; type: string; why: string }> = {
  start: { duration: '3~4일', type: '랜딩페이지 제작', why: '처음 홈페이지를 빠르게 만들고 기본 SEO까지 세팅합니다.' },
  grow: { duration: '1주', type: '홈페이지 제작', why: '문의 전환에 최적화된 구조로 전면 리뉴얼합니다.' },
  master: { duration: '1~2주', type: '랜딩&홈페이지 제작', why: '검색 상위노출 + 광고 연동까지 풀패키지로 운영합니다.' },
}

type Industry = typeof INDUSTRIES[number]

export default function InquiryQuiz() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [situation, setSituation] = useState('')
  const [planId, setPlanId] = useState('')

  const reset = () => { setStep(0); setIndustry(null); setSituation(''); setPlanId('') }
  const close = () => { setOpen(false); setTimeout(reset, 300) }

  const selectSituation = (label: string, pid: string) => {
    setSituation(label)
    setPlanId(pid)
    setStep(2)
  }

  const plan = makePlans.find(p => p.id === planId)
  const extra = PLAN_EXTRA[planId]
  const caseSlug = industry?.caseSlug
  const successCase = caseSlug ? caseDetails[caseSlug] : null

  // 결과 → 무료진단 폼 자동 채움 후 이동
  const goDiagnosis = () => {
    if (plan && extra) {
      sessionStorage.setItem('weflow_quiz_prefill', JSON.stringify({
        type: extra.type,
        industry: industry?.label ?? '',
        note: `[맞춤 플랜: ${plan.name}] 현재 상황: ${situation}`,
      }))
    }
    close()
    router.push('/diagnosis')
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
        <span>🎯</span> 맞춤 플랜 알아보기
      </button>

      {/* 퀴즈 패널 */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '118px', right: '1rem', zIndex: 190,
          width: 'min(300px, calc(100vw - 2rem))',
          maxHeight: 'min(78vh, 640px)', overflowY: 'auto',
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
            <button onClick={close} aria-label="닫기" style={{
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
              {INDUSTRIES.map(item => (
                <button key={item.label} onClick={() => { setIndustry(item); setStep(1) }} style={{
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
                  <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* STEP 1: 상황 */}
          {step === 1 && industry && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p className="footnote c-muted" style={{ margin: '0 0 0.25rem' }}>
                <span style={{ fontSize: '1rem' }}>{industry.emoji}</span>{' '}
                <strong style={{ color: 'var(--accent)' }}>{industry.label}</strong>
                <span className="caption-1 c-muted"> · {industry.example}</span>
              </p>
              {SITUATIONS.map(({ label, emoji, planId: pid }) => (
                <button key={label} onClick={() => selectSituation(label, pid)} style={{
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
          {step === 2 && plan && extra && (
            <div>
              {/* 추천 플랜 카드 */}
              <div style={{
                background: '#ebf2ff', border: '1.5px solid #cdddf9',
                borderRadius: '12px', padding: '1rem', marginBottom: '0.75rem',
              }}>
                <p className="caption-2 emphasized c-accent" style={{ margin: '0 0 0.35rem', letterSpacing: '0.06em', textAlign: 'center' }}>
                  {industry?.label} 맞춤 추천 플랜
                </p>
                <p className="headline emphasized c-primary" style={{ margin: '0 0 0.15rem', textAlign: 'center' }}>
                  {plan.emoji} {plan.name}
                </p>
                <p className="caption-1 c-secondary" style={{ margin: '0 0 0.75rem', textAlign: 'center' }}>
                  {plan.sub}
                </p>

                {/* 가격 */}
                <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                  <span className="caption-2 c-muted" style={{ textDecoration: 'line-through', marginRight: '0.4rem' }}>
                    {plan.originalPrice}
                  </span>
                  <span className="title-3 emphasized c-accent">{plan.price}</span>
                  <p className="caption-2 c-muted" style={{ margin: '0.2rem 0 0' }}>
                    제작기간 {extra.duration} · {plan.note}
                  </p>
                </div>

                {/* 포함 기능 3개 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid #cdddf9', paddingTop: '0.7rem' }}>
                  {plan.features.slice(0, 3).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={13} color="var(--accent)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span className="caption-1 c-secondary" style={{ wordBreak: 'keep-all' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 추천 이유 */}
              <p className="caption-1 c-secondary" style={{ margin: '0 0 0.75rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                💬 {extra.why}
              </p>

              {/* 업종 성공사례 */}
              {successCase ? (
                <button
                  onClick={() => { close(); router.push(`/cases/${caseSlug}`) }}
                  style={{
                    width: '100%', textAlign: 'left',
                    background: '#f9fafb', border: '1px solid var(--border)',
                    borderRadius: '10px', padding: '0.7rem 0.85rem',
                    cursor: 'pointer', marginBottom: '0.85rem',
                  }}
                >
                  <p className="caption-2 emphasized c-accent" style={{ margin: '0 0 0.25rem', letterSpacing: '0.04em' }}>
                    {successCase.emoji} {successCase.name} 성공사례
                  </p>
                  <p className="caption-1 c-secondary" style={{ margin: 0, lineHeight: 1.5, wordBreak: 'keep-all' }}>
                    {successCase.result}
                  </p>
                  <p className="caption-2 emphasized c-accent" style={{ margin: '0.35rem 0 0' }}>
                    자세히 보기 →
                  </p>
                </button>
              ) : (
                <button
                  onClick={() => { close(); router.push('/cases') }}
                  className="caption-1 emphasized c-accent"
                  style={{
                    width: '100%', background: '#f9fafb', border: '1px solid var(--border)',
                    borderRadius: '10px', padding: '0.65rem', cursor: 'pointer',
                    marginBottom: '0.85rem',
                  }}
                >
                  🏆 다양한 업종 성공사례 보기 →
                </button>
              )}

              {/* CTA */}
              <button
                onClick={goDiagnosis}
                style={{
                  width: '100%', padding: '0.8rem',
                  background: 'var(--accent)', color: '#fff',
                  border: 'none', borderRadius: '10px',
                  cursor: 'pointer', marginBottom: '0.4rem',
                }}
                className="subhead emphasized"
              >
                이 플랜으로 무료진단 받기 →
              </button>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => { close(); router.push('/pricing') }} className="footnote c-muted" style={{
                  flex: 1, padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer',
                }}>
                  가격 자세히
                </button>
                <button onClick={reset} className="footnote c-muted" style={{
                  flex: 1, padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer',
                }}>
                  다시 선택
                </button>
              </div>
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
