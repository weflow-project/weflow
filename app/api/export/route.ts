// 예약·문의 엑셀 내보내기 엔드포인트 — /api/export
// GET only, 관리자 인증 필요. 관리자 페이지의 다운로드 버튼에서 호출.

import { NextResponse } from 'next/server'
import { bookingStore, inquiryStore } from '@/lib/store'
import * as XLSX from 'xlsx'
import { isAdmin } from '@/lib/adminAuth'

// ?type=bookings | inquiries | all(기본) → 해당 시트를 담은 xlsx 파일을 첨부로 반환
export async function GET(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'all'

  const wb = XLSX.utils.book_new()

  // 예약 데이터를 한글 열 이름으로 바꿔 '예약관리' 시트로
  if (type === 'bookings' || type === 'all') {
    const bookings = (await bookingStore.getAll()).map(b => ({
      상태: b.status === 'pending' ? '대기' : b.status === 'in_progress' ? '진행중' : '완료',
      이름: b.name,
      연락처: b.phone,
      '제작 종류': b.type,
      업종: b.industry,
      '희망일정': `${b.date} ${b.time}`,
      추가요청사항: b.note,
      접수일: new Date(b.createdAt).toLocaleString('ko-KR'),
    }))
    const ws = XLSX.utils.json_to_sheet(bookings)
    XLSX.utils.book_append_sheet(wb, ws, '예약관리')
  }

  // 문의 데이터를 한글 열 이름으로 바꿔 '문의관리' 시트로
  if (type === 'inquiries' || type === 'all') {
    const inquiries = (await inquiryStore.getAll()).map(i => ({
      상태: i.status === 'pending' ? '대기' : i.status === 'in_progress' ? '진행중' : '완료',
      이름: i.name,
      연락처: i.phone,
      '제작 종류': i.type,
      업종: i.industry,
      추가요청사항: i.note,
      출처: i.source || 'web',
      접수일: new Date(i.createdAt).toLocaleString('ko-KR'),
    }))
    const ws = XLSX.utils.json_to_sheet(inquiries)
    XLSX.utils.book_append_sheet(wb, ws, '문의관리')
  }

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const filename = `WEFLOW_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`

  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    },
  })
}
