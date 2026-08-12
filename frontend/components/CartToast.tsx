"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartToast() {
  const { toast, itemCount, dismissToast } = useCart();

  return (
    <div className={`cart-toast ${toast.visible ? "cart-toast--show" : ""}`}>
      <div className="cart-toast__inner">
        <span className="cart-toast__check">✓</span>
        <span className="cart-toast__msg">{toast.message}</span>
        <Link href="/cart" className="cart-toast__link" onClick={dismissToast}>
          View Cart ({itemCount})
        </Link>
        <button className="cart-toast__close" onClick={dismissToast} aria-label="Dismiss">
          ×
        </button>
      </div>

      <style jsx>{`
        .cart-toast {
          position: fixed;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
          z-index: 300;
        }
        .cart-toast--show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .cart-toast__inner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1a1a1a;
          color: #fff;
          padding: 12px 14px 12px 16px;
          border-radius: 999px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
          font-size: 13.5px;
        }
        .cart-toast__check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2ecc71;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }
        .cart-toast__msg {
          white-space: nowrap;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cart-toast__link {
          background: #fff;
          color: #1a1a1a;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .cart-toast__close {
          background: none;
          border: none;
          color: #aaa;
          font-size: 16px;
          line-height: 1;
          padding: 0 2px;
        }

        @media (max-width: 480px) {
          .cart-toast {
            left: 16px;
            right: 16px;
            transform: translateY(20px);
          }
          .cart-toast--show {
            transform: translateY(0);
          }
          .cart-toast__inner {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}