// 예약 접수 엔드포인트 — /api/bookings
// GET: 관리자 인증 필요 (예약 목록 조회)
// POST: 공개 — 사이트 예약 폼에서 호출

import { NextResponse } from 'next/server'
import { bookingStore } from '@/lib/store'
import { isAdmin } from '@/lib/adminAuth'

// 전체 예약 목록을 최신순으로 반환
export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const bookings = await bookingStore.getAll()
  return NextResponse.json(bookings)
}

// 예약 폼 제출 → 필수값 검증 후 생성된 예약을 201로 반환
export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, type, industry, note, date, time } = body
  if (!name || !phone || !type || !date || !time) {
    return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
  }
  const item = await bookingStore.create({ name, phone, type, industry: industry || '', note: note || '', date, time })
  return NextResponse.json(item, { status: 201 })
}
