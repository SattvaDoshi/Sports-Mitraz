"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const { cart, setIsCartOpen } = useCart();

  // Total quantity of items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <div className="container nav">
        <Link href="/">
          <img className="logo" src="/sportzmitra-logo.png" alt="SportzMitra Store" />
        </Link>

        <nav className="navlinks">
          <Link href="/">HOME</Link>
          <Link href="/products">PRODUCTS ⌄</Link>
          <Link href="/event-planning">SPORTS EVENT PLANNING</Link>
          <Link href="/contact">CONTACT US</Link>
        </nav>

        <div className="top-actions" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              fontSize: "1.4rem",
              padding: "5px",
            }}
            aria-label="View Cart"
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-6px",
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  minWidth: "18px",
                  textAlign: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <Link className="btn btn-pink" href="/contact">
            GET A QUOTE →
          </Link>

          <div className="phone">
            <span className="phone-icon">◉</span> +91 98765 43210
          </div>
        </div>
      </div>
    </header>
  );
};