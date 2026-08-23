"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const slideData = [
  {
    img: "/hero-slide-1.jpg",
    title: <>Premium <span>Acrylic Trophies</span></>,
    desc: "for Every Champion",
    features: [
      { icon: "◇", text: <>Premium<br/>Quality</> },
      { icon: "✧", text: <>Fully<br/>Customizable</> },
      { icon: "☆", text: <>Perfect for<br/>Every Event</> }
    ],
    btnText: "VIEW COLLECTION →",
    btnLink: "/products/trophies-medals"
  },
  {
    img: "/hero-slide-2.jpg",
    title: <>Custom <span>Team Jerseys</span></>,
    desc: "Built around your colours, players and sponsors.",
    features: [
      { icon: "👕", text: <>Full<br/>Sublimation</> },
      { icon: "#", text: <>Name &<br/>Number</> },
      { icon: "✓", text: <>Bulk Team<br/>Orders</> }
    ],
    btnText: "VIEW JERSEYS →",
    btnLink: "/products/custom-jerseys"
  },
  {
    img: "/hero-slide-3.jpg",
    title: <>Professional <span>Auction Accessories</span></>,
    desc: "Make your player auction look organised and premium.",
    features: [
      { icon: "01", text: <>Paddles &<br/>Boards</> },
      { icon: "◆", text: <>Custom<br/>Branding</> },
      { icon: "⚡", text: <>Fast Event<br/>Turnaround</> }
    ],
    btnText: "VIEW AUCTION ITEMS →",
    btnLink: "/products/auction-accessories"
  },
  {
    img: "/hero-slide-4.jpg",
    title: <>Complete <span>Event Printing</span></>,
    desc: "Banners, standees, sponsor backdrops and venue branding.",
    features: [
      { icon: "▣", text: <>Large<br/>Format</> },
      { icon: "✎", text: <>Custom<br/>Design</> },
      { icon: "✓", text: <>Event<br/>Ready</> }
    ],
    btnText: "VIEW PRINTING →",
    btnLink: "/products/printing-services"
  },
  {
    img: "/hero-slide-5.jpg",
    title: <>Useful <span>Sports Accessories</span></>,
    desc: "Equipment and branded products for teams and tournaments.",
    features: [
      { icon: "●", text: <>Team<br/>Gear</> },
      { icon: "✦", text: <>Custom<br/>Products</> },
      { icon: "✓", text: <>Bulk<br/>Orders</> }
    ],
    btnText: "VIEW ACCESSORIES →",
    btnLink: "/products/sports-accessories"
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slideData.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slideData.length) % slideData.length);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-left">
          <h1>
            Everything Your<br />
            Sports Event Needs <span>— Under One Roof</span>
          </h1>
          <p>
            From custom jerseys to trophies, auction accessories to event management — We deliver it all with passion, quality & on-time commitment.
          </p>
          <div className="actions">
            <Link href="/products" className="btn btn-pink">
              EXPLORE PRODUCTS →
            </Link>
            <Link href="/contact" className="btn btn-lime">
              CONTACT US ◉
            </Link>
          </div>
        </div>

        <div 
          className="slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slideData.map((slide, idx) => (
            <div className={`slide ${idx === current ? "active" : ""}`} key={idx}>
              <img src={slide.img} alt={`Slide ${idx + 1}`} />
              <div className="slide-copy">
                <h2>{slide.title}</h2>
                <p>{slide.desc}</p>
                <div className="features-mini">
                  {slide.features.map((feat, fIdx) => (
                    <div className="feature-mini" key={fIdx}>
                      <i>{feat.icon}</i>
                      {feat.text}
                    </div>
                  ))}
                </div>
                <Link href={slide.btnLink} className="btn btn-white">
                  {slide.btnText}
                </Link>
              </div>
            </div>
          ))}
          <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous Slide">‹</button>
          <button className="slider-arrow next" onClick={nextSlide} aria-label="Next Slide">›</button>
          <div className="dots">
            {slideData.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === current ? "active" : ""}`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-ribbon"></div>
    </section>
  );
};