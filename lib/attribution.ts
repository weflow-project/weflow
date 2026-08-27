/**
 * 유입 경로 캡처 — 어떤 광고·검색·링크로 들어온 방문자가 문의까지 왔는지 잇는다.
 *
 * 첫 방문(랜딩) 때 URL 파라미터(네이버 파워링크 n_*, UTM, gclid, fbclid)와
 * 리퍼러를 sessionStorage 에 한 번 저장해 두고, 문의 제출 시 사람이 읽는
 * 한 줄("네이버 광고 · 키워드: 거실커튼")로 만들어 문의 메모에 붙인다.
 * 아뜰리에 사이트에서 실제 광고 문의를 잡아낸 것과 같은 방식이다.
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
}

const STORAGE_KEY = 'weflow_attr'

/** 첫 방문 시 1회 저장 — 이미 있으면 덮어쓰지 않는다 (최초 유입 기준) */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const sp = new URLSearchParams(window.location.search)
    const attr: Attribution = {}
    ATTR_KEYS.forEach(k => {
      const v = sp.get(k)
      if (v) attr[k] = v
    })
    attr.landing = window.location.pathname
    attr.referrer = document.referrer || undefined
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr))
  } catch {
    /* 프라이빗 모드 등 접근 불가면 그냥 넘어간다 */
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
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
  const keyword = a.n_keyword || a.n_query || a.utm_term || a.kw || ''

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
