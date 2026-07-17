// 모든 페이지 요청보다 먼저 실행되는 미들웨어 (matcher 범위: 정적파일·API 제외).
// 하는 일은 하나 — 경로가 깨진 링크면 홈으로 리다이렉트한다.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 깨진 링크 안전장치:
// 마크다운 대괄호 등 잘못 붙은 문자([ ] ( ))가 URL 경로에 섞여 들어오면
// 404로 이탈시키지 않고 홈으로 보낸다. (예: weflowlab.kr/] → weflowlab.kr/)
const BROKEN = /[[\]()]/

// 경로를 디코딩해 깨진 문자가 있는지 보고, 있으면 홈으로 보낸다
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    // 잘못된 인코딩도 깨진 링크로 간주
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  if (BROKEN.test(pathname) || BROKEN.test(decoded)) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// 정적 파일·API·내부 경로는 제외
export const config = {
  matcher: ['/((?!_next|api).*)'],
}
