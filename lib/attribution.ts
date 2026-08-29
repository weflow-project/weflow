/**
 * 유입 경로 캡처 — 어떤 광고·검색·링크로 들어온 방문자가 문의까지 왔는지 잇는다.
 *
 * 랜딩 때 URL 파라미터(네이버 파워링크 n_*, UTM, gclid, fbclid)와 리퍼러를 저장해 두고,
 * 문의 제출 시 사람이 읽는 한 줄("네이버 광고 · 키워드: 거실커튼")로 만들어 메모에 붙인다.
 *
 * 저장 규칙
 * - localStorage 에 30일 보관 → 낮에 광고 클릭하고 며칠 뒤 다시 와서 문의해도 광고로 잡힌다.
 * - 광고 파라미터가 있는 방문은 기존 값을 덮어쓴다(마지막 광고 클릭 기준).
 *   파라미터 없는 방문은 이미 저장된 값을 건드리지 않는다.
 * - 히어로 문구·폼 프리필용 키워드는 sessionStorage 에 따로 두어 같은 탭 안에서만 쓴다
 *   (며칠 뒤 직접 들어온 사람에게 예전 키워드 문구를 보여주지 않기 위해).
 */

const ATTR_KEYS = [
  // 네이버 검색광고 자동 추적 URL 파라미터
  'n_media', 'n_query', 'n_rank', 'n_ad', 'n_keyword', 'n_keyword_id',
  'n_campaign_type', 'n_ad_group', 'n_ad_group_type', 'n_match', 'n_network',
  // 공통 UTM / 광고 클릭 ID / 커스텀
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'kw', 'gclid', 'fbclid',
] as const

export type Attribution = Partial<Record<(typeof ATTR_KEYS)[number], string>> & {
  landing?: string
  referrer?: string
  ts?: number
}

const STORAGE_KEY = 'weflow_attr'
const SESSION_KW_KEY = 'weflow_attr_kw'
const TTL_MS = 30 * 24 * 60 * 60 * 1000

/** URL 에서 광고·UTM 파라미터만 추려낸다 (없으면 빈 객체) */
function readParams(): Attribution {
  const sp = new URLSearchParams(window.location.search)
  const attr: Attribution = {}
  ATTR_KEYS.forEach(k => {
    const v = sp.get(k)
    if (v) attr[k] = v
  })
  return attr
}

function pickKeyword(a: Attribution): string {
  return a.n_keyword || a.n_query || a.utm_term || a.kw || ''
}

/** 랜딩마다 호출 — 광고 파라미터가 있으면 덮어쓰고, 없으면 기존 값을 유지한다 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    const params = readParams()
    const hasAd = Object.keys(params).length > 0
    const existing = getAttribution()

    if (!hasAd && existing) return

    const attr: Attribution = {
      ...params,
      landing: window.location.pathname,
      referrer: document.referrer || undefined,
      ts: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attr))

    const kw = pickKeyword(params)
    if (kw) sessionStorage.setItem(SESSION_KW_KEY, kw)
  } catch {
    /* 프라이빗 모드 등 접근 불가면 그냥 넘어간다 */
  }
}

/** 저장된 유입 정보 — 30일 지났으면 없는 것으로 본다 */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const a = JSON.parse(raw) as Attribution
    if (a.ts && Date.now() - a.ts > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return a
  } catch {
    return null
  }
}

/**
 * 유입 키워드(히어로 문구·폼 프리필용) — 현재 URL 의 파워링크 n_keyword → n_query → utm_term → kw,
 * 없으면 같은 탭에서 랜딩 때 저장한 값. 탭이 바뀌면 비어 있다.
 */
export function getEntryKeyword(): string {
  if (typeof window === 'undefined') return ''
  const fromUrl = pickKeyword(readParams())
  if (fromUrl) return fromUrl
  try {
    return sessionStorage.getItem(SESSION_KW_KEY) || ''
  } catch {
    return ''
  }
}

/** 리퍼러 호스트를 아는 채널 이름으로 */
function referrerChannel(referrer: string): string {
  let host = ''
  try {
    host = new URL(referrer).hostname
  } catch {
    return ''
  }
  if (host.includes('blog.naver')) return '네이버 블로그'
  if (host.includes('naver')) return '네이버 검색'
  if (host.includes('google')) return '구글 검색'
  if (host.includes('instagram')) return '인스타그램'
  if (host.includes('facebook')) return '페이스북'
  if (host.includes('youtube')) return '유튜브'
  if (host.includes('kakao')) return '카카오'
  if (host.includes('daum')) return '다음'
  if (host.includes('daangn') || host.includes('karrot')) return '당근'
  return host
}

/**
 * 저장된 유입 정보를 사람이 읽는 한 줄로.
 * 예: "네이버 광고 · 키워드: 거실커튼" / "네이버 검색" / "직접 유입"
 */
export function attributionLine(): string {
  const a = getAttribution()
  if (!a) return ''
  const keyword = pickKeyword(a)

  let channel = ''
  if (a.n_media || a.n_keyword || a.n_query || a.n_ad) channel = '네이버 광고'
  else if (a.gclid) channel = '구글 광고'
  else if (a.fbclid) channel = '메타 광고'
  else if (a.utm_source) {
    const KO: Record<string, string> = {
      naver: '네이버', google: '구글', instagram: '인스타그램', facebook: '페이스북',
      meta: '메타', youtube: '유튜브', kakao: '카카오', band: '밴드', daangn: '당근',
    }
    const name = KO[a.utm_source.toLowerCase()] || a.utm_source
    channel = a.utm_medium === 'cpc' || a.utm_medium === 'paid' ? `${name} 광고` : name
  } else if (a.referrer) channel = referrerChannel(a.referrer)
  else channel = '직접 유입'

  if (!channel) channel = '직접 유입'
  return keyword ? `${channel} · 키워드: ${keyword}` : channel
}
