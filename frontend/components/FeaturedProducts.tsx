"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/driveImage";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  isFeatured?: boolean;
  subcategories?: Category[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  "auction-accessories": "/auction.jpg",
  "trophies-medals": "/trophies.jpg",
  "custom-jerseys": "/jerseys.jpg",
  "printing-services": "/printing.jpg",
  "sports-accessories": "/sports-accessories.jpg",
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "AUCTION ACCESSORIES",
    slug: "auction-accessories",
    description: "Paddles, Table Tops, Bails, Keychains, Boards, Ladders & more.",
    image: "/auction.jpg",
  },
  {
    id: 2,
    name: "TROPHIES & MEDALS",
    slug: "trophies-medals",
    description: "Acrylic, Metal, Fibre Trophies, Momentos, Medals & Certificates.",
    image: "/trophies.jpg",
  },
  {
    id: 3,
    name: "CUSTOM JERSEYS",
    slug: "custom-jerseys",
    description: "Sublimation Jerseys, Plain Jerseys with Logo, T-Shirts, Tracksuits & more.",
    image: "/jerseys.jpg",
  },
  {
    id: 4,
    name: "PRINTING SERVICES",
    slug: "printing-services",
    description: "Banners, Posters, Flex, Standees, Backdrops & much more.",
    image: "/printing.jpg",
  },
  {
    id: 5,
    name: "SPORTS ACCESSORIES",
    slug: "sports-accessories",
    description: "Sports Equipment, Caps, Bags, Water Bottles & many more.",
    image: "/sports-accessories.jpg",
  },
];

const DISPLAY_ORDER = [
  "auction-accessories",
  "trophies-medals",
  "custom-jerseys",
  "printing-services",
  "sports-accessories",
];

export const FeaturedProducts: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !Array.isArray(data.data)) return;

        const extractCategories = (cats: Category[]): Category[] => {
          let all: Category[] = [];
          for (const c of cats) {
            all.push(c);
            if (c.subcategories && Array.isArray(c.subcategories)) {
              all = all.concat(extractCategories(c.subcategories));
            }
          }
          return all;
        };

        const allCategories = extractCategories(data.data);
        const featured = allCategories.filter((cat) => cat.isFeatured);

        if (featured.length > 0) {
          setCategories(featured.slice(0, 5));
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }
      })
      .catch((err) => {
        console.error("Failed to load featured categories:", err);
      });
  }, []);

  return (
    <section className="fp-section">
      <div className="fp-inner">
        {/* Header */}
        <div className="fp-header">
          <div className="fp-eyebrow-row">
            <span className="fp-rule" />
            <span className="fp-eyebrow">EXPLORE OUR RANGE</span>
            <span className="fp-rule" />
          </div>
          <h2 className="fp-heading">
            FEATURED <span className="fp-heading-accent">CATEGORIES</span>
          </h2>
          <p className="fp-subtext">
            Find the perfect gear for your game. Explore top categories and
            gear up with the best.
          </p>
        </div>

        {/* Cards */}
        <div className="fp-cards-grid">
          {categories.map((cat) => (
            <article key={cat.id || cat.slug} className="fp-card-item">
              <div className="fp-card-media">
                <img
                  src={getDirectImageUrl(
                    cat.image || CATEGORY_IMAGES[cat.slug] || "/hero-slide-1.jpg"
                  )}
                  alt={cat.name}
                  className="fp-card-media-img"
                />
                <span className="fp-card-media-wash" aria-hidden="true" />
              </div>

              <div className="fp-card-content">
                <h3 className="fp-card-heading">{cat.name}</h3>
                <p className="fp-card-text">{cat.description}</p>

                <Link
  href={`/products/${cat.slug}`}
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",

    width: "fit-content",
    minWidth: "125px",
    height: "42px",

    marginTop: "auto",
    padding: "0 20px",

    backgroundColor: "#ffffff",
    color: "#ed0f63",

    border: "2px solid #ed0f63",
    borderRadius: "8px",

    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "0.05em",

    textDecoration: "none",
    textTransform: "uppercase",

    cursor: "pointer",
    boxSizing: "border-box",

    transition: "all 0.2s ease",
  }}
>
  VIEW MORE
  <span
    style={{
      color: "#ed0f63",
      fontSize: "15px",
      lineHeight: 1,
    }}
  >
    →
  </span>
</Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fp-cta-row">
         <Link
  href="/products"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",

    width: "fit-content",
    minWidth: "220px",
    height: "50px",

    padding: "0 28px",

    backgroundColor: "#ffffff",
    color: "#ed0f63",

    border: "2px solid #ed0f63",
    borderRadius: "8px",

    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "0.04em",

    textDecoration: "none",
    textTransform: "uppercase",

    cursor: "pointer",
    boxSizing: "border-box",

    boxShadow: "0 6px 18px rgba(237, 15, 99, 0.12)",

    transition: "all 0.2s ease",
  }}
>
  EXPLORE CATEGORIES
  <span
    style={{
      color: "#ed0f63",
      fontSize: "17px",
      lineHeight: 1,
    }}
  >
    →
  </span>
</Link>
        </div>
      </div>

      <style jsx>{`
        .fp-section {
          position: relative;
          z-index: 10;
          background-color: #fdf2f8;
          background-image: url("/featured-section-bg.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 80px clamp(24px, 7vw, 100px) 100px;
          border-radius: 28px;
        }

        .fp-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .fp-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .fp-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .fp-rule {
          width: 32px;
          height: 1.5px;
          background-color: #e11d48;
        }

        .fp-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #e11d48;
          text-transform: uppercase;
        }

        .fp-heading {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 900;
          letter-spacing: 0.02em;
          color: #111827;
          margin: 0 0 14px 0;
        }

        .fp-heading-accent {
          color: #e11d48;
        }

        .fp-subtext {
          font-size: 13px;
          line-height: 1.6;
          color: #4b5563;
          max-width: 620px;
          margin: 0 auto;
        }

        /* Grid -> Flex to center dynamic amount of items */
        .fp-cards-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 28px;
        }

        .fp-card-item {
          width: calc(20% - 22.4px); /* (28px gap * 4) / 5 */
        }

        @media (max-width: 1200px) {
          .fp-cards-grid {
            gap: 26px;
          }
          .fp-card-item {
            width: calc(33.333% - 17.33px);
          }
        }

        @media (max-width: 768px) {
          .fp-cards-grid {
            gap: 22px;
          }
          .fp-card-item {
            width: calc(50% - 11px);
          }
        }

        @media (max-width: 520px) {
          .fp-cards-grid {
            gap: 22px;
            max-width: 340px;
            margin: 0 auto;
          }
          .fp-card-item {
            width: 100%;
          }
        }

        /* Card — each is a fully separate white panel */
        .fp-card-item {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 26px rgba(17, 24, 39, 0.1);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .fp-card-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 34px rgba(17, 24, 39, 0.15);
        }

        .fp-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .fp-card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .fp-card-item:hover .fp-card-media-img {
          transform: scale(1.06);
        }

        .fp-card-media-wash {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
              135deg,
              rgba(225, 29, 72, 0.4) 0%,
              rgba(225, 29, 72, 0.1) 32%,
              transparent 48%
            ),
            linear-gradient(315deg, rgba(167, 217, 0, 0.35) 0%, rgba(167, 217, 0, 0.08) 30%, transparent 50%);
          mix-blend-mode: multiply;
        }

        .fp-card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          padding: 22px 20px 26px;
        }

        .fp-card-heading {
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #111827;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }

        .fp-card-text {
          font-size: 13px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0 0 22px 0;
        }

/* =========================================
   FEATURED CATEGORY BUTTONS
   ========================================= */

.fp-view-more {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;

  width: fit-content !important;
  min-width: 125px !important;
  height: 42px !important;

  margin-top: auto !important;
  padding: 0 20px !important;

  background: #ffffff !important;
  background-color: #ffffff !important;

  color: #ed0f63 !important;

  border: 2px solid #ed0f63 !important;
  border-radius: 8px !important;

  font-family: inherit !important;
  font-size: 12px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  letter-spacing: 0.05em !important;

  text-decoration: none !important;
  text-transform: uppercase !important;

  cursor: pointer !important;

  box-shadow: none !important;

  transition:
    all 0.2s ease !important;
}

.fp-view-more:link,
.fp-view-more:visited {
  color: #ed0f63 !important;
  background: #ffffff !important;
  border-color: #ed0f63 !important;
}

.fp-view-more:hover {
  color: #ffffff !important;
  background: #ed0f63 !important;
  background-color: #ed0f63 !important;
  border-color: #ed0f63 !important;

  transform: translateY(-2px) !important;

  box-shadow: 0 8px 20px rgba(237, 15, 99, 0.25) !important;
}

.fp-view-more:active {
  transform: translateY(0) !important;
}

.fp-view-more-arrow {
  color: inherit !important;
  font-size: 15px !important;
  line-height: 1 !important;

  transition: transform 0.2s ease !important;
}

.fp-view-more:hover .fp-view-more-arrow {
  color: #ffffff !important;
  transform: translateX(3px) !important;
}


/* =========================================
   EXPLORE CATEGORIES BUTTON
   ========================================= */

.fp-cta-row {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;

  width: 100% !important;

  margin-top: 55px !important;
}

.fp-explore-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;

  width: fit-content !important;
  min-width: 220px !important;
  height: 50px !important;

  padding: 0 28px !important;

  background: #ffffff !important;
  background-color: #ffffff !important;

  color: #ed0f63 !important;

  border: 2px solid #ed0f63 !important;
  border-radius: 8px !important;

  font-family: inherit !important;
  font-size: 14px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  letter-spacing: 0.04em !important;

  text-decoration: none !important;
  text-transform: uppercase !important;

  cursor: pointer !important;

  box-shadow: 0 6px 18px rgba(237, 15, 99, 0.12) !important;

  transition:
    all 0.2s ease !important;
}

.fp-explore-btn:link,
.fp-explore-btn:visited {
  color: #ed0f63 !important;
  background: #ffffff !important;
  border-color: #ed0f63 !important;
}

.fp-explore-btn:hover {
  color: #ffffff !important;
  background: #ed0f63 !important;
  background-color: #ed0f63 !important;
  border-color: #ed0f63 !important;

  transform: translateY(-2px) !important;

  box-shadow: 0 10px 25px rgba(237, 15, 99, 0.28) !important;
}

.fp-explore-btn:active {
  transform: translateY(0) !important;
}

.fp-explore-btn-arrow {
  color: inherit !important;
  font-size: 17px !important;
  line-height: 1 !important;

  transition: transform 0.2s ease !important;
}

.fp-explore-btn:hover .fp-explore-btn-arrow {
  color: #ffffff !important;
  transform: translateX(4px) !important;
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 520px) {
  .fp-view-more {
    min-width: 120px !important;
    height: 40px !important;
    padding: 0 16px !important;
    font-size: 11px !important;
  }

  .fp-explore-btn {
    min-width: 200px !important;
    height: 46px !important;
    padding: 0 22px !important;
    font-size: 12px !important;
  }
}
      `}</style>
    </section>
  );
};

export default FeaturedProducts;