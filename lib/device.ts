// User-Agent 로 접속 기기를 가른다 — 방문 기록(/api/track)과 문의·예약 접수가 같이 쓴다.

/** user-agent → 'mobile' | 'tablet' | 'desktop' */
export function detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' {
  const s = ua.toLowerCase()
  if (/ipad|tablet|(android(?!.*mobile))/.test(s)) return 'tablet'
  if (/mobile|iphone|ipod|android/.test(s)) return 'mobile'
  return 'desktop'
}

/** 관리자 화면 표기 */
export const DEVICE_LABEL: Record<string, string> = {
  mobile: '모바일',
  tablet: '태블릿',
  desktop: '데스크탑',
}

/**
 * 문의·예약 메모 끝에 붙이는 "기기: 모바일" 줄.
 * DB 컬럼을 늘리지 않고 "유입: …" 줄과 같은 방식으로 메모에 남긴다 — 관리자에서 줄을 떼어 따로 보여준다.
 */
export function deviceNoteLine(ua: string): string {
  return `기기: ${DEVICE_LABEL[detectDevice(ua)]}`
}
