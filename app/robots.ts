// /robots.txt 를 만들어 주는 파일 (빌드 시 생성).
// 검색엔진 크롤러에게 수집 허용 범위와 사이트맵 위치를 알린다.
import type { MetadataRoute } from 'next'

const BASE = 'https://weflowlab.kr'

// 전체 공개 · 관리자와 API만 차단
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
