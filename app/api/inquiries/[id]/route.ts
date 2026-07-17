// 문의 개별 항목 엔드포인트 — /api/inquiries/[id]
// PATCH·DELETE 모두 관리자 인증 필요 (관리자 페이지의 상태 변경·삭제용)

import { NextResponse } from 'next/server'
import { inquiryStore } from '@/lib/store'
import { isAdmin } from '@/lib/adminAuth'

// 요청 본문의 필드만 부분 수정 (주로 status 변경) → 수정된 문의 반환
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const updated = await inquiryStore.update(id, body)
  if (!updated) return NextResponse.json({ error: '항목을 찾을 수 없습니다.' }, { status: 404 })
  return NextResponse.json(updated)
}

// 문의 삭제 — 없는 id면 404
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const ok = await inquiryStore.delete(id)
  if (!ok) return NextResponse.json({ error: '항목을 찾을 수 없습니다.' }, { status: 404 })
  return NextResponse.json({ success: true })
}
