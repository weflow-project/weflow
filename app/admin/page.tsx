'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback, Fragment } from 'react'
import { LogOut, Menu, X, RefreshCw, ChevronDown, ChevronUp, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { projectTypes } from '@/data/common'

const ADMIN_PW = 'weflow'

type Status = 'pending' | 'in_progress' | 'done'
type Tab = 'overview' | 'reservations' | 'inquiries' | 'analytics'
type Filter = '전체' | '대기' | '진행중' | '완료'

const STATUS_KO: Record<Status, string> = { pending: '대기', in_progress: '진행중', done: '완료' }
const STATUS_EN: Record<string, Status> = { '대기': 'pending', '진행중': 'in_progress', '완료': 'done' }
const STATUS_STYLE: Record<Status, { bg: string; color: string; border: string }> = {
  pending:     { bg: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid #d1d5db' },
  in_progress: { bg: 'var(--accent-light)', color: 'var(--accent-hover)', border: '1px solid #b9d0f7' },
  done:        { bg: '#f0fdf4', color: '#15803d', border: '1px solid #86efac' },
}


interface Booking { id: string; status: Status; name: string; phone: string; type: string; industry: string; note: string; date: string; time: string; createdAt: string }
interface Inquiry { id: string; status: Status; name: string; phone: string; type: string; industry: string; note: string; source?: string; createdAt: string }

const FILTERS: Filter[] = ['전체', '대기', '진행중', '완료']
const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: '전체 현황' },
  { key: 'reservations', label: '예약 관리' },
  { key: 'inquiries', label: '문의 관리' },
  { key: 'analytics', label: '통계' },
]

function pad(n: number) { return String(n).padStart(2, '0') }

function fmt(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'blue' | 'green' }) {
  const accent = color === 'blue' ? 'var(--accent)' : '#16a34a'
  return (
    <div className="admin-stat-card" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem 1.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.55rem' }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: accent, flexShrink: 0 }} />
        <p className="emphasized" style={{ color: 'var(--text-muted)', margin: 0, letterSpacing: '0.01em', fontSize: '0.92rem' }}>{label}</p>
      </div>
      <p style={{ margin: 0, lineHeight: 1, fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: accent }}>
        {value}<span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.2rem' }}>건</span>
      </p>
    </div>
  )
}

function RequestTable({
  title, rows, showSchedule, onStatusChange, onDelete, onExport, onSeeAll,
}: {
  title?: string; rows: (Booking | Inquiry)[]; showSchedule?: boolean
  onStatusChange: (id: string, status: Status) => void
  onDelete: (id: string) => void
  onExport: () => void
  onSeeAll?: () => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const colSpan = showSchedule ? 8 : 7

  return (
    <section>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {title && <h2 className="title-3 emphasized" style={{ color: 'var(--text)', margin: 0 }}>{title}</h2>}
          {onSeeAll && (
            <button onClick={onSeeAll} className="semibold" style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'inherit', padding: 0, whiteSpace: 'nowrap', marginLeft: 'auto', fontSize: '0.95rem' }}>
              전체 보기 →
            </button>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onExport} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid var(--border)', borderRadius: '999px', padding: '0.45rem 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s, color 0.15s' }} className="semibold">
            <Download size={16} /> 엑셀 다운로드
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border)', background: '#fff' }}>
        <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.98rem', textAlign: 'left' }}>
          <thead>
            <tr>
              {['접수일', '이름', '연락처', '제작 종류', ...(showSchedule ? ['희망 일시'] : []), '상태', '관리', ''].map((h) => (
                <th key={h} className="emphasized" style={{ padding: '0.9rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={colSpan} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }} className="subhead">표시할 항목이 없습니다.</td></tr>
            )}
            {rows.map(row => {
              const expanded = expandedId === row.id
              const st = row.status as Status
              const b = row as Booking
              const bd = '1px solid var(--border-subtle)'
              return (
                <Fragment key={row.id}>
                  <tr className="admin-row">
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', borderBottom: bd }}>{fmt(row.createdAt)}</td>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: 'var(--text)', borderBottom: bd }}>{row.name}</td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--text-secondary)', borderBottom: bd }}>{row.phone}</td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', borderBottom: bd }}>{row.type || '-'}</td>
                    {showSchedule && <td style={{ padding: '0.9rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', borderBottom: bd }}>{b.date} {b.time}</td>}
                    <td style={{ padding: '0.9rem 1rem', borderBottom: bd }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', background: STATUS_STYLE[st].bg, color: STATUS_STYLE[st].color, border: STATUS_STYLE[st].border, borderRadius: '7px', padding: '0.3rem 0.8rem', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {STATUS_KO[st]}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', borderBottom: bd }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'nowrap' }}>
                        <ActionBtn active={st === 'in_progress'} onClick={() => onStatusChange(row.id, 'in_progress')}>진행중</ActionBtn>
                        <ActionBtn active={st === 'done'} green onClick={() => onStatusChange(row.id, 'done')}>완료</ActionBtn>
                        <ActionBtn red onClick={() => onDelete(row.id)}>삭제</ActionBtn>
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 0.75rem', textAlign: 'right', borderBottom: bd }}>
                      <button onClick={() => setExpandedId(expanded ? null : row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem' }}>
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                  </tr>
                  {expanded && (
                    <tr style={{ background: 'var(--bg-secondary)' }}>
                      <td colSpan={colSpan} style={{ padding: '1.1rem 1.25rem', borderBottom: bd }}>
                        <dl className="detail-dl">
                          <div><dt className="emphasized" style={{ color: 'var(--text-muted)', marginBottom: '0.3rem', fontSize: '0.85rem' }}>업종</dt><dd style={{ color: 'var(--text-secondary)', margin: 0 }}>{row.industry || '-'}</dd></div>
                          <div><dt className="emphasized" style={{ color: 'var(--text-muted)', marginBottom: '0.3rem', fontSize: '0.85rem' }}>추가요청사항</dt><dd style={{ color: 'var(--text-secondary)', margin: 0, whiteSpace: 'pre-wrap' }}>{row.note || '-'}</dd></div>
                        </dl>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ActionBtn({ children, onClick, red, green, active }: { children: React.ReactNode; onClick: () => void; red?: boolean; green?: boolean; active?: boolean }) {
  let bg = '#fff', border = 'var(--border)', color = 'var(--text-secondary)'
  if (active && green)  { bg = '#dcfce7'; border = '#86efac'; color = '#15803d' }
  else if (active)      { bg = 'var(--accent-light)'; border = '#b9d0f7'; color = 'var(--accent-hover)' }
  else if (red)         { bg = '#fff'; border = '#fca5a5'; color = '#ef4444' }
  return (
    <button onClick={onClick} style={{
      background: bg, border: `1px solid ${border}`, borderRadius: '6px',
      padding: '0.3rem 0.8rem', fontSize: '0.85rem', fontWeight: active ? 700 : 500,
      color, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
    }}>
      {children}
    </button>
  )
}



const STATUS_SEG: { key: Status; label: string; color: string }[] = [
  { key: 'pending', label: '대기', color: '#cbd5e1' },
  { key: 'in_progress', label: '진행중', color: 'var(--accent)' },
  { key: 'done', label: '완료', color: '#22c55e' },
]

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
      {label}
    </span>
  )
}

function AnalyticsView({ bookings, inquiries }: { bookings: Booking[]; inquiries: Inquiry[] }) {
  // ── 최근 14일 일별 접수 ──
  const DAYS = 14
  const today = new Date()
  const buckets: { key: string; label: string; b: number; i: number }[] = []
  for (let n = DAYS - 1; n >= 0; n--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - n)
    buckets.push({ key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, label: `${d.getMonth() + 1}/${d.getDate()}`, b: 0, i: 0 })
  }
  const bidx: Record<string, number> = {}
  buckets.forEach((x, n) => { bidx[x.key] = n })
  const dkey = (iso: string) => { const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` }
  bookings.forEach(r => { const k = dkey(r.createdAt); if (k in bidx) buckets[bidx[k]].b++ })
  inquiries.forEach(r => { const k = dkey(r.createdAt); if (k in bidx) buckets[bidx[k]].i++ })
  const maxDaily = Math.max(1, ...buckets.map(x => Math.max(x.b, x.i)))

  // ── 상태 분포 ──
  const stCount = (arr: { status: Status }[]): Record<Status, number> => ({
    pending: arr.filter(r => r.status === 'pending').length,
    in_progress: arr.filter(r => r.status === 'in_progress').length,
    done: arr.filter(r => r.status === 'done').length,
  })
  const statusRows = [
    { label: '예약', data: stCount(bookings) },
    { label: '문의', data: stCount(inquiries) },
  ]

  // ── 제작 종류별 ──
  const typeCount: Record<string, number> = {}
  projectTypes.forEach(t => { typeCount[t] = 0 })
  ;[...bookings, ...inquiries].forEach(r => { if (r.type in typeCount) typeCount[r.type]++ })
  const maxType = Math.max(1, ...Object.values(typeCount))

  // ── SVG 좌표 ──
  const W = 720, H = 250, padL = 30, padR = 12, padT = 12, padB = 26
  const plotW = W - padL - padR, plotH = H - padT - padB
  const slotW = plotW / DAYS
  const baseY = padT + plotH
  const y = (v: number) => baseY - (v / maxDaily) * plotH
  const cx = (n: number) => padL + n * slotW + slotW / 2
  const gridVals = Array.from(new Set([0, Math.round(maxDaily / 2), maxDaily]))
  const C_B = 'var(--accent)'
  const C_I = '#8b5cf6'

  const card: React.CSSProperties = { background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.4rem 1.5rem' }
  const h3: React.CSSProperties = { margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 최근 14일 접수 추이 */}
      <section style={card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={h3}>최근 14일 접수 추이</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Legend color={C_B} label="예약" />
            <Legend color={C_I} label="문의" />
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', marginTop: '0.9rem' }} role="img" aria-label="최근 14일 예약·문의 접수 추이">
          {gridVals.map(v => (
            <g key={v}>
              <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="var(--border)" strokeWidth={1} />
              <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--text-muted)">{v}</text>
            </g>
          ))}
          {/* 꺾은선 */}
          <polyline fill="none" stroke={C_B} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
            points={buckets.map((d, n) => `${cx(n)},${y(d.b)}`).join(' ')} />
          <polyline fill="none" stroke={C_I} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
            points={buckets.map((d, n) => `${cx(n)},${y(d.i)}`).join(' ')} />
          {/* 마커 + x축 라벨 */}
          {buckets.map((d, n) => (
            <g key={d.key}>
              <circle cx={cx(n)} cy={y(d.b)} r={4} fill="#fff" stroke={C_B} strokeWidth={2}><title>{d.label} · 예약 {d.b}</title></circle>
              <circle cx={cx(n)} cy={y(d.i)} r={4} fill="#fff" stroke={C_I} strokeWidth={2}><title>{d.label} · 문의 {d.i}</title></circle>
              {n % 2 === 1 && <text x={cx(n)} y={H - 8} textAnchor="middle" fontSize={10} fill="var(--text-muted)">{d.label}</text>}
            </g>
          ))}
        </svg>
      </section>

      <div className="analytics-2col">
        {/* 상태 분포 */}
        <section style={card}>
          <h3 style={{ ...h3, marginBottom: '1.1rem' }}>상태 분포</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {statusRows.map(row => {
              const total = row.data.pending + row.data.in_progress + row.data.done
              return (
                <div key={row.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)' }}>{row.label}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{total}건</span>
                  </div>
                  <div style={{ display: 'flex', height: 22, borderRadius: 6, overflow: 'hidden', background: 'var(--bg-secondary)', gap: total ? 2 : 0 }}>
                    {STATUS_SEG.map(seg => {
                      const v = row.data[seg.key]
                      if (!v) return null
                      return <div key={seg.key} title={`${seg.label} ${v}`} style={{ width: `${(v / total) * 100}%`, background: seg.color }} />
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.1rem', flexWrap: 'wrap' }}>
            {STATUS_SEG.map(seg => <Legend key={seg.key} color={seg.color} label={seg.label} />)}
          </div>
        </section>

        {/* 제작 종류별 */}
        <section style={card}>
          <h3 style={{ ...h3, marginBottom: '1.1rem' }}>제작 종류별 건수</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {projectTypes.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ flex: '0 0 132px', fontSize: '0.86rem', color: 'var(--text-secondary)', wordBreak: 'keep-all' }}>{t}</span>
                <div style={{ flex: 1, height: 18, borderRadius: 5, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                  <div style={{ width: `${(typeCount[t] / maxType) * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: 5 }} />
                </div>
                <span style={{ flex: '0 0 30px', textAlign: 'right', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{typeCount[t]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState<Tab>('overview')
  const [filter, setFilter] = useState<Filter>('전체')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('weflow_admin_auth') === 'true') setAuthed(true)
  }, [])

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const [bRes, iRes] = await Promise.all([fetch('/api/bookings'), fetch('/api/inquiries')])
      setBookings(await bRes.json())
      setInquiries(await iRes.json())
    } catch {}
    if (!silent) setLoading(false)
  }, [])

  useEffect(() => { if (authed) load() }, [authed, load])

  // 자동 갱신: 20초 폴링 + 탭 재포커스 시 (조용히 갱신)
  useEffect(() => {
    if (!authed) return
    const id = setInterval(() => load(true), 20000)
    const onFocus = () => load(true)
    window.addEventListener('focus', onFocus)
    return () => { clearInterval(id); window.removeEventListener('focus', onFocus) }
  }, [authed, load])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PW) {
      setAuthed(true)
      localStorage.setItem('weflow_admin_auth', 'true')
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 2000)
    }
  }

  const handleLogout = () => { setAuthed(false); localStorage.removeItem('weflow_admin_auth') }

  const updateStatus = (url: string, id: string, status: Status, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    setter(prev => prev.map((r: any) => r.id === id ? { ...r, status } : r))
    fetch(`${url}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
  }

  const remove = (url: string, id: string, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    setter(prev => prev.filter((r: any) => r.id !== id))
    fetch(`${url}/${id}`, { method: 'DELETE' })
  }

  const filterRows = <T extends { status: Status }>(rows: T[]) =>
    filter === '전체' ? rows : rows.filter(r => STATUS_KO[r.status] === filter)

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '1.5rem' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.75rem 2.75rem 2.75rem', width: '100%', maxWidth: '440px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <Image src="/logo.png" alt="WEFLOW" width={72} height={72} style={{ width: 72, height: 72, margin: '0 auto 0.4rem', display: 'block' }} />
            <h1 className="title-2 emphasized" style={{ margin: '0 0 0.35rem' }}>관리자 로그인</h1>
            <p className="subhead" style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.05rem' }}>WEFLOW 관리자 대시보드</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            <div>
              <label className="subhead semibold" style={{ display: 'block', marginBottom: '0.45rem', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>비밀번호</label>
              <input type="password" className="form-input" placeholder="비밀번호를 입력하세요" value={pw}
                onChange={e => setPw(e.target.value)}
                style={{ borderColor: pwError ? '#ef4444' : undefined, fontSize: '1.05rem', padding: '0.8rem 0.95rem' }} autoFocus />
              {pwError && <p className="footnote" style={{ color: '#ef4444', marginTop: '0.35rem', fontSize: '0.9rem' }}>비밀번호가 올바르지 않습니다.</p>}
            </div>
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}>로그인</button>
          </form>
        </div>
      </div>
    )
  }

  const pendingB = bookings.filter(b => b.status === 'pending').length
  const pendingI = inquiries.filter(i => i.status === 'pending').length
  const filteredB = filterRows(bookings)
  const filteredI = filterRows(inquiries)

  return (
    <div className="admin-wrap" style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>

      {/* ── 데스크탑 사이드바 ── */}
      <aside className="admin-sidebar" style={{
        background: '#fff', borderRight: '1px solid var(--border)',
        flexShrink: 0, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '1.75rem 1.4rem 0' }}>
          <button onClick={() => setTab('overview')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }} title="전체 현황으로">
            <Image src="/logo.png" alt="WEFLOW" width={32} height={32} style={{ width: 32, height: 32 }} />
            <span className="emphasized" style={{ color: 'var(--text)', fontSize: '1.42rem' }}>WEFLOW</span>
          </button>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.02rem', fontWeight: 500 }}>관리자</p>
        </div>
        <nav style={{ padding: '1.1rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              background: tab === t.key ? 'var(--accent)' : 'none',
              color: tab === t.key ? '#fff' : 'var(--text-secondary)',
              border: 'none', borderRadius: '12px',
              padding: '0.85rem 1.1rem', fontSize: '1.12rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              transition: 'all 0.15s', width: '100%',
            }}>{t.label}</button>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.55rem 0.25rem', fontSize: '1.02rem' }} className="semibold">
              <ArrowLeft size={18} /> 사이트로 돌아가기
            </Link>
            <button onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit', padding: '0.55rem 0.25rem', fontSize: '1.02rem' }} className="semibold">
              <LogOut size={18} /> 로그아웃
            </button>
          </div>
        </nav>
      </aside>

      {/* ── 모바일 상단 헤더 ── */}
      <header className="admin-mobile-header" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid var(--border)',
        display: 'none', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={() => setTab('overview')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
            <Image src="/logo.png" alt="WEFLOW" width={26} height={26} style={{ width: 26, height: 26 }} />
            <span className="subhead emphasized" style={{ color: 'var(--text)' }}>WEFLOW</span>
          </button>
          <span className="caption-1 medium" style={{ color: 'var(--text-muted)' }}>관리자</span>
        </div>
        <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.5rem' }}>
          <Menu size={22} />
        </button>
      </header>

      {/* ── 모바일 오버레이 ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className="admin-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.4)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.28s ease',
          display: 'none',
        }}
      />

      {/* ── 모바일 왼쪽 드로어 ── */}
      <div className="admin-drawer" style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 201,
        width: 'min(260px, 80vw)',
        background: '#fff',
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
        display: 'none', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* 드로어 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', height: '72px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => { setTab('overview'); setMenuOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
              <Image src="/logo.png" alt="WEFLOW" width={26} height={26} style={{ width: 26, height: 26 }} />
              <span className="subhead emphasized" style={{ color: 'var(--text)' }}>WEFLOW</span>
            </button>
            <span className="caption-1 medium" style={{ color: 'var(--text-muted)' }}>관리자</span>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>
        {/* 드로어 내비 */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setMenuOpen(false) }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: tab === t.key ? 'var(--accent)' : 'transparent',
              color: tab === t.key ? '#fff' : 'var(--text-secondary)',
              border: 'none', borderRadius: '10px',
              padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              borderLeft: tab === t.key ? 'none' : '3px solid transparent',
              transition: 'all 0.15s', marginBottom: '0.15rem',
            }}>{t.label}</button>
          ))}
        </nav>
        {/* 드로어 하단 */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.4rem 0' }}>
            <ArrowLeft size={16} /> 사이트로 돌아가기
          </Link>
          <button onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', padding: '0.4rem 0' }}>
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </div>

      {/* 메인 */}
      <main className="admin-main" style={{ flex: 1, padding: 'clamp(1.75rem, 3vw, 2.75rem) clamp(1.5rem, 3vw, 2.75rem)', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          {/* 헤더 */}
          <div>
            <p className="footnote emphasized c-accent" style={{ margin: '0 0 0.5rem', letterSpacing: '0.02em' }}>관리자 대시보드</p>
            <h1 className="admin-page-title emphasized" style={{ color: 'var(--text)', margin: '0 0 1.5rem', fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {TABS.find(t => t.key === tab)?.label}
            </h1>
            {tab !== 'analytics' && (
            <div style={{ display: 'grid', gap: '1rem' }} className={tab === 'overview' ? 'stat-grid-4' : 'stat-grid-2'}>
              {tab !== 'inquiries' && (
                <>
                  <StatCard label="전체 예약" value={bookings.length} color="blue" />
                  <StatCard label="대기중 예약" value={pendingB} color="green" />
                </>
              )}
              {tab !== 'reservations' && (
                <>
                  <StatCard label="전체 문의" value={inquiries.length} color="blue" />
                  <StatCard label="대기중 문의" value={pendingI} color="green" />
                </>
              )}
            </div>
            )}
          </div>

          {/* 통계 탭 */}
          {tab === 'analytics' && <AnalyticsView bookings={bookings} inquiries={inquiries} />}

          {/* 필터 + 새로고침 */}
          {tab !== 'analytics' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={filter === f ? 'admin-filter-btn admin-filter-btn-active' : 'admin-filter-btn'}
                  style={{
                    background: filter === f ? 'var(--accent)' : '#fff',
                    color: filter === f ? '#fff' : 'var(--text-secondary)',
                    border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '999px',
                    padding: '0.45rem 1.1rem', fontSize: '0.92rem', fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => load()} disabled={loading} className="admin-refresh-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid var(--border)', borderRadius: '999px', padding: '0.45rem 1.1rem', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'inherit' }}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span className="refresh-label">새로고침</span>
            </button>
          </div>
          )}

          {/* 테이블 */}
          {tab !== 'inquiries' && tab !== 'analytics' && (
            <RequestTable
              title={tab === 'overview' ? '예약 관리' : undefined}
              rows={filteredB}
              showSchedule
              onStatusChange={(id, s) => updateStatus('/api/bookings', id, s, setBookings)}
              onDelete={(id) => remove('/api/bookings', id, setBookings)}
              onExport={() => window.open('/api/export?type=bookings', '_blank')}
              onSeeAll={tab === 'overview' ? () => setTab('reservations') : undefined}
            />
          )}
          {tab !== 'reservations' && tab !== 'analytics' && (
            <RequestTable
              title={tab === 'overview' ? '문의 관리' : undefined}
              rows={filteredI}
              onStatusChange={(id, s) => updateStatus('/api/inquiries', id, s, setInquiries)}
              onDelete={(id) => remove('/api/inquiries', id, setInquiries)}
              onExport={() => window.open('/api/export?type=inquiries', '_blank')}
              onSeeAll={tab === 'overview' ? () => setTab('inquiries') : undefined}
            />
          )}
        </div>
      </main>

      <style>{`
        .admin-wrap { display: flex; flex-direction: row; }
        .admin-sidebar { width: 264px; position: sticky; top: 0; align-self: flex-start; height: 100vh; overflow-y: auto; }
        .admin-stat-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .admin-stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(11,18,32,0.06); }
        .admin-row td { transition: background 0.12s ease; }
        .admin-row:hover td { background: var(--bg-secondary); }
        .stat-grid-4 { grid-template-columns: repeat(4, 1fr); }
        .stat-grid-2 { grid-template-columns: repeat(4, 1fr); }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .detail-dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.95rem; }
        .analytics-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 900px) { .analytics-2col { grid-template-columns: 1fr; } }

        @media (max-width: 768px) {
          .admin-wrap { flex-direction: column; }
          .admin-sidebar { display: none !important; }
          .admin-mobile-header { display: flex !important; }
          .admin-overlay { display: block !important; }
          .admin-drawer { display: flex !important; }
          .stat-grid-4, .stat-grid-2 { grid-template-columns: repeat(2, 1fr); }
          .admin-main { padding: 1.25rem 1rem 5rem !important; }
          .refresh-label { display: none; }
          .admin-refresh-btn { padding: 0.35rem 0.6rem !important; }
        }

        @media (max-width: 480px) {
          .stat-grid-2 { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
          .detail-dl { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
