// 관리자 로그인 엔드포인트 — /api/admin/login
// POST only, 공개(로그인 전이므로). 관리자 로그인 화면에서 호출.

import { NextResponse } from 'next/server'
import { createSession, ADMIN_COOKIE, ADMIN_MAX_AGE } from '@/lib/adminAuth'

// 서버에서 비밀번호 검증 → 성공 시 httpOnly 세션 쿠키 발급
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: string }
  // 환경변수 미설정 시 임시 기본값(서버에서만 검증, 브라우저 노출 없음). 배포 후 Vercel에 ADMIN_PASSWORD 설정 권장.
  const expected = process.env.ADMIN_PASSWORD || 'weflow'
  if (body.password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_MAX_AGE,
  })
  return res
}
