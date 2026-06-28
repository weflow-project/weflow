import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function HeroBanner() {
  return (
    <section
      style={{
        background: "#fff",
        scrollSnapAlign: "start",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "clamp(2.5rem, 5vw, 4rem) 1.25rem",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 아이브로우 */}
        <span className="tag-badge" style={{ marginBottom: "1.4rem" }}>
          홈페이지·랜딩페이지 제작 솔루션
        </span>

        {/* 메인 타이틀 — 리드 문구(낮은 계층) → weflow(최상위 계층) */}
        <h1 style={{ margin: 0, wordBreak: "keep-all" }}>
          <span className="title-2 c-secondary" style={{ display: "block" }}>
            내가 진짜 원하는 페이지로
          </span>
          <span style={{ display: "block", marginTop: "0.4rem" }}>
            <span className="large-title c-secondary">
              우리만의 플로우를 담다,{" "}
            </span>
            <span className="large-title c-accent">WEFLOW</span>
          </span>
        </h1>

        {/* 서브 카피 */}
        {/* <p
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            margin: 'clamp(1rem, 3vw, 1.5rem) 0 0',
            maxWidth: '640px',
            wordBreak: 'keep-all',
          }}
        >
          홈페이지 제작부터 광고 연동·운영 관리까지, <br/> 단순 제작이 아닌 문의로 이어지는 구조까지 설계합니다.
        </p> */}

        {/* CTA 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "0.9rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "clamp(2.75rem, 5vw, 3.5rem)",
          }}
        >
          {/* 채움 버튼 + 말풍선 배지 */}
          <span className="hero-cta">
            <span className="hero-cta-badge">
              🎁 최근 한달 <strong>1,549명</strong> 신청중
            </span>
            <Link
              href="/diagnosis"
              className="btn-primary"
              style={{
                fontSize: "1rem",
                borderRadius: "9999px",
                padding: "0.95rem 2.2rem",
              }}
            >
              무료진단하기
            </Link>
          </span>

          <Link
            href="/#benefits"
            className="btn-outline"
            style={{
              fontSize: "1rem",
              borderRadius: "9999px",
              padding: "0.95rem 2.2rem",
            }}
          >
            WEFLOW 혜택보기
          </Link>
        </div>

        {/* 대표 이미지 캐러셀 (3장 · 3초 자동 좌우 슬라이드) */}
        <HeroCarousel />
      </div>
    </section>
  );
}
