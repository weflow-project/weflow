import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Crown } from "lucide-react";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { CTA_BTN, CTA_BTN_FILLED } from "@/lib/ctaButton";

// 아이콘 배치 순서 (혜택 카드별) — 3-2-1-2-3-1
const ICON_ORDER = [3, 2, 1, 2, 3, 1];

type Benefit = {
  title: string;
  points: string[];
  icon: string;
  cta?: { label: string; href: string };
};

const BENEFITS: Benefit[] = [
  {
    title: "제휴 마케팅 연결 (선택형)",
    points: [
      "네이버 블로그 — 정보성 콘텐츠 정기 업로드",
      "인스타그램 — 메타 광고로 브랜드 도달",
      "유튜브 숏폼 — 짧은 영상으로 바이럴 확산",
      "네이버 플레이스 — 지역 검색·지도 노출",
      "원하시는 채널만 골라 제휴 업체와 연결",
    ],
    icon: "/images/3d-icon/benefit001.svg",
  },
  {
    title: "통계 관리자 페이지",
    points: [
      "관리자 DB로 고객 정보 자산화",
      "문의·예약 접수 내역을 한곳에서 관리",
      "통계로 유입·전환 추이를 한눈에 파악",
    ],
    icon: "/images/3d-icon/benefit003.svg",
  },
  {
    title: "반응형 디자인 (PC / MO)",
    points: [
      "PC·모바일 등 모든 기기에서 최적화",
      "화면 잘림 없는 깔끔한 반응형 전환",
    ],
    icon: "/images/3d-icon/benefit006.svg",
  },
  {
    title: "합리적 가성비",
    points: [
      "정가 대비 100만원 이내로 제작 가능",
      "필요한 기능만 구성한 합리적인 비용",
    ],
    icon: "/images/3d-icon/benefit002.svg",
    cta: { label: "제작 플랜 보기", href: "/pricing" },
  },
  {
    title: "고객의 소리 · 1:1 관리 시스템",
    points: [
      "충분한 소통으로 고객의 니즈 파악",
      "전담 담당자가 고객 한 분을 1:1로 전담",
    ],
    icon: "/images/3d-icon/benefit004.svg",
  },
  {
    title: "각 상품별 전용 유지보수",
    points: [
      "3가지 상품별 맞춤 유지보수 제공",
      "도메인·서버 관리 지원",
      "텍스트 문구 / 이미지 수정 지원",
    ],
    icon: "/images/3d-icon/benefit005.svg",
  },
];

export default function BenefitDetails() {
  return (
    <>
      <section
        style={{
          background: "var(--section-b)",
          padding: "clamp(3rem, 6vw, 5rem) 1.25rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(2.5rem, 6vw, 4rem)",
            }}
          >
            <Reveal variant="up">
              <span className="footnote emphasized c-accent">혜택 상세</span>
            </Reveal>
            <SplitText
              as="h2"
              className="title-1 bd-heading"
              style={{ margin: "0.75rem 0 0", wordBreak: "keep-all" }}
              segments={[
                { text: "WEFLOW의 혜택, " },
                { text: "하나하나 풀어봤습니다", className: "c-accent", br: "mobile" },
              ]}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2.25rem, 5vw, 3.75rem)",
            }}
          >
            {BENEFITS.map((b, i) => (
              <Reveal
                key={b.title}
                variant={i % 2 === 1 ? "right" : "left"}
                className={`bd-row${i % 2 === 1 ? " bd-row--rev" : ""}`}
              >
                {/* 텍스트 */}
                <div className="bd-text">
                  <div style={{ width: 54, display: "flex", justifyContent: "center", marginBottom: "0.25rem" }}>
                    <Crown
                      strokeWidth={2}
                      color="#f5b301"
                      fill="#f5b301"
                      style={{ width: "1.35rem", height: "1.35rem" }}
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      width: 54,
                      height: 54,
                      marginBottom: "0.8rem",
                    }}
                  >
                    <Image
                      src={`/images/benefits/benefits-icon-0${ICON_ORDER[i]}.webp`}
                      alt=""
                      fill
                      sizes="54px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3
                    className="title-2 emphasized"
                    style={{
                      margin: "0 0 0.8rem",
                      fontSize: "clamp(1.15rem, 2.4vw, 1.3rem)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {b.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.55rem",
                    }}
                  >
                    {b.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                        }}
                      >
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          color="var(--accent)"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        />
                        <span
                          className="footnote c-secondary"
                          style={{ wordBreak: "keep-all", lineHeight: 1.6 }}
                        >
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {b.cta && (
                    <Link
                      href={b.cta.href}
                      className="btn-primary"
                      style={{ marginTop: "1.1rem", fontSize: "0.88rem", padding: "0.65rem 1.4rem" }}
                    >
                      {b.cta.label} →
                    </Link>
                  )}
                </div>

                {/* 이미지 — 텍스트 카드와 같은 높이의 칸 안에서 가운데 정렬 */}
                <div className="bd-img">
                  <div className="bd-img-inner">
                    <Image
                      src={`/images/benefits/benefits${i + 1}.webp`}
                      alt={b.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 520px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 24시간 상담 대기 — 좌우 풀-블리드 밴드 */}
      <section
        style={{
          background: "var(--accent-dim)",
          padding: "clamp(2.5rem, 5vw, 4.25rem) clamp(1.25rem, 4vw, 3rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <Reveal variant="up">
            <span className="footnote emphasized" style={{ color: "var(--accent)" }}>
              24시간 상담 대기
            </span>
          </Reveal>
          <SplitText
            as="h3"
            className="title-1 bd-heading"
            style={{
              margin: "0.75rem 0 0",
              color: "var(--text)",
              wordBreak: "keep-all",
              lineHeight: 1.4,
            }}
            step={0.024}
            segments={[
              { text: "모두가 잠든 이 시간에도,\nWEFLOW는 " },
              { text: "고객을 기다립니다", className: "bd-band-accent", br: "mobile" },
            ]}
          />
          <Reveal variant="up" delay={0.1}>
            <p
              className="callout"
              style={{
                margin: "1rem 0 1.75rem",
                color: "var(--text-secondary)",
              }}
            >
              연중무휴 24시간, 언제 문의하셔도 빠르게 응답합니다.
            </p>
          </Reveal>
          <Reveal as="div" stagger className="bd-band-imgs">
            <div className="bd-band-img">
              <Image
                src="/images/benefits/benefits7.webp"
                alt="24시간 상담 대기"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="bd-band-img">
              <Image
                src="/images/benefits/benefits8.webp"
                alt="24시간 상담 대기"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
          <Reveal variant="up">
            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "3rem",
              }}
            >
              <a
                href="tel:010-2971-7280"
                style={{
                  ...CTA_BTN,
                  fontWeight: 700,
                  borderRadius: "var(--radius-xl)",
                  border: "2px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                전화 상담하기 <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <Link
                href="/diagnosis"
                className="btn-white"
                style={CTA_BTN_FILLED}
              >
                무료 견적 신청 <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        /* 전체를 한 단계 줄인다 — 폭을 좁히면 사진·텍스트가 함께 작아진다 */
        .bd-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.2rem, 3vw, 2.5rem);
          align-items: stretch;
          max-width: 880px;
          margin: 0 auto;
          width: 100%;
        }
        /* 텍스트 측 푸른 박스 패널 */
        .bd-text {
          background: var(--surface);
          border: 1px solid var(--accent-light);
          border-radius: var(--radius-2xl);
          padding: clamp(1.1rem, 2.2vw, 1.6rem);
        }
        .bd-row--rev .bd-text { order: 2; }
        .bd-row--rev .bd-img { order: 1; }
        /* 사진 칸 — 텍스트 카드와 같은 높이로 늘어나고, 사진은 그 안에서 가운데 */
        .bd-img {
          border-radius: var(--radius-2xl);
          overflow: hidden;
          background: var(--surface-container);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.6rem, 1.5vw, 1rem);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        /* 사진 자체 — 원본이 16:9 라 같은 비율로 둬야 잘리지 않는다 */
        .bd-img-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .bd-heading { font-size: clamp(2rem, 4.5vw, 3rem); }
        .bd-band-accent { color: var(--accent); }
        .bd-band-imgs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .bd-band-img {
          aspect-ratio: 16 / 10;
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
        }
        .bd-band-ph {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        @media (max-width: 768px) {
          .bd-row { grid-template-columns: 1fr; }
          .bd-row--rev .bd-text { order: 1; }
          .bd-row--rev .bd-img { order: 2; }
          .bd-band-imgs { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
