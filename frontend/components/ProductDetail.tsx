"use client";

import React, { useState } from "react";
import { useCart, CustomQuoteDetails } from "@/context/CartContext";

interface ProductDetailProps {
  product?: {
    id: string;
    title: string;
    mainImage: string;
    gallery: string[];
    description: string;
    startingPrice: number;
    catalogPdfUrl?: string;
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product = {
    id: "prod-1200",
    title: "Premium Custom Sports Item",
    mainImage: "/assets/hero-slide-1.jpg",
    gallery: [
      "/assets/hero-slide-1.jpg",
      "/assets/hero-slide-2.jpg",
      "/assets/hero-slide-3.jpg",
      "/assets/hero-slide-4.jpg",
    ],
    description:
      "Fully customizable high-grade sports gear and event apparel designed for durability, vibrant colors, and premium finish.",
    startingPrice: 1200,
    catalogPdfUrl: "/assets/sample-catalog.pdf",
  },
}) => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  const [formData, setFormData] = useState<CustomQuoteDetails>({
    name: "",
    mobile: "",
    email: "",
    requirement: product.title,
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoteSubmitted(true);
    alert("Quote details saved! You can now add this item to your cart.");
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      title: product.title,
      price: product.startingPrice,
      img: activeImage,
      quantity: 1,
      customization: formData,
    });
  };

  return (
    <div className="pd-container container">
      <div className="pd-grid">
        {/* Gallery */}
        <div className="pd-gallery">
          <img src={activeImage} alt={product.title} className="pd-main-image" />
          <div className="pd-thumb-row">
            {product.gallery.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="thumb"
                onClick={() => setActiveImage(imgUrl)}
                className={`pd-thumb ${activeImage === imgUrl ? "pd-thumb-active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info">
          <h1 className="pd-title">{product.title}</h1>
          <p className="pd-description">{product.description}</p>
          <h2 className="pd-price">Starting from ₹{product.startingPrice}</h2>

          {/* Catalog PDF Link Button */}
          <div className="pd-catalog-row">
            <a
              href={product.catalogPdfUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-pink pd-catalog-btn"
            >
              📄 VIEW CATALOG (PDF)
            </a>
          </div>

          <div className="pd-action-row">
            <button
              className="btn btn-pink pd-action-btn"
              onClick={() => setShowQuoteForm(!showQuoteForm)}
            >
              {showQuoteForm ? "Hide Quote Form" : "REQUEST QUOTE"}
            </button>

            <button
              className="btn btn-lime pd-action-btn"
              disabled={!isQuoteSubmitted}
              onClick={handleAddToCart}
              style={{
                opacity: isQuoteSubmitted ? 1 : 0.5,
                cursor: isQuoteSubmitted ? "pointer" : "not-allowed",
              }}
            >
              ADD TO CART 🛒
            </button>
          </div>

          {!isQuoteSubmitted && (
            <p className="pd-hint">
              * Please fill and submit the Request Quote form below to enable Add to Cart.
            </p>
          )}
        </div>
      </div>

      {/* Quote Form */}
      {showQuoteForm && (
        <section className="contact-wrap pd-quote-section">
          <div className="info-box">
            <h3>Request Custom Quotation</h3>
            <p>Fill out the details below to unlock adding this customized item to your cart.</p>

            {/* Design Code Instructions Section */}
            <div className="pd-instructions">
              <strong>💡 Ordering Instructions:</strong>
              <p className="pd-instructions-text">
                Browse our catalog using the button above and put the code of the design that you
                want in the quote form to get all the details.
              </p>
            </div>
          </div>

          <form className="contact-form pd-form" onSubmit={handleQuoteSubmit}>
            <div className="field">
              <label>Name</label>
              <input
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>Mobile</label>
              <input
                name="mobile"
                required
                placeholder="+91"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>Requirement / Design Code</label>
              <input
                name="requirement"
                placeholder="e.g. Design Code #DR-104 / Custom Jersey"
                value={formData.requirement}
                onChange={handleInputChange}
              />
            </div>
            <div className="field full">
              <label>Message / Specifications</label>
              <textarea
                name="message"
                placeholder="Quantity, sizes, design codes, customization details..."
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="field full">
              <button className="btn btn-pink pd-submit-btn" type="submit">
                SAVE QUOTE DETAILS →
              </button>
            </div>
          </form>
        </section>
      )}

      <style jsx>{`
        /* ---------- Base (mobile-first) ---------- */
        .pd-container {
          padding: 24px 16px;
        }

        .pd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .pd-gallery {
          width: 100%;
        }

        .pd-main-image {
          width: 100%;
          border-radius: 8px;
          height: 260px;
          object-fit: cover;
          display: block;
        }

        .pd-thumb-row {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .pd-thumb {
          flex: 0 0 auto;
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid #ccc;
        }

        .pd-thumb-active {
          border: 2px solid #e91e63;
        }

        .pd-info {
          width: 100%;
        }

        .pd-title {
          font-size: 1.5rem;
          line-height: 1.25;
          margin: 0 0 10px 0;
        }

        .pd-description {
          font-size: 1rem;
          margin: 10px 0;
          color: #666;
        }

        .pd-price {
          color: #e91e63;
          font-size: 1.25rem;
          margin-bottom: 16px;
        }

        .pd-catalog-row {
          margin-bottom: 16px;
        }

        .pd-catalog-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-size: 0.85rem;
          width: 100%;
          justify-content: center;
        }

        .pd-action-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .pd-action-btn {
          width: 100%;
          text-align: center;
        }

        .pd-hint {
          font-size: 0.8rem;
          color: #888;
        }

        .pd-quote-section {
          margin-top: 32px;
        }

        .pd-instructions {
          margin-top: 15px;
          padding: 12px;
          background-color: #fff3f8;
          border-radius: 6px;
          border-left: 4px solid #e91e63;
        }

        .pd-instructions-text {
          margin: 5px 0 0 0;
          font-size: 0.85rem;
        }

        .pd-form :global(.field.full) {
          grid-column: 1 / -1;
        }

        .pd-submit-btn {
          width: 100%;
        }

        /* ---------- Tablet (≥640px) ---------- */
        @media (min-width: 640px) {
          .pd-container {
            padding: 32px 24px;
          }

          .pd-main-image {
            height: 340px;
          }

          .pd-thumb {
            width: 72px;
            height: 72px;
          }

          .pd-title {
            font-size: 1.75rem;
          }

          .pd-catalog-btn {
            width: auto;
            justify-content: flex-start;
          }

          .pd-action-row {
            flex-direction: row;
            gap: 15px;
          }

          .pd-action-btn {
            width: auto;
            flex: 1;
          }

          .pd-submit-btn {
            width: auto;
          }
        }

        /* ---------- Desktop / Laptop (≥1024px) ---------- */
        @media (min-width: 1024px) {
          .pd-container {
            padding: 40px 20px;
          }

          .pd-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .pd-main-image {
            height: 400px;
          }

          .pd-thumb-row {
            overflow-x: visible;
          }

          .pd-title {
            font-size: 2rem;
          }

          .pd-description {
            font-size: 1.2rem;
          }

          .pd-price {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};