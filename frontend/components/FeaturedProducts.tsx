"use client";

import React from "react";
import Link from "next/link";

export const FeaturedProducts: React.FC = () => {
  return (
    <section id="products">
      <div className="container">
        <div className="section-title">
          <h2>OUR PRODUCTS</h2>
          <div className="underline"></div>
        </div>
        <div className="products">
          <article className="card">
            <div className="card-img"><img src="/auction.jpg" alt="Auction Accessories" /></div>
            <div className="card-body">
              <h3>AUCTION ACCESSORIES</h3>
              <p>Paddles, Table Tops, Bails, Keychains, Boards, Ladders & more.</p>
              <Link className="link" href="/products/auction-accessories">VIEW PRODUCTS →</Link>
            </div>
          </article>
          <article className="card">
            <div className="card-img"><img src="/trophies.jpg" alt="Trophies & Medals" /></div>
            <div className="card-body">
              <h3>TROPHIES & MEDALS</h3>
              <p>Acrylic, Metal, Fibre Trophies, Momentos, Medals & Certificates.</p>
              <Link className="link" href="/products/trophies-medals">VIEW PRODUCTS →</Link>
            </div>
          </article>
          <article className="card">
            <div className="card-img"><img src="/jerseys.jpg" alt="Custom Jerseys" /></div>
            <div className="card-body">
              <h3>CUSTOM JERSEYS</h3>
              <p>Sublimation Jerseys, Plain Jerseys with Logo, T-Shirts, Tracksuits & more.</p>
              <Link className="link" href="/products/custom-jerseys">VIEW PRODUCTS →</Link>
            </div>
          </article>
          <article className="card">
            <div className="card-img"><img src="/printing.jpg" alt="Printing Services" /></div>
            <div className="card-body">
              <h3>PRINTING SERVICES</h3>
              <p>Banners, Posters, Flex, Standees, Backdrops & much more.</p>
              <Link className="link" href="/products/printing-services">VIEW PRODUCTS →</Link>
            </div>
          </article>
          <article className="card">
            <div className="card-img"><img src="/sports-accessories.jpg" alt="Sports Accessories" /></div>
            <div className="card-body">
              <h3>SPORTS ACCESSORIES</h3>
              <p>Sports Equipment, Caps, Bags, Water Bottles & many more.</p>
              <Link className="link" href="/products/sports-accessories">VIEW PRODUCTS →</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};