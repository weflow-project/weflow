import Link from "next/link";
import Reveal from "@/components/Reveal";

const MEANING = [
  { key: "WE", desc: "우리 · 사람 · 관계 · 함께하는 가치" },
  { key: "FLOW", desc: "흐름 · 성장 · 연결 · 나아가는 움직임" },
];

export default function HomeAboutSection() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        padding: "clamp(3rem, 7vw, 5.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 소개 텍스트 */}
        <Reveal variant="up" style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
          <span className="footnote emphasized c-accent">회사소개</span>
          <h2
            className="title-1"
            style={{ margin: "0.75rem 0 0", wordBreak: "keep-all" }}
          >
            사람이 움직이면, <span className="c-accent">기술은 따라온다</span>
          </h2>
          <p
            className="callout c-muted"
            style={{ margin: "0.6rem 0 0", letterSpacing: "0.01em" }}
          >
            People move. Technology follows.
          </p>
          <p
            className="body c-secondary"
            style={{
              margin: "1.4rem 0 0",
              maxWidth: "640px",
              wordBreak: "keep-all",
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
            }}
          >
            WEFLOW는 사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는
            회사입니다. 기술은 뒤에서 받쳐주고, 사람은 앞에서 빛나게 합니다.
          </p>
        </Reveal>

        {/* WE · FLOW (2×1) */}
        <Reveal as="div" stagger className="about-meaning">
          {MEANING.map(({ key, desc }) => (
            <div
              key={key}
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-2xl)",
                padding: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              <p
                className="large-title c-accent"
                style={{ margin: "0 0 0.5rem", lineHeight: 1 }}
              >
                {key}
              </p>
              <p
                className="headline"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                {desc}
              </p>
              <div className="about-card-img">이미지</div>
            </div>
          ))}
        </Reveal>

        {/* 자세히 보기 */}
        <div style={{ marginTop: "1.75rem" }}>
          <Link
            href="/about"
            className="subhead emphasized c-accent"
            style={{ textDecoration: "none", fontSize: "1.1rem" }}
          >
            회사소개 자세히 보기 ›
          </Link>
        </div>
      </div>

      <style>{`
        .about-meaning {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.1rem;
        }
        .about-card-img {
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: 1.1rem;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px dashed rgba(11,18,32,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        @media (max-width: 640px) {
          .about-meaning { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
