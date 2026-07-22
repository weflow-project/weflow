// /guide — 홈페이지 가이드.
// 메인에 길게 깔려 있던 "홈페이지란 무엇인가" 설명 섹션들을 이리로 옮겼다.
// 메인은 이미 제작을 마음먹은 사람을 위한 자리로 두고, 알아보는 단계의 방문자는 여기서 읽는다.
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ScrollToHash from "@/components/ScrollToHash";
import HomepageDefinitionSection from "@/components/home/HomepageDefinitionSection";
import WhatIsHomepageSection from "@/components/home/WhatIsHomepageSection";
import LandingHomepageSection from "@/components/home/LandingHomepageSection";
import LandingPageSection from "@/components/home/LandingPageSection";
import AdminPageSection from "@/components/home/AdminPageSection";
import WhyAdminSection from "@/components/home/WhyAdminSection";
import { CTA_BTN, CTA_BTN_FILLED } from "@/lib/ctaButton";

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
      {/* 메인 라인업에서 #앵커 를 달고 들어오면 해당 섹션으로 내려준다 */}
      <ScrollToHash />

      {/* 페이지 도입부 */}
      <section
        style={{
          background: "var(--section-a)",
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
            홈페이지,{" "}
            <br className="br-mobile" />
            어디서부터 알아봐야 할까요?
          </h1>
          <p
            className="callout c-muted"
            style={{ margin: "0 0 1.75rem", maxWidth: "560px", wordBreak: "keep-all" }}
          >
            홈페이지와 랜딩형 홈페이지·랜딩페이지는 뭐가 다른지, 관리자 페이지는 왜 필요한지
            <br />— 제작을 결정하기 전에 알아두면 좋은 것들을 정리했습니다.
          </p>
          <Link
            href="/diagnosis"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
          >
            바로 무료 견적 받기 →
          </Link>
        </div>
      </section>


      {/* 01~02 홈페이지 */}
      <HomepageDefinitionSection />
      <WhatIsHomepageSection />

      {/* 03~04 랜딩형·랜딩페이지 */}
      <LandingHomepageSection />
      <LandingPageSection />

      {/* 05~06 관리자 페이지 */}
      <AdminPageSection />
      <WhyAdminSection />

      {/* 마무리 CTA — 서비스 페이지 ServiceCTA와 같은 서식 */}
      <section
        style={{
          padding: "clamp(2.5rem, 5vw, 3.5rem) 1.5rem",
          background: "var(--section-b)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <Reveal
          variant="zoom"
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p
            className="caption-1 emphasized c-accent"
            style={{
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            GET STARTED
          </p>

          <h2
            className="emphasized"
            style={{
              marginBottom: "1rem",
              wordBreak: "keep-all",
              fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)",
              lineHeight: 1.25,
            }}
          >
            어떤 게 맞을지 모르겠다면
          </h2>

          <p
            className="c-muted"
            style={{
              marginBottom: "2rem",
              wordBreak: "keep-all",
              fontSize: "clamp(1.1rem, 2.6vw, 1.35rem)",
              lineHeight: 1.7,
            }}
          >
            업종과 목표를 알려주시면,
            <br className="br-mobile" /> 어떤 형태가 맞는지부터 함께 정리해 드립니다.
          </p>

          {/* CTA 버튼 */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/pricing"
              className="btn-outline"
              style={CTA_BTN}
            >
              가격 먼저 보기 <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <Link
              href="/diagnosis"
              className="btn-primary"
              style={CTA_BTN_FILLED}
            >
              무료 견적 신청 <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </Reveal>

        <style>{`
          .br-mobile { display: none; }
          @media (max-width: 560px) {
            .br-mobile { display: inline; }
          }
        `}</style>
      </section>
    </div>
  );
}
