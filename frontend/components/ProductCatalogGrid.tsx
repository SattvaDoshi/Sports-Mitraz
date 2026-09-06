"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/driveImage";
import {
  Heart,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  List,
  Trophy,
  Percent,
  Truck,
  Star,
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

export interface CatalogItem {
  id?: string;
  slug?: string;
  categorySlug?: string;
  title: string;
  img: string;
  desc?: string;
  tags?: string[];
  price?: number;
  priceType?: "starting" | "fixed";
  averageRating?: number;
  totalRatings?: number;
}

export interface CatalogCategory {
  name: string;
  slug: string;
  count: number;
}

interface ProductCatalogGridProps {
  sectionTitle?: string;
  description?: string;
  items?: CatalogItem[];
  categorySlug?: string;
  heroImage?: string;
  breadcrumbs?: { label: string; href?: string }[];
  heroTitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
  categories?: CatalogCategory[];
  activeCategorySlug?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const DEFAULT_CATEGORIES: CatalogCategory[] = [
  { name: "All Trophies", slug: "all-trophies", count: 120 },
  { name: "Cricket Trophies", slug: "cricket-trophies", count: 24 },
  { name: "Football Trophies", slug: "football-trophies", count: 18 },
  { name: "Basketball Trophies", slug: "basketball-trophies", count: 12 },
  { name: "Tennis Trophies", slug: "tennis-trophies", count: 10 },
  { name: "Athletics Trophies", slug: "athletics-trophies", count: 8 },
  { name: "Corporate Awards", slug: "corporate-awards", count: 16 },
  { name: "Medals", slug: "medals", count: 40 },
  { name: "Custom Trophies", slug: "custom-trophies", count: 22 },
];

const DEFAULT_ITEMS: CatalogItem[] = [
  { title: "Classic Champion Trophy", price: 250, img: "/hero-slide-1.jpg" },
  { title: "Star Performer Trophy", price: 300, img: "/hero-slide-2.jpg" },
  { title: "Cricket Batsman Trophy", price: 350, img: "/hero-slide-3.jpg" },
  { title: "Rising Star Trophy", price: 280, img: "/hero-slide-4.jpg" },
  { title: "Victory Trophy", price: 400, img: "/hero-slide-5.jpg" },
  { title: "Golden Globe Trophy", price: 320, img: "/hero-slide-1.jpg" },
  { title: "Flame Trophy", price: 380, img: "/hero-slide-2.jpg" },
  { title: "Elite Cup Trophy", price: 450, img: "/hero-slide-3.jpg" },
];

const resolveImageSrc = (src?: string) => {
  if (!src) return "/ProductCatalog-bg.png";
  if (src.includes("drive.google.com")) {
    return getDirectImageUrl(src);
  }
  if (
    src.startsWith("http") ||
    src.startsWith("/") ||
    src.startsWith("./") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  return `/${src}`;
};

export const ProductCatalogGrid: React.FC<ProductCatalogGridProps> = (props) => {
  const {
    sectionTitle,
    description,
    items = DEFAULT_ITEMS,
    categorySlug,
    heroImage = "/ProductCatalog-bg.png",
    breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Trophies" },
    ],
    heroTitle = "Trophies",
    heroHighlight = "Every Achievement",
    heroDescription = "Premium quality trophies for tournaments, school events, corporate leagues and more. Customise with your logo, name and event details.",
    categories = DEFAULT_CATEGORIES,
    activeCategorySlug = "cricket-trophies",
    onSearchChange,
  } = props;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [uncontrolledSearchQuery, setUncontrolledSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchQuery = onSearchChange ? props.searchQuery ?? "" : uncontrolledSearchQuery;
  const setSearchQuery = onSearchChange ?? setUncontrolledSearchQuery;

  const bgImageResolved = resolveImageSrc(heroImage);

  return (
    <div className="pcg-wrapper">
      {/* ---------- Header Navigation ---------- */}
      <header className="pcg-header">
        {/* Navigation Content */}
      </header>

      {/* ---------- Hero Banner ---------- */}
      <section
        className="pcg-hero"
        style={{ backgroundImage: `url("${bgImageResolved}")` }}
      >
        <span className="pcg-hero-script" aria-hidden="true">
          MORE
          <br />
          THAN A
          <br />
          GAME
        </span>

        <div className="pcg-hero-inner">
          {/* <div className="pcg-breadcrumb">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="pcg-breadcrumb-sep">/</span>}
                {b.href ? (
                  <Link href={b.href} className="pcg-breadcrumb-link">
                    {b.label}
                  </Link>
                ) : (
                  <span className="pcg-breadcrumb-current">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div> */}

          <h1 className="pcg-hero-title">{heroTitle}</h1>
          <p className="pcg-hero-subtitle">
            Celebrate <span className="pcg-pink-text">{heroHighlight}</span>
          </p>
          <p className="pcg-hero-desc">{heroDescription}</p>

          <div className="pcg-hero-features">
            <div className="pcg-hero-feature">
              <div className="pcg-feature-icon-box">
                <Trophy size={16} />
              </div>
              <div>
                <span className="pcg-feature-title">Premium</span>
                <span className="pcg-feature-sub">Quality</span>
              </div>
            </div>
            <div className="pcg-hero-feature">
              <div className="pcg-feature-icon-box">
                <Percent size={16} />
              </div>
              <div>
                <span className="pcg-feature-title">Fully</span>
                <span className="pcg-feature-sub">Customizable</span>
              </div>
            </div>
            <div className="pcg-hero-feature">
              <div className="pcg-feature-icon-box">
                <Truck size={16} />
              </div>
              <div>
                <span className="pcg-feature-title">Pan India</span>
                <span className="pcg-feature-sub">Delivery</span>
              </div>
            </div>
            <div className="pcg-hero-feature">
              <div className="pcg-feature-icon-box">
                <Star size={16} />
              </div>
              <div>
                <span className="pcg-feature-title">Perfect for</span>
                <span className="pcg-feature-sub">All Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Shop Section ---------- */}
      <section className="pcg-shop">
        <div className="pcg-shop-container">
          <button
            type="button"
            className="pcg-filters-toggle"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            <span>Categories</span>
            <ChevronDown
              size={16}
              style={{
                transform: filtersOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.15s ease",
              }}
            />
          </button>

          {/* Search Bar positioned below category toggle for mobile, top of main content for desktop */}
          <div className="pcg-content-search-bar">
            <Search size={16} className="pcg-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pcg-search-input"
            />
          </div>

          <aside className={`pcg-sidebar ${filtersOpen ? "pcg-sidebar-open" : ""}`}>
            <div className="pcg-filter-block">
              <div className="pcg-filter-head">
                <h3>Categories</h3>
                <ChevronUp size={16} className="pcg-head-chevron" />
              </div>
              <ul className="pcg-category-list">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/products/${cat.slug}`}
                      className={`pcg-category-item ${
                        cat.slug === activeCategorySlug ? "pcg-category-active" : ""
                      }`}
                    >
                      <span>
                        {cat.name} ({cat.count})
                      </span>
                      {cat.slug === activeCategorySlug && <ChevronRight size={14} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="pcg-main">
            {sectionTitle && (
              <div className="pcg-section-title">
                <h2>{sectionTitle}</h2>
                {description && <p>{description}</p>}
              </div>
            )}

            <div className="pcg-toolbar">
              {/* <span className="pcg-showing-count">
                Showing {items.length} products
              </span> */}

              <div className="pcg-toolbar-right">
                <div className="pcg-sort-wrap">
                  <span className="pcg-sort-label">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pcg-sort-select"
                  >
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>

                <div className="pcg-view-toggle">
                  <button
                    className={`pcg-view-btn ${
                      viewMode === "grid" ? "pcg-view-btn-active" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    className={`pcg-view-btn ${
                      viewMode === "list" ? "pcg-view-btn-active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`pcg-grid ${
                viewMode === "list" ? "pcg-grid-list" : ""
              }`}
            >
              {items.map((item, idx) => {
                const productSlug =
                  item.slug ||
                  item.id ||
                  item.title.toLowerCase().replace(/\s+/g, "-");
                const activeCategorySlugForItem = item.categorySlug || categorySlug;
                const price = item.price || 250;
                const detailUrl = activeCategorySlugForItem
                  ? `/products/${activeCategorySlugForItem}/${productSlug}`
                  : `/products/details?item=${productSlug}`;

                return (
                  <article className="pcg-card" key={idx}>
                    <div className="pcg-card-img-wrap">
                      <button
                        className="pcg-wishlist-btn"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={14} />
                      </button>
                      <img
                        src={resolveImageSrc(item.img)}
                        alt={item.title}
                        className="pcg-card-img"
                      />
                    </div>

                    <div className="pcg-card-body">
                      <h3 className="pcg-card-title">{item.title}</h3>

                      <div className="pcg-price-tag">
                        <span className="pcg-price-label">
                          {item.priceType === "fixed" ? "" : "From "}
                        </span>
                        <span className="pcg-price-amount">₹{price}</span>
                      </div>

                      <div className="pcg-card-actions">
                        <Link href={detailUrl} className="pcg-btn pcg-btn-lime">
                          View Details
                        </Link>
                        <Link href="/contact" className="pcg-btn pcg-btn-pink-outline">
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="pcg-quote-strip">
              <div className="pcg-quote-content">
                <h3>Need something more custom?</h3>
                <p>
                  Share a photo, rough sketch or reference design and we can
                  use it to understand your requirement.
                </p>
              </div>
              <Link className="pcg-btn pcg-btn-pink-solid" href="/contact">
                SHARE REQUIREMENT &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pcg-wrapper {
          width: 100%;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #ffffff;
          color: #111827;
        }

        /* HEADER */
        .pcg-header {
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        /* HERO */
        .pcg-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          min-height: 300px;
        }
        .pcg-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.85) 42%,
            rgba(255, 255, 255, 0.08) 82%
          );
        }
        .pcg-pink-text {
          color: #ed0f63;
        }
        .pcg-hero-script {
          position: absolute;
          right: 5%;
          bottom: 16%;
          z-index: 1;
          font-weight: 900;
          font-size: clamp(24px, 3.4vw, 36px);
          line-height: 1;
          color: #ffffff;
          text-align: right;
          text-shadow: 0 2px 6px rgba(0,0,0,0.4);
          transform: rotate(-6deg);
          font-style: italic;
        }
        .pcg-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px 40px;
        }
        .pcg-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .pcg-breadcrumb-sep {
          color: #d1d5db;
        }
        .pcg-breadcrumb-link {
          color: #9ca3af;
          text-decoration: none;
        }
        .pcg-breadcrumb-current {
          color: #111827;
          font-weight: 700;
        }
        .pcg-hero-title {
          font-size: clamp(32px, 4.2vw, 44px);
          font-weight: 900;
          color: #111827;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .pcg-hero-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 6px 0 10px;
        }
        .pcg-hero-desc {
          font-size: 13.5px;
          color: #6b7280;
          max-width: 460px;
          line-height: 1.6;
          margin-bottom: 26px;
        }
        .pcg-hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 26px;
        }
        .pcg-hero-feature {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pcg-feature-icon-box {
          color: #ed0f63;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pcg-feature-title,
        .pcg-feature-sub {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #111827;
          line-height: 1.15;
        }

        /* SHOP LAYOUT */
        .pcg-shop {
          background: #f8fafc;
          padding: 28px 24px;
        }
        .pcg-shop-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          align-items: start;
        }
        .pcg-filters-toggle {
          display: none;
          justify-content: space-between;
          width: 100%;
          background: #fff;
          border: 1px solid #e5e7eb;
          padding: 10px 14px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        /* INLINE CONTENT SEARCH BAR */
        .pcg-content-search-bar {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 14px;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 16px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .pcg-search-icon {
          color: #9ca3af;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .pcg-search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: #374151;
          width: 100%;
        }
        .pcg-search-input::placeholder {
          color: #9ca3af;
        }

        .pcg-sidebar {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
          padding: 18px;
          height: fit-content;
        }
        .pcg-filter-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .pcg-filter-head h3 {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        .pcg-head-chevron {
          color: #6b7280;
        }
        .pcg-category-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pcg-category-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 9px 10px;
          border-radius: 7px;
          background: #ffffff;
          color: #4b5563;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.2;
          text-decoration: none;
          border: 1px solid transparent;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .pcg-category-item:hover {
          background: #fff1f5;
          color: #ed0f63;
          border-color: #fbcfe0;
        }
        .pcg-category-item.pcg-category-active {
          background: #fce7ef !important;
          color: #ed0f63 !important;
          border-color: #f8c4d8 !important;
          font-weight: 700 !important;
        }

        /* TOOLBAR */
        .pcg-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .pcg-showing-count {
          font-size: 13.5px;
          font-weight: 600;
          color: #6b7280;
        }
        .pcg-toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pcg-sort-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 6px 12px;
        }
        .pcg-sort-label {
          font-size: 12.5px;
          color: #6b7280;
        }
        .pcg-sort-select {
          border: none;
          background: transparent;
          font-size: 12.5px;
          font-weight: 700;
          color: #111827;
          outline: none;
          cursor: pointer;
        }
        .pcg-view-toggle {
          display: flex;
          gap: 2px;
          background: #fce7ef;
          padding: 3px;
          border-radius: 6px;
        }
        .pcg-view-btn {
          border: none;
          background: transparent;
          padding: 7px;
          border-radius: 4px;
          cursor: pointer;
          color: #ed0f63;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pcg-view-btn-active {
          background: #ed0f63;
          color: #ffffff;
        }

        /* GRID & CARDS */
        .pcg-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }
        .pcg-grid-list {
          grid-template-columns: 1fr;
        }
        .pcg-card {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .pcg-card-img-wrap {
          position: relative;
          background: #f3f1ed;
          padding-top: 80%;
        }
        .pcg-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 10px;
        }
        .pcg-wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ffffff;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #111827;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          z-index: 2;
        }
        .pcg-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .pcg-card-title {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px;
        }
        .pcg-price-tag {
          font-size: 13px;
          margin-bottom: 14px;
        }
        .pcg-price-label {
          color: #6b7280;
        }
        .pcg-price-amount {
          color: #ed0f63;
          font-weight: 800;
        }
        .pcg-card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
          width: 100%;
        }
        .pcg-card-actions .pcg-btn {
          display: flex !important;
          align-items: center;
          justify-content: center;
          flex: 1 1 0 !important;
          width: 50%;
          min-height: 34px;
          padding: 9px 6px !important;
          box-sizing: border-box;
          border-radius: 6px !important;
          font-family: inherit;
          font-size: 12px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          text-align: center;
          text-decoration: none !important;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pcg-card-actions a.pcg-btn-lime {
          background-color: #ecfccb !important;
          border: 1px solid #d9f99d !important;
          color: #3f6212 !important;
        }
        .pcg-card-actions a.pcg-btn-lime:hover {
          background-color: #d9f99d !important;
          border-color: #bef264 !important;
          color: #365314 !important;
        }
        .pcg-card-actions a.pcg-btn-pink-outline {
          background-color: #ffffff !important;
          border: 1px solid #ed0f63 !important;
          color: #ed0f63 !important;
        }
        .pcg-card-actions a.pcg-btn-pink-outline:hover {
          background-color: #fff1f5 !important;
          border-color: #d90c58 !important;
          color: #d90c58 !important;
        }

        /* QUOTE STRIP */
        .pcg-quote-strip {
          margin-top: 36px;
          background: #111827;
          border-radius: 12px;
          padding: 26px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pcg-quote-content h3 {
          margin: 0 0 4px;
          font-size: 17px;
          font-weight: 800;
        }
        .pcg-quote-content p {
          margin: 0;
          font-size: 13px;
          color: #9ca3af;
        }
        .pcg-btn-pink-solid {
          background: #ed0f63;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 6px;
          font-weight: 800;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
        .pcg-btn-pink-solid:hover {
          background: #d90c58;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (min-width: 1025px) {
          .pcg-content-search-bar {
            grid-column: 2;
            margin-bottom: 0;
          }
        }
        @media (max-width: 1024px) {
          .pcg-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .pcg-shop-container {
            grid-template-columns: 1fr;
          }
          .pcg-filters-toggle {
            display: flex;
          }
          .pcg-sidebar {
            display: none;
          }
          .pcg-sidebar-open {
            display: block;
          }
        }
        @media (max-width: 768px) {
          .pcg-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .pcg-mobile-menu-toggle {
            display: block;
          }
          .pcg-quote-strip {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          .pcg-nav-mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #ffffff;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
          }
        }
        @media (max-width: 480px) {
          .pcg-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCatalogGrid;