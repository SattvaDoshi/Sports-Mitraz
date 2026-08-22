"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  startingPrice: number | null;
  images: string[];
  catalogPdfUrl: string | null;
  tags: string[];
  category: { name: string; slug: string };
}

const FALLBACK_IMAGES = [
  "/hero-slide-1.jpg",
  "/hero-slide-2.jpg",
  "/hero-slide-3.jpg",
  "/hero-slide-4.jpg",
];

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const itemSlug = searchParams.get("item") || "";

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!itemSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${itemSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [itemSlug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "60px", textAlign: "center", color: "#62686f" }}>
        Loading product details...
      </div>
    );
  }

  if (notFound || !product) {
    // Fallback for items without a DB entry (graceful degradation)
    const formattedTitle = itemSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return (
      <ProductDetail
        product={{
          id: itemSlug,
          title: formattedTitle,
          mainImage: "/hero-slide-1.jpg",
          gallery: FALLBACK_IMAGES,
          description: `High-quality customized ${formattedTitle.toLowerCase()} designed for sports events, tournaments, and corporate branding. Built with durable material and precision printing.`,
          startingPrice: 1200,
        }}
      />
    );
  }

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : FALLBACK_IMAGES;

  return (
    <ProductDetail
      product={{
        id: String(product.id),
        title: product.name,
        mainImage: gallery[0],
        gallery,
        description: product.description,
        startingPrice: product.startingPrice || 1200,
        catalogPdfUrl: product.catalogPdfUrl || undefined,
      }}
    />
  );
}

export default function ProductDetailsPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="container" style={{ padding: "60px", textAlign: "center" }}>
              Loading...
            </div>
          }
        >
          <ProductDetailsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}