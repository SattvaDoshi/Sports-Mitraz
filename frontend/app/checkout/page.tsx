"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const UPI_ID = "yourshop@okhdfcbank"; // TODO: replace with your real UPI ID
const PAYEE_NAME = "Sports Mitraz";

export default function CheckoutPage() {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  const gpayLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${total}&cu=INR&tn=${encodeURIComponent("Order Payment")}`;

  function updateField(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  }

  function validate() {
    const next: Record<string, boolean> = {};
    (Object.keys(form) as (keyof typeof form)[]).forEach((k) => {
      if (!form[k].trim()) next[k] = true;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handlePlaceOrder() {
    if (items.length === 0) return;
    if (!validate()) return;

    setPlacing(true);
    // Hook your real order/payment-confirmation API call here.
    window.setTimeout(() => {
      clearCart();
      router.push("/order-confirmed");
    }, 900);
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-page__empty">
          <p>Your cart is empty — nothing to check out yet.</p>
          <Link href="/" className="checkout-page__btn checkout-page__btn--solid">
            Continue Shopping
          </Link>
        </div>
        <style jsx>{`
          .checkout-page__empty {
            min-height: 50vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 18px;
            color: #767f76;
            font-family: "Jost", sans-serif;
          }
          .checkout-page__btn {
            padding: 12px 22px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 14px;
          }
          .checkout-page__btn--solid {
            background: #8f3554;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__wrap">
        <h1 className="checkout-page__title">Checkout</h1>

        <div className="checkout-page__body">
          {/* ---------- Shipping form ---------- */}
          <div className="checkout-form">
            <h2 className="checkout-section__title">Shipping Details</h2>

            <div className="checkout-form__grid">
              <label className="checkout-field">
                <span>Full Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={errors.name ? "checkout-field__error" : ""}
                  placeholder="Jane Doe"
                />
              </label>

              <label className="checkout-field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={errors.phone ? "checkout-field__error" : ""}
                  placeholder="98765 43210"
                />
              </label>

              <label className="checkout-field checkout-field--full">
                <span>Address</span>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className={errors.address ? "checkout-field__error" : ""}
                  placeholder="House no, street, area"
                />
              </label>

              <label className="checkout-field">
                <span>City</span>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={errors.city ? "checkout-field__error" : ""}
                  placeholder="Pune"
                />
              </label>

              <label className="checkout-field">
                <span>Pincode</span>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => updateField("pincode", e.target.value)}
                  className={errors.pincode ? "checkout-field__error" : ""}
                  placeholder="411001"
                />
              </label>
            </div>

            <h2 className="checkout-section__title checkout-section__title--items">
              Order Items ({itemCount})
            </h2>
            <div className="checkout-items">
              {items.map((it) => {
                const key = `${it.product.id}-${it.color ?? "nc"}-${it.size ?? "ns"}`;
                return (
                  <div className="checkout-item" key={key}>
                    <div className="checkout-item__img">
                      <Image
                        src={it.product.image}
                        alt={it.product.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="checkout-item__info">
                      <p className="checkout-item__name">{it.product.name}</p>
                      {(it.color || it.size) && (
                        <p className="checkout-item__variant">
                          {it.color && <span>Colour: {it.color}</span>}
                          {it.color && it.size && <span> · </span>}
                          {it.size && <span>Size: {it.size}</span>}
                        </p>
                      )}
                      <p className="checkout-item__qty">Qty: {it.qty}</p>
                    </div>
                    <div className="checkout-item__price">
                      ₹{(it.product.price * it.qty).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------- Payment ---------- */}
            <h2 className="checkout-section__title checkout-section__title--items">
              Payment
            </h2>
            <div className="checkout-payment">
              <div className="checkout-payment__qr">
                <Image
                  src="/gpay-qr.png"
                  alt="Scan to pay via GPay"
                  width={160}
                  height={160}
                />
              </div>
              <div className="checkout-payment__info">
                <a href={gpayLink} className="checkout-page__btn checkout-page__btn--gpay">
                  Pay ₹{total.toLocaleString("en-IN")} via GPay
                </a>
                <p className="checkout-payment__note">
                  Tap the button above on your phone, or scan the QR code to
                  pay via GPay and confirm your order. You&apos;ll receive
                  your order confirmation details on WhatsApp or Email
                  shortly after payment.
                </p>
              </div>
            </div>
          </div>

          {/* ---------- Summary ---------- */}
          <aside className="checkout-summary">
            <h2 className="checkout-summary__title">Order Summary</h2>
            <div className="checkout-summary__row">
              <span>Subtotal ({itemCount} items)</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              type="button"
              className="checkout-page__btn checkout-page__btn--solid"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? "Placing Order..." : "I've Paid — Confirm Order"}
            </button>
            <Link href="/cart" className="checkout-page__btn checkout-page__btn--outline">
              Back to Cart
            </Link>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          --ck-ink: #163529;
          --ck-green: #1f4d3d;
          --ck-green-soft: #e6efe9;
          --ck-rose-deep: #8f3554;
          --ck-rose: #b3486b;
          --ck-cream: #fbf8f3;
          --ck-white: #ffffff;
          --ck-gray: #767f76;
          --ck-line: #e4ded0;

          min-height: 60vh;
          background: var(--ck-cream);
          padding: 32px 20px 80px;
          font-family: "Jost", "DM Sans", -apple-system, sans-serif;
        }
        .checkout-page__wrap {
          max-width: 1080px;
          margin: 0 auto;
        }
        .checkout-page__title {
          font-family: "Cormorant Garamond", serif;
          font-size: 32px;
          font-weight: 600;
          color: var(--ck-ink);
          margin: 0 0 28px;
        }
        .checkout-page__body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }

        .checkout-form {
          background: var(--ck-white);
          border: 1px solid var(--ck-line);
          border-radius: 14px;
          padding: 22px;
        }
        .checkout-section__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ck-ink);
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .checkout-section__title--items {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--ck-line);
        }
        .checkout-form__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .checkout-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ck-ink);
        }
        .checkout-field--full {
          grid-column: 1 / -1;
        }
        .checkout-field input {
          border: 1.5px solid var(--ck-line);
          border-radius: 10px;
          padding: 11px 12px;
          font-size: 13.5px;
          font-family: inherit;
          color: var(--ck-ink);
          background: var(--ck-cream);
        }
        .checkout-field input:focus {
          outline: none;
          border-color: var(--ck-green);
        }
        .checkout-field__error {
          border-color: var(--ck-rose-deep) !important;
        }

        .checkout-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .checkout-item {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: 12px;
          align-items: center;
        }
        .checkout-item__img {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 8px;
          background: var(--ck-green-soft);
        }
        .checkout-item__name {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ck-ink);
        }
        .checkout-item__variant,
        .checkout-item__qty {
          margin: 2px 0 0;
          font-size: 11.5px;
          color: var(--ck-gray);
        }
        .checkout-item__price {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ck-ink);
          white-space: nowrap;
        }

        .checkout-payment {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 18px;
          align-items: center;
          background: var(--ck-green-soft);
          border-radius: 12px;
          padding: 16px;
        }
        .checkout-payment__qr {
          width: 160px;
          height: 160px;
          border-radius: 10px;
          overflow: hidden;
          background: var(--ck-white);
        }
        .checkout-payment__info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .checkout-payment__note {
          margin: 0;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ck-gray);
        }

        .checkout-summary {
          background: var(--ck-white);
          border: 1px solid var(--ck-line);
          border-radius: 14px;
          padding: 20px;
          position: sticky;
          top: 90px;
        }
        .checkout-summary__title {
          margin: 0 0 16px;
          font-size: 16px;
          font-weight: 700;
          color: var(--ck-ink);
        }
        .checkout-summary__row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: var(--ck-ink);
          margin-bottom: 10px;
        }
        .checkout-summary__divider {
          height: 1px;
          background: var(--ck-line);
          margin: 14px 0;
        }
        .checkout-summary__row--total {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .checkout-page__btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 13px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 10px;
          border: 1.5px solid transparent;
        }
        .checkout-page__btn--solid {
          background: var(--ck-rose-deep);
          border-color: var(--ck-rose-deep);
          color: #fff;
        }
        .checkout-page__btn--solid:hover {
          background: var(--ck-rose);
        }
        .checkout-page__btn--solid:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .checkout-page__btn--outline {
          background: var(--ck-white);
          border-color: var(--ck-green);
          color: var(--ck-green);
          margin-bottom: 0;
        }
        .checkout-page__btn--gpay {
          background: #1a73e8;
          border-color: #1a73e8;
          color: #fff;
          text-decoration: none;
        }
        .checkout-page__btn--gpay:hover {
          background: #1558b0;
        }

        @media (max-width: 860px) {
          .checkout-page__body {
            grid-template-columns: 1fr;
          }
          .checkout-summary {
            position: static;
          }
          .checkout-form__grid {
            grid-template-columns: 1fr;
          }
          .checkout-payment {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .checkout-payment__qr {
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}