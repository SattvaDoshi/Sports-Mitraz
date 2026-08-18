"use client";

import React from "react";
import Link from "next/link";

interface PageHeroProps {
  bgImage: string;
  breadcrumb: string;
  title: React.ReactNode;
  description: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  bgImage,
  breadcrumb,
  title,
  description,
  primaryBtnText = "GET CUSTOM QUOTE →",
  secondaryBtnText = "ALL PRODUCTS"
}) => {
  return (
    <section 
      className="page-hero" 
      style={{ "--hero": `url('${bgImage}')` } as React.CSSProperties}
    >
      <div className="container inner">
        <div className="page-copy">
          <div className="breadcrumb">{breadcrumb}</div>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="actions">
            <Link className="btn btn-pink" href="/contact">
              {primaryBtnText}
            </Link>
            <Link className="btn btn-lime" href="/products">
              {secondaryBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};