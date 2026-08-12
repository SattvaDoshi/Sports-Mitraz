"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQty, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const isEmpty = items.length === 0;

  function handleCheckout() {
    router.push("/checkout");
  }

  return (
    <div className="cart-page">
      <div className="cart-page__wrap">
        <div className="cart-page__header">
          <h1 className="cart-page__title">Your Cart</h1>
          <span className="cart-page__count">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        {isEmpty ? (
          <div className="cart-page__empty">
            <p>Your cart is empty.</p>
            <Link href="/" className="cart-page__btn cart-page__btn--solid">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-page__body">
            {/* ---------- Line items ---------- */}
            <div className="cart-page__items">
              {items.map((it, i) => {
                const key = `${it.product.id}-${it.color ?? "nc"}-${it.size ?? "ns"}`;
                return (
                  <div className="cart-item" key={key}>
                    <div className="cart-item__img">
                      <Image
                        src={it.product.image}
                        alt={it.product.name}
                        fill
                        sizes="96px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>

                    <div className="cart-item__info">
                      <p className="cart-item__name">{it.product.name}</p>

                      {(it.color || it.size) && (
                        <p className="cart-item__variant">
                          {it.color && <span>Colour: {it.color}</span>}
                          {it.color && it.size && <span> · </span>}
                          {it.size && <span>Size: {it.size}</span>}
                        </p>
                      )}

                      <div className="cart-item__price-row">
                        <span className="cart-item__price">
                          ₹{it.product.price.toLocaleString("en-IN")}
                        </span>
                        {it.product.mrp > it.product.price && (
                          <span className="cart-item__mrp">
                            ₹{it.product.mrp.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className="cart-item__actions">
                        <div className="cart-item__qty">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQty(it.product.id, it.color ?? null, it.size ?? null, it.qty - 1)
                            }
                          >
                            −
                          </button>
                          <span>{it.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQty(it.product.id, it.color ?? null, it.size ?? null, it.qty + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() =>
                            removeFromCart(it.product.id, it.color ?? null, it.size ?? null)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item__line-total">
                      ₹{(it.product.price * it.qty).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}

              <button type="button" className="cart-page__clear" onClick={clearCart}>
                Clear cart
              </button>
            </div>

            {/* ---------- Summary ---------- */}
            <aside className="cart-summary">
              <h2 className="cart-summary__title">Order Summary</h2>
              <div className="cart-summary__row">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="cart-summary__row cart-summary__row--muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="button"
                className="cart-page__btn cart-page__btn--solid cart-summary__checkout"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <Link href="/" className="cart-page__btn cart-page__btn--outline">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-page {
          --cp-ink: #163529;
          --cp-green: #1f4d3d;
          --cp-green-soft: #e6efe9;
          --cp-rose: #b3486b;
          --cp-rose-deep: #8f3554;
          --cp-cream: #fbf8f3;
          --cp-white: #ffffff;
          --cp-gray: #767f76;
          --cp-line: #e4ded0;

          min-height: 60vh;
          background: var(--cp-cream);
          padding: 32px 20px 80px;
          font-family: "Jost", "DM Sans", -apple-system, sans-serif;
        }
        .cart-page__wrap {
          max-width: 1080px;
          margin: 0 auto;
        }
        .cart-page__header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 28px;
        }
        .cart-page__title {
          font-family: "Cormorant Garamond", serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--cp-ink);
          margin: 0;
        }
        .cart-page__count {
          font-size: 13px;
          color: var(--cp-gray);
        }

        .cart-page__empty {
          text-align: center;
          padding: 80px 20px;
          color: var(--cp-gray);
        }
        .cart-page__empty p {
          margin-bottom: 20px;
          font-size: 15px;
        }

        .cart-page__body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }

        .cart-page__items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 96px 1fr auto;
          gap: 16px;
          background: var(--cp-white);
          border: 1px solid var(--cp-line);
          border-radius: 14px;
          padding: 14px;
        }
        .cart-item__img {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 10px;
          background: var(--cp-green-soft);
          flex-shrink: 0;
        }
        .cart-item__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cart-item__name {
          margin: 0;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--cp-ink);
        }
        .cart-item__variant {
          margin: 0;
          font-size: 12px;
          color: var(--cp-gray);
        }
        .cart-item__price-row {
          display: flex;
          gap: 8px;
          align-items: baseline;
          margin-top: 4px;
        }
        .cart-item__price {
          font-weight: 700;
          font-size: 14px;
          color: var(--cp-rose-deep);
        }
        .cart-item__mrp {
          font-size: 12px;
          color: #b3b3b3;
          text-decoration: line-through;
        }
        .cart-item__actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }
        .cart-item__qty {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid var(--cp-line);
          border-radius: 999px;
          overflow: hidden;
        }
        .cart-item__qty button {
          width: 30px;
          height: 30px;
          border: none;
          background: var(--cp-white);
          color: var(--cp-green);
          font-size: 14px;
          cursor: pointer;
        }
        .cart-item__qty button:hover {
          background: var(--cp-green-soft);
        }
        .cart-item__qty span {
          width: 28px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
        }
        .cart-item__remove {
          border: none;
          background: none;
          color: var(--cp-gray);
          font-size: 12.5px;
          text-decoration: underline;
          cursor: pointer;
        }
        .cart-item__remove:hover {
          color: var(--cp-rose-deep);
        }
        .cart-item__line-total {
          font-weight: 700;
          font-size: 14.5px;
          color: var(--cp-ink);
          white-space: nowrap;
        }

        .cart-page__clear {
          align-self: flex-start;
          border: none;
          background: none;
          color: var(--cp-gray);
          font-size: 12.5px;
          text-decoration: underline;
          cursor: pointer;
          margin-top: 4px;
        }

        .cart-summary {
          background: var(--cp-white);
          border: 1px solid var(--cp-line);
          border-radius: 14px;
          padding: 20px;
          position: sticky;
          top: 90px;
        }
        .cart-summary__title {
          margin: 0 0 16px;
          font-size: 16px;
          font-weight: 700;
          color: var(--cp-ink);
        }
        .cart-summary__row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: var(--cp-ink);
          margin-bottom: 10px;
        }
        .cart-summary__row--muted {
          color: var(--cp-gray);
          font-size: 12.5px;
        }
        .cart-summary__divider {
          height: 1px;
          background: var(--cp-line);
          margin: 14px 0;
        }
        .cart-summary__row--total {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .cart-page__btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 13px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .cart-page__btn--solid {
          background: var(--cp-rose-deep);
          border: 1.5px solid var(--cp-rose-deep);
          color: #fff;
        }
        .cart-page__btn--solid:hover {
          background: var(--cp-rose);
        }
        .cart-page__btn--outline {
          background: var(--cp-white);
          border: 1.5px solid var(--cp-green);
          color: var(--cp-green);
          margin-bottom: 0;
        }
        .cart-summary__checkout {
          margin-top: 6px;
        }

        @media (max-width: 860px) {
          .cart-page__body {
            grid-template-columns: 1fr;
          }
          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 520px) {
          .cart-item {
            grid-template-columns: 72px 1fr;
          }
          .cart-item__img {
            width: 72px;
            height: 72px;
          }
          .cart-item__line-total {
            grid-column: 2;
            text-align: right;
          }
        }
      `}</style>
    </div>
  );
}