// 방문 통계 조회 엔드포인트 — /api/analytics
// GET only, 관리자 인증 필요. 관리자 통계 화면이 원본 방문 기록을 받아 직접 집계한다.

import { NextResponse } from 'next/server'
import { pageViewStore } from '@/lib/store'
import { isAdmin } from '@/lib/adminAuth'

// ?days=N (1~90, 기본 30) → 최근 N일 방문 기록 전체를 반환
export async function GET(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const days = Math.min(Math.max(Number(searchParams.get('days')) || 30, 1), 90)
  const rows = await pageViewStore.getRecent(days)
  return NextResponse.json(rows)
}
