import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

export default function ServiceSwitch() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(4rem, 9vw, 7rem) 1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <Reveal variant="up">
          <p
            className="footnote emphasized c-accent"
            style={{ margin: "0 0 0.85rem" }}
          >
            여기서 하나 더
          </p>
        </Reveal>
        <SplitText
          as="h2"
          className="title-1 svc-switch-title"
          style={{ margin: 0, wordBreak: "keep-all", lineHeight: 1.4 }}
          step={0.024}
          segments={[
            { text: "타 서비스에서 전환하신다면?\n" },
            { text: "고민 전 " },
            { text: "문의 요망!", className: "c-accent emphasized" },
          ]}
        />

        {/* 이미지 박스 2개 */}
        <Reveal as="div" stagger className="svc-switch-boxes">
          {[0, 1].map((i) => (
            <div key={i} className="svc-switch-img">
              이미지
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .svc-switch-title {
          font-size: clamp(2.2rem, 5.5vw, 3.5rem);
        }
        .svc-switch-boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
          margin-top: clamp(2rem, 4vw, 3rem);
        }
        .svc-switch-img {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-2xl);
          background: #e6eaf1;
          border: 1px dashed rgba(11,18,32,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        @media (max-width: 560px) {
          .svc-switch-boxes { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
