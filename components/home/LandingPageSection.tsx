import Reveal from "@/components/Reveal";
import Image from "next/image";
import { Target, Rocket, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: { Icon: LucideIcon; label: string; desc: string }[] = [
  { Icon: Target, label: "단일 목표", desc: "오직 하나의 전환에만 집중" },
  { Icon: Rocket, label: "빠른 실행", desc: "광고·이벤트에 맞춰 빠른 오픈" },
  { Icon: TrendingUp, label: "전환 극대화", desc: "군더더기 없이 행동 유도" },
];

export default function LandingPageSection() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        padding: "clamp(3rem, 7vw, 5.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
          <span className="footnote emphasized c-accent">
            04 · 랜딩페이지란
          </span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            랜딩페이지가 <span className="c-accent">무엇</span>인가요?
          </h2>
        </Reveal>

        {/* 좌 텍스트 · 우 이미지 */}
        <div className="lps-split">
          {/* 왼쪽 */}
          <Reveal as="div" variant="right" className="lps-text">
            {/* 한 줄 정의 (인용) */}
            <div
              style={{
                width: "fit-content",
                maxWidth: "100%",
                borderLeft: "3px solid var(--accent)",
                background: "var(--bg-secondary)",
                borderRadius: "0 var(--radius-xl) var(--radius-xl) 0",
                padding: "0.75rem 1.1rem",
                marginBottom: "1.75rem",
              }}
            >
              <span
                className="caption-1 emphasized c-muted"
                style={{ letterSpacing: "0.02em" }}
              >
                한마디로
              </span>
              <p
                className="callout"
                style={{ margin: "0.4rem 0 0", wordBreak: "keep-all" }}
              >
                “광고·링크를 타고 들어온 방문자가 도착하는 단 하나의 목표
                페이지”
              </p>
            </div>

            {/* 쉬운 풀이 */}
            <span className="footnote emphasized c-accent">쉽게 말하면</span>
            <p
              className="body"
              style={{ margin: "0.5rem 0 1.75rem", wordBreak: "keep-all" }}
            >
              여러 정보를 담는 홈페이지와 달리,{" "}
              <strong>오직 하나의 행동</strong>만을 목표로 만든 페이지예요.
              <br />
              방문자가 딴 데로 새지 않고 문의·구매·신청까지 집중하도록
              설계됩니다.
            </p>

            {/* 핵심 포인트 3개 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {POINTS.map(({ Icon, label, desc }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      width: "42px",
                      height: "42px",
                      flexShrink: 0,
                      borderRadius: "var(--radius-xl)",
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="headline" style={{ margin: 0 }}>
                      {label}
                    </span>
                    <span
                      className="callout c-muted"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 오른쪽 이미지 */}
          <Reveal as="div" variant="left" className="lps-img">
            <a
              className="lps-img-frame"
              href="https://weflow-landingpage.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="참고 랜딩페이지 새 탭으로 열기"
              style={{
                position: "relative",
                display: "block",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                background: "#e6eaf1",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <Image
                src="/images/main/main-landing-01.png"
                alt="랜딩페이지란"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{ objectFit: "cover" }}
              />
            </a>

            {/* 곡선 화살표 + 캡션 */}
            <div className="lps-img-note">
              <svg
                className="lps-img-arrow"
                width="38"
                height="33"
                viewBox="0 0 64 56"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M56 29 C 32 41, 13 33, 17 13"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M8 22 L17 10 L28 20"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="lps-img-note-text">
                위 이미지를 클릭하면 <strong>참고 링크</strong>로 이동합니다.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .lps-split {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: clamp(1.75rem, 4vw, 3.5rem);
        }
        .lps-text { flex: 1; min-width: 0; }
        .lps-img { flex: 1; min-width: 0; }

        /* 이미지 — 주기적으로 살짝 흔들려 클릭을 유도 */
        .lps-img-frame {
          transform-origin: 50% 62%;
          box-shadow: 0 10px 30px rgba(11, 18, 32, 0.1);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: lpsImgWiggle 3.8s ease-in-out infinite;
        }
        .lps-img-frame:hover {
          animation: lpsImgWiggleHover 0.45s ease-in-out infinite;
          box-shadow: 0 18px 44px rgba(88, 138, 226, 0.28);
        }
        @keyframes lpsImgWiggle {
          0%, 70%, 100% { transform: rotate(0deg) translateY(0); }
          74% { transform: rotate(-1.3deg) translateY(-3px); }
          79% { transform: rotate(1.1deg) translateY(-1px); }
          84% { transform: rotate(-0.7deg) translateY(0); }
          89% { transform: rotate(0.4deg) translateY(0); }
          94% { transform: rotate(-0.15deg) translateY(0); }
        }
        /* hover 시 더 크고 빠르게 흔들림 */
        @keyframes lpsImgWiggleHover {
          0%, 100% { transform: rotate(0deg) scale(1.02); }
          25% { transform: rotate(-2.4deg) scale(1.02); }
          75% { transform: rotate(2.4deg) scale(1.02); }
        }

        /* 곡선 화살표 + 캡션 */
        .lps-img-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          margin-top: 0.85rem;
        }
        .lps-img-arrow { flex-shrink: 0; }
        .lps-img-note-text {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.5;
          color: var(--text);
          word-break: keep-all;
        }
        .lps-img-note-text strong { color: var(--accent); }

        @media (max-width: 768px) {
          .lps-split { flex-direction: column; align-items: stretch; }
          .lps-img { max-width: 360px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lps-img-frame,
          .lps-img-frame:hover { animation: none; }
        }
      `}</style>
    </section>
  );
}
