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
    <div className="container" style={{ padding: "40px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Gallery */}
        <div>
          <img
            src={activeImage}
            alt={product.title}
            style={{ width: "100%", borderRadius: "8px", height: "400px", objectFit: "cover" }}
          />
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {product.gallery.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="thumb"
                onClick={() => setActiveImage(imgUrl)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: activeImage === imgUrl ? "2px solid #e91e63" : "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1>{product.title}</h1>
          <p style={{ fontSize: "1.2rem", margin: "15px 0", color: "#666" }}>
            {product.description}
          </p>
          <h2 style={{ color: "#e91e63", marginBottom: "20px" }}>
            Starting from ₹{product.startingPrice}
          </h2>

          {/* Catalog PDF Link Button */}
          <div style={{ marginBottom: "20px" }}>
            <a
              href={product.catalogPdfUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-pink"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              📄 VIEW CATALOG (PDF)
            </a>
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <button
              className="btn btn-pink"
              onClick={() => setShowQuoteForm(!showQuoteForm)}
            >
              {showQuoteForm ? "Hide Quote Form" : "REQUEST QUOTE"}
            </button>

            <button
              className="btn btn-lime"
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
            <p style={{ fontSize: "0.85rem", color: "#888" }}>
              * Please fill and submit the Request Quote form below to enable Add to Cart.
            </p>
          )}
        </div>
      </div>

      {/* Quote Form */}
      {showQuoteForm && (
        <section className="contact-wrap" style={{ marginTop: "40px" }}>
          <div className="info-box">
            <h3>Request Custom Quotation</h3>
            <p>Fill out the details below to unlock adding this customized item to your cart.</p>
            
            {/* Design Code Instructions Section */}
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                backgroundColor: "#fff3f8",
                borderRadius: "6px",
                borderLeft: "4px solid #e91e63",
              }}
            >
              <strong>💡 Ordering Instructions:</strong>
              <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem" }}>
                Browse our catalog using the button above and put the code of the design that you want in the quote form to get all the details.
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleQuoteSubmit}>
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
              <button className="btn btn-pink" type="submit">
                SAVE QUOTE DETAILS →
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};