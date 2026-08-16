/**
 * 여러 화면이 함께 쓰는 공용 상수.
 * projectTypes는 상담 예약(/booking)·무료 진단(/diagnosis)의 "제작 종류"
 * 셀렉트 박스를 채우고, 관리자 페이지(/admin)에서는 종류별 집계 기준이 된다.
 * 폼에 저장되는 값이 곧 이 문자열이므로 문구를 바꾸면 기존 데이터와 어긋난다.
 */

/** 카카오톡 채널 주소 — 플로팅 버튼과 견적 폼의 카톡 상담이 같은 채널을 가리킨다 */
export const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'

/** 제작 종류 선택지 — 배열 순서가 곧 셀렉트·집계 목록 순서 */
export const projectTypes = [
  '신규 제작',
  '리뉴얼',
  '기타',
]
