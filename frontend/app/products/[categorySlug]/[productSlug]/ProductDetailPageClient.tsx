"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  startingPrice: number | null;
  priceType?: string; // NEW
  sizes?: string[] | string | null; // NEW
  images: string[];
  catalogPdfUrl: string | null;
  tags: string[];
  category?: { name: string; slug: string };
  averageRating?: number | string; // NEW
  totalRatings?: number; // NEW
}

const FALLBACK_IMAGES = [
  "/hero-slide-1.jpg",
  "/hero-slide-2.jpg",
  "/hero-slide-3.jpg",
  "/hero-slide-4.jpg",
];

// NEW: handles an array, a "S, M, L" string, a JSON string like '["S","M"]', or null
function normalizeSizes(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((s) => String(s).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((s) => String(s).trim()).filter(Boolean);
        }
      } catch {
        // fall through to comma split
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

interface ClientPageProps {
  categorySlug: string;
  productSlug: string;
}

export function ProductDetailPageClient({ categorySlug, productSlug }: ClientPageProps) {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!productSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}`)
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
  }, [productSlug]);

  const formattedCategoryName = categorySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="container" style={{ padding: "80px 20px", textAlign: "center", color: "#62686f" }}>
            <h2>Loading product details...</h2>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    const formattedTitle = productSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return (
      <>
        <Header />
        <main>
          <div className="container" style={{ padding: "20px 20px 0" }}></div>
          <ProductDetail
            product={{
              id: productSlug,
              title: formattedTitle,
              mainImage: "/hero-slide-1.jpg",
              gallery: FALLBACK_IMAGES,
              description: `High-quality customized ${formattedTitle.toLowerCase()} designed for sports events, tournaments, and corporate branding. Built with durable material and precision printing.`,
              startingPrice: 1200,
            }}
          />
        </main>
        <Footer />
      </>
    );
  }

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : FALLBACK_IMAGES;

  return (
    <>
      <Header />
      <main>
        <div className="container" style={{ padding: "20px 20px 0" }}></div>
        <ProductDetail
          product={{
            id: String(product.id),
            title: product.name,
            category: product.category?.name, // NEW
            mainImage: gallery[0],
            gallery,
            description: product.description,
            startingPrice: Number(product.startingPrice) || 1200, // CHANGED: API returns "100.00" as a string
            priceType: product.priceType === "fixed" ? "fixed" : "starting", // NEW
            sizes: normalizeSizes(product.sizes), // NEW: this was the missing piece
            catalogPdfUrl: product.catalogPdfUrl || undefined,
            averageRating: Number(product.averageRating) || undefined, // NEW
            totalRatings: product.totalRatings, // NEW
          }}
        />
      </main>
      <Footer />
    </>
  );
}