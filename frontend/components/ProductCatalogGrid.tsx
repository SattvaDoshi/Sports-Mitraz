"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/driveImage";
import {
  Heart,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  List,
  Trophy,
  Paintbrush,
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

export const ProductCatalogGrid: React.FC<ProductCatalogGridProps> = ({
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
  heroHighlight = "Celebrate Every Achievement",
  heroDescription = "Premium quality trophies for tournaments, school events, corporate leagues and more. Customise with your logo, name and event details.",
  categories = DEFAULT_CATEGORIES,
  activeCategorySlug = "cricket-trophies",
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bgImageResolved = resolveImageSrc(heroImage);

  return (
    <div className="pcg-wrapper">
      {/* ---------- Header Navigation ---------- */}
      {/* <header className="pcg-header"> */}
        {/* <div className="pcg-header-container"> */}
          {/* <div className="pcg-logo-wrap">
            <Link href="/" className="pcg-logo">
              <span className="pcg-logo-icon">⚡</span>
              <span className="pcg-logo-text">
                Sportz<span className="pcg-logo-highlight">Mitra</span>
              </span>
            </Link>
          </div> */}

          {/* <nav className={`pcg-nav ${mobileMenuOpen ? "pcg-nav-mobile-open" : ""}`}>
            <Link href="/" className="pcg-nav-link">Home</Link>
            <Link href="/products" className="pcg-nav-link pcg-nav-active">Products</Link>
            <Link href="/customization" className="pcg-nav-link">Customization</Link>
            <Link href="/about" className="pcg-nav-link">About Us</Link>
            <Link href="/contact" className="pcg-nav-link">Contact</Link>
          </nav> */}

          {/* Search Bar */}
          {/* <div className="pcg-search-bar">
            <Search size={16} className="pcg-search-icon" />
            <input
              type="text"
              placeholder="Search for trophies, medals, jerseys, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pcg-search-input"
            />
          </div> */}

          {/* <div className="pcg-header-actions">
            <Link href="/account" className="pcg-action-item">
              <User size={18} />
              <span className="pcg-action-text">My Account</span>
            </Link>
            <Link href="/wishlist" className="pcg-action-item">
              <Heart size={18} />
              <span className="pcg-action-text">Wishlist</span>
            </Link>
            <Link href="/cart" className="pcg-action-item pcg-cart-item">
              <div className="pcg-cart-icon-wrap">
                <ShoppingBag size={18} />
                <span className="pcg-cart-badge">0</span>
              </div>
              <span className="pcg-action-text">Cart</span>
            </Link>
            <Link href="/quote" className="pcg-btn-quote">
              GET A QUOTE →
            </Link>
            <button
              className="pcg-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div> */}
        {/* </div> */}
      {/* </header> */}

      {/* ---------- Hero Banner ---------- */}
      <section
        className="pcg-hero"
        style={{ backgroundImage: `url("${bgImageResolved}")` }}
      >
        <span className="pcg-hero-confetti pcg-confetti-1" aria-hidden="true" />
        <span className="pcg-hero-confetti pcg-confetti-2" aria-hidden="true" />
        <span className="pcg-hero-confetti pcg-confetti-3" aria-hidden="true" />
        <span className="pcg-hero-script" aria-hidden="true">
          MORE
          <br />
          THAN A
          <br />
          GAME
        </span>

        <div className="pcg-hero-inner">
          <div className="pcg-breadcrumb">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={13} className="pcg-breadcrumb-sep" />}
                {b.href ? (
                  <Link href={b.href} className="pcg-breadcrumb-link">
                    {b.label}
                  </Link>
                ) : (
                  <span className="pcg-breadcrumb-current">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <h1 className="pcg-hero-title">{heroTitle}</h1>
          <p className="pcg-hero-subtitle">
            Celebrate <span className="pcg-pink-text">{heroHighlight}</span>
          </p>
          <p className="pcg-hero-desc">{heroDescription}</p>

          <div className="pcg-hero-features">
            <div className="pcg-hero-feature">
              <Trophy size={18} className="pcg-hero-feature-icon" />
              <span>Premium Quality</span>
            </div>
            <div className="pcg-hero-feature">
              <Paintbrush size={18} className="pcg-hero-feature-icon" />
              <span>Fully Customizable</span>
            </div>
            <div className="pcg-hero-feature">
              <Truck size={18} className="pcg-hero-feature-icon" />
              <span>Pan India Delivery</span>
            </div>
            <div className="pcg-hero-feature">
              <Star size={18} className="pcg-hero-feature-icon" />
              <span>Perfect for All Events</span>
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

          {/* Sidebar */}
          <aside className={`pcg-sidebar ${filtersOpen ? "pcg-sidebar-open" : ""}`}>
            <div className="pcg-filter-block">
              <div className="pcg-filter-head">
                <h3>Categories</h3>
                <ChevronDown size={16} />
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
                      {cat.slug === activeCategorySlug && <ChevronRight size={15} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="pcg-main">
            {sectionTitle && (
              <div className="pcg-section-title">
                <h2>{sectionTitle}</h2>
                {description && <p>{description}</p>}
              </div>
            )}

            <div className="pcg-toolbar">
              <span className="pcg-showing-count">
                Showing {items.length} products
              </span>

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
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    className={`pcg-view-btn ${
                      viewMode === "list" ? "pcg-view-btn-active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
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
                        <Heart size={16} />
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

            {/* Bottom Custom Strip */}
            <div className="pcg-quote-strip">
              <div className="pcg-quote-content">
                <h3>Need something more custom?</h3>
                <p>
                  Share a photo, rough sketch or reference design and we can
                  use it to understand your requirement.
                </p>
              </div>
              <Link className="pcg-btn pcg-btn-pink-solid" href="/contact">
                SHARE REQUIREMENT →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pcg-wrapper {
          width: 100%;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #ffffff;
        }

        /* HEADER */
        .pcg-header {
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .pcg-header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .pcg-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          font-size: 20px;
          font-weight: 800;
          color: #111827;
        }
        .pcg-logo-icon {
          color: #10b981;
        }
        .pcg-logo-highlight {
          color: #e11d48;
        }
        .pcg-nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .pcg-nav-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }
        .pcg-nav-active {
          color: #e11d48;
          border-bottom: 2px solid #e11d48;
          padding-bottom: 2px;
        }
        .pcg-search-bar {
          display: flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 20px;
          padding: 6px 14px;
          flex: 1;
          max-width: 320px;
        }
        .pcg-search-icon {
          color: #6b7280;
          margin-right: 8px;
        }
        .pcg-search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          width: 100%;
        }
        .pcg-header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .pcg-action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #374151;
          font-size: 11px;
        }
        .pcg-cart-item {
          position: relative;
        }
        .pcg-cart-icon-wrap {
          position: relative;
        }
        .pcg-cart-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #e11d48;
          color: white;
          border-radius: 50%;
          font-size: 10px;
          width: 15px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pcg-btn-quote {
          background: #e11d48;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
        .pcg-mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* HERO */
        .pcg-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          min-height: 320px;
        }
        .pcg-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.85) 40%,
            rgba(255, 255, 255, 0.2) 80%
          );
        }
        .pcg-pink-text {
          color: #e11d48;
        }
        .pcg-hero-script {
          position: absolute;
          right: 5%;
          bottom: 20%;
          z-index: 1;
          font-weight: 900;
          font-size: clamp(24px, 4vw, 42px);
          line-height: 1;
          color: #ffffff;
          text-align: right;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transform: rotate(-5deg);
        }
        .pcg-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 30px 20px;
        }
        .pcg-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 12px;
        }
        .pcg-breadcrumb-link { color: #6b7280; text-decoration: none; }
        .pcg-breadcrumb-current { color: #111827; font-weight: 700; }
        .pcg-hero-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          color: #111827;
          margin: 0;
        }
        .pcg-hero-subtitle {
          font-size: 18px;
          font-weight: 700;
          margin: 4px 0 12px;
        }
        .pcg-hero-desc {
          font-size: 13px;
          color: #4b5563;
          max-width: 480px;
          margin-bottom: 20px;
        }
        .pcg-hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .pcg-hero-feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
        }
        .pcg-hero-feature-icon {
          color: #e11d48;
        }

        /* SHOP LAYOUT */
        .pcg-shop {
          background: #f9fafb;
          padding: 30px 20px;
        }
        .pcg-shop-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
        }
        .pcg-filters-toggle {
          display: none;
          justify-content: space-between;
          width: 100%;
          background: #fff;
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
        }
        .pcg-sidebar {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 16px;
        }
        .pcg-filter-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .pcg-category-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pcg-category-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          color: #374151;
          text-decoration: none;
        }
        .pcg-category-active {
          background-color: #fce7ef;
          color: #e11d48;
          font-weight: 700;
        }

        /* TOOLBAR */
        .pcg-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .pcg-toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pcg-sort-select {
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 13px;
        }
        .pcg-view-toggle {
          display: flex;
          gap: 4px;
          background: #fce7ef;
          padding: 2px;
          border-radius: 6px;
        }
        .pcg-view-btn {
          border: none;
          background: transparent;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
        }
        .pcg-view-btn-active {
          background: #e11d48;
          color: #ffffff;
        }

        /* GRID */
        .pcg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .pcg-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .pcg-card-img-wrap {
          position: relative;
          background: #f3f4f6;
          padding-top: 80%;
        }
        .pcg-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 12px;
        }
        .pcg-wishlist-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .pcg-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .pcg-card-title {
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .pcg-price-tag {
          font-size: 12px;
          margin-bottom: 12px;
        }
        .pcg-price-amount {
          color: #e11d48;
          font-weight: 700;
        }
        .pcg-card-actions {
          display: flex;
          gap: 6px;
          margin-top: auto;
        }
        .pcg-btn {
          font-size: 11px;
          font-weight: 700;
          padding: 6px;
          border-radius: 4px;
          text-align: center;
          text-decoration: none;
          flex: 1;
        }
        .pcg-btn-lime { background: #d9f99d; color: #365314; }
        .pcg-btn-pink-outline { border: 1px solid #e11d48; color: #e11d48; }

        /* QUOTE STRIP */
        .pcg-quote-strip {
          margin-top: 30px;
          background: #111827;
          border-radius: 10px;
          padding: 20px;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pcg-quote-content h3 { margin: 0 0 4px; font-size: 16px; }
        .pcg-quote-content p { margin: 0; font-size: 12px; color: #9ca3af; }
        .pcg-btn-pink-solid {
          background: #e11d48;
          color: #fff;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 700;
          text-decoration: none;
          font-size: 12px;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .pcg-grid { grid-template-columns: repeat(3, 1fr); }
          .pcg-shop-container { grid-template-columns: 1fr; }
          .pcg-filters-toggle { display: flex; }
          .pcg-sidebar { display: none; }
          .pcg-sidebar-open { display: block; }
        }
        @media (max-width: 768px) {
          .pcg-grid { grid-template-columns: repeat(2, 1fr); }
          .pcg-nav, .pcg-search-bar, .pcg-action-text { display: none; }
          .pcg-mobile-menu-toggle { display: block; }
          .pcg-quote-strip { flex-direction: column; gap: 12px; text-align: center; }
          .pcg-nav-mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
          }
        }
        @media (max-width: 480px) {
          .pcg-grid { grid-template-columns: repeat(1, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default ProductCatalogGrid;