/**
 * 제작 사례 페이지(/cases)가 쓰는 데이터 — 실제 제작 사례(portfolios) 하나뿐이다.
 * 업종별 예시 사례와 사례 상세(/cases/[slug])는 실제 사례가 아니어서 걷어냈다.
 */

/** 가격표(/pricing)의 제작 플랜과 같은 이름을 쓴다 — 사례와 가격을 바로 이어 보게 */
export type Plan = '랜딩페이지' | '랜딩형 홈페이지' | '홈페이지'

// 실제 제작 사례 — 사진 여러 장을 한 칸에서 자동 전환한다
export interface Portfolio {
  /** React key 용도 — 상세 페이지는 없고 실제 사이트로 바로 연결된다 */
  slug: string
  name: string
  /** 업종 칩으로 거를 때 쓰는 분류 */
  category: string
  /** 어떤 플랜으로 만든 사례인지 — 사진 위 배지로 띄워 가격표와 이어 준다 */
  plan: Plan
  /** 카드 이름 밑 한 줄 소개 */
  desc: string
  /** 누르면 열리는 실제 제작 사이트 */
  url: string
  /** 한 칸에서 자동 전환되는 화면 사진들 */
  images: string[]
}

/**
 * 업종 칩을 늘어놓는 순서 — 여기 적힌 차례 그대로 노출된다.
 * 카드 순서(아래 portfolios)와 따로 노니 여기서 정해준다.
 * 여기 없는 업종은 뒤에 붙는다.
 */
export const categoryOrder = ['회사/기업', '차량', '캠핑/레저', '보험']

// 목록 페이지의 PortfolioShowcase가 그리는 실제 제작 사례 목록
export const portfolios: Portfolio[] = [
  {
    slug: 'kpsc',
    name: 'KPSC',
    category: '회사/기업',
    plan: '홈페이지',
    desc: '지속 가능한 미래 에너지 생태계 구축',
    url: 'https://kpschelpus.vercel.app/',
    images: [
      '/images/cases/cases-kpsc-01.webp',
      '/images/cases/cases-kpsc-02.webp',
      '/images/cases/cases-kpsc-03.webp',
    ],
  },
  {
    slug: 'saedure',
    name: '새두레',
    category: '회사/기업',
    plan: '랜딩페이지',
    desc: '역사와 첨단기술을 잇는 융복합 공연 문화기업',
    url: 'https://mazigut.com/',
    images: [
      '/images/cases/cases-saedure-01.webp',
      '/images/cases/cases-saedure-02.webp',
      '/images/cases/cases-saedure-03.webp',
    ],
  },
  {
    slug: 'ksmobility',
    name: '특장카니발 OO맨',
    category: '차량',
    plan: '랜딩페이지',
    desc: '프리미엄 특장 카니발 전문',
    url: 'https://teukjangman.kr/',
    images: [
      '/images/cases/cases-ksmobility-01.webp',
      '/images/cases/cases-ksmobility-02.webp',
      '/images/cases/cases-ksmobility-03.webp',
    ],
  },
  {
    slug: 'cambiocamp',
    name: 'CAMP OOOOOO',
    category: '캠핑/레저',
    plan: '홈페이지',
    desc: 'OOO 캠핑장',
    url: 'https://cambiocamp.vercel.app/',
    images: [
      '/images/cases/cases-cambiocamp-01.webp',
      '/images/cases/cases-cambiocamp-02.webp',
      '/images/cases/cases-cambiocamp-03.webp',
    ],
  },
  {
    slug: 'incar',
    name: 'OOOOOOO 베스트사업단',
    category: '보험',
    plan: '랜딩형 홈페이지',
    desc: '보험설계사 신입 · 경력 공개채용',
    url: 'https://incarr.vercel.app/',
    images: [
      '/images/cases/cases-incar-01.webp',
      '/images/cases/cases-incar-02.webp',
      '/images/cases/cases-incar-03.webp',
    ],
  },
  {
    slug: 'leesiyeon',
    name: 'OOO 설계사',
    category: '보험',
    plan: '랜딩형 홈페이지',
    desc: '보장분석 · 연금 · 자산관리 보험 설계',
    url: 'https://leesiyeon.vercel.app/',
    images: [
      '/images/cases/cases-leesiyeon-01.webp',
      '/images/cases/cases-leesiyeon-02.webp',
      '/images/cases/cases-leesiyeon-03.webp',
    ],
  },
  {
    slug: 'ruricompany',
    name: 'OO컴퍼니',
    category: '차량',
    plan: '랜딩페이지',
    desc: '신차 할부 · 리스 · 장기렌트 상담',
    url: 'https://ruricompany.vercel.app/',
    images: [
      '/images/cases/cases-ruricompany-01.webp',
      '/images/cases/cases-ruricompany-02.webp',
      '/images/cases/cases-ruricompany-03.webp',
    ],
  },
  {
    slug: 'parknara',
    name: 'OOO 컨설턴트',
    category: '보험',
    plan: '랜딩형 홈페이지',
    desc: '보장분석 · 연금 · 자산관리 보험 설계',
    url: 'https://parknara.vercel.app/',
    images: [
      '/images/cases/cases-parknara-01.webp',
      '/images/cases/cases-parknara-02.webp',
      '/images/cases/cases-parknara-03.webp',
    ],
  },
]
