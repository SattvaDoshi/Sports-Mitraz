"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background page scrolling when cart is open
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

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity, 
    0
  );

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      setIsCartOpen(false);
      // Defer routing to allow state updates to settle outside the render phase
      setTimeout(() => {
        router.push("/checkout");
      }, 0);
    } else {
      setIsCartOpen(false);
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
                
                <div className="cd-item-details">
                  <div className="cd-item-top">
                    <div>
                      <h4 className="cd-item-title">{item.title}</h4>
                      <p className="cd-item-price">₹{(Number(item.price) || 0).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cd-remove-btn"
                      aria-label="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="cd-quantity-control">
                    <button 
                      onClick={() => updateQuantity && updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="cd-qty-btn"
                    >
                      −
                    </button>
                    <span className="cd-qty-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                      className="cd-qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Fixed Footer with Summary */}
        <div className="cd-footer">
          <div className="cd-summary">
            <h3 className="cd-summary-title">Order Summary</h3>
            <div className="cd-summary-row">
              <span className="cd-summary-label">Subtotal</span>
              <span className="cd-summary-value">₹{total.toFixed(2)}</span>
            </div>
            <div className="cd-summary-row cd-total-row">
              <span className="cd-total-label">Total</span>
              <span className="cd-total-amount">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/products"
            onClick={() => setIsCartOpen(false)}
            className="cd-btn cd-btn-lime"
          >
            🛍️ SHOP MORE PRODUCTS
          </Link>

          <button
            onClick={handleCheckout}
            className="cd-btn cd-btn-pink"
          >
            PROCEED TO CHECKOUT →
          </button>
        </div>
      </aside>

      <style jsx global>{`
        html, body {
          max-width: 100vw;
          overflow-x: hidden !important;
        }
      `}</style>

      <style jsx>{`
        .cd-root,
        .cd-root * {
          box-sizing: border-box !important;
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
          background: rgba(0, 0, 0, 0.4);
          z-index: 99998;
          animation: cd-fade-in 0.25s ease-out;
        }

        @keyframes cd-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ---------- Mobile Bottom Sheet (Slide Up) ---------- */
        .cd-drawer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-height: 85vh;
          max-height: 85dvh;
          background-color: #fff;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 0 -4px 25px rgba(0, 0, 0, 0.15);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          padding: 20px 20px max(20px, env(safe-area-inset-bottom)) 20px;
          overflow: hidden;
          animation: cd-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cd-slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        /* ---------- Desktop/Tablet Side Drawer (Slide Right) ---------- */
        @media (min-width: 640px) {
          .cd-drawer {
            top: 0;
            right: 0;
            left: auto;
            bottom: 0;
            width: 380px;
            max-width: 380px;
            max-height: 100vh;
            max-height: 100dvh;
            border-radius: 0;
            padding: 24px;
            animation: cd-slide-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes cd-slide-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        }

        /* ---------- Header ---------- */
        .cd-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          flex-shrink: 0;
        }

        .cd-heading {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }

        .cd-close-btn {
          background-color: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 0.85rem;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ---------- Items Area ---------- */
        .cd-items {
          flex: 1;
          padding: 8px 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .cd-empty {
          text-align: center;
          color: #94a3b8;
          margin-top: 30px;
          font-size: 0.95rem;
        }

        .cd-item {
          display: flex;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .cd-item-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 10px;
          background-color: #f8fafc;
          flex-shrink: 0;
        }

        .cd-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cd-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .cd-item-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .cd-item-price {
          color: #ff007a;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .cd-remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px;
        }

        /* Quantity Counter */
        .cd-quantity-control {
          display: inline-flex;
          align-items: center;
          background-color: #f8fafc;
          border-radius: 20px;
          padding: 2px 6px;
          width: fit-content;
          gap: 12px;
          margin-top: 6px;
        }

        .cd-qty-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          padding: 2px 6px;
        }

        .cd-qty-value {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
        }

        /* ---------- Footer & Summary ---------- */
        .cd-footer {
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }

        .cd-summary {
          margin-bottom: 6px;
        }

        .cd-summary-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .cd-summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .cd-summary-label, .cd-summary-value {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .cd-total-row {
          margin-top: 10px;
          margin-bottom: 0;
        }

        .cd-total-label {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
        }

        .cd-total-amount {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ff007a;
        }

        /* Buttons */
        .cd-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px 0;
          font-size: 0.85rem;
          border-radius: 10px;
          font-weight: 800;
          letter-spacing: 0.3px;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .cd-btn-lime {
          background-color: #a3e635;
          color: #000;
        }

        .cd-btn-pink {
          background-color: #ff007a;
          color: #fff;
        }
      `}</style>
    </div>
  );

  return createPortal(drawerContent, document.body);
};