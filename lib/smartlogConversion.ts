/**
 * 스마트로그 '문의' 전환 신호 — 상담 신청·예약·점검 리드가 완료된 순간 호출한다.
 *
 * 스마트로그는 옛날식 추적기라 "전환 페이지가 새로 로드되면서
 * hpt_trace_info 를 먼저 정의해 두고 smart.js 가 그걸 읽는" 구조다.
 * 우리는 앱 라우터라 완료 화면이 페이지 이동 없이 뜨므로,
 * 전환 정보를 전역에 먼저 심고(전환 스크립트가 위쪽!) smart.js 를
 * 새로 붙여 다시 실행시키는 방식으로 같은 효과를 낸다.
 *
 * 회원 개념이 없어 _memid 는 안내대로 공란. 같은 탭에서는 한 번만 보낸다.
 */
const SENT_KEY = 'weflow_smlog_cnv'

export function trackSmartlogInquiry(): void {
  if (typeof window === 'undefined') return
  try {
    if (sessionStorage.getItem(SENT_KEY)) return
    ;(window as unknown as Record<string, unknown>).hpt_trace_info = { _mode: 'q', _memid: '' }
    const s = document.createElement('script')
    s.src = 'https://cdn.smlog.co.kr/core/smart.js'
    s.charset = 'utf-8'
    document.body.appendChild(s)
    sessionStorage.setItem(SENT_KEY, '1')
  } catch {
    /* 추적 스크립트 오류가 신청 완료 화면을 막으면 안 된다 */
  }
}
