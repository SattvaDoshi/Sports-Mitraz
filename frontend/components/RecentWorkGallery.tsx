"use client";

import React from "react";

export const RecentWorkGallery: React.FC = () => {
  return (
    <section>
      <div className="container">
        <div className="section-title">
          <h2>OUR RECENT WORK</h2>
          <div className="underline"></div>
        </div>
        <div className="gallery">
          <img src="/printing.jpg" alt="Gallery item 1" />
          <img src="/trophies.jpg" alt="Gallery item 2" />
          <img src="/jerseys.jpg" alt="Gallery item 3" />
          <img src="/auction.jpg" alt="Gallery item 4" />
          <img src="/sports-accessories.jpg" alt="Gallery item 5" />
          <img src="/hero-slide-1.jpg" alt="Gallery item 6" />
        </div>
      </div>
    </section>
  );
};