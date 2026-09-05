"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

/**
 * 템플릿 ↔ WEFLOW 비교 슬라이더 — 가운데 손잡이를 좌우로 끌면
 * 왼쪽은 템플릿 화면, 오른쪽은 WEFLOW 실제 제작 화면이 드러난다.
 * 마우스·터치 드래그와 키보드(숨긴 range 입력) 모두 지원한다.
 */
export default function DiffCompare() {
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // 포인터 위치를 0~100% 로 바꿔 손잡이 위치로 쓴다
  const update = useCallback((clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    setPos((x / r.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <div className="dc-wrap">
      <div
        ref={boxRef}
        className="dc-box"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
      >
        {/* 아래 깔린 WEFLOW 화면 */}
        <Image
          src="/images/cases/cases-kpsc/cases-kpsc-01.webp"
          alt="WEFLOW가 제작한 KPSC 홈페이지 화면"
          fill
          sizes="(max-width: 768px) 100vw, 1000px"
          style={{ objectFit: "cover", objectPosition: "top" }}
          draggable={false}
        />
        {/* 위에 겹친 템플릿 화면 — 손잡이 왼쪽만 보인다 */}
        <div className="dc-top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src="/images/difference/template-site.webp"
            alt="흔한 템플릿 홈페이지 화면"
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            style={{ objectFit: "cover", objectPosition: "top" }}
            draggable={false}
          />
        </div>

        {/* 좌우 라벨 */}
        <span className="dc-tag dc-tag--tpl" style={{ opacity: pos > 18 ? 1 : 0 }}>
          템플릿(예전 기술)
        </span>
        <span className="dc-tag dc-tag--we" style={{ opacity: pos < 82 ? 1 : 0 }}>
          WEFLOW
        </span>

        {/* 손잡이 */}
        <div className="dc-handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="dc-knob">
            <ChevronsLeftRight size={14} strokeWidth={2.5} />
          </span>
        </div>

        {/* 키보드·스크린리더용 — 화면엔 안 보이지만 방향키로 움직인다 */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="템플릿과 WEFLOW 화면 비교 위치"
          className="dc-range"
        />
      </div>
      <p className="dc-hint">
        <ChevronsLeftRight size={16} strokeWidth={2.5} /> 가운데를 잡고 좌우로 밀어보세요
      </p>

      <style>{`
        .dc-wrap { max-width: 1000px; margin: 0 auto; }
        .dc-box {
          position: relative;
          width: 100%;
          /* KPSC 캡처(1920×963)와 같은 비율 — 좌우가 안 잘린다. 템플릿 쪽은 위쪽만 보이면 충분하다 */
          aspect-ratio: 2 / 1;
          border-radius: var(--radius-2xl);
          border: 1px solid var(--border);
          overflow: hidden;
          background: var(--surface-container);
          cursor: ew-resize;
          user-select: none;
          -webkit-user-select: none;
          touch-action: pan-y;
        }
        .dc-top { position: absolute; inset: 0; }
        .dc-tag {
          position: absolute;
          top: 0.9rem;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .dc-tag--tpl { left: 0.9rem; background: rgba(239,68,68,0.9); color: #fff; }
        .dc-tag--we { right: 0.9rem; background: var(--accent-strong); color: #fff; }
        .dc-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #fff;
          transform: translateX(-1px);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
          pointer-events: none;
        }
        .dc-knob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          background: #fff;
          color: var(--accent-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }
        .dc-range {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          margin: 0;
          pointer-events: none;
        }
        .dc-box:has(.dc-range:focus-visible) { outline: 2px solid var(--accent); }
        .dc-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          margin: 0.8rem 0 0;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
