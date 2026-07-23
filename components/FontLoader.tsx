'use client'
import { useEffect, useRef } from 'react'

/**
 * Pretendard(dynamic-subset)를 첫 화면 렌더를 막지 않고 불러온다.
 *
 * 예전에는 globals.css 의 @import 로 불러와 CSS 파싱이 끝날 때까지 화면이
 * 그려지지 않았다(FCP 지연). 여기서는 media="print" 로 요청해 렌더를 막지 않고,
 * 로드가 끝나면 media="all" 로 바꿔 실제 적용한다(표준 비차단 CSS 패턴).
 * 폰트가 오기 전에는 body 의 system-ui fallback 으로 글자가 즉시 보인다.
 *
 * onLoad 가 하이드레이션 전에 지나가 놓치는 경우를 대비해 useEffect 에서도
 * media 를 all 로 확정한다.
 */
const FONT_CSS =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

export default function FontLoader() {
  const ref = useRef<HTMLLinkElement>(null)

  useEffect(() => {
    const link = ref.current
    if (link && link.media !== 'all') link.media = 'all'
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link
        ref={ref}
        rel="stylesheet"
        href={FONT_CSS}
        media="print"
        onLoad={(e) => {
          e.currentTarget.media = 'all'
        }}
      />
    </>
  )
}
