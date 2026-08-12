"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartToast() {
  const { toast, itemCount, dismissToast } = useCart();

  return (
    <div
      className={`cart-toast ${toast.visible ? "cart-toast--show" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="cart-toast__inner">
        {/* Soft Ambient Aura Glow */}
        <div className="cart-toast__glow" aria-hidden="true" />

        {/* Emerald Success Icon Badge */}
        <div className="cart-toast__icon-wrapper">
          <div className="cart-toast__icon-ping" />
          <div className="cart-toast__icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Message Text */}
        <div className="cart-toast__content">
          <p className="cart-toast__msg">{toast.message}</p>
        </div>

        {/* Actions */}
        <div className="cart-toast__actions">
          <Link href="/cart" className="cart-toast__link" onClick={dismissToast}>
            <span>View Cart</span>
            {itemCount > 0 && (
              <span className="cart-toast__badge">{itemCount}</span>
            )}
            <svg
              className="cart-toast__arrow"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <button
            className="cart-toast__close"
            onClick={dismissToast}
            aria-label="Dismiss notification"
          >
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* --- Position & Floating Animation --- */
        .cart-toast {
          position: fixed;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%) translateY(20px) scale(0.96);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.25s ease,
            visibility 0.25s step-end;
          z-index: 99999;
          max-width: calc(100vw - 32px);
          width: max-content;
        }

        .cart-toast--show {
          transform: translateX(-50%) translateY(0) scale(1);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.25s ease,
            visibility 0s;
        }

        /* --- Ambient Light Accent Glow --- */
        .cart-toast__glow {
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 20% 50%,
            rgba(16, 185, 129, 0.18),
            rgba(99, 102, 241, 0.08) 70%,
            transparent 100%
          );
          filter: blur(14px);
          opacity: 0.8;
          z-index: -1;
          pointer-events: none;
        }

        /* --- Light Glassmorphism Pill --- */
        .cart-toast__inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(226, 232, 240, 0.9);
          color: #0f172a;
          padding: 7px 8px 7px 14px;
          border-radius: 999px;
          box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.08),
            0 4px 12px -2px rgba(15, 23, 42, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* --- Success Icon Badge --- */
        .cart-toast__icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cart-toast__icon-ping {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.25);
          animation: toastPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .cart-toast__icon {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #10b981;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.28);
        }

        .cart-toast--show .cart-toast__icon svg {
          animation: iconPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* --- Text Style --- */
        .cart-toast__content {
          display: flex;
          align-items: center;
        }

        .cart-toast__msg {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #1e293b;
          white-space: nowrap;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* --- Action Group --- */
        .cart-toast__actions {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: 4px;
        }

        /* --- High Contrast Dark CTA --- */
        .cart-toast__link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0f172a;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 999px;
          white-space: nowrap;
          text-decoration: none;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-toast__link:hover {
          background: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }

        .cart-toast__link:hover .cart-toast__arrow {
          transform: translateX(2px);
        }

        .cart-toast__link:active {
          transform: translateY(0);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
        }

        .cart-toast__arrow {
          transition: transform 0.2s ease;
          opacity: 0.85;
        }

        /* --- Badge Count --- */
        .cart-toast__badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 999px;
          min-width: 18px;
          height: 18px;
          line-height: 1;
        }

        /* --- Close Button --- */
        .cart-toast__close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 50%;
          color: #64748b;
          cursor: pointer;
          transition: all 0.18s ease;
          padding: 0;
          flex-shrink: 0;
        }

        .cart-toast__close:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
          color: #0f172a;
        }

        .cart-toast__close:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* --- Keyframes --- */
        @keyframes toastPing {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75%, 100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes iconPop {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.15) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        /* --- Mobile Responsive --- */
        @media (max-width: 480px) {
          .cart-toast {
            left: 12px;
            right: 12px;
            bottom: calc(16px + env(safe-area-inset-bottom, 0px));
            transform: translateY(20px) scale(0.96);
            width: auto;
            max-width: none;
          }

          .cart-toast--show {
            transform: translateY(0) scale(1);
          }

          .cart-toast__inner {
            padding: 7px 8px 7px 12px;
            gap: 10px;
          }

          .cart-toast__msg {
            max-width: 120px;
            font-size: 13px;
          }

          .cart-toast__link {
            padding: 6px 11px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}