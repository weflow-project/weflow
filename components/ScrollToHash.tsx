'use client'
import { useEffect } from 'react'

/**
 * 주소 끝의 #앵커 로 스크롤시킨다.
 * Next.js 는 다른 페이지에서 넘어올 때 앵커를 놓치는 경우가 있어(내용이 그려지기 전에 스크롤을 시도한다)
 * 화면이 준비된 뒤 한 번 더 직접 내려준다.
 */
export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const go = () => {
      const el = document.querySelector(hash)
      if (!el) return false
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    // 첫 시도는 그리기가 끝난 직후, 실패하면 잠깐 뒤 한 번 더 (이미지·폰트가 늦게 붙는 경우)
    const raf = requestAnimationFrame(() => {
      if (!go()) setTimeout(go, 300)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return null
}
