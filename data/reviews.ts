/**
 * 고객 후기 데이터 — /reviews 와 관리자 페이지가 쓴다.
 * 메인의 후기 자리는 PlaceholderSection의 "고객 인터뷰" 이미지가 대신한다.
 */

/** 후기 한 건 */
export interface Review {
  star: number
  name: string
  text: string
  category: string
}

/** 후기 목록 — 현재 1건뿐이다 */
export const reviews: Review[] = [
  { star: 5, name: 'OO pt샵 대표', text: '문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.', category: '피트니스' },
]
