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
    // 아이브로우 배지(상단바 기준) · 2차 CTA 버튼(모바일에서 프레임 하단 기준)
    const ebEl = document.querySelector('.hero-eyebrow') as HTMLElement | null
    const ctaEl = document.querySelector('.hero-btn--ghost') as HTMLElement | null
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

    // 와이어프레임 — 브라우저 목업이 커서 따라 그려짐
    const drawWireframe = (t: number, am: number) => {
      // 모바일은 화면 대비 크게, 데스크탑은 가로를 넓혀 타이틀을 감싼다(세로는 고정)
      let fw = W < 700 ? W * 0.86 : Math.min(W * 0.72, 940)
      // 타이틀의 실제 렌더 폭을 재서 그보다 넓게 감싼다 (화면은 넘지 않게)
      if (h1El) {
        const rng = document.createRange()
        rng.selectNodeContents(h1El)
        const tw = rng.getBoundingClientRect().width
        fw = Math.min(W - 4, Math.max(fw, tw + 26))
      }
      let fh = W < 700 ? fw * 0.66 : 370
      const cr = cv.getBoundingClientRect()
      // 브라우저 상단바(세로 0.05fh 지점)가 아이브로우 배지 중앙에 오도록 맞춘다
      let anchorY = H * 0.27
      if (ebEl) {
        const er = ebEl.getBoundingClientRect()
        anchorY = er.top - cr.top + er.height / 2
      }
      // 모바일: 프레임 하단이 2차 CTA 버튼 아래까지 오도록 세로를 늘린다(데스크탑은 세로 고정)
      if (W < 700 && ctaEl) {
        const ctaBottom = ctaEl.getBoundingClientRect().bottom - cr.top
        fh = Math.max(fh, (ctaBottom + 12 - anchorY) / 0.95)
      }
      const fx = W / 2 - fw / 2, fy = anchorY - fh * 0.05
      const X = (r: number) => fx + r * fw, Y = (r: number) => fy + r * fh
      const total = 13
      // 조립 속도를 프레임 크기(fh)에 반비례시켜, 큰 프레임(모바일)도
      // 실제 그려지는 속도(픽셀/초)가 데스크탑과 같게 한다 (기준 fh 370)
      const cyc = (t * 0.11 * (370 / fh)) % total
      const out = Math.max(0, Math.min(1, (cyc - (total - 2)) / 1.6))
      const base = (1 - out) * am
      const seg = (d: number) => Math.max(0, Math.min(1, cyc - d))
      const ACC = '#5ad0ff', DIM = 'rgba(150,180,255,0.55)'
      let cursor: [number, number] | null = null

      ctx.lineWidth = 1.7
      const box = (rx: number, ry: number, rw: number, rh: number, d: number, col: string) => {
        const p = seg(d); if (p <= 0) return
        ctx.strokeStyle = col; ctx.globalAlpha = base * (0.28 + p * 0.32)
        ctx.strokeRect(X(rx), Y(ry), rw * fw * p, rh * fh)
        if (p < 1) cursor = [X(rx) + rw * fw * p, Y(ry) + rh * fh / 2]
      }
      const line = (rx: number, ry: number, rw: number, d: number) => {
        const p = seg(d); if (p <= 0) return
        ctx.strokeStyle = DIM; ctx.globalAlpha = base * 0.5
        ctx.beginPath(); ctx.moveTo(X(rx), Y(ry)); ctx.lineTo(X(rx) + rw * fw * p, Y(ry)); ctx.stroke()
        if (p < 1) cursor = [X(rx) + rw * fw * p, Y(ry)]
      }
      const pf = seg(0)
      if (pf > 0) {
        ctx.strokeStyle = ACC; ctx.globalAlpha = base * 0.55
        ctx.strokeRect(fx, fy, fw * pf, fh)
        if (pf < 1) cursor = [fx + fw * pf, fy]
        if (pf >= 1) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(X(0.035) + i * 11, Y(0.05), 2.6, 0, 7); ctx.fillStyle = ACC; ctx.globalAlpha = base * 0.5; ctx.fill() }
      }
      line(0, 0.1, 1, 0.7)
      box(0.045, 0.14, 0.1, 0.045, 1.2, DIM)
      line(0.56, 0.162, 0.09, 1.6); line(0.7, 0.162, 0.09, 1.85); line(0.84, 0.162, 0.1, 2.05)
      box(0.045, 0.25, 0.91, 0.3, 2.4, ACC)
      line(0.3, 0.35, 0.4, 3.1); line(0.34, 0.41, 0.32, 3.4)
      box(0.37, 0.47, 0.11, 0.05, 4, ACC); box(0.52, 0.47, 0.11, 0.05, 4.3, DIM)
      for (let i = 0; i < 3; i++) {
        const cx = 0.045 + i * 0.325
        box(cx, 0.62, 0.28, 0.26, 5 + i * 0.9, i === 1 ? ACC : DIM)
        line(cx + 0.03, 0.93, 0.2, 6 + i * 0.9)
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