export interface Review {
  star: number
  name: string
  text: string
  category: string
}

export const reviews: Review[] = [
  { star: 5, name: 'OO pt샵 대표', text: '문의 버튼 위치 바꾸고 상담 문의가 확실히 늘었어요.', category: '피트니스' },
  { star: 5, name: 'OO 필라테스 대표', text: '수정 요청도 빠르게 처리해주셔서 만족합니다.', category: '피트니스' },
  { star: 5, name: 'OO 헬스장 대표', text: '디자인보다 문의 구조를 신경 써주는 게 좋았습니다.', category: '피트니스' },
  { star: 5, name: 'OO 보험설계 대표', text: '랜딩페이지 제작 후 상담 문의가 늘었어요.', category: '금융' },
  { star: 5, name: 'OO 법률 사무소 대표', text: '설명도 쉽게 해주셔서 진행하기 편했습니다.', category: '법률' },
  { star: 5, name: 'OO 세무사 사무소 대표', text: '광고 연결까지 한 번에 진행돼서 편했어요.', category: '금융' },
  { star: 5, name: 'OO 공인중개사 대표', text: '피드백 속도가 진짜 빨랐습니다.', category: '부동산' },
  { star: 5, name: 'OO 카페 대표', text: '모바일 화면이 훨씬 보기 좋아졌어요.', category: '식음료' },
  { star: 5, name: 'OO 미용실 대표', text: '생각보다 제작 기간이 빨라 놀랐습니다.', category: '뷰티' },
  { star: 5, name: 'OO 네일샵 대표', text: '업종 특성에 맞게 잘 만들어주셨어요.', category: '뷰티' },
  { star: 5, name: 'OO 피부관리샵 대표', text: '기획부터 같이 잡아줘서 부담이 없었습니다.', category: '뷰티' },
  { star: 5, name: 'OO 왁싱샵 대표', text: '광고 세팅 방향도 알려줘서 도움됐어요.', category: '뷰티' },
  { star: 5, name: 'OO 반영구샵 대표', text: '예약 문의가 전보다 더 잘 들어옵니다.', category: '뷰티' },
  { star: 5, name: 'OO 애견미용 대표', text: '필라테스 문의 동선이 훨씬 좋아졌어요.', category: '반려동물' },
  { star: 5, name: 'OO 반려동물 용품점 대표', text: '보험 상담 페이지가 깔끔하게 정리됐어요.', category: '반려동물' },
  { star: 5, name: 'OO 키즈카페 대표', text: '수정 요청해도 응답이 빨라 좋았습니다.', category: '엔터테인먼트' },
  { star: 5, name: 'OO 스터디카페 대표', text: '홈페이지 만들고 끝이 아니라 관리도 해줘요.', category: '교육' },
  { star: 5, name: 'OO 영어학원 대표', text: 'SEO 부분까지 신경 써줘서 만족합니다.', category: '교육' },
  { star: 5, name: 'OO 입시학원 대표', text: '카카오 문의 연결이 편하게 바뀌었어요.', category: '교육' },
  { star: 5, name: 'OO 개인과외 대표', text: '문의하기 버튼 위치가 확실히 효과 있네요.', category: '교육' },
  { star: 5, name: 'OO 청소업체 대표', text: '초보라 아무것도 몰랐는데 쉽게 설명해줬어요.', category: '생활서비스' },
  { star: 5, name: 'OO 인테리어 업체 대표', text: '비용 부담이 생각보다 적었습니다.', category: '인테리어' },
  { star: 5, name: 'OO 이사 업체 대표', text: '랜딩페이지 하나로 상담률이 올라갔어요.', category: '생활서비스' },
  { star: 5, name: 'OO 자동차 디테일링 대표', text: '다음 프로젝트도 위플로우랑 진행할 예정입니다.', category: '자동차' },
]

export const reviewCategories = ['전체', ...Array.from(new Set(reviews.map(r => r.category)))]
