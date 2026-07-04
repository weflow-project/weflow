import { MessageCircle, PenLine, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { LucideIcon } from "lucide-react";

const POINTS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: MessageCircle,
    title: "소통",
    desc: "제작 전 충분한 상담으로 고객이 진짜 원하는 것을 먼저 듣고 시작합니다.",
  },
  {
    Icon: PenLine,
    title: "맞춤형 워딩",
    desc: "업종과 브랜드 톤에 맞는 문구를 직접 설계해, 방문자에게 전달력 있게 다가갑니다.",
  },
  {
    Icon: Users,
    title: "1:1 맞춤 시스템",
    desc: "전담 담당자가 고객 한 분을 전담하는 1:1 케어로 디테일까지 챙깁니다.",
  },
];

export default function ListeningSection() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(2.5rem, 5vw, 3.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 (좌측 정렬) */}
        <Reveal variant="up" style={{ marginBottom: "clamp(1.75rem, 4vw, 2.5rem)" }}>
          <span className="footnote emphasized c-accent">한 줄 소개</span>
          <h2
            className="title-1"
            style={{ marginTop: "0.75rem", textAlign: "left" }}
          >
            고객의 소리에 <span className="c-accent">귀 기울이는</span> WEFLOW
          </h2>
          <p
            className="body c-muted"
            style={{
              margin: "1rem 0 0",
              maxWidth: "640px",
              wordBreak: "keep-all",
            }}
          >
            WEFLOW의 일하는 방식
          </p>
        </Reveal>

        {/* 3개 카드 (각 카드에 이미지) */}
        <Reveal as="div" stagger className="listen-list">
          {POINTS.map(({ Icon, title, desc }) => (
            <div key={title} className="listen-card">
              <span className="listen-card-icon">
                <Icon size={22} strokeWidth={2} />
              </span>
              <h3 className="headline" style={{ margin: "0.9rem 0 0.35rem" }}>
                {title}
              </h3>
              <p
                className="callout"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                {desc}
              </p>
              <div className="listen-card-img">이미지</div>
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .listen-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        .listen-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.5rem 1.6rem;
        }
        .listen-card-icon {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border-radius: var(--radius-xl);
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .listen-card-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          margin-top: 1.25rem;
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
        @media (max-width: 860px) {
          .listen-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
