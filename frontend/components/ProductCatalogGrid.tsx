"use client";

import React from "react";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/driveImage";

export interface CatalogItem {
  id?: string;
  slug?: string;
  categorySlug?: string;
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
  categorySlug?: string;
}

export const ProductCatalogGrid: React.FC<ProductCatalogGridProps> = ({
  sectionTitle,
  description,
  items,
  categorySlug,
}) => {
  return (
    <section style={{ marginBottom: "60px" }}>
      <div className="container">
        <div className="section-title left">
          <h2>{sectionTitle}</h2>
          <p>{description}</p>
          <div className="underline"></div>
        </div>
        <div className="catalog">
          {items.map((item, idx) => {
            // Prefer the backend slug passed as `slug` or `id`; fall back to deriving from title
            const productSlug = item.slug || item.id || item.title.toLowerCase().replace(/\s+/g, "-");
            const activeCategorySlug = item.categorySlug || categorySlug;
            const price = item.price || 1200;
            const detailUrl = activeCategorySlug
              ? `/products/${activeCategorySlug}/${productSlug}`
              : `/products/details?item=${productSlug}`;

            return (
              <article className="pcard" key={idx}>
                <div className="pc-img-wrap">
                  <img src={getDirectImageUrl(item.img)} alt={item.title} />
                </div>
                <div className="body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  
                  {/* Class added & inline margins removed */}
                  <p className="price-tag">
                    Starting from ₹{price}
                  </p>

                  <div className="tags">
                    {item.tags.map((tag, tIdx) => (
                      <span className="tag" key={tIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Inline marginTop removed */}
                  <div className="card-actions">
                    <Link
                      href={detailUrl}
                      className="btn btn-lime"
                    >
                      VIEW DETAILS
                    </Link>
                    <Link
                      href="/contact"
                      className="btn btn-pink"
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