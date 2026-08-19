"use client";

import React from "react";
import Link from "next/link";

export interface CatalogItem {
  id?: string;
  title: string;
  img: string;
  desc: string;
  tags: string[];
  price?: number;
}

interface ProductCatalogGridProps {
  sectionTitle: string;
  description: string;
  items: CatalogItem[];
}

export const ProductCatalogGrid: React.FC<ProductCatalogGridProps> = ({
  sectionTitle,
  description,
  items,
}) => {
  return (
    <section>
      <div className="container">
        <div className="section-title left">
          <h2>{sectionTitle}</h2>
          <p>{description}</p>
          <div className="underline"></div>
        </div>
        <div className="catalog">
          {items.map((item, idx) => {
            const productSlug = item.title.toLowerCase().replace(/\s+/g, "-");
            const price = item.price || 1200;

            return (
              <article className="pcard" key={idx}>
                <img src={item.img} alt={item.title} />
                <div className="body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  
                  {/* Dynamic or fallback price starting tag */}
                  <p
                    style={{
                      color: "#e91e63",
                      fontWeight: "bold",
                      margin: "8px 0",
                      fontSize: "1rem",
                    }}
                  >
                    Starting from ₹{price}
                  </p>

                  <div className="tags">
                    {item.tags.map((tag, tIdx) => (
                      <span className="tag" key={tIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions" style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    <Link
                      href={`/products/details?item=${productSlug}`}
                      className="btn btn-lime"
                      style={{ flex: 1, textAlign: "center" }}
                    >
                      VIEW DETAILS
                    </Link>
                    <Link
                      href="/contact"
                      className="btn btn-pink"
                      style={{ flex: 1, textAlign: "center" }}
                    >
                      REQUEST QUOTE →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="quote-strip">
          <div>
            <h3>Need something more custom?</h3>
            <p>
              Share a photo, rough sketch or reference design and we can use
              it to understand your requirement.
            </p>
          </div>
          <Link className="btn btn-pink" href="/contact">
            SHARE REQUIREMENT →
          </Link>
        </div>
      </div>
    </section>
  );
};