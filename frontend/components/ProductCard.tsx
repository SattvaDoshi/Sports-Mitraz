"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const goToDetail = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="pc" onClick={goToDetail} role="button" tabIndex={0}>
      <div className="pc__media">
        {discount > 0 && <span className="pc__badge">{discount}% Off</span>}

        <div className="pc__iconstack">
          <button
            type="button"
            className="pc__icon"
            aria-label="Quick view"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <button
            type="button"
            className={`pc__icon ${liked ? "pc__icon--on" : ""}`}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.stopPropagation();
              setLiked((v) => !v);
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"}>
              <path
                d="M12 20.5s-7.5-4.6-10-9.2C.5 8 2 4.5 5.5 4c2.2-.3 4 .9 6.5 3.5C14.5 4.9 16.3 3.7 18.5 4c3.5.5 5 4 3.5 7.3-2.5 4.6-10 9.2-10 9.2Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>

        <div className="pc__img">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "contain" }}
          />
        </div>

        <button
          type="button"
          className="pc__cart-cta"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of stock" : added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>

      <div className="pc__body">
        {product.badge && <p className="pc__tag">{product.badge}</p>}
        <h3 className="pc__name">{product.name}</h3>

        <div className="pc__colors" aria-hidden>
          {product.colors.map((c, i) => (
            <span key={i} className="pc__swatch" style={{ background: c }} />
          ))}
        </div>

        <div className="pc__price-row">
          <span className="pc__mrp">₹{product.mrp.toLocaleString("en-IN")}</span>
          <span className="pc__price">₹{product.price.toLocaleString("en-IN")}</span>
        </div>

        <div className="pc__emi-row">
          <span className="pc__emi">or ₹{product.emiFrom.toLocaleString("en-IN")}/Month</span>
          <span className="pc__emi-pill">Buy on EMI ›</span>
        </div>
      </div>

      <style jsx>{`
        .pc {
          background: var(--sm-white, #fff);
          border-radius: var(--sm-radius-md, 6px);
          border: none;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .pc:hover {
          transform: translateY(-4px);
          box-shadow: var(--sm-shadow-md, 0 12px 24px rgba(0, 0, 0, 0.08));
        }
        .pc:focus-visible {
          outline: 2px solid var(--sm-ink, #1a1a1a);
          outline-offset: 2px;
        }

        .pc__media {
          position: relative;
          aspect-ratio: 1 / 1;
          background: #fbfbf9;
        }
        .pc__img {
          position: absolute;
          inset: 0;
          padding: 8%;
        }

        .pc__badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #dfe2f5;
          color: #2b2b2b;
          font-size: clamp(11px, 1.2vw, 12px);
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          z-index: 2;
        }

        .pc__iconstack {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 2;
        }
        .pc__icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .pc__icon:hover {
          transform: scale(1.08);
        }
        .pc__icon--on {
          color: var(--sm-pink, #e21c63);
        }

        .pc__cart-cta {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border: none;
          background: var(--sm-ink, #1a1a1a);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 0;
          transform: translateY(100%);
          transition: transform 0.25s ease;
          z-index: 2;
        }
        .pc__cart-cta:disabled {
          background: #999;
          cursor: not-allowed;
        }
        @media (hover: hover) {
          .pc__media:hover .pc__cart-cta {
            transform: translateY(0);
          }
        }
        @media (hover: none) {
          .pc__cart-cta {
            transform: translateY(0);
            opacity: 0.92;
          }
        }

        .pc__body {
          padding: 16px 16px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pc__tag {
          margin: 0 0 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #2f6fed;
        }
        .pc__name {
          margin: 0 0 10px;
          font-size: clamp(13px, 1.4vw, 15px);
          font-weight: 600;
          line-height: 1.35;
          color: var(--sm-ink, #1a1a1a);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pc__colors {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
        }
        .pc__swatch {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
        .pc__price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: auto;
        }
        .pc__mrp {
          font-size: 12px;
          color: #b3b3b3;
          text-decoration: line-through;
        }
        .pc__price {
          font-size: clamp(14px, 1.6vw, 17px);
          font-weight: 700;
          color: var(--sm-ink, #1a1a1a);
        }
        .pc__emi-row {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pc__emi {
          font-size: 11px;
          color: var(--sm-gray, #777);
        }
        .pc__emi-pill {
          background: #111;
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .pc__body {
            padding: 10px 10px 12px;
          }
          .pc__icon {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </article>
  );
}