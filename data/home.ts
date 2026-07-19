/**
 * 메인페이지용 데이터 — 지금은 강점 카드(features)만 남아 있다.
 * features 는 /pricing 과 PricingSection 이 가져다 쓴다.
 *
 * 미노출이던 processSections·sixSteps·successCases 는 이를 쓰던 컴포넌트와 함께 걷어냈다.
 * 제작 과정 단계는 data/service.ts 의 steps 가 최신본이다.
 */

/** WEFLOW 강점 6가지 */
export const features = [
  { image: '/images/process/process-01-consult.png',    title: 'WEFLOW 케어플랜', desc: '제작+운영+광고+관리 원터치' },
  { image: '/images/process/process-02-plan.png',       title: '제작+운영+광고+관리 원터치', desc: '모든 과정을 한 번에 해결' },
  { image: '/images/process/process-03-design.png',     title: '빠른 제작', desc: '3~7일 로켓배송' },
  { image: '/images/process/process-04-dev.png',        title: '합리적인 가성비', desc: '가성비+퀄리티 동시 제공' },
  { image: '/images/process/process-05-responsive.png', title: '24시간 상담대기', desc: '빠른 상담 및 피드백' },
  { image: '/images/process/process-06-marketing.png',  title: '운영·광고 지원', desc: '사후관리서비스' },
]
