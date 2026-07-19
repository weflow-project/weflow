// /guide — 홈페이지 가이드.
// 메인에 길게 깔려 있던 "홈페이지란 무엇인가" 설명 섹션들을 이리로 옮겼다.
// 메인은 이미 제작을 마음먹은 사람을 위한 자리로 두고, 알아보는 단계의 방문자는 여기서 읽는다.
import type { Metadata } from "next";
import Link from "next/link";
import TargetCustomerSection from "@/components/home/TargetCustomerSection";
import HomepageDefinitionSection from "@/components/home/HomepageDefinitionSection";
import WhatIsHomepageSection from "@/components/home/WhatIsHomepageSection";
import LandingHomepageSection from "@/components/home/LandingHomepageSection";
import LandingPageSection from "@/components/home/LandingPageSection";
import AdminPageSection from "@/components/home/AdminPageSection";
import WhyAdminSection from "@/components/home/WhyAdminSection";

export const metadata: Metadata = {
  title: "홈페이지 가이드 · WEFLOW",
  description:
    "홈페이지와 랜딩페이지는 뭐가 다른지, 관리자 페이지는 왜 필요한지 — 제작을 알아보는 단계에서 궁금한 것들을 정리했습니다.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "홈페이지 가이드 · WEFLOW",
    description:
      "홈페이지와 랜딩페이지는 뭐가 다른지, 관리자 페이지는 왜 필요한지 정리했습니다.",
    url: "/guide",
  },
};

export default function GuidePage() {
  return (
    <div>
      {/* 페이지 도입부 */}
      <section
        style={{
          background: "#fff",
          padding: "clamp(3rem, 7vw, 4.5rem) 1.5rem clamp(2rem, 5vw, 3rem)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            className="caption-2 emphasized c-accent"
            style={{ letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}
          >
            GUIDE
          </p>
          <h1 className="title-1" style={{ margin: "0 0 0.75rem", wordBreak: "keep-all" }}>
            홈페이지, 알아보고 계신가요?
          </h1>
          <p
            className="callout c-muted"
            style={{ margin: "0 0 1.75rem", maxWidth: "560px", wordBreak: "keep-all" }}
          >
            홈페이지와 랜딩페이지는 뭐가 다른지, 관리자 페이지는 왜 필요한지 — 제작을 결정하기 전에
            알아두면 좋은 것들을 정리했습니다.
          </p>
          <Link
            href="/diagnosis"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
          >
            바로 무료 진단 받기 →
          </Link>
        </div>
      </section>

      {/* 어떤 분들이 고객이 되는가 */}
      <TargetCustomerSection />

      {/* 01~02 홈페이지 */}
      <HomepageDefinitionSection />
      <WhatIsHomepageSection />

      {/* 03~04 랜딩형·랜딩페이지 */}
      <LandingHomepageSection />
      <LandingPageSection />

      {/* 05~06 관리자 페이지 */}
      <AdminPageSection />
      <WhyAdminSection />

      {/* 마무리 CTA */}
      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "clamp(3rem, 7vw, 4.5rem) 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <h2 className="title-2" style={{ margin: "0 0 0.75rem", wordBreak: "keep-all" }}>
            어떤 게 맞을지 모르겠다면
          </h2>
          <p className="callout c-muted" style={{ margin: "0 0 1.75rem", wordBreak: "keep-all" }}>
            업종과 목표를 알려주시면, 어떤 형태가 맞는지부터 함께 정리해 드립니다.
          </p>
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/diagnosis"
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
            >
              무료 진단 신청하기 →
            </Link>
            <Link
              href="/pricing"
              className="btn-outline"
              style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
            >
              가격 먼저 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
