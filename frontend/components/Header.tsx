"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Brand Logo */}
        <Link href="/" className="site-logo">
          <img
            src="/sportzmitra-logo.png"
            alt="Sportz Mitra"
            className="site-logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`site-nav ${isMobileMenuOpen ? "is-open" : ""}`}
        >
          <Link href="/" className="is-active">
            HOME
          </Link>
          {/* <Link href="/about">
            ABOUT US
          </Link> */}
          <Link href="/products">
            PRODUCTS & SERVICES <span style={{ fontSize: "9px" }}>▼</span>
          </Link>
          <Link href="/event-planning">
            SPORTS EVENT PLANNING
          </Link>
          {/* <Link href="/blog">
            BLOG
          </Link> */}
          <Link href="/contact">
            CONTACT US
          </Link>
        </nav>

        {/* Actions (Search & Cart) */}
        <div className="site-actions">
          {/* Search Icon */}
          <button
            aria-label="Search"
            className="header-icon-button"
          >
            <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="header-cart"
          >
            <svg style={{ width: "24px", height: "24px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span className="cart-count">
              {cartCount}
            </span>
          </Link>
        </div>
        <button className="site-menu-toggle" aria-label="Toggle menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};