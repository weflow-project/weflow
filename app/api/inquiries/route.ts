// 문의 접수 엔드포인트 — /api/inquiries
// GET: 관리자 인증 필요 (문의 목록 조회)
// POST: 공개 — 견적·상담 폼에서 호출

import { NextResponse } from 'next/server'
import { inquiryStore } from '@/lib/store'
import { isAdmin } from '@/lib/adminAuth'

// 전체 문의 목록을 최신순으로 반환
export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const inquiries = await inquiryStore.getAll()
  return NextResponse.json(inquiries)
}

// 문의 폼 제출 → 필수값 검증 후 생성된 문의를 201로 반환 (source는 어느 폼에서 왔는지)
export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, type, industry, note, agree, source } = body
  if (!name || !phone || !type) {
    return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
  }
  const item = await inquiryStore.create({ name, phone, type, industry: industry || '', note: note || '', agree: !!agree, source: source || 'web' })
  return NextResponse.json(item, { status: 201 })
}
