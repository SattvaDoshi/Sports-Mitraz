"use client";

import React, { useState, useEffect } from "react";
import { useCart, CustomQuoteDetails } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getDirectImageUrl } from "@/lib/driveImage";

interface ProductDetailProps {
  product?: {
    id: string;
    title: string;
    mainImage: string;
    gallery: string[];
    description: string;
    startingPrice: number;
    catalogPdfUrl?: string;
    averageRating?: number;
    totalRatings?: number;
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product = {
    id: "prod-1200",
    title: "Premium Custom Sports Item",
    mainImage: "/hero-slide-1.jpg",
    gallery: [
      "/hero-slide-1.jpg",
      "/hero-slide-2.jpg",
      "/hero-slide-3.jpg",
      "/hero-slide-4.jpg",
      "/hero-slide-1.jpg",
      "/hero-slide-2.jpg",
      "/hero-slide-3.jpg",
      "/hero-slide-4.jpg",
    ],
    description:
      "Fully customizable high-grade sports gear and event apparel designed for durability, vibrant colors, and premium finish.",
    startingPrice: 1200,
    catalogPdfUrl: "/sample-catalog.pdf",
  },
}) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [formAction, setFormAction] = useState<"buy_now" | "add_to_cart" | null>(null);
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);
  
  const { isAuthenticated, setShowAuthModal, user } = useAuth();
  const [pendingBuyNow, setPendingBuyNow] = useState(false);

  // Rating State
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [currentAvg, setCurrentAvg] = useState<number>(product.averageRating || 0);
  const [currentTotal, setCurrentTotal] = useState<number>(product.totalRatings || 0);

  // Sync state if product changes
  useEffect(() => {
    setCurrentAvg(product.averageRating || 0);
    setCurrentTotal(product.totalRatings || 0);
  }, [product.averageRating, product.totalRatings]);

  const handleRatingSubmit = async (selectedRating: number) => {
    if (isSubmittingRating) return;
    setIsSubmittingRating(true);
    setRating(selectedRating);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${product.id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: selectedRating }),
      });
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



  useEffect(() => {
    if (pendingBuyNow && isAuthenticated) {
      setPendingBuyNow(false);
      setFormAction('buy_now');
      setFormData((prev) => ({
        ...prev,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile,
      }));
    }
  }, [pendingBuyNow, isAuthenticated, user]);

  useEffect(() => {
    if (product?.mainImage) {
      setActiveImage(product.mainImage);
    }
  }, [product?.mainImage]);

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

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoteSubmitted(true);
    
    addToCart({
      id: `${product.id}-${Date.now()}`,
      title: product.title,
      price: product.startingPrice,
      img: activeImage,
      quantity: 1,
      customization: formData,
    });
    
    if (formAction === 'buy_now') {
      router.push("/checkout");
    } else {
      toast.success("Custom details saved and added to cart!");
      setFormAction(null);
    }
  };

  const handleAddToCart = () => {
    if (formAction === 'add_to_cart') {
      setFormAction(null);
      return;
    }
    setFormAction('add_to_cart');
    if (isAuthenticated) {
      setFormData((prev) => ({
        ...prev,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile,
      }));
    }
  };

  const handleBuyNowClick = () => {
    if (formAction === 'buy_now') {
      setFormAction(null);
      return;
    }
    
    if (!isAuthenticated) {
      setPendingBuyNow(true);
      setShowAuthModal(true);
    } else {
      setFormAction('buy_now');
      setFormData((prev) => ({
        ...prev,
        email: user?.email || prev.email,
        mobile: user?.phone || prev.mobile,
      }));
    }
  };

  return (
    <div className="pd-container container">
      <div className="pd-grid">
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-image-wrap">
            <img
              src={getDirectImageUrl(activeImage)}
              alt={product.title}
              className="pd-main-image"
            />
          </div>
          <div className="pd-thumb-row">
            {product.gallery.map((imgUrl, idx) => (
              <img
                key={idx}
                src={getDirectImageUrl(imgUrl)}
                alt={`${product.title} view ${idx + 1}`}
                onClick={() => setActiveImage(imgUrl)}
                className={`pd-thumb ${activeImage === imgUrl ? "pd-thumb-active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info">
          <h1 className="pd-title">{product.title}</h1>
          
          <div className="pd-rating-section">
            <div className="pd-rating-display">
              <span className="pd-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(currentAvg) ? "star filled" : "star"}>★</span>
                ))}
              </span>
              <span className="pd-rating-text">
                {Number(currentAvg).toFixed(1)} ({currentTotal} {currentTotal === 1 ? 'rating' : 'ratings'})
              </span>
            </div>
            
            <div className="pd-rating-interactive">
              <span className="pd-rating-prompt">Rate this product:</span>
              <span className="pd-rating-stars interactive">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingSubmit(star)}
                  >
                    ★
                  </span>
                ))}
              </span>
            </div>
          </div>

          <p className="pd-description">{product.description}</p>
          <h2 className="pd-price">Starting from Rs.{product.startingPrice}</h2>

          <div className="pd-catalog-row">
            <a
              href={product.catalogPdfUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-pink pd-catalog-btn"
            >
              VIEW CATALOG (PDF)
            </a>
          </div>

          <div className="pd-action-row">
            <button
              className="btn btn-pink pd-action-btn"
              onClick={handleBuyNowClick}
            >
              {formAction === 'buy_now' ? "Hide Form" : "BUY NOW"}
            </button>

            <button
              className="btn btn-lime pd-action-btn"
              onClick={handleAddToCart}
            >
              {formAction === 'add_to_cart' ? "Hide Form" : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>

      {/* Buy Now / Order Form */}
      {formAction !== null && (
        <section className="contact-wrap pd-quote-section">
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
              <button className="btn btn-pink pd-submit-btn" type="submit">
                SAVE QUOTE DETAILS
              </button>
            </div>
          </form>
        </section>
      )}

      <style jsx>{`
        .pd-container {
          padding: clamp(16px, 4vw, 24px) clamp(12px, 4vw, 16px);
        }

        .pd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(20px, 5vw, 24px);
        }

        .pd-gallery {
          width: 100%;
          min-width: 0;
        }

        .pd-main-image-wrap {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
          background: #f1f1f1;
        }

        .pd-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.2s ease-in-out;
        }

        .pd-thumb-row {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .pd-thumb {
          flex: 0 0 auto;
          width: clamp(56px, 16vw, 72px);
          height: clamp(56px, 16vw, 72px);
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid transparent;
          opacity: 0.7;
          transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
        }

        .pd-thumb:hover {
          opacity: 1;
          transform: scale(1.03);
        }

        .pd-thumb-active {
          border-color: #e91e63;
          opacity: 1;
          box-shadow: 0 0 0 1px #e91e63;
        }

        .pd-info {
          width: 100%;
          min-width: 0;
        }

        .pd-title {
          font-size: clamp(1.35rem, 4vw, 2rem);
          line-height: 1.25;
          margin: 0 0 10px 0;
        }

        .pd-rating-section {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pd-rating-display {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pd-rating-interactive {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8f9fa;
          padding: 8px 12px;
          border-radius: 6px;
          display: inline-flex;
          width: fit-content;
        }

        .pd-rating-prompt {
          font-size: 0.9rem;
          color: #555;
          font-weight: 500;
        }

        .pd-rating-stars .star {
          color: #ddd;
          font-size: 1.2rem;
          margin-right: 2px;
        }
        
        .pd-rating-stars.interactive .star {
          cursor: pointer;
          transition: transform 0.1s, color 0.1s;
        }
        
        .pd-rating-stars.interactive .star:hover {
          transform: scale(1.2);
        }

        .pd-rating-stars .star.filled {
          color: #ffc107;
        }

        .pd-rating-text {
          font-size: 0.95rem;
          color: #666;
          font-weight: 500;
        }

        .pd-description {
          font-size: clamp(0.92rem, 2.2vw, 1.2rem);
          margin: 10px 0;
          color: #666;
          line-height: 1.6;
        }

        .pd-price {
          color: #e91e63;
          font-size: clamp(1.1rem, 3vw, 1.5rem);
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

        @media (min-width: 560px) {
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

        @media (min-width: 768px) {
          .pd-container {
            padding: 32px 24px;
          }

          .pd-grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 32px;
            align-items: start;
          }

          .pd-main-image-wrap {
            aspect-ratio: 1 / 1;
          }

          .pd-thumb-row {
            overflow-x: visible;
            flex-wrap: wrap;
          }
        }

        @media (min-width: 1024px) {
          .pd-container {
            padding: 40px 20px;
          }

          .pd-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .pd-main-image-wrap {
            aspect-ratio: 4 / 3;
          }
        }

        @media (min-width: 1440px) {
          .pd-grid {
            max-width: 1280px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};