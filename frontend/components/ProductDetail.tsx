"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
/**
 * Extra optional fields this page can use if they exist on your Product type.
 * Add them to `lib/types.ts` as optional props — nothing here breaks if they're missing.
 *
 *   images?: string[]        // gallery, falls back to [product.image]
 *   sizes?: string[]         // e.g. ["6", "7", "8"] or ["S", "M", "L"]
 *   description?: string
 *   highlights?: string[]    // bullet points
 *   rating?: number
 *   reviewCount?: number
 */

export default function ProductDetailPage({ product }: { product: Product }) {
  const router = useRouter();

  const gallery = useMemo(
    () => (product.images?.length ? product.images : [product.image].filter(Boolean)) as string[],
    [product]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.length ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const { addToCart } = useCart();

  function validateSelection() {
    if (product.sizes?.length && !selectedSize) {
      setSizeError(true);
      window.setTimeout(() => setSizeError(false), 1600);
      return false;
    }
    return true;
  }

  function handleAddToCart() {
    if (!validateSelection()) return;
    setInCart(true);
    addToCart(product, qty, { color: selectedColor, size: selectedSize });
    showToast("Added to cart");
  }

  function handleBuyNow() {
    if (!validateSelection()) return;
    addToCart(product, qty, { color: selectedColor, size: selectedSize });
    router.push("/cart"); // Buy Now → straight to Cart, no shipping form yet
  }
  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }

  // Mandatory-selection validation, same pattern used on CuratedCombosPage —
  // if the product has sizes, one must be picked before it can go in the cart.
  function validateSelection() {
    if (product.sizes?.length && !selectedSize) {
      setSizeError(true);
      window.setTimeout(() => setSizeError(false), 1600);
      return false;
    }
    return true;
  }

  function buildCartPayload() {
    return {
      product,
      qty,
      color: selectedColor,
      size: selectedSize,
    };
  }

  function handleAddToCart() {
    if (!validateSelection()) return;
    setInCart(true);
    window.dispatchEvent(new CustomEvent("sm:cart-add", { detail: buildCartPayload() }));
    showToast("Added to cart");
  }

  function handleBuyNow() {
    if (!validateSelection()) return;
    window.dispatchEvent(new CustomEvent("sm:cart-add", { detail: buildCartPayload() }));
    // Adjust this route to match your actual checkout flow.
    router.push("/checkout");
  }

  return (
    <div className="pdp">
      <div className="pdp__wrap">
        {/* ---------- Gallery ---------- */}
        <div className="pdp__gallery">
          <div className="pdp__thumbs">
            {gallery.map((img, i) => (
              <button
                key={img + i}
                className={`pdp__thumb ${i === activeImage ? "pdp__thumb--on" : ""}`}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" fill sizes="72px" className="pdp__thumb-img" />
              </button>
            ))}
          </div>

          <div className="pdp__main-media">
            {discount > 0 && <span className="pdp__badge">{discount}% Off</span>}
            <button
              type="button"
              className={`pdp__like ${liked ? "pdp__like--on" : ""}`}
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => setLiked((v) => !v)}
            >
              ♥
            </button>
            {gallery[activeImage] && (
              <Image
                src={gallery[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="pdp__main-img"
                priority
              />
            )}
          </div>
        </div>

        {/* ---------- Info ---------- */}
        <div className="pdp__info">
          {product.badge && <p className="pdp__tag">{product.badge}</p>}
          <h1 className="pdp__name">{product.name}</h1>

          {typeof product.rating === "number" && (
            <div className="pdp__rating">
              <span className="pdp__rating-badge">{product.rating.toFixed(1)} ★</span>
              {product.reviewCount ? (
                <span className="pdp__rating-count">{product.reviewCount} ratings</span>
              ) : null}
            </div>
          )}

          <div className="pdp__price-row">
            <span className="pdp__mrp-label">MRP</span>
            <span className="pdp__mrp">₹{product.mrp.toLocaleString("en-IN")}</span>
            <span className="pdp__price">₹{product.price.toLocaleString("en-IN")}</span>
            {discount > 0 && <span className="pdp__discount">({discount}% off)</span>}
          </div>

          <div className="pdp__emi-row">
            <span className="pdp__emi">or ₹{product.emiFrom.toLocaleString("en-IN")}/Month</span>
            <span className="pdp__emi-pill">
              Buy on EMI <span aria-hidden>›</span>
            </span>
          </div>

          {product.colors?.length ? (
            <div className="pdp__section">
              <p className="pdp__section-label">
                Colour{selectedColor ? <span className="pdp__selected-value">{selectedColor}</span> : null}
              </p>
              <div className="pdp__swatches">
                {product.colors.map((c, i) => (
                  <button
                    key={c + i}
                    className={`pdp__swatch ${selectedColor === c ? "pdp__swatch--on" : ""}`}
                    style={{ background: c }}
                    aria-label={c}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {product.sizes?.length ? (
            <div className="pdp__section">
              <p className="pdp__section-label">
                Size
                {sizeError && <span className="pdp__error"> — please select a size</span>}
              </p>
              <div className={`pdp__sizes ${sizeError ? "pdp__sizes--shake" : ""}`}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`pdp__size ${selectedSize === s ? "pdp__size--on" : ""}`}
                    onClick={() => {
                      setSelectedSize(s);
                      setSizeError(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="pdp__section">
            <p className="pdp__section-label">Quantity</p>
            <div className="pdp__qty">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="pdp__actions">
            <button
              type="button"
              className={`pdp__btn pdp__btn--outline ${inCart ? "pdp__btn--in-cart" : ""}`}
              onClick={handleAddToCart}
            >
              {inCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button type="button" className="pdp__btn pdp__btn--solid" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {toast && <div className="pdp__toast">{toast}</div>}

          {product.highlights?.length ? (
            <div className="pdp__section">
              <p className="pdp__section-label pdp__section-label--leaf">Highlights</p>
              <ul className="pdp__highlights">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {product.description ? (
            <div className="pdp__section">
              <p className="pdp__section-label">Description</p>
              <p className="pdp__description">{product.description}</p>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .pdp {
          /* ---- local theme tokens: deep emerald + rose pink, warm ivory ground ---- */
          --pdp-ink: #163529;
          --pdp-green: #1f4d3d;
          --pdp-green-soft: #e6efe9;
          --pdp-green-line: #cddbd2;
          --pdp-rose: #b3486b;
          --pdp-rose-deep: #8f3554;
          --pdp-rose-soft: #f8dde6;
          --pdp-blush: #fbeef0;
          --pdp-cream: #fbf8f3;
          --pdp-white: #ffffff;
          --pdp-gray: #767f76;
          --pdp-line: #e4ded0;
          --pdp-radius-lg: 20px;
          --pdp-radius-md: 14px;
          --pdp-font-display: "Cormorant Garamond", "Times New Roman", serif;
          --pdp-font-body: "Jost", "DM Sans", -apple-system, sans-serif;

          max-width: 1180px;
          margin: 0 auto;
          padding: 28px 20px 64px;
          background: var(--pdp-cream);
          font-family: var(--pdp-font-body);
        }
        .pdp__wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ---------- gallery ---------- */
        .pdp__gallery {
          display: flex;
          gap: 14px;
          position: sticky;
          top: 20px;
        }
        .pdp__thumbs {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }
        .pdp__thumb {
          position: relative;
          width: 66px;
          height: 66px;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid var(--pdp-line);
          background: var(--pdp-green-soft);
          padding: 0;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pdp__thumb--on {
          border-color: var(--pdp-green);
          box-shadow: 0 0 0 2px var(--pdp-green-soft);
        }
        .pdp__thumb-img {
          object-fit: cover;
        }
        .pdp__main-media {
          position: relative;
          flex: 1;
          aspect-ratio: 4 / 5;
          border-radius: var(--pdp-radius-lg);
          overflow: hidden;
          background: linear-gradient(160deg, #f1ede4, var(--pdp-green-soft));
          box-shadow: 0 12px 32px -18px rgba(22, 53, 41, 0.35);
        }
        .pdp__main-img {
          object-fit: contain;
          padding: 6%;
        }
        .pdp__badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--pdp-rose);
          color: var(--pdp-white);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 7px 12px;
          border-radius: 999px;
          z-index: 2;
        }
        .pdp__like {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 2px 6px rgba(22, 53, 41, 0.18);
          color: var(--pdp-gray);
          font-size: 16px;
          z-index: 2;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .pdp__like:hover {
          transform: scale(1.08);
        }
        .pdp__like--on {
          color: var(--pdp-rose);
        }

        /* ---------- info ---------- */
        .pdp__info {
          display: flex;
          flex-direction: column;
        }
        .pdp__tag {
          margin: 0 0 8px;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--pdp-rose-deep);
        }
        .pdp__name {
          margin: 0 0 12px;
          font-family: var(--pdp-font-display);
          font-size: 34px;
          font-weight: 600;
          line-height: 1.22;
          color: var(--pdp-ink);
        }
        .pdp__rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .pdp__rating-badge {
          background: var(--pdp-green);
          color: var(--pdp-white);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 9px;
          border-radius: 6px;
        }
        .pdp__rating-count {
          font-size: 12.5px;
          color: var(--pdp-gray);
        }

        .pdp__price-row {
          display: flex;
          align-items: baseline;
          gap: 9px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .pdp__mrp-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--pdp-gray);
        }
        .pdp__mrp {
          font-size: 15px;
          color: var(--pdp-gray);
          text-decoration: line-through;
        }
        .pdp__price {
          font-family: var(--pdp-font-display);
          font-size: 30px;
          font-weight: 700;
          color: var(--pdp-rose-deep);
        }
        .pdp__discount {
          font-size: 13px;
          font-weight: 600;
          color: var(--pdp-green);
        }

        .pdp__emi-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
        }
        .pdp__emi {
          font-size: 13px;
          color: var(--pdp-gray);
        }
        .pdp__emi-pill {
          background: var(--pdp-blush);
          color: var(--pdp-rose-deep);
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .pdp__section {
          margin-bottom: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--pdp-line);
        }
        .pdp__section:first-of-type {
          border-top: none;
          padding-top: 0;
        }
        .pdp__section-label {
          margin: 0 0 12px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--pdp-ink);
        }
        .pdp__section-label--leaf::before {
          content: "❧";
          margin-right: 7px;
          color: var(--pdp-rose);
          font-size: 13px;
        }
        .pdp__selected-value {
          margin-left: 8px;
          font-weight: 400;
          text-transform: none;
          letter-spacing: normal;
          color: var(--pdp-gray);
        }
        .pdp__error {
          color: var(--pdp-rose-deep);
          font-weight: 500;
          text-transform: none;
        }

        .pdp__swatches {
          display: flex;
          gap: 12px;
        }
        .pdp__swatch {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--pdp-white);
          box-shadow: 0 0 0 1.5px var(--pdp-line);
          cursor: pointer;
          padding: 0;
          transition: box-shadow 0.2s ease;
        }
        .pdp__swatch--on {
          box-shadow: 0 0 0 2px var(--pdp-green);
        }

        .pdp__sizes {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }
        .pdp__sizes--shake {
          animation: pdp-shake 0.4s ease;
        }
        @keyframes pdp-shake {
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .pdp__size {
          min-width: 46px;
          padding: 9px 13px;
          border-radius: 999px;
          border: 1.5px solid var(--pdp-green-line);
          background: var(--pdp-white);
          font-size: 13px;
          font-weight: 600;
          color: var(--pdp-ink);
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .pdp__size--on {
          border-color: var(--pdp-green);
          background: var(--pdp-green);
          color: var(--pdp-white);
        }

        .pdp__qty {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid var(--pdp-green-line);
          border-radius: 999px;
          overflow: hidden;
          width: fit-content;
        }
        .pdp__qty button {
          width: 38px;
          height: 38px;
          border: none;
          background: var(--pdp-white);
          color: var(--pdp-green);
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .pdp__qty button:hover {
          background: var(--pdp-green-soft);
        }
        .pdp__qty span {
          width: 38px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: var(--pdp-ink);
        }

        .pdp__actions {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .pdp__btn {
          flex: 1;
          padding: 15px 18px;
          border-radius: var(--pdp-radius-md);
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .pdp__btn:active {
          transform: scale(0.98);
        }
        .pdp__btn--outline {
          background: var(--pdp-white);
          border: 1.5px solid var(--pdp-green);
          color: var(--pdp-green);
        }
        .pdp__btn--outline:hover {
          background: var(--pdp-green-soft);
        }
        .pdp__btn--in-cart {
          border-color: var(--pdp-green);
          background: var(--pdp-green-soft);
          color: var(--pdp-green);
        }
        .pdp__btn--solid {
          background: var(--pdp-rose-deep);
          border: 1.5px solid var(--pdp-rose-deep);
          color: var(--pdp-white);
          box-shadow: 0 8px 20px -10px rgba(143, 53, 84, 0.55);
        }
        .pdp__btn--solid:hover {
          background: var(--pdp-rose);
          border-color: var(--pdp-rose);
        }

        .pdp__toast {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--pdp-green);
          margin-bottom: 12px;
        }

        .pdp__highlights {
          margin: 0;
          padding-left: 4px;
          list-style: none;
          font-size: 13.5px;
          color: var(--pdp-gray);
          line-height: 1.8;
        }
        .pdp__highlights li {
          position: relative;
          padding-left: 18px;
        }
        .pdp__highlights li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--pdp-rose);
        }
        .pdp__description {
          margin: 0;
          font-size: 13.5px;
          color: var(--pdp-gray);
          line-height: 1.8;
        }

        /* ---------- tablet ---------- */
        @media (max-width: 1024px) {
          .pdp__wrap {
            gap: 32px;
          }
          .pdp__name {
            font-size: 28px;
          }
          .pdp__price {
            font-size: 25px;
          }
        }

        /* ---------- mobile ---------- */
        @media (max-width: 768px) {
          .pdp {
            padding: 0 0 40px;
          }
          .pdp__wrap {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .pdp__gallery {
            position: static;
            flex-direction: column-reverse;
          }
          .pdp__main-media {
            aspect-ratio: 4 / 5;
            border-radius: 0;
            box-shadow: none;
          }
          .pdp__thumbs {
            flex-direction: row;
            overflow-x: auto;
            padding: 12px 16px;
            gap: 8px;
            background: var(--pdp-cream);
          }
          .pdp__thumb {
            width: 54px;
            height: 54px;
            flex-shrink: 0;
          }
          .pdp__info {
            padding: 20px 18px 0;
          }
          .pdp__name {
            font-size: 23px;
          }
          .pdp__price {
            font-size: 22px;
          }
          .pdp__actions {
            position: sticky;
            bottom: 0;
            background: var(--pdp-cream);
            padding: 12px 0 16px;
            margin-bottom: 0;
            border-top: 1px solid var(--pdp-line);
          }
        }
      `}</style>
    </div>
  );
}