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
  images: string[];
  catalogPdfUrl: string | null;
  tags: string[];
  category?: { name: string; slug: string };
}

const FALLBACK_IMAGES = [
  "/hero-slide-1.jpg",
  "/hero-slide-2.jpg",
  "/hero-slide-3.jpg",
  "/hero-slide-4.jpg",
];

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
          <div className="container" style={{ padding: "20px 20px 0" }}>
            <div className="breadcrumb" style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link> /{" "}
              <Link href="/products" style={{ color: "#64748b", textDecoration: "none" }}>Products</Link> /{" "}
              <Link href={`/products/${categorySlug}`} style={{ color: "#64748b", textDecoration: "none" }}>{formattedCategoryName}</Link> /{" "}
              <span style={{ color: "#0f172a", fontWeight: "600" }}>{formattedTitle}</span>
            </div>
          </div>
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
        <div className="container" style={{ padding: "20px 20px 0" }}>
          <div className="breadcrumb" style={{ fontSize: "14px", color: "#64748b", marginBottom: "10px" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link> /{" "}
            <Link href="/products" style={{ color: "#64748b", textDecoration: "none" }}>Products</Link> /{" "}
            <Link href={`/products/${categorySlug}`} style={{ color: "#64748b", textDecoration: "none" }}>
              {product.category?.name || formattedCategoryName}
            </Link>{" "}
            / <span style={{ color: "#0f172a", fontWeight: "600" }}>{product.name}</span>
          </div>
        </div>
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
      </main>
      <Footer />
    </>
  );
}
