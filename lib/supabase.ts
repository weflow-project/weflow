import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

// 지연 초기화: 모듈 로드 시점이 아니라 실제 요청 시점에 클라이언트를 만든다.
// (next build 의 page-data 수집 단계에서 env 없이 모듈을 평가해도 throw 하지 않도록)
//
// 키 선택 — 이 모듈은 서버(라우트 핸들러)에서만 쓰인다.
// SUPABASE_SERVICE_ROLE_KEY 가 있으면 그걸 쓴다. 서비스 롤은 RLS를 우회하므로
// DB 정책을 "anon 은 INSERT만" 으로 잠가도 관리자 조회·수정·삭제가 계속 동작한다.
// (anon 키는 브라우저 번들에 그대로 노출되므로, 그 키로는 고객 정보를 읽지 못하게 막아야 한다)
// 서비스 롤 키를 아직 넣지 않았다면 기존처럼 anon 키로 동작한다.
export function getSupabase(): SupabaseClient {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다.'
    )
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
