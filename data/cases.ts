/**
 * 성공 사례 페이지(/cases)가 쓰는 데이터 — 실제 제작 사례(portfolios) 하나뿐이다.
 * 업종별 예시 사례와 사례 상세(/cases/[slug])는 실제 사례가 아니어서 걷어냈다.
 */

// 실제 제작 사례 — 사진 여러 장을 한 칸에서 자동 전환한다
export interface Portfolio {
  /** React key 용도 — 상세 페이지는 없고 실제 사이트로 바로 연결된다 */
  slug: string
  name: string
  /** 업종 칩으로 거를 때 쓰는 분류 */
  category: string
  /** 카드 이름 밑 한 줄 소개 */
  desc: string
  /** 누르면 열리는 실제 제작 사이트 */
  url: string
  /** 한 칸에서 자동 전환되는 화면 사진들 */
  images: string[]
}

// 목록 페이지의 PortfolioShowcase가 그리는 실제 제작 사례 목록
export const portfolios: Portfolio[] = [
  {
    slug: 'ksmobility',
    name: '특장카니발 특장맨',
    category: '영업 직종',
    desc: '프리미엄 특장 카니발 전문',
    url: 'https://ksmobility-v2.vercel.app/',
    images: [
      '/images/cases/cases-ksmobility-01.jpg',
      '/images/cases/cases-ksmobility-02.jpg',
      '/images/cases/cases-ksmobility-03.jpg',
    ],
  },
  {
    slug: 'parknara',
    name: '박나라 컨설턴트',
    category: '영업 직종',
    desc: '메타리치THE한빛 박나라 컨설턴트',
    url: 'https://parknara.vercel.app/',
    images: [
      '/images/cases/cases-parknara-01.png',
      '/images/cases/cases-parknara-02.png',
      '/images/cases/cases-parknara-03.png',
    ],
  },
]
