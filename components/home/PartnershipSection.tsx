import type { IconType } from 'react-icons'
import { SiNaver } from 'react-icons/si'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { TrendingUp } from 'lucide-react'

function IconChip({ Icon, size = 24 }: { Icon: IconType; size?: number }) {
  return (
    <span
      style={{
        width: '46px',
        height: '46px',
        flexShrink: 0,
        borderRadius: 'var(--radius-xl)',
        background: 'var(--accent-light)',
        color: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={size} />
    </span>
  )
}

const CHANNELS: {
  area: string
  Icon: IconType
  name: string
  tag: string
  desc: string
}[] = [
  {
    area: 'bento-ch1',
    Icon: SiNaver,
    name: '네이버 블로그',
    tag: '검색 노출',
    desc: '정보성 콘텐츠를 발행해 네이버 검색 상단에서 잠재 고객을 꾸준히 만납니다.',
  },
  {
    area: 'bento-ch2',
    Icon: FaInstagram,
    name: '인스타그램',
    tag: '브랜드 도달',
    desc: '피드·릴스로 브랜드 분위기를 전하고 팔로워를 잠재 고객으로 전환합니다.',
  },
  {
    area: 'bento-ch3',
    Icon: FaYoutube,
    name: '유튜브 숏폼',
    tag: '바이럴 확산',
    desc: '짧고 강한 숏폼 영상으로 빠르게 브랜드 인지도를 확산시킵니다.',
  },
]

export default function PartnershipSection() {
  return (
    <section
      style={{
        background: '#fff',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) 1.25rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 (좌측 정렬) */}
        <div style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          <span className="footnote emphasized c-accent">제휴 마케팅과의 협약.</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left' }}>
            <span style={{ display: 'block' }}>홈페이지 제작에서 끝나지 않습니다</span>
            <span style={{ display: 'block', paddingTop: '0.5em' }}>
              {'채널 마케팅'.split('').map((ch, i) =>
                ch === ' ' ? (
                  <span key={i}>&nbsp;</span>
                ) : (
                  <span key={i} className="c-accent" style={{ position: 'relative', display: 'inline-block' }}>
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: '-0.28em',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '5px',
                        height: '5px',
                        borderRadius: '9999px',
                        background: 'var(--accent)',
                      }}
                    />
                    {ch}
                  </span>
                )
              )}
              까지 함께 키웁니다
            </span>
          </h2>
        </div>

        {/* 벤토 그리드 */}
        <div className="bento-grid">
          {/* ① 대형 개요 카드 */}
          <div className="bento-card bento-lead">
            <span
              className="caption-1 emphasized c-accent"
              style={{
                alignSelf: 'flex-start',
                background: 'var(--accent-light)',
                padding: '3px 11px',
                borderRadius: '9999px',
                marginBottom: '1rem',
              }}
            >
              협약 혜택
            </span>
            <h3 className="title-3 emphasized" style={{ margin: '0 0 0.75rem', wordBreak: 'keep-all' }}>
              협약 한 번으로 <span className="c-accent">3개 채널</span>에 동시 노출
            </h3>
            <p className="callout" style={{ margin: 0, maxWidth: '420px', wordBreak: 'keep-all' }}>
              블로그·인스타그램·유튜브 숏폼까지, 제작 이후에도 새 고객을 데려오는 마케팅 채널이 함께 작동합니다.
            </p>

            {/* 채널 아이콘 클러스터 */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: 'auto',
                paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}
            >
              <IconChip Icon={SiNaver} />
              <IconChip Icon={FaInstagram} />
              <IconChip Icon={FaYoutube} />
            </div>
          </div>

          {/* ② 지속 유입 카드 */}
          <div className="bento-card bento-sub">
            <IconChip Icon={TrendingUp} />
            <h3 className="headline" style={{ margin: '1rem 0 0.5rem', wordBreak: 'keep-all' }}>
              제작 이후에도 지속되는 유입
            </h3>
            <p className="callout" style={{ margin: 0, wordBreak: 'keep-all' }}>
              콘텐츠가 쌓일수록 검색·추천 유입이 누적되어, 시간이 지날수록 더 강해집니다.
            </p>
          </div>

          {/* ③④⑤ 채널 카드 (아이콘 좌 · 텍스트 우) */}
          {CHANNELS.map(({ area, Icon, name, tag, desc }) => (
            <div
              key={name}
              className={`bento-card ${area}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: '1.1rem' }}
            >
              <IconChip Icon={Icon} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 className="headline" style={{ margin: 0 }}>{name}</h3>
                  <span
                    className="caption-1 emphasized c-accent"
                    style={{ background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '9999px' }}
                  >
                    {tag}
                  </span>
                </div>
                <p className="callout" style={{ margin: 0, wordBreak: 'keep-all' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
