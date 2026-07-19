// /sitemap.xml 을 만들어 주는 파일 (빌드 시 생성).
// 검색엔진에 공개 페이지 목록과 각 페이지의 중요도·갱신 주기를 넘긴다.
import type { MetadataRoute } from 'next'

const BASE = 'https://weflowlab.kr'

// 아래 경로 목록을 sitemap 항목으로 변환한다
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // 공개 정적 페이지 (관리자 /admin 은 제외)
  const paths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/service', priority: 0.9, freq: 'weekly' },
    { path: '/pricing', priority: 0.9, freq: 'weekly' },
    { path: '/cases', priority: 0.8, freq: 'weekly' },
    { path: '/reviews', priority: 0.8, freq: 'weekly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/benefits', priority: 0.7, freq: 'monthly' },
    { path: '/diagnosis', priority: 0.8, freq: 'monthly' },
    { path: '/booking', priority: 0.6, freq: 'monthly' },
  ]

  return paths.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }))
}
