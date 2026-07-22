'use client'
import { useEffect, useRef } from 'react'

/**
 * 히어로 배경 영상.
 *
 * 처음에는 src 를 비워 두고 포스터 이미지(140KB)만 그린다.
 * 페이지의 나머지가 다 뜬 뒤에 영상(10MB)을 받아 이어 붙인다.
 *
 * 이렇게 하는 이유 — 영상을 처음부터 받으면 글자·사진과 대역폭을 다퉈
 * 첫 화면이 뜨는 시간(LCP)이 4초 넘게 밀린다. 포스터가 영상의 첫 프레임이라
 * 바뀌는 순간이 눈에 띄지 않는다.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let timer: number
    const start = () => {
      // 로드 직후는 아직 바쁘므로 한 박자 뒤에
      timer = window.setTimeout(() => {
        el.src = '/video/hero-video.mp4'
        el.load()
        el.play().catch(() => {}) // 자동재생이 막히면 포스터가 그대로 남는다
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
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster="/video/hero-poster.jpg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
      }}
    />
  )
}
