import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

// 글자 단위 등장 — 자리는 유지하고 투명→나타남 (start: 앞선 글자 수, step: 글자 간격)
function Chars({
  text,
  start = 0,
  step = 0.03,
}: {
  text: string;
  start?: number;
  step?: number;
}) {
  return (
    <>
      {Array.from(text.replace(/ /g, " ")).map((ch, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ animationDelay: `${(start + i) * step}s` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

const LINE1 = "내가 진짜 원하는 페이지";
const LINE2A = "우리만의 플로우를 담다, ";
const LINE2B = "WEFLOW";

export default function HeroBanner() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* 배경 영상 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
      </video>
      {/* 가독성 오버레이 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.3)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1150px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 아이브로우 */}
        <span
          className="tag-badge hero-eyebrow"
          style={{ fontSize: "0.95rem" }}
        >
          홈페이지 메인 제작 솔루션
        </span>

        {/* 메인 타이틀 — 리드 문구(낮은 계층) → weflow(최상위 계층) */}
        <h1 style={{ margin: 0, wordBreak: "keep-all", lineHeight: 1.5 }}>
          <span
            className="title-2"
            style={{
              display: "block",
              color: "#fff",
              fontSize: "clamp(1.4rem, 4.8vw, 2.9rem)",
            }}
          >
            <Chars text={LINE1} start={0} />
          </span>
          <span
            className="hero-line2"
            style={{
              display: "block",
              marginTop: "0.95rem",
            }}
          >
            <span
              className="large-title"
              style={{
                color: "#fff",
                fontSize: "clamp(1.65rem, 7.8vw, 4.6rem)",
                whiteSpace: "nowrap",
              }}
            >
              <Chars text={LINE2A} start={LINE1.length} />
            </span>
            <span
              className="large-title hero-weflow"
              style={{
                color: "#fff",
                fontSize: "clamp(2.8rem, 11.8vw, 5.5rem)",
                fontWeight: 900,
                letterSpacing: "0.02em",
                textShadow:
                  "0 0 30px rgba(88,138,226,0.9), 0 0 12px rgba(88,138,226,0.7), 0 3px 12px rgba(0,0,0,0.3)",
              }}
            >
              <Chars text={LINE2B} start={LINE1.length + LINE2A.length} />
            </span>
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
                fontSize: "1.25rem",
                borderRadius: "9999px",
                padding: "1.05rem 2.5rem",
              }}
            >
              무료 진단하기
            </Link>
          </span>

          <Link
            href="/#benefits"
            className="btn-primary"
            style={{
              fontSize: "1.25rem",
              borderRadius: "9999px",
              padding: "1.05rem 2.5rem",
              background: "var(--accent-dim)",
            }}
          >
            WEFLOW 혜택보기
          </Link>
        </div>

        {/* 대표 이미지 캐러셀 (10장 · 3초 자동 좌우 슬라이드) */}
        <HeroCarousel />
      </div>

      <style>{`
        /* 히어로 배지(신청중) 글씨 확대 */
        .hero-cta-badge { font-size: 0.92rem; }

        /* 히어로 섹션 패딩 (모바일에서 상단 여백 축소) */
        .hero-section {
          min-height: calc(100vh + 80px);
          justify-content: center;
          padding: clamp(5.5rem, 13vh, 9.75rem) 1.25rem clamp(3rem, 6vw, 5rem);
        }

        /* 아이브로우 배지 아래 여백 (모바일에서 축소 → 타이틀 세 줄 위로) */
        .hero-eyebrow { margin-bottom: 1.4rem; }

        /* 데스크톱: 타이틀 2번째 줄 한 줄 유지 */
        .hero-line2 { white-space: nowrap; }

        /* 모바일: WEFLOW를 다음 줄로 + 2번째 줄 줄바꿈 허용(넘침·잘림 방지) */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100svh;
            justify-content: flex-start;
            padding-top: clamp(2.5rem, 12vh, 8rem);
          }
          .hero-eyebrow { margin-bottom: 0.85rem; }
          .hero-line2 { white-space: normal; }
          .hero-weflow { display: block; }
          /* 모바일: '최근 한달…' 말풍선 축소 */
          .hero-cta-badge {
            font-size: 0.72rem;
            padding: 4px 10px;
            gap: 4px;
          }
        }
      `}</style>
    </section>
  );
}
