import Link from "next/link";
import HeroBackground from "./HeroBackground";

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

// 히어로 타이틀 문구 — 세 토막을 이어 한 문장으로 등장시킨다
const LINE1 = "내가 진짜 원하는 페이지";
const LINE2A = "우리만의 플로우를 담다,";
const LINE2B = "WEFLOW";

/**
 * 메인 페이지 최상단 히어로 — 배경 영상 위에 타이틀·CTA 두 개(견적/혜택)를 얹고,
 * 아래에 대표 이미지 캐러셀을 붙인다.
 */
export default function HeroBanner() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--section-a)",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* 배경 애니메이션 (네트워크 + 와이어프레임) */}
      <HeroBackground />
      {/* 가독성 오버레이 — 위아래를 살짝 눌러 헤더·하단 캐러셀 글씨를 보호한다 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(6,10,20,0.5) 0%, rgba(6,10,20,0) 40%, rgba(6,10,20,0) 60%, rgba(6,10,20,0.55) 100%)",
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
        {/* 아이브로우 — 데스크탑은 두 칩을 나란히, 모바일은 신규 칩을 위로 쌓는다 */}
        <div className="hero-eyebrow">
          <span className="tag-badge hero-chip--new">리뉴얼 · 신규 제작</span>
          <span className="tag-badge">홈페이지 메인 제작 솔루션</span>
        </div>

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
                marginLeft: "0.12em",
                verticalAlign: "-0.06em",
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
          <Link
            href="/diagnosis"
            className="btn-primary hero-btn hero-btn--ghost hero-btn--accent"
            style={{ width: "min(240px, 80vw)" }}
          >
            무료 견적 바로가기
          </Link>

          <Link
            href="/guide"
            className="btn-primary hero-btn hero-btn--ghost"
            style={{ width: "min(240px, 80vw)" }}
          >
            제작 라인업 바로가기
          </Link>
        </div>

      </div>

      <style>{`
        /* 히어로 버튼 — 영상 위 어두운 화면이라 제목과 같은 흰 글씨로 맞춘다.
           사이트 기본 파랑(--accent)은 밝아서 흰 글씨가 안 읽히므로 여기서만 진한 파랑을 쓴다. */
        .hero-btn {
          font-size: 1.3rem;
          border-radius: 9999px;
          padding: 1.15rem 1rem;
          white-space: nowrap;
          justify-content: center;
          background: var(--accent-strong);   /* 상단 프로모션 띠와 같은 파랑 */
          color: var(--on-accent-strong);
          border: 1.5px solid transparent;
        }
        .hero-btn:hover { background: #2262cc; }

        /* 보조 버튼 — 영상이 비쳐 보이도록 반투명 테두리형 */
        .hero-btn--ghost {
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(4px);
        }
        .hero-btn--ghost:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #ffffff;
        }

        /* 주 버튼 — 보조 버튼과 같은 유리 질감에 반투명 파랑(68%)을 얹는다
           (솔리드 채움은 너무 튀고, 글로우도 과해서 뺌) */
        .hero-btn--accent {
          background: rgba(37, 99, 235, 0.68);
          border-color: rgba(255, 255, 255, 0.8);
        }
        .hero-btn--accent:hover {
          background: rgba(37, 99, 235, 0.82);
          border-color: #ffffff;
        }

        /* 히어로 섹션 패딩 — 캐러셀을 뺀 뒤로는 화면을 강제로 채우지 않고
           콘텐츠 높이만큼만 차지한다 */
        .hero-section {
          justify-content: center;
          padding: clamp(3.5rem, 8vh, 6rem) 1.25rem;
        }

        /* 아이브로우 배지 — 데스크탑은 가로 배치(신규 칩이 오른쪽), 아래 여백 (모바일에서 축소 → 타이틀 세 줄 위로) */
        .hero-eyebrow {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 1.4rem;
        }
        /* 두 칩의 높이를 강제로 동일하게 — 글리프별 라인박스 차이 방지 */
        .hero-eyebrow .tag-badge {
          font-size: 0.95rem;
          height: 2.1rem;
          line-height: 1;
          white-space: nowrap;
          padding-top: 0;
          padding-bottom: 0;
        }

        /* 데스크톱: 타이틀 2번째 줄 한 줄 유지 */
        .hero-line2 { white-space: nowrap; }

        /* 모바일: WEFLOW를 다음 줄로 + 2번째 줄 줄바꿈 허용(넘침·잘림 방지) */
        @media (max-width: 768px) {
          /* 모바일도 콘텐츠 높이만큼만 — 위아래 여백 동일 */
          .hero-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          /* 모바일: 두 칩을 한 줄로 — 데스크탑과 같이 신규 칩이 오른쪽, 글자를 줄여 좁은 화면에도 들어가게 */
          .hero-eyebrow {
            gap: 0.4rem;
            margin-bottom: 0.85rem;
          }
          .hero-eyebrow .tag-badge {
            font-size: clamp(0.72rem, 3.4vw, 0.95rem);
            height: 1.9rem;
            padding-left: 10px;
            padding-right: 10px;
          }
          .hero-line2 { white-space: normal; }
          /* WEFLOW 를 다음 줄로 내리되, 위 두 줄 간격(0.95rem)과 맞춘다.
             데스크탑용 margin-left 는 여기서 0 으로 되돌려 중앙 정렬을 지킨다 */
          .hero-weflow { display: block; margin-top: 0.95rem; margin-left: 0; line-height: 1.1; }
        }
      `}</style>
    </section>
  );
}
