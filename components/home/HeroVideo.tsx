'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 히어로 배경 영상.
 *
 * 검은 배경 위에서 영상이 서서히 나타난다(어제 확정한 연출).
 * 영상(4MB)은 faststart(재생 정보가 파일 앞) + 서버 Range 지원 덕에
 * 전체를 다 받지 않고 앞부분만 받아 바로 재생된다(프로그레시브 스트리밍).
 * 그래서 window load 까지 기다리지 않고 마운트 직후 곧바로 로드를 시작한다.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const id = requestAnimationFrame(() => {
      el.src = '/video/hero-video.mp4'
      el.load()
      el.play().catch(() => {}) // 자동재생이 막히면 검은 배경이 그대로 남는다
    })

    return () => cancelAnimationFrame(id)
  }, [])

  return (
    // 검은 판을 뒤에 깔고 그 위에서 영상을 서서히 띄운다.
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#000' }}>
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: playing ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
        }}
      />
    </div>
  )
}
