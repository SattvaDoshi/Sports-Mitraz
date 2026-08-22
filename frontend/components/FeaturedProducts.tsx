"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
}

const CATEGORY_IMAGES: Record<string, string> = {
  "auction-accessories": "/auction.jpg",
  "trophies-medals": "/trophies.jpg",
  "custom-jerseys": "/jerseys.jpg",
  "printing-services": "/printing.jpg",
  "sports-accessories": "/sports-accessories.jpg",
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "AUCTION ACCESSORIES",
    slug: "auction-accessories",
    description: "Paddles, Table Tops, Bails, Keychains, Boards, Ladders & more.",
    image: "/auction.jpg",
  },
  {
    id: 2,
    name: "TROPHIES & MEDALS",
    slug: "trophies-medals",
    description: "Acrylic, Metal, Fibre Trophies, Momentos, Medals & Certificates.",
    image: "/trophies.jpg",
  },
  {
    id: 3,
    name: "CUSTOM JERSEYS",
    slug: "custom-jerseys",
    description: "Sublimation Jerseys, Plain Jerseys with Logo, T-Shirts, Tracksuits & more.",
    image: "/jerseys.jpg",
  },
  {
    id: 4,
    name: "PRINTING SERVICES",
    slug: "printing-services",
    description: "Banners, Posters, Flex, Standees, Backdrops & much more.",
    image: "/printing.jpg",
  },
  {
    id: 5,
    name: "SPORTS ACCESSORIES",
    slug: "sports-accessories",
    description: "Sports Equipment, Caps, Bags, Water Bottles & many more.",
    image: "/sports-accessories.jpg",
  },
];

export const FeaturedProducts: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setCategories(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load featured categories:", err);
      });
  }, []);

  return (
    <section id="products">
      <div className="container">
        <div className="section-title">
          <h2>OUR PRODUCTS</h2>
          <div className="underline"></div>
        </div>
        <div className="products">
          {categories.map((cat) => (
            <article className="card" key={cat.id || cat.slug}>
              <div className="card-img">
                <img
                  src={cat.image || CATEGORY_IMAGES[cat.slug] || "/hero-slide-1.jpg"}
                  alt={cat.name}
                />
              </div>
              <div className="card-body">
                <h3>{cat.name.toUpperCase()}</h3>
                <p>{cat.description}</p>
                <Link className="link" href={`/products/${cat.slug}`}>
                  VIEW PRODUCTS →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};