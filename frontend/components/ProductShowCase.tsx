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
const GRAY = "#6B7280";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop";

export default function ProductsShowcase() {
  return (
    <section id="products" className="ps">
      <div className="sm-container">
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

          <div className="ps__slider">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="ps__card"
              >
                <span
                  className={`ps__badge ps__badge--${cat.accent ?? (i % 2 === 0 ? "pink" : "green")}`}
                >
                  {cat.name}
                </span>

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
                </div>

                <div className="ps__body">
                  <h3 className="ps__name">{cat.name}</h3>
                  <span
                    className={`ps__cta ps__cta--${cat.accent ?? (i % 2 === 0 ? "pink" : "green")}`}
                  >
                    Shop {cat.name}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ps {
          padding: 72px 0;
          background: linear-gradient(135deg, ${PINK} 0%, ${GREEN} 100%);
        }

        .ps__panel {
          position: relative;
          background: #ffffff;
          border-radius: 28px;
          padding: 32px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
          overflow: hidden;
        }

        .ps__panelCorner {
          position: absolute;
          top: 0;
          right: 0;
          width: 140px;
          height: 90px;
          background: linear-gradient(135deg, ${PINK_SOFT} 0%, ${GREEN_SOFT} 100%);
          clip-path: polygon(40% 0, 100% 0, 100% 100%);
          pointer-events: none;
        }

        .ps__panelHead {
          position: relative;
          margin-bottom: 28px;
        }
        .ps__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin: 0 0 6px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${INK};
        }
        .ps__eyebrowMark {
          color: ${PINK_DARK};
          font-size: 16px;
        }
        .ps__title {
          font-size: clamp(28px, 4vw, 40px);
          margin: 0 0 10px;
          color: ${INK};
          font-weight: 800;
        }
        .ps__intro {
          max-width: 56ch;
          color: ${GRAY};
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        /* Horizontal single-row slider */
        .ps__slider {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }
        .ps__slider::-webkit-scrollbar {
          height: 6px;
        }
        .ps__slider::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 999px;
        }

        .ps__card {
          position: relative;
          flex: 0 0 auto;
          scroll-snap-align: start;
          width: 220px;
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          background: #ffffff;
          border: 1.5px solid #eee;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .ps__card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
          border-color: transparent;
        }

        .ps__media {
          position: relative;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          margin: 10px 10px 0;
          width: calc(100% - 20px);
          overflow: hidden;
          background: linear-gradient(160deg, #f3f3f3 0%, #fafafa 100%);
        }
        .ps__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .ps__card:hover .ps__img {
          transform: scale(1.06);
        }
        .ps__emoji {
          font-size: 52px;
          filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.15));
          transition: transform 0.3s ease;
        }
        .ps__card:hover .ps__emoji {
          transform: scale(1.08) translateY(-2px);
        }

        .ps__badge {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #ffffff;
          padding: 5px 10px;
          border-radius: 999px;
          z-index: 1;
        }
        .ps__badge--green {
          background: ${GREEN_DARK};
        }
        .ps__badge--pink {
          background: ${PINK_DARK};
        }

        .ps__body {
          padding: 14px 14px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .ps__name {
          text-transform: uppercase;
          font-size: 15px;
          font-weight: 800;
          margin: 0 0 10px;
          color: ${INK};
          line-height: 1.3;
        }

        .ps__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 800;
          color: #ffffff;
          padding: 9px 14px;
          border-radius: 999px;
          transition: gap 0.2s ease, filter 0.2s ease;
          white-space: nowrap;
        }
        .ps__card:hover .ps__cta {
          gap: 9px;
        }
        .ps__cta--green {
          background: ${GREEN};
        }
        .ps__cta--pink {
          background: ${PINK};
        }

        @media (min-width: 1000px) {
          .ps__panel {
            padding: 40px;
          }
          .ps__card {
            width: 240px;
          }
        }
      `}</style>
    </section>
  );
}