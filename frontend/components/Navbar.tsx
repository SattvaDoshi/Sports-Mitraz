"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sm-nav ${scrolled ? "sm-nav--scrolled" : ""}`}>
      <div className="sm-container sm-nav__row">
        {/* Brand Logo */}
        <Link href="/" className="sm-nav__logo" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Sportz Mitraz"
            width={160}
            height={40}
            priority
            style={{ height: "36px", width: "auto" }}
          />
        </Link>

        {/* Desktop & Tablet Navigation */}
        <nav className="sm-nav__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="sm-nav__link">
              {link.label}
            </a>
          ))}

          <div className="sm-nav__dropdown">
            <button type="button" className="sm-nav__link sm-nav__dropdown-btn">
              <span>Categories</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="sm-nav__dropdown-panel">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="sm-nav__dropdown-item"
                >
                  {/* <span className="sm-nav__emoji" aria-hidden="true">
                    {c.emoji}
                  </span> */}
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Action Controls */}
        <div className="sm-nav__actions">
          <Link href="/cart" className="sm-nav__cart" aria-label="View shopping cart">
            <div className="sm-nav__cart-icon-wrapper">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="sm-nav__cart-badge">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </div>
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            className={`sm-nav__burger ${open ? "sm-nav__burger--open" : ""}`}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sm-nav__burger-bar" />
            <span className="sm-nav__burger-bar" />
            <span className="sm-nav__burger-bar" />
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      <div className={`sm-nav__mobile ${open ? "sm-nav__mobile--open" : ""}`}>
        <nav className="sm-nav__mobile-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="sm-nav__mobile-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="sm-nav__mobile-section">
            <p className="sm-nav__mobile-heading">Shop by Sport</p>
            <div className="sm-nav__mobile-grid">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="sm-nav__mobile-chip"
                  onClick={() => setOpen(false)}
                >
                  {/* <span aria-hidden="true">{c.emoji}</span> */}
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            className="sm-btn sm-btn--pink sm-nav__mobile-cta"
            onClick={() => setOpen(false)}
          >
            Get In Touch
          </a>
        </nav>
      </div>

      <style jsx>{`
        /* --- General Navigation Reset & Typography --- */
        .sm-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sm-nav--scrolled {
          background: #ffffff;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.08);
          border-bottom-color: transparent;
        }

        .sm-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .sm-nav__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .sm-nav__logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        /* --- Global Anchor Underline Removal --- */
        .sm-nav a,
        .sm-nav a:visited,
        .sm-nav a:hover,
        .sm-nav a:active {
          text-decoration: none !important;
        }

        /* --- Desktop & Tablet Navigation Links --- */
        .sm-nav__links {
          display: none;
          align-items: center;
          gap: 32px;
        }

        .sm-nav__link {
          font-weight: 700;
          font-size: 15px;
          color: #0f172a !important;
          padding: 6px 0;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .sm-nav__link:hover {
          color: var(--sm-pink, #e11d48) !important;
        }

        .sm-nav__link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 2.5px;
          width: 0;
          background: var(--sm-pink, #e11d48);
          border-radius: 99px;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sm-nav__link:hover::after {
          width: 100%;
        }

        /* Dropdown styling */
        .sm-nav__dropdown {
          position: relative;
        }

        .sm-nav__dropdown-btn::after {
          display: none;
        }

        .sm-nav__dropdown-panel {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.1);
          padding: 8px;
          display: grid;
          gap: 2px;
          min-width: 210px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sm-nav__dropdown:hover .sm-nav__dropdown-panel,
        .sm-nav__dropdown:focus-within .sm-nav__dropdown-panel {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .sm-nav__dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #334155 !important;
          transition: all 0.15s ease;
        }

        .sm-nav__dropdown-item:hover {
          background: #f8fafc;
          color: var(--sm-pink, #e11d48) !important;
          transform: translateX(3px);
        }

        /* --- Actions (Cart & Mobile Toggle) --- */
        .sm-nav__actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Cart Icon */
        .sm-nav__cart {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 12px;
          color: #0f172a !important;
          text-decoration: none !important;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .sm-nav__cart:hover {
          background-color: #f1f5f9;
          color: var(--sm-pink, #e11d48) !important;
        }

        .sm-nav__cart-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sm-nav__cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background: var(--sm-pink, #e11d48);
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          box-shadow: 0 2px 6px rgba(225, 29, 72, 0.4);
          border: 2px solid #ffffff;
          text-decoration: none !important;
          line-height: 1;
          pointer-events: none;
        }

        /* Hamburger Button */
        .sm-nav__burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          border: none;
          background: #f8fafc;
          border-radius: 12px;
          cursor: pointer;
          padding: 0;
          transition: background-color 0.2s ease;
        }

        .sm-nav__burger:hover {
          background-color: #f1f5f9;
        }

        .sm-nav__burger-bar {
          height: 2.5px;
          width: 20px;
          background: #0f172a;
          border-radius: 4px;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
        }

        .sm-nav__burger--open .sm-nav__burger-bar:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }

        .sm-nav__burger--open .sm-nav__burger-bar:nth-child(2) {
          opacity: 0;
        }

        .sm-nav__burger--open .sm-nav__burger-bar:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        /* --- Mobile Navigation Drawer --- */
        .sm-nav__mobile {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .sm-nav__mobile--open {
          max-height: 80vh;
          overflow-y: auto;
        }

        .sm-nav__mobile-links {
          display: flex;
          flex-direction: column;
          padding: 20px 20px 32px;
        }

        .sm-nav__mobile-link {
          font-weight: 700;
          font-size: 18px;
          color: #0f172a !important;
          padding: 14px 0;
          border-bottom: 1px solid #f1f5f9;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }

        .sm-nav__mobile-link:hover {
          color: var(--sm-pink, #e11d48) !important;
        }

        .sm-nav__mobile-section {
          margin-top: 20px;
        }

        .sm-nav__mobile-heading {
          margin: 0 0 12px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
        }

        .sm-nav__mobile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 24px;
        }

        .sm-nav__mobile-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b !important;
          text-decoration: none !important;
          transition: all 0.2s ease;
        }

        .sm-nav__mobile-chip:hover,
        .sm-nav__mobile-chip:active {
          background: #fff1f2;
          border-color: #fecdd3;
          color: var(--sm-pink, #e11d48) !important;
        }

        .sm-nav__mobile-cta {
          margin-top: 8px;
          text-align: center;
          display: block;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none !important;
        }

        /* --- Responsive Breakpoints --- */

        /* Small Tablet & Up */
        @media (min-width: 640px) {
          .sm-nav__mobile-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Laptop / Desktop View (>= 768px/900px) */
        @media (min-width: 900px) {
          .sm-container {
            padding: 0 32px;
          }

          .sm-nav__links {
            display: flex;
          }

          .sm-nav__burger {
            display: none;
          }

          .sm-nav__mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}