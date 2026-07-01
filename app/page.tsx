"use client";
import { useEffect } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import PlaceholderSection from "@/components/home/PlaceholderSection";
import HomepageDefinitionSection from "@/components/home/HomepageDefinitionSection";
import WhatIsHomepageSection from "@/components/home/WhatIsHomepageSection";
import LandingHomepageSection from "@/components/home/LandingHomepageSection";
import LandingPageSection from "@/components/home/LandingPageSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import ListeningSection from "@/components/home/ListeningSection";
import WhyWeflowSection from "@/components/home/WhyWeflowSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import PricingSection from "@/components/home/PricingSection";
import HomeServiceSection from "@/components/home/HomeServiceSection";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import ComparisonCTA from "@/components/home/ComparisonCTA";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add("snap-home");
    return () => document.body.classList.remove("snap-home");
  }, []);

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
      <PlaceholderSection
        eyebrow="포트폴리오"
        title={
          <>
            실제 <span className="c-accent">성공 사례 포트폴리오</span>
          </>
        }
        body="WEFLOW가 직접 제작한 홈페이지·랜딩형 홈페이지·랜딩페이지 사례를 소개합니다."
        imageCount={3}
      />
      <PlaceholderSection
        eyebrow="고객 인터뷰"
        title={
          <>
            실제 <span className="c-accent">고객 인터뷰 & 후기</span>
          </>
        }
        body="WEFLOW에서 홈페이지를 직접 제작한 고객의 생생한 인터뷰 & 후기를 담았습니다."
        background="var(--bg-secondary)"
        imageCount={3}
      />
      <HomepageDefinitionSection />
      <WhatIsHomepageSection />
      <LandingHomepageSection />
      <LandingPageSection />

      {/* 8~12. 원래 있던 섹션들 */}
      <PartnershipSection />
      <ListeningSection />
      <WhyWeflowSection />
      <ComparisonCTA />

      {/* 13. WEFLOW 혜택 (기존) */}
      <BenefitsSection />

      {/* 14. 제작 플랜 & 가격 */}
      <PricingSection />

      {/* 14~15. 서비스 · 회사소개 (임시 문구) */}
      <HomeServiceSection />
      <HomeAboutSection />

      {/* 16. 마지막 CTA (기존) */}
      <FinalCTA />
    </>
  );
}
