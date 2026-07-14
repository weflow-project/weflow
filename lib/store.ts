import { getSupabase } from './supabase'

export interface Booking {
  id: string
  status: 'pending' | 'in_progress' | 'done'
  name: string
  phone: string
  type: string
  industry: string
  note: string
  date: string
  time: string
  createdAt: string
}

export interface Inquiry {
  id: string
  status: 'pending' | 'in_progress' | 'done'
  name: string
  phone: string
  type: string
  industry: string
  note: string
  source?: string
  agree: boolean
  createdAt: string
}

function toBooking(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    status: row.status as Booking['status'],
    name: row.name as string,
    phone: row.phone as string,
    type: row.type as string,
    industry: (row.industry as string) || '',
    note: (row.note as string) || '',
    date: row.date as string,
    time: row.time as string,
    createdAt: row.created_at as string,
  }
}

function toInquiry(row: Record<string, unknown>): Inquiry {
  return {
    id: row.id as string,
    status: row.status as Inquiry['status'],
    name: row.name as string,
    phone: row.phone as string,
    type: row.type as string,
    industry: (row.industry as string) || '',
    note: (row.note as string) || '',
    source: (row.source as string) || 'web',
    agree: (row.agree as boolean) || false,
    createdAt: row.created_at as string,
  }
}

export const bookingStore = {
  getAll: async (): Promise<Booking[]> => {
    const { data, error } = await getSupabase()
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data ?? []).map(toBooking)
  },

  create: async (input: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> => {
    const { data, error } = await getSupabase()
      .from('bookings')
      .insert({ ...input, status: 'pending' })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return toBooking(data)
  },

  update: async (id: string, patch: Partial<Booking>): Promise<Booking | null> => {
    const { createdAt, ...rest } = patch as Partial<Booking> & { createdAt?: string }
    const { data, error } = await getSupabase()
      .from('bookings')
      .update(rest)
      .eq('id', id)
      .select()
      .single()
    if (error) return null
    return toBooking(data)
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await getSupabase().from('bookings').delete().eq('id', id)
    return !error
  },
}

export interface PageView {
  id: string
  sessionId: string
  path: string
  referrer: string
  source: string
  medium: string
  campaign: string
  device: string
  durationMs: number | null
  maxScroll: number | null
  createdAt: string
}

function toPageView(row: Record<string, unknown>): PageView {
  return {
    id: row.id as string,
    sessionId: row.session_id as string,
    path: row.path as string,
    referrer: (row.referrer as string) || '',
    source: (row.source as string) || 'direct',
    medium: (row.medium as string) || '',
    campaign: (row.campaign as string) || '',
    device: (row.device as string) || 'desktop',
    durationMs: (row.duration_ms as number) ?? null,
    maxScroll: (row.max_scroll as number) ?? null,
    createdAt: row.created_at as string,
  }
}

export const pageViewStore = {
  // 최근 N일 방문 기록 (관리자 통계 집계용)
  // Supabase는 한 응답에 최대 1000행만 주므로 1000행씩 끝까지 이어서 가져온다.
  // (한 번에 받으면 오래된 1000행에서 잘려 최근 방문이 통계에서 사라진다)
  getRecent: async (days = 30): Promise<PageView[]> => {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
    const PAGE = 1000
    const rows: PageView[] = []
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await getSupabase()
        .from('page_views')
        .select('*')
        .gte('created_at', since)
        .order('created_at', { ascending: true })
        .order('id', { ascending: true }) // 동일 시각 행의 페이지 경계 흔들림 방지
        .range(from, from + PAGE - 1)
      if (error) throw new Error(error.message)
      rows.push(...(data ?? []).map(toPageView))
      if (!data || data.length < PAGE) break
    }
    return rows
  },

  create: async (input: {
    sessionId: string; path: string; referrer: string
    source: string; medium: string; campaign: string; device: string
  }): Promise<{ id: string }> => {
    const { data, error } = await getSupabase()
      .from('page_views')
      .insert({
        session_id: input.sessionId, path: input.path, referrer: input.referrer,
        source: input.source, medium: input.medium, campaign: input.campaign, device: input.device,
      })
      .select('id')
      .single()
    if (error) throw new Error(error.message)
    return { id: data.id as string }
  },

  // 페이지 이탈 시 체류시간 + 스크롤 최대 도달률 기록 (정밀 방식)
  setDuration: async (id: string, durationMs: number, maxScroll?: number): Promise<void> => {
    const patch: Record<string, number> = { duration_ms: durationMs }
    if (typeof maxScroll === 'number') patch.max_scroll = maxScroll
    await getSupabase().from('page_views').update(patch).eq('id', id)
  },
}

export const inquiryStore = {
  getAll: async (): Promise<Inquiry[]> => {
    const { data, error } = await getSupabase()
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data ?? []).map(toInquiry)
  },

  create: async (input: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<Inquiry> => {
    const { data, error } = await getSupabase()
      .from('inquiries')
      .insert({ ...input, status: 'pending' })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return toInquiry(data)
  },

  update: async (id: string, patch: Partial<Inquiry>): Promise<Inquiry | null> => {
    const { createdAt, ...rest } = patch as Partial<Inquiry> & { createdAt?: string }
    const { data, error } = await getSupabase()
      .from('inquiries')
      .update(rest)
      .eq('id', id)
      .select()
      .single()
    if (error) return null
    return toInquiry(data)
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await getSupabase().from('inquiries').delete().eq('id', id)
    return !error
  },
}
