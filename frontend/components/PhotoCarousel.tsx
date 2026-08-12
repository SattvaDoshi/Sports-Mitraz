"use client";

import { useRef } from "react";

const photos = [
  { id: "p1", label: "Football", color: "linear-gradient(160deg,#7cb928,#3f6f13)" },
  { id: "p2", label: "Tennis", color: "linear-gradient(160deg,#e21c63,#8c1245)" },
  { id: "p3", label: "Badminton", color: "linear-gradient(160deg,#3f6f13,#1a1a1a)" },
  { id: "p4", label: "Cricket", color: "linear-gradient(160deg,#8c1245,#1a1a1a)" },
  { id: "p5", label: "Basketball", color: "linear-gradient(160deg,#7cb928,#e21c63)" },
  { id: "p6", label: "Running", color: "linear-gradient(160deg,#1a1a1a,#7cb928)" },
];

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="pcx">
      <div className="sm-container pcx__head">
        <div>
          <p className="sm-eyebrow">In Action</p>
          <h2 className="sm-heading pcx__title">Sportz Mitraz Moments</h2>
        </div>
        <div className="pcx__controls">
          <button type="button" aria-label="Previous photos" onClick={() => scrollBy(-1)}>
            ←
          </button>
          <button type="button" aria-label="Next photos" onClick={() => scrollBy(1)}>
            →
          </button>
        </div>
      </div>

      <div className="pcx__track" ref={trackRef}>
        {photos.map((p) => (
          <div key={p.id} className="pcx__slide" style={{ background: p.color }}>
            <span className="pcx__slide-label">{p.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .pcx {
          padding: 64px 0 76px;
        }
        .pcx__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 26px;
        }
        .pcx__title {
          font-size: clamp(28px, 4.5vw, 42px);
          margin: 8px 0 0;
        }
        .pcx__controls {
          display: flex;
          gap: 8px;
        }
        .pcx__controls button {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--sm-line);
          background: var(--sm-white);
          font-size: 16px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .pcx__controls button:hover {
          background: var(--sm-ink);
          color: var(--sm-white);
          transform: translateY(-2px);
        }
        .pcx__track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 24px 8px;
          scrollbar-width: none;
        }
        .pcx__track::-webkit-scrollbar {
          display: none;
        }
        .pcx__slide {
          flex: 0 0 auto;
          width: 78vw;
          max-width: 340px;
          aspect-ratio: 4 / 5;
          border-radius: var(--sm-radius-lg);
          scroll-snap-align: start;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          box-shadow: var(--sm-shadow-sm);
        }
        .pcx__slide-label {
          color: var(--sm-white);
          font-family: var(--font-display);
          text-transform: uppercase;
          font-size: 20px;
          letter-spacing: 0.02em;
        }

        @media (min-width: 640px) {
          .pcx__track {
            padding: 0 24px 8px;
          }
          .pcx__slide {
            width: 320px;
          }
        }
        @media (min-width: 1300px) {
          .pcx__track {
            padding: 0 calc((100vw - 1240px) / 2) 8px;
          }
        }
      `}</style>
    </section>
  );
}