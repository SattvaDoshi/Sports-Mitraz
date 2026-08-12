"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
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
  const [copiedUpi, setCopiedUpi] = useState(false);

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

  function handleCopyUpi() {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  }

  function handlePlaceOrder() {
    if (items.length === 0) return;
    if (!validate()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setPlacing(true);
    window.setTimeout(() => {
      clearCart();
      router.push("/order-confirmed");
    }, 900);
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-page__empty">
          <div className="empty-icon-wrap">
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
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Explore our latest sports gear and add items to your cart.</p>
          <Link href="/" className="checkout-page__btn checkout-page__btn--solid">
            Continue Shopping
          </Link>
        </div>
        <style jsx>{`
          .checkout-page {
            min-height: 100vh;
            background: #f9f8f4;
            font-family: "Jost", "DM Sans", -apple-system, sans-serif;
          }
          .checkout-page__empty {
            min-height: calc(100vh - 120px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px 20px;
            text-align: center;
            color: #4a544e;
          }
          .empty-icon-wrap {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #eaf1ec;
            color: #1a4d3e;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }
          .checkout-page__empty h2 {
            font-size: 24px;
            font-weight: 700;
            color: #122b22;
            margin: 0 0 8px;
          }
          .checkout-page__empty p {
            font-size: 15px;
            color: #636d65;
            margin: 0 0 24px;
            max-width: 360px;
          }
          .checkout-page__btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          .checkout-page__btn--solid {
            background: #8f3554;
            color: #fff;
            box-shadow: 0 4px 14px rgba(143, 53, 84, 0.25);
          }
          .checkout-page__btn--solid:hover {
            background: #7a2b45;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <main className="checkout-page__wrap">
        {/* Header Breadcrumbs / Title */}
        <header className="checkout-header">
          <div className="checkout-header__badge">Fast & Secure Checkout</div>
          <h1 className="checkout-page__title">Complete Your Order</h1>
        </header>

        <div className="checkout-page__grid">
          {/* Main Left Column (Form, Order Review & Payment) */}
          <section className="checkout-main">
            {/* Shipping Form Card */}
            <div className="checkout-card">
              <div className="checkout-card__header">
                <span className="step-number">1</span>
                <div>
                  <h2 className="checkout-card__title">Shipping Address</h2>
                  <p className="checkout-card__sub">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-form__grid">
                <label className="checkout-field">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={errors.name ? "checkout-field__error" : ""}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <small className="error-text">Please enter your full name</small>}
                </label>

                <label className="checkout-field">
                  <span>Phone Number *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={errors.phone ? "checkout-field__error" : ""}
                    placeholder="98765 43210"
                  />
                  {errors.phone && <small className="error-text">Phone number is required</small>}
                </label>

                <label className="checkout-field checkout-field--full">
                  <span>Street Address *</span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={errors.address ? "checkout-field__error" : ""}
                    placeholder="Flat / House No., Building, Street Name"
                  />
                  {errors.address && <small className="error-text">Address is required</small>}
                </label>

                <label className="checkout-field">
                  <span>City *</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={errors.city ? "checkout-field__error" : ""}
                    placeholder="Pune"
                  />
                  {errors.city && <small className="error-text">City is required</small>}
                </label>

                <label className="checkout-field">
                  <span>Pincode *</span>
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={(e) => updateField("pincode", e.target.value)}
                    className={errors.pincode ? "checkout-field__error" : ""}
                    placeholder="411001"
                  />
                  {errors.pincode && <small className="error-text">Pincode is required</small>}
                </label>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="checkout-card">
              <div className="checkout-card__header">
                <span className="step-number">2</span>
                <div>
                  <h2 className="checkout-card__title">Order Review ({itemCount} {itemCount === 1 ? "item" : "items"})</h2>
                  <p className="checkout-card__sub">Verify items in your cart</p>
                </div>
              </div>

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
                          sizes="72px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="checkout-item__info">
                        <p className="checkout-item__name">{it.product.name}</p>
                        {(it.color || it.size) && (
                          <div className="checkout-item__tags">
                            {it.color && <span className="tag">Color: {it.color}</span>}
                            {it.size && <span className="tag">Size: {it.size}</span>}
                          </div>
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
            </div>

            {/* Payment Section Card */}
            <div className="checkout-card">
              <div className="checkout-card__header">
                <span className="step-number">3</span>
                <div>
                  <h2 className="checkout-card__title">Payment via UPI / GPay</h2>
                  <p className="checkout-card__sub">Scan QR code or click to pay directly</p>
                </div>
              </div>

              <div className="checkout-payment">
                <div className="checkout-payment__qr-box">
                  <Image
                    src="/gpay-qr.png"
                    alt="Scan to pay via GPay"
                    width={150}
                    height={150}
                    className="qr-img"
                  />
                  <span className="qr-tag">Scan to Pay</span>
                </div>

                <div className="checkout-payment__info">
                  <a href={gpayLink} className="checkout-page__btn checkout-page__btn--gpay">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                    Pay ₹{total.toLocaleString("en-IN")} via GPay
                  </a>

                  <div className="upi-copy-box">
                    <span>UPI ID: <strong>{UPI_ID}</strong></span>
                    <button type="button" onClick={handleCopyUpi} className="copy-btn">
                      {copiedUpi ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <p className="checkout-payment__note">
                    Tap the button above on mobile, or scan the QR code with any UPI app (GPay, PhonePe, Paytm). After payment, click <strong>&quot;I&apos;ve Paid — Confirm Order&quot;</strong> below.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column (Sticky Order Summary) */}
          <aside className="checkout-sidebar">
            <div className="checkout-summary">
              <h2 className="checkout-summary__title">Order Summary</h2>

              <div className="checkout-summary__rows">
                <div className="checkout-summary__row">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="checkout-summary__row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "free-shipping" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="free-shipping-note">
                    Add ₹{(1000 - subtotal).toLocaleString("en-IN")} more for <strong>FREE Shipping</strong>
                  </div>
                )}
              </div>

              <div className="checkout-summary__divider" />

              <div className="checkout-summary__row checkout-summary__row--total">
                <div>
                  <span>Total Payable</span>
                  <small className="tax-inclusive">Inclusive of all taxes</small>
                </div>
                <span className="total-amount">₹{total.toLocaleString("en-IN")}</span>
              </div>

              <div className="checkout-summary__actions">
                <button
                  type="button"
                  className="checkout-page__btn checkout-page__btn--solid checkout-page__btn--full"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                >
                  {placing ? (
                    <span className="btn-loading">
                      <span className="spinner"></span> Placing Order...
                    </span>
                  ) : (
                    "I've Paid — Confirm Order"
                  )}
                </button>

                <Link href="/cart" className="checkout-page__btn checkout-page__btn--outline checkout-page__btn--full">
                  Return to Cart
                </Link>
              </div>

              <div className="checkout-trust">
                <div className="trust-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Encrypted & Safe Payments</span>
                </div>
                <div className="trust-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>100% Authentic Sports Gear</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`
        .checkout-page {
          --ck-primary: #184334;
          --ck-primary-light: #e8f0eb;
          --ck-accent: #8f3554;
          --ck-accent-hover: #752942;
          --ck-bg: #f9f8f4;
          --ck-card-bg: #ffffff;
          --ck-text-main: #13241d;
          --ck-text-muted: #5e6963;
          --ck-border: #e2ded4;

          min-height: 100vh;
          background: var(--ck-bg);
          font-family: "Jost", "DM Sans", -apple-system, sans-serif;
          color: var(--ck-text-main);
          padding-bottom: 80px;
        }

        .checkout-page__wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 24px 20px 0;
        }

        /* Header */
        .checkout-header {
          margin-bottom: 24px;
        }
        .checkout-header__badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--ck-primary-light);
          color: var(--ck-primary);
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 8px;
        }
        .checkout-page__title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 34px;
          font-weight: 600;
          color: var(--ck-text-main);
          margin: 0;
          line-height: 1.15;
        }

        /* Main Responsive Layout Grid */
        .checkout-page__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }

        /* Cards Styling */
        .checkout-main {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .checkout-card {
          background: var(--ck-card-bg);
          border: 1px solid var(--ck-border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .checkout-card__header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--ck-border);
        }
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--ck-primary);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .checkout-card__title {
          font-size: 17px;
          font-weight: 700;
          margin: 0;
          color: var(--ck-text-main);
        }
        .checkout-card__sub {
          font-size: 13px;
          color: var(--ck-text-muted);
          margin: 2px 0 0;
        }

        /* Form Inputs */
        .checkout-form__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .checkout-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--ck-text-main);
        }
        .checkout-field--full {
          grid-column: 1 / -1;
        }
        .checkout-field input {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid var(--ck-border);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: inherit;
          color: var(--ck-text-main);
          background: #fcfcf9;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .checkout-field input:focus {
          outline: none;
          border-color: var(--ck-primary);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(24, 67, 52, 0.1);
        }
        .checkout-field input.checkout-field__error {
          border-color: #d32f2f;
          background: #fff8f8;
        }
        .error-text {
          color: #d32f2f;
          font-size: 11.5px;
          font-weight: 500;
        }

        /* Items List */
        .checkout-items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .checkout-item {
          display: grid;
          grid-template-columns: 64px 1fr auto;
          gap: 16px;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px dashed var(--ck-border);
        }
        .checkout-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .checkout-item__img {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: var(--ck-primary-light);
          overflow: hidden;
          padding: 4px;
        }
        .checkout-item__name {
          margin: 0;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--ck-text-main);
          line-height: 1.3;
        }
        .checkout-item__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .tag {
          font-size: 11px;
          background: #eeece6;
          color: #434c46;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .checkout-item__qty {
          margin: 4px 0 0;
          font-size: 12.5px;
          color: var(--ck-text-muted);
        }
        .checkout-item__price {
          font-size: 15px;
          font-weight: 700;
          color: var(--ck-text-main);
        }

        /* Payment Component */
        .checkout-payment {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: var(--ck-primary-light);
          border-radius: 14px;
          padding: 20px;
        }
        .checkout-payment__qr-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--ck-border);
          width: fit-content;
          margin: 0 auto;
        }
        .qr-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--ck-primary);
          margin-top: 8px;
          letter-spacing: 0.05em;
        }
        .checkout-payment__info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .upi-copy-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: 1px solid var(--ck-border);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px;
        }
        .copy-btn {
          background: var(--ck-primary-light);
          color: var(--ck-primary);
          border: none;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .checkout-payment__note {
          margin: 0;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ck-text-muted);
        }

        /* Summary Sidebar */
        .checkout-summary {
          background: var(--ck-card-bg);
          border: 1px solid var(--ck-border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }
        .checkout-summary__title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
        }
        .checkout-summary__rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .checkout-summary__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: var(--ck-text-main);
        }
        .free-shipping {
          color: #2e7d32;
          font-weight: 700;
        }
        .free-shipping-note {
          font-size: 12px;
          background: #f0f7f3;
          color: #1b5e20;
          padding: 8px 10px;
          border-radius: 6px;
          margin-top: 4px;
        }
        .checkout-summary__divider {
          height: 1px;
          background: var(--ck-border);
          margin: 18px 0;
        }
        .checkout-summary__row--total {
          font-size: 16px;
          font-weight: 700;
        }
        .tax-inclusive {
          display: block;
          font-size: 11px;
          font-weight: 400;
          color: var(--ck-text-muted);
        }
        .total-amount {
          font-size: 22px;
          color: var(--ck-primary);
        }

        .checkout-summary__actions {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Buttons */
        .checkout-page__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1.5px solid transparent;
          text-decoration: none;
        }
        .checkout-page__btn--full {
          width: 100%;
          box-sizing: border-box;
        }
        .checkout-page__btn--solid {
          background: var(--ck-accent);
          color: #fff;
          border-color: var(--ck-accent);
          box-shadow: 0 4px 14px rgba(143, 53, 84, 0.25);
        }
        .checkout-page__btn--solid:hover:not(:disabled) {
          background: var(--ck-accent-hover);
          transform: translateY(-1px);
        }
        .checkout-page__btn--solid:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .checkout-page__btn--outline {
          background: transparent;
          border-color: var(--ck-border);
          color: var(--ck-text-main);
        }
        .checkout-page__btn--outline:hover {
          background: #f4f2eb;
        }
        .checkout-page__btn--gpay {
          background: #1a73e8;
          color: #fff;
        }
        .checkout-page__btn--gpay:hover {
          background: #1557b0;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Trust badges */
        .checkout-trust {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--ck-border);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--ck-text-muted);
        }

        /* Responsive Breakpoints */

        /* Tablet (640px and up) */
        @media (min-width: 640px) {
          .checkout-page__title {
            font-size: 38px;
          }
          .checkout-payment {
            flex-direction: row;
            align-items: center;
          }
          .checkout-payment__qr-box {
            margin: 0;
            flex-shrink: 0;
          }
        }

        /* Laptop & Desktop (1024px and up) */
        @media (min-width: 1024px) {
          .checkout-page__grid {
            grid-template-columns: 1fr 380px;
            gap: 32px;
          }
          .checkout-sidebar {
            position: sticky;
            top: 96px;
          }
        }
      `}</style>
    </div>
  );
}