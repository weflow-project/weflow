'use client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'

// 히어로 대표 이미지 10장 (main-hero-01 ~ 10)
const SLIDES = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/main/main-hero-${String(i + 1).padStart(2, '0')}.png`,
  label: `대표 이미지 ${i + 1}`,
}))
const COUNT = SLIDES.length
const INTERVAL = 3000
const DURATION = 600

/**
 * 같은 목록을 3벌 이어붙인 것 — 앞뒤 한 벌씩이 여벌이다.
 * 뒤쪽 장이 앞에, 앞쪽 장이 뒤에 있으니
 * 끝에서 처음으로 넘어갈 때도 계속 오른쪽으로 미는 것처럼 보인다.
 *
 * 여벌을 한 벌씩 통째로 두는 이유 —
 * 가운데 장 옆으로 남는 폭은 (화면폭 - 760px) ÷ 2 라 화면이 넓을수록 커진다.
 * 몇 장만 덧대면 어떤 배율에서는 또 모자라 첫 장·끝 장에서 옆이 빈다.
 * 한 벌(10장)이면 어떤 배율에서도 덮으므로 이 문제가 아예 없어진다.
 * 실제 순번 p 는 여기서 p + COUNT 번째 자리(가운데 벌)에 해당한다.
 */
const RENDER = [...SLIDES, ...SLIDES, ...SLIDES]

/**
 * 히어로 하단 대표 이미지 캐러셀.
 * 가운데 한 장을 크게 두고 양옆 장이 걸쳐 보인다 — 옆에 더 있다는 게 바로 읽힌다.
 * 3초마다 한 방향으로만 넘어가고, 아래 막대를 눌러 원하는 장으로 바로 갈 수 있다.
 */
export default function HeroCarousel() {
  // 순번 — 여벌로 넘어간 동안만 잠깐 -1 이나 COUNT 가 된다
  const [p, setP] = useState(0)
  // 여벌에서 제자리로 되돌리는 순간에는 움직임을 꺼서 되감기가 보이지 않게 한다
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const outside = p < 0 || p >= COUNT

  // 여벌까지 밀고 난 뒤, 움직임 없이 같은 그림의 제자리로 바꿔둔다
  useEffect(() => {
    if (!outside) return
    const id = setTimeout(() => {
      setAnimate(false)
      setP(p < 0 ? COUNT - 1 : 0)
    }, DURATION)
    return () => clearTimeout(id)
  }, [p, outside])

  // 자리를 바꾼 게 화면에 반영된 뒤 다시 움직임을 켠다
  useEffect(() => {
    if (animate) return
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [animate])

  // 3초 자동 전환 (수동 조작·호버·막대를 끄는 동안 타이머 리셋·정지)
  useEffect(() => {
    if (paused || dragging || outside || !animate) return
    const id = setTimeout(() => setP(v => v + 1), INTERVAL)
    return () => clearTimeout(id)
  }, [p, paused, dragging, outside, animate])

  // 막대를 끌어 이동 — 짚은 지점이 막대의 몇 번째 칸인지로 순번을 정한다
  const seek = (clientX: number) => {
    const rect = barRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (clientX - rect.left) / rect.width
    setP(Math.min(COUNT - 1, Math.max(0, Math.floor(ratio * COUNT))))
  }
  const onBarDown = (e: React.PointerEvent) => {
    // 손이 막대 밖으로 벗어나도 계속 따라오게 포인터를 잡아둔다
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    seek(e.clientX)
  }
  const onBarMove = (e: React.PointerEvent) => {
    if (dragging) seek(e.clientX)
  }
  const onBarUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    setDragging(false)
  }

  // 모바일 스와이프 — 좌우 40px 넘게 끌면 이전/다음 장으로
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || outside) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) setP(v => v + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  return (
    <div
      className="hero-car"
      data-animate={animate}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="group"
      aria-roledescription="carousel"
      aria-label="대표 이미지"
    >
      {/* 슬라이드 트랙 — 짚은 장이 가운데 오도록 통째로 민다 */}
      <div className="hero-car-viewport">
        <div className="hero-car-track" style={{ '--i': p + COUNT } as CSSProperties}>
          {RENDER.map((s, j) => (
            <div
              key={j}
              className="hero-car-slide"
              // 여벌은 같은 그림이 두 번 읽히지 않게 감춘다
              aria-hidden={j < COUNT || j >= COUNT * 2}
            >
              <Image
                src={s.src}
                alt={s.label}
                fill
                sizes="(max-width: 720px) 90vw, 840px"
                style={{ objectFit: 'cover' }}
                priority={j === COUNT}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 아래 진행 막대 — 끊김 없는 한 줄 위로 표시가 미끄러진다.
          잡고 좌우로 끌면 그 자리의 사진으로 넘어간다 (모바일에서는 숨기고 손으로 민다) */}
      <div
        ref={barRef}
        className="hero-car-barwrap"
        data-dragging={dragging}
        onPointerDown={onBarDown}
        onPointerMove={onBarMove}
        onPointerUp={onBarUp}
        onPointerCancel={onBarUp}
      >
        <div className="hero-car-bar">
          <span
            className="hero-car-thumb"
            style={{ '--i': p, '--n': COUNT } as CSSProperties}
          />
        </div>
        {/* 눌러서 바로 이동 — 선을 나눠 보이지 않게 투명한 칸만 겹쳐 둔다 */}
        <div className="hero-car-hit" role="tablist" aria-label="이미지 선택">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === ((p % COUNT) + COUNT) % COUNT}
              aria-label={s.label}
              onClick={() => setP(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* 가운데 1150px 틀을 벗어나 화면 폭 전체를 쓴다 —
           양옆 장이 틀에서 잘리지 않고 화면 끝까지 이어져 보인다.
           (html·body 에 overflow-x: clip 이 있어 가로 스크롤은 생기지 않는다) */
        .hero-car {
          width: 100vw;
          /* 부모가 가운데 정렬 플렉스라 이걸 빼면 내용물 크기로 쪼그라든다 */
          flex-shrink: 0;
          margin-top: clamp(2rem, 5vw, 3rem);
        }
        /* 양옆으로 걸친 장이 화면 밖으로 흘러가면 잘리게 */
        .hero-car-viewport { overflow: hidden; }
        .hero-car-track {
          /* 가운데 장의 폭 — 화면이 넓어도 900px 를 넘기지 않아,
             남는 자리는 양옆 장이 화면 끝까지 채운다 */
          --sw: min(54%, 760px);
          --gap: 16px;
          display: flex;
          gap: var(--gap);
          /* (남는 폭 ÷ 2) 만큼 밀어 한 장을 가운데 맞추고, 지나온 장 수만큼 더 민다 */
          transform: translateX(calc((100% - var(--sw)) / 2 - var(--i) * (var(--sw) + var(--gap))));
          transition: transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-car-slide {
          position: relative;
          flex: 0 0 var(--sw);
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          background: var(--bg-secondary);
        }

        /* 여벌에서 제자리로 되돌리는 한 프레임 — 움직임을 꺼서 되감기를 감춘다 */
        .hero-car[data-animate="false"] .hero-car-track,
        .hero-car[data-animate="false"] .hero-car-thumb { transition: none; }

        /* 아래 막대 — 끊기지 않은 한 줄 */
        .hero-car-barwrap {
          position: relative;
          width: clamp(200px, 40%, 320px);
          margin: clamp(1rem, 2.5vw, 1.5rem) auto 0;
          cursor: grab;
          /* 끄는 도중 글자·사진이 딸려 선택되지 않게 */
          touch-action: none;
          user-select: none;
        }
        .hero-car-barwrap[data-dragging="true"] { cursor: grabbing; }
        /* 끄는 동안엔 손끝을 바로 따라오도록 미끄러지는 시간을 줄인다 */
        .hero-car-barwrap[data-dragging="true"] .hero-car-thumb { transition-duration: 120ms; }
        .hero-car-bar {
          height: 8px;
          border-radius: 9999px;
          background: var(--border);
          overflow: hidden;
        }
        .hero-car-thumb {
          display: block;
          width: calc(100% / var(--n));
          height: 100%;
          border-radius: 9999px;
          background: var(--accent);
          transform: translateX(calc(var(--i) * 100%));
          transition: transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* 손가락으로 짚기 쉽게 위아래로 넓힌 투명한 칸 */
        .hero-car-hit {
          position: absolute;
          inset: -10px 0;
          display: flex;
        }
        .hero-car-hit button {
          flex: 1;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
        }

        @media (max-width: 720px) {
          .hero-car-track { --sw: 82%; --gap: 10px; }
          /* 모바일은 막대 없이 손으로 밀어서 본다 */
          .hero-car-barwrap { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-car-track, .hero-car-thumb { transition: none; }
        }
      `}</style>
    </div>
  )
}
