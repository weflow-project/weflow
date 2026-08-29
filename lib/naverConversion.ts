/**
 * 네이버 검색광고 전환 신호 — 상담 신청·예약·점검 리드가 완료된 순간 호출한다.
 * 네이버 전환 유형 "4" = 신청/예약. 광고시스템이 이걸 받아야
 * "어떤 키워드가 실제 신청을 만들었는지"를 광고 쪽에서도 집계하고 입찰을 최적화한다.
 *
 * 같은 탭(세션)에서는 한 번만 보낸다 — "추가 신청"·점검 재실행으로 두 번 제출해도
 * 사람은 한 명이므로 전환 수가 부풀지 않게 한다.
 * 공통 스크립트(components/NaverAds.tsx)가 안 켜져 있으면 조용히 아무것도 안 한다.
 */
const SENT_KEY = 'weflow_naver_cnv'

export function trackNaverLead(): void {
  if (typeof window === 'undefined') return
  try {
    if (!window.wcs || !window.wcs_do) return
    if (sessionStorage.getItem(SENT_KEY)) return
    window.wcs_do({ cnv: window.wcs.cnv('4', '0') })
    sessionStorage.setItem(SENT_KEY, '1')
  } catch {
    /* 광고 스크립트 오류가 신청 완료 화면을 막으면 안 된다 */
  }
}
