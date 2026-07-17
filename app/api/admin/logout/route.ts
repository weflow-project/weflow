// 관리자 로그아웃 엔드포인트 — /api/admin/logout
// POST only. 쿠키를 지우는 것뿐이라 별도 인증 없음.

import { NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/adminAuth'

// 세션 쿠키를 maxAge 0으로 덮어써 즉시 만료시킨다
export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}
