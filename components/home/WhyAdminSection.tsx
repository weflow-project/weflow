"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Star, Crown } from "lucide-react";

type Point = { order: string; title: string; kw: string; desc: ReactNode };

// 관리자 페이지가 필요한 이유 3가지 — 지그재그 행(키워드 + 설명)을 채운다
const POINTS: Point[] = [
  {
    order: "첫째",
    title: "확실한 고객 DB 확보",
    kw: "확실한 고객 DB",
    desc: (
      <>
        카톡·SNS 연동 폼으로 이름만 남기고 들어오는 것과 달리,
        <br />
        <strong>원하는 요청사항까지 직접 입력</strong>하고 들어옵니다.
        <br />
        니즈가 분명한, 진짜 상담으로 이어지는 확실한 고객 DB가 쌓입니다.
      </>
    ),
  },
  {
    order: "둘째",
    title: "고객의 유입 경로 파악",
    kw: "실시간 유입 경로",
    desc: (
      <>
        고객이 블로그·광고·검색 등 무엇을 보고 사이트에 들어왔는지
        <br />
        <strong>유입 경로가 함께 기록</strong>됩니다.
        <br />
        어떤 채널이 실제 문의로 이어지는지 확인해, 마케팅을 효율적으로 조정할 수
        있어요.
      </>
    ),
  },
  {
    order: "셋째",
    title: "통계와 함께 한 줄씩 쌓이는 DB",
    kw: "실시간 통계 관리",
    desc: (
      <>
        문의·예약이 한 건씩 기록되고, <strong>유입·전환·상태 통계</strong>가
        자동으로 집계됩니다.
        <br />
        흩어지지 않고 관리자 페이지 한곳에서, 데이터가 그대로 내 자산으로
        축적됩니다.
      </>
    ),
  },
];

// 이미지 원본 치수(비율 유지·자르지 않기 위함)
const IMG_DIMS = [
  { w: 1190, h: 1322 },
  { w: 1122, h: 1402 },
  { w: 1397, h: 1126 },
];

/**
 * "06 · 관리자 페이지가 필요한 이유" 섹션 — 고객 DB·유입 경로·통계 3가지를
 * 지그재그 좌우 배치로 보여준다 (WhatIsHomepageSection과 같은 구조)
 */
export default function WhyAdminSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // 섹션이 화면에 들어오면 파란 키워드 흔들림 애니메이션을 시작한다 (한 번만)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-admin"
      ref={ref}
      style={{
        background: "var(--section-a)",
        padding: "clamp(2.25rem, 5vw, 4rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <div style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
          <span className="footnote emphasized c-accent">
            06 · 관리자 페이지가 필요한 이유
          </span>
          {/* 별 5개 (배경 없이) */}
          <div
            aria-hidden="true"
            style={{ display: "flex", gap: "1px", margin: "0.9rem 0 0.5rem" }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={19}
                fill="#f5b301"
                color="#f5b301"
                strokeWidth={0}
              />
            ))}
          </div>
          <h2
            className="title-1"
            style={{ marginTop: 0, textAlign: "left", wordBreak: "keep-all" }}
          >
            관리자 페이지가{" "}
            <span className="c-accent tilt-hl tilt-hl-red">왜 필요할까요?</span>
          </h2>
        </div>

        {/* 지그재그 포인트 (위 섹션과 이미지 교차 · WhatIs와 동일하게 정적) */}
        {POINTS.map((p, i) => (
          <div
            key={p.order}
            className={`wa-row${i % 2 === 0 ? " reverse" : ""}`}
          >
            {/* 텍스트 */}
            <div className="wa-text wa-text--key">
              <Crown
                strokeWidth={2}
                color="#f5b301"
                fill="#f5b301"
                style={{
                  width: "1.625rem",
                  height: "1.625rem",
                  display: "block",
                  marginBottom: "0.2rem",
                  marginLeft: "-0.15rem",
                }}
              />
              <span className="footnote emphasized c-accent">{p.order}</span>
              <span className="wa-badge">핵심</span>
              <h3
                className="title-2 emphasized"
                style={{ margin: "0.5rem 0 1rem", wordBreak: "keep-all" }}
              >
                {p.title}
              </h3>
              <div style={{ margin: "0 0 0.9rem" }}>
                <span
                  className={`large-title emphasized c-accent wa-stat${inView ? " go" : ""}`}
                  style={{
                    display: "inline-block",
                    lineHeight: 1.05,
                    fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)",
                    wordBreak: "keep-all",
                  }}
                >
                  {p.kw}
                </span>
              </div>
              <p
                className="body c-muted"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                {p.desc}
              </p>
            </div>

            {/* 이미지 — 원본 비율 그대로(자르지 않음) */}
            <div className="wa-img">
              <Image
                src={`/images/main/main-adminwhy-0${i + 1}.webp`}
                alt={p.title}
                width={IMG_DIMS[i].w}
                height={IMG_DIMS[i].h}
                sizes="(max-width: 768px) 100vw, 480px"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: "var(--radius-2xl)",
                  border: "1px solid var(--border)",
                }}
              />

              {/* 곡선 화살표 + 캡션 — 실제 화면 캡처임을 알린다 */}
              <div className="wa-img-note">
                <svg
                  className="wa-img-arrow"
                  width="30"
                  height="26"
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
                <p className="wa-img-note-text">
                  WEFLOW <strong>관리자 페이지</strong>의 실제 화면입니다.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* 그리드로 칸을 반씩 고정한다 — flex 는 내용에 따라 폭이 밀려서
           줄마다 가운데 경계선이 어긋났다. 좌우가 바뀌어도 경계선은 항상 같은 자리다. */
        .wa-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 3.5rem);
        }
        /* 번갈아 놓기는 order 로 — 칸 자체는 그대로 두고 내용만 자리를 바꾼다 */
        .wa-row.reverse .wa-text { order: 2; }
        .wa-row.reverse .wa-img { order: 1; }
        .wa-row + .wa-row { margin-top: clamp(2.5rem, 6vw, 4rem); }
        .wa-text { min-width: 0; }
        .wa-img { min-width: 0; }
        /* 사진 아래 안내 — 화살표가 사진을 가리키고 문구가 옆에 붙는다 */
        .wa-img-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.7rem;
        }
        .wa-img-arrow { flex-shrink: 0; }
        .wa-img-note-text {
          margin: 0;
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.5;
          color: var(--text);
          word-break: keep-all;
        }
        .wa-img-note-text strong { color: var(--accent); }
        @media (max-width: 768px) {
          .wa-row { grid-template-columns: 1fr; align-items: stretch; }
          .wa-row .wa-text, .wa-row.reverse .wa-text { order: 2; }
          .wa-row .wa-img, .wa-row.reverse .wa-img { order: 1; }
        }
        /* 핵심 뱃지 */
        .wa-badge {
          display: inline-block;
          margin-left: 0.5rem;
          vertical-align: middle;
          background: var(--accent);
          color: var(--on-accent);
          font-size: 0.66rem;
          font-weight: 700;
          padding: 2px 9px;
          border-radius: 9999px;
          letter-spacing: 0.02em;
        }
        /* 핵심 강조 파란 패널 */
        .wa-text--key {
          background: var(--accent-light);
          border: 1px solid var(--accent-light);
          border-radius: var(--radius-2xl);
          padding: clamp(1.25rem, 3vw, 2rem);
        }
        /* 파란 키워드 흔들림 (화면 진입 후 7초마다 잠깐) — WhatIs와 동일 */
        .wa-stat { transform-origin: center bottom; }
        .wa-stat.go { animation: wa-wiggle 7s ease-in-out infinite; }
        @keyframes wa-wiggle {
          0%, 87%, 100% { transform: rotate(0deg); }
          89% { transform: rotate(-5deg); }
          91% { transform: rotate(4deg); }
          93% { transform: rotate(-3deg); }
          95% { transform: rotate(2deg); }
          97% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wa-stat.go { animation: none; }
        }
      `}</style>
    </section>
  );
}
