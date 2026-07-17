/**
 * 고객 후기 데이터 — components/home/ReviewsSection.tsx 가 쓴다.
 * 다만 ReviewsSection은 현재 메인(app/page.tsx)에 걸려 있지 않아 화면에 안 뜬다.
 * 메인의 후기 자리는 지금 PlaceholderSection의 "고객 인터뷰" 이미지가 대신한다.
 * 후기가 1건뿐이라 ReviewsSection의 2줄 흐르는 배치는 사실상 한 줄로만 찬다.
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

// 후기 카테고리 필터용 — reviews에서 중복 없이 뽑아 앞에 '전체'를 붙인다.
// 필터 UI가 아직 없어 현재 import 하는 곳은 없다
export const reviewCategories = ['전체', ...Array.from(new Set(reviews.map(r => r.category)))]
