/**
 * 메인페이지용 데이터 모음 — 강점 / 진행 과정 / 6단계 / 업종 사례.
 *
 * 주의: 지금은 이 파일의 네 배열 모두 실제 화면에 나오지 않는다.
 * features 를 쓰는 FeaturesSection, processSections·sixSteps 를 쓰는 ProcessSection 은
 * 둘 다 app/page.tsx 에 붙어 있지 않고, successCases 는 가져다 쓰는 곳이 아예 없다.
 * 메인 개편 과정에서 떨어져 나온 것으로 보이며, 되살릴지 지울지 정리가 필요하다.
 */

/** WEFLOW 강점 6가지 — FeaturesSection 의 카드 (현재 미노출) */
export const features = [
  { image: '/images/process/process-01-consult.png',    title: 'WEFLOW 케어플랜', desc: '제작+운영+광고+관리 원터치' },
  { image: '/images/process/process-02-plan.png',       title: '제작+운영+광고+관리 원터치', desc: '모든 과정을 한 번에 해결' },
  { image: '/images/process/process-03-design.png',     title: '빠른 제작', desc: '3~7일 로켓배송' },
  { image: '/images/process/process-04-dev.png',        title: '합리적인 가성비', desc: '가성비+퀄리티 동시 제공' },
  { image: '/images/process/process-05-responsive.png', title: '24시간 상담대기', desc: '빠른 상담 및 피드백' },
  { image: '/images/process/process-06-marketing.png',  title: '운영·광고 지원', desc: '사후관리서비스' },
]

/** 제작 과정 4단계 — ProcessSection 왼쪽 카드. 번호는 배열 순서로 매긴다 (현재 미노출) */
export const processSections = [
  { step: '고객 상담', desc: '업종과 방향을 파악합니다', icon: '💬' },
  { step: '협의 후 제작', desc: '문의 구조와 전략을 설계합니다', icon: '✏️' },
  { step: '3~7일 완료', desc: '빠르게 제작하고 납품합니다', icon: '⚡' },
  { step: '광고 및 운영 사후관리', desc: '지속적인 성장을 지원합니다', icon: '📈' },
]

/**
 * 제작 과정 6단계 — ProcessSection 오른쪽 카드 (현재 미노출).
 * data/service.ts 의 steps 와 내용이 겹치지만 그쪽이 /service 의 최신본이다.
 */
export const sixSteps = [
  { num: '01', title: '상담·진단', desc: '업종 및 제작 방향 확인' },
  { num: '02', title: '기획·설계', desc: '문의 구조 및 전략 설계' },
  { num: '03', title: '디자인', desc: '브랜드 맞춤 화면 구성' },
  { num: '04', title: '개발·제작', desc: '기능구현 최적화 검수 및 수정 진행' },
  { num: '05', title: 'SEO 최적화', desc: '네이버·구글·사이트맵 등록' },
  { num: '06', title: '광고운영·사후관리', desc: '인스타·블로그·네이버키워드 광고 운영관리' },
]

/** 업종 사례 라벨 + 대표 색 — 가져다 쓰는 곳이 없다 (data/cases.ts 로 대체된 듯) */
export const successCases = [
  { label: 'PT샵', color: '#6366f1' },
  { label: '필라테스', color: '#ec4899' },
  { label: '보험 설계', color: '#f59e0b' },
  { label: '카센타', color: '#10b981' },
  { label: '세무사 사무소', color: '#3b82f6' },
]
