'use client'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { projectTypes } from '@/data/common'

interface Props { floating?: boolean }

export default function LandingForm({ floating = true }: Props) {
  const [form, setForm]           = useState({ name: '', phone: '', type: '', industry: '', note: '', agree: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [bottom, setBottom]       = useState(72)

  useEffect(() => {
    if (!floating) return
    const adjust = () => {
      const footer  = document.querySelector('footer')
      const viewH   = window.innerHeight
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top
        // footer가 화면 안으로 들어오면 bottom을 키워서 폼을 위로 밀어냄
        setBottom(footerTop < viewH ? viewH - footerTop + 72 : 72)
      }
    }
    adjust()
    document.body.addEventListener('scroll', adjust, { passive: true })
    window.addEventListener('scroll', adjust, { passive: true })
    window.addEventListener('resize', adjust)
    return () => {
      document.body.removeEventListener('scroll', adjust)
      window.removeEventListener('scroll', adjust)
      window.removeEventListener('resize', adjust)
    }
  }, [floating])

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
      body: JSON.stringify({ ...form, source: 'landing' }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  const formBody = (
    <div style={{ padding: '0.75rem 1.25rem 1rem', overflowY: 'auto', flex: 1, minHeight: 0 }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Check size={24} color="#16a34a" strokeWidth={2.5} />
          </div>
          <p className="headline emphasized c-primary" style={{ marginBottom: '0.4rem' }}>신청 완료!</p>
          <p className="footnote c-muted" style={{ lineHeight: 1.7, margin: 0 }}>담당자가 빠르게<br />연락드리겠습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div>
            <label className="form-label">이름 <span style={{ color: '#ef4444' }}>*</span></label>
            <input className="form-input" placeholder="홍길동" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ fontSize: '0.85rem' }} />
          </div>
          <div>
            <label className="form-label">연락처 <span style={{ color: '#ef4444' }}>*</span></label>
            <input className="form-input" placeholder="010-0000-0000" value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={{ fontSize: '0.85rem' }} />
          </div>
          <div>
            <label className="form-label">제작종류 <span style={{ color: '#ef4444' }}>*</span></label>
            <select className="form-input" value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ cursor: 'pointer', fontSize: '0.85rem' }}>
              <option value="">선택해 주세요</option>
              {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">업종</label>
            <input className="form-input" placeholder="예: 필라테스, 법률사무소" value={form.industry}
              onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} style={{ fontSize: '0.85rem' }} />
          </div>
          <div>
            <label className="form-label">현재 고민</label>
            <textarea className="form-input" rows={2} placeholder="예: 문의가 없어요 / 검색이 안 돼요"
              value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              style={{ resize: 'none', fontSize: '0.82rem' }} />
          </div>
          <label className="caption-1 c-muted" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', cursor: 'pointer', lineHeight: 1.5 }}>
            <input type="checkbox" checked={form.agree}
              onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
              style={{ marginTop: 2, accentColor: 'var(--accent)', flexShrink: 0 }} />
            개인정보 수집 및 이용 동의 <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <button type="submit" className="btn-primary" disabled={loading}
            style={{ justifyContent: 'center', fontSize: '0.88rem', padding: '0.65rem' }}>
            {loading ? '제출 중...' : '무료진단 신청하기 →'}
          </button>
        </form>
      )}
    </div>
  )

  /* ── 인라인 모드 (모바일) ── */
  if (!floating) {
    return (
      <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 16, overflow: 'hidden', maxWidth: 480, margin: '0 auto', width: '100%' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', background: '#f9fafb' }}>
          <p className="caption-2 emphasized c-accent" style={{ margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FREE · 무료</p>
          <p className="headline emphasized c-primary" style={{ margin: '0.15rem 0 0' }}>무료진단 신청</p>
        </div>
        {formBody}
      </div>
    )
  }

  /* ── floating 고정 모드 (데스크톱) ── */
  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom,
        width: 300,
        zIndex: 50,
        borderRadius: 16,
        border: '1.5px solid var(--border)',
        background: '#fff',
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'none',
      }}
    >
      {/* 헤더 */}
      <div style={{ padding: '0.65rem 1rem', background: '#f9fafb', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <p className="caption-1 emphasized c-primary" style={{ margin: 0 }}>무료진단 신청</p>
        <p className="caption-2 c-muted" style={{ margin: 0 }}>2분이면 충분합니다</p>
      </div>
      {formBody}
    </div>
  )
}
