"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// 상단 메뉴 목록 (데스크탑 가로 메뉴 / 모바일 드로어가 같이 쓴다).
// 헤더는 이정표라 짧게 — 자세한 이름은 푸터에 그대로 남겨뒀다.
const NAV_LINKS = [
  { href: "/about", label: "회사소개" },
  { href: "/service", label: "서비스" },
  { href: "/pricing", label: "가격 안내" },
  { href: "/cases", label: "제작 사례" },
  { href: "/guide", label: "제작 라인업" },
  { href: "/benefits", label: "WEFLOW 혜택" },
  // 예약 신청(/booking)은 메뉴에서 내리고 그 자리에 사이트 진단을 뒀다 — 페이지 자체는 남아 있다
  { href: "/check", label: "사이트 점검" },
];

// 같은 페이지에서 다시 눌렀을 때 폼을 새로 시작해야 하는 경로
const RESETTABLE = new Set(["/booking", "/diagnosis", "/check"]);

/**
 * 모든 페이지 상단의 헤더 — 로고 · 메뉴 · 견적 CTA.
 * 모바일에선 메뉴가 햄버거 버튼 → 왼쪽 드로어로 바뀐다.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 예약·진단 메뉴를 이미 그 페이지에서 다시 누르면 통째로 새로고침 — 입력 중이던 폼이 초기화된다
  const handleClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === href && RESETTABLE.has(href)) {
        e.preventDefault();
        window.location.href = href;
      }
    };

  const close = () => setOpen(false);

  // 홈에서 로고 클릭 시 이동 대신 맨 위로 부드럽게 스크롤
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "relative",
          zIndex: 100,
          background: "rgba(14,14,16,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={27}
              height={27}
              style={{ width: 27, height: 27, objectFit: "contain" }}
            />
            <span
              className="title-3 emphasized"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              WEFLOW
            </span>
          </Link>

          {/* 데스크탑 가로 메뉴 — 현재 페이지는 강조색 굵게 */}
          <nav
            className="hide-mobile"
            style={{
              display: "flex",
              gap: "0.25rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={handleClick(l.href)}
                className="subhead"
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: "6px",
                  fontWeight: pathname === l.href ? 700 : 500,
                  color:
                    pathname === l.href ? "var(--accent)" : "var(--text-muted)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* 데스크탑 견적 CTA — 문구가 위로 흐르는 마퀴 + 그라데이션 애니메이션 */}
          <Link
            href="/diagnosis"
            aria-label="지금 바로 진단 받기"
            className="btn-primary cta-marquee cta-gradient hide-mobile"
            style={{
              width: "132px",
              height: "40px",
              fontSize: "0.95rem",
              flexShrink: 0,
            }}
          >
            <span className="cta-marquee-track">
              {["지금 바로 진단 받기", "지금 바로 진단 받기", "지금 바로 진단 받기", "지금 바로 진단 받기"].map((t, i) => (
                <span key={i} className="cta-marquee-item">
                  {t}
                </span>
              ))}
            </span>
          </Link>

          {/* 모바일 햄버거 — 드로어를 연다 */}
          <button
            onClick={() => setOpen(true)}
            className="show-mobile-flex"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "var(--text)",
              display: "none",
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* 오버레이 */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />

      {/* 왼쪽 드로어 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(280px, 80vw)",
          background: "var(--surface)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* 드로어 헤더 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.25rem",
            height: "64px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              close();
              handleLogoClick(e);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={22}
              height={22}
              style={{ width: 22, height: 22, objectFit: "contain" }}
            />
            <span
              className="headline emphasized"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              WEFLOW
            </span>
          </Link>
          <button
            onClick={close}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0.4rem",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 메뉴 링크 */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => {
                close();
                handleClick(l.href)(e);
              }}
              className="callout"
              style={{
                display: "block",
                padding: "0.9rem 1.5rem",
                color: pathname === l.href ? "var(--accent)" : "var(--text)",
                textDecoration: "none",
                fontWeight: pathname === l.href ? 700 : 500,
                borderLeft:
                  pathname === l.href
                    ? "3px solid var(--accent)"
                    : "3px solid transparent",
                background:
                  pathname === l.href ? "var(--accent-light)" : "transparent",
                transition: "background 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* 하단 CTA */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href="/diagnosis"
            className="btn-primary"
            style={{ justifyContent: "center", width: "100%" }}
            onClick={close}
          >
            무료 진단 신청
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .show-mobile-flex { display: flex !important; } }
        /* 어두운 헤더 위 CTA — 상단 띠·히어로 버튼과 같은 파랑(--accent-strong)에서
           한 번 밝아졌다 돌아온다. 흰 글씨 최저 대비 5.11:1. */
        .cta-gradient {
          background: linear-gradient(120deg, #1b4ea7, #2a6ccb, #1b4ea7) !important;
          background-size: 250% 100% !important;
          color: #ffffff !important;
          animation: cta-flow 2.4s linear infinite;
          box-shadow: none !important;
        }
        .cta-gradient::after {
          content: '';
          position: absolute;
          top: 0;
          left: -70%;
          width: 48%;
          height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent);
          transform: skewX(-20deg);
          animation: cta-shine 2.4s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes cta-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cta-shine {
          0% { left: -70%; }
          55% { left: 130%; }
          100% { left: 130%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-gradient, .cta-gradient::after { animation: none; }
        }
      `}</style>
    </>
  );
}
