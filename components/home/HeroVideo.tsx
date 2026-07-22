'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 히어로 배경 영상.
 *
 * 처음에는 검은 배경만 두고, 페이지의 나머지가 다 뜬 뒤에 영상(10MB)을 받는다.
 * 영상을 처음부터 받으면 글자·사진과 대역폭을 다퉈 첫 화면이 뜨는 시간(LCP)이
 * 4초 넘게 밀린다.
 *
 * 재생이 시작되면 서서히 나타나게 해 검정에서 툭 튀지 않도록 한다.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let timer: number
    const start = () => {
      // 로드 직후는 아직 바쁘므로 한 박자 뒤에
      timer = window.setTimeout(() => {
        el.src = '/video/hero-video.mp4'
        el.load()
        el.play().catch(() => {}) // 자동재생이 막히면 검은 배경이 그대로 남는다
      }, 200)
    }

    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', start)
    }
  }, [])

  return (
    // 검은 판을 뒤에 깔고 그 위에서 영상을 서서히 띄운다.
    // (영상만 두면 투명해지는 동안 섹션 배경색이 비친다)
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
