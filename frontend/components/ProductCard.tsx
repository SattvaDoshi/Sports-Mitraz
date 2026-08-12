"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";


export default function ProductCard({ product }: { product: Product }) {
  const {
    id,
    name,
    image,
    price,
    originalPrice,
    discountPercent,
    rating,
    stock,
  } = product;

  const [added, setAdded] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const goToDetail = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stock === 0) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stock === 0) return;
    addToCart(product, 1);
    router.push("/checkout");
  };

  return (
    <div className="pc-card" onClick={goToDetail} role="button" tabIndex={0}>
      <div className="pc-card__imageWrap">
        <img src={image} alt={name} className="pc-card__image" loading="lazy" />
        {discountPercent ? (
          <span className="pc-card__badge">-{discountPercent}%</span>
        ) : null}
      </div>

      <div className="pc-card__body">
        <p className="pc-card__name">{name}</p>

        {rating ? (
          <div className="pc-card__rating">
            <span className="pc-card__star">★</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        ) : null}

        <div className="pc-card__priceRow">
          <span className="pc-card__price">₹{price.toLocaleString("en-IN")}</span>
          {originalPrice ? (
            <span className="pc-card__originalPrice">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          ) : null}
        </div>

        <div className="pc-card__ctaRow">
          <button
            type="button"
            className="pc-card__cta"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            {stock === 0 ? "Out of stock" : added ? "Added ✓" : "Add to Cart"}
          </button>

          <button
            type="button"
            className="pc-card__buyNow"
            onClick={handleBuyNow}
            disabled={stock === 0}
          >
            Buy Now
          </button>
        </div>
      </div>

      <style>{`
        .pc-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e5f5ea;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .pc-card:hover {
          box-shadow: 0 10px 24px rgba(22, 101, 52, 0.12);
          transform: translateY(-2px);
          border-color: #bbf0cc;
        }
        .pc-card:focus-visible {
          outline: 2px solid #166534;
          outline-offset: 2px;
        }

        .pc-card__imageWrap {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f4faf6;
        }
        .pc-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pc-card__badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #db2777;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }

        .pc-card__body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px;
        }

        .pc-card__name {
          font-size: 13.5px;
          font-weight: 600;
          color: #14532d;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        .pc-card__rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #166534;
        }
        .pc-card__star {
          color: #ec4899;
          font-size: 13px;
        }

        .pc-card__priceRow {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .pc-card__price {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
        }
        .pc-card__originalPrice {
          font-size: 12px;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .pc-card__ctaRow {
          margin-top: 6px;
          display: flex;
          gap: 8px;
        }
        .pc-card__cta,
        .pc-card__buyNow {
          flex: 1;
          padding: 9px 0;
          font-size: 12.5px;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.1s ease;
        }
        .pc-card__cta {
          color: #fff;
          background: linear-gradient(90deg, #16a34a, #db2777);
        }
        .pc-card__buyNow {
          color: #14532d;
          background: #fff;
          border: 1.5px solid #16a34a;
        }
        .pc-card__cta:disabled,
        .pc-card__buyNow:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .pc-card__cta:hover:not(:disabled),
        .pc-card__buyNow:hover:not(:disabled) {
          opacity: 0.9;
        }
        .pc-card__cta:active:not(:disabled),
        .pc-card__buyNow:active:not(:disabled) {
          transform: scale(0.98);
        }

        @media (max-width: 480px) {
          .pc-card__body { padding: 10px; gap: 5px; }
          .pc-card__name { font-size: 13px; }
          .pc-card__ctaRow { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}