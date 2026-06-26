export default function ServiceSwitch() {
  return (
    <section
      style={{
        background: '#fff',
        padding: 'clamp(4rem, 9vw, 7rem) 1.25rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <p className="footnote emphasized c-accent" style={{ margin: '0 0 0.85rem' }}>여기서 하나 더</p>
        <h2 className="title-1" style={{ margin: 0, wordBreak: 'keep-all', lineHeight: 1.35 }}>
          타 서비스에서 전환하신다면?
          <br />
          <span className="c-accent emphasized">추가혜택</span>까지 받아가세요!
        </h2>
      </div>
    </section>
  )
}
