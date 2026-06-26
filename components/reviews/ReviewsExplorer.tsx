'use client'
import { useMemo, useState } from 'react'
import { reviews, reviewCategories, type Review } from '@/data/reviews'

function ReviewCard({ review }: { review: Review }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-2xl)',
      padding: '1.5rem 1.6rem',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span style={{ color: '#f59e0b', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
          {'★'.repeat(review.star)}
        </span>
        <span className="caption-1 c-muted">{review.category}</span>
      </div>
      <p className="footnote c-primary" style={{
        margin: '0 0 0.75rem', lineHeight: 1.65, wordBreak: 'keep-all', flex: 1,
      }}>&ldquo;{review.text}&rdquo;</p>
      <p className="caption-1" style={{ margin: 0 }}>{review.name}</p>
    </div>
  )
}

type Sort = '추천순' | '별점순'

export default function ReviewsExplorer() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('전체')
  const [sort, setSort] = useState<Sort>('추천순')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = reviews.filter(r => {
      const matchCat = activeCategory === '전체' || r.category === activeCategory
      const matchQuery = !q
        || r.name.toLowerCase().includes(q)
        || r.text.toLowerCase().includes(q)
        || r.category.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
    if (sort === '별점순') {
      // 동점은 원본 순서 유지 (안정 정렬)
      list = list
        .map((r, i) => ({ r, i }))
        .sort((a, b) => b.r.star - a.r.star || a.i - b.i)
        .map(x => x.r)
    }
    return list
  }, [query, activeCategory, sort])

  return (
    <section style={{
      background: 'var(--bg-secondary)',
      minHeight: 'calc(100vh - 64px)',
      padding: 'clamp(2rem, 4vw, 3.5rem) 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '1.75rem' }}>
          <p className="footnote emphasized c-accent" style={{ marginBottom: '0.5rem' }}>고객의 찐후기</p>
          <h1 className="title-1" style={{ marginBottom: '0.35rem' }}>고객 후기</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{'★'.repeat(5)}</span>
            <span className="footnote emphasized c-secondary">5.0</span>
            <span style={{ color: 'var(--border)', fontSize: '0.75rem' }}>·</span>
            <span className="footnote c-muted">{reviews.length}개 후기</span>
          </div>
        </div>

        {/* 검색 + 정렬 */}
        <div style={{
          display: 'flex', gap: '0.6rem', flexWrap: 'wrap',
          alignItems: 'center', marginBottom: '0.9rem',
        }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="업종·내용으로 검색"
            className="footnote"
            style={{
              flex: '1 1 240px', minWidth: 0,
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '0.65rem 0.9rem',
              color: 'var(--text)', outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
          />
          <div style={{ display: 'inline-flex', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0.2rem', gap: '0.2rem' }}>
            {(['추천순', '별점순'] as Sort[]).map(s => {
              const isActive = s === sort
              return (
                <button key={s} onClick={() => setSort(s)} className="footnote" style={{
                  padding: '0.45rem 0.85rem', border: 'none', cursor: 'pointer',
                  borderRadius: 'var(--radius-md)', whiteSpace: 'nowrap',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.18s ease',
                }}>
                  {s === '별점순' ? '별점 높은순' : '추천순'}
                </button>
              )
            })}
          </div>
        </div>

        {/* 카테고리 필터칩 */}
        <div style={{
          display: 'flex', gap: '0.5rem', overflowX: 'auto',
          paddingBottom: '0.25rem', marginBottom: '1.25rem',
          scrollbarWidth: 'none',
        } as React.CSSProperties}>
          {reviewCategories.map(cat => {
            const isActive = cat === activeCategory
            const count = cat === '전체' ? reviews.length : reviews.filter(r => r.category === cat).length
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="subhead" style={{
                flexShrink: 0, padding: '0.4rem 1rem',
                background: isActive ? 'var(--accent)' : '#fff',
                border: isActive ? 'none' : '1px solid var(--border)',
                borderRadius: '9999px', cursor: 'pointer',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.18s ease', whiteSpace: 'nowrap',
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              }}>
                {cat}
                <span className="caption-2 semibold" style={{
                  color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)',
                  opacity: isActive ? 1 : 0.7,
                }}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* 결과 카운트 */}
        <p className="footnote c-muted" style={{ marginBottom: '1rem' }}>
          {filtered.length}개 후기
        </p>

        {/* 그리드 / 빈 상태 */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 1rem',
            border: '1px dashed var(--border)', borderRadius: 'var(--radius-2xl)',
            background: '#fff',
          }}>
            <p className="subhead c-secondary" style={{ marginBottom: '0.35rem' }}>검색 결과가 없습니다</p>
            <p className="footnote c-muted">다른 업종이나 키워드로 검색해 보세요.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
          }}>
            {filtered.map((r, i) => <ReviewCard key={`${r.name}-${i}`} review={r} />)}
          </div>
        )}
      </div>
    </section>
  )
}
