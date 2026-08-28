import type { CSSProperties } from 'react'

/**
 * 페이지 하단 전환 유도(CTA) 버튼 한 쌍의 공통 규격.
 * 사이트 어디서든 같은 크기로 보이도록 여기 값만 쓴다.
 *
 * minWidth 를 두는 이유 — 두 버튼의 글자 수가 다르면(전화상담하기 6자 /
 * 무료 상담 신청 7자) 폭이 벌어져 한쪽이 커 보인다. 최소 폭을 같이 주면 맞는다.
 *
 * 테두리가 있는 쪽(btn-outline 등)과 짝을 이루는 채운 버튼에는
 * CTA_BTN_FILLED 를 써서 투명 테두리로 높이를 맞춘다.
 * (테두리 2px 차이가 그대로 높이·폭 4px 차이로 보인다)
 */
export const CTA_BTN: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.45rem',
  fontSize: '1.1rem',
  padding: '1rem 2.1rem',
  minWidth: '230px',
}

export const CTA_BTN_FILLED: CSSProperties = {
  ...CTA_BTN,
  border: '2px solid transparent',
}
