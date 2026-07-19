import type { Metadata } from "next";
import Link from "next/link";
import PortfolioShowcase from "@/components/cases/PortfolioShowcase";

/**
 * 성공 사례 페이지(/cases) — 실제 제작 사례만 보여준다.
 * 업종별 예시 사례(칩 필터 + 카드 그리드)는 실제 사례가 아니어서 걷어냈고,
 * 필터는 PortfolioShowcase가 자체적으로 갖고 있다.
 */

export const metadata: Metadata = {
  title: "제작 사례 · WEFLOW",
  description: "WEFLOW가 직접 제작한 홈페이지 사례를 업종별로 확인하세요.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "제작 사례 · WEFLOW",
    description: "WEFLOW가 직접 제작한 홈페이지 사례를 업종별로 확인하세요.",
    url: "/cases",
  },
};

export default function CasesPage() {
  return (
    <div>
      <section
        style={{
          background: "#fff",
          padding: "clamp(3rem, 7vw, 4.5rem) 1.5rem clamp(3rem, 6vw, 4rem)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            className="caption-2 emphasized c-accent"
            style={{
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            SUCCESS CASES
          </p>
          <h1 className="title-1" style={{ margin: "0 0 0.75rem" }}>
            성공 사례 포트폴리오
          </h1>
          <p
            className="callout c-muted"
            style={{
              margin: "0 0 2rem",
              maxWidth: "480px",
              wordBreak: "keep-all",
            }}
          >
            WEFLOW가 직접 제작한 사례입니다.
          </p>

          {/* 실제 제작 사례 목록 */}
          <PortfolioShowcase />

          <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <Link
              href="/diagnosis"
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
            >
              무료 견적 받기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
