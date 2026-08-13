'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 히어로 배경 애니메이션 (영상 대체).
 *
 * 다크 배경 위에 두 겹을 그린다:
 *  1) 네트워크 — 부유하는 노드와 근접 연결선 (은은한 배경)
 *  2) 와이어프레임 — 브라우저 목업이 커서를 따라 순차로 그려짐
 *     ("우리가 페이지를 만든다"는 브랜드 스토리)
 *
 * Canvas 라 영상(수 MB) 없이 초경량이고, 접근성(모션 최소화) 설정 시 정지한다.
 */
const PAL = ['#4066e6', '#4ab6ff', '#5ad0ff', '#7c5cff', '#9d7cff']
const fract = (x: number) => x - Math.floor(x)
const rnd = (i: number, s: number) => fract(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453)

export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // 아이브로우 칩 줄(상단바 기준) · 버튼들(칸 배치·프레임 하단 기준) · 타이틀(본문 칸 기준)
    const ebEl = document.querySelector('.hero-eyebrow') as HTMLElement | null
    // 주 버튼에도 --ghost 가 붙어 있으므로, 보조 버튼(제작 라인업)만 정확히 집는다
    const ctaEl = document.querySelector(
      '.hero-btn--ghost:not(.hero-btn--accent)'
    ) as HTMLElement | null
    const btnEl = document.querySelector('.hero-btn--accent') as HTMLElement | null
    const h1El = document.querySelector('.hero-section h1') as HTMLElement | null
    let W = 0, H = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      W = r.width; H = r.height
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    // 네트워크 — 부유 노드 + 근접 연결선
    const drawNetwork = (t: number) => {
      // 노드 수·연결거리·부유폭을 화면 크기에 비례시켜 모바일/데스크탑 밀도를 맞춘다
      const N = W < 700
        ? Math.max(115, Math.min(150, Math.round((W * H) / 5000)))
        : Math.max(80, Math.min(200, Math.round((W * H) / 8500)))
      const LINK = Math.min(W, H) * 0.2
      const drift = Math.min(W, H) * 0.05
      const nodes: { x: number; y: number }[] = []
      for (let i = 0; i < N; i++) {
        // 화면 밖 6%까지 분포시켜 가장자리·모서리도 채운다
        const fx = rnd(i, 4) * 1.12 - 0.06, fy = rnd(i, 5) * 1.12 - 0.06
        nodes.push({ x: fx * W + Math.sin(t * 0.1 + i) * drift, y: fy * H + Math.cos(t * 0.12 + i * 1.3) * drift })
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = PAL[(i + j) % PAL.length]; ctx.globalAlpha = (1 - d / LINK) * 0.32; ctx.lineWidth = 1.1; ctx.stroke()
          }
        }
      }
      for (let i = 0; i < N; i++) {
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 2.2, 0, 7)
        ctx.fillStyle = PAL[i % PAL.length]; ctx.globalAlpha = 0.6; ctx.fill()
      }
    }

    // 와이어프레임 — 브라우저 목업이 커서 따라 그려짐.
    // 칩·타이틀·버튼의 실제 위치를 재서 각자 자기 칸 안에 들어가게 하고,
    // 어떤 선도 글씨를 지나가지 않게 한다.
    const drawWireframe = (t: number, am: number) => {
      // 모바일은 화면 대비 크게, 데스크탑은 가로를 넓혀 타이틀을 감싼다
      let fw = W < 700 ? W * 0.86 : Math.min(W * 0.72, 940)
      // 타이틀의 실제 렌더 폭을 재서 그보다 넓게 감싼다 (화면은 넘지 않게)
      if (h1El) {
        const rng = document.createRange()
        rng.selectNodeContents(h1El)
        const tw = rng.getBoundingClientRect().width
        fw = Math.min(W - 4, Math.max(fw, tw + 26))
      }
      const cr = cv.getBoundingClientRect()
      const rect = (el: HTMLElement | null) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          top: r.top - cr.top, bottom: r.bottom - cr.top,
          left: r.left - cr.left, width: r.width, height: r.height,
        }
      }
      const chip = rect(ebEl)   // 칩 줄 (프레임 상단 기준점)
      const title = rect(h1El)  // 타이틀 → 본문 큰 칸 안에
      const btn1 = rect(btnEl)  // 주 버튼
      const btn2 = rect(ctaEl)  // 보조 버튼

      // 상단바 — 장식용 고정 높이 (칩을 억지로 넣지 않는다)
      const barH = W < 700 ? 34 : 42
      // 콘텐츠(칩~버튼) 위아래로 같은 여백 → 그려진 프레임의 위아래가 대칭이 된다
      const contentTop = chip?.top ?? title?.top ?? H * 0.3
      const contentBottom = Math.max(btn1?.bottom ?? 0, btn2?.bottom ?? 0)
      // 모바일은 프레임 세로를 조금 눌러 카드가 길쭉해지지 않게 한다
      const padTop = W < 700 ? 60 : 72
      const fy = contentTop - padTop
      // 하단은 개편 전 구성 — 카드 3개가 버튼 영역을 감싸고, 밑줄 스텁이 그 아래 온다
      // PC는 프레임 하단 돌출(카드+밑줄+여백 합 72px)이 위 여백(72px)과 같아지도록 잡는다
      const cardsBottom = contentBottom + (W < 700 ? 20 : 26)
      const underY = cardsBottom + (W < 700 ? 14 : 16)
      const fh = contentBottom > 0
        ? underY + (W < 700 ? 24 : 30) - fy
        : (W < 700 ? fw * 0.66 : 470)
      const fx = W / 2 - fw / 2
      const barMid = fy + barH / 2

      const total = 13
      // 프레임 크기와 무관하게 모바일·데스크탑이 같은 시간 안에 그려진다
      const cyc = (t * 0.11) % total
      const out = Math.max(0, Math.min(1, (cyc - (total - 2)) / 1.6))
      const base = (1 - out) * am
      const seg = (d: number) => Math.max(0, Math.min(1, cyc - d))
      const ACC = '#5ad0ff', DIM = 'rgba(150,180,255,0.55)'
      let cursor: [number, number] | null = null

      ctx.lineWidth = 1.7
      // px 좌표 헬퍼 — 왼쪽에서 오른쪽으로 진행률 p 만큼 그려진다
      const box = (x: number, y: number, w: number, h: number, d: number, col: string) => {
        const p = seg(d); if (p <= 0) return
        ctx.strokeStyle = col; ctx.globalAlpha = base * (0.28 + p * 0.32)
        ctx.strokeRect(x, y, w * p, h)
        if (p < 1) cursor = [x + w * p, y + h / 2]
      }
      const line = (x: number, y: number, w: number, d: number) => {
        const p = seg(d); if (p <= 0) return
        ctx.strokeStyle = DIM; ctx.globalAlpha = base * 0.5
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * p, y); ctx.stroke()
        if (p < 1) cursor = [x + w * p, y]
      }

      // 바깥 프레임 + 좌측 신호등 점 3개 (점은 상단바 세로 중앙)
      const pf = seg(0)
      if (pf > 0) {
        ctx.strokeStyle = ACC; ctx.globalAlpha = base * 0.55
        ctx.strokeRect(fx, fy, fw * pf, fh)
        if (pf < 1) cursor = [fx + fw * pf, fy]
        if (pf >= 1) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(fx + fw * 0.035 + i * 11, barMid, 2.6, 0, 7); ctx.fillStyle = ACC; ctx.globalAlpha = base * 0.5; ctx.fill() }
      }
      // 상단바 하단 라인
      line(fx, fy + barH, fw, 0.7)
      // 주소창 알약 — 신호등 점 오른쪽 (칩이 상단바 밖에 있어 항상 안전)
      {
        const ph = Math.min(barH * 0.52, 16)
        const pillX = Math.max(fx + fw * 0.08, fx + fw * 0.035 + 34)
        box(pillX, barMid - ph / 2, fw * (W < 700 ? 0.3 : 0.18), ph, 1.1, DIM)
      }
      // 상단바 내비 스텁 — 오른쪽 끝 정렬
      {
        const stubs = W < 700 ? 2 : 3
        const stubW = W < 700 ? 30 : 42
        const stubGap = W < 700 ? 14 : 20
        const navX = fx + fw - 14 - (stubs * stubW + (stubs - 1) * stubGap)
        for (let i = 0; i < stubs; i++) line(navX + i * (stubW + stubGap), barMid, stubW, 1.6 + i * 0.22)
      }
      // 타이틀 칸 — 아래 행간 공백이 커 보여서 바닥을 4px 끌어올려 시각적으로 맞춘다
      if (title) box(fx + 12, title.top - 6, fw - 24, title.height + 8, 2.4, ACC)
      // 타이틀 칸 아래 — 개편 전처럼 카드 3개가 버튼 영역을 감싸며 내려가고,
      // 각 카드 아래에 밑줄 스텁이 온다 (버튼을 감싸는 개별 칸은 없음)
      if (title && contentBottom > 0) {
        // 모바일은 버튼이 세로로 쌓여 카드가 너무 길어지므로, 버튼 조금 위에서 시작한다
        const btnTop = Math.min(btn1?.top ?? Infinity, btn2?.top ?? Infinity)
        const cardsTop =
          W < 700 && btnTop !== Infinity ? btnTop - 24 : title.bottom + 24
        const cardH = cardsBottom - cardsTop
        for (let i = 0; i < 3; i++) {
          // 카드 3개(폭 0.28)와 사이 간격(0.045×2)을 빼면 양옆 여백이 0.035씩 동일
          const cx = fx + fw * (0.035 + i * 0.325)
          box(cx, cardsTop, fw * 0.28, cardH, 3.4 + i * 0.9, i === 1 ? ACC : DIM)
          // 밑줄 스텁 — 카드 가로 중앙 정렬 (카드 0.28 - 선 0.2 = 양쪽 0.04씩)
          line(cx + fw * 0.04, underY, fw * 0.2, 4.4 + i * 0.9)
        }
      }
      if (cursor) {
        const [cxp, cyp] = cursor
        ctx.globalAlpha = base; ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.moveTo(cxp, cyp); ctx.lineTo(cxp, cyp + 16); ctx.lineTo(cxp + 4.6, cyp + 11.5); ctx.lineTo(cxp + 11.5, cyp + 11.5)
        ctx.closePath(); ctx.fill()
      }
    }

    let t = 0
    let raf = 0
    let last = 0
    // 화면 주사율(60/120Hz)과 무관하게 실제 경과 시간 기준으로 진행시킨다
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 16.667, 3) : 1
      last = now
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      drawNetwork(t)
      drawWireframe(t, 0.83)
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      if (!reduce) { t += 0.1 * dt; raf = requestAnimationFrame(frame) }
    }
    raf = requestAnimationFrame(frame)
    setReady(true)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'radial-gradient(ellipse 90% 80% at 50% 50%, #0c1424 0%, #070a12 70%, #05070d 100%)',
      }}
    >
      <canvas
        ref={ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
    </div>
  )
}