import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import {
  MessageCircle,
  Workflow,
  Palette,
  Code2,
  MonitorSmartphone,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// 제작 프로세스 6단계 — num이 카드 배경 숫자이자 이미지 파일명(main-service-01 …)
const STEPS: { num: string; Icon: LucideIcon; title: string; desc: string }[] =
  [
    {
      num: "01",
      Icon: MessageCircle,
      title: "상담·진단",
      desc: "업종·제작 방향 확인",
    },
    {
      num: "02",
      Icon: Workflow,
      title: "기획·설계",
      desc: "문의로 이어지는 구조 설계",
    },
    {
      num: "03",
      Icon: Palette,
      title: "디자인",
      desc: "브랜드 맞춤 화면 구성",
    },
    { num: "04", Icon: Code2, title: "개발", desc: "필요한 기능·페이지 구현" },
    {
      num: "05",
      Icon: MonitorSmartphone,
      title: "반응형·점검",
      desc: "PC·모바일 + 최종 검수",
    },
    {
      num: "06",
      Icon: Share2,
      title: "제휴 마케팅 연결 (선택형)",
      desc: "블로그·인스타·유튜브 숏폼·네이버 플레이스 정기 업로드",
    },
  ];

/** 서비스 섹션 — "제작부터 마케팅까지, 하나의 흐름으로", 6단계 프로세스를 2열 카드로 */
export default function HomeServiceSection() {
  return (
    <section
      style={{
        background: "var(--section-b)",
        padding: "clamp(3rem, 7vw, 5.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
          <span className="footnote emphasized c-accent">서비스</span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            제작부터 마케팅까지,{" "}
            <br className="br-mobile" />
            <span className="c-accent">하나의 흐름</span>으로
          </h2>
          <p
            className="body c-muted"
            style={{
              margin: "1rem 0 0",
              maxWidth: "620px",
              wordBreak: "keep-all",
            }}
          >
            상담부터 제휴 마케팅 연결까지,{" "}
            <br className="br-mobile" />
            WEFLOW의 6단계 프로세스로 완성합니다.
          </p>
        </Reveal>

        {/* 6단계 프로세스 */}
        <Reveal as="div" stagger className="svc-steps">
          {STEPS.map(({ num, Icon, title, desc }) => (
            <div key={num} className="svc-step">
              <span className="svc-step-num">{num}</span>
              <span className="svc-step-icon">
                <Icon size={22} strokeWidth={2} />
              </span>
              <h3
                className="headline"
                style={{ margin: "0 0 0.3rem", wordBreak: "keep-all" }}
              >
                {title}
              </h3>
              <p
                className="callout c-muted"
                // marginBottom: auto — 설명 줄 수가 달라도 남는 공간을 여기서 흡수해
                // 아래 사진이 카드 바닥에 붙는다 (칸마다 사진 높이가 같아 위쪽 선도 맞는다)
                style={{ margin: 0, marginBottom: "auto", wordBreak: "keep-all" }}
              >
                {desc}
              </p>
              <div className="svc-step-img">
                <Image
                  src={`/images/main/main-service-${num}.png`}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </Reveal>

        {/* 링크 */}
        <div style={{ marginTop: "1.75rem" }}>
          <Link
            href="/service"
            className="subhead emphasized c-accent"
            style={{ textDecoration: "none", fontSize: "1.1rem" }}
          >
            서비스 전체 보기 ›
          </Link>
        </div>
      </div>

      <style>{`
        .svc-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.9rem;
        }
        .svc-step {
          position: relative;
          overflow: hidden;
          /* 세로 흐름으로 두고 설명이 남는 공간을 밀어내게 한다 —
             설명이 한 줄인 칸과 두 줄인 칸의 사진 위치가 어긋나지 않는다 */
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.6rem;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .svc-step:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 28px rgba(106, 146, 215,0.25);
        }
        .svc-step-num {
          position: absolute;
          top: 0.8rem;
          right: 1rem;
          font-size: 5.5rem;
          font-weight: 800;
          color: var(--accent);
          opacity: 0.12;
          line-height: 1;
          pointer-events: none;
        }
        .svc-step-icon {
          display: inline-flex;
          width: 46px;
          height: 46px;
          border-radius: var(--radius-xl);
          background: var(--accent-light);
          color: var(--accent);
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .svc-step-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 4 / 3;
          margin-top: 1.1rem;
          border-radius: var(--radius-xl);
          background: var(--surface-container);
          border: 1px solid var(--border);
        }
        /* 3열이라 카드 폭이 좁아진다 — 여백·아이콘·배경 숫자를 함께 줄인다 */
        .svc-step { padding: 1.3rem 1.1rem; }
        .svc-step-num { font-size: 4rem; }
        .svc-step-icon { width: 40px; height: 40px; margin-bottom: 0.8rem; }

        /* 노트북 폭에서는 3열이 너무 좁아 2열로 */
        @media (max-width: 900px) {
          .svc-steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .svc-steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
