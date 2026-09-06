"use client";

import React from "react";

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "EVENT SETUPS", image: "/printing.jpg" },
  { id: 2, title: "TROPHIES & AWARDS", image: "/trophies.jpg" },
  { id: 3, title: "CUSTOM JERSEYS", image: "/jerseys.jpg" },
  { id: 4, title: "MEDALS & ACCESSORIES", image: "/auction.jpg" },
  { id: 5, title: "SPORTS EQUIPMENT", image: "/sports-accessories.jpg" },
  { id: 6, title: "SPECIAL COLLECTIONS", image: "/hero-slide-1.jpg" },
];

export const RecentWorkGallery: React.FC = () => {
  return (
    <section className="rwg-section">
      {/* Section Header — stays within the normal container width */}
      <div className="rwg-header">
        <div className="rwg-subtitle-wrap">
          <span className="rwg-line"></span>
          <span className="rwg-subtitle">OUR PORTFOLIO</span>
          <span className="rwg-line"></span>
        </div>

        <h2 className="rwg-title">
          OUR RECENT <span className="rwg-highlight">WORK</span>
        </h2>
        <p className="rwg-description">
          A glimpse of the events, gear, and experiences we've been proud to
          be a part of.
        </p>
      </div>

      {/* Full-bleed carousel — no left/right gap */}
      <div className="rwg-scroll">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.id} className="rwg-card">
            <img src={item.image} alt={item.title} className="rwg-image" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .rwg-section {
          background-color: #fafafa;
          padding: 60px 0;
          overflow: hidden;
        }

        /* Header */
        .rwg-header {
          text-align: center;
          margin-bottom: 32px;
          padding: 0 20px;
        }

        .rwg-subtitle-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .rwg-line {
          width: 24px;
          height: 1.5px;
          background-color: #cbd5e1;
        }

        .rwg-subtitle {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #e11d48;
          text-transform: uppercase;
        }

        .rwg-title {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.02em;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .rwg-highlight {
          color: #e11d48;
        }

        .rwg-description {
          font-size: 13px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Carousel — edge-to-edge, no side gap, native scroll + snap */
        .rwg-scroll {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          width: 100%;
        }

        .rwg-scroll::-webkit-scrollbar {
          display: none;
        }

        .rwg-card {
          flex: 0 0 16.666%;
          scroll-snap-align: start;
        }

        /* Larger, full-width, square-edged images */
        .rwg-image {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .rwg-card:hover .rwg-image {
          transform: scale(1.04);
        }

        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .rwg-card {
            flex: 0 0 25%;
          }
          .rwg-image {
            height: 220px;
          }
        }

        @media (max-width: 768px) {
          .rwg-card {
            flex: 0 0 33.333%;
          }
          .rwg-image {
            height: 190px;
          }
        }

        @media (max-width: 480px) {
          .rwg-card {
            flex: 0 0 50%;
          }
          .rwg-image {
            height: 160px;
          }
        }
      `}</style>
    </section>
  );
};

export default RecentWorkGallery;