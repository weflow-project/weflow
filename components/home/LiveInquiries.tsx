'use client'
// 실시간 홈페이지 문의 보드 (연출용 데이터).
// 3~7초 불규칙 간격으로 새 문의가 맨 위에서 밀고 내려오고(높이가 펴지며 아래 행들을 자연스럽게 밀어냄),
// 맨 아래 행은 접히며 페이드 아웃. 새 행은 등장 순간 배경이 노랗게 1초쯤 반짝인 뒤 원래 색으로 돌아온다.
// 시간 라벨은 행마다 제각각(서로 겹치지 않는 분 단위)이며, 새 행이 들어올 때 불규칙하게 벌어지고 1분마다 실제로 1씩 늘어난다.
import { useEffect, useRef, useState } from 'react'
import {
  LIVE_INDUSTRIES,
  LIVE_INQUIRY_TYPES,
  LIVE_SURNAMES,
} from '@/data/solution'

type Row = { id: number; industry: string; name: string; inquiry: string; minutes: number } // minutes: 'N분 전' (0 = 방금 전)

const VISIBLE = 5 // 동시에 보이는 행 수
const INITIAL_MINUTES = [1, 8, 13, 17, 26] // 첫 화면 시간 (위에서부터, 전부 다르게)

function ageLabel(m: number) {
  if (m <= 0) return '방금 전'
  if (m < 60) return `${m}분 전`
  return `${Math.floor(m / 60)}시간 전`
}

// 2~9분 사이 불규칙한 간격 — 행마다 다르게 벌어지도록
const randomGap = () => 2 + Math.floor(Math.random() * 8)

// 마스킹 이름 뒷글자 후보 — 성 + '*' + 한 글자
const NAME_TAILS = [
  '준', '수', '영', '희', '민', '아', '현', '서', '호', '경',
  '울', '빈', '연', '재', '지', '태', '솔', '미', '우', '란',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeRow(id: number, minutes = 0): Row {
  return {
    id,
    industry: pick(LIVE_INDUSTRIES),
    name: `${pick(LIVE_SURNAMES)}*${pick(NAME_TAILS)}`,
    inquiry: pick(LIVE_INQUIRY_TYPES),
    minutes,
  }
}

export default function LiveInquiries() {
  // 서버·클라이언트 렌더 결과가 달라지면 하이드레이션 경고가 나므로,
  // 최초에는 비워두고 마운트 후 클라이언트에서만 무작위 행을 채운다.
  const [rows, setRows] = useState<Row[]>([])
  const [spinning, setSpinning] = useState(false)
  const nextId = useRef(0)
  const trimTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setRows(INITIAL_MINUTES.slice(0, VISIBLE).map((m) => makeRow(nextId.current++, m)))

    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!document.hidden) {
        setRows((prev) => {
          // 새 행은 '방금 전', 기존 행은 위 행보다 2~9분씩 불규칙하게 뒤로 밀려 전부 다른 시간이 되게.
          // 마지막 행은 바로 지우지 않고 VISIBLE+1 개로 두어 접힘(퇴장) 애니메이션을 보여준 뒤 아래에서 잘라낸다.
          const next: Row[] = [makeRow(nextId.current++, 0)]
          for (const r of prev.slice(0, VISIBLE)) {
            const above = next[next.length - 1].minutes
            next.push({ ...r, minutes: Math.max(above + randomGap(), r.minutes + 1) })
          }
          return next
        })
        setSpinning(true)
        setTimeout(() => setSpinning(false), 700)
        if (trimTimer.current) clearTimeout(trimTimer.current)
        trimTimer.current = setTimeout(() => setRows((p) => p.slice(0, VISIBLE)), 650)
      }
      // 딱딱 떨어지는 고정 주기보다 3~7초 랜덤이 실제 문의처럼 보인다
      timer = setTimeout(tick, 3000 + Math.random() * 4000)
    }
    timer = setTimeout(tick, 3500)
    return () => {
      clearTimeout(timer)
      if (trimTimer.current) clearTimeout(trimTimer.current)
    }
  }, [])

  // 1분마다 모든 행의 시간이 실제로 1분씩 흐른다 ('방금 전' → '1분 전' → …)
  useEffect(() => {
    const t = setInterval(
      () => setRows((prev) => prev.map((r) => ({ ...r, minutes: r.minutes + 1 }))),
      60_000,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <div className="live-card">
      {/* 헤더: LIVE 배지 + 업데이트 표시 */}
      <div className="live-head">
        <p className="live-title">
          <span aria-hidden="true" className="live-dot">
            <span className="live-dot__ping" />
            <span className="live-dot__core" />
          </span>
          <span className="live-badge">LIVE</span>
          실시간 홈페이지 문의
        </p>
        <p className="live-updated">
          방금 전 업데이트
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={spinning ? 'live-spin' : ''}
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
          </svg>
        </p>
      </div>

      {/* 목록 — 지역 / 이름(마스킹) / 문의 내용 / 시간 */}
      <ul aria-label="실시간 홈페이지 문의 목록" className="live-list">
        {rows.map((r, i) => (
          <li key={r.id} className={`live-row${i === 0 ? ' live-row--in' : ''}${i === VISIBLE ? ' live-row--out' : ''}`}>
            <span className="live-industry">
              {/* 업종 — 차양 달린 상점 아이콘 (lucide store) */}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ flexShrink: 0, color: 'var(--accent)' }}
              >
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
              </svg>
              <span className="live-industry__text">{r.industry}</span>
            </span>
            <span className="live-name">{r.name}</span>
            <span className="live-inquiry">{r.inquiry}</span>
            <span className="live-age">{ageLabel(r.minutes)}</span>
          </li>
        ))}
        {/* 마운트 전에는 높이만 잡아둬 레이아웃이 튀지 않게 한다 */}
        {rows.length === 0 && <li className="live-row live-row--skeleton" aria-hidden="true" />}
      </ul>

      <style>{`
        .live-card {
          --live-row-h: 2.6rem; /* 행 높이 고정 — 목록 전체 높이(5행)를 못 박아 페이지가 안 움직이게 */
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          background: var(--surface);
          box-shadow: var(--shadow-card);
        }
        .live-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.9rem 1.25rem;
        }
        .live-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text);
          word-break: keep-all;
        }
        .live-dot { position: relative; display: flex; width: 8px; height: 8px; flex-shrink: 0; }
        .live-dot__ping {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #ef4444;
          opacity: 0.6;
          animation: livePing 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .live-dot__core {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #ef4444;
          animation: liveBreath 1.4s ease-in-out infinite;
        }
        .live-badge { color: #f87171; letter-spacing: 0.12em; font-weight: 800; }
        .live-updated {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin: 0;
          font-size: 0.7rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .live-spin { animation: liveSpin 0.7s linear; }

        /* 목록 높이를 5행으로 고정 — 새 행이 들어오고 나가는 동안(잠시 6행)에도
           바깥 레이아웃은 그대로라 스크롤 위치가 흔들리지 않는다 */
        .live-list {
          margin: 0;
          padding: 0;
          list-style: none;
          height: calc(var(--live-row-h) * 5);
          overflow: hidden;
        }
        .live-row {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          height: var(--live-row-h);
          padding: 0 1.25rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8rem;
        }
        .live-row--skeleton { height: var(--live-row-h); }
        /* 새 행 — 높이가 0에서 펴지며 아래 행들을 밀고 내려오고,
           자리를 잡는 순간 배경이 노랗게 반짝였다가 1초에 걸쳐 원래 색으로 */
        .live-row--in {
          overflow: hidden;
          animation:
            liveRowIn 0.55s cubic-bezier(0.25, 0.8, 0.4, 1),
            liveRowFlash 1.1s ease-out 0.25s backwards;
        }
        /* 마지막 행 — 접히며 페이드 아웃 (650ms 뒤 목록에서 실제 제거) */
        .live-row--out {
          overflow: hidden;
          animation: liveRowOut 0.55s cubic-bezier(0.55, 0, 0.75, 0.6) forwards;
        }
        /* 업종 칸 — 가장 긴 "역사 관련 업종"이 들어갈 만큼만.
           넓게 잡으면 오른쪽 "랜딩형 홈페이지 문의"가 잘린다 */
        .live-industry {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          width: 5.9rem;
          flex-shrink: 0;
        }
        .live-industry__text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          color: var(--text);
        }
        .live-name { width: 2.8rem; flex-shrink: 0; color: var(--text-muted); }
        .live-inquiry {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-secondary);
        }
        .live-age { flex-shrink: 0; font-size: 0.7rem; color: var(--text-muted); }

        @media (min-width: 769px) {
          .live-card { --live-row-h: 3rem; }
          .live-head { padding: 1rem 1.5rem; }
          .live-title { font-size: 1rem; }
          .live-updated { font-size: 0.75rem; }
          .live-row { gap: 2.25rem; padding: 0 1.5rem; font-size: 0.875rem; }
          .live-industry { width: 8rem; }
          .live-name { width: 4rem; }
        }

        @keyframes liveRowIn {
          from { height: 0; opacity: 0; transform: translateY(-6px); }
          60% { opacity: 0.35; }
          to { height: var(--live-row-h); opacity: 1; transform: none; }
        }
        /* 등장 플래시 — 사이트 형광펜 색(245,179,1) 계열의 옅은 노랑 */
        @keyframes liveRowFlash {
          from { background-color: rgba(245, 179, 1, 0.2); }
          to { background-color: transparent; }
        }
        @keyframes liveRowOut {
          from { height: var(--live-row-h); opacity: 1; }
          to { height: 0; border-top-width: 0; opacity: 0; }
        }
        @keyframes livePing {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        /* 붉은 점 — 퍼지는 링에 더해 점 자체도 숨쉬듯 커졌다 작아진다 */
        @keyframes liveBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes liveSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .live-row--in, .live-row--out, .live-dot__ping, .live-dot__core, .live-spin { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
