"use client";

import React from "react";
import Link from "next/link";

export interface CatalogItem {
  title: string;
  img: string;
  desc: string;
  tags: string[];
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
          {items.map((item, idx) => (
            <article className="pcard" key={idx}>
              <img src={item.img} alt={item.title} />
              <div className="body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="tags">
                  {item.tags.map((tag, tIdx) => (
                    <span className="tag" key={tIdx}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className={`btn ${idx % 2 === 0 ? "btn-pink" : "btn-lime"}`}
                >
                  REQUEST QUOTE →
                </Link>
              </div>
            </article>
          ))}
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