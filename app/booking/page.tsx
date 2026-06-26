'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Check, CalendarDays, Clock, User } from 'lucide-react'
import { projectTypes } from '@/data/common'

const AM_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30']
const PM_SLOTS = ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30']
const WEEKDAYS = ['일','월','화','수','목','금','토']
const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function getFirstDay(y: number, m: number) { return new Date(y, m, 1).getDay() }
function pad(n: number) { return String(n).padStart(2, '0') }

export default function BookingPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [customTime, setCustomTime] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', type: '', industry: '', note: '', agree: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // 작성 "중간"인 사람만 이탈 모달 대상: 뭔가 건드렸지만 필수항목은 아직 미완성
  useEffect(() => {
    const touched = !!(selectedDay || selectedSlot || customTime ||
      form.name || form.phone || form.type || form.industry || form.note || form.agree)
    const complete = !!(selectedDay && (selectedSlot || customTime) &&
      form.name && form.phone && form.type && form.agree)
    if (touched && !complete) {
      sessionStorage.setItem('weflow_form_intent', '1')
      window.dispatchEvent(new Event('weflow-intent'))  // 뒤로가기 트랩 무장
    } else {
      sessionStorage.removeItem('weflow_form_intent')
    }
  }, [selectedDay, selectedSlot, customTime, form])

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const isPast = (day: number) =>
    new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const isTimeDisabled = (slot: string) => {
    if (!selectedDay) return false
    const sel = new Date(year, month, selectedDay)
    if (sel.toDateString() !== today.toDateString()) return false
    const [h, m] = slot.split(':').map(Number)
    return h * 60 + m <= today.getHours() * 60 + today.getMinutes()
  }

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
    setSelectedDay(null); setSelectedSlot(''); setCustomTime('')
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
    setSelectedDay(null); setSelectedSlot(''); setCustomTime('')
  }

  const dateStr = selectedDay
    ? `${year}년 ${month + 1}월 ${selectedDay}일 (${WEEKDAYS[new Date(year, month, selectedDay).getDay()]})`
    : null
  const timeStr = customTime || selectedSlot || null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDay || (!selectedSlot && !customTime) || !form.name || !form.phone || !form.type || !form.agree) {
      alert('모든 필수 항목을 입력하고 개인정보 수집에 동의해 주세요.')
      return
    }
    setLoading(true)
    const date = `${year}-${pad(month + 1)}-${pad(selectedDay)}`
    const time = customTime || selectedSlot
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, phone: form.phone, type: form.type, industry: form.industry, note: form.note, date, time }),
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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}>
            <Check size={34} color="#16a34a" strokeWidth={2.5} />
          </div>
          <h2 className="title-2 emphasized" style={{ marginBottom: '0.5rem' }}>예약이 접수되었습니다</h2>
          <p className="callout c-muted" style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            담당자가 확인 후 빠르게 연락드리겠습니다.
          </p>
          {dateStr && timeStr && (
            <div style={{
              background: '#f0f7ff', border: '1px solid #cdddf9',
              borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem',
            }}>
              <p className="footnote semibold c-secondary" style={{ margin: '0 0 0.2rem' }}>{dateStr}</p>
              <p className="footnote emphasized c-accent" style={{ margin: 0 }}>{timeStr}</p>
            </div>
          )}
          <button
            onClick={() => {
              setSubmitted(false); setSelectedDay(null); setSelectedSlot(''); setCustomTime('')
              setForm({ name: '', phone: '', type: '', industry: '', note: '', agree: false })
            }}
            className="btn-primary" style={{ fontSize: '0.9rem' }}
          >
            다른 예약 하기
          </button>
        </div>
      </div>
    )
  }

  /* ── 시간 슬롯 버튼 ── */
  const SlotButton = ({ slot }: { slot: string }) => {
    const disabled = isTimeDisabled(slot)
    const active = selectedSlot === slot
    return (
      <button type="button" disabled={disabled} onClick={() => { setSelectedSlot(slot); setCustomTime('') }}
        style={{
          padding: '0.42rem 0',
          border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: '8px', cursor: disabled ? 'not-allowed' : 'pointer',
          background: active ? '#ebf2ff' : disabled ? '#f9fafb' : '#fff',
          color: active ? 'var(--accent)' : disabled ? '#d1d5db' : 'var(--text-secondary)',
          fontSize: '0.78rem', fontWeight: active ? 700 : 500,
          fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'center',
        }}>
        {slot}
      </button>
    )
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>

      {/* ── 헤더 ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 2vw, 2rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>BOOKING</p>
          <h1 className="title-1" style={{ margin: '0 0 0.4rem' }}>
            상담 예약
          </h1>
          <p className="subhead c-muted" style={{ margin: 0 }}>날짜와 시간을 선택하고 정보를 입력해 주세요</p>
        </div>
      </section>

      {/* ── 본문 ── */}
      <section style={{ padding: 'clamp(1.25rem, 2vw, 2rem) clamp(1rem, 3vw, 1.5rem) 5rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

          <form onSubmit={handleSubmit}>
            <div className="booking-layout">

            {/* ── 왼쪽: 달력 ── */}
            <div className="booking-left">
            <div className="booking-card">
              <p className="bk-section-title"><CalendarDays size={15} color="var(--accent)" strokeWidth={2} /> 날짜 선택 <span style={{ color: '#ef4444' }}>*</span></p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <button type="button" onClick={prevMonth} className="cal-nav-btn"><ChevronLeft size={16} strokeWidth={2.5} /></button>
                <p className="callout emphasized c-primary" style={{ margin: 0 }}>{year}년 {MONTHS[month]}</p>
                <button type="button" onClick={nextMonth} className="cal-nav-btn"><ChevronRight size={16} strokeWidth={2.5} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.35rem' }}>
                {WEEKDAYS.map((d, i) => (
                  <div key={d} className="caption-1 emphasized" style={{ textAlign: 'center', padding: '0.35rem 0', color: i === 0 ? '#ef4444' : i === 6 ? '#3373df' : 'var(--text-muted)' }}>{d}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const past = isPast(day)
                  const selected = selectedDay === day
                  const isToday = new Date(year, month, day).toDateString() === today.toDateString()
                  const dow = new Date(year, month, day).getDay()
                  return (
                    <button key={day} type="button" disabled={past}
                      onClick={() => { setSelectedDay(day); setSelectedSlot(''); setCustomTime('') }}
                      style={{
                        border: isToday && !selected ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                        borderRadius: '10px', padding: '0.7rem 0',
                        fontSize: '0.98rem', fontWeight: selected ? 700 : isToday ? 700 : 400,
                        cursor: past ? 'not-allowed' : 'pointer',
                        background: selected ? 'var(--accent)' : 'transparent',
                        color: selected ? '#fff' : past ? '#d1d5db' : dow === 0 ? '#ef4444' : dow === 6 ? '#3373df' : 'var(--text)',
                        fontFamily: 'inherit', transition: 'all 0.15s',
                      }}>
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 선택 요약 바 */}
            {(dateStr || timeStr) && (
              <div style={{
                background: '#fff', border: '1.5px solid var(--accent)',
                borderRadius: '12px', padding: '0.85rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                marginTop: '1.1rem', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CalendarDays size={15} color="var(--accent)" strokeWidth={2} />
                  <span className="subhead semibold c-primary">{dateStr}</span>
                </div>
                {timeStr && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={15} color="var(--accent)" strokeWidth={2} />
                    <span className="subhead emphasized c-accent">{timeStr}</span>
                  </div>
                )}
              </div>
            )}
            </div>

            {/* ── 오른쪽: 시간·정보·제출 ── */}
            <div className="booking-right">

            {/* 2. 시간 선택 */}
            <div className="booking-card">
              <p className="bk-section-title">
                <Clock size={15} color="var(--accent)" strokeWidth={2} /> 시간 선택 <span style={{ color: '#ef4444' }}>*</span>
                {!selectedDay && <span className="caption-1 medium c-muted" style={{ marginLeft: '0.3rem' }}>날짜를 먼저 선택해주세요</span>}
              </p>
              <div style={{ opacity: selectedDay ? 1 : 0.4, pointerEvents: selectedDay ? 'auto' : 'none', transition: 'opacity 0.2s' }}>
                <p className="caption-1 emphasized c-muted" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>오전</p>
                <div className="slot-grid" style={{ marginBottom: '1rem' }}>
                  {AM_SLOTS.map(s => <SlotButton key={s} slot={s} />)}
                </div>
                <p className="caption-1 emphasized c-muted" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>오후</p>
                <div className="slot-grid">
                  {PM_SLOTS.map(s => <SlotButton key={s} slot={s} />)}
                </div>
              </div>
            </div>

            {/* 3. 시간 직접입력 */}
            <div className="booking-card">
              <p className="bk-section-title"><Clock size={15} color="var(--accent)" strokeWidth={2} /> 시간 직접 입력</p>
              <input type="text" className="form-input" placeholder="예: 19:00, 오후 2시 반 (위 시간표에 없는 경우)"
                value={customTime} onChange={e => { setCustomTime(e.target.value); setSelectedSlot('') }}
                style={{ fontSize: '0.9rem' }} />
            </div>

            {/* 4-8. 예약 정보 */}
            <div className="booking-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p className="bk-section-title"><User size={15} color="var(--accent)" strokeWidth={2} /> 예약 정보</p>

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
                <label className="form-label">추가 요청사항</label>
                <textarea className="form-input" rows={4} placeholder="자유롭게 적어주세요."
                  value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  style={{ resize: 'vertical', fontSize: '0.9rem' }} />
              </div>
            </div>

            {/* 동의 + 제출 */}
            <div className="booking-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label className="subhead c-secondary" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', lineHeight: 1.5 }}>
                <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
                  style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: 'var(--accent)', flexShrink: 0 }} />
                개인정보 수집 및 상담 동의 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <button type="submit" className="btn-primary" disabled={loading}
                style={{ fontSize: '1rem', padding: '1rem', justifyContent: 'center', width: '100%' }}>
                {loading ? '접수 중...' : '예약 신청하기'}
              </button>
              <p className="caption-1 c-muted" style={{ textAlign: 'center', margin: 0 }}>
                연중무휴 24시간 · 담당자가 직접 확인 후 연락드립니다
              </p>
            </div>

            </div>
            </div>
          </form>
        </div>
      </section>

      <style>{`
        .booking-layout {
          display: grid;
          grid-template-columns: 460px minmax(0, 1fr);
          gap: 1.1rem;
          align-items: start;
        }
        .booking-left { position: sticky; top: 140px; }
        .booking-right {
          display: flex; flex-direction: column; gap: 1.1rem;
        }
        @media (max-width: 880px) {
          .booking-layout { grid-template-columns: 1fr; }
          .booking-left { position: static; }
        }
        .bk-section-title {
          font-weight: 600; font-size: 1.0625rem; color: var(--text);
          letter-spacing: -0.01em;
          margin: 0 0 1rem; display: flex; align-items: center; gap: 0.4rem;
        }
        .booking-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
        }
        @media (max-width: 640px) {
          .booking-card { padding: 1.1rem; border-radius: 12px; }
        }
        .cal-nav-btn {
          background: #f3f4f6; border: none; border-radius: 8px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--text-secondary); transition: background 0.15s;
        }
        .cal-nav-btn:hover { background: #e5e7eb; }
        .slot-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.4rem;
        }
        @media (max-width: 480px) {
          .slot-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  )
}
