"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCart, CustomQuoteDetails } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getDirectImageUrl } from "@/lib/driveImage";

interface ProductDetailProps {
  product?: {
    id: string;
    title: string;
    category?: string;
    mainImage: string;
    gallery: string[];
    description: string;
    startingPrice: number;
    priceType?: "starting" | "fixed";
    sizes?: string[];
    catalogPdfUrl?: string;
    averageRating?: number;
    totalRatings?: number;
    isBestseller?: boolean;
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product = {
    id: "prod-1200",
    title: "Cricket Trophy",
    category: "Trophies",
    mainImage: "/hero-slide-1.jpg",
    gallery: [
      "/hero-slide-1.jpg",
      "/hero-slide-2.jpg",
      "/hero-slide-3.jpg",
      "/hero-slide-4.jpg",
    ],
    description:
      "Premium quality cricket trophy, perfect for tournaments, school events, corporate leagues and more. Can be customized with logo, name and event details.",
    startingPrice: 100,
    priceType: "starting",
    sizes: ["S", "M", "L", "XL"],
    catalogPdfUrl: "/sample-catalog.pdf",
    averageRating: 4.8,
    totalRatings: 128,
    isBestseller: true,
  },
}) => {
  const { addToCart } = useCart();
  const router = useRouter();

  // Ref to handle auto-scrolling to the quote section
  const formRef = useRef<HTMLDivElement | null>(null);

  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [formAction, setFormAction] = useState<"buy_now" | "add_to_cart" | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  const { isAuthenticated, setShowAuthModal, user } = useAuth();
  const [pendingBuyNow, setPendingBuyNow] = useState(false);

  // Rating State
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [currentAvg, setCurrentAvg] = useState<number>(product.averageRating || 4.8);
  const [currentTotal, setCurrentTotal] = useState<number>(product.totalRatings || 128);

  const [formData, setFormData] = useState<CustomQuoteDetails>({
    name: "",
    mobile: "",
    email: "",
    requirement: product.title,
    message: "",
  });

  useEffect(() => {
    setCurrentAvg(product.averageRating || 4.8);
    setCurrentTotal(product.totalRatings || 128);
  }, [product.averageRating, product.totalRatings]);

  useEffect(() => {
    if (product?.mainImage) {
      setActiveImage(product.mainImage);
    }
  }, [product?.mainImage]);

  useEffect(() => {
    if (pendingBuyNow && isAuthenticated) {
      setPendingBuyNow(false);
      setFormAction("buy_now");
      setFormData((prev) => ({
        ...prev,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile,
      }));
    }
  }, [pendingBuyNow, isAuthenticated, user]);

  // Scroll smooth to the form whenever formAction becomes active
  useEffect(() => {
    if (formAction !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [formAction]);

  const handleRatingSubmit = async (selectedRating: number) => {
    if (isSubmittingRating) return;
    setIsSubmittingRating(true);
    setRating(selectedRating);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/products/${product.id}/rate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: selectedRating }),
        }
      );
      const data = await res.json();
      if (data.success && data.data) {
        setCurrentAvg(data.data.averageRating);
        setCurrentTotal(data.data.totalRatings);
        toast.success("Thank you for your rating!");
      } else {
        toast.error(data.message || "Failed to submit rating");
      }
    } catch (err) {
      toast.error("Failed to submit rating");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoteSubmitted(true);

    addToCart({
      id: `${product.id}-${Date.now()}`,
      title: product.title,
      price: product.startingPrice,
      img: activeImage,
      quantity: quantity,
      customization: formData,
      size: formData.requirement,
    });

    if (formAction === "buy_now") {
      router.push("/checkout");
    } else {
      toast.success("Custom details saved and added to cart!");
      setFormAction(null);
    }
  };

  const handleAddToCart = () => {
    if (formAction === "add_to_cart") {
      // Toggle off if clicked again
      setFormAction(null);
      return;
    }
    setFormAction("add_to_cart");
    if (isAuthenticated) {
      setFormData((prev) => ({
        ...prev,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile,
      }));
    }
  };

  const handleBuyNowClick = () => {
    if (formAction === "buy_now") {
      setFormAction(null);
      return;
    }

    if (!isAuthenticated) {
      setPendingBuyNow(true);
      setShowAuthModal(true);
    } else {
      setFormAction("buy_now");
      setFormData((prev) => ({
        ...prev,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile,
      }));
    }
  };

  const activeIndex = product.gallery.indexOf(activeImage);

  return (
    <div className="pd-wrapper">
      {/* Breadcrumbs */}
      <nav className="pd-breadcrumbs container">
        <span>Home</span> / <span>Products</span> / <span>{product.category || "Trophies"}</span> /{" "}
        <strong className="pd-breadcrumb-current">{product.title}</strong>
      </nav>

      <div className="pd-container container">
        <div className="pd-grid">
          {/* Gallery Container */}
          <div className="pd-gallery-container">
            {/* Desktop Side Thumbnails */}
            <div className="pd-thumbs-desktop">
              {product.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className={`pd-thumb-box ${activeImage === imgUrl ? "active" : ""}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img src={getDirectImageUrl(imgUrl)} alt={`${product.title} thumb ${idx}`} />
                </div>
              ))}
            </div>

            {/* Main Stage */}
            <div className="pd-main-stage">
              <img
                src={getDirectImageUrl(activeImage)}
                alt={product.title}
                className="pd-main-image"
              />
            </div>

            {/* Mobile Thumbnails */}
            <div className="pd-thumbs-mobile">
              {product.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className={`pd-thumb-box ${activeImage === imgUrl ? "active" : ""}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img src={getDirectImageUrl(imgUrl)} alt={`${product.title} thumb ${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pd-info">
            {product.isBestseller && <span className="pd-badge">BEST SELLER</span>}

            <h1 className="pd-title">{product.title}</h1>

            {/* Rating Section */}
            <div className="pd-rating-row">
              <span className="pd-stars">★★★★★</span>
              <span className="pd-rating-val">{Number(currentAvg).toFixed(1)}</span>
              <span className="pd-rating-count">({currentTotal} reviews)</span>
              <span className="pd-divider">|</span>
              <button className="pd-review-link">Write a review</button>
            </div>

            <p className="pd-description">{product.description}</p>

            {/* Price */}
            <div className="pd-price-row">
              <span className="pd-price-text">
                {product.priceType === "fixed" ? "Rs." : "Starting from Rs."}{" "}
                <span className="pd-price-amount">
                  {(Number(product?.startingPrice) || 0).toFixed(2)}
                </span>
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="pd-qty-cart-row">
              <div className="pd-qty-selector">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="pd-qty-btn"
                >
                  -
                </button>
                <span className="pd-qty-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="pd-qty-btn"
                >
                  +
                </button>
              </div>

              <button className="btn-cart" onClick={handleAddToCart}>
                🛒 ADD TO CART
              </button>
            </div>

            {/* Buy Now & Catalog Buttons */}
            <div className="pd-secondary-actions">
              <button className="btn-buy-now" onClick={handleBuyNowClick}>
                BUY NOW
              </button>

              <a
                href={product.catalogPdfUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-catalog"
              >
                📄 VIEW CATALOG (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Custom Order Form Accordion / Section */}
        {formAction !== null && (
          <section className="contact-wrap pd-quote-section" ref={formRef}>
            {/* {formAction === "add_to_cart" && (
              <div className="pd-redirect-note">
                📌 <strong>Please fill out this form to save your product details and add it to your cart.</strong>
              </div>
            )} */}

            <div className="info-box">
              <h3>Custom Order Details</h3>
              <p>Fill out the details below to proceed with your customized item.</p>
              <div className="pd-instructions">
                <strong>Ordering Instructions:</strong>
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
                <button className="btn-buy-now" type="submit">
                  SAVE & ADD TO CART
                </button>
              </div>
            </form>
          </section>
        )}
      </div>

      <style jsx>{`
        .pd-wrapper {
          background-color: #fff;
          color: #333;
          font-family: inherit;
        }

        .pd-breadcrumbs {
          padding: 16px 0;
          font-size: 0.85rem;
          color: #777;
        }

        .pd-breadcrumb-current {
          color: #222;
        }

        .pd-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }

        .pd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        /* Gallery Layout */
        .pd-gallery-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pd-thumbs-desktop {
          display: none;
        }

        .pd-main-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
        }

        .pd-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pd-thumbs-mobile {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .pd-thumb-box {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          flex-shrink: 0;
        }

        .pd-thumb-box.active {
          border-color: #ff007a;
        }

        .pd-thumb-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Product Info */
        .pd-badge {
          display: inline-block;
          background-color: #ffeef4;
          color: #ff007a;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
          margin-bottom: 8px;
        }

        .pd-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 8px;
          color: #111;
        }

        .pd-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          margin-bottom: 12px;
        }

        .pd-stars {
          color: #ffb400;
          letter-spacing: 1px;
        }

        .pd-rating-val {
          font-weight: 600;
          color: #333;
        }

        .pd-rating-count {
          color: #777;
        }

        .pd-divider {
          color: #ccc;
          margin: 0 4px;
        }

        .pd-review-link {
          background: none;
          border: none;
          color: #777;
          text-decoration: underline;
          cursor: pointer;
          font-size: 0.88rem;
          padding: 0;
        }

        .pd-description {
          color: #666;
          font-size: 0.92rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .pd-price-row {
          margin-bottom: 20px;
        }

        .pd-price-text {
          color: #ff007a;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .pd-price-amount {
          font-size: 1.5rem;
        }

        /* Action Controls */
        .pd-qty-cart-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .pd-qty-selector {
          display: flex;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fafafa;
          overflow: hidden;
        }

        .pd-qty-btn {
          width: 36px;
          height: 44px;
          border: none;
          background: transparent;
          font-size: 1.1rem;
          color: #666;
          cursor: pointer;
        }

        .pd-qty-value {
          width: 32px;
          text-align: center;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .btn-cart {
          flex: 1;
          background-color: #76c800;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .btn-cart:hover {
          background-color: #68b300;
        }

        .pd-secondary-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-buy-now {
          width: 100%;
          background-color: #ff007a;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px;
          cursor: pointer;
          text-align: center;
          transition: background 0.2s;
        }

        .btn-buy-now:hover {
          background-color: #e0006b;
        }

        .btn-catalog {
          width: 100%;
          border: 1.5px solid #ff007a;
          color: #ff007a;
          background: #fff;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 12px;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .btn-catalog:hover {
          background-color: #ffeef4;
        }

        /* Form styling */
        .pd-quote-section {
          margin-top: 32px;
          padding: 24px;
          background: #fbfbfb;
          border-radius: 12px;
          border: 1px solid #eee;
          scroll-margin-top: 20px;
        }

        .pd-redirect-note {
          background-color: #e7f5ff;
          color: #0056b3;
          border: 1px solid #b3d7ff;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .pd-instructions {
          margin-top: 12px;
          padding: 12px;
          background-color: #ffeef4;
          border-radius: 6px;
          border-left: 4px solid #ff007a;
        }

        .pd-instructions-text {
          margin: 4px 0 0 0;
          font-size: 0.85rem;
        }

        /* Responsive Breakpoints */
        @media (min-width: 768px) {
          .pd-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }

          .pd-gallery-container {
            flex-direction: row;
          }

          .pd-thumbs-desktop {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .pd-thumbs-mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};