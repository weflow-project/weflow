'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback, Fragment } from 'react'
import { LogOut, Menu, X, RefreshCw, ChevronDown, ChevronUp, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ADMIN_PW = 'weflow'

type Status = 'pending' | 'in_progress' | 'done'
type Tab = 'overview' | 'reservations' | 'inquiries'
type Filter = '전체' | '대기' | '진행중' | '완료'

const STATUS_KO: Record<Status, string> = { pending: '대기', in_progress: '진행중', done: '완료' }
const STATUS_EN: Record<string, Status> = { '대기': 'pending', '진행중': 'in_progress', '완료': 'done' }
const STATUS_STYLE: Record<Status, { bg: string; color: string; border: string }> = {
  pending:     { bg: '#f9fafb', color: '#6b7280', border: '1px solid #d1d5db' },
  in_progress: { bg: '#ebf2ff', color: '#2861c9', border: '1px solid #b9d0f7' },
  done:        { bg: '#f0fdf4', color: '#15803d', border: '1px solid #86efac' },
}
const ACT_BG = '#f9fafb'


interface Booking { id: string; status: Status; name: string; phone: string; type: string; industry: string; note: string; date: string; time: string; createdAt: string }
interface Inquiry { id: string; status: Status; name: string; phone: string; type: string; industry: string; note: string; source?: string; createdAt: string }

const FILTERS: Filter[] = ['전체', '대기', '진행중', '완료']
const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: '전체 현황' },
  { key: 'reservations', label: '예약 관리' },
  { key: 'inquiries', label: '문의 관리' },
]

function fmt(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'blue' | 'green' }) {
  return (
    <div className="admin-stat-card" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '1rem 1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <p className="admin-stat-label caption-1 emphasized" style={{ color: '#9ca3af', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p className="title-1" style={{ color: color === 'blue' ? '#3373df' : '#16a34a', margin: 0 }}>{value}건</p>
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
          {title && <h2 className="headline" style={{ color: '#111827', margin: 0 }}>{title}</h2>}
          {onSeeAll && (
            <button onClick={onSeeAll} className="footnote semibold" style={{ background: 'none', border: 'none', color: '#3373df', cursor: 'pointer', fontFamily: 'inherit', padding: 0, whiteSpace: 'nowrap', marginLeft: 'auto' }}>
              전체 보기 →
            </button>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onExport} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '999px', padding: '0.35rem 0.85rem', color: '#4b5563', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s, color 0.15s' }} className="caption-1 semibold">
            <Download size={14} /> 엑셀 다운로드
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #e5e7eb', background: '#fff' }}>
        <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr>
              {['접수일', '이름', '연락처', '제작종류', ...(showSchedule ? ['희망 일시'] : []), '상태', '관리', ''].map((h, i, arr) => {
                const isAction = i >= arr.length - 3
                return (
                  <th key={h} className="caption-1 emphasized" style={{ padding: '0.75rem 1rem', color: '#9ca3af', whiteSpace: 'nowrap', borderBottom: '1px solid #f3f4f6', background: isAction ? ACT_BG : undefined }}>
                    {h}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={colSpan} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', borderBottom: '1px solid #f9fafb' }} className="subhead">표시할 항목이 없습니다.</td></tr>
            )}
            {rows.map(row => {
              const expanded = expandedId === row.id
              const st = row.status as Status
              const b = row as Booking
              const bd = '1px solid #f3f4f6'
              return (
                <Fragment key={row.id}>
                  <tr>
                    <td style={{ padding: '0.85rem 1rem', color: '#9ca3af', whiteSpace: 'nowrap', borderBottom: bd }}>{fmt(row.createdAt)}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#111827', borderBottom: bd }}>{row.name}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#6b7280', borderBottom: bd }}>{row.phone}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#6b7280', whiteSpace: 'nowrap', borderBottom: bd }}>{row.type || '-'}</td>
                    {showSchedule && <td style={{ padding: '0.85rem 1rem', color: '#6b7280', whiteSpace: 'nowrap', borderBottom: bd }}>{b.date} {b.time}</td>}
                    <td style={{ padding: '0.85rem 1rem', borderBottom: bd, background: ACT_BG }}>
                      <span style={{ background: STATUS_STYLE[st].bg, color: STATUS_STYLE[st].color, border: STATUS_STYLE[st].border, borderRadius: '6px', padding: '0.2rem 0.65rem', whiteSpace: 'nowrap' }} className="caption-1 emphasized">
                        {STATUS_KO[st]}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', borderBottom: bd, background: ACT_BG }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'nowrap' }}>
                        <ActionBtn active={st === 'in_progress'} onClick={() => onStatusChange(row.id, 'in_progress')}>진행중</ActionBtn>
                        <ActionBtn active={st === 'done'} green onClick={() => onStatusChange(row.id, 'done')}>완료</ActionBtn>
                        <ActionBtn red onClick={() => onDelete(row.id)}>삭제</ActionBtn>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right', borderBottom: bd, background: ACT_BG }}>
                      <button onClick={() => setExpandedId(expanded ? null : row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem' }}>
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                  </tr>
                  {expanded && (
                    <tr style={{ background: '#f9fafb' }}>
                      <td colSpan={colSpan} style={{ padding: '1rem 1.25rem', borderBottom: bd }}>
                        <dl className="detail-dl">
                          <div><dt className="caption-1 emphasized" style={{ color: '#9ca3af', marginBottom: '0.25rem' }}>업종</dt><dd style={{ color: '#374151', margin: 0 }}>{row.industry || '-'}</dd></div>
                          <div><dt className="caption-1 emphasized" style={{ color: '#9ca3af', marginBottom: '0.25rem' }}>추가요청사항</dt><dd style={{ color: '#374151', margin: 0, whiteSpace: 'pre-wrap' }}>{row.note || '-'}</dd></div>
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
  let bg = '#fff', border = '#e5e7eb', color = '#6b7280'
  if (active && green)  { bg = '#dcfce7'; border = '#86efac'; color = '#15803d' }
  else if (active)      { bg = '#ebf2ff'; border = '#b9d0f7'; color = '#2861c9' }
  else if (red)         { bg = '#fff'; border = '#fca5a5'; color = '#ef4444' }
  return (
    <button onClick={onClick} style={{
      background: bg, border: `1px solid ${border}`, borderRadius: '6px',
      padding: '0.2rem 0.65rem', fontSize: '0.75rem', fontWeight: active ? 700 : 500,
      color, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
    }}>
      {children}
    </button>
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

  const load = useCallback(async () => {
    setLoading(true)
    const [bRes, iRes] = await Promise.all([fetch('/api/bookings'), fetch('/api/inquiries')])
    setBookings(await bRes.json())
    setInquiries(await iRes.json())
    setLoading(false)
  }, [])

  useEffect(() => { if (authed) load() }, [authed, load])

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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', padding: '1.5rem' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '380px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Image src="/logo.png" alt="WEFLOW" width={40} height={40} style={{ width: 40, height: 40, margin: '0 auto 0.75rem', display: 'block' }} />
            <h1 className="title-3 emphasized" style={{ margin: '0 0 0.25rem' }}>관리자 로그인</h1>
            <p className="subhead" style={{ color: '#9ca3af', margin: 0 }}>WEFLOW 관리자 대시보드</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="subhead semibold" style={{ display: 'block', marginBottom: '0.35rem', color: '#374151' }}>비밀번호</label>
              <input type="password" className="form-input" placeholder="비밀번호를 입력하세요" value={pw}
                onChange={e => setPw(e.target.value)}
                style={{ borderColor: pwError ? '#ef4444' : undefined }} autoFocus />
              {pwError && <p className="footnote" style={{ color: '#ef4444', marginTop: '0.25rem' }}>비밀번호가 올바르지 않습니다.</p>}
            </div>
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem' }}>로그인</button>
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
    <div className="admin-wrap" style={{ minHeight: '100vh', background: '#f9fafb' }}>

      {/* ── 데스크탑 사이드바 ── */}
      <aside className="admin-sidebar" style={{
        background: '#fff', borderRight: '1px solid #e5e7eb',
        flexShrink: 0, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '1.5rem 1.25rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <Image src="/logo.png" alt="WEFLOW" width={26} height={26} style={{ width: 26, height: 26 }} />
            <span className="headline emphasized" style={{ color: '#111827' }}>WEFLOW</span>
          </div>
          <p className="caption-1" style={{ color: '#9ca3af', margin: 0 }}>관리자</p>
        </div>
        <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              background: tab === t.key ? '#3373df' : 'none',
              color: tab === t.key ? '#fff' : '#6b7280',
              border: 'none', borderRadius: '12px',
              padding: '0.6rem 1rem', fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              transition: 'all 0.15s', width: '100%',
            }}>{t.label}</button>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="subhead semibold">
              <ArrowLeft size={16} /> 사이트로 돌아가기
            </Link>
            <button onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontFamily: 'inherit', padding: '0.5rem 0.25rem' }} className="subhead semibold">
              <LogOut size={16} /> 로그아웃
            </button>
          </div>
        </nav>
      </aside>

      {/* ── 모바일 상단 헤더 ── */}
      <header className="admin-mobile-header" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        display: 'none', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image src="/logo.png" alt="WEFLOW" width={26} height={26} style={{ width: 26, height: 26 }} />
          <span className="subhead emphasized" style={{ color: '#111827' }}>WEFLOW</span>
          <span className="caption-1 medium" style={{ color: '#9ca3af' }}>관리자</span>
        </div>
        <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '0.5rem' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', height: '72px', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/logo.png" alt="WEFLOW" width={26} height={26} style={{ width: 26, height: 26 }} />
            <span className="subhead emphasized" style={{ color: '#111827' }}>WEFLOW</span>
            <span className="caption-1 medium" style={{ color: '#9ca3af' }}>관리자</span>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>
        {/* 드로어 내비 */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setMenuOpen(false) }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: tab === t.key ? '#3373df' : 'transparent',
              color: tab === t.key ? '#fff' : '#374151',
              border: 'none', borderRadius: '10px',
              padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              borderLeft: tab === t.key ? 'none' : '3px solid transparent',
              transition: 'all 0.15s', marginBottom: '0.15rem',
            }}>{t.label}</button>
          ))}
        </nav>
        {/* 드로어 하단 */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#6b7280', textDecoration: 'none', padding: '0.4rem 0' }}>
            <ArrowLeft size={16} /> 사이트로 돌아가기
          </Link>
          <button onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', cursor: 'pointer', fontFamily: 'inherit', padding: '0.4rem 0' }}>
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </div>

      {/* 메인 */}
      <main className="admin-main" style={{ flex: 1, padding: '2rem 1.5rem', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 헤더 */}
          <div>
            <h1 className="admin-page-title title-3 emphasized" style={{ color: '#111827', margin: '0 0 1rem' }}>
              {TABS.find(t => t.key === tab)?.label}
            </h1>
            <div style={{ display: 'grid', gap: '0.75rem' }} className={tab === 'overview' ? 'stat-grid-4' : 'stat-grid-2'}>
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
          </div>

          {/* 필터 + 새로고침 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={filter === f ? 'admin-filter-btn admin-filter-btn-active' : 'admin-filter-btn'}
                  style={{
                    background: filter === f ? '#3373df' : '#fff',
                    color: filter === f ? '#fff' : '#6b7280',
                    border: '1px solid #e5e7eb', borderRadius: '999px',
                    padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <button onClick={load} disabled={loading} className="admin-refresh-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700, color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit' }}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span className="refresh-label">새로고침</span>
            </button>
          </div>

          {/* 테이블 */}
          {tab !== 'inquiries' && (
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
          {tab !== 'reservations' && (
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
        .admin-sidebar { width: 220px; }
        .stat-grid-4 { grid-template-columns: repeat(4, 1fr); }
        .stat-grid-2 { grid-template-columns: repeat(2, 1fr); max-width: 360px; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .detail-dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.85rem; }

        @media (max-width: 768px) {
          .admin-wrap { flex-direction: column; }
          .admin-sidebar { display: none !important; }
          .admin-mobile-header { display: flex !important; }
          .admin-overlay { display: block !important; }
          .admin-drawer { display: flex !important; }
          .stat-grid-4 { grid-template-columns: repeat(2, 1fr); }
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
