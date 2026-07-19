import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * 메인페이지의 "혹시, 타사와 고민 중이신가요?" 비교 배너 — 마무리 CTA 바로 앞에 온다.
 * 파란 그라데이션 배너 안에 문구와 /pricing(가격·비교자료)으로 가는 흰 알약 버튼을 두고,
 * 캐릭터는 배너 오른쪽 밖으로 크게 삐져나오게 배치했다(의도된 연출).
 */
export default function ComparisonCTA() {
  return (
    <section
      style={{
        background: "var(--section-b)",
        padding: "clamp(2rem, 5vw, 3.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <Reveal
          as="div"
          variant="zoom"
          className="cmp-banner"
          style={{
            position: "relative",
            borderRadius: "clamp(20px, 3vw, 28px)",
            background: "linear-gradient(100deg, #2a4f9e 0%, #5b9ccb 100%)",
            padding: "clamp(2rem, 5vw, 3rem) clamp(1.75rem, 5vw, 3.5rem)",
            minHeight: "220px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* 텍스트 */}
          <div className="cmp-text" style={{ position: "relative", zIndex: 1 }}>
            <h2
              className="title-2 emphasized"
              style={{ color: "#fff", margin: 0, wordBreak: "keep-all" }}
            >
              혹시, 타사와 고민 중이신가요?
            </h2>
            <p
              className="callout"
              style={{
                color: "rgba(255,255,255,0.85)",
                margin: "0.6rem 0 1.4rem",
                wordBreak: "keep-all",
              }}
            >
              기능부터 가격까지 볼 수 있는 비교자료를 한 눈에 확인해보세요.
            </p>
            <Link
              href="/pricing"
              className="subhead emphasized"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#fff",
                color: "var(--accent)",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(21,51,107,0.18)",
              }}
            >
              비교자료 보러가기
            </Link>
          </div>

          {/* 캐릭터 이미지 */}
          <div className="cmp-char">
            <Image
              src="/images/main/main-character.png"
              alt="위플로우 캐릭터"
              fill
              sizes="(max-width: 768px) 240px, 720px"
              style={{ objectFit: "contain", objectPosition: "bottom" }}
            />
          </div>
        </Reveal>
      </div>

      {/* 캐릭터를 배너 밖으로 밀어내는 배치 — right 음수값과 100% 넘는 height 가 핵심이고,
          좁은 화면에서는 글자를 가리지 않도록 크기·위치를 단계별로 줄인다 */}
      <style>{`
        .cmp-text { max-width: 60%; }
        .cmp-char {
          position: absolute;
          right: -21rem;
          bottom: -1.8rem;
          width: clamp(700px, 72vw, 1050px);
          height: 155%;
        }
        @media (max-width: 768px) {
          .cmp-text { max-width: 70%; }
          .cmp-char {
            right: -3rem;
            bottom: 0;
            width: 230px;
            height: 118%;
          }
        }
        @media (max-width: 420px) {
          .cmp-text { max-width: 62%; }
          .cmp-char { right: -3.3rem; width: 200px; }
        }
      `}</style>
    </section>
  );
}
