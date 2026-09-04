import Image from "next/image";
import type { ReactNode } from "react";
import { Layers, Users, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

// 템플릿이 무엇인지 — 틀 · 공용 관리자 · 가격, 세 가지로 풀어낸다
const POINTS: { Icon: LucideIcon; title: string; desc: ReactNode }[] = [
  {
    Icon: Layers,
    title: "미리 만들어진 틀",
    desc: (
      <>
        완성된 디자인에 사진과 문구만 갈아 끼웁니다.
        <br />
        구조와 기능은 예전 기술로 만든 틀 그대로입니다.
      </>
    ),
  },
  {
    Icon: Users,
    title: "다 같이 쓰는 관리자 페이지",
    desc: (
      <>
        수백 개 사이트가 같은 관리자 페이지를 나눠 씁니다.
        <br />
        항목 하나 바꾸는 것도 ‘지원하지 않는 기능’입니다.
      </>
    ),
  },
  {
    Icon: Tag,
    title: "그래서 저렴합니다",
    desc: (
      <>
        한 번 만든 틀을 수백 곳에 다시 팔기 때문입니다.
        <br />
        그 값에 ‘내 요구사항’은 들어 있지 않습니다.
      </>
    ),
  },
];

/**
 * 02 · 템플릿이란? — 흔한 템플릿 홈페이지 화면(직접 만든 예시 캡처)을 옆에 두고
 * 틀에 사진·글만 끼우는 방식, 공용 관리자 페이지, 저렴한 이유를 설명한다.
 * 템플릿 자체를 깎아내리기보다 "빌린 틀"이라는 성격을 알고 고르라는 톤으로 마무리한다.
 */
export default function DiffTemplate() {
  return (
    <section
      style={{
        background: "var(--section-a)",
        padding: "clamp(3rem, 7vw, 5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <Reveal variant="up" style={{ maxWidth: "760px" }}>
          <span className="footnote emphasized c-accent" style={{ letterSpacing: "0.04em" }}>
            02 · 템플릿이란?
          </span>
          <h2 className="title-1" style={{ margin: "0.9rem 0 0", wordBreak: "keep-all" }}>
            템플릿 홈페이지는 <br className="br-mobile" />
            <span className="c-accent">왜 저렴할까요?</span>
          </h2>
          <p className="body c-muted" style={{ margin: "1rem 0 0", maxWidth: "560px", wordBreak: "keep-all" }}>
            템플릿은 ‘미리 만들어 둔 홈페이지’입니다.
            <br className="br-mobile" /> 세 가지만 알면 가격의 이유가 보입니다.
          </p>
        </Reveal>

        {/* 왼쪽 템플릿 예시 화면 · 오른쪽 설명 3개 */}
        <div className="dt-split" style={{ marginTop: "clamp(2rem, 5vw, 3rem)" }}>
          {/* 브라우저 목업 안에 템플릿 화면 — 위플로우 사례가 아니라 '흔한 템플릿'의 예시 */}
          <Reveal variant="left" className="dt-shot-wrap">
            <div className="dt-shot">
              <div className="dt-shot-bar" aria-hidden="true">
                <span style={{ background: "#ff5f57" }} />
                <span style={{ background: "#febc2e" }} />
                <span style={{ background: "#28c840" }} />
              </div>
              <div className="dt-shot-img">
                <Image
                  src="/images/difference/template-site.webp"
                  alt="사진과 문구만 갈아 끼우는 흔한 템플릿 홈페이지 예시"
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>
            <p className="dt-shot-note">
              흔히 볼 수 있는 <strong>템플릿 홈페이지</strong>의 모습
              <br className="br-mobile" /> — 어디서 본 듯하지 않나요?
            </p>
          </Reveal>

          <Reveal stagger className="dt-list">
            {POINTS.map(({ Icon, title, desc }, i) => (
              <div key={title} className="dt-card">
                <span className="dt-icon">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <span className="footnote emphasized c-accent">0{i + 1}</span>
                  <h3 className="headline" style={{ margin: "0.2rem 0 0.4rem", wordBreak: "keep-all" }}>
                    {title}
                  </h3>
                  <p className="callout c-muted" style={{ margin: 0, wordBreak: "keep-all" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* 마무리 한 줄 — 템플릿을 깎지 않고 성격을 짚는다 */}
        <Reveal variant="fade" delay={0.15} className="dt-note">
          <p className="title-2 emphasized" style={{ margin: "0 0 0.5rem", wordBreak: "keep-all" }}>
            저렴한 게 나쁜 건 아닙니다.
          </p>
          <p className="body c-muted" style={{ margin: 0, wordBreak: "keep-all" }}>
            다만 그건 ‘내 홈페이지’가 아니라 <strong style={{ color: "var(--text)" }}>‘빌린 틀’</strong>입니다.
            <br className="br-mobile" /> 그걸 알고 선택하셔야 나중에 후회가 없습니다.
          </p>
        </Reveal>
      </div>

      <style>{`
        /* 왼쪽 사진 칸이 높이를 정하고, 오른쪽 카드 3개가 그 높이를 똑같이 나눠 채운다 */
        .dt-split {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: stretch;
        }
        .dt-shot-wrap { min-width: 0; }
        .dt-shot {
          border-radius: var(--radius-2xl);
          border: 1px solid var(--border);
          overflow: hidden;
          background: var(--surface);
        }
        .dt-shot-bar {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 0.9rem;
          background: var(--surface-container);
          border-bottom: 1px solid var(--border);
        }
        .dt-shot-bar span { width: 10px; height: 10px; border-radius: 9999px; display: block; }
        .dt-shot-img {
          position: relative;
          overflow: hidden;
          /* 캡처 원본 비율(1440×1140)에 맞춰 잘리지 않게 둔다 */
          aspect-ratio: 1440 / 1140;
          background: #fff;
        }
        .dt-shot-note {
          margin: 0.7rem 0 0;
          text-align: center;
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.5;
          color: var(--text);
          word-break: keep-all;
        }
        .dt-shot-note strong { color: var(--accent); }
        .dt-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          min-width: 0;
        }
        .dt-card {
          flex: 1;
          display: flex;
          gap: 0.9rem;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.25rem 1.4rem;
        }
        .dt-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-xl);
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dt-note {
          margin-top: clamp(2rem, 5vw, 3rem);
          padding: clamp(1.25rem, 3vw, 2rem);
          border-radius: var(--radius-2xl);
          background: var(--accent-light);
          border: 1px solid var(--accent-light);
          text-align: center;
        }
        @media (max-width: 860px) {
          .dt-split { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
