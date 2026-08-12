"use client";

import Link from "next/link";
import { categories } from "@/lib/data";

const PINK = "#E6317D";
const PINK_DARK = "#C41F68";
const PINK_SOFT = "#FDEAF2";
const GREEN = "#6FB92C";
const GREEN_DARK = "#4F9418";
const GREEN_SOFT = "#EEF7E4";
const INK = "#1A1A1A";
const GRAY = "#4B5563";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop";

export default function ProductsShowcase() {
  return (
    <section id="products" className="ps">
      <div className="ps__container">
        <div className="ps__panel">
          <div className="ps__panelCorner" aria-hidden />

          <div className="ps__panelHead">
            <div>
              <p className="ps__eyebrow">
                <span className="ps__eyebrowMark">%</span>Shop by Sport
              </p>
              <h2 className="ps__title">Find Your Game</h2>
              <p className="ps__intro">
                From the pitch to the court, browse gear curated for every mitra —
                pick a sport to jump straight into the collection.
              </p>
            </div>
          </div>

          {/* Cards now wrap naturally into a grid instead of a rigid single-row scroll */}
          <div className="ps__slider">
            {categories.map((cat, i) => {
              const accentType = cat.accent ?? (i % 2 === 0 ? "pink" : "green");
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="ps__card"
                >
                  <div className="ps__media">
                    {cat.image ? (
                      <img
                        className="ps__img"
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    ) : (
                      <span className="ps__emoji" aria-hidden>
                        {cat.emoji}
                      </span>
                    )}
                    <div className="ps__mediaOverlay" />
                  </div>

                  <div className="ps__body">
                    <span className={`ps__cta ps__cta--${accentType}`}>
                      <span className="ps__ctaText">Shop {cat.name}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M9 5l7 7-7 7"
                          stroke="#fff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ps {
          padding: 60px 16px;
          background: radial-gradient(circle at top left, #fbf2f6 0%, #f4f9ef 100%);
          position: relative;
        }

        .ps__container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .ps__panel {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 50px rgba(26, 26, 26, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .ps__panelCorner {
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 150px;
          background: linear-gradient(135deg, ${PINK_SOFT} 0%, ${GREEN_SOFT} 100%);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          opacity: 0.7;
          pointer-events: none;
          z-index: 0;
        }

        .ps__panelHead {
          position: relative;
          margin-bottom: 32px;
          z-index: 2;
        }

        .ps__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 0 0 8px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${GRAY};
        }

        .ps__eyebrowMark {
          color: ${PINK};
          font-size: 14px;
          font-weight: 900;
        }

        .ps__title {
          font-size: clamp(28px, 4.5vw, 42px);
          margin: 0 0 12px;
          color: ${INK};
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .ps__intro {
          max-width: 60ch;
          color: ${GRAY};
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
        }

        /* Cards now wrap into a natural grid — no more forced single-row scroll/snap */
        .ps__slider {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        /* Card Container Styling — own stacking context so the badge can never escape it */
        .ps__card {
          position: relative !important;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #eef0f2;
          overflow: hidden;
          text-decoration: none !important; /* Strips general browser link lines */
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.3s ease;
        }

        /* Belt-and-braces: kill underline on every element and every link state */
        .ps__card,
        .ps__card:link,
        .ps__card:visited,
        .ps__card:hover,
        .ps__card:active,
        .ps__card * {
          text-decoration: none !important;
        }

        .ps__card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px rgba(26, 26, 26, 0.08);
          border-color: rgba(0, 0, 0, 0.02);
        }

        /* Bigger, more prominent image — taller ratio, tighter margin so it fills the card */
        .ps__media {
          position: relative;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          margin: 6px 6px 0;
          overflow: hidden;
          background: #fafafa;
        }

        .ps__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .ps__mediaOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ps__card:hover .ps__img {
          transform: scale(1.05);
        }

        .ps__card:hover .ps__mediaOverlay {
          opacity: 1;
        }

        .ps__emoji {
          font-size: 56px;
          filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.1));
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .ps__card:hover .ps__emoji {
          transform: scale(1.1) translateY(-4px);
        }

        .ps__body {
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        /* CTA styling — smaller footprint, underline killed on wrapper and inner text span */
        .ps__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff !important;
          padding: 8px 12px;
          border-radius: 12px;
          transition: background-color 0.25s ease, transform 0.25s ease;
          white-space: nowrap;
          text-decoration: none !important;
        }

        .ps__ctaText {
          text-decoration: none !important;
          border-bottom: none !important;
        }

        .ps__cta svg {
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .ps__card:hover .ps__cta svg {
          transform: translateX(3px);
        }

        .ps__cta--green {
          background: ${GREEN};
          box-shadow: 0 4px 14px rgba(111, 185, 44, 0.25);
        }
        .ps__card:hover .ps__cta--green {
          background: ${GREEN_DARK};
        }

        .ps__cta--pink {
          background: ${PINK};
          box-shadow: 0 4px 14px rgba(230, 49, 125, 0.25);
        }
        .ps__card:hover .ps__cta--pink {
          background: ${PINK_DARK};
        }

        @media (min-width: 768px) {
          .ps {
            padding: 80px 0;
          }
          .ps__panel {
            padding: 40px;
          }
          .ps__slider {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }
      `}</style>
    </section>
  );
}