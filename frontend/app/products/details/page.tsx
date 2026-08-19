"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const itemSlug = searchParams.get("item") || "custom-product";

  const formattedTitle = itemSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const productData = {
    id: itemSlug,
    title: formattedTitle,
    mainImage: "/assets/hero-slide-1.jpg",
    gallery: [
      "/assets/hero-slide-1.jpg",
      "/assets/hero-slide-2.jpg",
      "/assets/hero-slide-3.jpg",
      "/assets/hero-slide-4.jpg",
    ],
    description: `High-quality customized ${formattedTitle.toLowerCase()} designed for sports events, tournaments, and corporate branding. Built with durable material and precision printing.`,
    startingPrice: 1200,
  };

  return <ProductDetail product={productData} />;
}

export default function ProductDetailsPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="container" style={{ padding: "40px" }}>Loading...</div>}>
          <ProductDetailsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}