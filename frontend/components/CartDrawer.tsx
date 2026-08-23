"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background page scrolling (horizontal & vertical) when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen || !mounted) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      setIsCartOpen(false);
      router.push("/checkout");
    } else {
      setShowAuthModal(true);
    }
  };

  const drawerContent = (
    <div className="cd-root">
      {/* Backdrop */}
      <div className="cd-backdrop" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <aside className="cd-drawer" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="cd-header">
          <h2 className="cd-heading">Your Cart ({cart.length})</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="cd-close-btn"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="cd-items">
          {cart.length === 0 ? (
            <p className="cd-empty">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cd-item">
                <img src={item.img} alt={item.title} className="cd-item-img" />
                <div className="cd-item-info">
                  <h4 className="cd-item-title">{item.title}</h4>
                  <p className="cd-item-price">₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cd-remove-btn"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Fixed Footer */}
        <div className="cd-footer">
          <div className="cd-total-row">
            <span>Total:</span>
            <span className="cd-total-amount">₹{total}</span>
          </div>

          <Link
            href="/products"
            onClick={() => setIsCartOpen(false)}
            className="btn btn-lime cd-footer-btn"
          >
            🛍️ SHOP MORE PRODUCTS
          </Link>

          <button
            onClick={handleCheckout}
            className="btn btn-pink cd-footer-btn"
          >
            PROCEED TO CHECKOUT →
          </button>
        </div>
      </aside>

      <style jsx global>{`
        /* Prevent layout shift globally while open */
        html, body {
          max-width: 100vw;
          overflow-x: hidden !important;
        }
      `}</style>

      <style jsx>{`
        /* Reset box model strictly inside the portal root */
        .cd-root,
        .cd-root * {
          box-sizing: border-box !important;
          margin: 0;
        }

        /* ---------- Backdrop ---------- */
        .cd-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 99998;
          animation: cd-fade-in 0.25s ease-out;
        }

        @keyframes cd-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* ---------- Drawer Container ---------- */
        .cd-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85vw;
          max-width: 320px;
          height: 100vh;
          height: 100dvh; /* Dynamic viewport units for mobile address bar */
          background-color: #fff;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.25);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          padding: 16px;
          padding-top: max(16px, env(safe-area-inset-top));
          padding-bottom: max(16px, env(safe-area-inset-bottom));
          overflow: hidden;
          animation: cd-slide-in 0.25s ease-out;
        }

        @keyframes cd-slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        /* ---------- Header (Fixed Top) ---------- */
        .cd-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 12px;
          background-color: #fff;
          flex-shrink: 0;
        }

        .cd-heading {
          font-size: 1.05rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #111;
        }

        .cd-close-btn {
          background-color: #f5f5f5;
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          min-width: 34px;
          font-size: 1rem;
          line-height: 1;
          cursor: pointer;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cd-close-btn:hover {
          background-color: #e91e63;
          color: #fff;
        }

        /* ---------- Scrollable Items Area ---------- */
        .cd-items {
          flex: 1;
          padding: 12px 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .cd-empty {
          text-align: center;
          color: #888;
          margin-top: 40px;
          font-size: 0.9rem;
        }

        .cd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        .cd-item-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .cd-item-info {
          flex: 1;
          min-width: 0;
        }

        .cd-item-title {
          font-size: 0.85rem;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #222;
        }

        .cd-item-price {
          color: #e91e63;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .cd-remove-btn {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          flex-shrink: 0;
          padding: 4px;
          font-size: 1rem;
        }

        /* ---------- Footer (Fixed Bottom) ---------- */
        .cd-footer {
          border-top: 1px solid #eee;
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: #fff;
          flex-shrink: 0;
        }

        .cd-total-row {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 0.95rem;
          color: #111;
        }

        .cd-total-amount {
          color: #e91e63;
        }

        .cd-footer-btn {
          display: block;
          text-align: center;
          text-decoration: none;
          width: 100%;
          padding: 10px 0;
          font-size: 0.85rem;
          border-radius: 6px;
          font-weight: 600;
        }

        /* Tablet Breakpoint */
        @media (min-width: 640px) {
          .cd-drawer {
            width: 360px;
            max-width: 360px;
            padding: 18px;
          }

          .cd-heading {
            font-size: 1.2rem;
          }

          .cd-footer-btn {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );

  // Render outside of normal DOM tree using createPortal
  return createPortal(drawerContent, document.body);
};