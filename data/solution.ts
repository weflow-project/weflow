// 메인 솔루션 섹션(월계수 밴드 + 신뢰 지표 + 강점 6종)에 쓰는 데이터.
// 숫자를 여기 한곳에 모아둔 이유 — 월계수 문구와 통계 밴드가 같은 값을 쓰기 때문에
// 따로 적어두면 한쪽만 고쳐져 서로 어긋난다.

// 실제 숫자가 정해지면 아래 두 값만 숫자로 바꾸면 된다.
// 월계수 문구와 통계 밴드가 같은 값을 참조하므로 한쪽만 어긋날 일이 없다.
export const CAREER_YEARS: number | 'N' = 'N' // 홈페이지 제작 연차
export const TOTAL_PROJECTS: number | 'N' = 'N' // 누적 제작 건수

export type TrustStat = {
  /** 'N' 이면 플레이스홀더 그대로 노출 */
  end: number | 'N'
  suffix: string
  label: string
  /** 천 단위 콤마 */
  format?: boolean
  /** 뷰포트 진입 시 카운트업 (숫자일 때만 동작) */
  animate?: boolean
}

export const TRUST: TrustStat[] = [
  { end: CAREER_YEARS, suffix: '년+', label: '홈페이지 제작 경력' },
  { end: TOTAL_PROJECTS, suffix: '건+', label: '누적 제작 사례', format: true },
  { end: 100, suffix: '%', label: '맞춤 제작', animate: true },
  { end: 0, suffix: '원', label: '무료 진단 비용' },
]

export type StrengthIconName =
  | 'ruler'
  | 'userCheck'
  | 'code'
  | 'palette'
  | 'shield'
  | 'stethoscope'

export type Strength = {
  icon: StrengthIconName
  title: string
  desc: string
  /** 파란 카드로 강조 */
  highlight?: boolean
}

export const STRENGTH: {
  eyebrow: string
  intro: string
  items: Strength[]
} = {
  eyebrow: 'SOLUTION',
  intro: 'WEFLOW_위플로우는',
  // 이 배열 순서 = PC(6열) 배치 순서다. 강조 두 칸이 가운데(3·4번째)에 오도록 짜여 있다.
  // 모바일(2열)에서는 강조 두 칸에 order:-1 이 걸려 맨 윗줄로 올라온다 — SolutionSection 의 CSS 참고.
  items: [
    {
      icon: 'code',
      title: '전문 개발자 직접 제작',
      desc: '외주 없이 개발자가\n직접 설계하고 구현',
    },
    {
      icon: 'palette',
      title: '트렌디한 디자인',
      desc: '최신 흐름을 반영한\n브랜드 맞춤 디자인',
    },
    {
      icon: 'ruler',
      title: '100% 맞춤 제작',
      desc: '템플릿이 아닌\n브랜드에 맞춘 설계',
      highlight: true,
    },
    {
      icon: 'userCheck',
      title: '1:1 집중 관리',
      desc: '전담 담당자가\n처음부터 끝까지 함께',
      highlight: true,
    },
    {
      icon: 'shield',
      title: '꼼꼼한 마무리',
      desc: '제작 후에도 책임지는\n유지보수와 관리',
    },
    {
      icon: 'stethoscope',
      title: '무료 홈페이지 진단',
      desc: '현재 상태를 먼저 진단하고\n투명한 견적 안내',
    },
  ],
}

// 실시간 문의 보드(연출용) — 지역 × 마스킹 이름 × 문의 유형을 무작위로 조합해 띄운다.
export const LIVE_REGIONS = [
  '서울시 강남구', '서울시 마포구', '서울시 송파구', '서울시 영등포구',
  '서울시 서초구', '서울시 강서구', '서울시 성동구', '서울시 노원구',
  '경기도 성남시', '경기도 수원시', '경기도 고양시', '경기도 용인시',
  '경기도 부천시', '경기도 화성시', '경기도 남양주시', '경기도 김포시',
  '인천시 연수구', '인천시 서구', '부산시 해운대구', '부산시 부산진구',
  '대구시 수성구', '대전시 유성구', '광주시 서구', '울산시 남구',
  '강원도 춘천시', '충남 천안시', '충북 청주시', '전북 전주시',
  '경남 창원시', '제주시 노형동',
]

export const LIVE_SURNAMES = [
  '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
  '한', '오', '서', '신', '권', '황', '안', '송', '전', '홍',
  '유', '고', '문', '양', '손', '배', '백', '허', '남', '심',
]

export const LIVE_INQUIRY_TYPES = [
  '홈페이지 문의',
  '랜딩형 홈페이지 문의',
  '관리자 페이지 문의',
  '견적 문의',
  '리뉴얼 문의',
]
