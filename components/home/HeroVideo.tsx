'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 히어로 배경 영상.
 *
 * 검은 배경 위에서 영상이 서서히 나타난다(어제 확정한 연출).
 *
 * 마운트되자마자 곧바로 영상을 받아 재생한다. 예전에는 window load(이미지·폰트를
 * 다 받은 뒤)까지 기다려 재생이 늦었는데, 그 대기를 없애 등장을 최대한 앞당겼다.
 * 재생이 시작되면 검은 배경 위로 서서히 나타난다.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.src = '/video/hero-video.mp4'
    el.load()
    el.play().catch(() => {}) // 자동재생이 막히면 검은 배경이 그대로 남는다
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
