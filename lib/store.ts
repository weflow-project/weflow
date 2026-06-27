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
