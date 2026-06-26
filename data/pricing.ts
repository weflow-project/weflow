export interface Plan {
  name: string
  sub: string
  highlight: boolean
  features: string[]
  originalPrice: string
  price: string
  note: string
}

export interface MakePlan extends Plan {
  id: string
  emoji: string
  discount: string
}

export const makePlans: MakePlan[] = [
  {
    id: 'start',
    name: 'START',
    sub: '랜딩페이지',
    emoji: '🚀',
    highlight: false,
    discount: '51%',
    features: [
      '랜딩페이지 1P',
      '3~4일 빠른 제작기간',
      '반응형 제작 (PC/모바일)',
      '문의폼 연동',
      '기본 SEO 설정',
    ],
    originalPrice: '790,000원',
    price: '390,000원',
    note: '월 유지보수 39,000원 · VAT 별도',
  },
  {
    id: 'grow',
    name: 'GROW',
    sub: '홈페이지',
    emoji: '🌱',
    highlight: false,
    discount: '50%',
    features: [
      '홈페이지 2P~',
      '1주 빠른 제작기간',
      '반응형 제작 (PC/모바일)',
      '문의폼 연동',
      '카카오톡 상담연동',
      '기본 SEO 설정',
    ],
    originalPrice: '1,990,000원',
    price: '990,000원',
    note: '월 유지보수 69,000원 · VAT 별도',
  },
  {
    id: 'master',
    name: 'MASTER',
    sub: '랜딩 + 홈페이지',
    emoji: '👑',
    highlight: true,
    discount: '57%',
    features: [
      '홈페이지 + 랜딩페이지',
      '1~2주 빠른 제작기간',
      '반응형 제작 (PC/모바일)',
      '프리미엄 디자인',
      '예약·문의 시스템',
      'SEO 최적화',
      '광고 전환 구조 설계',
    ],
    originalPrice: '2,760,000원',
    price: '1,190,000원',
    note: '월 유지보수 89,000원 · VAT 별도',
  },
]

/* 케어플랜 전체 - 주석처리
export const carePlans: Plan[] = [
  {
    name: 'WE CARE',
    sub: '기본 관리 플랜',
    highlight: false,
    features: [
      '유지보수(월 수정) 월 1회',
      '블로그 : 월 1개',
      '인스타 : 월 4회 (주 1회)',
      '스레드 : 월 4회 (주 1회)',
      'SEO 상단등록',
    ],
    originalPrice: '월 170,000원',
    price: '월 89,000원~',
    note: 'VAT 별도',
  },
  {
    name: 'FLOW CARE',
    sub: '성장 관리 플랜',
    highlight: false,
    features: [
      '유지보수 : 월 3회',
      '인스타 : 월 8회 (주 2회)',
      '스레드 : 월 8회 (주 2회)',
      '블로그 : 월 2회',
      '네이버 키워드 세팅 할인 (149,000→79,000원)',
      '당근 키워드 광고 세팅 50% 할인 (79,000→39,000원)',
      '문의 개선',
      'SEO 상단 등록',
    ],
    originalPrice: '월 378,000원~',
    price: '월 189,000원~',
    note: 'VAT 별도',
  },
  {
    name: 'WEFLOW CARE',
    sub: '올인원 관리 플랜',
    highlight: true,
    features: [
      '유지보수 : 무제한',
      '블로그 : 월 4회 (주 1회)',
      '인스타 : 월 12회 (주 3회)',
      '스레드 : 월 12회 (주 3회)',
      '네이버 키워드/당근 플레이스 광고 세팅 무료',
      '월 성과 체크',
      '랜딩 개선',
      '광고관리',
      'SEO 최적화',
    ],
    originalPrice: '월 678,000원~',
    price: '월 339,000원~',
    note: 'VAT 별도',
  },
]
*/

/* 광고 세팅 플랜 - 주석처리
export const adPlans = [
  {
    name: '네이버 광고 (키워드 셋팅)',
    features: ['키워드 분석', '광고 세팅 지원', '광고 문구 제작', '문의 구조 연결', '채널 연동 지원', '성과 최적화'],
    originalPrice: '298,000원',
    price: '149,000원~',
    note: 'VAT 별도',
  },
  {
    name: '당근 플레이스 광고 (키워드 셋팅)',
    features: ['지역 키워드 분석', '광고 세팅 지원', '광고 문구 제작', '지역 타겟 설정', '랜딩 연결 지원', '성과 최적화'],
    originalPrice: '158,000원',
    price: '79,000원~',
    note: 'VAT 별도',
  },
]
*/
