"use client";

import React from "react";
import Link from "next/link";

interface PageHeroProps {
  bgImage?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  bgImage = "/HeroImage.png",
  primaryBtnText = "EXPLORE PRODUCTS",
  secondaryBtnText = "GET A QUOTE",
}) => {
  return (
    <section className="hero-section">
      {/* Full-bleed background photo — laptop/desktop only */}
      <div
        className="hero-bg-image"
        style={{ backgroundImage: `url(${bgImage})` }}
        role="img"
        aria-label="Sportz Mitra Athletes"
      />

      {/* Decorative side text over the image */}
      <div className="side-text-top">
        <span>PEOPLE</span>
        <span>PASSION</span>
        <span>PROGRESS</span>
        <span className="side-dash" />
      </div>

      <div className="side-text-bottom">
        <span className="script-line">More</span>
        <span className="script-line">Than a</span>
        <span className="script-line script-accent">Game</span>
      </div>

      {/* Carousel dots */}
      <div className="hero-dots">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
      </div>

      {/* Main Container */}
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-kicker">
            <span className="kicker-dot" />
            PLAY <span className="kicker-sep">•</span> TRAIN <span className="kicker-sep">•</span> EXCEL
          </span>

          <h1 className="hero-title">
            <span className="line-dark">GEAR UP</span>
            <span className="line-pink">FOR A</span>
            <span className="line-green">BETTER GAME</span>
          </h1>

          <p className="hero-description">
            Premium sports gear for every athlete.
            <br />
            Play harder. Go further. Only at SportzMitraz.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
 <Link
  href="/products"
  className="btn-primary"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",

    width: "auto",
    minWidth: "190px",
    height: "50px",

    padding: "0 24px",

    boxSizing: "border-box",

    backgroundColor: "#ec1876",
    color: "#101010",

    border: "2px solid #ec1876",
    borderRadius: "8px",

    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.03em",

    textDecoration: "none",
    textTransform: "uppercase",

    cursor: "pointer",

    opacity: 1,
    visibility: "visible",

    boxShadow: "0 8px 20px rgba(236, 24, 118, 0.25)",

    transition: "all 0.2s ease",
  }}
>
  <span>{primaryBtnText}</span>

  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      width: "16px",
      height: "16px",
      flexShrink: 0,
    }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
</Link>

            <Link
  href="/contact"
  className="btn-secondary"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    width: "auto",
    minWidth: "160px",
    height: "50px",

    padding: "0 24px",

    boxSizing: "border-box",

    backgroundColor: "#a7d900",
    color: "#111111",

    border: "2px solid #8fbd00",
    borderRadius: "8px",

    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.03em",

    textDecoration: "none",
    textTransform: "uppercase",

    cursor: "pointer",

    opacity: 1,
    visibility: "visible",

    boxShadow: "0 8px 20px rgba(167, 217, 0, 0.22)",

    transition: "all 0.2s ease",
  }}
>
  <span>{secondaryBtnText}</span>
</Link>
          </div>

          {/* Photo block — mobile/tablet only */}
          <div className="hero-mobile-image">
            <img src={bgImage} alt="Sportz Mitra Athletes" />
            <div className="hero-mobile-image-fade" />
          </div>

          {/* Feature row */}
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>Fast</h4>
                <p>Delivery</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 3 6v6c0 5.25 3.75 9.75 9 11 5.25-1.25 9-5.75 9-11V6l-9-4z" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>Secure</h4>
                <p>Payments</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>24/7</h4>
                <p>Support</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="hero-stats">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Happy Athletes</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Top Brands</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Original Products</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Caveat:wght@600;700&display=swap");

        /* ---------- Base / Mobile (< 640px) ---------- */
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          font-family: "Poppins", system-ui, -apple-system, sans-serif;
          color: #0f172a;
          background: linear-gradient(
            160deg,
            #fdeaf3 0%,
            #fbeef4 40%,
            #f6f3ee 70%,
            #ffffff 100%
          );
        }

        /* Full-bleed bg photo — only ever shown from 1024px up */
        .hero-bg-image {
          display: none;
        }

        .side-text-top,
        .side-text-bottom,
        .hero-dots {
          display: none;
        }

        .hero-container {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 2.25rem;
          box-sizing: border-box;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #ec1876;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7fc241;
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        .kicker-sep {
          color: #7fc241;
          margin: 0 0.15em;
        }

        .hero-title {
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.02em;
          font-size: clamp(2.5rem, 12vw, 3.1rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }

        .line-dark {
          color: #0f172a;
        }

        .line-pink {
          color: #ec1876;
        }

        .line-green {
          color: #7fc241;
        }

        .hero-description {
          margin: 1.25rem 0 1.5rem 0;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.55;
          color: #52607a;
          max-width: 420px;
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 0.85rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        /* Shared Button Base Styles */
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 3.1rem;
          padding: 0 1.5rem;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          width: 100%;
          box-sizing: border-box;
          border: none;
        }

        /* Primary Button */
        .btn-primary {
          background-color: #ec1876 !important;
          color: #ffffff !important;
          box-shadow: 0 12px 20px -6px rgba(236, 24, 118, 0.4);
        }

        .btn-primary:hover {
          background-color: #d21367 !important;
          transform: translateY(-2px);
        }

        .btn-icon {
          width: 16px;
          height: 16px;
          margin-left: 0.6rem;
          transition: transform 0.2s ease;
        }

        .btn-primary:hover .btn-icon {
          transform: translateX(3px);
        }

        /* Secondary Button */
        .btn-secondary {
          background-color: #f4126b !important;
          color: #ffffff !important;
          border: 1.5px solid #c20f57 !important;
        }

        .btn-secondary:hover {
          background-color: #d21367 !important;
          transform: translateY(-2px);
        }

        /* Poster-style image block, mobile/tablet only */
        .hero-mobile-image {
          position: relative;
          width: 100%;
          border-radius: 1.25rem;
          overflow: hidden;
          margin-bottom: 2rem;
          aspect-ratio: 4 / 3;
          box-shadow: 0 20px 30px -12px rgba(15, 23, 42, 0.25);
        }

        .hero-mobile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 100% 25%;
          transform: scale(1.55);
          transform-origin: right center;
          display: block;
        }

        .hero-mobile-image-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0) 60%,
            rgba(15, 23, 42, 0.25) 100%
          );
          pointer-events: none;
        }

        .hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 1.1rem 1.5rem;
          margin-bottom: 1.5rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          color: #ec1876;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 20px;
          height: 20px;
        }

        .feature-text h4 {
          margin: 0;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.15;
        }

        .feature-text p {
          margin: 0;
          font-size: 0.7rem;
          color: #64748b;
          line-height: 1.15;
        }

        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e6e1e6;
          width: 100%;
        }

        .stat-item h3 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 800;
          color: #ec1876;
        }

        .stat-item p {
          margin: 0.15rem 0 0 0;
          font-size: 0.7rem;
          color: #64748b;
        }

        /* ---------- Small mobile / large phones (>= 400px) ---------- */
        @media (min-width: 400px) {
          .hero-actions {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .hero-btn {
            width: auto;
          }
        }

        /* ---------- Tablet (>= 640px) ---------- */
        @media (min-width: 640px) {
          .hero-container {
            padding: 3.25rem 2rem 2.75rem;
          }

          .hero-content {
            max-width: 620px;
          }

          .hero-title {
            font-size: clamp(3rem, 7vw, 3.75rem);
          }

          .hero-description {
            font-size: 1.05rem;
          }

          .hero-mobile-image {
            aspect-ratio: 16 / 9;
          }
          
          .hero-mobile-image img {
            transform: scale(1.35);
          }
        }

        /* ---------- Tablet landscape (>= 768px) ---------- */
        @media (min-width: 768px) {
          .hero-title {
            font-size: clamp(3.25rem, 6vw, 4rem);
          }

          .hero-mobile-image {
            aspect-ratio: 21 / 9;
          }
          
          .hero-mobile-image img {
            transform: scale(1.15);
          }
        }

        /* ---------- Laptop (>= 1024px) ---------- */
        @media (min-width: 1024px) {
          .hero-section {
            min-height: 680px;
          }

          .hero-bg-image {
            display: block;
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            background-repeat: no-repeat;
            background-position: center right;
            background-size: cover;
          }

          .hero-mobile-image {
            display: none;
          }

          .side-text-top {
            display: flex;
            position: absolute;
            top: 2.25rem;
            right: 2.25rem;
            z-index: 2;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.1rem;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            color: #94a3b8;
          }

          .side-dash {
            width: 24px;
            height: 2px;
            background: #ec1876;
            margin-top: 0.4rem;
          }

          .side-text-bottom {
            display: flex;
            position: absolute;
            bottom: 3.5rem;
            right: 2.25rem;
            z-index: 2;
            flex-direction: column;
            align-items: flex-end;
            line-height: 0.95;
          }

          .script-line {
            font-family: "Caveat", cursive;
            font-size: 2rem;
            font-weight: 700;
            font-style: italic;
            color: #1e293b;
          }

          .script-accent {
            color: #ec1876;
          }

          .hero-dots {
            display: flex;
            position: absolute;
            bottom: 1.5rem;
            right: 2.25rem;
            z-index: 2;
            gap: 0.5rem;
          }

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1.5px solid #cbd5e1;
            background: transparent;
          }

          .dot.active {
            background: #ec1876;
            border-color: #ec1876;
          }

          .hero-container {
            position: relative;
            z-index: 3;
            padding: 3.5rem 1.5rem 2.5rem 1.25rem;
          }

          .hero-content {
            max-width: 560px;
          }

          .hero-actions {
            flex-wrap: nowrap;
          }

          .hero-title {
            font-size: clamp(2.75rem, 4.5vw, 3.5rem);
          }
        }

        /* ---------- Desktop (>= 1280px) ---------- */
        @media (min-width: 1280px) {
          .hero-section {
            min-height: 720px;
          }

          .hero-container {
            padding: 4.5rem 2rem 3rem 1.5rem;
          }

          .hero-title {
            font-size: clamp(3rem, 5.4vw, 4rem);
          }
        }
 
      `}</style>
    </section>
  );
};

export default PageHero;