'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 히어로 배경 영상.
 *
 * 검은 배경 위에서 영상이 서서히 나타난다(어제 확정한 연출).
 *
 * 로드는 페이지의 나머지(이미지·폰트)가 다 뜬 뒤(window load)에 시작한다.
 * 그래야 초기 대역폭을 다른 이미지에 양보하고, 한가해진 네트워크에서 영상만
 * 집중해 받아 재생이 오히려 빨리 시작된다(문구 애니메이션 초반에 맞춰 등장).
 * 초기(rAF)에 받으면 캐러셀 이미지들과 대역폭을 다퉈 재생이 되레 밀린다.
 * 화면을 꽉 채우는 LCP 요소는 영상이 아니라 대표 이미지라, 영상을 늦게 받아도
 * LCP 손해는 없다.
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
