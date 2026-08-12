"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQty, removeFromCart, clearCart } =
    useCart();
  const router = useRouter();

  const isEmpty = items.length === 0;

  // Calculate total savings across all discounted items
  const totalSavings = items.reduce((acc, it) => {
    if (it.product.mrp && it.product.mrp > it.product.price) {
      return acc + (it.product.mrp - it.product.price) * it.qty;
    }
    return acc;
  }, 0);

  function handleCheckout() {
    router.push("/checkout");
  }

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="cart-page__wrap">
          {/* Top Breadcrumb / Back Link */}
          <div className="cart-page__top-nav">
            <Link href="/" className="cart-page__back-link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Continue Shopping</span>
            </Link>
          </div>

          <div className="cart-page__header">
            <div className="cart-page__title-group">
              <h1 className="cart-page__title">Shopping Cart</h1>
              <span className="cart-page__badge">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            {!isEmpty && (
              <button
                type="button"
                className="cart-page__clear-btn"
                onClick={clearCart}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Clear All
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className="cart-page__empty-card">
              <div className="cart-page__empty-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h2>Your cart is empty</h2>
              <p>
                Looks like you haven't added anything to your sports cart yet.
              </p>
              <Link href="/" className="cart-page__btn cart-page__btn--solid">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="cart-page__grid">
              {/* ---------- Line items list ---------- */}
              <div className="cart-page__items-list">
                {items.map((it) => {
                  const key = `${it.product.id}-${it.color ?? "nc"}-${it.size ?? "ns"}`;
                  const hasDiscount =
                    it.product.mrp && it.product.mrp > it.product.price;

                  return (
                    <div className="cart-item" key={key}>
                      <div className="cart-item__img-wrap">
                        <Image
                          src={it.product.image}
                          alt={it.product.name}
                          fill
                          sizes="(max-width: 640px) 80px, 100px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>

                      <div className="cart-item__details">
                        <div className="cart-item__main-info">
                          <h3 className="cart-item__name">{it.product.name}</h3>

                          {(it.color || it.size) && (
                            <div className="cart-item__variants">
                              {it.color && (
                                <span className="cart-item__tag">
                                  Color: <strong>{it.color}</strong>
                                </span>
                              )}
                              {it.size && (
                                <span className="cart-item__tag">
                                  Size: <strong>{it.size}</strong>
                                </span>
                              )}
                            </div>
                          )}

                          <div className="cart-item__price-block">
                            <span className="cart-item__price">
                              ₹{it.product.price.toLocaleString("en-IN")}
                            </span>
                            {hasDiscount && (
                              <span className="cart-item__mrp">
                                ₹{it.product.mrp.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions: Quantity Selector & Remove Button */}
                        <div className="cart-item__controls">
                          <div className="cart-item__qty-picker">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQty(
                                  it.product.id,
                                  it.color ?? null,
                                  it.size ?? null,
                                  it.qty - 1
                                )
                              }
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                            <span className="cart-item__qty-val">{it.qty}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQty(
                                  it.product.id,
                                  it.color ?? null,
                                  it.size ?? null,
                                  it.qty + 1
                                )
                              }
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                          </div>

                          <button
                            type="button"
                            className="cart-item__remove-btn"
                            onClick={() =>
                              removeFromCart(
                                it.product.id,
                                it.color ?? null,
                                it.size ?? null
                              )
                            }
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="cart-item__total-block">
                        <span className="cart-item__total-label">Total</span>
                        <span className="cart-item__total-val">
                          ₹{(it.product.price * it.qty).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---------- Order Summary Sidebar ---------- */}
              <aside className="cart-summary">
                <h2 className="cart-summary__title">Order Summary</h2>

                <div className="cart-summary__rows">
                  <div className="cart-summary__row">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="cart-summary__row cart-summary__row--discount">
                      <span>Total Savings</span>
                      <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="cart-summary__row cart-summary__row--muted">
                    <span>Estimated Shipping</span>
                    <span className="cart-summary__free-tag">Calculated at Checkout</span>
                  </div>
                </div>

                <div className="cart-summary__divider" />

                <div className="cart-summary__row cart-summary__row--total">
                  <span>Total Amount</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <button
                  type="button"
                  className="cart-page__btn cart-page__btn--solid cart-summary__checkout-btn"
                  onClick={handleCheckout}
                >
                  <span>Proceed to Checkout</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                {/* Trust Badges */}
                <div className="cart-summary__trust-badges">
                  <div className="cart-summary__trust-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Secure Encrypted Checkout</span>
                  </div>
                  <div className="cart-summary__trust-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span>Fast Express Shipping</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          --cp-ink: #111827;
          --cp-green: #1f4d3d;
          --cp-green-soft: #f0f7f4;
          --cp-rose: #be123c;
          --cp-rose-deep: #9f1239;
          --cp-rose-soft: #fff1f2;
          --cp-bg: #f8fafc;
          --cp-white: #ffffff;
          --cp-gray: #64748b;
          --cp-gray-light: #94a3b8;
          --cp-line: #e2e8f0;
          --cp-radius: 16px;
          --cp-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
          --cp-shadow-md: 0 4px 20px -2px rgba(0, 0, 0, 0.06);

          min-height: calc(100vh - 80px);
          background: var(--cp-bg);
          padding: 24px 16px 80px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
          color: var(--cp-ink);
        }

        .cart-page__wrap {
          max-width: 1140px;
          margin: 0 auto;
        }

        /* Top Navigation Link */
        .cart-page__top-nav {
          margin-bottom: 20px;
        }
        .cart-page__back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--cp-gray);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .cart-page__back-link:hover {
          color: var(--cp-green);
        }

        /* Header */
        .cart-page__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--cp-line);
        }
        .cart-page__title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cart-page__title {
          font-size: 28px;
          font-weight: 700;
          color: var(--cp-ink);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .cart-page__badge {
          background: var(--cp-green-soft);
          color: var(--cp-green);
          font-size: 13px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
        }
        .cart-page__clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: none;
          background: transparent;
          color: var(--cp-gray);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .cart-page__clear-btn:hover {
          color: var(--cp-rose);
        }

        /* Empty Cart State */
        .cart-page__empty-card {
          background: var(--cp-white);
          border: 1px solid var(--cp-line);
          border-radius: var(--cp-radius);
          box-shadow: var(--cp-shadow-md);
          text-align: center;
          padding: 64px 24px;
          max-width: 480px;
          margin: 40px auto;
        }
        .cart-page__empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: var(--cp-green-soft);
          color: var(--cp-green);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-page__empty-card h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px;
        }
        .cart-page__empty-card p {
          color: var(--cp-gray);
          font-size: 14px;
          margin: 0 0 24px;
        }

        /* Layout Grid */
        .cart-page__grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }

        /* Cart Items List */
        .cart-page__items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Single Cart Item */
        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 20px;
          background: var(--cp-white);
          border: 1px solid var(--cp-line);
          border-radius: var(--cp-radius);
          padding: 18px;
          box-shadow: var(--cp-shadow-sm);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cart-item:hover {
          border-color: #cbd5e1;
          box-shadow: var(--cp-shadow-md);
        }

        .cart-item__img-wrap {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 12px;
          background: #f1f5f9;
          overflow: hidden;
          flex-shrink: 0;
        }

        .cart-item__details {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cart-item__name {
          font-size: 16px;
          font-weight: 600;
          color: var(--cp-ink);
          margin: 0 0 6px;
          line-height: 1.3;
        }

        .cart-item__variants {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }
        .cart-item__tag {
          font-size: 12px;
          color: var(--cp-gray);
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .cart-item__price-block {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cart-item__price {
          font-weight: 700;
          font-size: 15px;
          color: var(--cp-ink);
        }
        .cart-item__mrp {
          font-size: 13px;
          color: var(--cp-gray-light);
          text-decoration: line-through;
        }

        /* Quantity & Remove Action row */
        .cart-item__controls {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 12px;
        }

        .cart-item__qty-picker {
          display: inline-flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid var(--cp-line);
          border-radius: 8px;
          padding: 2px;
        }
        .cart-item__qty-picker button {
          width: 28px;
          height: 28px;
          border: none;
          background: var(--cp-white);
          color: var(--cp-ink);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .cart-item__qty-picker button:hover {
          background: var(--cp-green-soft);
          color: var(--cp-green);
        }
        .cart-item__qty-val {
          width: 32px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
        }

        .cart-item__remove-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: none;
          background: none;
          color: var(--cp-gray);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .cart-item__remove-btn:hover {
          color: var(--cp-rose);
        }

        /* Item Subtotal Column */
        .cart-item__total-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
        }
        .cart-item__total-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--cp-gray-light);
          margin-bottom: 2px;
        }
        .cart-item__total-val {
          font-weight: 700;
          font-size: 16px;
          color: var(--cp-ink);
        }

        /* Order Summary Box */
        .cart-summary {
          background: var(--cp-white);
          border: 1px solid var(--cp-line);
          border-radius: var(--cp-radius);
          padding: 24px;
          box-shadow: var(--cp-shadow-sm);
          position: sticky;
          top: 100px;
        }
        .cart-summary__title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--cp-line);
        }
        .cart-summary__rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cart-summary__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: var(--cp-ink);
        }
        .cart-summary__row--discount {
          color: var(--cp-rose);
          font-weight: 600;
        }
        .cart-summary__row--muted {
          color: var(--cp-gray);
        }
        .cart-summary__free-tag {
          font-size: 12px;
          color: var(--cp-green);
          font-weight: 500;
        }

        .cart-summary__divider {
          height: 1px;
          background: var(--cp-line);
          margin: 16px 0;
        }

        .cart-summary__row--total {
          font-size: 18px;
          font-weight: 700;
          color: var(--cp-ink);
        }

        /* Buttons */
        .cart-page__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .cart-page__btn--solid {
          background: var(--cp-green);
          border: 1px solid var(--cp-green);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(31, 77, 61, 0.2);
        }
        .cart-page__btn--solid:hover {
          background: #173b2f;
          border-color: #173b2f;
          transform: translateY(-1px);
        }

        .cart-summary__checkout-btn {
          gap: 8px;
          margin-top: 20px;
        }

        /* Trust Badges */
        .cart-summary__trust-badges {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px dashed var(--cp-line);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cart-summary__trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--cp-gray);
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .cart-page__grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .cart-page {
            padding: 16px 12px 60px;
          }
          .cart-page__title {
            font-size: 22px;
          }

          .cart-item {
            grid-template-columns: 80px 1fr;
            gap: 14px;
            padding: 14px;
            position: relative;
          }

          .cart-item__img-wrap {
            width: 80px;
            height: 80px;
          }

          .cart-item__total-block {
            grid-column: 1 / -1;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px dashed var(--cp-line);
            margin-top: 4px;
          }

          .cart-item__controls {
            justify-content: space-between;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}