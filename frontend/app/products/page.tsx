"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { CtaBand } from "../../components/CtaBand";
import { Footer } from "../../components/Footer";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  tags?: string[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  "auction-accessories": "/auction.jpg",
  "trophies-medals": "/trophies.jpg",
  "custom-jerseys": "/jerseys.jpg",
  "printing-services": "/printing.jpg",
  "sports-accessories": "/sports-accessories.jpg",
};

const CATEGORY_BTN: Record<string, string> = {
  "auction-accessories": "btn-pink",
  "trophies-medals": "btn-lime",
  "custom-jerseys": "btn-pink",
  "printing-services": "btn-lime",
  "sports-accessories": "btn-pink",
};

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      })
      .catch((err) => console.error("Failed to load categories:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section
          className="page-hero"
          style={{ "--hero": "url('/hero-slide-1.jpg')" } as React.CSSProperties}
        >
          <div className="container inner">
            <div className="page-copy">
              <div className="breadcrumb">Home / Products</div>
              <h1>
                Everything for Your <span>Sports Event</span>
              </h1>
              <p>
                Choose a category and send us your quantity, logo, names, sizes and event date.
                SportzMitra focuses on custom and bulk requirements rather than fixed-cart checkout.
              </p>
              <Link className="btn btn-pink" href="/contact">
                GET BULK QUOTE →
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "40px 0" }}>
          <div className="container">
            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "#62686f" }}>
                Loading categories...
              </div>
            ) : (
              <div className="catalog">
                {categories.map((cat) => (
                  <article className="pcard category-card" key={cat.id}>
                    <img
                      src={cat.image || CATEGORY_IMAGES[cat.slug] || "/hero-slide-1.jpg"}
                      alt={cat.name}
                    />
                    <div className="body">
                      <h3>{cat.name}</h3>
                      <p className="cat-desc">{cat.description}</p>
                      <div className="card-actions">
                        <Link
                          className={`btn ${CATEGORY_BTN[cat.slug] || "btn-pink"}`}
                          href={`/products/${cat.slug}`}
                        >
                          VIEW CATEGORY →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}