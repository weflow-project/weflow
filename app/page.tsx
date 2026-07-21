// 메인 페이지 (/) — 히어로부터 마지막 CTA까지 16개 섹션을 순서대로 쌓는다.
// 각 섹션의 실제 내용은 components/home/* 에 있고, 여기선 순서와 임시 문구만 잡는다.
"use client";
import { useEffect } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import PlaceholderSection from "@/components/home/PlaceholderSection";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";
import LineupSection from "@/components/home/LineupSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import WhyWeflowSection from "@/components/home/WhyWeflowSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import PricingSection from "@/components/home/PricingSection";
import TargetCustomerSection from "@/components/home/TargetCustomerSection";
import HomeServiceSection from "@/components/home/HomeServiceSection";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import ComparisonCTA from "@/components/home/ComparisonCTA";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  // 이 페이지에 있는 동안만 body에 스크롤 스냅 클래스를 붙인다
  useEffect(() => {
    document.body.classList.add("snap-home");
    return () => document.body.classList.remove("snap-home");
  }, []);

  // .reveal 요소가 화면에 들어오면 visible을 붙여 등장 애니메이션을 튼다
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1. 대표 이미지 (캐러셀) */}
      <HeroBanner />

      {/* 2~7. 새 섹션 (임시 문구 · 텍스트 아래 이미지) */}
      {/* 2. 포트폴리오 — 이미지를 누르면 실제 제작 사이트로 이동 */}
      <PlaceholderSection
        eyebrow="포트폴리오"
        stars
        title={
          <>
            WEFLOW의 실력,{" "}
            <span className="c-accent">
              <span className="tilt-hl tilt-hl-red">결과가 대신 말합니다</span>
            </span>
          </>
        }
        body="WEFLOW가 직접 제작한 결과물, 실제 성과로 확인하세요."
        background="var(--section-b)"
        hint={
          <>
            누르면 <span className="emphasized c-accent">해당 사이트 링크</span>로 이동합니다.
          </>
        }
      >
        <PortfolioCarousel />
      </PlaceholderSection>
      {/* 3. 고객 인터뷰 */}
      <PlaceholderSection
        eyebrow="고객 인터뷰"
        stars
        title={
          <>
            결과보다 확실한 건,{" "}
            <span className="c-accent">
              <span className="tilt-hl tilt-hl-red">고객의 실제 목소리</span>
            </span>
            입니다
          </>
        }
        body="WEFLOW가 직접 제작한 결과물, 실제 고객 인터뷰로 확인하세요."
        image="/images/main/main-review-01.png"
        imageAlt="WEFLOW 고객 인터뷰"
        imageCount={1}
      />
      {/* 홈페이지·랜딩페이지·관리자 페이지 설명은 /guide 로 옮겼다.
          메인은 이미 제작을 마음먹은 방문자가 보는 자리라, 정의부터 설명하면 문의까지 너무 멀어진다. */}

      {/* 제작 라인업 — 누르면 /guide 의 해당 설명으로 내려간다 */}
      <LineupSection />

      {/* 사례로 신뢰를 준 직후에 "얼마인가"를 바로 답한다 */}
      <BenefitsSection />
      {/* "이런 분들이라면" 으로 대상을 짚어준 뒤 바로 가격을 보여준다 */}
      <TargetCustomerSection />
      <PricingSection />
      {/* 타사 비교는 가격을 본 직후여야 문구가 맞는다 — 항상 가격 바로 아래 둔다 */}
      <ComparisonCTA />

      {/* 그다음 차별점 — 왜 WEFLOW여야 하는지 */}
      <PartnershipSection />
      <WhyWeflowSection />

      {/* 제작 과정 */}
      <HomeServiceSection />

      {/* 브랜드 한마디로 끝맺고 최종 CTA로 넘긴다 (WE·FLOW 뜻풀이는 /about 에만 둔다) */}
      <HomeAboutSection />

      {/* 16. 마지막 CTA (기존) */}
      <FinalCTA />
    </>
  );
}
