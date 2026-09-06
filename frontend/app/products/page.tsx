"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { CtaBand } from "../../components/CtaBand";
import { Footer } from "../../components/Footer";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  tags?: string[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  trophies: "/trophies.jpg",
  medals: "/medals.jpg",
  "custom-jerseys": "/jerseys.jpg",
  "sports-equipment": "/sports-accessories.jpg",
  "auction-accessories": "/auction.jpg",
  "event-setups": "/event-setups.jpg",
};

const CATEGORY_BTN: Record<string, "pink" | "lime"> = {
  trophies: "lime",
  medals: "pink",
  "custom-jerseys": "lime",
  "sports-equipment": "pink",
  "auction-accessories": "lime",
  "event-setups": "pink",
};

// Fallback so the page always looks right even if the API is empty/down
const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "Trophies", slug: "trophies", description: "Metal, acrylic & wooden trophies for every occasion.", image: null },
  { id: 2, name: "Medals", slug: "medals", description: "Custom medals for tournaments, schools & corporates.", image: null },
  { id: 3, name: "Custom Jerseys", slug: "custom-jerseys", description: "Fully customized jerseys with your logo & design.", image: null },
  { id: 4, name: "Sports Equipment", slug: "sports-equipment", description: "Quality gear for training and tournaments.", image: null },
  { id: 5, name: "Auction Accessories", slug: "auction-accessories", description: "Bidding paddles, lanyards, badges & more.", image: null },
  { id: 6, name: "Event Setups", slug: "event-setups", description: "Custom branding & event essentials.", image: null },
];

const FEATURES = [
  { label: "CUSTOM\nDESIGNS", icon: <path d="M6 3l14 9-14 9 4-9-4-9z" /> },
  { label: "PREMIUM\nQUALITY", icon: <path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.9 6.5 19.5l1-6.3L3 8.9 9 8l3-6z" /> },
  { label: "PAN INDIA\nDELIVERY", icon: <path d="M3 7h10v8H3zM13 10h4l3 3v2h-7zM6 18a2 2 0 100-4 2 2 0 000 4zM17 18a2 2 0 100-4 2 2 0 000 4z" /> },
  { label: "IDEAL FOR\nALL EVENTS", icon: <path d="M12 2a5 5 0 015 5c0 3-5 9-5 9s-5-6-5-9a5 5 0 015-5zM12 9a2 2 0 100-4 2 2 0 000 4z" /> },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategories(data.data);
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setCategories(DEFAULT_CATEGORIES);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="page-hero" style={{ backgroundImage: "url('/Product-bg.png')" }}>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="breadcrumb">
                HOME / <span>PRODUCTS</span>
              </div>
              <h1>
                Everything for Your <span>Sports Event</span>
              </h1>
              <p>
                Choose a category and send us your quantity, logo, names, sizes and event date.
                SportzMitra focuses on custom and bulk requirements rather than fixed-cart checkout.
              </p>

              <div className="hero-cta">
                <Link className="btn btn-pink" href="/contact">
                  GET BULK QUOTE →
                </Link>
                <Link className="btn btn-outline-lime" href="#categories">
                  EXPLORE PRODUCTS
                </Link>
              </div>

              <ul className="hero-features">
                {FEATURES.map((f) => (
                  <li key={f.label}>
                    <span className="feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {f.icon}
                      </svg>
                    </span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-visual" aria-hidden="true" />
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="categories-section">
          <div className="container">
            <div className="categories-head">
              <div>
                <span className="eyebrow">EXPLORE OUR RANGE</span>
                <h2>Product Categories</h2>
              </div>
              <div className="head-right">
                <p>From trophies to custom jerseys, we provide everything you need to make your event special.</p>
                <Link className="btn btn-outline-pink view-all" href="/products">
                  VIEW ALL →
                </Link>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "#62686f" }}>
                Loading categories...
              </div>
            ) : (
              <div className="catalog">
                {categories.map((cat) => {
                  const accent = CATEGORY_BTN[cat.slug] || "pink";
                  return (
                    <article className="pcard category-card" key={cat.id}>
                      <div className="thumb">
                        <img
                          src={cat.image || CATEGORY_IMAGES[cat.slug] || "/hero-slide-1.jpg"}
                          alt={cat.name}
                        />
                      </div>
                      <div className="body">
                        <div>
                          <h3>{cat.name}</h3>
                          <p className="cat-desc">{cat.description}</p>
                        </div>
                        <div className="card-actions">
                          <Link
                            className={`circle-btn circle-${accent}`}
                            href={`/products/${cat.slug}`}
                            aria-label={`View ${cat.name}`}
                          >
                            <ArrowIcon />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />

      <style jsx>{`
        :global(:root) {
          --pink: #ec1a6d;
          --pink-dark: #c9105a;
          --lime: #8ecb3d;
          --lime-dark: #5f9424;
          --ink: #14141c;
          --muted: #62686f;
        }

        /* Define container ourselves so this page can't be broken by a
           fixed/min-width .container coming from a global stylesheet */
        .container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          box-sizing: border-box;
        }
        .page-hero,
        .categories-section,
        .page-hero *,
        .categories-section * {
          box-sizing: border-box;
        }

        /* ---------- HERO ---------- */
        .page-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 64px 0 48px;
          overflow: hidden;
        }
        .page-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0.96) 0%,
            rgba(255, 255, 255, 0.75) 40%,
            rgba(255, 255, 255, 0.25) 68%,
            rgba(255, 255, 255, 0.05) 100%
          );
        }
        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
          align-items: center;
        }
        .breadcrumb {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 18px;
        }
        .breadcrumb span {
          color: var(--pink);
        }
        .hero-copy h1 {
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.15;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 16px;
        }
        .hero-copy h1 span {
          color: var(--pink);
        }
        .hero-copy p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.65;
          max-width: 480px;
          margin: 0 0 26px;
        }
        .hero-cta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 34px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 12.5px;
          letter-spacing: 0.03em;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .btn-pink {
          background: var(--pink);
          color: #fff;
          box-shadow: 0 8px 20px rgba(236, 26, 109, 0.35);
        }
        .btn-outline-lime {
          background: #fff;
          color: var(--lime-dark);
          border: 2.5px solid var(--lime);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
        }
        .btn-outline-pink {
          background: #fff;
          color: var(--pink);
          border: 2.5px solid var(--pink);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
        }
        .hero-features {
          list-style: none;
          display: flex;
          gap: 22px;
          padding: 0;
          margin: 0;
          flex-wrap: wrap;
        }
        .hero-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10.5px;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.02em;
          white-space: pre-line;
          line-height: 1.3;
        }
        .feature-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #fdeaf1;
          color: var(--pink);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-visual {
          position: relative;
          min-height: 300px;
          background-image: url("/hero-products-visual.png");
          background-size: contain;
          background-position: center right;
          background-repeat: no-repeat;
        }

        /* ---------- CATEGORIES ---------- */
        .categories-section {
          padding: 56px 0 64px;
          background: #fff;
        }
        .categories-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .eyebrow {
          display: block;
          color: var(--lime-dark);
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .categories-head h2 {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 800;
          color: var(--ink);
          margin: 0;
        }
        .head-right {
          display: flex;
          align-items: center;
          gap: 20px;
          max-width: 440px;
        }
        .head-right p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }
        .view-all {
          padding: 10px 18px;
        }

        .catalog {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .pcard.category-card {
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 6px 22px rgba(20, 20, 28, 0.09);
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .pcard.category-card .thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .pcard.category-card .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pcard.category-card .body {
          padding: 20px 20px 24px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          flex: 1;
          text-align: left;
        }
        .pcard.category-card h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 5px;
          text-align: left;
        }
        .pcard.category-card .cat-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.45;
          margin: 0;
          text-align: left;
        }
        .card-actions {
          flex-shrink: 0;
        }
        .circle-btn {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .circle-pink {
          border: 2px solid var(--pink);
          color: var(--pink);
        }
        .circle-pink:hover {
          background: var(--pink);
          color: #fff;
        }
        .circle-lime {
          border: 2px solid var(--lime);
          color: var(--lime-dark);
        }
        .circle-lime:hover {
          background: var(--lime);
          color: #fff;
        }

        /* ---------- RESPONSIVE ---------- */
        /* Tablet / small laptop: 2 bigger cards per row */
        @media (max-width: 1100px) {
          .catalog {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-visual {
            order: -1;
            min-height: 220px;
          }
          .hero-copy p {
            max-width: 100%;
          }
          .categories-head {
            flex-direction: column;
            align-items: flex-start;
          }
          .head-right {
            max-width: 100%;
          }
        }

        /* Mobile: 1 full-width card, larger imagery/text, and a hero
           that reads as a designed screen rather than stacked text */
        @media (max-width: 640px) {
          .container {
            padding-left: 20px;
            padding-right: 20px;
            max-width: 100%;
          }
          .page-hero {
            padding: 36px 0 32px;
          }
          .breadcrumb {
            margin-bottom: 14px;
          }
          .hero-copy h1 {
            font-size: 28px;
          }
          .hero-copy p {
            font-size: 14px;
          }
          .hero-cta {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 28px;
          }
          .hero-cta .btn {
            width: 100%;
            justify-content: center;
            padding: 15px 20px;
          }
          .hero-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 12px;
          }
          .hero-features li {
            font-size: 11px;
          }
          .feature-icon {
            width: 44px;
            height: 44px;
          }

          .categories-section {
            padding: 40px 0 48px;
          }
          .catalog {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .pcard.category-card .thumb {
            aspect-ratio: 16 / 10;
          }
          .pcard.category-card h3 {
            font-size: 19px;
          }
          .pcard.category-card .cat-desc {
            font-size: 14px;
          }
          .circle-btn {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </>
  );
}