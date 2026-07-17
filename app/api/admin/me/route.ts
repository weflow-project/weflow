// 관리자 세션 확인 엔드포인트 — /api/admin/me
// GET only. 쿠키만 검사해 { authed } 를 돌려준다.

import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'

// 현재 로그인 상태 확인용 (관리자 페이지 진입 시 호출)
export async function GET() {
  return NextResponse.json({ authed: await isAdmin() })
}
