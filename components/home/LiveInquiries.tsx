'use client'
// 실시간 홈페이지 문의 보드 (연출용 데이터).
// 8~15초 간격으로 새 문의가 맨 위로 슬라이드 인, 기존 행은 시간이 밀려 내려가고 마지막 행 제거.
import { useEffect, useRef, useState } from 'react'
import {
  LIVE_INQUIRY_TYPES,
  LIVE_REGIONS,
  LIVE_SURNAMES,
} from '@/data/solution'

type Row = { id: number; region: string; name: string; inquiry: string }

// 표시 시간 — 행 위치별 고정 라벨 (위에서부터)
const AGE_LABELS = ['방금 전', '1분 전', '3분 전', '9분 전', '14분 전']

// 마스킹 이름 뒷글자 후보 — 성 + '*' + 한 글자
const NAME_TAILS = [
  '준', '수', '영', '희', '민', '아', '현', '서', '호', '경',
  '울', '빈', '연', '재', '지', '태', '솔', '미', '우', '란',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeRow(id: number): Row {
  return {
    id,
    region: pick(LIVE_REGIONS),
    name: `${pick(LIVE_SURNAMES)}*${pick(NAME_TAILS)}`,
    inquiry: pick(LIVE_INQUIRY_TYPES),
  }
}

export default function LiveInquiries() {
  // 서버·클라이언트 렌더 결과가 달라지면 하이드레이션 경고가 나므로,
  // 최초에는 비워두고 마운트 후 클라이언트에서만 무작위 행을 채운다.
  const [rows, setRows] = useState<Row[]>([])
  const [spinning, setSpinning] = useState(false)
  const nextId = useRef(0)

  useEffect(() => {
    setRows(Array.from({ length: 5 }, () => makeRow(nextId.current++)))

    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!document.hidden) {
        setRows((prev) => [makeRow(nextId.current++), ...prev].slice(0, 5))
        setSpinning(true)
        setTimeout(() => setSpinning(false), 700)
      }
      timer = setTimeout(tick, 8000 + Math.random() * 7000)
    }
    timer = setTimeout(tick, 6000)
    return () => clearTimeout(timer)
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
          <li key={r.id} className={`live-row ${i === 0 ? 'live-row--in' : ''}`}>
            <span className="live-region">
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
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="live-region__text">{r.region}</span>
            </span>
            <span className="live-name">{r.name}</span>
            <span className="live-inquiry">{r.inquiry}</span>
            <span className="live-age">{AGE_LABELS[i]}</span>
          </li>
        ))}
        {/* 마운트 전에는 높이만 잡아둬 레이아웃이 튀지 않게 한다 */}
        {rows.length === 0 && <li className="live-row live-row--skeleton" aria-hidden="true" />}
      </ul>

      <style>{`
        .live-card {
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

        .live-list { margin: 0; padding: 0; list-style: none; }
        .live-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1.25rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8rem;
        }
        .live-row--skeleton { height: 2.9rem; }
        .live-row--in { animation: liveRowIn 0.5s ease; }
        .live-region {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          width: 7.4rem;
          flex-shrink: 0;
        }
        .live-region__text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          color: var(--text);
        }
        .live-name { width: 3rem; flex-shrink: 0; color: var(--text-muted); }
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
          .live-head { padding: 1rem 1.5rem; }
          .live-title { font-size: 1rem; }
          .live-updated { font-size: 0.75rem; }
          .live-row { gap: 1.5rem; padding: 0.85rem 1.5rem; font-size: 0.875rem; }
          .live-region { width: 9rem; }
          .live-name { width: 4rem; }
        }

        @keyframes liveRowIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes livePing {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes liveSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .live-row--in, .live-dot__ping, .live-spin { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
