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
function CartIcon() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" className="sm-nav__cart" aria-label="View cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.3" fill="currentColor" />
        <circle cx="17" cy="20" r="1.3" fill="currentColor" />
      </svg>
      {itemCount > 0 && <span className="sm-nav__cart-badge">{itemCount}</span>}
    </Link>
  );
}
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        <Link href="/" className="sm-nav__logo" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Sportz Mitraz"
            width={160}
            height={40}
            priority
            style={{ height: 34, width: "auto" }}
          />
        </Link>

        <nav className="sm-nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="sm-nav__link">
              {link.label}
            </a>
          ))}
          <div className="sm-nav__dropdown">
            <button type="button" className="sm-nav__link sm-nav__link--btn">
              Categories
            </button>
            <div className="sm-nav__dropdown-panel">
              {categories.map((c) => (
                <Link key={c.slug} href={`/products/${c.slug}`} className="sm-nav__dropdown-item">
                  <span aria-hidden>{c.emoji}</span> {c.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* <div className="sm-nav__cta">
          <a href="#contact" className="sm-btn sm-btn--pink">
            Get In Touch
          </a>
        </div> */}
<CartIcon />  
        <button
          type="button"
          className={`sm-nav__burger ${open ? "sm-nav__burger--open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`sm-nav__mobile ${open ? "sm-nav__mobile--open" : ""}`}>
        <nav className="sm-nav__mobile-links" aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="sm-nav__mobile-link" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <p className="sm-nav__mobile-heading">Shop by sport</p>
          <div className="sm-nav__mobile-grid">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="sm-nav__mobile-chip"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden>{c.emoji}</span> {c.name}
              </Link>
            ))}
          </div>
          <a href="#contact" className="sm-btn sm-btn--pink" onClick={() => setOpen(false)}>
            Get In Touch
          </a>
        </nav>
      </div>

      <style jsx>{`
      .sm-nav__cart {
  position: relative;
  display: flex;
  align-items: center;
  color: #101010;
}
.sm-nav__cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--sm-pink);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}
        .sm-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .sm-nav--scrolled {
          border-color: var(--sm-line);
          box-shadow: var(--sm-shadow-sm);
        }
        .sm-nav__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          height: 72px;
        }
        .sm-nav__logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .sm-nav__links {
          display: none;
          align-items: center;
          gap: 28px;
          margin-left: auto;
        }
        .sm-nav__link {
          font-weight: 600;
          font-size: 15px;
          color: #101010;
          padding: 8px 2px;
          position: relative;
          background: none;
          border: none;
        }
        .sm-nav__link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: var(--sm-pink);
          transition: width 0.2s ease;
        }
        .sm-nav__link:hover::after {
          width: 100%;
        }
        .sm-nav__dropdown {
          position: relative;
        }
        .sm-nav__dropdown-panel {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          background: var(--sm-white);
          border-radius: var(--sm-radius-md);
          box-shadow: var(--sm-shadow-md);
          padding: 10px;
          display: grid;
          gap: 2px;
          min-width: 180px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
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
          gap: 8px;
          padding: 9px 12px;
          border-radius: var(--sm-radius-sm);
          font-size: 14px;
          font-weight: 500;
        }
        .sm-nav__dropdown-item:hover {
          background: var(--sm-cream);
          color: var(--sm-pink);
        }
        .sm-nav__cta {
          display: none;
        }
        .sm-nav__burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          border-radius: 10px;
        }
        .sm-nav__burger span {
          height: 2.5px;
          width: 100%;
          background: var(--sm-ink);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }
        .sm-nav__burger--open span:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }
        .sm-nav__burger--open span:nth-child(2) {
          opacity: 0;
        }
        .sm-nav__burger--open span:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }
        .sm-nav__mobile {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: var(--sm-white);
          border-top: 1px solid var(--sm-line);
        }
        .sm-nav__mobile--open {
          max-height: 520px;
        }
        .sm-nav__mobile-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 24px 28px;
        }
        .sm-nav__mobile-link {
          font-weight: 600;
          font-size: 17px;
          padding: 10px 0;
          border-bottom: 1px solid var(--sm-line);
        }
        .sm-nav__mobile-heading {
          margin: 14px 0 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--sm-gray);
        }
        .sm-nav__mobile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 18px;
        }
        .sm-nav__mobile-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          background: var(--sm-cream);
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
        }

        @media (min-width: 900px) {
          .sm-nav__links {
            display: flex;
          }
          .sm-nav__cta {
            display: block;
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