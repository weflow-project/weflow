import type { MetadataRoute } from 'next'

const BASE = 'https://weflowlab.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // 공개 정적 페이지 (관리자 /admin, 사례 상세 /cases/[slug] 는 제외)
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
