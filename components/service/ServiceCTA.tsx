import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ServiceCTA() {
  return (
    <section style={{
      padding: '3.5rem 1.5rem', background: '#f9fafb',
      borderTop: '1px solid var(--border)',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%', textAlign: 'center' }}>

        <p className="caption-1 emphasized c-accent" style={{
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.85rem',
        }}>GET STARTED</p>

        <h2 className="title-1" style={{
          marginBottom: '1rem', wordBreak: 'keep-all',
        }}>
          지금 바로 시작하세요
        </h2>

        <p className="callout c-muted" style={{
          marginBottom: '2rem', wordBreak: 'keep-all',
        }}>
          무료 진단을 통해 내 사이트의 문제를 파악하고<br />찾아오는 고객을 늘려보세요.
        </p>

        {/* CTA 버튼 */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <Link href="/diagnosis" className="btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontSize: '0.95rem', padding: '0.85rem 1.75rem',
          }}>
            무료 진단 신청 <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
