'use client'
// 히어로 1행 — 기본은 고정 문구, 유입 키워드(파워링크·UTM·?kw=)가 잡히면 마운트 후 맞춤 문구로 교체.
// 예: "인테리어 홈페이지 제작" 키워드로 들어오면 1행이 "인테리어 홈페이지 제작"이 되고 2행 "우리만의 플로우를 담다, WEFLOW"는 그대로.
// SSR 은 기본 문구(검색엔진·첫 페인트 동일), 교체는 클라이언트에서만 일어난다.
import { useEffect, useState } from 'react'
import { getEntryKeyword } from '@/lib/attribution'
import { matchKeyword } from '@/lib/keywords'

// 글자 단위 등장 — HeroBanner 의 Chars 와 동일 (자리는 유지하고 투명→나타남)
function Chars({ text, step = 0.03 }: { text: string; step?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hero-char" style={{ animationDelay: `${i * step}s` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  )
}

export default function HeroLine1({ fallback }: { fallback: string }) {
  const [text, setText] = useState(fallback)

  useEffect(() => {
    const m = matchKeyword(getEntryKeyword())
    if (!m.headline) return
    // URL/sessionStorage(외부 상태) → 클라이언트 전용 교체. key 가 바뀌어 글자 애니메이션이 다시 돈다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(m.headline)
  }, [])

  return <Chars key={text} text={text} />
}
