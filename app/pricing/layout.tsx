// /pricing 전용 메타데이터 (page.tsx가 'use client'라 여기서 정의한다)
import type { Metadata } from 'next'
import { makePlans } from '@/data/pricing'

export const metadata: Metadata = {
  title: '제작 플랜 · 가격 안내 · WEFLOW',
  description:
    '랜딩페이지부터 기업형 홈페이지까지, WEFLOW의 제작 플랜별 구성과 가격을 확인하세요.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: '제작 플랜 · 가격 안내 · WEFLOW',
    description:
      '랜딩페이지부터 기업형 홈페이지까지, WEFLOW의 제작 플랜별 구성과 가격을 확인하세요.',
    url: '/pricing',
  },
}

/** "390,000원" → 390000. 표시용 문자열 하나만 고치면 아래 구조화 데이터도 같이 따라오게 한다 */
const won = (s: string) => Number(s.replace(/[^0-9]/g, ''))

// 판매가를 숨긴 플랜(price: "?")은 숫자가 안 나오므로 걸러낸다 —
// 전부 숨김이면 구조화 데이터에 금액을 아예 싣지 않는다
const prices = makePlans.map(p => won(p.price)).filter(n => Number.isFinite(n) && n > 0)

/**
 * 제작 플랜을 검색엔진·AI 답변엔진이 읽을 수 있는 형태로 내보낸다.
 * "홈페이지 제작 얼마인가요" 같은 질문에 금액과 구성이 그대로 인용되도록,
 * 화면에 보이는 값(data/pricing.ts)에서 직접 만들어 쓴다 — 따로 적어두면 어긋난다.
 */
const PRICING_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '홈페이지 제작',
  serviceType: '홈페이지 제작',
  description:
    'WEFLOW의 홈페이지 제작 플랜. 랜딩페이지·랜딩형 홈페이지·홈페이지 세 가지로 나뉘며, 관리자 페이지를 옵션으로 더할 수 있다. 모든 금액은 VAT 별도.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'WEFLOW',
    alternateName: '위플로우',
    url: 'https://weflowlab.kr',
  },
  areaServed: { '@type': 'Country', name: '대한민국' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'KRW',
    ...(prices.length > 0 ? { lowPrice: Math.min(...prices), highPrice: Math.max(...prices) } : {}),
    offerCount: makePlans.length,
    offers: makePlans.map(p => ({
      '@type': 'Offer',
      name: p.sub,
      category: p.name,
      // 가격을 숨긴 상태라 금액이 들어가던 자리는 견적 안내로 둔다
      description: [p.features.join(' · '), '가격·유지보수·관리자 페이지 옵션은 견적 문의'].join(' / '),
      url: 'https://weflowlab.kr/pricing',
      availability: 'https://schema.org/InStock',
      ...(Number.isFinite(won(p.price)) && won(p.price) > 0
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: won(p.price),
              priceCurrency: 'KRW',
              valueAddedTaxIncluded: false,
            },
          }
        : {}),
    })),
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_JSON_LD) }}
      />
      {children}
    </>
  )
}