import { ArrowUpRight, Share2, BadgePercent, Zap, Clock, MessageCircle, Users, Wrench, MonitorSmartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const FEATURES: { Icon: LucideIcon; title: string; desc: string; only?: boolean }[] = [
  { Icon: Share2, title: '제휴 마케팅 연결', desc: '블로그·인스타·유튜브 숏폼까지 제휴 채널로 동시 노출합니다.', only: true },
  { Icon: BadgePercent, title: '합리적 가성비', desc: '필요한 기능만 구성해 부담 없는 합리적인 비용으로 시작합니다.' },
  { Icon: Zap, title: '빠른 제작', desc: '랜딩페이지 3~4일, 홈페이지 약 1주일. 빠르게 오픈합니다.' },
  { Icon: Clock, title: '24시간 상담 대기', desc: '연중무휴 24시간, 언제 문의하셔도 빠르게 응답합니다.' },
  { Icon: MessageCircle, title: '고객의 소리', desc: '충분한 소통으로 고객이 진짜 원하는 것을 먼저 반영합니다.' },
  { Icon: Users, title: '2:1 관리 시스템', desc: '기획자·디자이너 2인이 고객 한 분을 전담 케어합니다.' },
  { Icon: Wrench, title: '각 상품별 전용 유지보수', desc: '도메인·수정·운영까지 상품에 맞춘 유지보수를 제공합니다.' },
  { Icon: MonitorSmartphone, title: '반응형 디자인 (PC/MO)', desc: 'PC·모바일 등 모든 기기에서 최적화된 화면을 보여줍니다.' },
]

export default function ServiceFeatures() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <span className="footnote emphasized c-accent">WEFLOW만의 서비스</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', wordBreak: 'keep-all' }}>
            위플로우만의 강점을
            <br />
            지금 바로 경험하세요
          </h2>
        </div>

        {/* 카드 그리드 */}
        <div className="svc-feat-grid">
          {FEATURES.map(({ Icon, title, desc, only }) => (
            <div key={title} className="svc-feat-card">
              {/* WEFLOW ONLY 배지 */}
              {only && (
                <span
                  className="caption-2 emphasized"
                  style={{
                    position: 'absolute',
                    top: '1.1rem',
                    right: '1.1rem',
                    background: 'var(--accent)',
                    color: '#fff',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                    letterSpacing: '0.04em',
                  }}
                >
                  WEFLOW ONLY
                </span>
              )}

              {/* 아이콘 */}
              <span
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.1rem',
                }}
              >
                <Icon size={22} strokeWidth={2} />
              </span>

              {/* 제목 + 화살표 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <h3 className="headline" style={{ margin: 0, wordBreak: 'keep-all' }}>{title}</h3>
                <ArrowUpRight size={16} strokeWidth={2.2} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              </div>

              {/* 설명 */}
              <p className="callout" style={{ margin: 0, wordBreak: 'keep-all' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .svc-feat-card {
          position: relative;
          background: #f4f6fa;
          border-radius: var(--radius-2xl);
          padding: 1.75rem 1.6rem;
          transition: background 0.18s, transform 0.18s;
        }
        .svc-feat-card:hover { background: #eef1f7; transform: translateY(-3px); }
        @media (max-width: 900px) {
          .svc-feat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .svc-feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
