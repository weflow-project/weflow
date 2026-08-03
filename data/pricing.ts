/**
 * 가격 데이터 — 제작 플랜(START/GROW/MASTER) 정의.
 * /pricing 의 "제작 플랜"·"관리자 페이지" 카드와 메인페이지 가격 섹션에서 함께 쓴다.
 * 금액은 계산하지 않고 표시용 문자열 그대로 둔다("390,000원").
 * 케어플랜·광고 세팅 플랜은 아래에 주석 처리된 상태로 보관 중.
 */

/** 플랜 카드 공통 골격 — 케어플랜 등 다른 플랜도 이 형태를 따른다 */
export interface Plan {
  // 플랜 코드명 (START, GROW …)
  name: string;
  // 카드 제목에 뜨는 상품명 (랜딩페이지, 홈페이지 …)
  sub: string;
  // 인기 플랜 여부 — 파란 테두리·별 태그·반짝이 표시
  highlight: boolean;
  // 카드 안 체크리스트 항목
  features: string[];
  // 할인 전 금액 (취소선으로 표시)
  originalPrice: string;
  // 실제 판매가
  price: string;
  // 가격 아래 단서 문구 (VAT 별도 등)
  note: string;
}

/** 제작 플랜 — 기본 카드에 관리자 페이지 옵션 가격까지 얹은 형태 */
export interface MakePlan extends Plan {
  // 리스트 key
  id: string;
  // 현재 화면에서는 미사용 (아이콘은 img/MAKE_ICONS 사용)
  emoji: string;
  // 카드 좌측 3D 아이콘
  img: string;
  // 상품명 아래 한 줄 (스피드형, 밸런스형 …)
  tagline: string;
  // 할인율 배지 문구
  discount: string;
  // 제작 플랜 월 유지보수비
  maintenance: string;
  // 관리자 페이지 옵션 판매가
  adminPrice: string;
  // 관리자 페이지 옵션 할인 전 금액
  adminOriginalPrice: string;
  // 관리자 페이지 옵션 월 유지보수비
  adminMaintenance: string;
}

/** 제작 플랜 3종 — 배열 순서가 곧 카드 배치 순서 (MAKE_ICONS 순서와 짝을 이룬다) */
export const makePlans: MakePlan[] = [
  {
    id: "start",
    name: "START",
    sub: "랜딩페이지",
    tagline: "스피드형",
    emoji: "🚀",
    img: "/images/3d-icon/image-3.svg",
    highlight: false,
    discount: "50%",
    features: [
      "랜딩페이지 1섹션 ~",
      "반응형 PC & 모바일 최적화",
      "희망 SNS 문의폼 연동",
      "기본 SEO 설정",
    ],
    originalPrice: "780,000원",
    price: "390,000원",
    maintenance: "99,000원",
    adminPrice: "190,000원",
    adminOriginalPrice: "380,000원",
    adminMaintenance: "19,000원",
    note: "VAT 별도",
  },
  {
    id: "grow",
    name: "GROW",
    sub: "랜딩형 홈페이지",
    tagline: "밸런스형",
    emoji: "🌱",
    img: "/images/3d-icon/image-4.svg",
    highlight: false,
    discount: "50%",
    features: [
      "원페이지 형식 홈페이지 1섹션 & 페이지 ~",
      "반응형 PC & 모바일 최적화",
      "희망 SNS 문의폼 연동",
      "헤더 앵커 이동 구성",
      "기본 SEO 설정",
    ],
    originalPrice: "1,180,000원",
    price: "590,000원",
    maintenance: "99,000원",
    adminPrice: "290,000원",
    adminOriginalPrice: "580,000원",
    adminMaintenance: "29,000원",
    note: "VAT 별도",
  },
  {
    id: "master",
    name: "MASTER",
    sub: "홈페이지",
    tagline: "풀 패키지형",
    emoji: "👑",
    img: "/images/3d-icon/image-5.svg",
    highlight: true,
    discount: "50%",
    features: [
      "홈페이지 1페이지 ~",
      "반응형 PC & 모바일 최적화",
      "희망 SNS 문의폼 연동",
      "페이지 로딩 속도 최적화",
      "각 페이지별 URL 생성",
      "SEO 상위 노출 증가",
    ],
    originalPrice: "1,980,000원",
    price: "990,000원",
    maintenance: "99,000원",
    adminPrice: "390,000원",
    adminOriginalPrice: "780,000원",
    adminMaintenance: "39,000원",
    note: "VAT 별도",
  },
];

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
