'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, MessageSquare, FileSearch, Lightbulb, Zap, Phone } from 'lucide-react'
import { projectTypes } from '@/data/common'

const CHECKS = [
  { icon: FileSearch, title: '문의 구조 진단', desc: '방문자가 문의로 이어지지 않는 이유를 분석합니다' },
  { icon: MessageSquare, title: '디자인 점검', desc: '업종에 맞는 디자인 방향과 개선 포인트를 제안합니다' },
  { icon: Zap, title: '검색 노출 분석', desc: '네이버·구글 노출 현황과 개선 방안을 확인합니다' },
  { icon: Lightbulb, title: '맞춤 제작 방향 제안', desc: '업종·예산에 맞는 최적의 제작 방향을 안내합니다' },
]

const PROCESS = [
  { num: '01', text: '신청서 작성 (2분)' },
  { num: '02', text: '전문가 사이트 분석' },
  { num: '03', text: '24시간 내 결과 연락' },
]

const TRUST = [
  { label: '완전 무료', sub: '비용 없음' },
  { label: '24시간 내', sub: '빠른 회신' },
  { label: '부담 없음', sub: '강요 없는 상담' },
]

export default function DiagnosisPage() {
  const [form, setForm] = useState({ name: '', phone: '', type: '', industry: '', note: '', agree: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // 맞춤 플랜 위젯에서 넘어온 경우 폼 자동 채움 (제작종류·업종·상황 메모)
  useEffect(() => {
    const raw = sessionStorage.getItem('weflow_quiz_prefill')
    if (!raw) return
    try {
      const p = JSON.parse(raw)
      setForm(f => ({
        ...f,
        type: p.type || f.type,
        industry: p.industry || f.industry,
        note: p.note || f.note,
      }))
    } catch {}
    sessionStorage.removeItem('weflow_quiz_prefill')
  }, [])

  // 작성 "중간"인 사람만 이탈 모달 대상: 뭔가 입력했지만 필수항목은 아직 미완성
  useEffect(() => {
    const touched = !!(form.name || form.phone || form.type || form.industry || form.note || form.agree)
    const complete = !!(form.name && form.phone && form.type && form.agree)
    if (touched && !complete) {
      sessionStorage.setItem('weflow_form_intent', '1')
      window.dispatchEvent(new Event('weflow-intent'))  // 뒤로가기 트랩 무장
    } else {
      sessionStorage.removeItem('weflow_form_intent')
    }
  }, [form])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.type || !form.agree) {
      alert('필수 항목을 모두 입력하고 개인정보 수집에 동의해 주세요.')
      return
    }
    setLoading(true)
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    setSubmitted(true)
    sessionStorage.removeItem('weflow_form_intent')
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: '#dcfce7',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
          }}>
            <Check size={34} color="#16a34a" strokeWidth={2.5} />
          </div>
          <h2 className="title-2 emphasized" style={{ marginBottom: '0.5rem' }}>
            무료진단 신청 완료!
          </h2>
          <p className="callout c-muted" style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
            담당자가 확인 후 <strong style={{ color: 'var(--text)' }}>24시간 내</strong>에 연락드리겠습니다.<br />
            연중무휴 상담 가능합니다.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:010-2971-7280" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'var(--accent)', color: '#fff',
              padding: '0.7rem 1.25rem', borderRadius: '8px',
              textDecoration: 'none',
            }} className="subhead emphasized">
              <Phone size={14} strokeWidth={2.5} /> 바로 전화하기
            </a>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', type: '', industry: '', note: '', agree: false }) }}
              className="subhead semibold c-secondary"
              style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', padding: '0.7rem 1.25rem', cursor: 'pointer' }}>
              다시 신청하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f9fafb' }}>

      {/* ── 헤더 ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>FREE DIAGNOSIS</p>
          <h1 className="title-1" style={{ margin: '0 0 0.4rem' }}>
            무료진단받기
          </h1>
          <p className="subhead c-muted" style={{ margin: 0 }}>
            홈페이지의 문제를 무료로 진단받고 맞춤 제작 방향을 안내받으세요
          </p>
        </div>
      </section>

      {/* ── 본문 ── */}
      <section style={{ padding: '2rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="diag-grid">

            {/* ── 왼쪽: 신뢰 요소 ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* 무료 신뢰 뱃지 */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {TRUST.map(t => (
                  <div key={t.label} style={{
                    flex: 1, background: '#fff', border: '1.5px solid var(--border)',
                    borderRadius: '12px', padding: '0.9rem 0.75rem', textAlign: 'center',
                  }}>
                    <p className="subhead emphasized c-accent" style={{ margin: '0 0 0.15rem' }}>{t.label}</p>
                    <p className="caption-1 c-muted" style={{ margin: 0 }}>{t.sub}</p>
                  </div>
                ))}
              </div>

              {/* 진단 항목 */}
              <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>WHAT WE CHECK</p>
                <h3 className="headline emphasized c-primary" style={{ margin: '0 0 1.25rem' }}>
                  이런 걸 확인해드립니다
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {CHECKS.map(({ icon: Icon, title, desc }) => (
                    <div key={title} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '9px', background: '#ebf2ff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Icon size={16} color="var(--accent)" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.15rem' }}>{title}</p>
                        <p className="footnote c-muted" style={{ margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 진단 과정 */}
              <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>HOW IT WORKS</p>
                <h3 className="headline emphasized c-primary" style={{ margin: '0 0 1.25rem' }}>진단 과정</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {PROCESS.map((p, i) => (
                    <div key={p.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'var(--accent)', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }} className="caption-1 emphasized">{p.num}</div>
                        {i < PROCESS.length - 1 && (
                          <div style={{ width: '2px', height: '28px', background: '#e5e7eb', margin: '3px 0' }} />
                        )}
                      </div>
                      <p className="subhead semibold c-primary" style={{ margin: '0.45rem 0 0' }}>{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 전화 CTA */}
              <a href="tel:010-2971-7280" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                background: '#fff', border: '1.5px solid var(--border)',
                borderRadius: '12px', padding: '1rem',
                textDecoration: 'none', color: 'var(--text)',
                transition: 'border-color 0.18s',
              }}>
                <Phone size={16} color="var(--accent)" strokeWidth={2} />
                <div>
                  <p className="subhead emphasized c-primary" style={{ margin: 0 }}>바로 전화 상담</p>
                  <p className="footnote emphasized c-accent" style={{ margin: 0 }}>탭하면 바로 연결됩니다</p>
                </div>
                <span className="footnote c-muted" style={{ marginLeft: 'auto' }}>연중무휴 24시간</span>
              </a>
            </div>

            {/* ── 오른쪽: 폼 ── */}
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', position: 'sticky', top: '84px', alignSelf: 'start' }}>
              <div style={{ marginBottom: '1.4rem' }}>
                <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>FREE · 무료</p>
                <h2 className="title-3 emphasized" style={{ margin: '0 0 0.3rem' }}>
                  무료진단 신청
                </h2>
                <p className="footnote c-muted" style={{ margin: 0 }}>2분이면 충분합니다. 부담 없이 신청하세요.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">이름 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input className="form-input" placeholder="홍길동" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>

                <div>
                  <label className="form-label">연락처 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input className="form-input" placeholder="010-0000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>

                <div>
                  <label className="form-label">제작종류 <span style={{ color: '#ef4444' }}>*</span></label>
                  <select className="form-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ cursor: 'pointer' }}>
                    <option value="">선택해 주세요</option>
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="form-label">업종</label>
                  <input className="form-input" placeholder="예: 필라테스, 법률사무소 등" value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} />
                </div>

                <div>
                  <label className="form-label">현재 고민 / 추가 요청사항</label>
                  <textarea className="form-input" rows={3}
                    placeholder="예: 문의가 없어요 / 검색이 안 돼요 / 홈페이지가 없어요"
                    value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    style={{ resize: 'vertical', fontSize: '0.85rem' }} />
                </div>

                <label className="footnote c-secondary" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', lineHeight: 1.5 }}>
                  <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
                    style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: 'var(--accent)', flexShrink: 0 }} />
                  개인정보 수집 및 상담 동의 <span style={{ color: '#ef4444' }}>*</span>
                </label>

                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ fontSize: '0.95rem', padding: '0.9rem', justifyContent: 'center', width: '100%', marginTop: '0.25rem' }}>
                  {loading ? '제출 중...' : '무료진단 신청하기 →'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .diag-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .diag-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
